"""
Platform account model for managing AI platform connections
"""

from sqlalchemy import Column, String, DateTime, Boolean, Float, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
import enum
from app.core.database import Base

class PlatformType(str, enum.Enum):
    CHATGPT = "chatgpt"
    CLAUDE = "claude"
    GEMINI = "gemini"
    MIDJOURNEY = "midjourney"
    CANVA = "canva"

class AccountStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"
    VERIFICATION_PENDING = "verification_pending"

class PlatformAccount(Base):
    __tablename__ = "platform_accounts"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    platform = Column(Enum(PlatformType), nullable=False)
    
    # Account credentials (encrypted)
    email = Column(String(255), nullable=False)
    encrypted_credentials = Column(String(1000))  # Encrypted password/API key
    api_key = Column(String(500))  # For platforms that support API keys
    
    # Account status
    status = Column(Enum(AccountStatus), default=AccountStatus.VERIFICATION_PENDING)
    is_premium = Column(Boolean, default=False)
    subscription_type = Column(String(50))  # Plus, Pro, etc.
    
    # Credit information
    available_credits = Column(Float, default=0.0)
    total_credits = Column(Float, default=0.0)
    credits_used = Column(Float, default=0.0)
    last_credit_sync = Column(DateTime)
    
    # Pooling settings
    allow_pooling = Column(Boolean, default=True)
    min_pool_amount = Column(Float, default=1.0)
    max_pool_amount = Column(Float, default=100.0)
    
    # Verification
    verification_token = Column(String(100))
    verified_at = Column(DateTime)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="platform_accounts")
    virtual_cards = relationship("VirtualCard", back_populates="platform_account")
    sessions = relationship("Session", back_populates="platform_account")
    credit_pool_contributions = relationship("CreditPoolContribution", back_populates="platform_account")
