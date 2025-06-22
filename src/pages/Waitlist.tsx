import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Sparkles, Gift, Bell, Star } from 'lucide-react';

const Waitlist = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    interestedTools: [] as string[],
    useCase: '',
    budget: '',
    notifications: true,
    updates: true
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToolToggle = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      interestedTools: prev.interestedTools.includes(tool)
        ? prev.interestedTools.filter(t => t !== tool)
        : [...prev.interestedTools, tool]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const aiTools = [
    'ChatGPT Plus', 'Claude Pro', 'Notion AI', 'Midjourney', 
    'Jasper AI', 'GitHub Copilot', 'Grammarly Premium', 'Canva Pro'
  ];

  const benefits = [
    { icon: Star, title: 'Early Bird Pricing', description: '50% off for first 3 months' },
    { icon: Bell, title: 'Priority Access', description: 'Skip the line when we launch' },
    { icon: Gift, title: 'Exclusive Perks', description: 'Free credits and premium features' }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Navbar />
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">You're on the list!</h1>
              <p className="text-xl text-gray-600 mb-6">
                Welcome to the SubSplit early access program. We'll notify you as soon as we launch.
              </p>
            </div>

            <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>You'll receive a confirmation email shortly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Get exclusive updates on our progress</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Be first to know when we launch</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Receive your early bird discount code</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <p className="text-gray-600">
                Want to help us build something amazing? Share SubSplit with your network!
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" className="flex items-center gap-2">
                  📘 Share on LinkedIn
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  🐦 Share on Twitter
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-purple-800 text-sm font-medium">Early Access Program</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join the SubSplit Waitlist
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Be among the first to access premium AI tools at fraction of the cost. 
              Plus, get exclusive early bird pricing and perks.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-purple-600" />
                <span>2,847 people waiting</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span>Launching Q2 2024</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Waitlist Form */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Reserve Your Spot</CardTitle>
              <CardDescription>
                Tell us about yourself and what AI tools you're most interested in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Acme Inc."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="writer">Content Writer</SelectItem>
                        <SelectItem value="marketer">Marketer</SelectItem>
                        <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="researcher">Researcher</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* AI Tools Interest */}
                <div>
                  <Label className="text-base font-medium">Which AI tools are you most interested in? *</Label>
                  <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {aiTools.map((tool) => (
                      <div key={tool} className="flex items-center space-x-2">
                        <Checkbox
                          id={tool}
                          checked={formData.interestedTools.includes(tool)}
                          onCheckedChange={() => handleToolToggle(tool)}
                        />
                        <Label htmlFor={tool} className="text-sm cursor-pointer">
                          {tool}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Use Case */}
                <div>
                  <Label htmlFor="useCase">What will you primarily use AI tools for?</Label>
                  <Textarea
                    id="useCase"
                    value={formData.useCase}
                    onChange={(e) => handleInputChange('useCase', e.target.value)}
                    placeholder="e.g., Content creation, coding assistance, design work, research..."
                    rows={3}
                    className="mt-1"
                  />
                </div>

                {/* Budget */}
                <div>
                  <Label htmlFor="budget">Monthly AI tools budget</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-25">$0 - $25</SelectItem>
                      <SelectItem value="25-50">$25 - $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-200">$100 - $200</SelectItem>
                      <SelectItem value="200+">$200+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Preferences */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifications"
                      checked={formData.notifications}
                      onCheckedChange={(checked) => handleInputChange('notifications', checked)}
                    />
                    <Label htmlFor="notifications" className="text-sm">
                      Send me launch notifications and early access updates
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="updates"
                      checked={formData.updates}
                      onCheckedChange={(checked) => handleInputChange('updates', checked)}
                    />
                    <Label htmlFor="updates" className="text-sm">
                      I'd like to receive tips and insights about AI tools
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 text-lg"
                  disabled={isLoading || !formData.firstName || !formData.lastName || !formData.email || formData.interestedTools.length === 0}
                >
                  {isLoading ? 'Joining Waitlist...' : 'Join the Waitlist'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By joining, you agree to our{' '}
                  <a href="/terms" className="text-purple-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</a>
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Join innovators from leading companies</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <span className="text-2xl font-bold text-gray-400">Google</span>
              <span className="text-2xl font-bold text-gray-400">Microsoft</span>
              <span className="text-2xl font-bold text-gray-400">OpenAI</span>
              <span className="text-2xl font-bold text-gray-400">Stripe</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Waitlist;