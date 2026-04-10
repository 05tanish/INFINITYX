import Layout from './components/layout/Layout';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import PricingSection from './components/sections/PricingSection';
import PortfolioSection from './components/sections/PortfolioSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import WhyChooseSection from './components/sections/WhyChooseSection';
import FinalCTASection from './components/sections/FinalCTASection';
import ContactSection from './components/sections/ContactSection';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  return (
    <Layout>
      <Navigation sections={sections} logo="Infinityx" />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <PortfolioSection />
      <TestimonialsSection />
      <WhyChooseSection />
      <FinalCTASection />
      <ContactSection />
      <Footer logo="Infinityx" />
    </Layout>
  );
}

export default App;
