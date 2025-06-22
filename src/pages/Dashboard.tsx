import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, DollarSign, Users, TrendingUp, ExternalLink, Calendar, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const DashboardContent = () => {
  const { user } = useAuth();
  const [activeRentals] = useState([
    { 
      tool: 'ChatGPT Plus', 
      expires: '2 hours', 
      cost: '$3', 
      timeLeft: 67, 
      totalTime: 120,
      accessUrl: 'https://chat.openai.com/access/xyz123'
    },
    { 
      tool: 'Claude Pro', 
      expires: '5 hours', 
      cost: '$2', 
      timeLeft: 75, 
      totalTime: 100,
      accessUrl: 'https://claude.ai/access/abc456'
    }
  ]);

  const [earnings] = useState([
    { tool: 'Notion AI', renter: 'John D.', earned: '$5', duration: '3 days', date: '2024-03-15', status: 'completed' },
    { tool: 'Jasper AI', renter: 'Sarah M.', earned: '$8', duration: '1 week', date: '2024-03-12', status: 'active' },
    { tool: 'Midjourney', renter: 'Alex K.', earned: '$12', duration: '2 days', date: '2024-03-10', status: 'completed' }
  ]);

  const [listings] = useState([
    { tool: 'Notion AI', price: '$1.5/day', status: 'active', requests: 3 },
    { tool: 'Grammarly Premium', price: '$1/day', status: 'paused', requests: 0 },
    { tool: 'Canva Pro', price: '$0.8/day', status: 'active', requests: 7 }
  ]);

  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {firstName}!</h1>
          <p className="text-gray-600">Here's what's happening with your SubSplit account</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">+1 from yesterday</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$47</div>
              <p className="text-xs text-muted-foreground">vs $180 full price</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$127</div>
              <p className="text-xs text-muted-foreground">+$25 this week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Listed Tools</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">10 pending requests</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rentals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="rentals">My Rentals</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
          </TabsList>

          <TabsContent value="rentals">
            <Card>
              <CardHeader>
                <CardTitle>Active Rentals</CardTitle>
                <CardDescription>AI tools you're currently renting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeRentals.map((rental, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{rental.tool}</h3>
                          <p className="text-sm text-gray-600">Expires in {rental.expires}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-2">{rental.cost}</Badge>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-purple-800 hover:bg-purple-900">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Access
                            </Button>
                            <Button size="sm" variant="outline">Extend</Button>
                          </div>
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
                  
                  <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-600 mb-4">Need access to more AI tools?</p>
                    <Button className="bg-purple-800 hover:bg-purple-900">Browse Available Tools</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings History</CardTitle>
                <CardDescription>Money earned from listing your subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earnings.map((earning, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
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
                        <ChevronRight className="h-4 w-4 text-gray-400 mt-1" />
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center py-6">
                    <Button variant="outline">View All Transactions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle>My Listed Subscriptions</CardTitle>
                <CardDescription>Subscriptions you've made available for rent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{listing.tool}</h3>
                        <p className="text-sm text-gray-600">{listing.price}</p>
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
                  
                  <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-600 mb-4">Have unused subscriptions? Start earning!</p>
                    <Button className="bg-purple-800 hover:bg-purple-900">List Your Subscription</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
};

export default Dashboard;