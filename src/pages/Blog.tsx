
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      title: "The Future of AI Subscription Sharing",
      excerpt: "How platforms like SubSplit are revolutionizing access to premium AI tools",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Industry",
      image: "/placeholder.svg",
      readTime: "5 min read"
    },
    {
      title: "Save 70% on AI Tools: A Complete Guide",
      excerpt: "Learn how to access premium AI subscriptions without breaking the bank",
      author: "Mike Chen",
      date: "March 12, 2024",
      category: "Tips & Tricks",
      image: "/placeholder.svg",
      readTime: "8 min read"
    },
    {
      title: "Security Best Practices for Subscription Sharing",
      excerpt: "Understanding how SubSplit keeps your accounts safe and secure",
      author: "Emily Rodriguez",
      date: "March 10, 2024",
      category: "Security",
      image: "/placeholder.svg",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SubSplit Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and updates about the future of AI tool access
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <CardTitle className="hover:text-purple-800 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
