"""
Virtual card model for managing credit transactions
"""

from sqlalchemy import Column, String, DateTime, Boolean, Float, Enum, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime, timedelta
import enum
from app.core.database import Base

class CardStatus(str, enum.Enum):
    ACTIVE = "active"
    EXPIRED = "expired"
    DEPLETED = "depleted"
    SUSPENDED = "suspended"
    CANCELLED = "cancelled"

class VirtualCard(Base):
    __tablename__ = "virtual_cards"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Card details
    card_number = Column(String(16), unique=True, index=True, nullable=False)
    cvv = Column(String(3), nullable=False)
    expiry_date = Column(DateTime, nullable=False)
    
    # Ownership
    seller_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    platform_account_id = Column(UUID(as_uuid=True), ForeignKey("platform_accounts.id"), nullable=False)
    
    # Financial
    initial_balance = Column(Float, nullable=False)
    current_balance = Column(Float, nullable=False)
    price_per_hour = Column(Float, nullable=False)
    total_charged = Column(Float, default=0.0)
    
    # Status and metadata
    status = Column(Enum(CardStatus), default=CardStatus.ACTIVE)
    usage_count = Column(Integer, default=0)
    last_used = Column(DateTime)
    
    # Dynamic pricing
    base_price = Column(Float, nullable=False)
    current_price = Column(Float, nullable=False)
    demand_multiplier = Column(Float, default=1.0)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    activated_at = Column(DateTime)
    expires_at = Column(DateTime, nullable=False)
    
    # Relationships
    seller = relationship("User", foreign_keys=[seller_id], back_populates="virtual_cards")
    buyer = relationship("User", foreign_keys=[buyer_id])
    platform_account = relationship("PlatformAccount", back_populates="virtual_cards")
    sessions = relationship("Session", back_populates="virtual_card")
    transactions = relationship("Transaction", back_populates="virtual_card")
    usage_logs = relationship("UsageLog", back_populates="virtual_card")
    
    def is_expired(self):
        return datetime.utcnow() > self.expires_at
    
    def is_depleted(self):
        return self.current_balance <= 0
    
    def can_be_used(self):
        return (
            self.status == CardStatus.ACTIVE and 
            not self.is_expired() and 
            not self.is_depleted()
        )
