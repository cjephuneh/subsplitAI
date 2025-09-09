"""
Usage log model for tracking platform usage and billing
"""

from sqlalchemy import Column, String, DateTime, Float, ForeignKey, Integer, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.core.database import Base

class UsageLog(Base):
    __tablename__ = "usage_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Relationships
    session_id = Column(UUID(as_uuid=True), ForeignKey("sessions.id"), nullable=False)
    virtual_card_id = Column(UUID(as_uuid=True), ForeignKey("virtual_cards.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Usage details
    request_type = Column(String(50), nullable=False)  # chat, image_generation, etc.
    platform = Column(String(50), nullable=False)  # chatgpt, claude, gemini
    
    # Request/Response data
    request_data = Column(JSON)
    response_data = Column(JSON)
    request_size = Column(Integer)  # Characters/tokens
    response_size = Column(Integer)
    
    # Cost calculation
    base_cost = Column(Float, nullable=False)
    actual_cost = Column(Float, nullable=False)
    cost_multiplier = Column(Float, default=1.0)  # For dynamic pricing
    
    # Performance metrics
    response_time_ms = Column(Integer)
    success = Column(String(10), default="true")  # true, false, error
    error_message = Column(Text)
    
    # Metadata
    user_agent = Column(String(500))
    ip_address = Column(String(45))
    session_data = Column(JSON)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    session = relationship("Session", back_populates="usage_logs")
    virtual_card = relationship("VirtualCard", back_populates="usage_logs")
    user = relationship("User")
