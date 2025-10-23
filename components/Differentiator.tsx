import React from 'react';
import { motion } from 'framer-motion';
import { useSeasonalTheme } from '../hooks/useSeasonalTheme';
import { getThemeAssets } from '../data/themedContent';

const Differentiator: React.FC = () => {
  const { theme } = useSeasonalTheme();
  const { quote } = getThemeAssets(theme);

  return (
    <section className="relative bg-white z-10">
      {/* Angled top shape */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#FDC100] to-[#FFA000]" style={{clipPath: 'polygon(0 0, 100% 100%, 100% 0)'}}></div>
      
      <motion.div 
        className="py-24 bg-gradient-to-r from-[#FDC100] to-[#FFA000] text-black text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute -top-10 -left-10 w-48 h-48 border-4 border-black/10 rounded-full" aria-hidden="true"></div>
        <div className="absolute -bottom-16 -right-10 w-64 h-64 border-8 border-black/10 rounded-lg transform rotate-45" aria-hidden="true"></div>
        
        <div className="container mx-auto px-4 relative">
          <blockquote className="font-serif italic text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed" style={{textShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
            “{quote.text}”
            <cite className="block not-italic mt-6 text-base opacity-80 tracking-wider">— {quote.cite}</cite>
          </blockquote>
        </div>
      </motion.div>

      {/* Angled bottom shape */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-r from-[#FDC100] to-[#FFA000]" style={{clipPath: 'polygon(0 0, 0 100%, 100% 0)'}}></div>
    </section>
  );
};

export default Differentiator;