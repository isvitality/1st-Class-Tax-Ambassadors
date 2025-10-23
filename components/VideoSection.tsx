import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon } from './icons';
import { useSeasonalTheme } from '../hooks/useSeasonalTheme';
import { getThemeAssets } from '../data/themedContent';

const VideoSection: React.FC = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { theme } = useSeasonalTheme();
  const { video } = getThemeAssets(theme);

  const handlePlayClick = () => {
    setShowComingSoon(true);
  };

  const handleCloseOverlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents re-triggering the play click on the parent div
    setShowComingSoon(false);
  };

  return (
    <motion.section 
      id="video" 
      className="py-20 bg-white relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-serif">{video.title}</h2>
        <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
          {video.description}
        </p>
        <motion.div 
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <div 
            className="relative aspect-video rounded-xl shadow-2xl overflow-hidden cursor-pointer group"
            onClick={handlePlayClick}
            role="button"
            aria-label="Play video"
          >
            <img
              src={video.thumbnail}
              alt="A professional team in a meeting, representing the company's vision"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            <AnimatePresence mode="wait">
              {showComingSoon ? (
                <motion.div
                  key="coming-soon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleCloseOverlay}
                  className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-center p-4 cursor-pointer"
                  aria-live="polite"
                >
                  <h3 className="text-3xl font-bold font-serif" style={{textShadow: '0 2px 8px rgba(0,0,0,0.5)'}}>Video Coming Soon</h3>
                  <p className="mt-2 text-sm opacity-80">(Click to close)</p>
                </motion.div>
              ) : (
                <motion.div
                  key="play-button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center transition-colors duration-300 group-hover:bg-black/40 pointer-events-none"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 md:p-6 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 transform" style={{filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))'}}>
                    <PlayIcon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VideoSection;