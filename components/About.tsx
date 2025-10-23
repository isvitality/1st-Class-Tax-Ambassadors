import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import { BriefcaseIcon, DocumentIcon, FinanceIcon } from './icons';
import { usePopupContext } from '../contexts/PopupContext';
import SeasonalAccentImage from './SeasonalAccentImage';

const About: React.FC = () => {
    const { content } = useContent();
    const { openCalendly } = usePopupContext();

    if (!content) return null;

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

    const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        openCalendly();
    };

    return (
        <section id="about">
            {/* Part 1: Meet The Expert (now first) */}
            <div className="py-20 bg-gray-50 relative z-10 overflow-hidden">
                <SeasonalAccentImage />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-3 gap-12 lg:gap-16 items-center">
                        
                        {/* Text column (now on the left) */}
                        <motion.div
                            className="relative md:col-span-2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        >
                            <span className="text-amber-600 font-bold tracking-wider uppercase">Meet Your Expert</span>
                            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mt-2">{content.expert.title}</h2>
                            
                            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                                {content.expert.bio}
                            </p>
                            
                            <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
                                <div>
                                    <p className="font-serif italic text-5xl text-gray-700">{content.expert.name}</p>
                                </div>

                                <a
                                    href="#booking"
                                    onClick={handleBookClick}
                                    className="inline-block bg-[#FDC100] text-black font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl hover:bg-[#FFA000] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-amber-500/50 btn-shine"
                                >
                                    {content.expert.cta}
                                </a>
                            </div>
                        </motion.div>

                        {/* Image column (now on the right) */}
                        <motion.div
                            className="md:col-span-1 flex justify-center"
                            initial={{ opacity: 0, scale: 0.8, x: 50 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="relative">
                                <motion.div
                                    className="absolute -top-4 -left-4 w-full h-full bg-amber-500 rounded-full -z-10"
                                    aria-hidden="true"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                                />

                                {/* Floating Icons */}
                                <motion.div
                                    className="absolute top-4 left-12 text-white z-10"
                                    aria-hidden="true"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <FinanceIcon className="w-16 h-16" />
                                </motion.div>
                                
                                <motion.div
                                    className="absolute bottom-12 right-0 text-white z-10"
                                    aria-hidden="true"
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                >
                                    <DocumentIcon className="w-12 h-12" />
                                </motion.div>
                                
                                <motion.div
                                    className="absolute bottom-2 left-16 text-white z-10"
                                    aria-hidden="true"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                >
                                    <BriefcaseIcon className="w-10 h-10" />
                                </motion.div>

                                <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full shadow-xl shadow-amber-500/25 overflow-hidden">
                                    <img
                                        src={content.expert.image}
                                        alt={`Portrait of ${content.expert.name}`}
                                        className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Part 2: Company Description */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-amber-600 font-semibold tracking-wider uppercase">About our company</p>
                        <div className="mt-2 h-1 bg-amber-600 w-24" />
                    </motion.div>

                    <motion.div
                        className="text-left"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800">
                            {content.about.title}
                        </h2>
                        <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-3xl">
                            {content.about.description}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
