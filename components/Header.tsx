import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Logo } from './Logo';
import { usePopupContext } from '../contexts/PopupContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openCalendly } = usePopupContext();
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to restore scroll on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);


  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close menu on link click
    
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // A small delay to allow the menu to start closing before scrolling
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    openCalendly();
  };

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#recruitment', label: 'Join Us' },
    { href: '#magnet', label: 'Free Guide' },
    { href: '#contact', label: 'Contact' },
  ];
  
  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      x: '100%',
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };
  
  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const ctaText = "Book a Consultation";

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo (Now on the far left for all screen sizes) */}
        <div className="flex-shrink-0">
           <motion.a 
            href="#hero" 
            aria-label="Back to top"
            onClick={handleLinkClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Logo className="h-36" />
          </motion.a>
        </div>
        
        {/* Desktop Navigation & CTA */}
        <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
                {navLinks.map((link) => (
                <a 
                    key={link.href}
                    href={link.href} 
                    onClick={handleLinkClick} 
                    className="text-lg font-medium text-gray-600 hover:text-amber-500 transition nav-link"
                >
                    {link.label}
                </a>
                ))}
            </nav>
            <a 
                href="#booking" 
                onClick={handleBookClick} 
                className="bg-[#FDC100] text-black font-bold px-6 py-3 rounded-lg shadow hover:shadow-lg hover:bg-[#FFA000] transition btn-shine"
            >
                {ctaText}
            </a>
        </div>


        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 w-8 h-8 text-gray-800"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="w-6 h-full flex flex-col items-center justify-center space-y-1.5"
            >
              <motion.span
                className="block w-full h-0.5 bg-current"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 4 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-full h-0.5 bg-current"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-full h-0.5 bg-current"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -4 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed inset-0 bg-white z-40 pt-24"
          >
            <motion.div 
              className="container mx-auto px-4 h-full flex flex-col items-center text-center space-y-8"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              {navLinks.map((link) => (
                <motion.a 
                  key={link.href}
                  href={link.href} 
                  onClick={handleLinkClick} 
                  className="text-3xl font-serif text-gray-800 hover:text-amber-500 transition"
                  variants={navItemVariants}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div variants={navItemVariants}>
                <a 
                  href="#booking" 
                  onClick={handleBookClick} 
                  className="mt-8 inline-block bg-[#FDC100] text-black font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#FFA000] transition-all duration-300 transform hover:-translate-y-1 btn-shine"
                >
                  {ctaText}
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;