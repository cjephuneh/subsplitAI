"""
Monitoring and observability services
"""

import asyncio
from prometheus_client import Counter, Histogram, Gauge, start_http_server
import structlog

logger = structlog.get_logger()

# Prometheus metrics
REQUEST_COUNT = Counter('subsplit_requests_total', 'Total requests', ['method', 'endpoint', 'status'])
REQUEST_DURATION = Histogram('subsplit_request_duration_seconds', 'Request duration')
ACTIVE_SESSIONS = Gauge('subsplit_active_sessions', 'Active sessions')
VIRTUAL_CARDS_ACTIVE = Gauge('subsplit_virtual_cards_active', 'Active virtual cards')
CREDIT_POOLS_ACTIVE = Gauge('subsplit_credit_pools_active', 'Active credit pools')

async def setup_monitoring():
    """Setup monitoring and metrics collection"""
    try:
        # Start Prometheus metrics server
        start_http_server(8001)
        logger.info("Prometheus metrics server started on port 8001")
        
        # Start background tasks
        asyncio.create_task(collect_metrics())
        
    except Exception as e:
        logger.error("Failed to setup monitoring", error=str(e))

async def collect_metrics():
    """Collect and update metrics"""
    while True:
        try:
            # Update active sessions metric
            # This would query the database for actual counts
            ACTIVE_SESSIONS.set(0)  # Placeholder
            
            # Update virtual cards metric
            VIRTUAL_CARDS_ACTIVE.set(0)  # Placeholder
            
            # Update credit pools metric
            CREDIT_POOLS_ACTIVE.set(0)  # Placeholder
            
            # Wait 30 seconds before next collection
            await asyncio.sleep(30)
            
        except Exception as e:
            logger.error("Error collecting metrics", error=str(e))
            await asyncio.sleep(30)

def record_request(method: str, endpoint: str, status_code: int, duration: float):
    """Record request metrics"""
    REQUEST_COUNT.labels(method=method, endpoint=endpoint, status=status_code).inc()
    REQUEST_DURATION.observe(duration)
