import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePopupContext } from '../contexts/PopupContext';

const CalendlyPopup: React.FC = () => {
  const { isCalendlyOpen, closeCalendly } = usePopupContext();

  // IMPORTANT: Replace this with your actual Calendly link
  const calendlyUrl = "https://calendly.com/1stclasstaxambassadors";

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCalendly();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeCalendly]);

  useEffect(() => {
    if (isCalendlyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCalendlyOpen]);

  return (
    <AnimatePresence>
      {isCalendlyOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCalendly}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-gray-50 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col relative"
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b bg-white">
              <h3 className="text-lg font-bold font-serif text-gray-800">Schedule an Appointment</h3>
              <button
                onClick={closeCalendly}
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Close booking form"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-grow bg-white">
              <iframe
                src={calendlyUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule an Appointment"
              ></iframe>
              {calendlyUrl.includes('your-username') && (
                 <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 pointer-events-none">
                   <p className="text-center text-gray-600 font-semibold p-4 bg-white/70 backdrop-blur-sm rounded-md shadow-md">
                     Calendly integration placeholder.
                     <br /> 
                     Replace URL in `components/CalendlyPopup.tsx`.
                   </p>
                 </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendlyPopup;