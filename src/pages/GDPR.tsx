import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Download, Trash2, Eye, Edit, UserCheck, Globe, Lock } from 'lucide-react';

const GDPR = () => {
  const rights = [
    {
      icon: Eye,
      title: 'Right to Access',
      description: 'You have the right to know what personal data we hold about you and how we process it.',
      action: 'Request Access',
      color: 'blue'
    },
    {
      icon: Edit,
      title: 'Right to Rectification',
      description: 'You can request that we correct any inaccurate or incomplete personal data.',
      action: 'Request Correction',
      color: 'green'
    },
    {
      icon: Trash2,
      title: 'Right to Erasure',
      description: 'You can request that we delete your personal data in certain circumstances.',
      action: 'Request Deletion',
      color: 'red'
    },
    {
      icon: Download,
      title: 'Right to Data Portability',
      description: 'You can request a copy of your data in a machine-readable format.',
      action: 'Download Data',
      color: 'purple'
    },
    {
      icon: UserCheck,
      title: 'Right to Object',
      description: 'You can object to processing of your personal data in certain circumstances.',
      action: 'Object to Processing',
      color: 'orange'
    },
    {
      icon: Lock,
      title: 'Right to Restrict Processing',
      description: 'You can request that we limit how we process your personal data.',
      action: 'Restrict Processing',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200 hover:bg-green-200',
      red: 'bg-red-100 text-red-600 border-red-200 hover:bg-red-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200 hover:bg-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200 hover:bg-indigo-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-12 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">GDPR Compliance</h1>
          <p className="text-xl text-slate-200 mb-6">
            Your privacy rights under the General Data Protection Regulation
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-white/10 text-white border-white/20">
              EU Regulation 2016/679
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              Fully Compliant
            </Badge>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Card className="mb-12 border-2 border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About GDPR</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                The General Data Protection Regulation (GDPR) is a European Union regulation that governs how 
                organizations collect, process, and store personal data. At SubSplit, we are committed to 
                protecting your privacy and ensuring full compliance with GDPR requirements.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                This page outlines your rights under GDPR and how you can exercise them with regard to your 
                personal data that we process. We believe in transparency and giving you full control over your data.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Rights Under GDPR</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {rights.map((right, index) => (
                <Card key={index} className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 ${getColorClasses(right.color)}`}>
                        <right.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{right.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{right.description}</p>
                    <Button variant="outline" className="w-full">
                      {right.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Legal Basis */}
          <Card className="mb-12 border-2 border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Legal Basis for Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We process your personal data based on the following legal grounds under GDPR:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Contract Performance</h4>
                    <p className="text-blue-700 text-sm">To provide our services and fulfill our contractual obligations</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Legitimate Interest</h4>
                    <p className="text-green-700 text-sm">To improve our services, prevent fraud, and ensure security</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Consent</h4>
                    <p className="text-purple-700 text-sm">For marketing communications and optional features</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">Legal Obligation</h4>
                    <p className="text-orange-700 text-sm">To comply with applicable laws and regulations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Processing */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle>Data Categories We Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Identity data (name, email address)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Transaction data (payment info, rental history)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Technical data (IP address, browser type)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Communication data (support inquiries)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle>Data Retention Periods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Account data</span>
                    <Badge variant="outline">Until deletion + 30 days</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Transaction data</span>
                    <Badge variant="outline">7 years</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Support data</span>
                    <Badge variant="outline">3 years</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Marketing data</span>
                    <Badge variant="outline">Until consent withdrawn</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact DPO */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Contact Our Data Protection Officer</h3>
              <p className="text-blue-100 mb-6 text-lg">
                If you have any questions about your privacy rights or wish to exercise any of your GDPR rights, 
                please contact our Data Protection Officer.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="space-y-1 text-blue-100">
                    <p><strong>Email:</strong> dpo@subsplit.com</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Response Time:</strong> Within 30 days</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Postal Address</h4>
                  <div className="text-blue-100">
                    <p>SubSplit Data Protection Officer</p>
                    <p>123 Privacy Street</p>
                    <p>San Francisco, CA 94105</p>
                    <p>United States</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GDPR;