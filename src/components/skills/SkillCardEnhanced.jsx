// src/components/skills/SkillCardEnhanced.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { proficiencyConfig } from "../../data/skillsData";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const SkillCardEnhanced = ({ skill, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, isVisible } = useIntersectionObserver();
  const proficiency = proficiencyConfig[skill.level];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="skill-card group bg-secondary/50 backdrop-blur-sm rounded-xl 
                 overflow-hidden border border-border hover:border-accent/50 
                 transition-all duration-300"
    >
      <div className="p-6">
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onClick?.(skill)}
              className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent-dark/20 
                       rounded-xl flex items-center justify-center cursor-pointer
                       group-hover:from-accent/30 group-hover:to-accent-dark/30 
                       transition-all duration-300"
            >
              <i className={`${skill.icon} text-3xl text-accent`}></i>
            </motion.div>
            <div>
              <h3
                className="text-xl font-display font-semibold text-text-primary
                           group-hover:text-accent transition-colors"
              >
                {skill.name}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-secondary">
                  {skill.years} {skill.years === 1 ? "year" : "years"}
                </span>
                <span className="text-text-secondary">•</span>
                <span className={proficiency.color}>{proficiency.label}</span>
              </div>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center
                     hover:bg-accent/20 transition-colors"
            aria-label={isExpanded ? "Show less" : "Show more"}
          >
            <motion.i
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="fa-solid fa-chevron-down text-text-secondary"
            ></motion.i>
          </button>
        </div>

        {/* Proficiency Bar */}
        <div className="mb-4">
          <div className="h-2 bg-primary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isVisible ? { width: proficiency.width } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-full rounded-full ${proficiency.barColor}`}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {skill.description}
        </p>

        {/* Keywords/Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skill.keywords?.slice(0, 3).map((keyword, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-primary rounded-full text-xs text-text-secondary
                       hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
            >
              {keyword}
            </span>
          ))}
          {skill.keywords?.length > 3 && (
            <span className="px-2 py-1 bg-primary rounded-full text-xs text-accent">
              +{skill.keywords.length - 3}
            </span>
          )}
        </div>

        {/* Project Count (if any) */}
        {skill.projects?.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <i className="fa-solid fa-link text-accent"></i>
            <span>Used in {skill.projects.length} project(s)</span>
          </div>
        )}

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-border"
            >
              {/* Highlights */}
              {skill.highlights && skill.highlights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">
                    Key Highlights
                  </h4>
                  {skill.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <i className="fa-solid fa-check text-accent text-xs mt-1"></i>
                      <span className="text-text-secondary">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SkillCardEnhanced;
