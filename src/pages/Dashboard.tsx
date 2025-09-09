import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Eye,
  Settings,
  BarChart3,
  Zap
} from 'lucide-react';
import apiService from '@/services/api';

interface DashboardStats {
  totalBalance: number;
  totalEarned: number;
  totalSpent: number;
  activeCards: number;
  activeSessions: number;
  platformAccounts: number;
}

interface VirtualCard {
  card_id: string;
  card_number: string;
  expiry_date: string;
  initial_balance: number;
  current_balance: number;
  current_price: number;
  status: string;
  platform: string;
}

interface MarketplaceListing {
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
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBalance: 0,
    totalEarned: 0,
    totalSpent: 0,
    activeCards: 0,
    activeSessions: 0,
    platformAccounts: 0
  });
  
  const [virtualCards, setVirtualCards] = useState<VirtualCard[]>([]);
  const [marketplaceListings, setMarketplaceListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load user stats
      const userResponse = await apiService.getCurrentUser();
      if (userResponse.data) {
        setStats(prev => ({
          ...prev,
          totalBalance: userResponse.data.balance,
          totalEarned: userResponse.data.total_earned,
          totalSpent: userResponse.data.total_spent
        }));
      }

      // Load virtual cards
      const cardsResponse = await apiService.getVirtualCards();
      if (cardsResponse.data) {
        setVirtualCards(cardsResponse.data);
        setStats(prev => ({
          ...prev,
          activeCards: cardsResponse.data.filter(card => card.status === 'active').length
        }));
      }

      // Load marketplace listings
      const marketplaceResponse = await apiService.getMarketplaceListings({ limit: 10 });
      if (marketplaceResponse.data) {
        setMarketplaceListings(marketplaceResponse.data.listings);
      }

      // Load platform accounts
      const accountsResponse = await apiService.getPlatformAccounts();
      if (accountsResponse.data) {
        setStats(prev => ({
          ...prev,
          platformAccounts: accountsResponse.data.total_count
        }));
      }

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'depleted': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'chatgpt': return '🤖';
      case 'claude': return '🧠';
      case 'gemini': return '💎';
      default: return '🔧';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your AI credits and marketplace activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalBalance)}</div>
              <p className="text-xs text-muted-foreground">Available credits</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalEarned)}</div>
              <p className="text-xs text-muted-foreground">From credit sales</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCards}</div>
              <p className="text-xs text-muted-foreground">Virtual cards</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Accounts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.platformAccounts}</div>
              <p className="text-xs text-muted-foreground">Connected platforms</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cards">My Cards</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Virtual Cards */}
            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Recent Virtual Cards
                  </CardTitle>
                  <CardDescription>Your latest virtual cards</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                    {virtualCards.slice(0, 3).map((card) => (
                      <div key={card.card_id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getPlatformIcon(card.platform)}</span>
                        <div>
                            <p className="font-medium">****{card.card_number.slice(-4)}</p>
                            <p className="text-sm text-gray-500">{card.platform}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(card.current_balance)}</p>
                          <Badge className={getStatusColor(card.status)}>
                            {card.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {virtualCards.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No virtual cards yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Marketplace Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Marketplace Overview
                  </CardTitle>
                  <CardDescription>Available credits in marketplace</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketplaceListings.slice(0, 3).map((listing) => (
                      <div key={listing.card_id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getPlatformIcon(listing.platform)}</span>
                          <div>
                            <p className="font-medium">{listing.seller_username}</p>
                            <p className="text-sm text-gray-500">{listing.platform}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(listing.current_price)}/hr</p>
                          <p className="text-sm text-gray-500">{formatCurrency(listing.available_balance)}</p>
                      </div>
                    </div>
                  ))}
                    {marketplaceListings.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No marketplace listings</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex flex-col gap-2">
                    <Plus className="h-6 w-6" />
                    Create Virtual Card
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Eye className="h-6 w-6" />
                    Browse Marketplace
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Settings className="h-6 w-6" />
                    Manage Accounts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Cards Tab */}
          <TabsContent value="cards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Virtual Cards</CardTitle>
                <CardDescription>Manage your virtual cards and credits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {virtualCards.map((card) => (
                    <div key={card.card_id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{getPlatformIcon(card.platform)}</span>
                        <div>
                            <h3 className="font-semibold">****{card.card_number.slice(-4)}</h3>
                            <p className="text-sm text-gray-500">{card.platform} • Expires {formatDate(card.expiry_date)}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(card.status)}>
                          {card.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-500">Initial Balance</p>
                          <p className="font-semibold">{formatCurrency(card.initial_balance)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Current Balance</p>
                          <p className="font-semibold">{formatCurrency(card.current_balance)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Price/Hour</p>
                          <p className="font-semibold">{formatCurrency(card.current_price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {virtualCards.length === 0 && (
                    <div className="text-center py-8">
                      <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No virtual cards yet</h3>
                      <p className="text-gray-500 mb-4">Create your first virtual card to start selling credits</p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Virtual Card
                      </Button>
                  </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Marketplace Listings</CardTitle>
                <CardDescription>Browse available credits from other users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketplaceListings.map((listing) => (
                    <div key={listing.card_id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{getPlatformIcon(listing.platform)}</span>
                      <div>
                            <h3 className="font-semibold">{listing.seller_username}</h3>
                            <p className="text-sm text-gray-500">{listing.platform} • Listed {formatDate(listing.created_at)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">{formatCurrency(listing.current_price)}/hr</p>
                          <p className="text-sm text-gray-500">Demand: {listing.demand_multiplier}x</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Available</p>
                          <p className="font-semibold">{formatCurrency(listing.available_balance)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Base Price</p>
                          <p className="font-semibold">{formatCurrency(listing.price_per_hour)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Utilization</p>
                          <p className="font-semibold">{listing.utilization_percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Zap className="h-4 w-4 mr-2" />
                          Purchase Credits
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {marketplaceListings.length === 0 && (
                    <div className="text-center py-8">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No marketplace listings</h3>
                      <p className="text-gray-500 mb-4">No credits are currently available in the marketplace</p>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                  </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Your earnings breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Earned</span>
                      <span className="font-semibold">{formatCurrency(stats.totalEarned)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Spent</span>
                      <span className="font-semibold">{formatCurrency(stats.totalSpent)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-4">
                      <span>Net Profit</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(stats.totalEarned - stats.totalSpent)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Distribution</CardTitle>
                  <CardDescription>Credits by platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['ChatGPT', 'Claude', 'Gemini'].map((platform) => {
                      const platformCards = virtualCards.filter(card => 
                        card.platform.toLowerCase() === platform.toLowerCase()
                      );
                      const totalBalance = platformCards.reduce((sum, card) => sum + card.current_balance, 0);
                      
                      return (
                        <div key={platform} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{getPlatformIcon(platform)}</span>
                            <span>{platform}</span>
                          </div>
                          <span className="font-semibold">{formatCurrency(totalBalance)}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;