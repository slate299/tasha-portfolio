// src/utils/performance.js
// Performance monitoring utilities

// Measure component render time
export const measureRenderTime = (componentName) => {
  if (process.env.NODE_ENV === "development") {
    const start = performance.now();
    return () => {
      const end = performance.now();
      console.log(
        `⏱️ ${componentName} rendered in ${(end - start).toFixed(2)}ms`,
      );
    };
  }
  return () => {};
};

// Debounce function for search input
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Check if element is in viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Memory usage check (optional)
export const checkMemoryUsage = () => {
  if (performance.memory) {
    console.log(
      "💾 Memory usage:",
      Math.round(performance.memory.usedJSHeapSize / 1048576),
      "MB",
    );
  }
};
