import React from 'react';
import { motion } from 'framer-motion';
import { usePopupContext } from '../contexts/PopupContext';

const Support: React.FC = () => {
  const { openCalendly } = usePopupContext();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openCalendly();
  };

  return (
    <section id="support" className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">Your Path to Tax Season Success</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">We offer clear pathways to get your taxes done right. Choose the option that's best for you.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: DIY Resources */}
          <motion.div 
            className="bg-white p-8 rounded-lg border border-gray-200 text-center flex flex-col items-center transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h3 className="text-2xl font-bold font-serif mb-4 text-gray-900">Get Prepared</h3>
            <p className="text-gray-600 mb-8 flex-grow">Get organized with our comprehensive tax prep checklist. It's the perfect starting point for everyone.</p>
            <a 
              href="#magnet" 
              onClick={handleSmoothScroll} 
              className="inline-block w-full sm:w-auto bg-gray-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors btn-shine"
            >
              Get the Checklist
            </a>
          </motion.div>
          {/* Card 2: Professional Help */}
          <motion.div 
            className="bg-white p-8 rounded-lg border border-gray-200 text-center flex flex-col items-center transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold font-serif mb-4 text-gray-900">Get Expert Help</h3>
            <p className="text-gray-600 mb-8 flex-grow">Ready for personalized advice? Schedule a no-obligation call with our expert team for complex situations.</p>
            <a 
              href="#booking" 
              onClick={handleBookClick} 
              className="inline-block w-full sm:w-auto bg-[#FDC100] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#FFA000] transition-colors btn-shine"
            >
              Book an Appointment
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Support;