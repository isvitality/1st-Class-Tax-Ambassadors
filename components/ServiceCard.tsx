import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import type { Content } from '../contexts/ContentContext';

type Service = Content['services'][0];

interface ServiceCardProps {
  service: Service;
  variants: Variants;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, variants }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Create a parallax effect on the image
  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.div
      id={`service-${service.id}`}
      ref={ref}
      variants={variants}
      whileHover="hover" // Define hover state for variants or direct animation
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group"
    >
      <div className="w-full h-48 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          style={{ y: imageY, scale: 1.15 }}
          aria-hidden="true"
          transition={{ duration: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.25 }} // Zoom effect on hover
        />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold font-serif mb-3 text-gray-900">{service.title}</h3>
        <p className="text-gray-600 flex-grow">{service.description}</p>
        <a href={service.href} onClick={handleSmoothScroll} className="mt-6 inline-block text-[#5C27F2] font-bold group self-start">
          Learn More <span className="inline-block transition-transform group-hover:translate-x-1.5 duration-200">→</span>
        </a>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
