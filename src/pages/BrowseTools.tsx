import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Star, Clock, Users, ExternalLink, Sparkles, TrendingUp, Zap, Crown, Fire, Award } from 'lucide-react';

const BrowseTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceFilter, setPriceFilter] = useState('all');
  
  const tools = [
    // AI Assistants
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
      features: ['GPT-4 Access', 'Faster Response', 'Priority Support'],
      logo: '🤖',
      trending: true,
      popular: true,
      savings: 85
    },
    {
      name: 'Claude Pro',
      description: 'Constitutional AI for safer conversations with advanced reasoning capabilities and 100K context window',
      price: '$3/day',
      rating: 4.8,
      reviews: 892,
      category: 'AI Assistant',
      available: true,
      originalPrice: '$20/month',
      activeRenters: 18,
      features: ['Long Context', 'Safe AI', 'Advanced Reasoning'],
      logo: '🧠',
      trending: false,
      popular: true,
      savings: 78
    },
    {
      name: 'Perplexity Pro',
      description: 'AI-powered search engine with real-time information and source citations',
      price: '$1.5/day',
      rating: 4.7,
      reviews: 654,
      category: 'AI Assistant',
      available: true,
      originalPrice: '$20/month',
      activeRenters: 31,
      features: ['Real-time Search', 'Source Citations', 'Academic Mode'],
      logo: '🔍',
      trending: true,
      popular: false,
      savings: 88
    },
    {
      name: 'Anthropic Claude',
      description: 'Advanced AI assistant focused on being helpful, harmless, and honest',
      price: '$2.5/day',
      rating: 4.8,
      reviews: 743,
      category: 'AI Assistant',
      available: false,
      originalPrice: '$20/month',
      activeRenters: 0,
      features: ['Constitutional AI', 'Long Context', 'Code Analysis'],
      logo: '🤖',
      trending: false,
      popular: false,
      savings: 81
    },

    // Creative Tools
    {
      name: 'Midjourney',
      description: 'AI image generation and art creation with stunning visual results and artistic styles',
      price: '$4/day',
      rating: 4.9,
      reviews: 2156,
      category: 'Creative',
      available: true,
      originalPrice: '$30/month',
      activeRenters: 45,
      features: ['High Quality Images', 'Multiple Styles', 'Commercial License'],
      logo: '🎨',
      trending: true,
      popular: true,
      savings: 73
    },
    {
      name: 'DALL-E 3',
      description: 'OpenAI\'s latest image generation model with improved prompt understanding',
      price: '$3.5/day',
      rating: 4.7,
      reviews: 1432,
      category: 'Creative',
      available: true,
      originalPrice: '$20/month',
      activeRenters: 28,
      features: ['Prompt Accuracy', 'High Resolution', 'Style Control'],
      logo: '🖼️',
      trending: true,
      popular: false,
      savings: 82
    },
    {
      name: 'Stable Diffusion XL',
      description: 'Open-source image generation with fine-tuned control and customization',
      price: '$2/day',
      rating: 4.6,
      reviews: 987,
      category: 'Creative',
      available: true,
      originalPrice: '$15/month',
      activeRenters: 19,
      features: ['Open Source', 'Custom Models', 'API Access'],
      logo: '🌟',
      trending: false,
      popular: false,
      savings: 77
    },
    {
      name: 'Adobe Firefly',
      description: 'Adobe\'s AI-powered creative suite for image generation and editing',
      price: '$3/day',
      rating: 4.5,
      reviews: 756,
      category: 'Creative',
      available: true,
      originalPrice: '$23/month',
      activeRenters: 22,
      features: ['Adobe Integration', 'Commercial Safe', 'Vector Generation'],
      logo: '🔥',
      trending: false,
      popular: false,
      savings: 74
    },
    {
      name: 'RunwayML',
      description: 'AI video generation and editing tools for creative professionals',
      price: '$5/day',
      rating: 4.8,
      reviews: 1123,
      category: 'Creative',
      available: true,
      originalPrice: '$35/month',
      activeRenters: 16,
      features: ['Video Generation', 'Motion Graphics', 'Green Screen'],
      logo: '🎬',
      trending: true,
      popular: false,
      savings: 71
    },

    // Productivity Tools
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
      features: ['Writing Assistant', 'Data Analysis', 'Task Automation'],
      logo: '📝',
      trending: false,
      popular: true,
      savings: 78
    },
    {
      name: 'Grammarly Premium',
      description: 'Advanced grammar checking, style suggestions, and plagiarism detection',
      price: '$1/day',
      rating: 4.6,
      reviews: 2341,
      category: 'Productivity',
      available: true,
      originalPrice: '$12/month',
      activeRenters: 67,
      features: ['Grammar Check', 'Style Guide', 'Plagiarism Detection'],
      logo: '✍️',
      trending: false,
      popular: true,
      savings: 75
    },
    {
      name: 'Otter.ai Pro',
      description: 'AI-powered meeting transcription and note-taking with speaker identification',
      price: '$1.2/day',
      rating: 4.5,
      reviews: 892,
      category: 'Productivity',
      available: true,
      originalPrice: '$17/month',
      activeRenters: 34,
      features: ['Live Transcription', 'Speaker ID', 'Meeting Summary'],
      logo: '🦦',
      trending: false,
      popular: false,
      savings: 79
    },
    {
      name: 'Calendly Premium',
      description: 'Advanced scheduling with AI-powered meeting optimization and analytics',
      price: '$0.8/day',
      rating: 4.4,
      reviews: 1567,
      category: 'Productivity',
      available: true,
      originalPrice: '$12/month',
      activeRenters: 41,
      features: ['Smart Scheduling', 'Analytics', 'Team Features'],
      logo: '📅',
      trending: false,
      popular: false,
      savings: 80
    },

    // Content Creation
    {
      name: 'Jasper AI',
      description: 'AI content creation and marketing copy that converts with brand voice training',
      price: '$2.5/day',
      rating: 4.6,
      reviews: 743,
      category: 'Content',
      available: true,
      originalPrice: '$24/month',
      activeRenters: 12,
      features: ['Marketing Copy', 'SEO Optimization', 'Brand Voice'],
      logo: '✨',
      trending: false,
      popular: true,
      savings: 79
    },
    {
      name: 'Copy.ai Pro',
      description: 'AI copywriting tool for marketing, sales, and content creation',
      price: '$2/day',
      rating: 4.5,
      reviews: 1234,
      category: 'Content',
      available: true,
      originalPrice: '$36/month',
      activeRenters: 25,
      features: ['Sales Copy', 'Email Templates', 'Social Media'],
      logo: '📋',
      trending: false,
      popular: false,
      savings: 83
    },
    {
      name: 'Writesonic',
      description: 'AI writing assistant for articles, ads, and marketing content',
      price: '$1.8/day',
      rating: 4.4,
      reviews: 876,
      category: 'Content',
      available: true,
      originalPrice: '$19/month',
      activeRenters: 18,
      features: ['Article Writer', 'Ad Copy', 'Paraphrasing'],
      logo: '🚀',
      trending: false,
      popular: false,
      savings: 81
    },
    {
      name: 'Loom Pro',
      description: 'Screen recording and video messaging with AI-powered transcription',
      price: '$1.5/day',
      rating: 4.7,
      reviews: 1987,
      category: 'Content',
      available: true,
      originalPrice: '$15/month',
      activeRenters: 52,
      features: ['Screen Recording', 'Auto Transcription', 'Video Editing'],
      logo: '📹',
      trending: false,
      popular: false,
      savings: 70
    },

    // Development Tools
    {
      name: 'GitHub Copilot',
      description: 'AI pair programmer for developers with code suggestions and completions',
      price: '$1/day',
      rating: 4.8,
      reviews: 1891,
      category: 'Development',
      available: true,
      originalPrice: '$10/month',
      activeRenters: 67,
      features: ['Code Completion', 'Multiple Languages', 'IDE Integration'],
      logo: '👨‍💻',
      trending: false,
      popular: true,
      savings: 70
    },
    {
      name: 'Tabnine Pro',
      description: 'AI code completion tool that learns from your codebase',
      price: '$1.2/day',
      rating: 4.6,
      reviews: 1234,
      category: 'Development',
      available: true,
      originalPrice: '$12/month',
      activeRenters: 43,
      features: ['Custom Models', 'Team Training', 'Privacy First'],
      logo: '⚡',
      trending: false,
      popular: false,
      savings: 70
    },
    {
      name: 'Replit Pro',
      description: 'Cloud-based IDE with AI-powered coding assistance and collaboration',
      price: '$1.5/day',
      rating: 4.5,
      reviews: 987,
      category: 'Development',
      available: true,
      originalPrice: '$20/month',
      activeRenters: 29,
      features: ['Cloud IDE', 'AI Assistant', 'Real-time Collaboration'],
      logo: '💻',
      trending: true,
      popular: false,
      savings: 78
    },
    {
      name: 'Cursor Pro',
      description: 'AI-first code editor with advanced code generation and refactoring',
      price: '$2/day',
      rating: 4.7,
      reviews: 654,
      category: 'Development',
      available: true,
      originalPrice: '$20/month',
      activeRenters: 21,
      features: ['AI Code Generation', 'Smart Refactoring', 'Context Aware'],
      logo: '🎯',
      trending: true,
      popular: false,
      savings: 70
    },

    // Design Tools
    {
      name: 'Canva Pro',
      description: 'Professional design platform with AI-powered design suggestions and templates',
      price: '$1.2/day',
      rating: 4.6,
      reviews: 3456,
      category: 'Design',
      available: true,
      originalPrice: '$15/month',
      activeRenters: 89,
      features: ['AI Design', 'Brand Kit', 'Premium Templates'],
      logo: '🎨',
      trending: false,
      popular: true,
      savings: 76
    },
    {
      name: 'Figma Pro',
      description: 'Collaborative design tool with AI-powered design systems and prototyping',
      price: '$2/day',
      rating: 4.8,
      reviews: 2134,
      category: 'Design',
      available: true,
      originalPrice: '$15/month',
      activeRenters: 56,
      features: ['Design Systems', 'Prototyping', 'Team Collaboration'],
      logo: '🔧',
      trending: false,
      popular: true,
      savings: 73
    },
    {
      name: 'Framer Pro',
      description: 'Website builder with AI-powered design and no-code development',
      price: '$1.8/day',
      rating: 4.5,
      reviews: 876,
      category: 'Design',
      available: true,
      originalPrice: '$20/month',
      activeRenters: 32,
      features: ['No-code Builder', 'AI Design', 'Responsive Design'],
      logo: '🖼️',
      trending: true,
      popular: false,
      savings: 73
    },

    // Analytics & SEO
    {
      name: 'SEMrush Pro',
      description: 'Comprehensive SEO and marketing analytics with AI-powered insights',
      price: '$4/day',
      rating: 4.7,
      reviews: 1876,
      category: 'Analytics',
      available: true,
      originalPrice: '$120/month',
      activeRenters: 23,
      features: ['SEO Analysis', 'Competitor Research', 'Content Audit'],
      logo: '📊',
      trending: false,
      popular: false,
      savings: 90
    },
    {
      name: 'Ahrefs Pro',
      description: 'SEO toolset for backlink analysis, keyword research, and site audits',
      price: '$3.5/day',
      rating: 4.8,
      reviews: 1543,
      category: 'Analytics',
      available: true,
      originalPrice: '$99/month',
      activeRenters: 18,
      features: ['Backlink Analysis', 'Keyword Research', 'Site Audit'],
      logo: '🔗',
      trending: false,
      popular: false,
      savings: 89
    },
    {
      name: 'Hotjar Pro',
      description: 'User behavior analytics with heatmaps, recordings, and feedback tools',
      price: '$2.5/day',
      rating: 4.6,
      reviews: 1234,
      category: 'Analytics',
      available: true,
      originalPrice: '$39/month',
      activeRenters: 27,
      features: ['Heatmaps', 'Session Recordings', 'User Feedback'],
      logo: '🔥',
      trending: false,
      popular: false,
      savings: 81
    }
  ];

  const categories = ['all', 'AI Assistant', 'Creative', 'Productivity', 'Content', 'Development', 'Design', 'Analytics'];
  const priceRanges = ['all', 'under-2', '2-3', '3-5', 'over-5'];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceFilter !== 'all') {
      const price = parseFloat(tool.price.replace('$', ''));
      switch (priceFilter) {
        case 'under-2':
          matchesPrice = price < 2;
          break;
        case '2-3':
          matchesPrice = price >= 2 && price < 3;
          break;
        case '3-5':
          matchesPrice = price >= 3 && price < 5;
          break;
        case 'over-5':
          matchesPrice = price >= 5;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'price-high':
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      case 'rating':
        return b.rating - a.rating;
      case 'savings':
        return b.savings - a.savings;
      case 'popular':
      default:
        return b.activeRenters - a.activeRenters;
    }
  });

  const trendingTools = tools.filter(tool => tool.trending).slice(0, 4);
  const popularTools = tools.filter(tool => tool.popular).slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">50+ Premium AI Tools</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Browse AI Tools
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Rent premium AI subscriptions on demand. Save up to 90% compared to monthly subscriptions.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">{tools.length}</div>
                <div className="text-sm text-blue-100">AI Tools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">{tools.filter(t => t.available).length}</div>
                <div className="text-sm text-blue-100">Available Now</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">85%</div>
                <div className="text-sm text-blue-100">Avg. Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">{tools.reduce((sum, tool) => sum + tool.activeRenters, 0)}</div>
                <div className="text-sm text-blue-100">Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trending & Popular Sections */}
        <Tabs defaultValue="browse" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex items-center gap-2">
              <Fire className="w-4 h-4" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Browse All
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">🔥 Trending This Week</h2>
              <p className="text-gray-600">The hottest AI tools everyone's talking about</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingTools.map((tool, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-orange-500 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-3xl">{tool.logo}</div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-purple-800">{tool.price}</span>
                        <div className="text-xs text-green-600 font-medium">
                          Save {tool.savings}%
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
                            Soon
                          </>
                        )}
                      </Badge>
                    </div>

                    <Button className="w-full" disabled={!tool.available}>
                      {tool.available ? (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Rent Now
                        </>
                      ) : (
                        "Join Waitlist"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">⭐ Most Popular</h2>
              <p className="text-gray-600">Top-rated tools loved by our community</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map((tool, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-yellow-500 text-black">
                      <Crown className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-3xl">{tool.logo}</div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{tool.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-purple-800">{tool.price}</span>
                        <div className="text-xs text-green-600 font-medium">
                          Save {tool.savings}%
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{tool.activeRenters}</p>
                        <p className="text-xs text-gray-500">active users</p>
                      </div>
                    </div>

                    <Button className="w-full" disabled={!tool.available}>
                      {tool.available ? (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Rent Now
                        </>
                      ) : (
                        "Join Waitlist"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search for AI tools..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[180px] bg-white/50">
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

                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                      <SelectTrigger className="w-[150px] bg-white/50">
                        <SelectValue placeholder="Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="under-2">Under $2</SelectItem>
                        <SelectItem value="2-3">$2 - $3</SelectItem>
                        <SelectItem value="3-5">$3 - $5</SelectItem>
                        <SelectItem value="over-5">Over $5</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[150px] bg-white/50">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="savings">Best Savings</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results count */}
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Showing {sortedTools.length} of {tools.length} tools
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{tools.filter(t => t.available).length} available now</span>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTools.map((tool, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden group">
                  {/* Badges */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                    {tool.trending && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    {tool.popular && (
                      <Badge className="bg-yellow-500 text-black text-xs">
                        <Crown className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {tool.savings >= 85 && (
                      <Badge className="bg-green-500 text-white text-xs">
                        <Award className="w-3 h-3 mr-1" />
                        Best Deal
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="text-3xl">{tool.logo}</div>
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-purple-800 transition-colors">
                          {tool.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{tool.rating}</span>
                            <span className="text-xs text-gray-500">({tool.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                      {tool.features.slice(0, 3).map((feature, idx) => (
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
                          Save {tool.savings}%
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={tool.available ? "default" : "secondary"} className="flex items-center gap-1 mb-1">
                          {tool.available ? (
                            <>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Available
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3" />
                              Coming Soon
                            </>
                          )}
                        </Badge>
                        {tool.available && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Users className="h-3 w-3" />
                            <span>{tool.activeRenters} active</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full group-hover:scale-105 transition-transform" 
                      disabled={!tool.available}
                      variant={tool.available ? "default" : "secondary"}
                    >
                      {tool.available ? (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Rent Now
                        </>
                      ) : (
                        <>
                          <Bell className="h-4 w-4 mr-2" />
                          Join Waitlist
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedTools.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No tools found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default BrowseTools;