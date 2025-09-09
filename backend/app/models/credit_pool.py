"""
Credit pool model for pooling credits across multiple accounts
"""

from sqlalchemy import Column, String, DateTime, Boolean, Float, Enum, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
import enum
from app.core.database import Base

class PoolStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"
    DEPLETED = "depleted"

class CreditPool(Base):
    __tablename__ = "credit_pools"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Pool ownership and settings
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    platform = Column(String(50), nullable=False)  # chatgpt, claude, etc.
    pool_name = Column(String(100), nullable=False)
    
    # Pool configuration
    min_contribution = Column(Float, default=1.0)
    max_contribution = Column(Float, default=100.0)
    auto_refill_threshold = Column(Float, default=5.0)
    auto_refill_amount = Column(Float, default=10.0)
    
    # Pool status
    status = Column(Enum(PoolStatus), default=PoolStatus.ACTIVE)
    is_public = Column(Boolean, default=False)
    allow_external_contributors = Column(Boolean, default=False)
    
    # Financial tracking
    total_contributed = Column(Float, default=0.0)
    total_used = Column(Float, default=0.0)
    current_balance = Column(Float, default=0.0)
    available_balance = Column(Float, default=0.0)
    
    # Usage statistics
    total_sessions = Column(Integer, default=0)
    active_sessions = Column(Integer, default=0)
    last_used_at = Column(DateTime)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    owner = relationship("User", back_populates="credit_pools")
    contributions = relationship("CreditPoolContribution", back_populates="credit_pool")
    sessions = relationship("PoolSession", back_populates="credit_pool")
    
    def get_utilization_percentage(self):
        if self.total_contributed == 0:
            return 0.0
        return (self.total_used / self.total_contributed) * 100

class CreditPoolContribution(Base):
    __tablename__ = "credit_pool_contributions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Relationships
    credit_pool_id = Column(UUID(as_uuid=True), ForeignKey("credit_pools.id"), nullable=False)
    platform_account_id = Column(UUID(as_uuid=True), ForeignKey("platform_accounts.id"), nullable=False)
    contributor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Contribution details
    amount = Column(Float, nullable=False)
    contribution_type = Column(String(50), default="manual")  # manual, auto_refill
    status = Column(String(50), default="active")  # active, withdrawn, expired
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    withdrawn_at = Column(DateTime)
    
    # Relationships
    credit_pool = relationship("CreditPool", back_populates="contributions")
    platform_account = relationship("PlatformAccount", back_populates="credit_pool_contributions")
    contributor = relationship("User")

class PoolSession(Base):
    __tablename__ = "pool_sessions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Relationships
    credit_pool_id = Column(UUID(as_uuid=True), ForeignKey("credit_pools.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Session details
    session_token = Column(String(100), unique=True, index=True, nullable=False)
    allocated_amount = Column(Float, nullable=False)
    used_amount = Column(Float, default=0.0)
    
    # Status
    status = Column(String(50), default="active")  # active, completed, expired
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)
    completed_at = Column(DateTime)
    
    # Relationships
    credit_pool = relationship("CreditPool", back_populates="sessions")
    user = relationship("User")
