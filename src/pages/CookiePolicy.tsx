import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, BarChart3, Target, Shield, Globe } from 'lucide-react';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      icon: Shield,
      type: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      examples: ['Session management', 'Security tokens', 'Load balancing', 'CSRF protection'],
      color: 'green'
    },
    {
      icon: BarChart3,
      type: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      examples: ['Google Analytics', 'Page view tracking', 'User behavior analysis', 'Performance monitoring'],
      color: 'blue'
    },
    {
      icon: Settings,
      type: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization.',
      examples: ['Language preferences', 'Theme settings', 'Remember login', 'User preferences'],
      color: 'purple'
    },
    {
      icon: Target,
      type: 'Marketing Cookies',
      description: 'These cookies are used to deliver relevant advertisements.',
      examples: ['Ad targeting', 'Conversion tracking', 'Social media integration', 'Retargeting'],
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-600 border-green-200',
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-12 bg-gradient-to-r from-slate-900 via-orange-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
            <Cookie className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cookie Policy</h1>
          <p className="text-xl text-slate-200 mb-6">
            Learn how we use cookies to improve your experience on SubSplit.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-white/10 text-white border-white/20">
              Last updated: January 15, 2024
            </Badge>
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
              Cookie Compliant
            </Badge>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Card className="mb-12 border-2 border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                SubSplit uses cookies to enhance your browsing experience, analyze website traffic, and personalize content. 
                We use both first-party and third-party cookies to provide you with the best possible service.
              </p>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <div className="grid gap-8 mb-12">
            {cookieTypes.map((cookie, index) => (
              <Card key={index} className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(cookie.color)}`}>
                      <cookie.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{cookie.type}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{cookie.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Examples:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {cookie.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-gray-600 text-sm">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cookie Management */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  Managing Cookies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  You can control and manage cookies in various ways. Please note that removing or blocking 
                  cookies can impact your user experience and parts of our website may no longer be fully accessible.
                </p>
                <Button className="w-full">
                  Cookie Preferences
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Browser Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Most browsers allow you to view, manage, delete, and block cookies. Here are links to 
                  cookie management for popular browsers:
                </p>
                <div className="space-y-2">
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">→ Google Chrome</a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">→ Mozilla Firefox</a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">→ Safari</a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">→ Microsoft Edge</a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Third-Party Cookies */}
          <Card className="mb-12 border-2 border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We may use third-party services that place cookies on your device. These services include:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics & Performance</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Google Analytics for website analytics</li>
                    <li>• Hotjar for user behavior analysis</li>
                    <li>• Mixpanel for product analytics</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Support & Communication</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Intercom for customer support</li>
                    <li>• Stripe for payment processing</li>
                    <li>• Social media platforms for sharing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About Cookies?</h3>
              <p className="text-orange-100 mb-6 text-lg">
                We're here to help you understand how we use cookies and how you can control them.
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@subsplit.com</p>
                <p><strong>Cookie Questions:</strong> cookies@subsplit.com</p>
                <p><strong>Response Time:</strong> Within 48 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicy;