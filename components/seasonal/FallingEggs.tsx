import React from 'react';
import { motion } from 'framer-motion';
import { Particle } from './Particle';

const eggs = ['🥚', '🐣', '🌸'];

const FallingEggs: React.FC = () => (
  <>
    {Array.from({ length: 25 }).map((_, i) => (
      <Particle 
        key={i} 
        content={eggs[i % eggs.length]} 
        fontSizeRange={[16, 30]} 
        durationRange={[7, 14]}
      />
    ))}
  </>
);

export default FallingEggs;
