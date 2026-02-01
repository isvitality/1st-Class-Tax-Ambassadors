
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
    // For non-floating particles, start some already midway down the screen to simulate "pre-filled" state
    initialY: isFloating 
      ? `${Math.random() * 100}%` 
      : `${Math.random() * -150}%`, // Some start far above, some closer to viewport top
    duration: Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0],
    delay: isFloating ? Math.random() * 5 : 0, // Instant start for falling particles to pre-fill
    fontSize: Math.floor(Math.random() * (fontSizeRange[1] - fontSizeRange[0]) + fontSizeRange[0]),
    drift: Math.random() * 40 - 20,
    // Add a random offset for the 'y' start to simulate a negative delay (pre-filled loop)
    initialOffset: Math.random() * 100, 
  }), [durationRange, fontSizeRange, isFloating]);

  const animateProps = isFloating 
    ? { 
        y: [settings.initialY, `${parseFloat(settings.initialY) - 50}px`, settings.initialY], 
        opacity: [0, 0.7, 0] 
      }
    : { 
        y: ['0vh', '110vh'], 
        x: [0, settings.drift, 0] 
      };

  const transitionProps: Transition = isFloating
    ? { duration: settings.duration, ease: 'easeInOut', delay: settings.delay, repeat: Infinity }
    : { 
        duration: settings.duration, 
        ease: 'linear', 
        delay: settings.delay, 
        repeat: Infinity,
        // Using initial progress for pre-fill is tricky, but randomized start top is effective
      };

  return (
    <motion.div
      className="absolute"
      style={{
        left: settings.x,
        top: isFloating ? 'auto' : `${-10 - (Math.random() * 100)}%`, // Randomize start position above view
        bottom: isFloating ? settings.initialY : 'auto',
        fontSize: `${settings.fontSize}px`,
        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }}
      initial={isFloating ? { opacity: 0 } : { y: `${settings.initialOffset}vh` }} // Pre-fill viewport
      animate={animateProps}
      transition={transitionProps}
    >
      {content}
    </motion.div>
  );
};
