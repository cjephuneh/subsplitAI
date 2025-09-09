/**
 * Subsplit API Service
 * Frontend integration with the Subsplit backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('access_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'API request failed');
      }

      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Authentication
  async register(userData: {
    email: string;
    username: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) {
    const response = await this.request<{ access_token: string; token_type: string }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );

    if (response.data) {
      this.token = response.data.access_token;
      localStorage.setItem('access_token', this.token);
    }

    return response;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{ access_token: string; token_type: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    );

    if (response.data) {
      this.token = response.data.access_token;
      localStorage.setItem('access_token', this.token);
    }

    return response;
  }

  async getCurrentUser() {
    return this.request<{
      id: string;
      email: string;
      username: string;
      first_name: string;
      last_name: string;
      balance: number;
      total_earned: number;
      total_spent: number;
    }>('/auth/me');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  // Virtual Cards
  async createVirtualCard(cardData: {
    platform_account_id: string;
    initial_balance: number;
    price_per_hour: number;
    expiry_hours?: number;
  }) {
    return this.request<{
      card_id: string;
      card_number: string;
      cvv: string;
      expiry_date: string;
      initial_balance: number;
      current_price: number;
      status: string;
    }>('/virtual-cards/create', {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  }

  async validateVirtualCard(cardData: { card_number: string; cvv: string }) {
    return this.request<{
      valid: boolean;
      balance?: number;
      card_id?: string;
      platform?: string;
      error?: string;
    }>('/virtual-cards/validate', {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  }

  async chargeVirtualCard(cardId: string, amount: number) {
    return this.request<{
      success: boolean;
      remaining_balance: number;
      total_charged: number;
    }>(`/virtual-cards/${cardId}/charge`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  async getVirtualCards() {
    return this.request<Array<{
      card_id: string;
      card_number: string;
      expiry_date: string;
      initial_balance: number;
      current_balance: number;
      current_price: number;
      status: string;
      platform: string;
    }>>('/virtual-cards/');
  }

  // Marketplace
  async getMarketplaceListings(filters?: {
    platform?: string;
    min_price?: number;
    max_price?: number;
    min_balance?: number;
    limit?: number;
    offset?: number;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return this.request<{
      listings: Array<{
        card_id: string;
        platform: string;
        seller_username: string;
        available_balance: number;
        price_per_hour: number;
        current_price: number;
        demand_multiplier: number;
        created_at: string;
        expires_at: string;
        utilization_percentage: number;
      }>;
      total_count: number;
      offset: number;
      limit: number;
    }>(`/marketplace/listings?${params.toString()}`);
  }

  async purchaseCredits(purchaseData: {
    card_id: string;
    amount: number;
    duration_hours?: number;
  }) {
    return this.request<{
      success: boolean;
      card_id: string;
      total_cost: number;
      duration_hours: number;
      remaining_balance: number;
      card_details: {
        card_number: string;
        cvv: string;
        expiry_date: string;
        platform: string;
      };
    }>('/marketplace/purchase', {
      method: 'POST',
      body: JSON.stringify(purchaseData),
    });
  }

  async getMyPurchases() {
    return this.request<{
      purchases: Array<{
        card_id: string;
        platform: string;
        seller_username: string;
        purchase_price: number;
        available_balance: number;
        purchased_at: string;
        expires_at: string;
        status: string;
      }>;
      total_count: number;
    }>('/marketplace/my-purchases');
  }

  async getMySales() {
    return this.request<{
      sales: Array<{
        card_id: string;
        platform: string;
        buyer_username: string;
        sale_price: number;
        initial_balance: number;
        remaining_balance: number;
        sold_at: string;
        status: string;
      }>;
      total_count: number;
    }>('/marketplace/my-sales');
  }

  // Credit Pools
  async createCreditPool(poolData: {
    platform: string;
    pool_name: string;
    min_contribution?: number;
    max_contribution?: number;
    is_public?: boolean;
  }) {
    return this.request<{
      pool_id: string;
      name: string;
      platform: string;
      status: string;
      min_contribution: number;
      max_contribution: number;
      is_public: boolean;
      created_at: string;
    }>('/credit-pools/create', {
      method: 'POST',
      body: JSON.stringify(poolData),
    });
  }

  async contributeToPool(contributionData: {
    pool_id: string;
    platform_account_id: string;
    amount: number;
  }) {
    return this.request<{
      contribution_id: string;
      amount: number;
      status: string;
      created_at: string;
    }>('/credit-pools/contribute', {
      method: 'POST',
      body: JSON.stringify(contributionData),
    });
  }

  async getPublicPools(platform?: string) {
    const params = platform ? `?platform=${platform}` : '';
    return this.request<{
      pools: Array<{
        pool_id: string;
        name: string;
        platform: string;
        available_balance: number;
        min_contribution: number;
        max_contribution: number;
        utilization_percentage: number;
        created_at: string;
      }>;
      total_count: number;
    }>(`/credit-pools/public${params}`);
  }

  async getMyPools() {
    return this.request<{
      pools: Array<{
        pool_id: string;
        name: string;
        platform: string;
        status: string;
        total_contributed: number;
        current_balance: number;
        available_balance: number;
        utilization_percentage: number;
        is_public: boolean;
        created_at: string;
      }>;
      total_count: number;
    }>('/credit-pools/my-pools');
  }

  // Sessions
  async createSession(sessionData: { virtual_card_id: string }) {
    return this.request<{
      session_id: string;
      session_token: string;
      expires_at: string;
      platform: string;
      browser_data: {
        browser_id: string;
        context_id: string;
        page_id: string;
      };
    }>('/sessions/create', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async executeRequest(sessionId: string, requestData: {
    message: string;
    request_type?: string;
  }) {
    return this.request<{
      response: string;
      cost: number;
      success: boolean;
      error?: string;
    }>(`/sessions/${sessionId}/request`, {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async terminateSession(sessionId: string) {
    return this.request<{
      success: boolean;
      message: string;
    }>(`/sessions/${sessionId}`, {
      method: 'DELETE',
    });
  }

  async getMySessions() {
    return this.request<{
      sessions: Array<{
        session_id: string;
        platform: string;
        status: string;
        total_usage: number;
        request_count: number;
        started_at: string;
        expires_at: string;
        remaining_time: number;
      }>;
      total_count: number;
    }>('/sessions/');
  }

  // Platform Accounts
  async connectPlatformAccount(accountData: {
    platform: string;
    email: string;
    password: string;
    api_key?: string;
  }) {
    return this.request<{
      account_id: string;
      platform: string;
      email: string;
      status: string;
      created_at: string;
    }>('/platform-accounts/connect', {
      method: 'POST',
      body: JSON.stringify(accountData),
    });
  }

  async getPlatformAccounts() {
    return this.request<{
      accounts: Array<{
        account_id: string;
        platform: string;
        email: string;
        status: string;
        is_premium: boolean;
        available_credits: number;
        total_credits: number;
        allow_pooling: boolean;
        created_at: string;
      }>;
      total_count: number;
    }>('/platform-accounts/');
  }

  // Dynamic Pricing
  async getDemandMultiplier(platform: string, region?: string, timeWindowHours?: number) {
    const params = new URLSearchParams();
    if (region) params.append('region', region);
    if (timeWindowHours) params.append('time_window_hours', timeWindowHours.toString());

    return this.request<{
      platform: string;
      region: string;
      time_window_hours: number;
      demand_multiplier: number;
    }>(`/pricing/demand/${platform}?${params.toString()}`);
  }

  async getPricingTrends(platform: string, days?: number) {
    const params = days ? `?days=${days}` : '';
    return this.request<{
      platform: string;
      average_price: number;
      average_base_price: number;
      price_trend: string;
      demand_level: string;
      recommended_multiplier: number;
      sample_size: number;
    }>(`/pricing/trends/${platform}${params}`);
  }

  async getMarketOverview() {
    return this.request<{
      market_data: Record<string, {
        platform: string;
        average_price: number;
        price_trend: string;
        demand_level: string;
      }>;
      summary: {
        total_platforms: number;
        active_platforms: number;
      };
    }>('/pricing/market-overview');
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Export types for TypeScript
export type {
  ApiResponse,
};

export default apiService;
