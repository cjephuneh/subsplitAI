"""
Sessions API endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict, Any
from pydantic import BaseModel
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.services.platform_integration_service import PlatformIntegrationService
import structlog

logger = structlog.get_logger()
router = APIRouter()

class SessionCreateRequest(BaseModel):
    virtual_card_id: str

class SessionRequest(BaseModel):
    message: str
    request_type: str = "chat"

@router.post("/create")
async def create_session(
    request: SessionCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new platform session"""
    
    try:
        platform_service = PlatformIntegrationService(db)
        
        # Get virtual card
        from app.models.virtual_card import VirtualCard
        virtual_card = db.query(VirtualCard).filter(
            VirtualCard.id == request.virtual_card_id
        ).first()
        
        if not virtual_card:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Virtual card not found"
            )
        
        # Check if user owns the card
        if str(virtual_card.buyer_id) != str(current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        # Create session
        session_data = await platform_service.create_session(
            virtual_card=virtual_card,
            user_id=str(current_user.id)
        )
        
        logger.info("Session created", 
                   session_id=session_data["session_id"],
                   user_id=str(current_user.id))
        
        return session_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to create session", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.post("/{session_id}/request")
async def execute_request(
    session_id: str,
    request: SessionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Execute request in session"""
    
    try:
        platform_service = PlatformIntegrationService(db)
        
        # Check if user owns the session
        from app.models.session import Session as SessionModel
        session = db.query(SessionModel).filter(
            SessionModel.id == session_id
        ).first()
        
        if not session or str(session.buyer_id) != str(current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        # Execute request
        response = await platform_service.execute_request(
            session_id=session_id,
            request_data={
                "message": request.message,
                "request_type": request.request_type
            }
        )
        
        logger.info("Request executed", 
                   session_id=session_id,
                   user_id=str(current_user.id))
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to execute request", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.delete("/{session_id}")
async def terminate_session(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Terminate session"""
    
    try:
        platform_service = PlatformIntegrationService(db)
        
        # Check if user owns the session
        from app.models.session import Session as SessionModel
        session = db.query(SessionModel).filter(
            SessionModel.id == session_id
        ).first()
        
        if not session or str(session.buyer_id) != str(current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        # Terminate session
        success = await platform_service.terminate_session(session_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to terminate session"
            )
        
        logger.info("Session terminated", 
                   session_id=session_id,
                   user_id=str(current_user.id))
        
        return {"success": True, "message": "Session terminated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to terminate session", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/{session_id}")
async def get_session_info(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get session information"""
    
    try:
        from app.models.session import Session as SessionModel
        
        session = db.query(SessionModel).filter(
            SessionModel.id == session_id
        ).first()
        
        if not session or str(session.buyer_id) != str(current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        return {
            "session_id": str(session.id),
            "session_token": session.session_token,
            "platform": session.platform_account.platform,
            "status": session.status,
            "total_usage": session.total_usage,
            "request_count": session.request_count,
            "started_at": session.started_at.isoformat(),
            "expires_at": session.expires_at.isoformat(),
            "last_request_at": session.last_request_at.isoformat() if session.last_request_at else None
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to get session info", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/")
async def get_user_sessions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's active sessions"""
    
    try:
        from app.models.session import Session as SessionModel
        
        sessions = db.query(SessionModel).filter(
            SessionModel.buyer_id == current_user.id
        ).all()
        
        session_list = []
        for session in sessions:
            session_list.append({
                "session_id": str(session.id),
                "platform": session.platform_account.platform,
                "status": session.status,
                "total_usage": session.total_usage,
                "request_count": session.request_count,
                "started_at": session.started_at.isoformat(),
                "expires_at": session.expires_at.isoformat(),
                "remaining_time": session.get_remaining_time().total_seconds() if session.is_active() else 0
            })
        
        logger.info("User sessions retrieved", 
                   user_id=str(current_user.id),
                   count=len(session_list))
        
        return {
            "sessions": session_list,
            "total_count": len(session_list)
        }
        
    except Exception as e:
        logger.error("Failed to get user sessions", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
