import React from 'react';
import { motion } from 'framer-motion';

const SectionAccent: React.FC<{ color?: string; className?: string; }> = ({ color = '#FDC100', className = '' }) => {
  return <div style={{ backgroundColor: color, height: '3px', width: '70px' }} className={className} />;
};

const InspirationalQuote: React.FC = () => {
  const quote = "Financial clarity isn't just about numbers; it's about empowering your dreams and building a legacy. Let's craft your success story together.";
  const author = "Cyrel Carter";

  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-amber-100 relative overflow-hidden">
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <blockquote className="font-serif italic text-2xl md:text-3xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
          "{quote}"
          <cite className="block not-italic mt-4 text-xl text-gray-700">— {author}</cite>
        </blockquote>
        <SectionAccent color="#F59E0B" className="mt-6 mx-auto" />
      </motion.div>
    </section>
  );
};

export default InspirationalQuote;