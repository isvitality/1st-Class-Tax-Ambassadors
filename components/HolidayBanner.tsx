
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeasonalTheme, SeasonalTheme } from '../hooks/useSeasonalTheme';
import { GiftIcon } from './icons';

const getHolidayMessage = (theme: SeasonalTheme): string | null => {
    const messages: { [key in SeasonalTheme]?: string | string[] } = {
        'new_year': [
          `Happy New Year! Here's to a fresh start and a a prosperous year ahead.`,
          `Happy New Year! Wishing you a prosperous year ahead.`
        ],
        // Fix: Use 'valentines_day' to match SeasonalTheme type
        'valentines_day': [
          `Happy Valentine's Day! Show your finances some love by getting your taxes done right.`,
          `Happy Valentine's Day! Let's get a tax outcome you'll love.`
        ],
        'st_patricks': [
          `Happy St. Patrick's Day! May you find your pot of gold with a maximized tax refund.`,
          `Happy St. Patrick's Day! Don't rely on luck for your taxes.`
        ],
        'easter': [
          `Happy Easter! It's a time for new beginnings, a perfect time to get your taxes in order.`,
          `Happy Easter! Time for a fresh start on your taxes.`
        ],
        'mothers_day': [
          `Happy Mother's Day to all the amazing moms! Let's build a legacy you can be proud of.`,
          `Happy Mother's Day! Honoring all you do with plans for a secure future.`
        ],
        'fathers_day': [
          `Happy Father's Day! Secure your role as provider and protector for the future.`,
          `Happy Father's Day! Let's build a strong financial foundation with smart tax planning.`
        ],
        'patriotic': [
          `Happy Independence Day! Let's work towards achieving freedom from tax stress.`,
          `Happy Independence Day! Celebrate by taking a step towards freedom from tax stress.`
        ],
        'labor_day': [
          `Happy Labor Day! Your hard work deserves a smart tax strategy. Let's build one together.`,
          `Happy Labor Day! Let your hard work pay off with a solid tax plan.`
        ],
        'halloween': [
          `Happy Halloween! Don't let your taxes be spooky. We're here to help you face any fears.`,
          `Happy Halloween! No tricks, just treats when it comes to your tax planning.`
        ],
        'thanksgiving': [
          `Happy Thanksgiving! We're grateful for the opportunity to help you build a secure future.`,
          `Happy Thanksgiving! We're grateful to help you plan for a secure future.`
        ],
        // Fix: Use 'winter_holiday' to match SeasonalTheme type
        'winter_holiday': [
          `Merry Christmas! Wishing you a season of joy and a new year of tax peace of mind.`,
          `Merry Christmas! Wishing you joy, peace, and financial well-being.`
        ],
        'winter': [
          'Stay warm this winter! It\'s a great time to review your tax situation for the year.',
          'Winter is here! Let\'s heat up your tax strategy for the new year.'
        ],
        'spring': [
          'Spring is here! A perfect season to refresh your tax strategy.',
          'Spring has sprung! Let\'s grow your tax refund.'
        ],
        'summer': [
          'Hello, summer! Let\'s heat up your tax planning for next year.',
          'Enjoy the summer! While you relax, let\'s make sure your tax strategy is working hard.'
        ],
        'early_fall': [
          'Welcome to Fall! A great time to get serious about your end-of-year tax planning.',
          'Fall is in the air! It\'s the perfect season to harvest the results of good tax planning.'
        ],
    };

    const messageOrArray = messages[theme];
    if (Array.isArray(messageOrArray)) {
        return messageOrArray[Math.floor(Math.random() * messageOrArray.length)];
    }
    return (messageOrArray as string) || null;
};

const HolidayBanner: React.FC = () => {
  const { theme } = useSeasonalTheme();
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const newMessage = getHolidayMessage(theme);
    setMessage(newMessage);
    
    if (newMessage) {
      try {
        const isDismissed = sessionStorage.getItem(`holiday-banner-${theme}`);
        if (!isDismissed) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (e) {
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  }, [theme]);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(`holiday-banner-${theme}`, 'true');
    } catch (e) {}
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && message && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="bg-gray-800 text-white overflow-hidden"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-center relative">
              <GiftIcon className="w-6 h-6 mr-3 text-yellow-400 flex-shrink-0" />
              <p className="text-center text-sm sm:text-base font-medium">{message}</p>
              <button
                onClick={handleDismiss}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Dismiss holiday message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HolidayBanner;
