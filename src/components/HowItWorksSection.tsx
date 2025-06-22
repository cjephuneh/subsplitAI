
import { Search, CreditCard, Shield } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: 'Browse & Rent',
      description: 'Find AI tools you need, use them only when you need them',
      color: 'text-blue-600'
    },
    {
      icon: CreditCard,
      title: 'List Your Sub',
      description: 'Earn from your unused credits',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Secure & Flexible',
      description: 'We handle access and time limits securely',
      color: 'text-purple-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How SubSplit Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, secure, and efficient. Get access to premium AI tools without the premium price tag.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="glass-card p-8 rounded-2xl text-center h-full">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg ${step.color} mb-6`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
