import React from 'react';
import { Particle } from './Particle';

const blossoms = ['🌸', '💮', '🌼'];

const SpringBlossoms: React.FC = () => (
  <>
    {Array.from({ length: 30 }).map((_, i) => (
      <Particle 
        key={i} 
        content={blossoms[i % blossoms.length]} 
        fontSizeRange={[16, 30]} 
        durationRange={[8, 16]}
      />
    ))}
  </>
);

export default SpringBlossoms;
