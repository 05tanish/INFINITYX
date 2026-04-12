import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLottie } from 'lottie-react';
import abstractAnimation from '../../abstract.json';

// Define our content creation and growth advantages
const advantages = [
  {
    id: 'content-creation',
    title: 'Content That Speaks',
    description: 'We craft viral, deeply resonant content frameworks that connect your brand with real customers. No more screaming into the void.',
  },
  {
    id: 'engineering-scale',
    title: 'Engineering For Scale',
    description: 'Our development stack is built on modern React ecosystems to handle high traffic and conversion natively.',
  },
  {
    id: 'deep-security',
    title: 'Bank-Grade Security',
    description: 'Growth is nothing without protection. We fortify your digital assets with enterprise-level security architecture.',
  },
];

const WhyChooseSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Use the hook to avoid Vite/ESM default export wrapper issues with React 19
  const { View: LottieView } = useLottie({
    animationData: abstractAnimation,
    loop: true,
    autoplay: true,
  });

  return (
    <section 
      ref={containerRef} 
      id="why-choose" 
      className="py-24 w-full bg-brand-black relative overflow-hidden"
    >
      {/* Background SVG Gooey Blobs */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left Side: Title and Lottie */}
        <div className="flex flex-col justify-center h-full">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass-premium text-brand-purple text-sm font-bold tracking-widest uppercase mb-6 w-max"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Digital Ecosystem
          </motion.span>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-extrabold mb-8 text-brand-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How We <br/> <span className="text-gradient">Dominate.</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-lg leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We don't just build websites. We forge digital ecosystems that capture attention, secure your assets, and drive undeniable revenue.
          </motion.p>

          {/* Lottie Vector Graphic playing on loop */}
          <motion.div 
            className="w-48 h-48 opacity-80 mix-blend-screen drop-shadow-[0_0_15px_rgba(138,43,226,0.5)]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
             {LottieView}
          </motion.div>
        </div>

        {/* Right Side: Standard Vertical Scrolling Cards */}
        <div className="flex flex-col space-y-6 justify-center">
          {advantages.map((adv, index) => (
            <motion.div 
              key={adv.id}
              className="w-full glass-card rounded-3xl p-8 border border-white/5 shadow-2xl backdrop-blur-xl hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="text-4xl font-black text-brand-black text-outline mb-4">0{index + 1}</div>
              <h3 className="text-2xl font-bold text-brand-white mb-3">{adv.title}</h3>
              <p className="text-gray-400 leading-relaxed">{adv.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseSection;
