"""
Transaction model for financial operations
"""

from sqlalchemy import Column, String, DateTime, Float, Enum, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
import enum
from app.core.database import Base

class TransactionType(str, enum.Enum):
    CREDIT_PURCHASE = "credit_purchase"
    CREDIT_SALE = "credit_sale"
    PLATFORM_FEE = "platform_fee"
    REFUND = "refund"
    WITHDRAWAL = "withdrawal"
    DEPOSIT = "deposit"

class TransactionStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Parties involved
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    virtual_card_id = Column(UUID(as_uuid=True), ForeignKey("virtual_cards.id"))
    
    # Transaction details
    transaction_type = Column(Enum(TransactionType), nullable=False)
    amount = Column(Float, nullable=False)
    platform_fee = Column(Float, default=0.0)
    net_amount = Column(Float, nullable=False)
    
    # Payment processing
    payment_method = Column(String(50))  # stripe, paypal, etc.
    payment_intent_id = Column(String(100))  # External payment system ID
    payment_status = Column(String(50))
    
    # Status and metadata
    status = Column(Enum(TransactionStatus), default=TransactionStatus.PENDING)
    description = Column(Text)
    metadata = Column(String(1000))  # Additional transaction data
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)
    failed_at = Column(DateTime)
    
    # Relationships
    buyer = relationship("User", foreign_keys=[buyer_id], back_populates="transactions")
    seller = relationship("User", foreign_keys=[seller_id])
    virtual_card = relationship("VirtualCard", back_populates="transactions")
