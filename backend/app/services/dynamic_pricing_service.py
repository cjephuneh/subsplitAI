"""
Dynamic Pricing Service - Handles dynamic pricing based on demand
"""

import numpy as np
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import and_, func, desc
from app.models.virtual_card import VirtualCard
from app.models.usage_log import UsageLog
from app.models.transaction import Transaction
from app.core.config import settings
import structlog

logger = structlog.get_logger()

class DynamicPricingService:
    def __init__(self, db: Session):
        self.db = db
        self.price_history = {}
        self.demand_metrics = {}
    
    def calculate_demand_multiplier(
        self,
        platform: str,
        region: str = "global",
        time_window_hours: int = 24
    ) -> float:
        """Calculate demand multiplier based on usage patterns"""
        
        # Get usage data for the time window
        start_time = datetime.utcnow() - timedelta(hours=time_window_hours)
        
        # Count active sessions
        active_sessions = self.db.query(VirtualCard).filter(
            and_(
                VirtualCard.status == "active",
                VirtualCard.created_at >= start_time
            )
        ).count()
        
        # Count total requests
        total_requests = self.db.query(UsageLog).filter(
            and_(
                UsageLog.platform == platform,
                UsageLog.created_at >= start_time
            )
        ).count()
        
        # Calculate demand score
        demand_score = self._calculate_demand_score(active_sessions, total_requests)
        
        # Apply multiplier
        multiplier = self._apply_demand_multiplier(demand_score)
        
        logger.info("Demand multiplier calculated", 
                   platform=platform, 
                   demand_score=demand_score, 
                   multiplier=multiplier)
        
        return multiplier
    
    def update_card_pricing(self, card_id: str) -> float:
        """Update pricing for a specific card"""
        
        card = self.db.query(VirtualCard).filter(VirtualCard.id == card_id).first()
        if not card:
            return 0.0
        
        # Get platform and calculate demand
        platform = card.platform_account.platform
        demand_multiplier = self.calculate_demand_multiplier(platform)
        
        # Calculate new price
        new_price = card.base_price * demand_multiplier
        
        # Apply price bounds (min 0.5x, max 3x base price)
        new_price = max(card.base_price * 0.5, min(new_price, card.base_price * 3.0))
        
        # Update card
        card.current_price = new_price
        card.demand_multiplier = demand_multiplier
        
        self.db.commit()
        
        logger.info("Card pricing updated", card_id=card_id, new_price=new_price)
        
        return new_price
    
    def update_all_card_pricing(self) -> Dict[str, int]:
        """Update pricing for all active cards"""
        
        active_cards = self.db.query(VirtualCard).filter(
            VirtualCard.status == "active"
        ).all()
        
        updated_count = 0
        platform_stats = {}
        
        for card in active_cards:
            platform = card.platform_account.platform
            old_price = card.current_price
            
            new_price = self.update_card_pricing(str(card.id))
            
            if new_price != old_price:
                updated_count += 1
                platform_stats[platform] = platform_stats.get(platform, 0) + 1
        
        logger.info("All card pricing updated", 
                   total_cards=len(active_cards), 
                   updated_count=updated_count,
                   platform_stats=platform_stats)
        
        return platform_stats
    
    def get_pricing_trends(self, platform: str, days: int = 7) -> Dict[str, Any]:
        """Get pricing trends for a platform"""
        
        end_time = datetime.utcnow()
        start_time = end_time - timedelta(days=days)
        
        # Get price history
        price_data = self.db.query(VirtualCard).filter(
            and_(
                VirtualCard.platform_account.has(platform=platform),
                VirtualCard.created_at >= start_time
            )
        ).all()
        
        # Calculate trends
        prices = [card.current_price for card in price_data]
        base_prices = [card.base_price for card in price_data]
        
        if not prices:
            return {
                "platform": platform,
                "average_price": 0,
                "price_trend": "stable",
                "demand_level": "low",
                "recommended_multiplier": 1.0
            }
        
        avg_price = np.mean(prices)
        avg_base_price = np.mean(base_prices)
        price_trend = self._calculate_trend(prices)
        
        # Calculate demand level
        recent_usage = self._get_recent_usage(platform, hours=24)
        demand_level = self._classify_demand_level(recent_usage)
        
        # Recommend multiplier
        recommended_multiplier = self._recommend_multiplier(avg_price, avg_base_price, demand_level)
        
        return {
            "platform": platform,
            "average_price": round(avg_price, 2),
            "average_base_price": round(avg_base_price, 2),
            "price_trend": price_trend,
            "demand_level": demand_level,
            "recommended_multiplier": round(recommended_multiplier, 2),
            "sample_size": len(prices)
        }
    
    def predict_optimal_pricing(
        self,
        platform: str,
        base_price: float,
        target_utilization: float = 0.8
    ) -> Dict[str, Any]:
        """Predict optimal pricing for maximum revenue"""
        
        # Get historical data
        historical_data = self._get_historical_pricing_data(platform)
        
        if not historical_data:
            return {
                "optimal_price": base_price,
                "predicted_utilization": 0.5,
                "confidence": "low"
            }
        
        # Simple linear regression for price vs utilization
        prices, utilizations = zip(*historical_data)
        
        if len(prices) < 3:
            return {
                "optimal_price": base_price,
                "predicted_utilization": 0.5,
                "confidence": "low"
            }
        
        # Calculate correlation
        correlation = np.corrcoef(prices, utilizations)[0, 1]
        
        # Predict optimal price
        optimal_price = self._find_optimal_price(prices, utilizations, target_utilization)
        
        # Calculate confidence
        confidence = "high" if abs(correlation) > 0.7 else "medium" if abs(correlation) > 0.4 else "low"
        
        return {
            "optimal_price": round(optimal_price, 2),
            "predicted_utilization": target_utilization,
            "confidence": confidence,
            "correlation": round(correlation, 3)
        }
    
    def _calculate_demand_score(self, active_sessions: int, total_requests: int) -> float:
        """Calculate demand score from metrics"""
        
        # Normalize metrics
        session_score = min(active_sessions / 100, 1.0)  # Cap at 100 sessions
        request_score = min(total_requests / 1000, 1.0)  # Cap at 1000 requests
        
        # Weighted combination
        demand_score = (session_score * 0.6) + (request_score * 0.4)
        
        return demand_score
    
    def _apply_demand_multiplier(self, demand_score: float) -> float:
        """Apply demand multiplier based on score"""
        
        # Linear scaling from 0.8 to 2.0
        multiplier = 0.8 + (demand_score * 1.2)
        
        return round(multiplier, 2)
    
    def _calculate_trend(self, prices: List[float]) -> str:
        """Calculate price trend"""
        
        if len(prices) < 2:
            return "stable"
        
        # Simple trend calculation
        first_half = np.mean(prices[:len(prices)//2])
        second_half = np.mean(prices[len(prices)//2:])
        
        change_percent = ((second_half - first_half) / first_half) * 100
        
        if change_percent > 5:
            return "increasing"
        elif change_percent < -5:
            return "decreasing"
        else:
            return "stable"
    
    def _get_recent_usage(self, platform: str, hours: int) -> int:
        """Get recent usage count"""
        
        start_time = datetime.utcnow() - timedelta(hours=hours)
        
        return self.db.query(UsageLog).filter(
            and_(
                UsageLog.platform == platform,
                UsageLog.created_at >= start_time
            )
        ).count()
    
    def _classify_demand_level(self, usage_count: int) -> str:
        """Classify demand level"""
        
        if usage_count > 100:
            return "high"
        elif usage_count > 50:
            return "medium"
        elif usage_count > 10:
            return "low"
        else:
            return "very_low"
    
    def _recommend_multiplier(self, avg_price: float, avg_base_price: float, demand_level: str) -> float:
        """Recommend pricing multiplier"""
        
        current_multiplier = avg_price / avg_base_price if avg_base_price > 0 else 1.0
        
        demand_adjustments = {
            "high": 1.2,
            "medium": 1.0,
            "low": 0.8,
            "very_low": 0.6
        }
        
        adjustment = demand_adjustments.get(demand_level, 1.0)
        recommended = current_multiplier * adjustment
        
        # Bound between 0.5 and 3.0
        return max(0.5, min(recommended, 3.0))
    
    def _get_historical_pricing_data(self, platform: str) -> List[Tuple[float, float]]:
        """Get historical pricing and utilization data"""
        
        # This would query historical data from usage logs and transactions
        # For now, return empty list
        return []
    
    def _find_optimal_price(self, prices: List[float], utilizations: List[float], target_utilization: float) -> float:
        """Find optimal price for target utilization"""
        
        # Simple linear interpolation
        if len(prices) < 2:
            return prices[0] if prices else 1.0
        
        # Find closest utilization points
        utilizations = np.array(utilizations)
        prices = np.array(prices)
        
        # Sort by utilization
        sorted_indices = np.argsort(utilizations)
        utilizations = utilizations[sorted_indices]
        prices = prices[sorted_indices]
        
        # Interpolate
        optimal_price = np.interp(target_utilization, utilizations, prices)
        
        return optimal_price
