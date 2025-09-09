"""
Marketplace API endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.virtual_card import VirtualCard, CardStatus
from app.models.platform_account import PlatformType
from app.services.virtual_card_service import VirtualCardService
from app.services.dynamic_pricing_service import DynamicPricingService
import structlog

logger = structlog.get_logger()
router = APIRouter()

class MarketplaceListing(BaseModel):
    card_id: str
    platform: str
    seller_username: str
    available_balance: float
    price_per_hour: float
    current_price: float
    demand_multiplier: float
    created_at: str
    expires_at: str

class PurchaseRequest(BaseModel):
    card_id: str
    amount: float
    duration_hours: int = 1

@router.get("/listings")
async def get_marketplace_listings(
    platform: Optional[str] = Query(None, description="Filter by platform"),
    min_price: Optional[float] = Query(None, description="Minimum price per hour"),
    max_price: Optional[float] = Query(None, description="Maximum price per hour"),
    min_balance: Optional[float] = Query(None, description="Minimum available balance"),
    limit: int = Query(50, description="Number of listings to return"),
    offset: int = Query(0, description="Number of listings to skip"),
    db: Session = Depends(get_db)
):
    """Get marketplace listings"""
    
    try:
        # Build query
        query = db.query(VirtualCard).filter(
            VirtualCard.status == CardStatus.ACTIVE,
            VirtualCard.buyer_id.is_(None)  # Not yet purchased
        )
        
        # Apply filters
        if platform:
            query = query.join(VirtualCard.platform_account).filter(
                VirtualCard.platform_account.has(platform=platform)
            )
        
        if min_price:
            query = query.filter(VirtualCard.current_price >= min_price)
        
        if max_price:
            query = query.filter(VirtualCard.current_price <= max_price)
        
        if min_balance:
            query = query.filter(VirtualCard.current_balance >= min_balance)
        
        # Apply pagination
        listings = query.offset(offset).limit(limit).all()
        
        # Format response
        marketplace_listings = []
        for card in listings:
            marketplace_listings.append({
                "card_id": str(card.id),
                "platform": card.platform_account.platform,
                "seller_username": card.seller.username,
                "available_balance": card.current_balance,
                "price_per_hour": card.price_per_hour,
                "current_price": card.current_price,
                "demand_multiplier": card.demand_multiplier,
                "created_at": card.created_at.isoformat(),
                "expires_at": card.expires_at.isoformat(),
                "utilization_percentage": (card.total_charged / card.initial_balance) * 100 if card.initial_balance > 0 else 0
            })
        
        logger.info("Marketplace listings retrieved", 
                   count=len(marketplace_listings),
                   platform=platform)
        
        return {
            "listings": marketplace_listings,
            "total_count": len(marketplace_listings),
            "offset": offset,
            "limit": limit
        }
        
    except Exception as e:
        logger.error("Failed to get marketplace listings", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.post("/purchase")
async def purchase_credits(
    request: PurchaseRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Purchase credits from marketplace"""
    
    try:
        card_service = VirtualCardService(db)
        
        # Get virtual card
        card = card_service.get_card_details(request.card_id)
        if not card:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Card not found"
            )
        
        # Check if card is available
        if card.buyer_id is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Card already purchased"
            )
        
        if not card.can_be_used():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Card is not available for purchase"
            )
        
        # Calculate total cost
        total_cost = card.current_price * request.duration_hours
        
        # Check if user has sufficient balance
        if current_user.balance < total_cost:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Insufficient balance"
            )
        
        # Assign card to buyer
        card.buyer_id = current_user.id
        
        # Deduct from user balance
        current_user.balance -= total_cost
        current_user.total_spent += total_cost
        
        # Add to seller balance
        seller = card.seller
        seller.balance += total_cost
        seller.total_earned += total_cost
        
        db.commit()
        
        logger.info("Credits purchased", 
                   card_id=request.card_id,
                   buyer_id=str(current_user.id),
                   amount=total_cost)
        
        return {
            "success": True,
            "card_id": request.card_id,
            "total_cost": total_cost,
            "duration_hours": request.duration_hours,
            "remaining_balance": current_user.balance,
            "card_details": {
                "card_number": card.card_number,
                "cvv": card.cvv,
                "expiry_date": card.expiry_date.isoformat(),
                "platform": card.platform_account.platform
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to purchase credits", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/my-purchases")
async def get_my_purchases(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's purchased credits"""
    
    try:
        # Get user's purchased cards
        purchased_cards = db.query(VirtualCard).filter(
            VirtualCard.buyer_id == current_user.id
        ).all()
        
        purchases = []
        for card in purchased_cards:
            purchases.append({
                "card_id": str(card.id),
                "platform": card.platform_account.platform,
                "seller_username": card.seller.username,
                "purchase_price": card.current_price,
                "available_balance": card.current_balance,
                "purchased_at": card.created_at.isoformat(),
                "expires_at": card.expires_at.isoformat(),
                "status": card.status
            })
        
        logger.info("User purchases retrieved", 
                   user_id=str(current_user.id),
                   count=len(purchases))
        
        return {
            "purchases": purchases,
            "total_count": len(purchases)
        }
        
    except Exception as e:
        logger.error("Failed to get user purchases", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/my-sales")
async def get_my_sales(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's sold credits"""
    
    try:
        # Get user's sold cards
        sold_cards = db.query(VirtualCard).filter(
            VirtualCard.seller_id == current_user.id,
            VirtualCard.buyer_id.isnot(None)
        ).all()
        
        sales = []
        for card in sold_cards:
            sales.append({
                "card_id": str(card.id),
                "platform": card.platform_account.platform,
                "buyer_username": card.buyer.username if card.buyer else "Unknown",
                "sale_price": card.current_price,
                "initial_balance": card.initial_balance,
                "remaining_balance": card.current_balance,
                "sold_at": card.created_at.isoformat(),
                "status": card.status
            })
        
        logger.info("User sales retrieved", 
                   user_id=str(current_user.id),
                   count=len(sales))
        
        return {
            "sales": sales,
            "total_count": len(sales)
        }
        
    except Exception as e:
        logger.error("Failed to get user sales", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/platforms")
async def get_available_platforms(db: Session = Depends(get_db)):
    """Get available platforms in marketplace"""
    
    try:
        # Get platforms with active listings
        platforms = db.query(VirtualCard.platform_account).join(
            VirtualCard.platform_account
        ).filter(
            VirtualCard.status == CardStatus.ACTIVE,
            VirtualCard.buyer_id.is_(None)
        ).distinct().all()
        
        platform_list = []
        for platform_account in platforms:
            # Count active listings for this platform
            listing_count = db.query(VirtualCard).filter(
                VirtualCard.platform_account_id == platform_account.id,
                VirtualCard.status == CardStatus.ACTIVE,
                VirtualCard.buyer_id.is_(None)
            ).count()
            
            platform_list.append({
                "platform": platform_account.platform,
                "active_listings": listing_count,
                "is_premium": platform_account.is_premium
            })
        
        logger.info("Available platforms retrieved", count=len(platform_list))
        
        return {
            "platforms": platform_list,
            "total_count": len(platform_list)
        }
        
    except Exception as e:
        logger.error("Failed to get available platforms", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
