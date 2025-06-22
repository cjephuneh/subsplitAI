
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Is this secure?',
      answer: 'Yes, we use enterprise-grade security measures to protect all accounts and data. We handle access through secure API tokens and never store sensitive credentials.'
    },
    {
      question: 'Can I earn money by sharing my subscription?',
      answer: 'Absolutely! List your unused subscription credits and earn money when others rent access. We handle all payments and provide detailed earnings analytics.'
    },
    {
      question: 'What happens if I misuse someone\'s account?',
      answer: 'We have strict usage policies and monitoring in place. Any misuse results in immediate account suspension and potential legal action. We protect both renters and lenders.'
    },
    {
      question: 'How quickly can I access a tool after renting?',
      answer: 'Access is typically granted within minutes of payment confirmation. You\'ll receive secure login credentials via email.'
    },
    {
      question: 'What if the tool doesn\'t work as expected?',
      answer: 'We offer a money-back guarantee within the first hour of rental. Our support team is available 24/7 to help resolve any issues.'
    }
  ];

  return (
    <section id="faqs" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about SubSplit
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
