import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const colors = ['#fde047', '#f87171', '#60a5fa', '#fafafa'];

const Firework: React.FC = () => {
  const settings = useMemo(() => ({
    x: `${Math.random() * 80 + 10}%`,
    y: `${Math.random() * 60 + 20}%`,
    delay: Math.random() * 5,
    numSparks: Math.floor(Math.random() * 10) + 10,
  }), []);

  return (
    <motion.div
      className="absolute"
      style={{ left: settings.x, top: settings.y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, delay: settings.delay }}
    >
      {Array.from({ length: settings.numSparks }).map((_, i) => {
        const angle = (i / settings.numSparks) * 360;
        const radius = Math.random() * 50 + 50;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ 
              backgroundColor: colors[i % colors.length],
              width: 3,
              height: 3,
            }}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ 
              scale: 1, 
              x: Math.cos(angle * Math.PI / 180) * radius, 
              y: Math.sin(angle * Math.PI / 180) * radius 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        );
      })}
    </motion.div>
  );
};

const Fireworks: React.FC = () => (
  <>
    {Array.from({ length: 10 }).map((_, i) => <Firework key={i} />)}
  </>
);

export default Fireworks;