
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: 'How It Works', href: '/#how-it-works' },
      { name: 'Browse Tools', href: '/browse-tools' },
      { name: 'List Subscription', href: '/list-subscription' },
      { name: 'Pricing', href: '/#pricing' }
    ],
    Company: [
      { name: 'About Us', href: '/#about' },
      { name: 'Blog', href: '/blog' },
      { name: 'API Docs', href: '/api-docs' },
      { name: 'Status', href: '/status' }
    ],
    Support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Status Page', href: '/status' },
      { name: 'API Docs', href: '/api-docs' }
    ],
    Legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
      { name: 'GDPR', href: '/gdpr' }
    ]
  };

  const socialIcons = ['📘', '🐦', '📸', '💼'];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand and Newsletter */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">SubSplit</div>
            <p className="text-gray-400 mb-6">
              Rent AI subscriptions on demand. Save money, access premium tools, earn from unused credits.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Stay updated</h4>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button className="neon-green">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 SubSplit. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialIcons.map((icon, index) => (
              <a
                key={index}
                href="#"
                className="text-2xl hover:scale-110 transition-transform"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
