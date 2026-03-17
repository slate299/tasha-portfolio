// src/components/projects/ProjectImage.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ProjectImage = ({ src, alt, projectTitle, projectType }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate a consistent color based on project title
  const getGradientColors = (title) => {
    const colors = [
      "from-accent to-accent-dark",
      "from-blue-500 to-purple-500",
      "from-green-500 to-teal-500",
      "from-orange-500 to-pink-500",
      "from-purple-500 to-indigo-500",
    ];

    const hash = title
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Get icon based on project type
  const getProjectIcon = () => {
    switch (projectType) {
      case "fullstack":
        return "fa-solid fa-layer-group";
      case "backend":
        return "fa-solid fa-server";
      case "mobile":
        return "fa-solid fa-mobile-screen";
      case "hackathon":
        return "fa-solid fa-trophy";
      default:
        return "fa-solid fa-code";
    }
  };

  if (error || !src) {
    return (
      <div
        ref={imgRef}
        className={`w-full h-full bg-gradient-to-br ${getGradientColors(projectTitle)} 
                      flex items-center justify-center relative overflow-hidden group`}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        {/* Animated icon */}
        <motion.i
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`${getProjectIcon()} text-6xl text-white/20 absolute`}
        ></motion.i>

        {/* Project initial with animation */}
        <motion.span
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-8xl font-display font-bold text-white/10"
        >
          {projectTitle.charAt(0)}
        </motion.span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className="relative w-full h-full bg-secondary overflow-hidden">
      {/* Loading spinner */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 backdrop-blur-sm z-20">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-12 h-12 border-2 border-accent/30 rounded-full"></div>
            {/* Inner spinning ring */}
            <div className="absolute top-0 left-0 w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            {/* Pulse dot */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full"
            />
          </div>
        </div>
      )}

      {/* Main image with blur-up effect */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: loaded ? 1 : 0,
            scale: loaded ? 1 : 1.1,
          }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            loading="lazy"
          />

          {/* Subtle overlay gradient on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent pointer-events-none"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ProjectImage;