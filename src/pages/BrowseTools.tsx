
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star } from 'lucide-react';

const BrowseTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const tools = [
    {
      name: 'ChatGPT Plus',
      description: 'Advanced AI assistant with GPT-4 access',
      price: '$2/day',
      rating: 4.9,
      category: 'AI Assistant',
      available: true,
      originalPrice: '$20/month'
    },
    {
      name: 'Claude Pro',
      description: 'Constitutional AI for safer conversations',
      price: '$3/day',
      rating: 4.8,
      category: 'AI Assistant',
      available: true,
      originalPrice: '$20/month'
    },
    {
      name: 'Notion AI',
      description: 'AI-powered writing and productivity',
      price: '$1.5/day',
      rating: 4.7,
      category: 'Productivity',
      available: false,
      originalPrice: '$10/month'
    },
    {
      name: 'Midjourney',
      description: 'AI image generation and art creation',
      price: '$4/day',
      rating: 4.9,
      category: 'Creative',
      available: true,
      originalPrice: '$30/month'
    },
    {
      name: 'Jasper AI',
      description: 'AI content creation and marketing',
      price: '$2.5/day',
      rating: 4.6,
      category: 'Content',
      available: true,
      originalPrice: '$24/month'
    },
    {
      name: 'GitHub Copilot',
      description: 'AI pair programmer for developers',
      price: '$1/day',
      rating: 4.8,
      category: 'Development',
      available: true,
      originalPrice: '$10/month'
    }
  ];

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse AI Tools</h1>
          <p className="text-gray-600">Rent premium AI subscriptions on demand</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">{tool.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{tool.rating}</span>
                  </div>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-purple-800">{tool.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{tool.originalPrice}</span>
                    </div>
                    <Badge variant={tool.available ? "default" : "secondary"}>
                      {tool.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  <Button 
                    className="w-full" 
                    disabled={!tool.available}
                    variant={tool.available ? "default" : "secondary"}
                  >
                    {tool.available ? "Rent Now" : "Join Waitlist"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No tools found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTools;
