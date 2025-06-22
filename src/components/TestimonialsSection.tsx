
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Freelance Writer',
      image: '👩‍💼',
      rating: 5,
      text: 'I saved $60 this month by renting instead of subscribing! Perfect for occasional AI usage.'
    },
    {
      name: 'David Chen',
      role: 'Startup Founder',
      image: '👨‍💻',
      rating: 5,
      text: 'SubSplit helped our team access premium AI tools without breaking the budget. Game changer!'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Content Creator',
      image: '👩‍🎨',
      rating: 5,
      text: 'I earn extra income by listing my unused Notion AI subscription. Win-win for everyone!'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What Our Users Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who are saving money and earning from their subscriptions.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              
              <div className="flex items-center">
                <div className="text-3xl mr-3">{testimonial.image}</div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
