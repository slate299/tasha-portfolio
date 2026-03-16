// src/components/projects/TechBadge.jsx
import React from "react";
import { motion } from "framer-motion";

// Technology icon mapping
const techIcons = {
  // Frontend
  React: "fa-brands fa-react",
  "React 18": "fa-brands fa-react",
  "Tailwind CSS": "fa-brands fa-css3-alt",
  "Framer Motion": "fa-solid fa-magic",
  JavaScript: "fa-brands fa-js",
  TypeScript: "fa-brands fa-typescript",
  "Next.js": "fa-brands fa-react",
  Vue: "fa-brands fa-vuejs",
  Angular: "fa-brands fa-angular",

  // Backend
  "Node.js": "fa-brands fa-node",
  Express: "fa-solid fa-bolt",
  Python: "fa-brands fa-python",
  Django: "fa-brands fa-python",
  MongoDB: "fa-solid fa-database",
  PostgreSQL: "fa-solid fa-database",
  MySQL: "fa-solid fa-database",
  Firebase: "fa-solid fa-fire",
  GraphQL: "fa-solid fa-project-diagram",

  // Mobile
  Flutter: "fa-brands fa-flutter",
  Dart: "fa-brands fa-dart",
  "React Native": "fa-brands fa-react",
  Swift: "fa-brands fa-swift",
  Kotlin: "fa-brands fa-android",

  // Tools & Cloud
  Git: "fa-brands fa-git-alt",
  GitHub: "fa-brands fa-github",
  Docker: "fa-brands fa-docker",
  AWS: "fa-brands fa-aws",
  Vercel: "fa-solid fa-cloud",
  Render: "fa-solid fa-cloud",
  Postman: "fa-solid fa-envelope",
  JWT: "fa-solid fa-lock",
  REST: "fa-solid fa-plug",

  // Default
  default: "fa-solid fa-code",
};

const TechBadge = ({ tech, size = "md" }) => {
  const getIcon = () => {
    // Check if tech string contains any of the keys
    for (const [key, icon] of Object.entries(techIcons)) {
      if (tech.includes(key)) {
        return icon;
      }
    }
    return techIcons.default;
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`${sizeClasses[size]} bg-primary rounded-full border border-accent/20 
                  hover:border-accent hover:bg-accent/10 transition-all duration-300
                  flex items-center gap-1.5 cursor-default group`}
    >
      <i
        className={`${getIcon()} text-accent group-hover:scale-110 transition-transform text-xs`}
      ></i>
      <span className="text-text-secondary group-hover:text-accent transition-colors">
        {tech}
      </span>
    </motion.div>
  );
};

export default TechBadge;
