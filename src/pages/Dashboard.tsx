
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [activeRentals] = useState([
    { tool: 'ChatGPT Plus', expires: '2 hours', cost: '$3' },
    { tool: 'Claude Pro', expires: '5 hours', cost: '$2' }
  ]);

  const [earnings] = useState([
    { tool: 'Notion AI', renter: 'John D.', earned: '$5', duration: '3 days' },
    { tool: 'Jasper AI', renter: 'Sarah M.', earned: '$8', duration: '1 week' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your rentals and earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$47</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$127</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Listed Tools</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rentals" className="space-y-6">
          <TabsList>
            <TabsTrigger value="rentals">My Rentals</TabsTrigger>
            <TabsTrigger value="earnings">My Earnings</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
          </TabsList>

          <TabsContent value="rentals">
            <Card>
              <CardHeader>
                <CardTitle>Active Rentals</CardTitle>
                <CardDescription>AI tools you're currently renting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRentals.map((rental, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{rental.tool}</h3>
                        <p className="text-sm text-gray-600">Expires in {rental.expires}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{rental.cost}</Badge>
                        <Button size="sm" className="ml-2">Access</Button>
                      </div>
                    </div>
                  ))}
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
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{earning.tool}</h3>
                        <p className="text-sm text-gray-600">Rented by {earning.renter} for {earning.duration}</p>
                      </div>
                      <Badge variant="outline" className="text-green-600">+{earning.earned}</Badge>
                    </div>
                  ))}
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
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No subscriptions listed yet</p>
                  <Button>List Your First Subscription</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
