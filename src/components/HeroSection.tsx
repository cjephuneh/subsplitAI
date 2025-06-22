import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Bell, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-gradient min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 md:w-72 md:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 md:w-64 md:h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Simple Announcement Banner */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-2 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-xs sm:text-sm md:text-base">
                Early Access Now Open - Join 2,847+ people on the waitlist
              </span>
            </div>
            <Link to="/waitlist">
              <Button 
                size="sm" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-medium text-xs px-3 py-1"
              >
                Join Waitlist
                <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="text-center lg:col-span-6 lg:text-left mb-12 lg:mb-0">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-xs sm:text-sm font-medium">AI Tools on Demand</span>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Why Pay{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">
                  $20
                </span>{' '}
                When You Only Need It{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  Today?
                </span>
              </h1>
              
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto lg:mx-0">
                Rent access to AI tools like ChatGPT, Claude & Notion AI — from as low as{' '}
                <span className="text-green-400 font-semibold">$2/day</span>. Stop paying for subscriptions you barely use.
              </p>
              
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to="/waitlist" className="w-full sm:w-auto">
                  <Button className="neon-green font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg group w-full sm:w-auto">
                    Join Early Access
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto">
                  List Your Subscription
                </Button>
              </div>
              
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
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
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 text-white text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-400" />
                    <span className="font-medium">2,847 early adopters</span>
                  </div>
                  <div className="hidden sm:block w-1 h-4 bg-white/30"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span>Launching Q2 2024</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Super Simple Visual - Hidden on mobile, shown on lg+ */}
            <div className="hidden lg:block lg:col-span-6 relative">
              {/* Clean, minimal design */}
              <div className="relative max-w-md mx-auto">
                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="text-center space-y-6">
                    {/* Simple Icon Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/20 rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-2">🤖</div>
                        <p className="text-white text-sm font-medium">ChatGPT</p>
                      </div>
                      <div className="bg-white/20 rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-2">🧠</div>
                        <p className="text-white text-sm font-medium">Claude</p>
                      </div>
                      <div className="bg-white/20 rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-2">📝</div>
                        <p className="text-white text-sm font-medium">Notion AI</p>
                      </div>
                      <div className="bg-white/20 rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-2">🎨</div>
                        <p className="text-white text-sm font-medium">Midjourney</p>
                      </div>
                    </div>
                    
                    {/* Simple Stats */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-white">
                        <span className="text-sm">Available Tools</span>
                        <span className="font-semibold">50+</span>
                      </div>
                      <div className="flex items-center justify-between text-white">
                        <span className="text-sm">Average Savings</span>
                        <span className="font-semibold text-green-400">85%</span>
                      </div>
                      <div className="flex items-center justify-between text-white">
                        <span className="text-sm">Active Users</span>
                        <span className="font-semibold">2,847</span>
                      </div>
                    </div>

                    {/* Simple CTA */}
                    <Link to="/waitlist">
                      <Button className="neon-green w-full font-semibold">
                        Get Early Access
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Floating Elements - Very Minimal */}
                <div className="absolute -top-4 -right-4 bg-green-400 text-black px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                  Live
                </div>
                <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  $2/day
                </div>
              </div>
            </div>

            {/* Mobile-only simplified visual */}
            <div className="lg:hidden mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-center space-y-4">
                  <div className="flex justify-center space-x-4 text-3xl">
                    <span>🤖</span>
                    <span>🧠</span>
                    <span>📝</span>
                    <span>🎨</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg">Premium AI Tools Available</h3>
                  <div className="flex justify-center items-center space-x-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Live</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>2,847 users</span>
                    </div>
                  </div>
                  <Link to="/waitlist">
                    <Button className="neon-green w-full">
                      Get Early Access
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
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