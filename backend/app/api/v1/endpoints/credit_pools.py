"""
Credit Pools API endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.services.credit_pool_service import CreditPoolService
import structlog

logger = structlog.get_logger()
router = APIRouter()

class CreditPoolCreateRequest(BaseModel):
    platform: str
    pool_name: str
    min_contribution: float = 1.0
    max_contribution: float = 100.0
    is_public: bool = False

class CreditPoolContributeRequest(BaseModel):
    pool_id: str
    platform_account_id: str
    amount: float

class CreditPoolSessionRequest(BaseModel):
    pool_id: str
    requested_amount: float
    duration_hours: int = 1

@router.post("/create")
async def create_credit_pool(
    request: CreditPoolCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new credit pool"""
    
    try:
        pool_service = CreditPoolService(db)
        
        pool = pool_service.create_pool(
            owner_id=str(current_user.id),
            platform=request.platform,
            pool_name=request.pool_name,
            min_contribution=request.min_contribution,
            max_contribution=request.max_contribution,
            is_public=request.is_public
        )
        
        logger.info("Credit pool created", 
                   pool_id=str(pool.id), 
                   user_id=str(current_user.id))
        
        return {
            "pool_id": str(pool.id),
            "name": pool.pool_name,
            "platform": pool.platform,
            "status": pool.status,
            "min_contribution": pool.min_contribution,
            "max_contribution": pool.max_contribution,
            "is_public": pool.is_public,
            "created_at": pool.created_at.isoformat()
        }
        
    except Exception as e:
        logger.error("Failed to create credit pool", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create credit pool: {str(e)}"
        )

@router.post("/contribute")
async def contribute_to_pool(
    request: CreditPoolContributeRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Contribute credits to a pool"""
    
    try:
        pool_service = CreditPoolService(db)
        
        contribution = pool_service.contribute_to_pool(
            pool_id=request.pool_id,
            platform_account_id=request.platform_account_id,
            contributor_id=str(current_user.id),
            amount=request.amount
        )
        
        logger.info("Contribution made", 
                   contribution_id=str(contribution.id),
                   user_id=str(current_user.id))
        
        return {
            "contribution_id": str(contribution.id),
            "amount": contribution.amount,
            "status": contribution.status,
            "created_at": contribution.created_at.isoformat()
        }
        
    except Exception as e:
        logger.error("Failed to contribute to pool", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to contribute: {str(e)}"
        )

@router.post("/session/create")
async def create_pool_session(
    request: CreditPoolSessionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a session from pool credits"""
    
    try:
        pool_service = CreditPoolService(db)
        
        session = pool_service.create_pool_session(
            pool_id=request.pool_id,
            user_id=str(current_user.id),
            requested_amount=request.requested_amount,
            duration_hours=request.duration_hours
        )
        
        logger.info("Pool session created", 
                   session_id=str(session.id),
                   user_id=str(current_user.id))
        
        return {
            "session_id": str(session.id),
            "session_token": session.session_token,
            "allocated_amount": session.allocated_amount,
            "expires_at": session.expires_at.isoformat(),
            "created_at": session.created_at.isoformat()
        }
        
    except Exception as e:
        logger.error("Failed to create pool session", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create session: {str(e)}"
        )

@router.post("/session/{session_id}/use")
async def use_pool_session(
    session_id: str,
    amount: float,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Use credits from pool session"""
    
    try:
        pool_service = CreditPoolService(db)
        
        success = pool_service.use_pool_session(session_id, amount)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to use pool session"
            )
        
        logger.info("Pool session used", 
                   session_id=session_id,
                   amount=amount,
                   user_id=str(current_user.id))
        
        return {"success": True, "amount_used": amount}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to use pool session", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.post("/session/{session_id}/complete")
async def complete_pool_session(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Complete pool session and return unused credits"""
    
    try:
        pool_service = CreditPoolService(db)
        
        success = pool_service.complete_pool_session(session_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to complete pool session"
            )
        
        logger.info("Pool session completed", 
                   session_id=session_id,
                   user_id=str(current_user.id))
        
        return {"success": True, "message": "Session completed successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to complete pool session", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/{pool_id}/stats")
async def get_pool_stats(
    pool_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get pool statistics"""
    
    try:
        pool_service = CreditPoolService(db)
        
        stats = pool_service.get_pool_stats(pool_id)
        
        logger.info("Pool stats retrieved", pool_id=pool_id)
        
        return stats
        
    except Exception as e:
        logger.error("Failed to get pool stats", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to get stats: {str(e)}"
        )

@router.get("/public")
async def get_public_pools(
    platform: Optional[str] = Query(None, description="Filter by platform"),
    db: Session = Depends(get_db)
):
    """Get public credit pools"""
    
    try:
        pool_service = CreditPoolService(db)
        
        pools = pool_service.get_public_pools(platform)
        
        logger.info("Public pools retrieved", 
                   count=len(pools),
                   platform=platform)
        
        return {
            "pools": pools,
            "total_count": len(pools)
        }
        
    except Exception as e:
        logger.error("Failed to get public pools", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/my-pools")
async def get_my_pools(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's credit pools"""
    
    try:
        # Get user's pools
        pools = db.query(CreditPool).filter(
            CreditPool.owner_id == current_user.id
        ).all()
        
        pool_list = []
        for pool in pools:
            pool_list.append({
                "pool_id": str(pool.id),
                "name": pool.pool_name,
                "platform": pool.platform,
                "status": pool.status,
                "total_contributed": pool.total_contributed,
                "current_balance": pool.current_balance,
                "available_balance": pool.available_balance,
                "utilization_percentage": pool.get_utilization_percentage(),
                "is_public": pool.is_public,
                "created_at": pool.created_at.isoformat()
            })
        
        logger.info("User pools retrieved", 
                   user_id=str(current_user.id),
                   count=len(pool_list))
        
        return {
            "pools": pool_list,
            "total_count": len(pool_list)
        }
        
    except Exception as e:
        logger.error("Failed to get user pools", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.post("/{pool_id}/auto-refill")
async def trigger_auto_refill(
    pool_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Trigger auto-refill for a pool"""
    
    try:
        pool_service = CreditPoolService(db)
        
        success = pool_service.auto_refill_pool(pool_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Auto-refill not needed or failed"
            )
        
        logger.info("Pool auto-refilled", 
                   pool_id=pool_id,
                   user_id=str(current_user.id))
        
        return {"success": True, "message": "Pool auto-refilled successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to auto-refill pool", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
