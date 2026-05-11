import { motion } from 'framer-motion';
import { services } from '../../lib/constants';

const GrowthIllustration = () => (
  <svg viewBox="0 0 200 140" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="growthGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3E63DD" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.6"/>
      </linearGradient>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3E63DD"/>
        <stop offset="100%" stopColor="#8A2BE2"/>
      </linearGradient>
    </defs>
    {[20, 40, 60, 80, 100, 120].map(y => (
      <line key={y} x1="20" y1={y} x2="190" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
    ))}
    <rect x="35" y="100" width="20" height="30" rx="4" fill="url(#growthGrad)" opacity="0.6"/>
    <rect x="65" y="80" width="20" height="50" rx="4" fill="url(#growthGrad)" opacity="0.7"/>
    <rect x="95" y="55" width="20" height="75" rx="4" fill="url(#growthGrad)" opacity="0.8"/>
    <rect x="125" y="30" width="20" height="100" rx="4" fill="url(#growthGrad)" opacity="0.9"/>
    <rect x="155" y="10" width="20" height="120" rx="4" fill="url(#growthGrad)"/>
    <polyline points="45,105 75,85 105,60 135,35 165,15" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    {([[45,105],[75,85],[105,60],[135,35],[165,15]] as [number,number][]).map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="4" fill="#3E63DD" stroke="white" strokeWidth="1.5"/>
    ))}
  </svg>
);

const BuildIllustration = () => (
  <svg viewBox="0 0 200 140" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="170" height="110" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
    <rect x="15" y="15" width="170" height="22" rx="8" fill="rgba(255,255,255,0.06)"/>
    <rect x="15" y="29" width="170" height="8" fill="rgba(255,255,255,0.06)"/>
    <circle cx="30" cy="26" r="4" fill="#FF5F57" opacity="0.7"/>
    <circle cx="44" cy="26" r="4" fill="#FEBC2E" opacity="0.7"/>
    <circle cx="58" cy="26" r="4" fill="#28C840" opacity="0.7"/>
    {[45, 57, 69, 81, 93, 105].map((y, i) => (
      <rect key={y} x="30" y={y} width={[80, 100, 60, 90, 70, 50][i]} height="6" rx="3"
        fill={i % 3 === 0 ? '#E5C07B' : i % 3 === 1 ? 'rgba(62,99,221,0.6)' : 'rgba(255,255,255,0.15)'} opacity="0.7"/>
    ))}
    <rect x="140" y="40" width="35" height="80" rx="4" fill="rgba(62,99,221,0.15)" stroke="rgba(62,99,221,0.3)" strokeWidth="1"/>
    <rect x="144" y="47" width="27" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
    <rect x="144" y="55" width="27" height="20" rx="2" fill="rgba(62,99,221,0.3)"/>
    <rect x="144" y="79" width="18" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
    <rect x="144" y="87" width="22" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
  </svg>
);

const SecureIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="secureGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A2BE2"/>
        <stop offset="100%" stopColor="#3E63DD"/>
      </linearGradient>
    </defs>
    <ellipse cx="100" cy="80" rx="70" ry="60" fill="url(#secureGlow)"/>
    <path d="M100 25 L140 40 L140 75 Q140 110 100 130 Q60 110 60 75 L60 40 Z"
      fill="rgba(138,43,226,0.15)" stroke="url(#shieldGrad)" strokeWidth="2"/>
    <polyline points="82,78 94,90 118,65" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <ellipse cx="100" cy="80" rx="55" ry="55" stroke="rgba(138,43,226,0.2)" strokeWidth="1" strokeDasharray="4 4"/>
    <circle cx="100" cy="25" r="4" fill="#8A2BE2" opacity="0.8"/>
    <circle cx="155" cy="80" r="4" fill="#3E63DD" opacity="0.8"/>
    <circle cx="100" cy="135" r="4" fill="#8A2BE2" opacity="0.6"/>
    <circle cx="45" cy="80" r="4" fill="#3E63DD" opacity="0.6"/>
  </svg>
);

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-brand-blue-glow rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-[rgba(138,43,226,0.12)] rounded-full blur-[150px] opacity-30 pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-gradient-to-r from-brand-blue to-brand-purple" />
            <span className="text-brand-gray-300 font-bold uppercase tracking-widest text-sm">Capabilities</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
            Elevate Your <br /><span className="text-gradient">Digital Presence.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">Three pillars. One agency. Infinite results.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Growth Card - 8 cols */}
          <motion.div className="md:col-span-8 glass-card overflow-hidden p-8 md:p-12 relative group min-h-[400px]"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 h-full">
              <div className="w-full md:w-3/5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(62,99,221,0.15)', border: '1px solid rgba(62,99,221,0.3)' }}>
                  <svg className="w-7 h-7 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-white mb-4">Growth</h3>
                <p className="text-lg text-brand-gray-300 mb-8 leading-relaxed">Scale your brand with data-driven content that converts. From viral reels to strategic campaigns.</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.find(s => s.id === 'growth')?.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-brand-gray-200">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(62,99,221,0.2)' }}>
                        <svg className="w-3 h-3 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-2/5 h-40 md:h-auto opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                <GrowthIllustration />
              </div>
            </div>
            <div className="absolute -right-[10%] top-[10%] w-[60%] h-[120%] bg-gradient-to-bl from-[rgba(62,99,221,0.1)] to-transparent rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* Secure Card - 4 cols */}
          <motion.div className="md:col-span-4 glass-card overflow-hidden p-8 relative group min-h-[400px] flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(138,43,226,0.15)', border: '1px solid rgba(138,43,226,0.3)' }}>
                <svg className="w-7 h-7 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Secure</h3>
              <p className="text-brand-gray-300 mb-6 leading-relaxed">Military-grade protection for your digital assets and user data.</p>
              <ul className="space-y-2">
                {services.find(s => s.id === 'secure')?.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-brand-gray-200">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(138,43,226,0.2)' }}>
                      <svg className="w-2.5 h-2.5 text-brand-purple" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-grow mt-6 h-40 opacity-60 group-hover:opacity-90 transition-opacity duration-500">
              <SecureIllustration />
            </div>
          </motion.div>

          {/* Build Card - full width */}
          <motion.div className="md:col-span-12 glass-card overflow-hidden p-0 relative group min-h-[400px] flex flex-col md:flex-row items-stretch"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="w-full md:w-1/2 p-8 md:p-14 relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(229,192,123,0.15)', border: '1px solid rgba(229,192,123,0.3)' }}>
                <svg className="w-7 h-7 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Build</h3>
              <p className="text-xl text-brand-gray-300 mb-8 leading-relaxed max-w-lg">From immersive websites to complex web applications. We engineer cutting-edge solutions built for absolute scale.</p>
              <ul className="space-y-4">
                {services.find(s => s.id === 'build')?.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-brand-gray-200">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                      style={{ background: 'rgba(229,192,123,0.1)', border: '1px solid rgba(229,192,123,0.2)' }}>
                      <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 h-[280px] md:h-auto relative overflow-hidden flex items-center justify-center" style={{ background: 'rgba(229,192,123,0.03)' }}>
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[rgba(10,10,11,0.7)] to-transparent z-10" />
              <div className="w-4/5 h-4/5">
                <BuildIllustration />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
