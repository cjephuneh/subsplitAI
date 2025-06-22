
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DollarSign, Shield, Clock } from 'lucide-react';

const ListSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle form submission
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List Your Subscription</h1>
          <p className="text-gray-600">Share your unused AI subscriptions and earn money</p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Earn Money</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Turn your unused subscription time into cash
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Secure Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                We handle secure temporary access without sharing passwords
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Flexible Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Set your own availability and pricing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Listing Form */}
        <Card>
          <CardHeader>
            <CardTitle>List Your Subscription</CardTitle>
            <CardDescription>Fill out the details to make your subscription available for rent</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="tool">AI Tool</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the AI tool" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chatgpt-plus">ChatGPT Plus</SelectItem>
                      <SelectItem value="claude-pro">Claude Pro</SelectItem>
                      <SelectItem value="notion-ai">Notion AI</SelectItem>
                      <SelectItem value="midjourney">Midjourney</SelectItem>
                      <SelectItem value="jasper">Jasper AI</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subscription-type">Subscription Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subscription type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="lifetime">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="daily-price">Daily Rental Price ($)</Label>
                  <Input id="daily-price" type="number" placeholder="2.00" step="0.50" min="0.50" />
                </div>

                <div>
                  <Label htmlFor="max-hours">Max Hours per Rental</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Add any additional information about your subscription..."
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-approve" />
                  <Label htmlFor="auto-approve">Auto-approve rental requests</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="weekends" />
                  <Label htmlFor="weekends">Available on weekends</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Email notifications for new rentals</Label>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• We create a secure temporary access link for renters</li>
                  <li>• Your account stays protected - no password sharing</li>
                  <li>• You get paid instantly when someone rents your subscription</li>
                  <li>• Access automatically expires after the rental period</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Listing Subscription...' : 'List My Subscription'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListSubscription;
