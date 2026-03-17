// src/hooks/useScrollAnimation.js
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = (threshold = 0.2, triggerOnce = true) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls, inView };
};

export default useScrollAnimation;