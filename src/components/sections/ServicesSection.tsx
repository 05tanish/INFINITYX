import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { services } from '../../lib/constants';

// Reusing SplineIframe to embed the 3D assets inside the bento grid
const SplineIframe = lazy(() => import('../3d/SplineIframe'));

// Spline IDs requested by the user
const splineAssets = {
  build: "0e8a6d7e-b090-4d6d-95f4-fdc3b432580c", 
  secure: "4e5d1e84-9f3e-4174-b5eb-4b381dba573c"
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 bg-brand-black relative overflow-hidden">
      
      {/* Background glowing orb */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-brand-blue-glow rounded-full blur-[120px] opacity-30 pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-[rgba(138,43,226,0.15)] rounded-full blur-[150px] opacity-40 pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-gradient-to-r from-brand-blue to-brand-purple"></div>
            <span className="text-brand-gray-300 font-bold uppercase tracking-widest text-sm">Capabilities</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Elevate Your <br />
            <span className="text-gradient">Digital Presence.</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Growth (Full Width on mobile, spans 8 cols on desktop) */}
          <motion.div 
            className="md:col-span-8 glass-card overflow-hidden p-8 md:p-12 relative group min-h-[400px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative z-10 w-full md:w-2/3">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">Growth</h3>
              <p className="text-xl text-brand-gray-300 mb-8 leading-relaxed">Scale your brand with data-driven content that converts and builds loyal communities.</p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.find(s => s.id === 'growth')?.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-brand-gray-200">
                    <svg className="w-5 h-5 text-brand-purple mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Abstract visual for Growth (Using CSS gradients as opposed to 3D since it's a wide text card) */}
            <div className="absolute -right-[10%] top-[10%] w-[60%] h-[120%] bg-gradient-to-bl from-[rgba(62,99,221,0.2)] to-transparent rounded-full blur-3xl group-hover:opacity-100 transition-opacity opacity-50 pointer-events-none"></div>
          </motion.div>

          {/* Card 2: Secure (Spans 4 cols on desktop) */}
          <motion.div 
            className="md:col-span-4 glass-card overflow-hidden p-8 relative group min-h-[400px] flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                <svg className="w-7 h-7 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Secure</h3>
              <p className="text-brand-gray-300 mb-6 leading-relaxed">Military-grade protection for your digital assets and user data.</p>
            </div>
            
            <div className="flex-grow relative mt-4 h-48 w-full rounded-xl overflow-hidden glass-premium group-hover:scale-[1.02] transition-transform">
               {/* Spline 3D Integration for Secure */}
               <Suspense fallback={<div className="absolute inset-0 bg-white/5 animate-pulse rounded-xl"></div>}>
                 <SplineIframe sceneId={splineAssets.secure} fallbackToR3F={false} />
               </Suspense>
            </div>
          </motion.div>

          {/* Card 3: Build (Full width row, highly visual) */}
          <motion.div 
            className="md:col-span-12 glass-card overflow-hidden p-0 relative group min-h-[500px] flex flex-col md:flex-row items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
             {/* Text Content */}
             <div className="w-full md:w-1/2 p-8 md:p-16 relative z-10">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10">
                 <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
               </div>
               <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Build</h3>
               <p className="text-xl text-brand-gray-300 mb-8 leading-relaxed max-w-lg">
                 From immersive websites to complex web applications. 
                 We engineer cutting-edge custom solutions built for absolute scale.
               </p>
               
               <ul className="space-y-4">
                 {services.find(s => s.id === 'build')?.features.map((feature, idx) => (
                   <li key={idx} className="flex items-center text-brand-gray-200">
                     <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-4 border border-white/10">
                        <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                     </span>
                     {feature}
                   </li>
                 ))}
               </ul>
             </div>

             {/* 3D Visual Section */}
             <div className="w-full md:w-1/2 h-[400px] md:h-full relative overflow-hidden bg-black/20">
               <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,11,0.8)] to-transparent z-10 w-24"></div>
               <Suspense fallback={<div className="absolute inset-0 bg-white/5 animate-pulse"></div>}>
                 <SplineIframe sceneId={splineAssets.build} fallbackToR3F={false} />
               </Suspense>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
