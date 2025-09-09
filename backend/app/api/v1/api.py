"""
Main API router for v1 endpoints
"""

from fastapi import APIRouter
from app.api.v1.endpoints import auth, virtual_cards, sessions, marketplace, credit_pools, pricing, platform_accounts

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(virtual_cards.router, prefix="/virtual-cards", tags=["virtual-cards"])
api_router.include_router(sessions.router, prefix="/sessions", tags=["sessions"])
api_router.include_router(marketplace.router, prefix="/marketplace", tags=["marketplace"])
api_router.include_router(credit_pools.router, prefix="/credit-pools", tags=["credit-pools"])
api_router.include_router(pricing.router, prefix="/pricing", tags=["pricing"])
api_router.include_router(platform_accounts.router, prefix="/platform-accounts", tags=["platform-accounts"])
