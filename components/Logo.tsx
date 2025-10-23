import React from 'react';
import { useContent } from '../contexts/ContentContext';

interface LogoProps {
  className?: string;
  textColor?: string; // For SVG fallback
}

export const Logo: React.FC<LogoProps> = ({ className, textColor = 'text-gray-900' }) => {
  const { content } = useContent();
  if (!content) return null;

  if (content.company.logo) {
    return (
      <img 
        src={content.company.logo} 
        alt={`${content.company.name} logo`} 
        className={className} 
      />
    );
  }

  // Fallback to SVG if no logo URL is provided
  return (
    <svg
      className={`w-auto ${className}`}
      viewBox="0 0 260 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${content.company.name} Logo`}
    >
      <path
        d="M20 0L0 40H20L40 0H20Z"
        className="fill-current text-[#FDC100]"
      />
      <text
        x="50"
        y="19"
        fontFamily="Inter, sans-serif"
        fontSize="18"
        fontWeight="bold"
        letterSpacing="0.05em"
        className={`fill-current ${textColor}`}
      >
        FIRST CLASS
      </text>
      <text
        x="50"
        y="35"
        fontFamily="Inter, sans-serif"
        fontSize="12"
        fontWeight="500"
        letterSpacing="0.05em"
        className={`fill-current ${textColor} opacity-80`}
      >
        TAX AMBASSADORS
      </text>
    </svg>
  );
};
