import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const WaitlistSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">Early Access</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Be First to Access Premium AI Tools
          </h2>
          
          <p className="text-xl text-purple-100 mb-6 max-w-2xl mx-auto">
            Join thousands of early adopters getting exclusive access to AI subscriptions at unbeatable prices
          </p>
          
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center text-white">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-sm">2,847 people waiting</span>
            </div>
            <div className="flex items-center text-white">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm">Launching Soon</span>
            </div>
          </div>
          
          <Link to="/waitlist">
            <Button className="neon-green font-semibold px-8 py-4 text-lg group hover:scale-105 transition-transform">
              Join the Waitlist
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <p className="text-purple-200 text-sm mt-4">
            Get notified when we launch + exclusive early bird pricing
          </p>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;