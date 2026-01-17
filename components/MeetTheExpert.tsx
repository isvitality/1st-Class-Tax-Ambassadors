import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';

const MeetTheExpert: React.FC = () => {
    const { content } = useContent();

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

    if (!content) return null;

    return (
        <section id="expert" className="py-20 bg-gray-50 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
                    {/* Image column, now smaller and centered */}
                    <motion.div
                        className="lg:col-span-1 flex justify-center lg:-translate-y-[200px]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Wrapper for circular frame and accents */}
                        <div className="relative">
                            {/* Accent shape */}
                             <motion.div
                                className="absolute -top-4 -left-4 w-full h-full bg-amber-500 rounded-full -z-10"
                                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                                aria-hidden="true"
                            />
                            {/* Main circular image container */}
                            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full shadow-xl shadow-amber-500/25 overflow-hidden">
                                <img
                                    src={content.expert.image}
                                    alt={`Portrait of ${content.expert.name}`}
                                    className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* Text column, now larger */}
                    <motion.div
                        className="relative lg:col-span-2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        {/* Decorative shapes for the right column - adjusted for new layout */}
                        <motion.div
                            className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-100 rounded-3xl -z-10 transform rotate-[20deg]"
                            aria-hidden="true"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                        />
                         <motion.div
                            className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-200 rounded-full -z-10"
                            aria-hidden="true"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                        />

                        <span className="text-amber-600 font-bold tracking-wider uppercase">Meet Your Expert</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mt-2">{content.expert.title}</h2>
                        
                        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                            {content.expert.bio}
                        </p>
                        
                        {/* Signature Block */}
                        <div className="mt-8">
                            <p className="font-serif italic text-5xl text-gray-700">{content.expert.name}</p>
                        </div>

                        <a
                            href="#contact"
                            onClick={handleSmoothScroll}
                            className="mt-10 inline-block bg-[#FDC100] text-black font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl hover:bg-[#FFA000] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-amber-500/50 btn-shine"
                        >
                            {content.expert.cta}
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MeetTheExpert;