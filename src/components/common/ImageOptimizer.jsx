// src/components/common/ImageOptimizer.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ImageOptimizer = ({ src, alt, className, width, height, priority = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate WebP version if available
  const getOptimizedSrc = () => {
    if (!src) return src;
    // Add query params for image optimization if using a service
    if (src.includes('cloudinary.com')) {
      return src.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return src;
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: width / height }}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-secondary animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-secondary via-primary to-secondary shimmer"></div>
        </div>
      )}
      
      <motion.img
        src={getOptimizedSrc()}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading={priority ? 'eager' : 'lazy'}
        className="w-full h-full object-cover"
        width={width}
        height={height}
      />
      
      {error && (
        <div className="absolute inset-0 bg-secondary flex items-center justify-center">
          <i className="fa-solid fa-image text-text-secondary/30 text-4xl"></i>
        </div>
      )}
    </div>
  );
};

export default ImageOptimizer;