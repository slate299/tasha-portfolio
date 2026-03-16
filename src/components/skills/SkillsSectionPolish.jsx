// src/components/skills/SkillsSectionPolish.jsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import skillsData, { SkillCategory } from "../../data/skillsData";
import skillCategories from "../../data/skillsCategories";
import SkillCardEnhanced from "./SkillCardEnhanced";
import CertificationsSection from "./CertificationsSection";
import LearningTimeline from "./LearningTimeline";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const SkillsSectionPolish = () => {
  const [activeCategory, setActiveCategory] = useState(SkillCategory.FRONTEND);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const { ref: headerRef, isVisible: headerVisible } =
    useIntersectionObserver();

  const categoryCounts = useMemo(() => skillsData.getCategoryCounts(), []);

  const currentSkills = useMemo(() => {
    let skills = skillsData.getByCategory(activeCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      skills = skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query) ||
          skill.keywords?.some((k) => k.toLowerCase().includes(query)),
      );
    }

    return skills;
  }, [activeCategory, searchQuery]);

  return (
    <section className="skills-section py-20 bg-primary relative overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-40 left-20 w-96 h-96 bg-accent-dark/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header with entrance animation */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-2 block">
            Technical Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Technologies I work with, from frontend to backend and data science
          </p>

          {/* Quick stats with hover effects */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {[
              { value: skillsData.metadata.totalSkills, label: "Technologies" },
              { value: skillsData.metadata.yearsCoding, label: "Years Coding" },
              {
                value: skillsData.funStats.hackathonsParticipated,
                label: "Hackathons",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-secondary/50 backdrop-blur-sm px-5 py-2 rounded-full
                         border border-border hover:border-accent/50 transition-all"
              >
                <span className="text-accent font-bold">{stat.value}+</span>
                <span className="text-text-secondary ml-2">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category tabs with improved mobile responsiveness */}
        <div className="mb-8">
          {/* Mobile dropdown */}
          <div className="md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-secondary/50 backdrop-blur-sm rounded-xl p-4 
                       flex items-center justify-between border border-border"
            >
              <span className="text-text-primary font-medium">
                {skillCategories.find((c) => c.id === activeCategory)?.name}
              </span>
              <motion.i
                animate={{ rotate: showFilters ? 180 : 0 }}
                className="fa-solid fa-chevron-down text-text-secondary"
              />
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-secondary/50 backdrop-blur-sm rounded-xl overflow-hidden"
                >
                  {skillCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setShowFilters(false);
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors
                        ${activeCategory === cat.id ? "bg-accent/20" : "hover:bg-accent/10"}`}
                    >
                      <span
                        className={
                          activeCategory === cat.id
                            ? "text-accent"
                            : "text-text-secondary"
                        }
                      >
                        {cat.name}
                      </span>
                      <span className="ml-2 text-xs text-text-secondary">
                        ({categoryCounts[cat.id]})
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop tabs */}
          <div className="hidden md:flex flex-wrap justify-center gap-2">
            {skillCategories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    activeCategory === cat.id
                      ? "bg-accent text-primary shadow-lg shadow-accent/30"
                      : "bg-secondary/50 text-text-secondary hover:text-accent hover:bg-accent/10"
                  }`}
              >
                <i className={`${cat.icon} mr-2`}></i>
                {cat.name}
                <span className="ml-2 text-xs opacity-75">
                  ({categoryCounts[cat.id]})
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"></i>
            <input
              type="text"
              placeholder={`Search ${skillCategories.find((c) => c.id === activeCategory)?.name} skills...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-secondary/50 backdrop-blur-sm rounded-xl
                       border border-border focus:border-accent focus:outline-none
                       text-text-primary placeholder:text-text-secondary/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            )}
          </div>
        </motion.div>

        {/* Skills grid */}
        {currentSkills.length > 0 ? (
          <motion.div
            key={activeCategory + searchQuery}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentSkills.map((skill) => (
              <SkillCardEnhanced
                key={skill.id}
                skill={skill}
                onClick={setSelectedSkill}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-magnifying-glass text-3xl text-text-secondary"></i>
            </div>
            <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
              No skills found
            </h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your search or select a different category
            </p>
            <button onClick={() => setSearchQuery("")} className="btn-outline">
              Clear search
            </button>
          </motion.div>
        )}

        {/* Certifications Section */}
        <CertificationsSection />

        {/* Learning Timeline */}
        <LearningTimeline />
      </div>
    </section>
  );
};

export default SkillsSectionPolish;
