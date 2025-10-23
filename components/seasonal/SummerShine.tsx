import React from 'react';
import { Particle } from './Particle';

const SummerShine: React.FC = () => (
  <>
    {Array.from({ length: 30 }).map((_, i) => (
      <Particle
        key={i}
        content="✨"
        fontSizeRange={[10, 25]}
        durationRange={[8, 15]}
        isFloating={true}
      />
    ))}
  </>
);

export default SummerShine;
