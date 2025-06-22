
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Star, Clock, Users, ExternalLink } from 'lucide-react';

const BrowseTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  
  const tools = [
    {
      name: 'ChatGPT Plus',
      description: 'Advanced AI assistant with GPT-4 access, faster response times, and priority access during peak hours',
      price: '$2/day',
      rating: 4.9,
      reviews: 1247,
      category: 'AI Assistant',
      available: true,
      originalPrice: '$20/month',
      activeRenters: 23,
      features: ['GPT-4 Access', 'Faster Response', 'Priority Support']
    },
    {
      name: 'Claude Pro',
      description: 'Constitutional AI for safer conversations with advanced reasoning capabilities',
      price: '$3/day',
      rating: 4.8,
      reviews: 892,
      category: 'AI Assistant',
      available: true,
      originalPrice: '$20/month',
      activeRenters: 18,
      features: ['Long Context', 'Safe AI', 'Advanced Reasoning']
    },
    {
      name: 'Notion AI',
      description: 'AI-powered writing and productivity enhancement for your workspace',
      price: '$1.5/day',
      rating: 4.7,
      reviews: 654,
      category: 'Productivity',
      available: false,
      originalPrice: '$10/month',
      activeRenters: 0,
      features: ['Writing Assistant', 'Data Analysis', 'Task Automation']
    },
    {
      name: 'Midjourney',
      description: 'AI image generation and art creation with stunning visual results',
      price: '$4/day',
      rating: 4.9,
      reviews: 2156,
      category: 'Creative',
      available: true,
      originalPrice: '$30/month',
      activeRenters: 45,
      features: ['High Quality Images', 'Multiple Styles', 'Commercial License']
    },
    {
      name: 'Jasper AI',
      description: 'AI content creation and marketing copy that converts',
      price: '$2.5/day',
      rating: 4.6,
      reviews: 743,
      category: 'Content',
      available: true,
      originalPrice: '$24/month',
      activeRenters: 12,
      features: ['Marketing Copy', 'SEO Optimization', 'Brand Voice']
    },
    {
      name: 'GitHub Copilot',
      description: 'AI pair programmer for developers with code suggestions',
      price: '$1/day',
      rating: 4.8,
      reviews: 1891,
      category: 'Development',
      available: true,
      originalPrice: '$10/month',
      activeRenters: 67,
      features: ['Code Completion', 'Multiple Languages', 'IDE Integration']
    }
  ];

  const categories = ['all', 'AI Assistant', 'Creative', 'Productivity', 'Content', 'Development'];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'price-high':
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        return b.activeRenters - a.activeRenters;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse AI Tools</h1>
          <p className="text-gray-600">Rent premium AI subscriptions on demand</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedTools.length} of {tools.length} tools
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedTools.map((tool, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      {tool.available && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{tool.activeRenters}</span>
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="mb-2">{tool.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{tool.rating}</span>
                    <span className="text-xs text-gray-500">({tool.reviews})</span>
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {tool.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-purple-800">{tool.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{tool.originalPrice}</span>
                      <div className="text-xs text-green-600 font-medium">
                        Save {Math.round((1 - (parseFloat(tool.price.replace('$', '')) * 30) / parseFloat(tool.originalPrice.replace('$', '').replace('/month', ''))) * 100)}%
                      </div>
                    </div>
                    <Badge variant={tool.available ? "default" : "secondary"} className="flex items-center gap-1">
                      {tool.available ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Available
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3" />
                          Unavailable
                        </>
                      )}
                    </Badge>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full" 
                    disabled={!tool.available}
                    variant={tool.available ? "default" : "secondary"}
                  >
                    {tool.available ? (
                      <>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Rent Now
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedTools.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tools found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTools;
