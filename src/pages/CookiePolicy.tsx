
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      type: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      examples: ['Session management', 'Security tokens', 'Load balancing']
    },
    {
      type: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      examples: ['Google Analytics', 'Page view tracking', 'User behavior analysis']
    },
    {
      type: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization.',
      examples: ['Language preferences', 'Theme settings', 'Remember login']
    },
    {
      type: 'Marketing Cookies',
      description: 'These cookies are used to deliver relevant advertisements.',
      examples: ['Ad targeting', 'Conversion tracking', 'Social media integration']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: January 15, 2024</p>

            <div className="prose prose-lg max-w-none mb-8">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
                <p className="text-gray-700 mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
                <p className="text-gray-700 mb-4">
                  SubSplit uses cookies to enhance your browsing experience, analyze website traffic, and personalize content. We use both first-party and third-party cookies.
                </p>
              </section>
            </div>

            {/* Cookie Types */}
            <div className="grid gap-6 mb-8">
              {cookieTypes.map((cookie, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{cookie.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{cookie.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        {cookie.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
                <p className="text-gray-700 mb-4">
                  You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
                <p className="text-gray-700 mb-4">
                  Most browsers allow you to view, manage, delete, and block cookies. Here are links to cookie management for popular browsers:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><a href="#" className="text-purple-600 hover:text-purple-800">Google Chrome</a></li>
                  <li><a href="#" className="text-purple-600 hover:text-purple-800">Mozilla Firefox</a></li>
                  <li><a href="#" className="text-purple-600 hover:text-purple-800">Safari</a></li>
                  <li><a href="#" className="text-purple-600 hover:text-purple-800">Microsoft Edge</a></li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
                <p className="text-gray-700 mb-4">
                  We may use third-party services that place cookies on your device. These services include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Google Analytics for website analytics</li>
                  <li>Stripe for payment processing</li>
                  <li>Intercom for customer support</li>
                  <li>Social media platforms for content sharing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our use of cookies, please contact us at privacy@subsplit.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
