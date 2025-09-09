"""
Session model for managing AI platform access sessions
"""

from sqlalchemy import Column, String, DateTime, Boolean, Float, Enum, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime, timedelta
import enum
from app.core.database import Base

class SessionStatus(str, enum.Enum):
    ACTIVE = "active"
    EXPIRED = "expired"
    TERMINATED = "terminated"
    SUSPENDED = "suspended"

class Session(Base):
    __tablename__ = "sessions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Ownership
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    virtual_card_id = Column(UUID(as_uuid=True), ForeignKey("virtual_cards.id"), nullable=False)
    platform_account_id = Column(UUID(as_uuid=True), ForeignKey("platform_accounts.id"), nullable=False)
    
    # Session data
    session_token = Column(String(100), unique=True, index=True, nullable=False)
    browser_session_id = Column(String(100))  # For browser automation
    session_data = Column(JSON)  # Store session-specific data
    
    # Usage tracking
    total_usage = Column(Float, default=0.0)
    request_count = Column(Integer, default=0)
    last_request_at = Column(DateTime)
    
    # Status and timing
    status = Column(Enum(SessionStatus), default=SessionStatus.ACTIVE)
    started_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)
    terminated_at = Column(DateTime)
    
    # Platform-specific data
    platform_session_id = Column(String(100))  # Platform's internal session ID
    platform_user_agent = Column(String(500))
    platform_cookies = Column(JSON)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    buyer = relationship("User", back_populates="sessions")
    virtual_card = relationship("VirtualCard", back_populates="sessions")
    platform_account = relationship("PlatformAccount", back_populates="sessions")
    usage_logs = relationship("UsageLog", back_populates="session")
    
    def is_expired(self):
        return datetime.utcnow() > self.expires_at
    
    def is_active(self):
        return (
            self.status == SessionStatus.ACTIVE and 
            not self.is_expired()
        )
    
    def get_remaining_time(self):
        if self.is_expired():
            return timedelta(0)
        return self.expires_at - datetime.utcnow()
