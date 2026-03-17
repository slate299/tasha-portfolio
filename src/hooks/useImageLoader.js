// src/hooks/useImageLoader.js
import { useState, useEffect } from 'react';

export const useImageLoader = (src) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!src) {
      setError(true);
      return;
    }

    setLoaded(false);
    setError(false);
    setProgress(0);

    const img = new Image();
    
    // Simulate progress (not perfect but gives user feedback)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 100);

    img.onload = () => {
      clearInterval(progressInterval);
      setProgress(100);
      setLoaded(true);
    };

    img.onerror = () => {
      clearInterval(progressInterval);
      setError(true);
      setLoaded(false);
    };

    img.src = src;

    return () => {
      clearInterval(progressInterval);
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, error, progress };
};

export default useImageLoader;