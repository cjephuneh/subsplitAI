
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

const Status = () => {
  const systemStatus = {
    overall: 'operational',
    services: [
      { name: 'API', status: 'operational', uptime: '99.9%' },
      { name: 'Web Application', status: 'operational', uptime: '99.8%' },
      { name: 'Payment Processing', status: 'operational', uptime: '99.9%' },
      { name: 'AI Tool Integrations', status: 'degraded', uptime: '98.5%' },
      { name: 'Authentication', status: 'operational', uptime: '99.9%' },
      { name: 'Database', status: 'operational', uptime: '99.9%' }
    ]
  };

  const incidents = [
    {
      date: '2024-01-15',
      title: 'Brief API slowdown',
      status: 'resolved',
      description: 'API response times were elevated for approximately 10 minutes.',
      duration: '10 minutes'
    },
    {
      date: '2024-01-10',
      title: 'Scheduled maintenance',
      status: 'completed',
      description: 'Database optimization and security updates applied.',
      duration: '2 hours'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-100 text-green-800">Operational</Badge>;
      case 'degraded':
        return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>;
      case 'down':
        return <Badge className="bg-red-100 text-red-800">Down</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">System Status</h1>
            <p className="text-xl text-gray-600">
              Current status of SubSplit's services and infrastructure
            </p>
          </div>

          {/* Overall Status */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  {getStatusIcon(systemStatus.overall)}
                  Overall System Status
                </CardTitle>
                {getStatusBadge(systemStatus.overall)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                All systems are currently operational. We monitor our services 24/7 to ensure optimal performance.
              </p>
            </CardContent>
          </Card>

          {/* Service Status */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{service.uptime} uptime</span>
                      {getStatusBadge(service.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {incidents.map((incident, index) => (
                  <div key={index} className="border-l-4 border-gray-200 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{incident.title}</h3>
                      {getStatusBadge(incident.status)}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{incident.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>{incident.date}</span>
                      <span>Duration: {incident.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subscribe to Updates */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Stay informed about system updates and maintenance windows
            </p>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Subscribe to Status Updates
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Status;
