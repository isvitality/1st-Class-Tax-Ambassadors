
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SovereignSignature: React.FC = () => {
  // Binary for IS-VT
  const baseBinary = "01001001 01010011 01010110 01010010";
  const [displayBinary, setDisplayBinary] = useState(baseBinary);

  useEffect(() => {
    const interval = setInterval(() => {
      const bits = baseBinary.split('');
      const scrambled = bits.map(bit => {
        if (bit === ' ') return ' ';
        // 15% probability of bit flip
        return Math.random() < 0.15 ? (bit === '0' ? '1' : '0') : bit;
      }).join('');
      setDisplayBinary(scrambled);
    }, 60); // High-frequency 60ms interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center py-4 select-none pointer-events-none overflow-hidden">
      <motion.div 
        className="font-mono text-[9px] text-slate-500 opacity-15 tracking-tighter uppercase"
        animate={{
          scale: [1, 1.002, 1],
          opacity: [0.15, 0.18, 0.15]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        Build ID: {displayBinary}
      </motion.div>
    </div>
  );
};

export default SovereignSignature;
