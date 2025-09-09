"""
Platform Integration Service - Handles integration with AI platforms
"""

import asyncio
import json
from datetime import datetime, timedelta
from typing import Dict, Any, Optional, List
from playwright.async_api import async_playwright, Browser, BrowserContext, Page
from sqlalchemy.orm import Session
from app.models.platform_account import PlatformAccount, PlatformType
from app.models.session import Session as SessionModel, SessionStatus
from app.models.virtual_card import VirtualCard
from app.core.config import settings
import structlog

logger = structlog.get_logger()

class PlatformIntegrationService:
    def __init__(self, db: Session):
        self.db = db
        self.browser_pool = []
        self.max_browsers = 5
    
    async def create_session(self, virtual_card: VirtualCard, user_id: str) -> Dict[str, Any]:
        """Create isolated session for platform access"""
        
        platform_account = virtual_card.platform_account
        platform = platform_account.platform
        
        # Get browser from pool
        browser = await self._get_browser()
        
        # Create isolated context
        context = await browser.new_context(
            user_agent=self._get_user_agent(platform),
            viewport={"width": 1920, "height": 1080},
            ignore_https_errors=True
        )
        
        # Create page
        page = await context.new_page()
        
        # Login to platform
        login_success = await self._login_to_platform(page, platform, platform_account)
        
        if not login_success:
            await context.close()
            raise Exception(f"Failed to login to {platform}")
        
        # Create session record
        session_token = self._generate_session_token()
        expires_at = datetime.utcnow() + timedelta(hours=virtual_card.expiry_date.hour)
        
        session = SessionModel(
            buyer_id=user_id,
            virtual_card_id=str(virtual_card.id),
            platform_account_id=str(platform_account.id),
            session_token=session_token,
            browser_session_id=str(id(page)),
            session_data={
                "platform": platform,
                "browser_id": str(id(browser)),
                "context_id": str(id(context)),
                "page_id": str(id(page))
            },
            expires_at=expires_at,
            platform_session_id=await self._get_platform_session_id(page, platform)
        )
        
        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)
        
        logger.info("Session created", session_id=str(session.id), platform=platform)
        
        return {
            "session_id": str(session.id),
            "session_token": session_token,
            "expires_at": expires_at.isoformat(),
            "platform": platform,
            "browser_data": {
                "browser_id": str(id(browser)),
                "context_id": str(id(context)),
                "page_id": str(id(page))
            }
        }
    
    async def execute_request(self, session_id: str, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute request on platform"""
        
        session = self.db.query(SessionModel).filter(SessionModel.id == session_id).first()
        
        if not session or not session.is_active():
            raise Exception("Session not active")
        
        # Get browser components
        browser_data = session.session_data
        browser = self._get_browser_by_id(browser_data["browser_id"])
        context = self._get_context_by_id(browser, browser_data["context_id"])
        page = self._get_page_by_id(context, browser_data["page_id"])
        
        # Execute request based on platform
        platform = session.platform_account.platform
        response = await self._execute_platform_request(page, platform, request_data)
        
        # Update session
        session.request_count += 1
        session.last_request_at = datetime.utcnow()
        session.total_usage += response.get("cost", 0)
        
        self.db.commit()
        
        logger.info("Request executed", session_id=session_id, platform=platform)
        
        return response
    
    async def terminate_session(self, session_id: str) -> bool:
        """Terminate session and cleanup resources"""
        
        session = self.db.query(SessionModel).filter(SessionModel.id == session_id).first()
        
        if not session:
            return False
        
        # Close browser resources
        browser_data = session.session_data
        browser = self._get_browser_by_id(browser_data["browser_id"])
        context = self._get_context_by_id(browser, browser_data["context_id"])
        
        await context.close()
        
        # Update session status
        session.status = SessionStatus.TERMINATED
        session.terminated_at = datetime.utcnow()
        
        self.db.commit()
        
        logger.info("Session terminated", session_id=session_id)
        
        return True
    
    async def _get_browser(self) -> Browser:
        """Get browser from pool or create new one"""
        if len(self.browser_pool) < self.max_browsers:
            playwright = await async_playwright().start()
            browser = await playwright.chromium.launch(headless=True)
            self.browser_pool.append(browser)
            return browser
        
        return self.browser_pool[0]  # Simple round-robin
    
    async def _login_to_platform(self, page: Page, platform: PlatformType, account: PlatformAccount) -> bool:
        """Login to specific platform"""
        
        if platform == PlatformType.CHATGPT:
            return await self._login_chatgpt(page, account)
        elif platform == PlatformType.CLAUDE:
            return await self._login_claude(page, account)
        elif platform == PlatformType.GEMINI:
            return await self._login_gemini(page, account)
        else:
            raise Exception(f"Unsupported platform: {platform}")
    
    async def _login_chatgpt(self, page: Page, account: PlatformAccount) -> bool:
        """Login to ChatGPT"""
        try:
            await page.goto(settings.CHATGPT_BASE_URL)
            await page.wait_for_load_state("networkidle")
            
            # Click login button
            await page.click("text=Log in")
            await page.wait_for_load_state("networkidle")
            
            # Enter email
            await page.fill('input[type="email"]', account.email)
            await page.click("text=Continue")
            await page.wait_for_load_state("networkidle")
            
            # Enter password (decrypt from account.encrypted_credentials)
            password = self._decrypt_credentials(account.encrypted_credentials)
            await page.fill('input[type="password"]', password)
            await page.click("text=Continue")
            
            # Wait for dashboard
            await page.wait_for_selector(".chat-container", timeout=10000)
            
            return True
            
        except Exception as e:
            logger.error("ChatGPT login failed", error=str(e))
            return False
    
    async def _login_claude(self, page: Page, account: PlatformAccount) -> bool:
        """Login to Claude"""
        try:
            await page.goto(settings.CLAUDE_BASE_URL)
            await page.wait_for_load_state("networkidle")
            
            # Claude login logic here
            # Similar to ChatGPT but with Claude-specific selectors
            
            return True
            
        except Exception as e:
            logger.error("Claude login failed", error=str(e))
            return False
    
    async def _login_gemini(self, page: Page, account: PlatformAccount) -> bool:
        """Login to Gemini"""
        try:
            await page.goto(settings.GEMINI_BASE_URL)
            await page.wait_for_load_state("networkidle")
            
            # Gemini login logic here
            # Similar to ChatGPT but with Gemini-specific selectors
            
            return True
            
        except Exception as e:
            logger.error("Gemini login failed", error=str(e))
            return False
    
    async def _execute_platform_request(self, page: Page, platform: PlatformType, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute request on specific platform"""
        
        if platform == PlatformType.CHATGPT:
            return await self._execute_chatgpt_request(page, request_data)
        elif platform == PlatformType.CLAUDE:
            return await self._execute_claude_request(page, request_data)
        elif platform == PlatformType.GEMINI:
            return await self._execute_gemini_request(page, request_data)
        else:
            raise Exception(f"Unsupported platform: {platform}")
    
    async def _execute_chatgpt_request(self, page: Page, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute ChatGPT request"""
        try:
            # Find input field
            input_selector = 'textarea[placeholder*="Message"]'
            await page.wait_for_selector(input_selector)
            
            # Type message
            message = request_data.get("message", "")
            await page.fill(input_selector, message)
            
            # Send message
            await page.press(input_selector, "Enter")
            
            # Wait for response
            await page.wait_for_selector(".markdown", timeout=30000)
            
            # Get response
            response_elements = await page.query_selector_all(".markdown")
            response_text = ""
            for element in response_elements:
                text = await element.inner_text()
                response_text += text + "\n"
            
            # Calculate cost
            cost = self._calculate_cost(len(message), len(response_text))
            
            return {
                "response": response_text.strip(),
                "cost": cost,
                "success": True
            }
            
        except Exception as e:
            logger.error("ChatGPT request failed", error=str(e))
            return {
                "response": "",
                "cost": 0,
                "success": False,
                "error": str(e)
            }
    
    async def _execute_claude_request(self, page: Page, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute Claude request"""
        # Similar to ChatGPT but with Claude-specific logic
        pass
    
    async def _execute_gemini_request(self, page: Page, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute Gemini request"""
        # Similar to ChatGPT but with Gemini-specific logic
        pass
    
    def _get_user_agent(self, platform: PlatformType) -> str:
        """Get platform-specific user agent"""
        user_agents = {
            PlatformType.CHATGPT: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            PlatformType.CLAUDE: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            PlatformType.GEMINI: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
        }
        return user_agents.get(platform, "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36")
    
    def _generate_session_token(self) -> str:
        """Generate unique session token"""
        import secrets
        return secrets.token_urlsafe(32)
    
    def _decrypt_credentials(self, encrypted_credentials: str) -> str:
        """Decrypt stored credentials"""
        # Implement encryption/decryption logic
        return encrypted_credentials  # Placeholder
    
    def _calculate_cost(self, input_tokens: int, output_tokens: int) -> float:
        """Calculate cost based on tokens"""
        # Simple cost calculation
        input_cost = input_tokens * 0.0001
        output_cost = output_tokens * 0.0002
        return input_cost + output_cost
    
    async def _get_platform_session_id(self, page: Page, platform: PlatformType) -> str:
        """Get platform's internal session ID"""
        # Extract session ID from cookies or local storage
        cookies = await page.context.cookies()
        for cookie in cookies:
            if "session" in cookie["name"].lower():
                return cookie["value"]
        return "unknown"
    
    def _get_browser_by_id(self, browser_id: str) -> Browser:
        """Get browser by ID from pool"""
        for browser in self.browser_pool:
            if str(id(browser)) == browser_id:
                return browser
        raise Exception("Browser not found in pool")
    
    def _get_context_by_id(self, browser: Browser, context_id: str) -> BrowserContext:
        """Get context by ID from browser"""
        # This would need to be implemented based on how contexts are stored
        pass
    
    def _get_page_by_id(self, context: BrowserContext, page_id: str) -> Page:
        """Get page by ID from context"""
        # This would need to be implemented based on how pages are stored
        pass
