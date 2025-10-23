import { useSimulatedDate } from './useSimulatedDate';
import { useState, useEffect } from 'react';

export type TaxSeason = 'PRE_SEASON' | 'PEAK_SEASON' | 'OFF_SEASON';

interface TaxSeasonInfo {
  season: TaxSeason;
  coreContent: {
    title: string;
    subtitle: string;
  };
  seasonalContent: {
    preTitle: string;
    cta: string;
  };
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export const useTaxSeason = (): TaxSeasonInfo => {
  const [now, setNow] = useState(useSimulatedDate());
  const simulatedDate = useSimulatedDate();

  useEffect(() => {
    // If we're not simulating, we need a live timer for the countdown
    if (simulatedDate.getTime() === new Date(simulatedDate).getTime()) {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    } else {
        // If we are simulating, just use the static simulated date
        setNow(simulatedDate);
    }
  }, [simulatedDate]);


  const year = now.getFullYear();
  let taxDeadline = new Date(year, 3, 16, 0, 0, 0); 

  if (now > taxDeadline) {
    taxDeadline = new Date(year + 1, 3, 16, 0, 0, 0);
  }

  const timeRemaining = taxDeadline.getTime() - now.getTime();

  const countdown = {
    days: Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60 * 24))),
    hours: Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    minutes: Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))),
    seconds: Math.max(0, Math.floor((timeRemaining % (1000 * 60)) / 1000)),
  };

  const month = now.getMonth();
  const day = now.getDate();
  const monthName = now.toLocaleString('default', { month: 'long' });

  const coreContent = {
    title: 'Clarity and Confidence for Your Tax Season',
    subtitle: "First Class Tax Ambassadors provides expert tax preparation and personalized strategies to help you minimize your tax liability.",
  };

  let season: TaxSeason;
  let seasonalContent: TaxSeasonInfo['seasonalContent'];

  if (month < 3 || (month === 3 && day <= 15)) {
    season = 'PEAK_SEASON';
    seasonalContent = {
      preTitle: `It's ${monthName}. The Tax Deadline is Approaching. File with Confidence.`,
      cta: 'Book Your Appointment',
    };
  } 
  else if (month < 8) { 
    season = 'OFF_SEASON';
    seasonalContent = {
      preTitle: `Tax Season is Over. This ${monthName}, let's plan for a prosperous year ahead.`,
      cta: 'Book a Planning Session',
    };
  } 
  else {
    season = 'PRE_SEASON';
    seasonalContent = {
      preTitle: `As we head into ${monthName}, let's get a head start on the upcoming tax season.`,
      cta: 'Book an Early Consultation',
    };
  }

  return {
    season,
    coreContent,
    seasonalContent,
    countdown,
  };
};