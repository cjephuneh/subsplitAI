import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Key, Zap, BookOpen, Shield, Globe, Copy, ExternalLink } from 'lucide-react';

const ApiDocs = () => {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/tools',
      description: 'Get all available AI tools with pricing and availability',
      response: `{
  "tools": [
    {
      "id": "chatgpt-plus",
      "name": "ChatGPT Plus",
      "price": 2.00,
      "currency": "USD",
      "available": true,
      "category": "AI Assistant"
    }
  ],
  "total": 25,
  "page": 1
}`,
      parameters: [
        { name: 'category', type: 'string', description: 'Filter by tool category' },
        { name: 'available', type: 'boolean', description: 'Filter by availability' },
        { name: 'page', type: 'integer', description: 'Page number for pagination' }
      ]
    },
    {
      method: 'POST',
      path: '/api/v1/rentals',
      description: 'Create a new rental for an AI tool',
      body: `{
  "toolId": "chatgpt-plus",
  "duration": 24,
  "paymentMethod": "card_1234"
}`,
      response: `{
  "rental": {
    "id": "rental_abc123",
    "toolId": "chatgpt-plus",
    "accessToken": "temp_token_xyz",
    "expiresAt": "2024-01-16T10:00:00Z",
    "accessUrl": "https://tools.subsplit.com/access/abc123"
  }
}`,
      parameters: []
    },
    {
      method: 'GET',
      path: '/api/v1/rentals/{id}',
      description: 'Get rental details and status',
      response: `{
  "rental": {
    "id": "rental_abc123",
    "status": "active",
    "timeRemaining": 18.5,
    "tool": {
      "name": "ChatGPT Plus",
      "category": "AI Assistant"
    }
  }
}`,
      parameters: [
        { name: 'id', type: 'string', description: 'Rental ID', required: true }
      ]
    },
    {
      method: 'POST',
      path: '/api/v1/listings',
      description: 'List your AI subscription for others to rent',
      body: `{
  "toolName": "Claude Pro",
  "dailyPrice": 3.00,
  "maxHours": 8,
  "description": "Premium Claude access"
}`,
      response: `{
  "listing": {
    "id": "listing_def456",
    "status": "pending_review",
    "estimatedApproval": "2024-01-16T12:00:00Z"
  }
}`,
      parameters: []
    }
  ];

  const sdks = [
    {
      language: 'JavaScript',
      install: 'npm install @subsplit/api',
      example: `import { SubSplit } from '@subsplit/api';

const client = new SubSplit({
  apiKey: 'your_api_key_here'
});

// Get available tools
const tools = await client.tools.list();

// Rent a tool
const rental = await client.rentals.create({
  toolId: 'chatgpt-plus',
  duration: 24
});`
    },
    {
      language: 'Python',
      install: 'pip install subsplit-api',
      example: `from subsplit import SubSplit

client = SubSplit(api_key='your_api_key_here')

# Get available tools
tools = client.tools.list()

# Rent a tool
rental = client.rentals.create(
    tool_id='chatgpt-plus',
    duration=24
)`
    },
    {
      language: 'cURL',
      install: 'No installation required',
      example: `# Get available tools
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.subsplit.com/v1/tools

# Create a rental
curl -X POST \\
     -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     -d '{"toolId":"chatgpt-plus","duration":24}' \\
     https://api.subsplit.com/v1/rentals`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-12 bg-gradient-to-r from-slate-900 via-green-900 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">API Documentation</h1>
          <p className="text-xl text-slate-200 mb-6">
            Integrate SubSplit's rental platform into your applications with our REST API
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-white/10 text-white border-white/20">
              Version 1.0
            </Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              RESTful API
            </Badge>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="sdks">SDKs & Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2 border-slate-200 shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>
                      Quick start guide to using the SubSplit API
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded">
                        <h4 className="font-semibold mb-1">Base URL</h4>
                        <code className="text-sm text-gray-600">https://api.subsplit.com/v1</code>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <h4 className="font-semibold mb-1">Rate Limits</h4>
                        <p className="text-sm text-gray-600">1000 requests per hour</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-slate-200 shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                      Enterprise-grade security for your integrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        HTTPS encryption
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        API key authentication
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Request signing
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Rate limiting
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-slate-200 shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <Globe className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle>Global Availability</CardTitle>
                    <CardDescription>
                      Worldwide API access with low latency
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        99.9% uptime SLA
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Global CDN
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Multi-region support
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        24/7 monitoring
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-2 border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle>Response Format</CardTitle>
                  <CardDescription>All API responses follow a consistent JSON format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">Success Response</h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    // Response data here
  },
  "meta": {
    "timestamp": "2024-01-15T10:00:00Z",
    "requestId": "req_abc123"
  }
}`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-red-600">Error Response</h4>
                      <pre className="bg-gray-900 text-red-400 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is invalid",
    "details": "Missing required field: toolId"
  },
  "meta": {
    "timestamp": "2024-01-15T10:00:00Z",
    "requestId": "req_def456"
  }
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-6">
              <Card className="border-2 border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-blue-600" />
                    API Authentication
                  </CardTitle>
                  <CardDescription>
                    Authenticate your requests using API keys
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Authentication Header</h4>
                    <code className="text-blue-800 bg-blue-100 px-2 py-1 rounded">
                      Authorization: Bearer YOUR_API_KEY
                    </code>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Getting Your API Key</h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li>Sign in to your SubSplit dashboard</li>
                      <li>Navigate to Settings → API Keys</li>
                      <li>Click "Generate New API Key"</li>
                      <li>Copy and securely store your API key</li>
                    </ol>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Security Best Practices</h4>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• Never expose API keys in client-side code</li>
                      <li>• Use environment variables to store keys</li>
                      <li>• Rotate keys regularly</li>
                      <li>• Use different keys for different environments</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index} className="border-2 border-slate-200 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'} className="font-mono">
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono">{endpoint.path}</code>
                      <Button size="sm" variant="ghost" className="ml-auto">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>{endpoint.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {endpoint.parameters && endpoint.parameters.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-3">Parameters</h5>
                        <div className="space-y-2">
                          {endpoint.parameters.map((param, paramIndex) => (
                            <div key={paramIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-2">
                                <code className="text-sm font-mono">{param.name}</code>
                                <Badge variant="outline" className="text-xs">{param.type}</Badge>
                                {param.required && <Badge variant="destructive" className="text-xs">required</Badge>}
                              </div>
                              <span className="text-sm text-gray-600">{param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {endpoint.body && (
                      <div>
                        <h5 className="font-semibold mb-3">Request Body</h5>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                          {endpoint.body}
                        </pre>
                      </div>
                    )}

                    <div>
                      <h5 className="font-semibold mb-3">Response</h5>
                      <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg text-sm overflow-x-auto">
                        {endpoint.response}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="sdks" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Official SDKs & Code Examples</h2>
                <p className="text-gray-600">
                  Get started quickly with our official SDKs and comprehensive examples
                </p>
              </div>

              <div className="grid gap-6">
                {sdks.map((sdk, index) => (
                  <Card key={index} className="border-2 border-slate-200 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          {sdk.language}
                        </CardTitle>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on GitHub
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Installation</h5>
                        <code className="bg-gray-100 px-3 py-2 rounded block text-sm">
                          {sdk.install}
                        </code>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-2">Example Usage</h5>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                          {sdk.example}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Need Help Getting Started?</h3>
                  <p className="text-green-100 mb-6 text-lg">
                    Our developer support team is here to help you integrate successfully.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="secondary">
                      Join Discord Community
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApiDocs;