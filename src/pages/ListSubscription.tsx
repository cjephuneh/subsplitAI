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
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  TrendingUp,
  Users,
  Zap,
  Star,
  ArrowRight,
  Calculator,
  Eye,
  Globe,
  Sparkles
} from 'lucide-react';
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
    notifications: true,
    availability: 'full-time'
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4);
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Choose Tool', description: 'Select your AI subscription', icon: Sparkles },
    { number: 2, title: 'Set Pricing', description: 'Configure your rates', icon: DollarSign },
    { number: 3, title: 'Preferences', description: 'Customize settings', icon: Shield },
    { number: 4, title: 'Go Live', description: 'Start earning', icon: TrendingUp }
  ];

  const progressPercentage = (currentStep / steps.length) * 100;

  const aiTools = [
    { 
      id: 'chatgpt-plus', 
      name: 'ChatGPT Plus', 
      price: '$20/month', 
      logo: '🤖',
      demand: 'High',
      avgEarnings: '$45-80/month',
      color: 'green'
    },
    { 
      id: 'claude-pro', 
      name: 'Claude Pro', 
      price: '$20/month', 
      logo: '🧠',
      demand: 'High',
      avgEarnings: '$40-75/month',
      color: 'blue'
    },
    { 
      id: 'notion-ai', 
      name: 'Notion AI', 
      price: '$10/month', 
      logo: '📝',
      demand: 'Medium',
      avgEarnings: '$25-45/month',
      color: 'purple'
    },
    { 
      id: 'midjourney', 
      name: 'Midjourney', 
      price: '$30/month', 
      logo: '🎨',
      demand: 'Very High',
      avgEarnings: '$60-120/month',
      color: 'orange'
    },
    { 
      id: 'jasper', 
      name: 'Jasper AI', 
      price: '$24/month', 
      logo: '✨',
      demand: 'Medium',
      avgEarnings: '$35-65/month',
      color: 'pink'
    },
    { 
      id: 'github-copilot', 
      name: 'GitHub Copilot', 
      price: '$10/month', 
      logo: '👨‍💻',
      demand: 'High',
      avgEarnings: '$30-55/month',
      color: 'indigo'
    }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateEarnings = () => {
    if (!formData.dailyPrice) return null;
    const daily = parseFloat(formData.dailyPrice);
    return {
      daily: daily,
      weekly: daily * 5, // Assuming 5 days average usage
      monthly: daily * 20 // Assuming 20 days average usage
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-12 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 md:w-72 md:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 md:w-96 md:h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Turn Your Unused Subscriptions Into 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"> Cash</span>
          </h1>
          <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
            List your AI subscriptions and earn money from unused credits. Join thousands earning $50-200+ monthly.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">$150</div>
              <div className="text-slate-300 text-sm">Avg Monthly Earnings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">24h</div>
              <div className="text-slate-300 text-sm">Avg Approval Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-slate-300 text-sm">Lister Satisfaction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">3K+</div>
              <div className="text-slate-300 text-sm">Active Listers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.number 
                        ? 'bg-purple-600 border-purple-600 text-white shadow-lg' 
                        : 'border-gray-300 text-gray-500 bg-white'
                    }`}>
                      {currentStep > step.number ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <step.icon className="h-6 w-6" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div className={`text-sm font-medium ${currentStep >= step.number ? 'text-purple-600' : 'text-gray-500'}`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-400 hidden sm:block">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > step.number ? 'bg-purple-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-green-800">Earn Passive Income</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-center">
                <p className="text-sm text-green-700 mb-3">
                  Turn your unused subscription time into cash. Average earnings: $50-200/month
                </p>
                <Badge className="bg-green-200 text-green-800">💰 Start Earning Today</Badge>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-blue-800">100% Secure</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-center">
                <p className="text-sm text-blue-700 mb-3">
                  We handle secure temporary access without sharing passwords or personal data
                </p>
                <Badge className="bg-blue-200 text-blue-800">🔒 Bank-Level Security</Badge>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-purple-800">Full Control</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-center">
                <p className="text-sm text-purple-700 mb-3">
                  Set your own availability, pricing, and rental duration limits
                </p>
                <Badge className="bg-purple-200 text-purple-800">⚡ Your Rules</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-2 border-slate-200">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span>Step {currentStep}: {steps[currentStep - 1]?.title}</span>
                    {currentStep < 4 && <Sparkles className="h-5 w-5" />}
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    {steps[currentStep - 1]?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <Label className="text-lg font-semibold mb-4 block">Choose Your AI Tool</Label>
                          <div className="grid gap-4">
                            {aiTools.map((tool) => (
                              <div
                                key={tool.id}
                                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                  formData.tool === tool.id
                                    ? 'border-purple-500 bg-purple-50 shadow-md'
                                    : 'border-gray-200 hover:border-purple-300'
                                }`}
                                onClick={() => handleInputChange('tool', tool.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className="text-3xl">{tool.logo}</div>
                                    <div>
                                      <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                                      <p className="text-sm text-gray-600">{tool.price}</p>
                                    </div>
                                  </div>
                                  <div className="text-right space-y-2">
                                    <Badge className={getDemandColor(tool.demand)}>
                                      {tool.demand} Demand
                                    </Badge>
                                    <div className="text-sm text-gray-600">
                                      <div className="font-medium text-green-600">{tool.avgEarnings}</div>
                                      <div className="text-xs">avg earnings</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="subscription-type" className="text-base font-medium">Subscription Type</Label>
                          <Select value={formData.subscriptionType} onValueChange={(value) => handleInputChange('subscriptionType', value)}>
                            <SelectTrigger className="mt-2 h-12">
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
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="daily-price" className="text-base font-medium">Daily Rental Price ($)</Label>
                            <div className="relative mt-2">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input 
                                id="daily-price" 
                                type="number" 
                                placeholder="2.00" 
                                step="0.50" 
                                min="0.50" 
                                max="10.00"
                                value={formData.dailyPrice}
                                onChange={(e) => handleInputChange('dailyPrice', e.target.value)}
                                className="pl-10 h-12"
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Recommended: $1-5 per day</p>
                          </div>

                          <div>
                            <Label htmlFor="max-hours" className="text-base font-medium">Max Hours per Rental</Label>
                            <Select value={formData.maxHours} onValueChange={(value) => handleInputChange('maxHours', value)}>
                              <SelectTrigger className="mt-2 h-12">
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

                        {/* Earnings Calculator */}
                        {formData.dailyPrice && (
                          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-green-800">
                                <Calculator className="h-5 w-5" />
                                Earnings Projection
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-green-600">
                                    ${calculateEarnings()?.daily.toFixed(2)}
                                  </div>
                                  <div className="text-sm text-gray-600">Per Day</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-green-600">
                                    ${calculateEarnings()?.weekly.toFixed(2)}
                                  </div>
                                  <div className="text-sm text-gray-600">Per Week</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-green-600">
                                    ${calculateEarnings()?.monthly.toFixed(2)}
                                  </div>
                                  <div className="text-sm text-gray-600">Per Month</div>
                                </div>
                              </div>
                              <div className="mt-4 p-3 bg-white rounded-lg border">
                                <p className="text-sm text-gray-600">
                                  💡 <strong>Pro tip:</strong> Tools with higher demand typically get rented 20-25 days per month
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="description" className="text-base font-medium">Description (Optional)</Label>
                          <Textarea 
                            id="description" 
                            placeholder="Add any special features, usage notes, or benefits of your subscription..."
                            rows={4}
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label className="text-base font-medium mb-4 block">Availability Settings</Label>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="space-y-0.5">
                                <Label htmlFor="auto-approve" className="font-medium">Auto-approve rental requests</Label>
                                <p className="text-sm text-gray-500">Automatically approve valid rental requests</p>
                              </div>
                              <Switch 
                                id="auto-approve" 
                                checked={formData.autoApprove}
                                onCheckedChange={(checked) => handleInputChange('autoApprove', checked)}
                              />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="space-y-0.5">
                                <Label htmlFor="weekends" className="font-medium">Available on weekends</Label>
                                <p className="text-sm text-gray-500">Allow rentals during weekends</p>
                              </div>
                              <Switch 
                                id="weekends" 
                                checked={formData.weekends}
                                onCheckedChange={(checked) => handleInputChange('weekends', checked)}
                              />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="space-y-0.5">
                                <Label htmlFor="notifications" className="font-medium">Email notifications</Label>
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

                        <div>
                          <Label className="text-base font-medium">Availability Schedule</Label>
                          <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                            <SelectTrigger className="mt-2 h-12">
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full-time">Full-time (24/7)</SelectItem>
                              <SelectItem value="business-hours">Business hours only</SelectItem>
                              <SelectItem value="evenings">Evenings & weekends</SelectItem>
                              <SelectItem value="custom">Custom schedule</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">🎉 Congratulations!</h3>
                        <p className="text-gray-600 text-lg">Your subscription has been listed successfully.</p>
                        
                        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
                          <CardContent className="p-6">
                            <h4 className="font-semibold text-blue-900 mb-4">What happens next?</h4>
                            <div className="space-y-3 text-left">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-blue-800">We'll review your listing within 24 hours</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-blue-800">You'll receive email confirmation once approved</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-blue-800">Your tool will appear in our marketplace</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-blue-800">Start earning when users rent your subscription!</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 pt-6">
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
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          disabled={
                            (currentStep === 1 && (!formData.tool || !formData.subscriptionType)) ||
                            (currentStep === 2 && (!formData.dailyPrice || !formData.maxHours))
                          }
                        >
                          Next Step
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : currentStep === 3 ? (
                        <Button 
                          type="submit" 
                          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" 
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Publishing...
                            </>
                          ) : (
                            <>
                              <Star className="mr-2 h-4 w-4" />
                              List My Subscription
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button 
                          type="button" 
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          onClick={() => window.location.href = '/dashboard'}
                        >
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Live Stats */}
              <Card className="border-2 border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Live Marketplace Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Renters</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold">2,847</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Response Time</span>
                    <span className="font-semibold">&lt; 5 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="font-semibold text-green-600">98.5%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Top Earners */}
              <Card className="border-2 border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Top Earners This Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2">
                      <div className="text-lg">🥇</div>
                      <div>
                        <div className="font-medium text-sm">ChatGPT Plus</div>
                        <div className="text-xs text-gray-500">Sarah M.</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">$247</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="text-lg">🥈</div>
                      <div>
                        <div className="font-medium text-sm">Midjourney</div>
                        <div className="text-xs text-gray-500">Alex K.</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">$189</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="text-lg">🥉</div>
                      <div>
                        <div className="font-medium text-sm">Claude Pro</div>
                        <div className="text-xs text-gray-500">Mike R.</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">$156</div>
                  </div>
                </CardContent>
              </Card>

              {/* Help & Support */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-blue-700 mb-4">
                    Our support team is here to help you maximize your earnings.
                  </p>
                  <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-200">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSubscription;