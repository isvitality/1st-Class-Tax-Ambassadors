import React from 'react';
import { Particle } from './Particle';

const Snowfall: React.FC = () => (
  <>
    {Array.from({ length: 50 }).map((_, i) => (
      <Particle 
        key={i} 
        content="•" 
        fontSizeRange={[12, 24]} 
        durationRange={[10, 20]}
      />
    ))}
  </>
);

export default Snowfall;