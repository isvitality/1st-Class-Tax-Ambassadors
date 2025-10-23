import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PopupContextType {
  isCalendlyOpen: boolean;
  openCalendly: () => void;
  closeCalendly: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const openCalendly = () => setIsCalendlyOpen(true);
  const closeCalendly = () => setIsCalendlyOpen(false);

  const value = {
    isCalendlyOpen,
    openCalendly,
    closeCalendly,
  };

  return (
    <PopupContext.Provider value={value}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopupContext = (): PopupContextType => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopupContext must be used within a PopupProvider');
  }
  return context;
};