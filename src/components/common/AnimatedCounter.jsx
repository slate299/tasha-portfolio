// src/components/common/AnimatedCounter.jsx
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedCounter = ({ value, duration = 2, className = "" }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value);
      const increment = end / (duration * 60);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return <span ref={ref} className={className}>{count}</span>;
};

export default AnimatedCounter;