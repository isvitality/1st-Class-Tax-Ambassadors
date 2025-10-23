import React from 'react';
import { Particle } from './Particle';

const FallingClovers: React.FC = () => (
  <>
    {Array.from({ length: 25 }).map((_, i) => (
      <Particle 
        key={i} 
        content="🍀" 
        fontSizeRange={[16, 32]} 
        durationRange={[8, 15]}
      />
    ))}
  </>
);

export default FallingClovers;