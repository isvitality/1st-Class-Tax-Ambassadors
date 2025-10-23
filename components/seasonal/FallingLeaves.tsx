import React from 'react';
import { motion } from 'framer-motion';
import { Particle } from './Particle';

const leaves = ['🍂', '🍁'];

const FallingLeaves: React.FC = () => (
  <>
    {Array.from({ length: 30 }).map((_, i) => (
      <Particle 
        key={i} 
        content={leaves[i % leaves.length]} 
        fontSizeRange={[18, 32]} 
        durationRange={[8, 16]}
      />
    ))}
  </>
);

export default FallingLeaves;
