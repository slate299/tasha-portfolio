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
                      flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <i
          className={`${getProjectIcon()} text-5xl text-white/30 absolute`}
        ></i>

        <span className="text-7xl font-display font-bold text-white/20">
          {projectTitle.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className="relative w-full h-full bg-secondary">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
        </div>
      )}
      {isInView && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ProjectImage;
