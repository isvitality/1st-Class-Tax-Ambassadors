import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldIcon,
  HomeIcon,
  DocumentIcon,
  TaxIcon,
  BriefcaseIcon,
  PiggyBankIcon,
  GraduationCapIcon,
  BabyIcon,
} from './icons';

const brandColors = {
  orange: '#FF4D00',
  purple: '#9333ea', // A vibrant purple for high visibility against the dark background
};

const iconData = [
  { Icon: TaxIcon, serviceId: 'taxes', size: 'w-14 h-14', top: '15%', left: '10%', duration: 12 },
  { Icon: BriefcaseIcon, serviceId: 'business', size: 'w-12 h-12', top: '20%', left: '85%', duration: 15 },
  { Icon: ShieldIcon, serviceId: 'insurance', size: 'w-16 h-16', top: '75%', left: '15%', duration: 18 },
  { Icon: PiggyBankIcon, serviceId: 'retirement', size: 'w-10 h-10', top: '50%', left: '5%', duration: 10 },
  { Icon: HomeIcon, serviceId: 'realestate', size: 'w-20 h-20', top: '80%', left: '80%', duration: 14 },
  { Icon: GraduationCapIcon, serviceId: 'college', size: 'w-12 h-12', top: '10%', left: '40%', duration: 16 },
  { Icon: DocumentIcon, serviceId: 'rollovers', size: 'w-16 h-16', top: '45%', left: '90%', duration: 13 },
  { Icon: BabyIcon, serviceId: 'milliondollarbaby', size: 'w-10 h-10', top: '85%', left: '50%', duration: 20 },
].map((icon, index) => ({
  ...icon,
  hoverColor: index % 2 === 0 ? brandColors.orange : brandColors.purple,
}));


const FloatingIconsOverlay: React.FC = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      // Add a subtle highlight effect to the scrolled-to card
      targetElement.style.transition = 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out';
      targetElement.style.boxShadow = '0 0 30px 5px rgba(92, 39, 242, 0.5)';
      targetElement.style.transform = 'scale(1.02)';
      setTimeout(() => {
        targetElement.style.boxShadow = '';
        targetElement.style.transform = '';
      }, 1500);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-20">
      {iconData.map(({ Icon, serviceId, size, top, left, duration, hoverColor }, index) => (
        <motion.a
          key={index}
          href={`#service-${serviceId}`}
          onClick={handleSmoothScroll}
          className="absolute text-white/25 pointer-events-auto cursor-pointer"
          aria-label={`Scroll to ${serviceId} service`}
          style={{ top, left }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ 
            scale: 1.3, 
            color: hoverColor,
            filter: `drop-shadow(0 0 10px ${hoverColor})`
          }}
          whileTap={{ scale: 1.1 }}
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 15,
            delay: index * 0.1, 
          }}
        >
          <motion.div
             animate={{ y: [-8, 8] }}
             transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: Math.random() * 2,
             }}
          >
            <Icon className={size} />
          </motion.div>
        </motion.a>
      ))}
    </div>
  );
};

export default FloatingIconsOverlay;