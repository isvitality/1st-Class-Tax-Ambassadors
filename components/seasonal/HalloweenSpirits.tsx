import React from 'react';
import { Particle } from './Particle';

const HalloweenSpirits: React.FC = () => (
  <>
    {Array.from({ length: 20 }).map((_, i) => (
      <Particle
        key={i}
        content="👻"
        fontSizeRange={[20, 40]}
        durationRange={[10, 20]}
        isFloating={true}
      />
    ))}
  </>
);

export default HalloweenSpirits;
