"""
Virtual Cards API endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.services.virtual_card_service import VirtualCardService
from app.services.dynamic_pricing_service import DynamicPricingService
import structlog

logger = structlog.get_logger()
router = APIRouter()

class VirtualCardCreateRequest(BaseModel):
    platform_account_id: str
    initial_balance: float
    price_per_hour: float
    expiry_hours: int = 24

class VirtualCardValidateRequest(BaseModel):
    card_number: str
    cvv: str

class VirtualCardChargeRequest(BaseModel):
    amount: float

@router.post("/create")
async def create_virtual_card(
    request: VirtualCardCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new virtual card"""
    
    try:
        card_service = VirtualCardService(db)
        
        # Create virtual card
        virtual_card = card_service.generate_virtual_card(
            seller_id=str(current_user.id),
            platform_account_id=request.platform_account_id,
            initial_balance=request.initial_balance,
            price_per_hour=request.price_per_hour,
            expiry_hours=request.expiry_hours
        )
        
        # Apply dynamic pricing
        pricing_service = DynamicPricingService(db)
        pricing_service.update_card_pricing(str(virtual_card.id))
        
        logger.info("Virtual card created", 
                   card_id=str(virtual_card.id), 
                   user_id=str(current_user.id))
        
        return {
            "card_id": str(virtual_card.id),
            "card_number": virtual_card.card_number,
            "cvv": virtual_card.cvv,
            "expiry_date": virtual_card.expiry_date.isoformat(),
            "initial_balance": virtual_card.initial_balance,
            "current_price": virtual_card.current_price,
            "status": virtual_card.status,
            "created_at": virtual_card.created_at.isoformat()
        }
        
    except Exception as e:
        logger.error("Failed to create virtual card", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create virtual card: {str(e)}"
        )

@router.post("/validate")
async def validate_virtual_card(
    request: VirtualCardValidateRequest,
    db: Session = Depends(get_db)
):
    """Validate virtual card"""
    
    try:
        card_service = VirtualCardService(db)
        
        validation_result = card_service.validate_card(
            request.card_number,
            request.cvv
        )
        
        if not validation_result["valid"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=validation_result["error"]
            )
        
        return validation_result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to validate virtual card", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.post("/{card_id}/charge")
async def charge_virtual_card(
    card_id: str,
    request: VirtualCardChargeRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Charge amount from virtual card"""
    
    try:
        card_service = VirtualCardService(db)
        
        success = card_service.charge_card(card_id, request.amount)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to charge card"
            )
        
        # Get updated card details
        card = card_service.get_card_details(card_id)
        
        logger.info("Card charged", 
                   card_id=card_id, 
                   amount=request.amount,
                   user_id=str(current_user.id))
        
        return {
            "success": True,
            "remaining_balance": card.current_balance,
            "total_charged": card.total_charged
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to charge virtual card", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/{card_id}")
async def get_virtual_card(
    card_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get virtual card details"""
    
    try:
        card_service = VirtualCardService(db)
        card = card_service.get_card_details(card_id)
        
        if not card:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Card not found"
            )
        
        # Check if user owns the card
        if str(card.seller_id) != str(current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        return {
            "card_id": str(card.id),
            "card_number": card.card_number,
            "expiry_date": card.expiry_date.isoformat(),
            "initial_balance": card.initial_balance,
            "current_balance": card.current_balance,
            "current_price": card.current_price,
            "base_price": card.base_price,
            "demand_multiplier": card.demand_multiplier,
            "status": card.status,
            "usage_count": card.usage_count,
            "last_used": card.last_used.isoformat() if card.last_used else None,
            "created_at": card.created_at.isoformat(),
            "expires_at": card.expires_at.isoformat()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to get virtual card", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.delete("/{card_id}")
async def deactivate_virtual_card(
    card_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Deactivate virtual card"""
    
    try:
        card_service = VirtualCardService(db)
        
        # Check if user owns the card
        card = card_service.get_card_details(card_id)
        if not card or str(card.seller_id) != str(current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        success = card_service.deactivate_card(card_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to deactivate card"
            )
        
        logger.info("Virtual card deactivated", 
                   card_id=card_id, 
                   user_id=str(current_user.id))
        
        return {"success": True, "message": "Card deactivated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to deactivate virtual card", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/")
async def get_user_virtual_cards(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all virtual cards for current user"""
    
    try:
        card_service = VirtualCardService(db)
        
        # Get user's cards
        cards = db.query(VirtualCard).filter(
            VirtualCard.seller_id == current_user.id
        ).all()
        
        return [
            {
                "card_id": str(card.id),
                "card_number": card.card_number,
                "expiry_date": card.expiry_date.isoformat(),
                "initial_balance": card.initial_balance,
                "current_balance": card.current_balance,
                "current_price": card.current_price,
                "status": card.status,
                "usage_count": card.usage_count,
                "created_at": card.created_at.isoformat(),
                "platform": card.platform_account.platform
            }
            for card in cards
        ]
        
    except Exception as e:
        logger.error("Failed to get user virtual cards", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
