
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, HelpCircle, BookOpen, MessageSquare, Shield, CreditCard } from 'lucide-react';
import { useState } from 'react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: HelpCircle,
      title: 'Getting Started',
      description: 'Learn the basics of SubSplit',
      articles: ['How to rent your first AI tool', 'Setting up your account', 'Understanding pricing']
    },
    {
      icon: CreditCard,
      title: 'Billing & Payments',
      description: 'Payment methods and billing questions',
      articles: ['Payment methods accepted', 'Understanding charges', 'Refund policy']
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Account security and data protection',
      articles: ['How we protect your data', 'Two-factor authentication', 'Account security tips']
    },
    {
      icon: BookOpen,
      title: 'API Documentation',
      description: 'Technical documentation for developers',
      articles: ['API authentication', 'Rate limits', 'Error codes']
    }
  ];

  const popularArticles = [
    'How does SubSplit work?',
    'Is it safe to share my AI subscription?',
    'How do I earn money from my unused subscriptions?',
    'What happens if someone misuses my account?',
    'How are payments processed?',
    'Can I cancel a rental early?'
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => article.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to your questions about SubSplit
            </p>
            
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
          </div>

          {/* Popular Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularArticles.map((article, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <p className="text-gray-700">{article}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <category.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                            {article}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="text-center">
              <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <CardTitle>Still need help?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Our support team is here to help.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
