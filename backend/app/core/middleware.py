"""
Custom middleware for the application
"""

import time
import structlog
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response as StarletteResponse
from app.core.database import get_redis
import redis

logger = structlog.get_logger()

class LoggingMiddleware(BaseHTTPMiddleware):
    """Middleware for request/response logging"""
    
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Log request
        logger.info("Request started",
                  method=request.method,
                  url=str(request.url),
                  client_ip=request.client.host if request.client else "unknown")
        
        # Process request
        response = await call_next(request)
        
        # Calculate processing time
        process_time = time.time() - start_time
        
        # Log response
        logger.info("Request completed",
                  method=request.method,
                  url=str(request.url),
                  status_code=response.status_code,
                  process_time=round(process_time, 4))
        
        return response

class RateLimitMiddleware(BaseHTTPMiddleware):
    """Middleware for rate limiting"""
    
    def __init__(self, app, calls: int = 100, period: int = 60):
        super().__init__(app)
        self.calls = calls
        self.period = period
        self.redis_client = redis.from_url("redis://localhost:6379", decode_responses=True)
    
    async def dispatch(self, request: Request, call_next):
        # Get client IP
        client_ip = request.client.host if request.client else "unknown"
        
        # Check rate limit
        if await self._is_rate_limited(client_ip):
            logger.warning("Rate limit exceeded", client_ip=client_ip)
            return StarletteResponse(
                content="Rate limit exceeded",
                status_code=429,
                headers={"Retry-After": str(self.period)}
            )
        
        # Process request
        response = await call_next(request)
        
        # Update rate limit counter
        await self._update_rate_limit(client_ip)
        
        return response
    
    async def _is_rate_limited(self, client_ip: str) -> bool:
        """Check if client is rate limited"""
        key = f"rate_limit:{client_ip}"
        current_calls = self.redis_client.get(key)
        
        if current_calls is None:
            return False
        
        return int(current_calls) >= self.calls
    
    async def _update_rate_limit(self, client_ip: str):
        """Update rate limit counter"""
        key = f"rate_limit:{client_ip}"
        
        # Increment counter
        current_calls = self.redis_client.incr(key)
        
        # Set expiration on first call
        if current_calls == 1:
            self.redis_client.expire(key, self.period)
