
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Shield, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ListSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    tool: '',
    subscriptionType: '',
    dailyPrice: '',
    maxHours: '',
    description: '',
    autoApprove: false,
    weekends: true,
    notifications: true
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle form submission
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4); // Success step
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Tool Details', description: 'Select your AI tool' },
    { number: 2, title: 'Pricing', description: 'Set your rates' },
    { number: 3, title: 'Settings', description: 'Configure options' },
    { number: 4, title: 'Complete', description: 'Review and submit' }
  ];

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List Your Subscription</h1>
          <p className="text-gray-600">Share your unused AI subscriptions and earn money</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-purple-800 border-purple-800 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-purple-800' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center pb-3">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg text-green-800">Earn Money</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-green-700 text-center">
                Turn your unused subscription time into cash. Average earnings: $50-200/month
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="text-center pb-3">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg text-blue-800">Secure Access</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-blue-700 text-center">
                We handle secure temporary access without sharing passwords or personal data
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="text-center pb-3">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg text-purple-800">Flexible Control</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-purple-700 text-center">
                Set your own availability, pricing, and rental duration limits
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Listing Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Step {currentStep}: {steps[currentStep - 1]?.title}</span>
            </CardTitle>
            <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="tool">AI Tool *</Label>
                      <Select value={formData.tool} onValueChange={(value) => handleInputChange('tool', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select the AI tool" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chatgpt-plus">ChatGPT Plus ($20/month)</SelectItem>
                          <SelectItem value="claude-pro">Claude Pro ($20/month)</SelectItem>
                          <SelectItem value="notion-ai">Notion AI ($10/month)</SelectItem>
                          <SelectItem value="midjourney">Midjourney ($30/month)</SelectItem>
                          <SelectItem value="jasper">Jasper AI ($24/month)</SelectItem>
                          <SelectItem value="github-copilot">GitHub Copilot ($10/month)</SelectItem>
                          <SelectItem value="grammarly">Grammarly Premium ($12/month)</SelectItem>
                          <SelectItem value="canva-pro">Canva Pro ($15/month)</SelectItem>
                          <SelectItem value="other">Other (Contact Support)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subscription-type">Subscription Type *</Label>
                      <Select value={formData.subscriptionType} onValueChange={(value) => handleInputChange('subscriptionType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select subscription type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly Subscription</SelectItem>
                          <SelectItem value="yearly">Yearly Subscription (Better rates)</SelectItem>
                          <SelectItem value="lifetime">Lifetime Access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      We support most popular AI tools. If yours isn't listed, contact our support team.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="daily-price">Daily Rental Price ($) *</Label>
                      <Input 
                        id="daily-price" 
                        type="number" 
                        placeholder="2.00" 
                        step="0.50" 
                        min="0.50" 
                        max="10.00"
                        value={formData.dailyPrice}
                        onChange={(e) => handleInputChange('dailyPrice', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended: $1-5 per day</p>
                    </div>

                    <div>
                      <Label htmlFor="max-hours">Max Hours per Rental *</Label>
                      <Select value={formData.maxHours} onValueChange={(value) => handleInputChange('maxHours', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 hours</SelectItem>
                          <SelectItem value="4">4 hours</SelectItem>
                          <SelectItem value="8">8 hours</SelectItem>
                          <SelectItem value="24">24 hours (1 day)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.dailyPrice && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Estimated Earnings</h4>
                      <div className="space-y-1 text-sm text-green-700">
                        <p>Daily potential: ${formData.dailyPrice}</p>
                        <p>Weekly potential: ${(parseFloat(formData.dailyPrice) * 7).toFixed(2)}</p>
                        <p>Monthly potential: ${(parseFloat(formData.dailyPrice) * 30).toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Add any additional information about your subscription, special features, or usage notes..."
                      rows={3}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-approve">Auto-approve rental requests</Label>
                        <p className="text-sm text-gray-500">Automatically approve valid rental requests</p>
                      </div>
                      <Switch 
                        id="auto-approve" 
                        checked={formData.autoApprove}
                        onCheckedChange={(checked) => handleInputChange('autoApprove', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekends">Available on weekends</Label>
                        <p className="text-sm text-gray-500">Allow rentals during weekends</p>
                      </div>
                      <Switch 
                        id="weekends" 
                        checked={formData.weekends}
                        onCheckedChange={(checked) => handleInputChange('weekends', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Email notifications</Label>
                        <p className="text-sm text-gray-500">Get notified about new rental requests</p>
                      </div>
                      <Switch 
                        id="notifications" 
                        checked={formData.notifications}
                        onCheckedChange={(checked) => handleInputChange('notifications', checked)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-900">Success!</h3>
                  <p className="text-gray-600">Your subscription has been listed successfully.</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                    <ul className="text-sm text-blue-800 space-y-1 text-left">
                      <li>• We'll review your listing within 24 hours</li>
                      <li>• You'll receive email confirmation once approved</li>
                      <li>• Your tool will appear in our marketplace</li>
                      <li>• Start earning when users rent your subscription!</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentStep < 4 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• We create a secure temporary access link for renters</li>
                    <li>• Your account stays protected - no password sharing</li>
                    <li>• You get paid instantly when someone rents your subscription</li>
                    <li>• Access automatically expires after the rental period</li>
                    <li>• You maintain full control over your account</li>
                  </ul>
                </div>
              )}

              <div className="flex gap-4">
                {currentStep > 1 && currentStep < 4 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button 
                    type="button" 
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex-1 bg-purple-800 hover:bg-purple-900"
                    disabled={
                      (currentStep === 1 && (!formData.tool || !formData.subscriptionType)) ||
                      (currentStep === 2 && (!formData.dailyPrice || !formData.maxHours))
                    }
                  >
                    Next Step
                  </Button>
                ) : currentStep === 3 ? (
                  <Button 
                    type="submit" 
                    className="flex-1 bg-purple-800 hover:bg-purple-900" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'List My Subscription'}
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    className="w-full bg-purple-800 hover:bg-purple-900"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Go to Dashboard
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListSubscription;
