// src/utils/lazyLoad.js
import { lazy } from 'react';

// Lazy load components that aren't needed immediately
export const lazyLoad = (importFunc, componentName) => {
  return lazy(() => {
    return importFunc().then(module => {
      // Add delay in development to see loading states
      if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ default: module[componentName] });
          }, 1000);
        });
      }
      return { default: module[componentName] };
    });
  });
};

// Prefetch components when user hovers over links
export const prefetchComponent = (importFunc) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = importFunc;
  document.head.appendChild(link);
};