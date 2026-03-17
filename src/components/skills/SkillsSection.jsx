// src/components/skills/SkillsSection.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import skillsData, {
  SkillCategory,
  proficiencyConfig,
} from "../../data/skillsData";
import skillCategories, { getCategoryById } from "../../data/skillsCategories";
import projectsData from "../../data/projectsData";
import CertificationsSection from "./CertificationsSection";
import LearningTimeline from "./LearningTimeline";
import SEOHelper from '../common/SEOHelper';
import PageTransition from '../common/PageTransition';

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(SkillCategory.FRONTEND);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState(null);

  // Get counts for each category
  const categoryCounts = useMemo(() => skillsData.getCategoryCounts(), []);

  // Update categories with counts
  const categoriesWithCounts = useMemo(() => {
    return skillCategories.map((cat) => ({
      ...cat,
      count: categoryCounts[cat.id] || 0,
    }));
  }, [categoryCounts]);

  // Get current category skills
  const currentSkills = useMemo(() => {
    return skillsData.getByCategory(activeCategory);
  }, [activeCategory]);

  // Filter skills by search and project
  const filteredSkills = useMemo(() => {
    let filtered = currentSkills;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (skill) =>
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query) ||
          skill.keywords?.some((k) => k.toLowerCase().includes(query)),
      );
    }

    if (selectedProjectFilter) {
      filtered = filtered.filter((skill) =>
        skill.projects?.includes(selectedProjectFilter),
      );
    }

    return filtered;
  }, [currentSkills, searchQuery, selectedProjectFilter]);

  // Get all projects for filtering
  const allProjects = useMemo(() => {
    return projectsData.getAll();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  // Get proficiency config with colors
  const getProficiencyStyle = (level) => {
    const config = proficiencyConfig[level];
    return {
      label: config.label,
      color: config.color,
      bgColor: config.bgColor,
      barColor: config.barColor,
      width: config.width,
    };
  };

return (
    <>
      <SEOHelper 
        title="Skills | Natasha Hinga - Technical Expertise"
        description="Full-stack development skills including React, Node.js, Python, Flutter, MongoDB, PostgreSQL, and more."
      />
      <PageTransition>
      <section id="skills" className="py-20 bg-primary relative overflow-hidden">

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-2 block">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
            {skillsData.metadata.title}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {skillsData.metadata.subtitle}
          </p>

          {/* Quick Stats */}
          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-secondary/50 backdrop-blur-sm px-5 py-2 rounded-full cursor-default"
            >
              <span className="text-accent font-bold">
                {skillsData.metadata.totalSkills}+
              </span>
              <span className="text-text-secondary ml-2">Technologies</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-secondary/50 backdrop-blur-sm px-5 py-2 rounded-full cursor-default"
            >
              <span className="text-accent font-bold">
                {skillsData.metadata.yearsCoding}+
              </span>
              <span className="text-text-secondary ml-2">Years Coding</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-secondary/50 backdrop-blur-sm px-5 py-2 rounded-full cursor-default"
            >
              <span className="text-accent font-bold">
                {skillsData.funStats.hackathonsParticipated}
              </span>
              <span className="text-text-secondary ml-2">Hackathons</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Category Tabs - Desktop */}
        <div className="hidden md:block mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categoriesWithCounts.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSelectedProjectFilter(null);
                  setSearchQuery("");
                }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    activeCategory === category.id
                      ? "text-primary shadow-lg"
                      : "text-text-secondary hover:text-accent"
                  }`}
                style={{
                  background:
                    activeCategory === category.id
                      ? `linear-gradient(135deg, ${category.color.split(" ")[0]}, ${category.color.split(" ")[2]})`
                      : "rgba(19, 19, 31, 0.5)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`${category.icon} mr-2`}></i>
                {category.name}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs
                  ${
                    activeCategory === category.id
                      ? "bg-white/20 text-white"
                      : "bg-secondary text-text-secondary"
                  }`}
                >
                  {category.count}
                </span>

                {/* Hover effect gradient */}
                {hoveredCategory === category.id &&
                  activeCategory !== category.id && (
                    <motion.div
                      layoutId="categoryHover"
                      className="absolute inset-0 rounded-full bg-accent/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Category Tabs - Mobile Dropdown */}
        <div className="md:hidden mb-8">
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="w-full bg-secondary/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <i
                className={`${getCategoryById(activeCategory)?.icon} text-accent`}
              ></i>
              <span className="text-text-primary font-medium">
                {getCategoryById(activeCategory)?.name}
              </span>
              <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-full text-xs">
                {categoryCounts[activeCategory]}
              </span>
            </div>
            <i
              className={`fa-solid fa-chevron-down transition-transform ${showAllCategories ? "rotate-180" : ""}`}
            ></i>
          </button>

          <AnimatePresence>
            {showAllCategories && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 bg-secondary/50 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                {categoriesWithCounts.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSelectedProjectFilter(null);
                      setSearchQuery("");
                      setShowAllCategories(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center justify-between
                      ${activeCategory === category.id ? "bg-accent/20" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <i
                        className={`${category.icon} ${activeCategory === category.id ? "text-accent" : "text-text-secondary"}`}
                      ></i>
                      <span
                        className={
                          activeCategory === category.id
                            ? "text-accent"
                            : "text-text-secondary"
                        }
                      >
                        {category.name}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-secondary rounded-full text-xs text-text-secondary">
                      {category.count}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="relative">
              <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"></i>
              <input
                type="text"
                placeholder={`Search ${getCategoryById(activeCategory)?.name} skills...`}
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

          {/* Project Filter Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-64"
          >
            <div className="relative">
              <i className="fa-solid fa-code-branch absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"></i>
              <select
                value={selectedProjectFilter || ""}
                onChange={(e) =>
                  setSelectedProjectFilter(e.target.value || null)
                }
                className="w-full pl-12 pr-10 py-3 bg-secondary/50 backdrop-blur-sm rounded-xl
                         border border-border focus:border-accent focus:outline-none
                         text-text-primary appearance-none cursor-pointer"
              >
                <option value="">All Projects</option>
                {allProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"></i>
            </div>
          </motion.div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedProjectFilter) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 justify-center mb-8"
          >
            <span className="text-sm text-text-secondary">Active filters:</span>

            {searchQuery && (
              <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full flex items-center gap-2">
                <i className="fa-solid fa-search"></i>"{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-white"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </span>
            )}

            {selectedProjectFilter && (
              <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full flex items-center gap-2">
                <i className="fa-solid fa-code-branch"></i>
                {allProjects.find((p) => p.id === selectedProjectFilter)?.title}
                <button
                  onClick={() => setSelectedProjectFilter(null)}
                  className="hover:text-white"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </span>
            )}

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedProjectFilter(null);
              }}
              className="px-3 py-1 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              Clear all
            </button>
          </motion.div>
        )}

        {/* Category Description */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-text-secondary">
            {getCategoryById(activeCategory)?.description}
          </p>
        </motion.div>

        {/* Skills Grid */}
        {filteredSkills.length > 0 ? (
          <motion.div
            key={activeCategory + searchQuery + selectedProjectFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill, index) => {
  const proficiency = getProficiencyStyle(skill.level);
  const isExpanded = expandedSkill === skill.id;

  return (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.05,
      }}
      whileHover={{ y: -5 }}
      layout
      className="bg-secondary/50 backdrop-blur-sm rounded-xl overflow-hidden
               border border-border hover:border-accent/50 
               transition-all duration-300 group"
    >
                  {/* Main Card Content */}
                  <div className="p-6">
                    {/* Skill Header with Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent-dark/20 
                                   rounded-xl flex items-center justify-center
                                   group-hover:from-accent/30 group-hover:to-accent-dark/30 
                                   transition-all duration-300"
                        >
                          <i
                            className={`${skill.icon} text-3xl text-accent`}
                          ></i>
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
                              {skill.years}{" "}
                              {skill.years === 1 ? "year" : "years"}
                            </span>
                            <span className="text-text-secondary">•</span>
                            <span className={proficiency.color}>
                              {proficiency.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Expand/Collapse Button */}
                      <button
                        onClick={() =>
                          setExpandedSkill(isExpanded ? null : skill.id)
                        }
                        className="w-8 h-8 rounded-full bg-primary flex items-center justify-center
                                 hover:bg-accent/20 transition-colors"
                      >
                        <i
                          className={`fa-solid fa-chevron-down transition-transform 
                                     ${isExpanded ? "rotate-180" : ""} text-text-secondary`}
                        ></i>
                      </button>
                    </div>

                    {/* Proficiency Bar */}
                    <div className="mb-4">
                      <div className="h-2.5 bg-primary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: proficiency.width }}
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

                    {/* Projects Count */}
                    {skill.projects && skill.projects.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <i className="fa-solid fa-link text-accent"></i>
                        <span>Used in {skill.projects.length} project(s)</span>
                      </div>
                    )}
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border"
                      >
                        <div className="p-6 bg-primary/30">
                          {/* Highlights */}
                          {skill.highlights && skill.highlights.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-star text-accent"></i>
                                Key Highlights
                              </h4>
                              <ul className="space-y-2">
                                {skill.highlights.map((highlight, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-sm text-text-secondary flex items-start gap-2"
                                  >
                                    <i className="fa-solid fa-check text-accent text-xs mt-1"></i>
                                    <span>{highlight}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Related Projects */}
                          {skill.projects && skill.projects.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-code-branch text-accent"></i>
                                Used in Projects
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {skill.projects.map((projectId, i) => {
                                  const project = allProjects.find(
                                    (p) => p.id === projectId,
                                  );
                                  if (!project) return null;

                                  return (
                                    <motion.button
                                      key={projectId}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: i * 0.05 }}
                                      onClick={() => {
                                        setSelectedProjectFilter(projectId);
                                        setExpandedSkill(null);
                                      }}
                                      className="px-3 py-1.5 bg-secondary rounded-lg text-xs
                                               hover:bg-accent/20 transition-colors group/project"
                                    >
                                      <span className="text-text-secondary group-hover/project:text-accent">
                                        {project.title}
                                      </span>
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          // No results state
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-magnifying-glass text-4xl text-text-secondary"></i>
            </div>
            <h3 className="text-2xl font-display font-semibold text-text-primary mb-3">
              No skills found
            </h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              {searchQuery
                ? `No skills matching "${searchQuery}" in this category`
                : selectedProjectFilter
                  ? `No skills used in the selected project`
                  : `No skills available in this category`}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedProjectFilter(null);
              }}
              className="btn-primary"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Load More Button (if needed) */}
        {filteredSkills.length > 9 && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline"
            >
              Load More Skills
              <i className="fa-solid fa-arrow-down ml-2"></i>
            </motion.button>
          </div>
        )}

        {/* Certifications & Learning Section */}
        <CertificationsSection />
        {/* Learning Timeline */}
        <LearningTimeline />
      </div>
    </section>
      </PageTransition>
    </>
  );
};

export default SkillsSection;
