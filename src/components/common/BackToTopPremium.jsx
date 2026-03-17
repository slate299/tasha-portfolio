// src/components/common/BackToTopPremium.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const BackToTopPremium = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress for different effects
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.8]);
  
  // Circle progress calculations
  const size = 60;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0]
  );

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: 100 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="fixed bottom-24 right-8 z-40"
        >
          {/* Main Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ scale, rotate }}
            className="relative w-16 h-16 group cursor-pointer"
            aria-label="Back to top"
          >
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-accent/20 blur-md"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Progress Circle SVG */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              {/* Background Circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(199, 125, 255, 0.2)"
                strokeWidth={strokeWidth}
                className="transition-all duration-300"
              />
              
              {/* Progress Circle */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                style={{ strokeDashoffset, rotate: 90 }}
                strokeDasharray={circumference}
              />
              
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C77DFF" />
                  <stop offset="100%" stopColor="#9D4EDD" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Circle with Arrow */}
            <div className="absolute inset-2 bg-secondary rounded-full 
                          flex items-center justify-center
                          border-2 border-accent/30 group-hover:border-accent 
                          transition-all duration-300
                          shadow-lg shadow-accent/20">
              {/* Arrow Icon */}
              <motion.i
                className="fa-solid fa-arrow-up text-accent text-xl
                          group-hover:-translate-y-1 transition-all duration-300"
                animate={{
                  y: [0, -3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Percentage Indicator */}
            <motion.div 
              style={{ opacity }}
              className="absolute -top-8 right-0 bg-secondary/90 backdrop-blur-sm
                       px-2 py-1 rounded-lg text-xs font-medium
                       border border-accent/30 shadow-lg"
            >
              <span className="text-accent">
                {Math.round(scrollYProgress.get() * 100)}%
              </span>
            </motion.div>
          </motion.button>

          {/* Hover Tooltip with Instructions */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2
                     bg-secondary/95 backdrop-blur-sm px-3 py-2 rounded-lg
                     border border-accent/30 shadow-lg pointer-events-none
                     whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-circle-arrow-up text-accent"></i>
              <span className="text-text-primary text-sm font-medium">Back to Top</span>
              <span className="text-text-secondary text-xs">(Click or press Home)</span>
            </div>
            {/* Arrow pointing to button */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 
                          w-3 h-3 bg-secondary rotate-45 border-r border-t border-accent/30">
            </div>
          </motion.div>

          {/* Floating Particles (for extra flair) */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full"
              style={{
                top: `${20 + i * 30}%`,
                left: `${-10 - i * 10}px`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTopPremium;