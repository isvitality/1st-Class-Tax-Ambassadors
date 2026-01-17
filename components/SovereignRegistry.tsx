
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SovereignRegistry: React.FC = () => {
  const [binary, setBinary] = useState("01001001010100110100001101010010");
  const nodeId = "IS-1TA";

  useEffect(() => {
    const interval = setInterval(() => {
      setBinary(prev => {
        const arr = prev.split('');
        // Randomly flip bits less frequently (50% chance each interval)
        if (Math.random() > 0.5) {
          const numFlips = Math.floor(Math.random() * 2) + 1;
          for (let i = 0; i < numFlips; i++) {
            const index = Math.floor(Math.random() * arr.length);
            arr[index] = arr[index] === '0' ? '1' : '0';
          }
        }
        return arr.join('');
      });
    }, 250); // Slower calculation cycle
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center py-6 overflow-hidden relative">
      {/* Scanning Sweep Effect - Slowed down and made even fainter */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ x: '-150%' }}
        animate={{ x: '250%' }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.02), transparent)'
        }}
      />

      <motion.div
        className="relative z-10 font-mono text-[8px] text-slate-400 select-none pointer-events-none tracking-widest"
        initial={{ opacity: 0.05 }}
        animate={{ 
          opacity: [0.05, 0.10, 0.05],
          x: [0, -0.2, 0.4, -0.1, 0],
          y: [0, 0.2, -0.3, 0.1, 0]
        }}
        transition={{ 
          opacity: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.4, repeat: Infinity, ease: "linear" },
          y: { duration: 0.5, repeat: Infinity, ease: "linear" }
        }}
      >
        SYS_RECLAIM_ID: {binary} (Vibrational Node: {nodeId})
      </motion.div>
    </div>
  );
};

export default SovereignRegistry;
