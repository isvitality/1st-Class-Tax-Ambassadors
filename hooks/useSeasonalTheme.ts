import { useSimulatedDate } from './useSimulatedDate';

export type SeasonalTheme = 
  | 'winter'
  | 'spring'
  | 'summer'
  | 'patriotic'
  | 'early_fall'
  | 'halloween'
  | 'thanksgiving'
  | 'valentines'
  | 'st_patricks'
  | 'easter'
  | 'mothers_day'
  | 'fathers_day'
  | 'labor_day'
  | 'christmas'
  | 'new_year'
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
        { src: `${ACCENT_BASE_PATH}acorn.png`, alt: 'Acorn accent' },
        { src: `${ACCENT_BASE_PATH}autumnleaf.png`, alt: 'Autumn leaf accent' }
    ],
    'thanksgiving': [
        { src: `${ACCENT_BASE_PATH}turkey.png`, alt: 'Turkey accent' },
        { src: `${ACCENT_BASE_PATH}wheat.png`, alt: 'Wheat accent' }
    ],
    'halloween': [
        { src: `${ACCENT_BASE_PATH}pumpkin.png`, alt: 'Pumpkin accent' },
        { src: `${ACCENT_BASE_PATH}spiderweb.png`, alt: 'Spiderweb accent' }
    ],
    'winter': [
        { src: `${ACCENT_BASE_PATH}reindeer.png`, alt: 'Reindeer accent' },
        { src: `${ACCENT_BASE_PATH}santaclause.png`, alt: 'Santa Claus accent' }
    ],
    'christmas': [
        { src: `${ACCENT_BASE_PATH}reindeer.png`, alt: 'Reindeer accent' },
        { src: `${ACCENT_BASE_PATH}santaclause.png`, alt: 'Santa Claus accent' }
    ],
    'new_year': [
        { src: `${ACCENT_BASE_PATH}patrioticstar.png`, alt: 'Star accent' }
    ],
    'patriotic': [
        { src: `${ACCENT_BASE_PATH}patrioticstar.png`, alt: 'Patriotic star accent' }
    ],
    'labor_day': [
        { src: `${ACCENT_BASE_PATH}patrioticstar.png`, alt: 'Star accent' }
    ],
    'valentines': [
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
    'easter': [
        { src: `${ACCENT_BASE_PATH}easterbunny.png`, alt: 'Easter bunny accent' }
    ],
    'mothers_day': [
        { src: `${ACCENT_BASE_PATH}mothersday.png`, alt: 'Mothers day flower accent' }
    ],
    'fathers_day': [
        { src: `${ACCENT_BASE_PATH}fathersday.png`, alt: 'Fathers day tie accent' }
    ],
};

export const useSeasonalTheme = (): SeasonalThemeInfo => {
  const now = useSimulatedDate();
  const month = now.getMonth(); // 0-11
  const day = now.getDate(); // 1-31
  const year = now.getFullYear();

  const getNthDayOfWeek = (year: number, month: number, dayOfWeek: number, week: number): number => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const firstOccurrence = 1 + (dayOfWeek - firstDayOfMonth + 7) % 7;
    return firstOccurrence + (week - 1) * 7;
  };

  let theme: SeasonalTheme = 'none';

  // --- Specific Holiday Checks ---
  if (month === 0 && day === 1) theme = 'new_year';
  else if (month === 1 && day === 14) theme = 'valentines';
  else if (month === 2 && day === 17) theme = 'st_patricks';
  else if (month === 4 && day === getNthDayOfWeek(year, 4, 0, 2)) theme = 'mothers_day';
  else if (month === 5 && day === getNthDayOfWeek(year, 5, 0, 3)) theme = 'fathers_day';
  else if (month === 6 && day === 4) theme = 'patriotic';
  else if (month === 8 && day === getNthDayOfWeek(year, 8, 1, 1)) theme = 'labor_day';
  else if (month === 9) theme = 'halloween';
  else if (month === 10 && day === getNthDayOfWeek(year, 10, 4, 4)) theme = 'thanksgiving';
  else if (month === 11 && day >= 24 && day <= 25) theme = 'christmas';

  // --- Seasonal Fallbacks ---
  if (theme === 'none') {
    switch (month) {
      case 11: case 0: case 1: theme = 'winter'; break;
      case 2: theme = 'spring'; break;
      case 3: theme = 'easter'; break;
      case 4: theme = 'spring'; break;
      case 5: case 6: case 7: theme = 'summer'; break;
      case 8: case 10: theme = 'early_fall'; break;
      default: theme = 'none';
    }
  }

  const accents = seasonalAccents[theme] || [];

  return { theme, accents };
};