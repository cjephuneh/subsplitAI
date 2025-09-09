"""
Dynamic Pricing API endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.services.dynamic_pricing_service import DynamicPricingService
import structlog

logger = structlog.get_logger()
router = APIRouter()

@router.get("/demand/{platform}")
async def get_demand_multiplier(
    platform: str,
    region: str = Query("global", description="Region for demand calculation"),
    time_window_hours: int = Query(24, description="Time window for demand calculation"),
    db: Session = Depends(get_db)
):
    """Get demand multiplier for a platform"""
    
    try:
        pricing_service = DynamicPricingService(db)
        
        multiplier = pricing_service.calculate_demand_multiplier(
            platform=platform,
            region=region,
            time_window_hours=time_window_hours
        )
        
        logger.info("Demand multiplier retrieved", 
                   platform=platform, 
                   multiplier=multiplier)
        
        return {
            "platform": platform,
            "region": region,
            "time_window_hours": time_window_hours,
            "demand_multiplier": multiplier
        }
        
    except Exception as e:
        logger.error("Failed to get demand multiplier", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/trends/{platform}")
async def get_pricing_trends(
    platform: str,
    days: int = Query(7, description="Number of days for trend analysis"),
    db: Session = Depends(get_db)
):
    """Get pricing trends for a platform"""
    
    try:
        pricing_service = DynamicPricingService(db)
        
        trends = pricing_service.get_pricing_trends(platform, days)
        
        logger.info("Pricing trends retrieved", platform=platform)
        
        return trends
        
    except Exception as e:
        logger.error("Failed to get pricing trends", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.post("/predict/{platform}")
async def predict_optimal_pricing(
    platform: str,
    base_price: float,
    target_utilization: float = Query(0.8, description="Target utilization rate"),
    db: Session = Depends(get_db)
):
    """Predict optimal pricing for maximum revenue"""
    
    try:
        pricing_service = DynamicPricingService(db)
        
        prediction = pricing_service.predict_optimal_pricing(
            platform=platform,
            base_price=base_price,
            target_utilization=target_utilization
        )
        
        logger.info("Optimal pricing predicted", 
                   platform=platform, 
                   base_price=base_price)
        
        return prediction
        
    except Exception as e:
        logger.error("Failed to predict optimal pricing", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.post("/update-all")
async def update_all_pricing(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update pricing for all active cards"""
    
    try:
        pricing_service = DynamicPricingService(db)
        
        platform_stats = pricing_service.update_all_card_pricing()
        
        logger.info("All card pricing updated", 
                   user_id=str(current_user.id),
                   platform_stats=platform_stats)
        
        return {
            "success": True,
            "platform_stats": platform_stats,
            "message": "Pricing updated successfully"
        }
        
    except Exception as e:
        logger.error("Failed to update all pricing", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/market-overview")
async def get_market_overview(db: Session = Depends(get_db)):
    """Get overall market pricing overview"""
    
    try:
        pricing_service = DynamicPricingService(db)
        
        # Get trends for all platforms
        platforms = ["chatgpt", "claude", "gemini"]
        market_data = {}
        
        for platform in platforms:
            try:
                trends = pricing_service.get_pricing_trends(platform, days=7)
                market_data[platform] = trends
            except Exception as e:
                logger.warning(f"Failed to get trends for {platform}", error=str(e))
                market_data[platform] = {
                    "platform": platform,
                    "average_price": 0,
                    "price_trend": "unknown",
                    "demand_level": "unknown"
                }
        
        logger.info("Market overview retrieved")
        
        return {
            "market_data": market_data,
            "summary": {
                "total_platforms": len(platforms),
                "active_platforms": len([p for p in market_data.values() if p.get("average_price", 0) > 0])
            }
        }
        
    except Exception as e:
        logger.error("Failed to get market overview", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
