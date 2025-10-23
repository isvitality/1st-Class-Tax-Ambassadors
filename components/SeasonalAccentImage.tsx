import React, { useState, useEffect } from 'react';
import { motion, Transition } from 'framer-motion';
import { useSeasonalTheme } from '../hooks/useSeasonalTheme';

// Define a type for the animation properties to ensure consistency
type AnimationProps = {
    style: React.CSSProperties;
    initial: { opacity: number; scale: number; rotate: number; };
    animate: { opacity: number; scale: number; rotate: number; };
    transition: Transition;
};

// Helper function to generate a complete set of randomized animation properties
const generateRandomAnimationProps = (position: 'topLeft' | 'bottomRight'): AnimationProps => {
    if (position === 'topLeft') {
        return {
            style: {
                top: `${1 + Math.random()}rem`,
                left: `${2 + Math.random()}rem`,
            },
            initial: {
                opacity: 0,
                scale: 0.4 + Math.random() * 0.3,
                rotate: -45 + Math.random() * 30,
            },
            animate: {
                opacity: 1,
                scale: 1,
                rotate: -12 + (Math.random() * 10 - 5),
            },
            transition: {
                type: 'spring' as const,
                stiffness: 180 + Math.random() * 70,
                damping: 18 + Math.random() * 7,
                delay: 0.1 + Math.random() * 0.2,
            }
        };
    } else { // bottomRight
        return {
            style: {
                bottom: `${1 + Math.random()}rem`,
                right: `${2 + Math.random()}rem`,
            },
            initial: {
                opacity: 0,
                scale: 0.4 + Math.random() * 0.3,
                rotate: 45 - Math.random() * 30,
            },
            animate: {
                opacity: 1,
                scale: 1,
                rotate: 12 + (Math.random() * 10 - 5),
            },
            transition: {
                type: 'spring' as const,
                stiffness: 180 + Math.random() * 70,
                damping: 18 + Math.random() * 7,
                delay: 0.2 + Math.random() * 0.2,
            }
        };
    }
};

const SeasonalAccentImage: React.FC = () => {
    const { accents } = useSeasonalTheme();
    const [animationProps1, setAnimationProps1] = useState<AnimationProps | null>(null);
    const [animationProps2, setAnimationProps2] = useState<AnimationProps | null>(null);

    useEffect(() => {
        // Generate random animation properties on the client side after the component mounts.
        // This avoids server-client hydration mismatches that can occur when using Math.random() during the initial render.
        setAnimationProps1(generateRandomAnimationProps('topLeft'));
        setAnimationProps2(generateRandomAnimationProps('bottomRight'));
    }, [accents]); // Re-calculate if the theme (and thus accents) changes.


    // Render nothing until the client-side animations are ready.
    if (!accents || accents.length === 0 || !animationProps1 || !animationProps2) {
        return null;
    }

    const accent1 = accents[0];
    const accent2 = accents.length > 1 ? accents[1] : accents[0]; // Use first if second doesn't exist

    return (
        <>
            <motion.img
                key={accent1.src}
                src={accent1.src}
                alt={accent1.alt}
                className="absolute w-24 h-24 pointer-events-none"
                style={animationProps1.style}
                initial={animationProps1.initial}
                whileInView={animationProps1.animate}
                viewport={{ once: true, amount: 0.5 }}
                transition={animationProps1.transition}
                aria-hidden="true"
            />
            <motion.img
                key={accent2.src + '2'}
                src={accent2.src}
                alt={accent2.alt}
                className="absolute w-24 h-24 pointer-events-none"
                style={animationProps2.style}
                initial={animationProps2.initial}
                whileInView={animationProps2.animate}
                viewport={{ once: true, amount: 0.5 }}
                transition={animationProps2.transition}
                aria-hidden="true"
            />
        </>
    );
};

export default SeasonalAccentImage;