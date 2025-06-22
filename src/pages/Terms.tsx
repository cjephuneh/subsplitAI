import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, Shield, CreditCard, AlertTriangle, Scale } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using SubSplit, you accept and agree to be bound by these terms",
        "If you do not agree to these terms, please do not use our service",
        "These terms apply to all users, including browsers, vendors, customers, and contributors",
        "We may update these terms from time to time with notice to users"
      ]
    },
    {
      icon: FileText,
      title: "Description of Service",
      content: [
        "SubSplit is a platform that allows users to rent access to AI subscriptions and tools",
        "Users can list their unused subscription credits for others to rent",
        "We facilitate secure, temporary access to premium AI tools",
        "Service availability may vary by location and tool provider"
      ]
    },
    {
      icon: Shield,
      title: "User Accounts & Responsibilities",
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the confidentiality of your account",
        "You must notify us immediately of any unauthorized use of your account",
        "You are responsible for all activities that occur under your account",
        "One person or entity may not maintain more than one account"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Acceptable Use Policy",
      content: [
        "Do not violate any applicable laws or regulations",
        "Do not infringe on the rights of others or engage in harmful activities",
        "Do not transmit harmful, offensive, or malicious content",
        "Do not attempt to gain unauthorized access to our systems",
        "Do not share or distribute subscription credentials inappropriately",
        "Do not use the service for illegal or fraudulent activities"
      ]
    },
    {
      icon: CreditCard,
      title: "Payments & Refunds",
      content: [
        "All payments are processed securely through our payment providers",
        "Prices are clearly displayed before purchase and may include applicable taxes",
        "Refunds are available under certain circumstances as outlined in our refund policy",
        "We reserve the right to change pricing with reasonable notice",
        "Payment disputes should be reported within 30 days of the transaction"
      ]
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content: [
        "SubSplit is provided 'as is' without warranties of any kind",
        "We shall not be liable for any indirect, incidental, or consequential damages",
        "Our total liability shall not exceed the amount paid by you in the past 12 months",
        "Some jurisdictions do not allow limitation of liability, so these may not apply to you",
        "We are not responsible for third-party AI tool availability or performance"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-12 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-xl text-slate-200 mb-6">
            The legal agreement between you and SubSplit for using our platform.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-white/10 text-white border-white/20">
              Last updated: January 15, 2024
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              Version 2.1
            </Badge>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Card className="mb-12 border-2 border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to SubSplit</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of SubSplit's platform and services. 
                By using our service, you agree to these terms in full. Please read them carefully.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                SubSplit provides a marketplace for renting access to AI tools and subscriptions. 
                We connect users who need temporary access with those who have unused subscription credits.
              </p>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="grid gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <section.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Important Terms */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Termination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 text-sm">
                  We reserve the right to terminate or suspend your account at any time for violation 
                  of these terms or for any other reason we deem appropriate, with or without notice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Governing Law
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 text-sm">
                  These terms are governed by the laws of Delaware, United States. 
                  Any disputes will be resolved in the courts of Delaware.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <Card className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Our legal team is here to help clarify any questions you may have.
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> legal@subsplit.com</p>
                <p><strong>Address:</strong> SubSplit Legal, 123 Tech Street, San Francisco, CA 94105</p>
                <p><strong>Response Time:</strong> Within 5 business days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;