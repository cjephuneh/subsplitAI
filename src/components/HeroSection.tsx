import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Bell, Users, Clock, Star, TrendingUp, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-gradient min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Announcement Banner */}
      <div className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 py-3 px-4 relative z-10">
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
      <div className="flex-1 flex items-center justify-center relative z-10">
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
            
            {/* Enhanced Hero Visual */}
            <div className="mt-12 lg:mt-0 lg:col-span-6 relative">
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
              
              {/* Main Dashboard Card */}
              <div className="glass-card p-6 rounded-2xl relative transform hover:scale-105 transition-transform duration-300">
                {/* Floating Stats */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>90% Savings</span>
                  </div>
                </div>
                
                <div className="absolute -top-6 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse delay-500">
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>Instant Access</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-2xl relative overflow-hidden">
                  {/* Header with Live Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-600" />
                        Available AI Tools
                      </h3>
                      <p className="text-sm text-gray-500">Real-time marketplace</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-600 text-sm font-medium">Live</span>
                    </div>
                  </div>
                  
                  {/* Enhanced AI Tool Cards */}
                  <div className="space-y-4">
                    {[
                      { 
                        name: 'ChatGPT Plus', 
                        price: '$2/day', 
                        users: '24 online',
                        originalPrice: '$20/mo',
                        savings: '90%',
                        rating: 4.9,
                        status: 'available',
                        icon: '🤖'
                      },
                      { 
                        name: 'Claude Pro', 
                        price: '$3/day', 
                        users: '18 online',
                        originalPrice: '$20/mo',
                        savings: '85%',
                        rating: 4.8,
                        status: 'available',
                        icon: '🧠'
                      },
                      { 
                        name: 'Notion AI', 
                        price: '$1.50/day', 
                        users: '31 online',
                        originalPrice: '$10/mo',
                        savings: '85%',
                        rating: 4.7,
                        status: 'limited',
                        icon: '📝'
                      }
                    ].map((tool, index) => (
                      <div key={tool.name} className="group relative">
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-purple-50 hover:to-blue-50 transition-all duration-300 border border-gray-200 hover:border-purple-200 hover:shadow-md">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{tool.icon}</div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-semibold text-gray-900">{tool.name}</p>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span className="text-xs text-gray-600">{tool.rating}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <p className="text-sm text-gray-500">{tool.users}</p>
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                                  Save {tool.savings}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-lg font-bold text-purple-800">{tool.price}</span>
                              <span className="text-xs text-gray-400 line-through">{tool.originalPrice}</span>
                            </div>
                            <Button 
                              size="sm" 
                              className={`transition-all duration-300 ${
                                tool.status === 'available' 
                                  ? 'bg-purple-800 hover:bg-purple-900 hover:scale-105' 
                                  : 'bg-orange-500 hover:bg-orange-600'
                              }`}
                            >
                              {tool.status === 'available' ? 'Rent Now' : 'Join Queue'}
                            </Button>
                          </div>
                        </div>
                        
                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Stats Bar */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">Avg. 2min setup</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">100% secure</span>
                        </div>
                      </div>
                      <div className="text-purple-600 font-medium">
                        +12 more tools →
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Action Buttons */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  <div className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                    <Users className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                    <Star className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                    <TrendingUp className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Side Floating Cards */}
              <div className="absolute top-20 -right-8 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-bold">$</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">Total Saved</p>
                    <p className="text-sm font-bold text-green-600">$1,247</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 -left-8 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-float delay-1000">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">Active Users</p>
                    <p className="text-sm font-bold text-blue-600">2,847</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;