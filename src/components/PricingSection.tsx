
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Basic',
      subtitle: 'Pay per use',
      price: 'From $2',
      period: '/day',
      features: [
        'Access to basic AI tools',
        'Daily rental options',
        'Standard support',
        'Secure access'
      ],
      cta: 'Start Renting',
      popular: false
    },
    {
      name: 'Pro Access',
      subtitle: 'API access bundles',
      price: '$29',
      period: '/month',
      features: [
        'All basic features',
        'API access bundles',
        'Priority support',
        'Advanced analytics',
        'Custom integrations'
      ],
      cta: 'Get Pro Access',
      popular: true
    },
    {
      name: 'Lister Dashboard',
      subtitle: 'For those listing subscriptions',
      price: 'Free',
      period: '',
      features: [
        'List your subscriptions',
        'Earnings dashboard',
        'Automated payouts',
        'Usage analytics',
        'Community support'
      ],
      cta: 'Start Earning',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Choose Your Plan</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Flexible pricing for every need. Start small, scale as you grow.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl p-8 ${plan.popular ? 'bg-purple-800 text-white ring-4 ring-purple-800' : 'bg-white'} shadow-xl`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-400 text-black px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className={`text-2xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 ${plan.popular ? 'text-purple-200' : 'text-gray-600'}`}>
                  {plan.subtitle}
                </p>
                <div className="mt-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${plan.popular ? 'text-purple-200' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className={`w-5 h-5 ${plan.popular ? 'text-green-400' : 'text-green-600'} mr-3`} />
                    <span className={plan.popular ? 'text-purple-100' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'neon-green' 
                      : 'bg-purple-800 hover:bg-purple-900 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
