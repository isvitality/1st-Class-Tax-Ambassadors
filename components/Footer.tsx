import React, { useState } from 'react';
import { Logo } from './Logo';
import { useContent } from '../contexts/ContentContext';
import { FacebookIcon, InstagramIcon } from './icons';

interface FooterProps {
  onLogoClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLogoClick }) => {
  const { content } = useContent();
  const [clickCount, setClickCount] = useState(0);

  if (!content) return null;

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      onLogoClick();
      setClickCount(0); // Reset after activation
    }
  };

  return (
    <footer className="py-8 bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          <div className="cursor-pointer" onClick={handleLogoClick} title="Click 5 times to open theme tester">
            <Logo className="h-32 mx-auto md:mx-0" textColor="text-gray-600"/>
             <p className="text-gray-500 text-sm mt-2">
               &copy; {new Date().getFullYear()} {content.company.name}. All Rights Reserved.
             </p>
             <p className="text-gray-500 text-xs mt-1">
              <a href="https://geotapmedia.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors" onClick={(e) => e.stopPropagation()}>Powered by GeoTap Media</a>
             </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="italic text-sm text-gray-600 max-w-xs">
              Empowering you to navigate tax season with confidence and ease.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-500 hover:text-amber-600 transition-colors">
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a href="#instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-amber-600 transition-colors">
                <InstagramIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;