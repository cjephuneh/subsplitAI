import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WaitlistSection from '@/components/WaitlistSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ToolsShowcase from '@/components/ToolsShowcase';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WaitlistSection />
      <ToolsShowcase />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;