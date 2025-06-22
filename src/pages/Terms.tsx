
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: January 15, 2024</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using SubSplit ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  SubSplit is a platform that allows users to rent access to AI subscriptions and tools on a temporary basis. Users can also list their unused subscription credits for others to rent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                <p className="text-gray-700 mb-4">
                  To use certain features of the Service, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
                <p className="text-gray-700 mb-4">You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the rights of others</li>
                  <li>Transmit harmful or malicious content</li>
                  <li>Attempt to gain unauthorized access to the Service</li>
                  <li>Share or distribute subscription credentials inappropriately</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payments and Refunds</h2>
                <p className="text-gray-700 mb-4">
                  All payments are processed securely through our payment providers. Refunds are available under certain circumstances as outlined in our refund policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  SubSplit shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Termination</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to terminate or suspend your account at any time for violation of these terms or for any other reason we deem appropriate.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us at legal@subsplit.com.
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

export default Terms;
