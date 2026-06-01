export interface FooterProps {
  logo?: string;
}

const Footer = ({ logo = 'Infinityx' }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigationLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Work' },
    { id: 'process', label: 'Process' },
    { id: 'pricing', label: 'Pricing' },
  ];

  const services = [
    'Web Application Development',
    'SaaS Platforms',
    'Mobile Apps (iOS/Android)',
    'Cybersecurity Audits',
    'Automation & AI',
  ];

  const socialLinks = [
    { name: 'Twitter', url: '#', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
    { name: 'LinkedIn', url: '#', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
    { name: 'GitHub', url: '#', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
  ];

  return (
    <footer className="bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-brand-blue rounded-md flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-[10px]">IX</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {logo}
              </h3>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              A premium IT agency engineering scalable software solutions for forward-thinking businesses.
            </p>
            
            {/* Socials */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-9 h-9 rounded bg-brand-card border border-brand-border flex items-center justify-center text-text-secondary hover:text-white hover:border-brand-muted transition-all"
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-5 text-sm">Company</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-text-secondary hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-5 text-sm">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-text-secondary text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-5 text-sm">Contact Us</h4>
            <div className="space-y-4">
              <a href="mailto:hello@infinityx.com" className="flex items-center text-text-secondary hover:text-white transition-colors text-sm">
                <svg className="w-4 h-4 mr-3 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@infinityx.com
              </a>
              <div className="flex items-center text-text-secondary text-sm">
                <svg className="w-4 h-4 mr-3 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Mon - Fri, 9am - 6pm
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-brand-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-muted text-sm">
              © {currentYear} Infinityx. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-text-muted hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-text-muted hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
