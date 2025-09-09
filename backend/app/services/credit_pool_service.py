"""
Credit Pool Service - Handles credit pooling across multiple accounts
"""

from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_, func
from app.models.credit_pool import CreditPool, CreditPoolContribution, PoolSession, PoolStatus
from app.models.platform_account import PlatformAccount
from app.models.user import User
from app.core.config import settings
import structlog

logger = structlog.get_logger()

class CreditPoolService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_pool(
        self,
        owner_id: str,
        platform: str,
        pool_name: str,
        min_contribution: float = None,
        max_contribution: float = None,
        is_public: bool = False
    ) -> CreditPool:
        """Create a new credit pool"""
        
        if min_contribution is None:
            min_contribution = settings.MIN_POOL_BALANCE
        if max_contribution is None:
            max_contribution = settings.MAX_POOL_SIZE * 10
        
        pool = CreditPool(
            owner_id=owner_id,
            platform=platform,
            pool_name=pool_name,
            min_contribution=min_contribution,
            max_contribution=max_contribution,
            is_public=is_public,
            status=PoolStatus.ACTIVE
        )
        
        self.db.add(pool)
        self.db.commit()
        self.db.refresh(pool)
        
        logger.info("Credit pool created", pool_id=str(pool.id), owner_id=owner_id, platform=platform)
        
        return pool
    
    def contribute_to_pool(
        self,
        pool_id: str,
        platform_account_id: str,
        contributor_id: str,
        amount: float
    ) -> CreditPoolContribution:
        """Contribute credits to a pool"""
        
        pool = self.db.query(CreditPool).filter(CreditPool.id == pool_id).first()
        if not pool:
            raise Exception("Pool not found")
        
        if pool.status != PoolStatus.ACTIVE:
            raise Exception("Pool is not active")
        
        if amount < pool.min_contribution or amount > pool.max_contribution:
            raise Exception(f"Amount must be between {pool.min_contribution} and {pool.max_contribution}")
        
        # Check if platform account has enough credits
        platform_account = self.db.query(PlatformAccount).filter(
            PlatformAccount.id == platform_account_id
        ).first()
        
        if not platform_account or platform_account.available_credits < amount:
            raise Exception("Insufficient credits in platform account")
        
        # Create contribution
        contribution = CreditPoolContribution(
            credit_pool_id=pool_id,
            platform_account_id=platform_account_id,
            contributor_id=contributor_id,
            amount=amount
        )
        
        # Update pool balance
        pool.total_contributed += amount
        pool.current_balance += amount
        pool.available_balance += amount
        
        # Update platform account
        platform_account.available_credits -= amount
        platform_account.credits_used += amount
        
        self.db.add(contribution)
        self.db.commit()
        self.db.refresh(contribution)
        
        logger.info("Contribution made", contribution_id=str(contribution.id), amount=amount)
        
        return contribution
    
    def create_pool_session(
        self,
        pool_id: str,
        user_id: str,
        requested_amount: float,
        duration_hours: int = 1
    ) -> PoolSession:
        """Create a session from pool credits"""
        
        pool = self.db.query(CreditPool).filter(CreditPool.id == pool_id).first()
        if not pool:
            raise Exception("Pool not found")
        
        if pool.available_balance < requested_amount:
            raise Exception("Insufficient pool balance")
        
        # Create session
        session_token = self._generate_session_token()
        expires_at = datetime.utcnow() + timedelta(hours=duration_hours)
        
        session = PoolSession(
            credit_pool_id=pool_id,
            user_id=user_id,
            session_token=session_token,
            allocated_amount=requested_amount,
            expires_at=expires_at
        )
        
        # Update pool
        pool.available_balance -= requested_amount
        pool.total_sessions += 1
        pool.active_sessions += 1
        pool.last_used_at = datetime.utcnow()
        
        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)
        
        logger.info("Pool session created", session_id=str(session.id), amount=requested_amount)
        
        return session
    
    def use_pool_session(self, session_id: str, amount: float) -> bool:
        """Use credits from pool session"""
        
        session = self.db.query(PoolSession).filter(PoolSession.id == session_id).first()
        if not session:
            return False
        
        if session.status != "active":
            return False
        
        if session.used_amount + amount > session.allocated_amount:
            return False
        
        # Update session usage
        session.used_amount += amount
        
        # Update pool
        pool = session.credit_pool
        pool.total_used += amount
        
        self.db.commit()
        
        logger.info("Pool session used", session_id=session_id, amount=amount)
        
        return True
    
    def complete_pool_session(self, session_id: str) -> bool:
        """Complete pool session and return unused credits"""
        
        session = self.db.query(PoolSession).filter(PoolSession.id == session_id).first()
        if not session:
            return False
        
        # Calculate unused credits
        unused_amount = session.allocated_amount - session.used_amount
        
        # Return unused credits to pool
        pool = session.credit_pool
        pool.available_balance += unused_amount
        
        # Update session
        session.status = "completed"
        session.completed_at = datetime.utcnow()
        
        # Update pool stats
        pool.active_sessions -= 1
        
        self.db.commit()
        
        logger.info("Pool session completed", session_id=session_id, unused_amount=unused_amount)
        
        return True
    
    def get_pool_stats(self, pool_id: str) -> Dict[str, Any]:
        """Get pool statistics"""
        
        pool = self.db.query(CreditPool).filter(CreditPool.id == pool_id).first()
        if not pool:
            raise Exception("Pool not found")
        
        # Get contribution stats
        contributions = self.db.query(CreditPoolContribution).filter(
            CreditPoolContribution.credit_pool_id == pool_id
        ).all()
        
        # Get active sessions
        active_sessions = self.db.query(PoolSession).filter(
            and_(
                PoolSession.credit_pool_id == pool_id,
                PoolSession.status == "active"
            )
        ).count()
        
        return {
            "pool_id": str(pool.id),
            "name": pool.pool_name,
            "platform": pool.platform,
            "status": pool.status,
            "total_contributed": pool.total_contributed,
            "total_used": pool.total_used,
            "current_balance": pool.current_balance,
            "available_balance": pool.available_balance,
            "utilization_percentage": pool.get_utilization_percentage(),
            "total_sessions": pool.total_sessions,
            "active_sessions": active_sessions,
            "contributions_count": len(contributions),
            "created_at": pool.created_at.isoformat()
        }
    
    def get_public_pools(self, platform: str = None) -> List[Dict[str, Any]]:
        """Get public pools"""
        
        query = self.db.query(CreditPool).filter(
            and_(
                CreditPool.is_public == True,
                CreditPool.status == PoolStatus.ACTIVE
            )
        )
        
        if platform:
            query = query.filter(CreditPool.platform == platform)
        
        pools = query.all()
        
        return [
            {
                "pool_id": str(pool.id),
                "name": pool.pool_name,
                "platform": pool.platform,
                "available_balance": pool.available_balance,
                "min_contribution": pool.min_contribution,
                "max_contribution": pool.max_contribution,
                "utilization_percentage": pool.get_utilization_percentage(),
                "created_at": pool.created_at.isoformat()
            }
            for pool in pools
        ]
    
    def auto_refill_pool(self, pool_id: str) -> bool:
        """Auto-refill pool when balance is low"""
        
        pool = self.db.query(CreditPool).filter(CreditPool.id == pool_id).first()
        if not pool:
            return False
        
        if pool.current_balance > pool.auto_refill_threshold:
            return False
        
        # Find contributors who can contribute more
        contributors = self.db.query(CreditPoolContribution).filter(
            CreditPoolContribution.credit_pool_id == pool_id
        ).all()
        
        refill_amount = 0
        for contribution in contributors:
            platform_account = contribution.platform_account
            if platform_account.available_credits >= pool.auto_refill_amount:
                # Make auto contribution
                self.contribute_to_pool(
                    pool_id,
                    str(platform_account.id),
                    str(contribution.contributor_id),
                    pool.auto_refill_amount
                )
                refill_amount += pool.auto_refill_amount
        
        logger.info("Pool auto-refilled", pool_id=pool_id, amount=refill_amount)
        
        return refill_amount > 0
    
    def _generate_session_token(self) -> str:
        """Generate unique session token"""
        import secrets
        return secrets.token_urlsafe(32)
