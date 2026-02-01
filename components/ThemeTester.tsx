
import React, { useState, useEffect } from 'react';
import { useSimulatedDateContext } from '../contexts/SimulatedDateContext';

const availableThemes = [
  { value: 'none', label: 'Default (Actual Date)' },
  { value: 'PEAK_SEASON', label: 'Tax Season (Peak)' },
  { value: 'OFF_SEASON', label: 'Tax Season (Off)' },
  { value: 'PRE_SEASON', label: 'Tax Season (Pre)' },
  { value: 'winter', label: 'Winter (Neutral Jan/Feb)' },
  { value: 'winter_holiday', label: 'Winter Holiday (Festive Dec)' },
  { value: 'valentines_day', label: "Valentine's Day (Feb 1-15)" },
  { value: 'st_patricks', label: "St. Patrick's Day (Mar 10-20)" },
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'halloween', label: 'Halloween (Oct 20-31)' },
];

interface ThemeTesterProps {
  isVisible: boolean;
  onClose: () => void;
}

const ThemeTester: React.FC<ThemeTesterProps> = ({ isVisible, onClose }) => {
  const { setThemeOverride } = useSimulatedDateContext();
  const [currentTheme, setCurrentTheme] = useState('none');

  useEffect(() => {
    try {
      const themeOverride = localStorage.getItem('vfs-theme-override') || 'none';
      setCurrentTheme(themeOverride);
    } catch (e) {}
  }, []);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value;
    setCurrentTheme(newTheme);
    setThemeOverride(newTheme);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-md border border-gray-300 rounded-lg shadow-2xl p-4 z-[9999] text-sm font-sans text-gray-800 max-w-xs w-full">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-base">Theme Tester</h4>
        <button onClick={onClose} className="text-2xl font-mono text-gray-500 hover:text-gray-800 leading-none -mt-1" aria-label="Close theme tester">&times;</button>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="theme-select" className="text-xs font-medium text-gray-600">Force Theme / Date:</label>
        <select 
          id="theme-select"
          value={currentTheme} 
          onChange={handleThemeChange}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
        >
          {availableThemes.map(theme => (
            <option key={theme.value} value={theme.value}>{theme.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ThemeTester;
