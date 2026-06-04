import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import StarLogo from '../ui/StarLogo';

export interface NavSection {
  id: string;
  label: string;
}

export interface NavigationProps {
  sections: NavSection[];
  logo?: string;
}

const Navigation = ({ sections, logo = 'Northern Star' }: NavigationProps) => {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'nav-scrolled py-3' : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <StarLogo size={28} className="transition-transform duration-500 group-hover:rotate-180" />
              <span className="font-semibold text-xl tracking-wide text-white font-serif uppercase tracking-widest">{logo}</span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-2">
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
                      className="absolute bottom-1 left-4 right-4 h-px bg-ns-gold"
                      layoutId="navUnderline"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                id="nav-start-project-btn"
                onClick={() => scrollToSection('contact')}
                className="btn-outline-gold text-xs px-6 py-2.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Talk →
              </motion.button>
            </div>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-btn"
              className="md:hidden p-2 rounded-lg text-ns-slate hover:text-ns-gold hover:bg-ns-muted transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              ref={mobileMenuRef}
              className="fixed top-0 right-0 bottom-0 w-72 bg-ns-navy border-l border-ns-graphite z-50 md:hidden shadow-dialog"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-ns-graphite">
                <a href="/" className="flex items-center gap-2">
                  <StarLogo size={20} />
                  <span className="font-bold text-white font-serif uppercase tracking-wider text-sm">{logo}</span>
                </a>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-ns-slate hover:text-ns-gold hover:bg-ns-muted transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col p-4 gap-2 mt-4">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left text-sm font-medium py-3 px-4 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'text-ns-gold bg-ns-gold/10 border border-ns-gold/20'
                        : 'text-ns-slate hover:text-white hover:bg-ns-muted'
                    }`}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                  >
                    {section.label}
                  </button>
                ))}
                <div className="pt-6 mt-4 border-t border-ns-graphite">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="btn-primary w-full justify-center"
                  >
                    Let's Talk →
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
