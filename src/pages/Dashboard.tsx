import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ExternalLink, 
  Calendar, 
  ChevronRight,
  Home,
  Search,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Plus,
  Activity,
  Zap,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Wallet,
  Shield,
  Gift
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [activeRentals] = useState([
    { 
      tool: 'ChatGPT Plus', 
      expires: '2 hours', 
      cost: '$3', 
      timeLeft: 67, 
      totalTime: 120,
      accessUrl: 'https://chat.openai.com/access/xyz123',
      icon: '🤖',
      color: 'from-green-400 to-blue-500'
    },
    { 
      tool: 'Claude Pro', 
      expires: '5 hours', 
      cost: '$2', 
      timeLeft: 75, 
      totalTime: 100,
      accessUrl: 'https://claude.ai/access/abc456',
      icon: '🧠',
      color: 'from-purple-400 to-pink-500'
    }
  ]);

  const [earnings] = useState([
    { tool: 'Notion AI', renter: 'John D.', earned: '$5', duration: '3 days', date: '2024-03-15', status: 'completed', icon: '📝' },
    { tool: 'Jasper AI', renter: 'Sarah M.', earned: '$8', duration: '1 week', date: '2024-03-12', status: 'active', icon: '✨' },
    { tool: 'Midjourney', renter: 'Alex K.', earned: '$12', duration: '2 days', date: '2024-03-10', status: 'completed', icon: '🎨' }
  ]);

  const [listings] = useState([
    { tool: 'Notion AI', price: '$1.5/day', status: 'active', requests: 3, icon: '📝' },
    { tool: 'Grammarly Premium', price: '$1/day', status: 'paused', requests: 0, icon: '✍️' },
    { tool: 'Canva Pro', price: '$0.8/day', status: 'active', requests: 7, icon: '🎨' }
  ]);

  const sidebarItems = [
    { icon: Home, label: 'Overview', id: 'overview', active: true },
    { icon: Search, label: 'Browse Tools', id: 'browse' },
    { icon: CreditCard, label: 'My Rentals', id: 'rentals' },
    { icon: Wallet, label: 'Earnings', id: 'earnings' },
    { icon: Activity, label: 'My Listings', id: 'listings' },
    { icon: BarChart3, label: 'Analytics', id: 'analytics' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: HelpCircle, label: 'Help', id: 'help' }
  ];

  const quickStats = [
    {
      title: 'Active Rentals',
      value: '2',
      change: '+1',
      changeType: 'positive',
      icon: Clock,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Saved',
      value: '$133',
      change: '+$25',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Monthly Earnings',
      value: '$127',
      change: '+$25',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Listed Tools',
      value: '3',
      change: '10 requests',
      changeType: 'neutral',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl transition-all duration-300 z-50 ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    SubSplit
                  </h1>
                  <p className="text-xs text-gray-500">AI Tool Sharing</p>
                </div>
              )}
            </div>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 ring-2 ring-purple-100">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold">
                  SM
                </AvatarFallback>
              </Avatar>
              {!sidebarCollapsed && (
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Sarah Miller</h3>
                  <p className="text-sm text-gray-500">Premium Member</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">4.9 rating</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${
                  activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
                {!sidebarCollapsed && activeTab === item.id && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-100 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Settings className="w-5 h-5" />
              {!sidebarCollapsed && <span>Collapse</span>}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              {!sidebarCollapsed && <span>Sign Out</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Good morning, Sarah! 👋
              </h1>
              <p className="text-gray-600">Here's what's happening with your account today</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="w-4 h-4" />
                <Badge variant="destructive" className="w-2 h-2 p-0 -ml-1" />
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2">
                <Plus className="w-4 h-4" />
                Quick Rent
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                  <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                          <div className="flex items-center gap-1 mt-2">
                            {stat.changeType === 'positive' ? (
                              <ArrowUpRight className="w-4 h-4 text-green-500" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-500" />
                            )}
                            <span className={`text-sm font-medium ${
                              stat.changeType === 'positive' ? 'text-green-600' : 
                              stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <div className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center`}>
                          <stat.icon className={`w-7 h-7 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Active Rentals */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Active Rentals</CardTitle>
                      <CardDescription>AI tools you're currently using</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeRentals.map((rental, index) => (
                      <div key={index} className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 p-6 hover:shadow-lg transition-all duration-300">
                        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${rental.color}`} />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">
                              {rental.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{rental.tool}</h3>
                              <p className="text-sm text-gray-600">Expires in {rental.expires}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                              {rental.cost}
                            </Badge>
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Access
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Time remaining</span>
                            <span>{rental.timeLeft}%</span>
                          </div>
                          <Progress value={rental.timeLeft} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Browse Tools</h3>
                    <p className="text-gray-600 text-sm">Discover new AI tools to rent</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">List Subscription</h3>
                    <p className="text-gray-600 text-sm">Share your unused subscriptions</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Refer Friends</h3>
                    <p className="text-gray-600 text-sm">Earn $10 for each referral</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'rentals' && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>My Rentals</CardTitle>
                <CardDescription>All your rental history and active subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeRentals.map((rental, index) => (
                    <div key={index} className="p-6 border border-gray-100 rounded-2xl bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">
                            {rental.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{rental.tool}</h3>
                            <p className="text-sm text-gray-600">Expires in {rental.expires}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Access
                          </Button>
                          <Button size="sm" variant="outline">Extend</Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Time remaining</span>
                          <span>{rental.timeLeft}%</span>
                        </div>
                        <Progress value={rental.timeLeft} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'earnings' && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Earnings History</CardTitle>
                <CardDescription>Money earned from listing your subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earnings.map((earning, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-lg">
                          {earning.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{earning.tool}</h3>
                          <p className="text-sm text-gray-600">
                            Rented by {earning.renter} for {earning.duration}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{earning.date}</span>
                            <Badge variant={earning.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                              {earning.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          +{earning.earned}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'listings' && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>My Listed Subscriptions</CardTitle>
                <CardDescription>Subscriptions you've made available for rent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-lg">
                          {listing.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{listing.tool}</h3>
                          <p className="text-sm text-gray-600">{listing.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm font-medium">{listing.requests}</p>
                          <p className="text-xs text-gray-500">requests</p>
                        </div>
                        <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                          {listing.status}
                        </Badge>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;