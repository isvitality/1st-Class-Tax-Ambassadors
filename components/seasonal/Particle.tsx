import React, { useMemo } from 'react';
import { motion, Transition } from 'framer-motion';

interface ParticleProps {
  content: string | React.ReactNode;
  durationRange: [number, number];
  fontSizeRange: [number, number];
  isFloating?: boolean;
}

export const Particle: React.FC<ParticleProps> = ({ content, durationRange, fontSizeRange, isFloating = false }) => {
  const settings = useMemo(() => ({
    x: `${Math.random() * 100}%`,
    initialY: isFloating ? `${Math.random() * 100}%` : `${-Math.random() * 100}%`,
    duration: Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0],
    delay: Math.random() * 5,
    fontSize: Math.floor(Math.random() * (fontSizeRange[1] - fontSizeRange[0]) + fontSizeRange[0]),
    drift: Math.random() * 40 - 20,
  }), [durationRange, fontSizeRange, isFloating]);

  const animateProps = isFloating 
    ? { y: [settings.initialY, `${parseFloat(settings.initialY) - 50}px`, settings.initialY], opacity: [0, 0.7, 0] }
    : { y: '100vh', x: [0, settings.drift, 0] };

  // Fix: Explicitly type `transitionProps` as `Transition` to prevent type widening of the `ease` property.
  const transitionProps: Transition = isFloating
    ? { duration: settings.duration, ease: 'easeInOut', delay: settings.delay }
    : { duration: settings.duration, ease: 'linear', delay: settings.delay };


  return (
    <motion.div
      className="absolute"
      style={{
        left: settings.x,
        top: isFloating ? 'auto' : settings.initialY,
        bottom: isFloating ? settings.initialY : 'auto',
        fontSize: `${settings.fontSize}px`,
        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}
      initial={isFloating ? { opacity: 0 } : { y: 0 }}
      animate={animateProps}
      transition={transitionProps}
    >
      {content}
    </motion.div>
  );
};
