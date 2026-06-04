import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Layout from '../components/layout/Layout';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import StatsSection from '../components/sections/StatsSection';
import PricingSection from '../components/sections/PricingSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import WhyChooseSection from '../components/sections/WhyChooseSection';
import ProcessSection from '../components/sections/ProcessSection';
import FinalCTASection from '../components/sections/FinalCTASection';
import ContactSection from '../components/sections/ContactSection';
import CustomCursor from '../components/ui/CustomCursor';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

export default function LandingPage() {
  useEffect(() => {
    // React 19 safe Vanilla Lenis execution
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      
      {/* Global SVG Filter for Liquid Gooey effects */}
      <svg className="hidden h-0 w-0 absolute pointer-events-none">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>

      <Layout>
        <Navigation sections={sections} logo="NorthernStar." />
        <main className="relative z-10 pt-20">
          <HeroSection />
          <StatsSection />
          <ServicesSection />
          <WhyChooseSection />
          <PortfolioSection />
          <PricingSection />
          <TestimonialsSection />
          <ProcessSection />
          <FinalCTASection />
          <ContactSection />
        </main>
        <Footer />
      </Layout>
    </>
  );
}
