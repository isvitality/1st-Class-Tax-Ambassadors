import React from 'react';
import { Particle } from './Particle';

const hearts = ['❤️', '💖', '💕'];

const FallingHearts: React.FC = () => (
  <>
    {Array.from({ length: 30 }).map((_, i) => (
      <Particle 
        key={i} 
        content={hearts[i % hearts.length]} 
        fontSizeRange={[14, 28]} 
        durationRange={[6, 12]}
      />
    ))}
  </>
);

export default FallingHearts;