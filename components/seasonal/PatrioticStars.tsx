import React from 'react';
import { Particle } from './Particle';

const PatrioticStars: React.FC = () => (
  <>
    {Array.from({ length: 30 }).map((_, i) => (
      <Particle
        key={i}
        content="⭐"
        fontSizeRange={[10, 25]}
        durationRange={[10, 20]}
        isFloating={true}
      />
    ))}
  </>
);

export default PatrioticStars;
