import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ToolsShowcase = () => {
  const tools = [
    { name: 'ChatGPT', logo: '🤖' },
    { name: 'Claude', logo: '🧠' },
    { name: 'Notion AI', logo: '📝' },
    { name: 'Jasper', logo: '✨' },
    { name: 'Grammarly', logo: '✍️' },
    { name: 'Midjourney', logo: '🎨' },
    { name: 'GitHub Copilot', logo: '👨‍💻' },
    { name: 'Copy.ai', logo: '📋' }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">AI Tools on Demand</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Access Premium AI Tools Instantly
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rent access to the world's most powerful AI subscriptions without the monthly commitment
          </p>
          
          {/* Tools Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            {tools.map((tool) => (
              <div key={tool.name} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/40 hover:scale-105">
                  <div className="text-3xl mb-2">{tool.logo}</div>
                  <p className="text-sm font-medium text-white group-hover:text-yellow-300 transition-colors">{tool.name}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center text-white">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm">Available 24/7</span>
            </div>
            <div className="flex items-center text-white">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-sm">Instant Access</span>
            </div>
            <div className="flex items-center text-white">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-sm">Save up to 90%</span>
            </div>
          </div>
          
          <Link to="/waitlist">
            <Button className="neon-green font-semibold px-8 py-4 text-lg group hover:scale-105 transition-transform">
              Join Waitlist for Early Access
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <p className="text-blue-200 text-sm mt-4">
            Be first to access these tools at unbeatable prices
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcase;