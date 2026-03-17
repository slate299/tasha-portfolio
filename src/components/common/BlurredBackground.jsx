// src/components/common/BlurredBackground.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BlurredBackground = ({ src, children, opacity = 0.2 }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Blurred background image */}
      {src && (
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? opacity : 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover blur-2xl scale-110"
              onLoad={() => setLoaded(true)}
              loading="lazy"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BlurredBackground;