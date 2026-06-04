import { motion } from 'framer-motion';
import { CONTACT_EMAIL } from '../../lib/constants';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-ns-black relative">
      <div className="section-divider" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Side: Info */}
          <div className="lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-[10px] text-ns-slate uppercase tracking-[0.2em] font-semibold mb-6">Start a Project</div>
              <h2 className="display-heading text-4xl sm:text-5xl md:text-[3.5rem] mb-6 leading-tight">
                Let's discuss <br/>your next move.
              </h2>
              <p className="text-ns-slate leading-relaxed mb-12">
                Fill out the form with your project details, and our engineering team will get back to you within 24 hours to schedule a discovery call.
              </p>

              {/* Contact Info blocks */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="icon-box-teal">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-widest">Email Us</h4>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-ns-slate hover:text-ns-gold transition-colors text-sm">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="icon-box-teal">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-widest">Call Us</h4>
                    <p className="text-ns-slate text-sm">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="icon-box-teal">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-widest">Working Hours</h4>
                    <p className="text-ns-slate text-sm">
                      Mon - Fri, 9:00 AM - 6:00 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-7/12">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
