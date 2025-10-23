import React from 'react';
import { motion } from 'framer-motion';
import { usePopupContext } from '../contexts/PopupContext';
import { CheckIcon } from './icons';

const Recruitment: React.FC = () => {
    const { openCalendly } = usePopupContext();

    const handleRegisterClick = () => {
        openCalendly();
    };

    const listItems = [
        "Tax Training & Mentorship",
        "Marketing Assistant",
        "Tax Software & Mobile App",
        "Bank Products"
    ];

    return (
        <section id="recruitment" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Text Column */}
                    <motion.div
                        className="order-2 md:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800">We're Looking For You</h2>
                        <div className="mt-4 inline-block bg-gradient-to-r from-white via-white to-yellow-100 font-bold px-4 py-2 rounded-md shadow-md border border-gray-200">
                            <h3 className="text-xl tracking-wide uppercase text-amber-700">Train to Become a Tax Preparer</h3>
                        </div>
                        
                        <p className="mt-8 text-xl font-bold text-gray-700">INCLUDES:</p>
                        <ul className="mt-4 space-y-4">
                            {listItems.map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-center gap-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                >
                                    <CheckIcon className="w-6 h-6 text-amber-500 flex-shrink-0" />
                                    <span className="text-lg text-gray-600">{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.button
                            onClick={handleRegisterClick}
                            className="mt-10 inline-block bg-[#FDC100] text-black font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl hover:bg-[#FFA000] transition-all duration-300 transform hover:-translate-y-1 btn-shine"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Register To Learn More
                        </motion.button>
                    </motion.div>

                    {/* Image Column */}
                    <motion.div
                        className="relative rounded-lg overflow-hidden shadow-2xl h-96 md:h-[500px] order-1 md:order-2 group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <img 
                            src="https://geotapmedia.com/VictoryDiamondFinancialServices/images/bankproduct.png" 
                            alt="Recruitment flyer for tax preparers" 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Recruitment;