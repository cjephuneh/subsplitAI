"""
Platform Accounts API endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.platform_account import PlatformAccount, PlatformType, AccountStatus
import structlog

logger = structlog.get_logger()
router = APIRouter()

class PlatformAccountCreateRequest(BaseModel):
    platform: PlatformType
    email: str
    password: str
    api_key: str = None

class PlatformAccountUpdateRequest(BaseModel):
    email: str = None
    password: str = None
    api_key: str = None
    allow_pooling: bool = None
    min_pool_amount: float = None
    max_pool_amount: float = None

@router.post("/connect")
async def connect_platform_account(
    request: PlatformAccountCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Connect a new platform account"""
    
    try:
        # Check if account already exists
        existing_account = db.query(PlatformAccount).filter(
            PlatformAccount.user_id == current_user.id,
            PlatformAccount.platform == request.platform,
            PlatformAccount.email == request.email
        ).first()
        
        if existing_account:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Account already connected"
            )
        
        # Create platform account
        platform_account = PlatformAccount(
            user_id=current_user.id,
            platform=request.platform,
            email=request.email,
            encrypted_credentials=request.password,  # Should be encrypted
            api_key=request.api_key,
            status=AccountStatus.VERIFICATION_PENDING
        )
        
        db.add(platform_account)
        db.commit()
        db.refresh(platform_account)
        
        logger.info("Platform account connected", 
                   account_id=str(platform_account.id),
                   platform=request.platform,
                   user_id=str(current_user.id))
        
        return {
            "account_id": str(platform_account.id),
            "platform": platform_account.platform,
            "email": platform_account.email,
            "status": platform_account.status,
            "created_at": platform_account.created_at.isoformat()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to connect platform account", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/")
async def get_platform_accounts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's platform accounts"""
    
    try:
        accounts = db.query(PlatformAccount).filter(
            PlatformAccount.user_id == current_user.id
        ).all()
        
        account_list = []
        for account in accounts:
            account_list.append({
                "account_id": str(account.id),
                "platform": account.platform,
                "email": account.email,
                "status": account.status,
                "is_premium": account.is_premium,
                "subscription_type": account.subscription_type,
                "available_credits": account.available_credits,
                "total_credits": account.total_credits,
                "allow_pooling": account.allow_pooling,
                "min_pool_amount": account.min_pool_amount,
                "max_pool_amount": account.max_pool_amount,
                "created_at": account.created_at.isoformat(),
                "last_credit_sync": account.last_credit_sync.isoformat() if account.last_credit_sync else None
            })
        
        logger.info("Platform accounts retrieved", 
                   user_id=str(current_user.id),
                   count=len(account_list))
        
        return {
            "accounts": account_list,
            "total_count": len(account_list)
        }
        
    except Exception as e:
        logger.error("Failed to get platform accounts", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/{account_id}")
async def get_platform_account(
    account_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get specific platform account details"""
    
    try:
        account = db.query(PlatformAccount).filter(
            PlatformAccount.id == account_id,
            PlatformAccount.user_id == current_user.id
        ).first()
        
        if not account:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Platform account not found"
            )
        
        return {
            "account_id": str(account.id),
            "platform": account.platform,
            "email": account.email,
            "status": account.status,
            "is_premium": account.is_premium,
            "subscription_type": account.subscription_type,
            "available_credits": account.available_credits,
            "total_credits": account.total_credits,
            "credits_used": account.credits_used,
            "allow_pooling": account.allow_pooling,
            "min_pool_amount": account.min_pool_amount,
            "max_pool_amount": account.max_pool_amount,
            "created_at": account.created_at.isoformat(),
            "last_credit_sync": account.last_credit_sync.isoformat() if account.last_credit_sync else None,
            "verified_at": account.verified_at.isoformat() if account.verified_at else None
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to get platform account", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.put("/{account_id}")
async def update_platform_account(
    account_id: str,
    request: PlatformAccountUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update platform account settings"""
    
    try:
        account = db.query(PlatformAccount).filter(
            PlatformAccount.id == account_id,
            PlatformAccount.user_id == current_user.id
        ).first()
        
        if not account:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Platform account not found"
            )
        
        # Update fields
        if request.email is not None:
            account.email = request.email
        if request.password is not None:
            account.encrypted_credentials = request.password  # Should be encrypted
        if request.api_key is not None:
            account.api_key = request.api_key
        if request.allow_pooling is not None:
            account.allow_pooling = request.allow_pooling
        if request.min_pool_amount is not None:
            account.min_pool_amount = request.min_pool_amount
        if request.max_pool_amount is not None:
            account.max_pool_amount = request.max_pool_amount
        
        db.commit()
        
        logger.info("Platform account updated", 
                   account_id=account_id,
                   user_id=str(current_user.id))
        
        return {"success": True, "message": "Account updated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to update platform account", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.delete("/{account_id}")
async def disconnect_platform_account(
    account_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Disconnect platform account"""
    
    try:
        account = db.query(PlatformAccount).filter(
            PlatformAccount.id == account_id,
            PlatformAccount.user_id == current_user.id
        ).first()
        
        if not account:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Platform account not found"
            )
        
        # Check if account has active virtual cards
        from app.models.virtual_card import VirtualCard
        active_cards = db.query(VirtualCard).filter(
            VirtualCard.platform_account_id == account_id,
            VirtualCard.status == "active"
        ).count()
        
        if active_cards > 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot disconnect account with active virtual cards"
            )
        
        # Delete account
        db.delete(account)
        db.commit()
        
        logger.info("Platform account disconnected", 
                   account_id=account_id,
                   user_id=str(current_user.id))
        
        return {"success": True, "message": "Account disconnected successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to disconnect platform account", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.post("/{account_id}/sync-credits")
async def sync_credits(
    account_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Sync credits from platform account"""
    
    try:
        account = db.query(PlatformAccount).filter(
            PlatformAccount.id == account_id,
            PlatformAccount.user_id == current_user.id
        ).first()
        
        if not account:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Platform account not found"
            )
        
        # This would integrate with platform APIs to get actual credit balance
        # For now, just update the timestamp
        account.last_credit_sync = datetime.utcnow()
        db.commit()
        
        logger.info("Credits synced", 
                   account_id=account_id,
                   user_id=str(current_user.id))
        
        return {
            "success": True, 
            "message": "Credits synced successfully",
            "last_sync": account.last_credit_sync.isoformat()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to sync credits", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
