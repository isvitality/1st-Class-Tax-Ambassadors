
import React from 'react';
import { useSeasonalTheme } from '../hooks/useSeasonalTheme';
import { 
  FallingLeaves, 
  Snowfall, 
  HalloweenSpirits, 
  SpringBlossoms, 
  SummerShine, 
  PatrioticStars, 
  Fireworks, 
  FallingHearts,
  FallingClovers
} from './seasonal';

const SeasonalOverlay: React.FC = () => {
  const { theme } = useSeasonalTheme();

  const renderTheme = () => {
    switch (theme) {
      case 'early_fall':
      case 'thanksgiving':
        return <FallingLeaves />;
      case 'halloween':
        return <HalloweenSpirits />;
      case 'winter_holiday':
        // Dec window: Festive elements allowed here
        return <Snowfall />; 
      case 'winter':
        // Jan/Feb window: Neutral elements only (Snow/Stars)
        return <Snowfall />;
      case 'valentines_day':
      case 'mothers_day':
      case 'fathers_day':
        return <FallingHearts />;
      case 'spring':
        return <SpringBlossoms />;
      case 'st_patricks':
        return <FallingClovers />;
      case 'summer':
        return <SummerShine />;
      case 'patriotic':
        return (
          <>
            <PatrioticStars />
            <Fireworks />
          </>
        );
      case 'labor_day':
        return <Fireworks />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" aria-hidden="true">
      {renderTheme()}
    </div>
  );
};

export default SeasonalOverlay;
