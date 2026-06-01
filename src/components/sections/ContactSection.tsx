import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-brand-black relative">
      <div className="section-divider" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label justify-center">Start a Project</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Build Something Great
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Fill out the form below with your project details, and our technical team will get back to you within 24 hours to schedule a discovery call.
          </p>
        </motion.div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;
