import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export interface NavSection {
  id: string;
  label: string;
}

export interface NavigationProps {
  sections: NavSection[];
  logo?: string;
}

const Navigation = ({ sections, logo = 'Infinityx' }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    const sectionElements = sections
      .map(s => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -66% 0px' }
    );

    sectionElements.forEach(el => observer.observe(el));
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [sections]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const focusable = mobileMenuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable?.[0] as HTMLElement;
      const last = focusable?.[focusable.length - 1] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      first?.focus();
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX, width: '100%' }}
      />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled ? 'nav-scrolled' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[68px]">

            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 group"
              aria-label="Infinityx home"
            >
              <div className="w-7 h-7 bg-brand-blue rounded-md flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">IX</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight group-hover:text-brand-off transition-colors">
                {logo}
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute bottom-0 left-3 right-3 h-px bg-brand-blue"
                      layoutId="navUnderline"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-link text-text-secondary"
              >
                Contact
              </button>
              <motion.button
                id="nav-start-project-btn"
                onClick={() => scrollToSection('contact')}
                className="btn-primary text-sm px-5 py-2.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Start a Project →
              </motion.button>
            </div>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-btn"
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-brand-card transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              ref={mobileMenuRef}
              className="fixed top-0 right-0 bottom-0 w-72 bg-brand-surface border-l border-brand-border z-50 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-brand-border">
                <span className="font-bold text-white">{logo}</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-brand-muted transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col p-4 gap-1">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left text-sm font-medium py-3 px-4 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'text-white bg-brand-muted'
                        : 'text-text-secondary hover:text-white hover:bg-brand-card'
                    }`}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                  >
                    {section.label}
                  </button>
                ))}
                <div className="pt-4 mt-2 border-t border-brand-border">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="btn-primary w-full justify-center"
                  >
                    Start a Project →
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
