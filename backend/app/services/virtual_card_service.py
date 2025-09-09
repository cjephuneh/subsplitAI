"""
Virtual Card Service - Handles virtual card generation and management
"""

import secrets
import string
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from app.models.virtual_card import VirtualCard, CardStatus
from app.models.platform_account import PlatformAccount
from app.models.user import User
from app.core.config import settings
import structlog

logger = structlog.get_logger()

class VirtualCardService:
    def __init__(self, db: Session):
        self.db = db
    
    def generate_virtual_card(
        self,
        seller_id: str,
        platform_account_id: str,
        initial_balance: float,
        price_per_hour: float,
        expiry_hours: int = None
    ) -> VirtualCard:
        """Generate a new virtual card"""
        
        if expiry_hours is None:
            expiry_hours = settings.CARD_EXPIRY_HOURS
        
        # Generate unique card number
        card_number = self._generate_card_number()
        cvv = self._generate_cvv()
        expiry_date = datetime.utcnow() + timedelta(hours=expiry_hours)
        
        # Create virtual card
        virtual_card = VirtualCard(
            card_number=card_number,
            cvv=cvv,
            expiry_date=expiry_date,
            seller_id=seller_id,
            platform_account_id=platform_account_id,
            initial_balance=initial_balance,
            current_balance=initial_balance,
            price_per_hour=price_per_hour,
            base_price=price_per_hour,
            current_price=price_per_hour,
            status=CardStatus.ACTIVE,
            expires_at=expiry_date,
            activated_at=datetime.utcnow()
        )
        
        self.db.add(virtual_card)
        self.db.commit()
        self.db.refresh(virtual_card)
        
        logger.info("Virtual card generated", card_id=str(virtual_card.id), seller_id=seller_id)
        
        return virtual_card
    
    def validate_card(self, card_number: str, cvv: str) -> Dict[str, Any]:
        """Validate virtual card"""
        card = self.db.query(VirtualCard).filter(
            VirtualCard.card_number == card_number,
            VirtualCard.cvv == cvv
        ).first()
        
        if not card:
            return {"valid": False, "error": "Card not found"}
        
        if card.status != CardStatus.ACTIVE:
            return {"valid": False, "error": f"Card status: {card.status}"}
        
        if card.is_expired():
            card.status = CardStatus.EXPIRED
            self.db.commit()
            return {"valid": False, "error": "Card expired"}
        
        if card.is_depleted():
            card.status = CardStatus.DEPLETED
            self.db.commit()
            return {"valid": False, "error": "Insufficient balance"}
        
        return {
            "valid": True,
            "balance": card.current_balance,
            "card_id": str(card.id),
            "platform": card.platform_account.platform
        }
    
    def charge_card(self, card_id: str, amount: float) -> bool:
        """Charge amount from virtual card"""
        card = self.db.query(VirtualCard).filter(VirtualCard.id == card_id).first()
        
        if not card or not card.can_be_used():
            return False
        
        if card.current_balance < amount:
            return False
        
        # Deduct amount
        card.current_balance -= amount
        card.total_charged += amount
        card.usage_count += 1
        card.last_used = datetime.utcnow()
        
        # Update status if depleted
        if card.current_balance <= 0:
            card.status = CardStatus.DEPLETED
        
        self.db.commit()
        
        logger.info("Card charged", card_id=card_id, amount=amount, remaining_balance=card.current_balance)
        
        return True
    
    def update_dynamic_pricing(self, card_id: str, demand_multiplier: float):
        """Update card pricing based on demand"""
        card = self.db.query(VirtualCard).filter(VirtualCard.id == card_id).first()
        
        if not card:
            return
        
        # Calculate new price
        new_price = card.base_price * demand_multiplier
        card.current_price = new_price
        card.demand_multiplier = demand_multiplier
        
        self.db.commit()
        
        logger.info("Dynamic pricing updated", card_id=card_id, new_price=new_price, multiplier=demand_multiplier)
    
    def get_card_details(self, card_id: str) -> Optional[VirtualCard]:
        """Get virtual card details"""
        return self.db.query(VirtualCard).filter(VirtualCard.id == card_id).first()
    
    def deactivate_card(self, card_id: str) -> bool:
        """Deactivate virtual card"""
        card = self.db.query(VirtualCard).filter(VirtualCard.id == card_id).first()
        
        if not card:
            return False
        
        card.status = CardStatus.CANCELLED
        self.db.commit()
        
        logger.info("Card deactivated", card_id=card_id)
        
        return True
    
    def _generate_card_number(self) -> str:
        """Generate unique virtual card number"""
        while True:
            # Generate Visa format card number
            card_number = settings.VIRTUAL_CARD_PREFIX + ''.join(
                secrets.choice(string.digits) for _ in range(15)
            )
            
            # Check if already exists
            existing = self.db.query(VirtualCard).filter(
                VirtualCard.card_number == card_number
            ).first()
            
            if not existing:
                return card_number
    
    def _generate_cvv(self) -> str:
        """Generate CVV"""
        return ''.join(secrets.choice(string.digits) for _ in range(3))
