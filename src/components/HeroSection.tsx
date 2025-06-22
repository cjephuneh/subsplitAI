import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Bell, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-gradient min-h-screen flex flex-col justify-center pt-16">
      {/* Announcement Banner */}
      <div className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center text-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-white animate-pulse" />
                <span className="text-white font-bold text-sm md:text-base">
                  🚀 EARLY ACCESS NOW OPEN
                </span>
              </div>
              <span className="hidden md:inline text-white text-sm">
                Join 2,847+ people getting exclusive access to AI tools at 50% off
              </span>
              <Link to="/waitlist">
                <Button 
                  size="sm" 
                  className="bg-white text-orange-600 hover:bg-gray-100 font-semibold text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 ml-2"
                >
                  Join Waitlist
                  <ArrowRight className="ml-1 w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm font-medium">AI Tools on Demand</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Why Pay{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">
                  $20
                </span>{' '}
                When You Only Need It{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  Today?
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-300 sm:text-xl max-w-3xl">
                Rent access to AI tools like ChatGPT, Claude & Notion AI — from as low as{' '}
                <span className="text-green-400 font-semibold">$2/day</span>. Stop paying for subscriptions you barely use.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/waitlist">
                  <Button className="neon-green font-semibold px-8 py-3 text-lg group">
                    Join Early Access
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg">
                  List Your Subscription
                </Button>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Secure & Private
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  No Long-term Commitment
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Instant Access
                </div>
              </div>

              {/* Early Access Stats */}
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="flex items-center justify-center lg:justify-start space-x-4 text-white">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium">2,847 early adopters</span>
                  </div>
                  <div className="w-1 h-4 bg-white/30"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Launching Q2 2024</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hero Image/Visual */}
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="glass-card p-8 rounded-2xl">
                <div className="bg-white rounded-xl p-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Available AI Tools</h3>
                      <span className="text-green-600 text-sm font-medium">Live</span>
                    </div>
                    
                    {/* Mock AI Tool Cards */}
                    <div className="space-y-3">
                      {[
                        { name: 'ChatGPT Plus', price: '$2/day', users: '24 online' },
                        { name: 'Claude Pro', price: '$3/day', users: '18 online' },
                        { name: 'Notion AI', price: '$1.50/day', users: '31 online' }
                      ].map((tool) => (
                        <div key={tool.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{tool.name}</p>
                            <p className="text-sm text-gray-500">{tool.users}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-purple-800">{tool.price}</p>
                            <Button size="sm" className="mt-1 bg-purple-800 hover:bg-purple-900">
                              Rent Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;