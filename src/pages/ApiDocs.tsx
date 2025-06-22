
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ApiDocs = () => {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/tools',
      description: 'Get all available AI tools',
      response: '{ "tools": [{ "id": "string", "name": "string", "price": "number" }] }'
    },
    {
      method: 'POST',
      path: '/api/rentals',
      description: 'Create a new rental',
      body: '{ "toolId": "string", "duration": "number" }',
      response: '{ "rental": { "id": "string", "accessToken": "string", "expiresAt": "string" } }'
    },
    {
      method: 'GET',
      path: '/api/rentals/:id',
      description: 'Get rental details',
      response: '{ "rental": { "id": "string", "status": "string", "timeRemaining": "number" } }'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrate SubSplit's rental platform into your applications with our REST API
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>
                    The SubSplit API allows you to programmatically rent AI tools and manage subscriptions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Base URL</h4>
                    <code className="bg-gray-100 px-3 py-1 rounded">https://api.subsplit.com/v1</code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Rate Limits</h4>
                    <p className="text-gray-600">1000 requests per hour for authenticated users</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Authentication</CardTitle>
                  <CardDescription>
                    Authenticate your requests using API keys
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                  <p className="text-gray-600">
                    Include your API key in the Authorization header for all requests.
                    You can obtain your API key from your dashboard settings.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm">{endpoint.path}</code>
                    </div>
                    <CardDescription>{endpoint.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {endpoint.body && (
                      <div>
                        <h5 className="font-medium mb-2">Request Body</h5>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                          {endpoint.body}
                        </pre>
                      </div>
                    )}
                    <div>
                      <h5 className="font-medium mb-2">Response</h5>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                        {endpoint.response}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Code Examples</CardTitle>
                  <CardDescription>Example implementations in different languages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">JavaScript/Node.js</h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
{`const response = await fetch('https://api.subsplit.com/v1/tools', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const tools = await response.json();
console.log(tools);`}
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Python</h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.subsplit.com/v1/tools', headers=headers)
tools = response.json()
print(tools)`}
                      </pre>
                    </div>
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
