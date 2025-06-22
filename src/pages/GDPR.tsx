
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Download, Trash2, Eye, Edit } from 'lucide-react';

const GDPR = () => {
  const rights = [
    {
      icon: Eye,
      title: 'Right to Access',
      description: 'You have the right to know what personal data we hold about you and how we process it.',
      action: 'Request Access'
    },
    {
      icon: Edit,
      title: 'Right to Rectification',
      description: 'You can request that we correct any inaccurate or incomplete personal data.',
      action: 'Request Correction'
    },
    {
      icon: Trash2,
      title: 'Right to Erasure',
      description: 'You can request that we delete your personal data in certain circumstances.',
      action: 'Request Deletion'
    },
    {
      icon: Download,
      title: 'Right to Data Portability',
      description: 'You can request a copy of your data in a machine-readable format.',
      action: 'Download Data'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">GDPR Compliance</h1>
            <p className="text-xl text-gray-600">
              Your privacy rights under the General Data Protection Regulation
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About GDPR</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                The General Data Protection Regulation (GDPR) is a European Union regulation that governs how organizations collect, process, and store personal data. At SubSplit, we are committed to protecting your privacy and ensuring compliance with GDPR requirements.
              </p>
              <p className="text-gray-700">
                This page outlines your rights under GDPR and how you can exercise them with regard to your personal data that we process.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights Under GDPR</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {rights.map((right, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <right.icon className="h-5 w-5 text-purple-600" />
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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Legal Basis for Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We process your personal data based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Contract Performance:</strong> To provide our services and fulfill our contractual obligations</li>
                <li><strong>Legitimate Interest:</strong> To improve our services, prevent fraud, and ensure security</li>
                <li><strong>Consent:</strong> For marketing communications and optional features (where applicable)</li>
                <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Processing */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How We Process Your Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Data Categories</h4>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Identity data (name, email address)</li>
                    <li>Transaction data (payment information, rental history)</li>
                    <li>Technical data (IP address, browser type, usage statistics)</li>
                    <li>Communication data (support inquiries, feedback)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Retention Periods</h4>
                  <p className="text-gray-700">
                    We retain personal data for as long as necessary to fulfill the purposes for which it was collected, typically:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Account data: Until account deletion + 30 days</li>
                    <li>Transaction data: 7 years for accounting purposes</li>
                    <li>Support data: 3 years after resolution</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact DPO */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Contact Our Data Protection Officer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 mb-4">
                If you have any questions about your privacy rights or wish to exercise any of your GDPR rights, please contact our Data Protection Officer.
              </p>
              <div className="space-y-2 text-blue-800">
                <p><strong>Email:</strong> dpo@subsplit.com</p>
                <p><strong>Address:</strong> SubSplit Data Protection Officer, 123 Privacy Street, EU City, 12345</p>
                <p><strong>Response Time:</strong> We will respond to your request within 30 days</p>
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
