import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import { DocumentIcon, BriefcaseIcon, FinanceIcon } from './icons';
import SeasonalAccentImage from './SeasonalAccentImage';

// Map icon names from content.ts to actual components
const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  DocumentIcon,
  BriefcaseIcon,
  FinanceIcon
};

const Services: React.FC = () => {
  const { content } = useContent();
  if (!content) return null;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      } 
    },
  };

  return (
    <motion.section 
      id="services" 
      className="py-20 bg-white relative overflow-hidden"
    >
      <SeasonalAccentImage />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">Our Services</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">We offer a range of professional tax services to meet your needs.</p>
        </div>
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
            {content.services.map((svc) => {
              const IconComponent = iconMap[svc.icon];
              return (
                <motion.div 
                  key={svc.id} 
                  variants={itemVariants} 
                  className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  {IconComponent && (
                    <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 text-amber-600 rounded-full mx-auto mb-6">
                      <IconComponent className="w-8 h-8" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold font-serif mb-3 text-gray-900">{svc.title}</h3>
                  <p className="text-gray-600">{svc.description}</p>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;
