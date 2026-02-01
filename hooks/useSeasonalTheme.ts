
// @google/genai - hook to manage seasonal themes based on simulated or real date.
import { useSimulatedDate } from './useSimulatedDate';

export type SeasonalTheme = 
  | 'winter'          // Neutral (Jan/Feb)
  | 'winter_holiday'  // Festive (Dec)
  | 'new_year'        // Jan 1st
  | 'valentines_day'  // Feb 1-15
  | 'st_patricks'     // Mar 10-20
  | 'spring'          // Mar/Apr/May fallback
  | 'easter'          // Apr specific (if needed)
  | 'mothers_day'     // May specific
  | 'fathers_day'     // June specific
  | 'summer'          // Jun/Jul/Aug fallback
  | 'patriotic'       // July 4 window
  | 'labor_day'       // Sep window
  | 'early_fall'      // Sep/Oct fallback
  | 'halloween'       // Oct 20-31
  | 'thanksgiving'    // Nov specific
  | 'none';

interface AccentImage {
  src: string;
  alt: string;
}

interface SeasonalThemeInfo {
  theme: SeasonalTheme;
  accents: AccentImage[];
}

const ACCENT_BASE_PATH = 'https://geotapmedia.com/VictoryFinancialServices/images/accents/';

const seasonalAccents: Partial<Record<SeasonalTheme, AccentImage[]>> = {
    'early_fall': [
        { src: `${ACCENT_BASE_PATH}autumnleaf.png`, alt: 'Autumn leaf accent' },
        { src: `${ACCENT_BASE_PATH}acorn.png`, alt: 'Acorn accent' }
    ],
    'thanksgiving': [
        { src: `${ACCENT_BASE_PATH}turkey.png`, alt: 'Turkey accent' },
        { src: `${ACCENT_BASE_PATH}wheat.png`, alt: 'Wheat accent' }
    ],
    'halloween': [
        { src: `${ACCENT_BASE_PATH}pumpkin.png`, alt: 'Pumpkin accent' },
        { src: `${ACCENT_BASE_PATH}spiderweb.png`, alt: 'Spiderweb accent' }
    ],
    'winter_holiday': [
        { src: `${ACCENT_BASE_PATH}reindeer.png`, alt: 'Reindeer accent' },
        { src: `${ACCENT_BASE_PATH}santaclause.png`, alt: 'Santa Claus accent' }
    ],
    'winter': [
        { src: `${ACCENT_BASE_PATH}patrioticstar.png`, alt: 'Star accent' }
    ],
    'valentines_day': [
        { src: `${ACCENT_BASE_PATH}valentines.png`, alt: 'Valentine heart accent' }
    ],
    'spring': [
        { src: `${ACCENT_BASE_PATH}cherryblossom.png`, alt: 'Cherry blossom accent' }
    ],
    'summer': [
        { src: `${ACCENT_BASE_PATH}sun.png`, alt: 'Sun accent' },
        { src: `${ACCENT_BASE_PATH}palmleaf.png`, alt: 'Palm leaf accent' }
    ],
    'st_patricks': [
        { src: `${ACCENT_BASE_PATH}stpatricksday.png`, alt: 'Shamrock accent' }
    ],
};

export const useSeasonalTheme = (): SeasonalThemeInfo => {
  const now = useSimulatedDate();
  const month = now.getMonth(); // 0 = Jan, 11 = Dec
  const day = now.getDate();
  const year = now.getFullYear();

  const getNthDayOfWeek = (y: number, m: number, dow: number, w: number): number => {
    const firstDay = new Date(y, m, 1).getDay();
    const firstOccur = 1 + (dow - firstDay + 7) % 7;
    return firstOccur + (w - 1) * 7;
  };

  let theme: SeasonalTheme = 'none';

  // --- Priority 1: Holiday Windows ---
  if (month === 11) {
    theme = 'winter_holiday'; // Dec 1-31
  } else if (month === 0 && day === 1) {
    theme = 'new_year'; // Jan 1st
  } else if (month === 9 && day >= 20) {
    theme = 'halloween'; // Oct 20-31
  } else if (month === 1 && day <= 15) {
    theme = 'valentines_day'; // Feb 1-15
  } else if (month === 2 && day >= 10 && day <= 20) {
    theme = 'st_patricks'; // Mar 10-20
  } else if (month === 6 && day === 4) {
    theme = 'patriotic';
  } else if (month === 10 && day === getNthDayOfWeek(year, 10, 4, 4)) {
    theme = 'thanksgiving';
  }

  // --- Priority 2: Strict Neutrality Fallbacks ---
  if (theme === 'none') {
    if (month === 0 || month === 1) {
      theme = 'winter'; // Jan/Feb (Neutral - Stars/Snowflakes ONLY)
    } else if (month >= 2 && month <= 4) {
      theme = 'spring';
    } else if (month >= 5 && month <= 7) {
      theme = 'summer';
    } else if (month >= 8 && month <= 10) {
      theme = 'early_fall';
    }
  }

  const accents = seasonalAccents[theme] || [];
  return { theme, accents };
};
