import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, User, ArrowRight, Search, TrendingUp, Clock, BookOpen } from 'lucide-react';

const Blog = () => {
  const featuredPost = {
    title: "The Future of AI Subscription Sharing: How SubSplit is Revolutionizing Access",
    excerpt: "Discover how platforms like SubSplit are changing the way we access premium AI tools, making cutting-edge technology affordable for everyone.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    category: "Industry Insights",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "8 min read",
    featured: true
  };

  const posts = [
    {
      title: "Save 70% on AI Tools: A Complete Guide to Smart Subscription Management",
      excerpt: "Learn proven strategies to access premium AI subscriptions without breaking the bank. From rental platforms to sharing economies.",
      author: "Mike Chen",
      date: "March 12, 2024",
      category: "Tips & Guides",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "6 min read"
    },
    {
      title: "Security Best Practices for AI Tool Sharing",
      excerpt: "Understanding how platforms like SubSplit keep your accounts safe and secure while sharing subscription access.",
      author: "Emily Rodriguez",
      date: "March 10, 2024",
      category: "Security",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "5 min read"
    },
    {
      title: "ChatGPT vs Claude vs Notion AI: Which Tool Should You Rent First?",
      excerpt: "A comprehensive comparison of the top AI assistants available for rent, helping you choose the right tool for your needs.",
      author: "David Park",
      date: "March 8, 2024",
      category: "Tool Reviews",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "10 min read"
    },
    {
      title: "Building a Sustainable AI Tool Budget: Rent vs Buy Analysis",
      excerpt: "When does it make sense to rent AI tools versus purchasing full subscriptions? We break down the economics.",
      author: "Lisa Wang",
      date: "March 5, 2024",
      category: "Economics",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "7 min read"
    },
    {
      title: "The Rise of the AI Sharing Economy: Trends and Predictions",
      excerpt: "Exploring how the sharing economy model is transforming access to AI tools and what it means for the future.",
      author: "Alex Thompson",
      date: "March 3, 2024",
      category: "Industry Insights",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "9 min read"
    },
    {
      title: "Maximizing Your AI Tool ROI: Advanced Usage Strategies",
      excerpt: "Pro tips and strategies to get the most value from your AI tool rentals, from prompt engineering to workflow optimization.",
      author: "Jordan Kim",
      date: "February 28, 2024",
      category: "Productivity",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "8 min read"
    }
  ];

  const categories = ['All', 'Industry Insights', 'Tips & Guides', 'Security', 'Tool Reviews', 'Economics', 'Productivity'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-12 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">SubSplit Blog</h1>
          <p className="text-xl text-slate-200 mb-8">
            Insights, tips, and updates about the future of AI tool access
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
            />
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
            </div>
            
            <Card className="border-2 border-purple-200 shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-purple-100 text-purple-800">{featuredPost.category}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readTime}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-purple-800 transition-colors cursor-pointer">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === 'All' ? 'default' : 'outline'}
                  size="sm"
                  className={category === 'All' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card key={index} className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-purple-800 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              Load More Articles
            </Button>
          </div>

          {/* Newsletter Signup */}
          <Card className="mt-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-purple-100 mb-6 text-lg">
                Get the latest insights on AI tools, industry trends, and money-saving tips delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder-purple-200"
                />
                <Button className="neon-green font-semibold">
                  Subscribe
                </Button>
              </div>
              <p className="text-purple-200 text-sm mt-4">
                Join 5,000+ readers. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;