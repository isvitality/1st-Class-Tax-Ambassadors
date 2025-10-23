import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MailIcon, PhoneIcon } from './icons';
import { useContent } from '../contexts/ContentContext';
import { usePopupContext } from '../contexts/PopupContext';
import SeasonalAccentImage from './SeasonalAccentImage';

const Contact: React.FC = () => {
  const { content } = useContent();
  const { openCalendly } = usePopupContext();

  if (!content) return null;

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      } 
    },
  };

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openCalendly();
  };

  return (
    <motion.section 
      id="contact" 
      className="py-20 bg-gray-800 text-white relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <SeasonalAccentImage />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold font-serif">
          {content.contact.title}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg text-white/80 max-w-2xl mx-auto mt-4">
          {content.contact.subtitle}
        </motion.p>
        <motion.div 
          variants={itemVariants}
          className="mt-10"
        >
          <a 
            href="#booking" 
            onClick={handleBookClick}
            className="inline-block bg-[#FDC100] text-black font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#FFA000] transition-all duration-300 transform hover:-translate-y-1 btn-shine"
          >
            Book a Free Consultation
          </a>
        </motion.div>
        <motion.div variants={itemVariants} className="mt-8 text-white/70 space-y-2">
          <p>Or reach us directly:</p>
           <div className="flex justify-center items-center gap-6">
            <a href={`mailto:${content.contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <MailIcon className="w-5 h-5" />
              <span>{content.contact.email}</span>
            </a>
            <span className="opacity-50">|</span>
            <a href={`tel:${content.contact.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <PhoneIcon className="w-5 h-5" />
              <span>{content.contact.phone}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
