// src/utils/imageOptimizer.js
// Image optimization utilities

// Generate responsive image sizes
export const generateSrcSet = (src, widths = [320, 640, 960, 1280]) => {
  if (!src || src.includes('placehold.co')) return '';
  
  const basePath = src.substring(0, src.lastIndexOf('.'));
  const extension = src.substring(src.lastIndexOf('.'));
  
  return widths
    .map(width => `${basePath}-${width}w${extension} ${width}w`)
    .join(', ');
};

// Check if image exists
export const checkImageExists = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

// Get optimal image size based on container
export const getOptimalImageSize = (containerWidth) => {
  if (containerWidth <= 640) return 640;
  if (containerWidth <= 960) return 960;
  if (containerWidth <= 1280) return 1280;
  return 1920;
};

// Generate WebP filename
export const toWebP = (src) => {
  if (!src) return src;
  return src.replace(/\.(jpg|jpeg|png)$/, '.webp');
};

// Generate low-quality placeholder
export const generateLQIP = (src) => {
  // In production, you'd generate actual tiny images
  // For now, return a consistent placeholder
  return 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23C77DFF\' opacity=\'0.1\'/%3E%3C/svg%3E';
};

export default {
  generateSrcSet,
  checkImageExists,
  getOptimalImageSize,
  toWebP,
  generateLQIP
};