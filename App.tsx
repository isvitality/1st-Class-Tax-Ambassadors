import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Recruitment from './components/Recruitment';
import Support from './components/Support';
import LeadMagnet from './components/LeadMagnet';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeTester from './components/ThemeTester';
import HolidayBanner from './components/HolidayBanner';
import MonthlyGreeting from './components/MonthlyGreeting';
import CalendlyPopup from './components/CalendlyPopup';
import InspirationalQuote from './components/InspirationalQuote';
import { useContent } from './contexts/ContentContext';

const LoadingSpinner: React.FC = () => (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-amber-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-semibold">Loading Content...</p>
    </div>
);


const App: React.FC = () => {
  const [isTesterVisible, setIsTesterVisible] = useState(false);
  const { isLoading } = useContent();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="text-gray-800 bg-white">
      <HolidayBanner />
      <Header />
      <main>
        <Hero />
        <About />
        <MonthlyGreeting />
        <Services />
        <InspirationalQuote />
        <Recruitment />
        <Support />
        <LeadMagnet />
        <FAQ />
        <Contact />
      </main>
      <Footer onLogoClick={() => setIsTesterVisible(true)} />
      <ThemeTester isVisible={isTesterVisible} onClose={() => setIsTesterVisible(false)} />
      <CalendlyPopup />
    </div>
  );
};

export default App;
