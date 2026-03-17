// src/components/common/FloatingElement.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FloatingElement = ({ children, amplitude = 10, duration = 3, delay = 0, className = "" }) => {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;