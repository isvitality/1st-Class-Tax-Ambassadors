import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaxSeason } from '../hooks/useTaxSeason';
import { useSeasonalTheme } from '../hooks/useSeasonalTheme';
import { getThemeAssets } from '../data/themedContent';
import SeasonalOverlay from './SeasonalOverlay';
import { usePopupContext } from '../contexts/PopupContext';

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl md:text-4xl font-bold font-mono tracking-tighter">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs uppercase tracking-widest opacity-80">{label}</span>
  </div>
);

const Hero: React.FC = () => {
  const { season, coreContent, seasonalContent, countdown } = useTaxSeason();
  const { theme } = useSeasonalTheme();
  const { heroBackground } = getThemeAssets(theme);
  const { openCalendly } = usePopupContext();

  // To prevent hydration mismatch, we only render the countdown on the client
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);


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
    <section id="hero" className="relative bg-gray-900 text-white w-full overflow-hidden">
      {/* Background Image Layer - using <img> for reliability */}
      <AnimatePresence>
        <motion.img
          key={heroBackground}
          src={heroBackground}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      </AnimatePresence>

      {/* Darkening Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" aria-hidden="true"></div>
      
      {/* Seasonal Effects Layer (This component has z-20 internally) */}
      <SeasonalOverlay />

      {/* Content Layer */}
      <div className="relative container mx-auto px-4 py-8 md:py-10 flex flex-col items-center justify-center text-center z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p 
            className="text-lg md:text-xl text-yellow-300 font-semibold tracking-wide"
            style={{textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'}}
          >
            {seasonalContent.preTitle}
          </p>
          <h1 
            className="mt-1 text-4xl md:text-5xl font-bold font-serif text-white"
            style={{textShadow: '0 3px 10px rgba(0, 0, 0, 0.5)'}}
          >
            {coreContent.title}
          </h1>
          <p 
            className="mt-2 text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            style={{textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'}}
          >
            {coreContent.subtitle}
          </p>
          
          {isClient && (season === 'PEAK_SEASON' || season === 'PRE_SEASON') && (
             <motion.div 
              className="mt-4 flex justify-center gap-4 md:gap-8 p-3 bg-white/10 backdrop-blur-sm rounded-lg max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CountdownUnit value={countdown.days} label="Days" />
              <CountdownUnit value={countdown.hours} label="Hours" />
              <CountdownUnit value={countdown.minutes} label="Mins" />
              <CountdownUnit value={countdown.seconds} label="Secs" />
            </motion.div>
          )}

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#booking" 
              onClick={handleBookClick} 
              className="w-full sm:w-auto inline-block bg-[#FDC100] text-black font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#FFA000] transition-all duration-300 transform hover:-translate-y-1 btn-shine"
            >
              {seasonalContent.cta}
            </a>
            <a 
              href="#services" 
              onClick={handleSmoothScroll} 
              className="w-full sm:w-auto inline-block bg-white/20 backdrop-blur-sm text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Our Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;