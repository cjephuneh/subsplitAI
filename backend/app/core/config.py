"""
Configuration settings for Subsplit Backend
"""

from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    # App Settings
    APP_NAME: str = "Subsplit API"
    DEBUG: bool = False
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost/subsplit"
    REDIS_URL: str = "redis://localhost:6379"
    
    # CORS
    ALLOWED_HOSTS: List[str] = ["http://localhost:3000", "https://subsplit.com"]
    
    # External APIs
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    GOOGLE_API_KEY: Optional[str] = None
    
    # Payment Processing
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_WEBHOOK_SECRET: Optional[str] = None
    
    # Platform Settings
    CHATGPT_BASE_URL: str = "https://chat.openai.com"
    CLAUDE_BASE_URL: str = "https://claude.ai"
    GEMINI_BASE_URL: str = "https://gemini.google.com"
    
    # Virtual Card Settings
    VIRTUAL_CARD_PREFIX: str = "4"  # Visa format
    CARD_EXPIRY_HOURS: int = 24
    
    # Credit Pooling
    MAX_POOL_SIZE: int = 10
    MIN_POOL_BALANCE: float = 1.0
    
    # Dynamic Pricing
    BASE_PRICE_MULTIPLIER: float = 1.0
    DEMAND_THRESHOLD: int = 10
    PRICE_ADJUSTMENT_RATE: float = 0.1
    
    # Security
    MAX_LOGIN_ATTEMPTS: int = 5
    LOCKOUT_DURATION_MINUTES: int = 15
    SESSION_TIMEOUT_MINUTES: int = 60
    
    # Monitoring
    SENTRY_DSN: Optional[str] = None
    PROMETHEUS_PORT: int = 8001
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Global settings instance
settings = Settings()
