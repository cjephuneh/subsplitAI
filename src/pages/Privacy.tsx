import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, UserCheck, Database, Globe } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Account information (name, email, password)",
        "Payment information (processed by secure third-party providers)",
        "Usage data and analytics to improve our service",
        "Communication preferences and support interactions",
        "Device and browser information for security purposes"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Provide and maintain our Service",
        "Process transactions and send related information",
        "Send you technical notices and support messages",
        "Respond to your comments and questions",
        "Monitor and analyze trends and usage patterns",
        "Detect and prevent fraud and abuse"
      ]
    },
    {
      icon: Shield,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or otherwise transfer your personal information to third parties",
        "With your explicit consent for specific purposes",
        "To comply with legal obligations and court orders",
        "To protect our rights, safety, and the safety of others",
        "With service providers who assist us in operations (under strict agreements)",
        "In connection with business transfers (with notice to users)"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "Industry-standard encryption for data in transit and at rest",
        "Regular security audits and penetration testing",
        "Multi-factor authentication for administrative access",
        "Secure data centers with physical and digital protections",
        "Employee training on data protection and privacy",
        "Incident response procedures for potential breaches"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access your personal information and download your data",
        "Correct inaccurate or incomplete information",
        "Delete your information (subject to legal requirements)",
        "Opt out of certain communications and marketing",
        "Data portability to other services",
        "Object to processing in certain circumstances"
      ]
    },
    {
      icon: Globe,
      title: "International Transfers",
      content: [
        "Data may be transferred to countries outside your residence",
        "We ensure adequate protection through appropriate safeguards",
        "Standard contractual clauses for EU data transfers",
        "Compliance with applicable data protection laws",
        "Regular review of transfer mechanisms and protections"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-12 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-slate-200 mb-6">
            Your privacy is our priority. Learn how we protect and handle your data.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-white/10 text-white border-white/20">
              Last updated: January 15, 2024
            </Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              GDPR Compliant
            </Badge>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Card className="mb-12 border-2 border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                At SubSplit, we believe privacy is a fundamental right. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our platform. We are committed to 
                transparency and giving you control over your personal data.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="grid gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <section.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="mt-12 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h3>
              <p className="text-purple-100 mb-6 text-lg">
                We're here to help. Contact our privacy team for any questions or concerns.
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@subsplit.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@subsplit.com</p>
                <p><strong>Response Time:</strong> Within 30 days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;