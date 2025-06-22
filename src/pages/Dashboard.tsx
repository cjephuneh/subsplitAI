import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, DollarSign, Users, TrendingUp, ExternalLink, Calendar, ChevronRight, Home, Search, CreditCard, Settings, HelpCircle, LogOut, Bell, Plus, Activity, Zap, Star, ArrowUpRight, ArrowDownRight, BarChart3, Wallet, Shield, Gift, MessageCircle, Filter, Eye, Edit, Trash2, Download, Upload, Moon, Sun, User, Mail, Phone, Lock, CheckCircle, AlertCircle, TrendingDown, Target, Lightbulb, Siren as Fire, UserPlus, Timer, Globe, Bookmark, History, RefreshCw, PlayCircle, PauseCircle, StopCircle } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMode, setUserMode] = useState('renter'); // 'renter' or 'owner'
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Mock data
  const userProfile = {
    name: 'Sarah Miller',
    email: 'sarah.miller@email.com',
    avatar: '/placeholder.svg',
    rating: 4.9,
    totalReviews: 127,
    walletBalance: 245.50,
    memberSince: '2023',
    verified: true
  };

  const activeRentals = [
    { 
      id: 1,
      tool: 'ChatGPT Plus', 
      expires: '2 hours 15 mins', 
      cost: '$3', 
      timeLeft: 67, 
      totalTime: 120,
      accessUrl: 'https://chat.openai.com/access/xyz123',
      icon: '🤖',
      color: 'from-green-400 to-blue-500',
      category: 'AI Assistant',
      startTime: '10:30 AM',
      endTime: '2:30 PM'
    },
    { 
      id: 2,
      tool: 'Claude Pro', 
      expires: '5 hours 30 mins', 
      cost: '$2', 
      timeLeft: 75, 
      totalTime: 100,
      accessUrl: 'https://claude.ai/access/abc456',
      icon: '🧠',
      color: 'from-purple-400 to-pink-500',
      category: 'AI Assistant',
      startTime: '9:00 AM',
      endTime: '5:00 PM'
    }
  ];

  const upcomingRentals = [
    { tool: 'Midjourney', date: 'Tomorrow', time: '2:00 PM', duration: '4 hours', cost: '$6', icon: '🎨' },
    { tool: 'Notion AI', date: 'March 20', time: '10:00 AM', duration: '8 hours', cost: '$4', icon: '📝' }
  ];

  const rentalHistory = [
    { tool: 'Jasper AI', date: 'March 15', duration: '6 hours', cost: '$8', rating: 5, icon: '✨' },
    { tool: 'GitHub Copilot', date: 'March 12', duration: '24 hours', cost: '$3', rating: 5, icon: '👨‍💻' },
    { tool: 'Grammarly Premium', date: 'March 10', duration: '12 hours', cost: '$2', rating: 4, icon: '✍️' }
  ];

  const myListings = [
    { 
      id: 1,
      tool: 'Notion AI', 
      price: '$1.5/hour', 
      status: 'online', 
      requests: 3, 
      icon: '📝',
      views: 45,
      bookings: 12,
      earnings: '$67.50',
      availability: 'Mon-Fri 9AM-5PM',
      usageLimit: '8 hours/day'
    },
    { 
      id: 2,
      tool: 'Grammarly Premium', 
      price: '$1/hour', 
      status: 'offline', 
      requests: 0, 
      icon: '✍️',
      views: 23,
      bookings: 5,
      earnings: '$15.00',
      availability: 'Weekends only',
      usageLimit: '4 hours/day'
    },
    { 
      id: 3,
      tool: 'Canva Pro', 
      price: '$0.8/hour', 
      status: 'online', 
      requests: 7, 
      icon: '🎨',
      views: 89,
      bookings: 23,
      earnings: '$124.80',
      availability: '24/7',
      usageLimit: '12 hours/day'
    }
  ];

  const earningsData = {
    daily: 12.50,
    weekly: 87.50,
    monthly: 342.75,
    total: 1247.30,
    transactions: [
      { id: 1, tool: 'Notion AI', renter: 'John D.', amount: '$5.50', date: '2024-03-15', status: 'completed', icon: '📝' },
      { id: 2, tool: 'Canva Pro', renter: 'Sarah M.', amount: '$8.00', date: '2024-03-14', status: 'completed', icon: '🎨' },
      { id: 3, tool: 'Grammarly', renter: 'Alex K.', amount: '$3.25', date: '2024-03-13', status: 'pending', icon: '✍️' }
    ]
  };

  const reviews = [
    { id: 1, renter: 'John D.', tool: 'Notion AI', rating: 5, comment: 'Great service, very reliable!', date: '2024-03-15', avatar: '👨' },
    { id: 2, renter: 'Sarah M.', tool: 'Canva Pro', rating: 5, comment: 'Perfect for my design work.', date: '2024-03-14', avatar: '👩' },
    { id: 3, renter: 'Mike R.', tool: 'Grammarly', rating: 4, comment: 'Good quality, fast access.', date: '2024-03-12', avatar: '👨‍💼' }
  ];

  const analyticsData = {
    totalTimeRented: 156, // hours
    totalTimeUsed: 89, // hours
    avgSessionLength: 3.2, // hours
    popularTools: [
      { name: 'ChatGPT Plus', usage: 45, icon: '🤖' },
      { name: 'Claude Pro', usage: 32, icon: '🧠' },
      { name: 'Notion AI', usage: 28, icon: '📝' },
      { name: 'Midjourney', usage: 25, icon: '🎨' }
    ],
    incomeVsSpend: {
      income: 1247.30,
      spend: 234.50,
      profit: 1012.80
    }
  };

  const trendingTools = [
    { name: 'ChatGPT Plus', trend: '+15%', icon: '🤖', category: 'AI Assistant' },
    { name: 'Midjourney', trend: '+23%', icon: '🎨', category: 'Creative' },
    { name: 'Claude Pro', trend: '+8%', icon: '🧠', category: 'AI Assistant' },
    { name: 'Notion AI', trend: '+12%', icon: '📝', category: 'Productivity' }
  ];

  const sidebarItems = [
    { icon: Home, label: 'Overview', id: 'overview' },
    { icon: Search, label: 'Discover & Book', id: 'discover' },
    { icon: CreditCard, label: 'My Rentals', id: 'rentals' },
    { icon: Activity, label: 'My Listings', id: 'listings' },
    { icon: Wallet, label: 'Earnings', id: 'earnings' },
    { icon: Star, label: 'Reviews', id: 'reviews' },
    { icon: BarChart3, label: 'Analytics', id: 'analytics' },
    { icon: Shield, label: 'Safety & Security', id: 'safety' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: HelpCircle, label: 'Support', id: 'support' }
  ];

  const quickStats = [
    {
      title: userMode === 'renter' ? 'Active Rentals' : 'Active Listings',
      value: userMode === 'renter' ? '2' : '3',
      change: userMode === 'renter' ? '+1 today' : '10 requests',
      changeType: 'positive',
      icon: userMode === 'renter' ? Clock : Activity,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: userMode === 'renter' ? 'Total Saved' : 'Monthly Earnings',
      value: userMode === 'renter' ? '$133' : '$342',
      change: userMode === 'renter' ? 'vs $400 full price' : '+$87 this week',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Wallet Balance',
      value: `$${userProfile.walletBalance}`,
      change: '+$25 today',
      changeType: 'positive',
      icon: Wallet,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Rating',
      value: userProfile.rating.toString(),
      change: `${userProfile.totalReviews} reviews`,
      changeType: 'neutral',
      icon: Star,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full transition-all duration-300 z-50 ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      } ${
        darkMode 
          ? 'bg-gray-800/90 backdrop-blur-xl border-r border-gray-700' 
          : 'bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    SubSplit
                  </h1>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>AI Tool Sharing</p>
                </div>
              )}
            </div>
          </div>

          {/* User Profile */}
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12 ring-2 ring-purple-100">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {userProfile.verified && (
                  <CheckCircle className="w-4 h-4 text-green-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
                )}
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {userProfile.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ${userProfile.walletBalance}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {userProfile.rating} ({userProfile.totalReviews})
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Mode Switch */}
            {!sidebarCollapsed && (
              <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {userMode === 'renter' ? '🔍 Renter Mode' : '💼 Owner Mode'}
                  </span>
                  <Switch
                    checked={userMode === 'owner'}
                    onCheckedChange={(checked) => setUserMode(checked ? 'owner' : 'renter')}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${
                  activeTab === item.id 
                    ? 'text-white' 
                    : darkMode 
                    ? 'text-gray-400 group-hover:text-gray-300' 
                    : 'text-gray-400 group-hover:text-gray-600'
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
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'} space-y-2`}>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 ${
                darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900'
              }`}
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
        <div className={`p-6 border-b transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700' 
            : 'bg-white/80 backdrop-blur-xl border-white/20'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Good morning, {userProfile.name.split(' ')[0]}! 👋
              </h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {userMode === 'renter' 
                  ? "Here's what's happening with your rentals today" 
                  : "Here's how your listings are performing today"
                }
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="gap-2"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="sm" className="gap-2 relative">
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2">
                <Plus className="w-4 h-4" />
                {userMode === 'renter' ? 'Quick Rent' : 'Add Listing'}
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                  <Card key={index} className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {stat.title}
                          </p>
                          <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {stat.value}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            {stat.changeType === 'positive' ? (
                              <ArrowUpRight className="w-4 h-4 text-green-500" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-500" />
                            )}
                            <span className={`text-sm font-medium ${
                              stat.changeType === 'positive' ? 'text-green-600' : 
                              stat.changeType === 'negative' ? 'text-red-600' : 
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                          <stat.icon className={`w-7 h-7 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mode-specific content */}
              {userMode === 'renter' ? (
                <>
                  {/* Active Rentals */}
                  <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                            Active Rentals
                          </CardTitle>
                          <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                            AI tools you're currently using
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">View All</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activeRentals.map((rental, index) => (
                          <div key={index} className={`relative overflow-hidden rounded-2xl border p-6 hover:shadow-lg transition-all duration-300 ${
                            darkMode 
                              ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700' 
                              : 'border-gray-100 bg-gradient-to-r from-white to-gray-50'
                          }`}>
                            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${rental.color}`} />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl shadow-sm flex items-center justify-center text-2xl ${
                                  darkMode ? 'bg-gray-700' : 'bg-white'
                                }`}>
                                  {rental.icon}
                                </div>
                                <div>
                                  <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {rental.tool}
                                  </h3>
                                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Expires in {rental.expires}
                                  </p>
                                  <Badge variant="secondary" className="mt-1">
                                    {rental.category}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 mb-2">
                                    {rental.cost}
                                  </Badge>
                                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {rental.startTime} - {rental.endTime}
                                  </p>
                                </div>
                                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Access
                                </Button>
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className={`flex justify-between text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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

                  {/* Trending Tools Widget */}
                  <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        <Fire className="w-5 h-5 text-orange-500" />
                        🔥 Trending Tools This Week
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {trendingTools.map((tool, index) => (
                          <div key={index} className={`p-4 rounded-xl border hover:shadow-md transition-all duration-300 cursor-pointer ${
                            darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                          }`}>
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{tool.icon}</span>
                              <div>
                                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {tool.name}
                                </h4>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {tool.category}
                                </p>
                                <Badge variant="secondary" className="text-green-600 bg-green-100 mt-1">
                                  {tool.trend}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  {/* Owner Mode - My Listings Overview */}
                  <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        <Activity className="w-5 h-5" />
                        My Listings Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {myListings.slice(0, 3).map((listing, index) => (
                          <div key={index} className={`p-4 rounded-xl border ${
                            darkMode ? 'border-gray-700' : 'border-gray-100'
                          }`}>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-2xl">{listing.icon}</span>
                              <div>
                                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {listing.tool}
                                </h4>
                                <Badge variant={listing.status === 'online' ? 'default' : 'secondary'}>
                                  {listing.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Views:</span>
                                <span className={darkMode ? 'text-white' : 'text-gray-900'}>{listing.views}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Bookings:</span>
                                <span className={darkMode ? 'text-white' : 'text-gray-900'}>{listing.bookings}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Earned:</span>
                                <span className="text-green-600 font-medium">{listing.earnings}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tips to Earn More */}
                  <Card className={`border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50 ${
                    darkMode ? 'from-yellow-900/20 to-orange-900/20' : ''
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        💡 Tips to Earn More
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                          <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Optimize Your Pricing
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Tools priced 10-20% below market rate get 3x more bookings
                          </p>
                        </div>
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                          <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Increase Availability
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            24/7 availability increases earnings by up to 40%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {userMode === 'renter' ? 'Browse Tools' : 'Market Research'}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {userMode === 'renter' ? 'Discover new AI tools to rent' : 'See what tools are in demand'}
                    </p>
                  </CardContent>
                </Card>

                <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {userMode === 'renter' ? 'Quick Rent' : 'Add Listing'}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {userMode === 'renter' ? 'Rent a tool for immediate use' : 'List a new subscription'}
                    </p>
                  </CardContent>
                </Card>

                <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Refer Friends
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Earn $10 for each successful referral
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Discover & Book Tab */}
          {activeTab === 'discover' && (
            <div className="space-y-6">
              <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                    Discover AI Tools
                  </CardTitle>
                  <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Find and rent AI tools for your projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <Input 
                      placeholder="Search for AI tools..." 
                      className="flex-1"
                    />
                    <Button variant="outline" className="gap-2">
                      <Filter className="w-4 h-4" />
                      Filters
                    </Button>
                  </div>

                  {/* Suggested Tools */}
                  <div className="space-y-4">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Suggested for You
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'ChatGPT Plus', category: 'AI Assistant', price: '$2/hour', available: true, icon: '🤖', rating: 4.9 },
                        { name: 'Midjourney', category: 'Creative', price: '$4/hour', available: true, icon: '🎨', rating: 4.8 },
                        { name: 'Claude Pro', category: 'AI Assistant', price: '$3/hour', available: false, icon: '🧠', rating: 4.7 }
                      ].map((tool, index) => (
                        <div key={index} className={`p-4 rounded-xl border hover:shadow-md transition-all duration-300 ${
                          darkMode ? 'border-gray-700' : 'border-gray-100'
                        }`}>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{tool.icon}</span>
                            <div>
                              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {tool.name}
                              </h4>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {tool.category}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {tool.price}
                              </p>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {tool.rating}
                                </span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              disabled={!tool.available}
                              className={tool.available ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
                            >
                              {tool.available ? 'Rent Now' : 'Unavailable'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* My Rentals Tab */}
          {activeTab === 'rentals' && (
            <div className="space-y-6">
              <Tabs defaultValue="active" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active">Active Rentals</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                  <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                        Active Rentals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activeRentals.map((rental, index) => (
                          <div key={index} className={`p-6 border rounded-2xl hover:shadow-lg transition-all duration-300 ${
                            darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-100 bg-gradient-to-r from-white to-gray-50'
                          }`}>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl shadow-sm flex items-center justify-center text-2xl ${
                                  darkMode ? 'bg-gray-600' : 'bg-white'
                                }`}>
                                  {rental.icon}
                                </div>
                                <div>
                                  <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {rental.tool}
                                  </h3>
                                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Expires in {rental.expires}
                                  </p>
                                  <Badge variant="secondary" className="mt-1">
                                    {rental.category}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Access
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Timer className="h-4 w-4 mr-1" />
                                  Extend
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
                </TabsContent>

                <TabsContent value="upcoming">
                  <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                        Upcoming Rentals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingRentals.map((rental, index) => (
                          <div key={index} className={`p-4 border rounded-xl ${
                            darkMode ? 'border-gray-700' : 'border-gray-100'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{rental.icon}</span>
                                <div>
                                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {rental.tool}
                                  </h4>
                                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {rental.date} at {rental.time} • {rental.duration}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {rental.cost}
                                </p>
                                <Button size="sm" variant="outline">
                                  Modify
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history">
                  <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                        Rental History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {rentalHistory.map((rental, index) => (
                          <div key={index} className={`p-4 border rounded-xl ${
                            darkMode ? 'border-gray-700' : 'border-gray-100'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{rental.icon}</span>
                                <div>
                                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {rental.tool}
                                  </h4>
                                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {rental.date} • {rental.duration}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {rental.cost}
                                </p>
                                <div className="flex items-center gap-1">
                                  {[...Array(rental.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* My Listings Tab */}
          {activeTab === 'listings' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  My Listings
                </h2>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Listing
                </Button>
              </div>

              <div className="grid gap-6">
                {myListings.map((listing, index) => (
                  <Card key={index} className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl shadow-sm flex items-center justify-center text-2xl ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-50'
                          }`}>
                            {listing.icon}
                          </div>
                          <div>
                            <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {listing.tool}
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {listing.price} • {listing.availability}
                            </p>
                            <Badge variant={listing.status === 'online' ? 'default' : 'secondary'} className="mt-1">
                              {listing.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            {listing.status === 'online' ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Views</p>
                          <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {listing.views}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bookings</p>
                          <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {listing.bookings}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Requests</p>
                          <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {listing.requests}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Earnings</p>
                          <p className="text-xl font-semibold text-green-600">
                            {listing.earnings}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Today</p>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          ${earningsData.daily}
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>This Week</p>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          ${earningsData.weekly}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>This Month</p>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          ${earningsData.monthly}
                        </p>
                      </div>
                      <Calendar className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          ${earningsData.total}
                        </p>
                      </div>
                      <Wallet className="w-8 h-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardHeader>
                    <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                      Recent Transactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {earningsData.transactions.map((transaction, index) => (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{transaction.icon}</span>
                            <div>
                              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {transaction.tool}
                              </h4>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Rented by {transaction.renter}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">{transaction.amount}</p>
                            <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardHeader>
                    <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                      Withdraw Funds
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Available Balance</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${userProfile.walletBalance}
                      </p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 gap-2">
                      <Download className="w-4 h-4" />
                      Withdraw to Bank
                    </Button>
                    <p className={`text-xs text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Withdrawals are processed within 1-2 business days
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                        Reviews & Ratings
                      </CardTitle>
                      <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Feedback from your renters
                      </CardDescription>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-400 fill-current" />
                        <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {userProfile.rating}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {userProfile.totalReviews} reviews
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <div key={index} className={`p-4 border rounded-xl ${
                        darkMode ? 'border-gray-700' : 'border-gray-100'
                      }`}>
                        <div className="flex items-start gap-4">
                          <div className="text-2xl">{review.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {review.renter}
                                </h4>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {review.tool} • {review.date}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Total Time {userMode === 'renter' ? 'Used' : 'Rented'}
                        </p>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {userMode === 'renter' ? analyticsData.totalTimeUsed : analyticsData.totalTimeRented}h
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Session</p>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {analyticsData.avgSessionLength}h
                        </p>
                      </div>
                      <Timer className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {userMode === 'renter' ? 'Money Saved' : 'Profit Margin'}
                        </p>
                        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          ${userMode === 'renter' ? '267' : analyticsData.incomeVsSpend.profit}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardHeader>
                    <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                      Popular Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.popularTools.map((tool, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{tool.icon}</span>
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {tool.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-24 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                              <div 
                                className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                style={{ width: `${tool.usage}%` }}
                              />
                            </div>
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {tool.usage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardHeader>
                    <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                      Income vs Spend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Income</span>
                        <span className="text-green-600 font-semibold">
                          +${analyticsData.incomeVsSpend.income}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Spend</span>
                        <span className="text-red-600 font-semibold">
                          -${analyticsData.incomeVsSpend.spend}
                        </span>
                      </div>
                      <div className={`border-t pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-center">
                          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Net Profit
                          </span>
                          <span className="text-green-600 font-bold text-lg">
                            +${analyticsData.incomeVsSpend.profit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Safety & Security Tab */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Shield className="w-5 h-5" />
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Two-Factor Authentication
                        </h4>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                        Extra security for your account
                      </p>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>

                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          KYC Verification
                        </h4>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                        Identity verified
                      </p>
                      <Badge variant="default">Verified</Badge>
                    </div>

                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Password
                        </h4>
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                        Last changed 30 days ago
                      </p>
                      <Button size="sm" variant="outline">Change Password</Button>
                    </div>

                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Login Sessions
                        </h4>
                        <Globe className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                        Manage active sessions
                      </p>
                      <Button size="sm" variant="outline">View Sessions</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Full Name
                      </Label>
                      <Input id="name" defaultValue={userProfile.name} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Email Address
                      </Label>
                      <Input id="email" defaultValue={userProfile.email} className="mt-1" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Preferences
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Dark Mode
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Toggle dark/light theme
                          </p>
                        </div>
                        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Email Notifications
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Receive booking and payment updates
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Auto-approve Rentals
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Automatically approve rental requests
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <Card className={`border-0 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
                    Get Help
                  </CardTitle>
                  <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    We're here to help you with any questions or issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <CardContent className="p-6 text-center">
                        <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Live Chat
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Get instant help from our support team
                        </p>
                        <Button className="mt-4 w-full">Start Chat</Button>
                      </CardContent>
                    </Card>

                    <Card className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <CardContent className="p-6 text-center">
                        <Mail className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Email Support
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Send us an email and we'll respond within 24 hours
                        </p>
                        <Button variant="outline" className="mt-4 w-full">Send Email</Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8">
                    <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start gap-3">
                        <AlertCircle className="w-4 h-4" />
                        Report an Issue
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-3">
                        <HelpCircle className="w-4 h-4" />
                        View FAQ
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-3">
                        <Download className="w-4 h-4" />
                        Download Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;