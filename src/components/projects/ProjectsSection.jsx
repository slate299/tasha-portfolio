// src/components/projects/ProjectsSection.jsx - Complete enhanced version
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData, { ProjectStatus } from "../../data/projectsData";
import ProjectImage from "./ProjectImage";
import TechBadge from "./TechBadge";
import {
  trackProjectView,
  trackProjectClick,
  trackFilterUsage,
  trackSearchQuery,
} from "../../utils/analytics";
import { measureRenderTime } from "../../utils/performance";
import { getStatusAriaLabel } from "../../utils/accessibility";
import ScreenReaderAnnouncer from "../common/ScreenReaderAnnouncer";

// IMPORT SKILLS DATA FOR PROJECT-SKILL INTEGRATION
import skillsData, { projectSkillsMap } from "../../data/skillsData";

import ProjectAnalytics from "./ProjectAnalytics";

const ProjectsSection = () => {
  const endMeasure = measureRenderTime("ProjectsSection");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recent"); // ← ADD THIS
  const [isLoading, setIsLoading] = useState(true); // ← ADD THIS
  const [announcement, setAnnouncement] = useState("");

  // Get all unique technologies for filter dropdown
  const allTechnologies = useMemo(() => projectsData.getAllTechnologies(), []);

  // Get counts for each category
  const counts = useMemo(() => projectsData.getCountByStatus(), []);

  // Filter and sort projects based on active filter, search, technology, and sort option
  const getFilteredProjects = () => {
    let filtered = [];

    // First filter by category
    switch (activeFilter) {
      case "featured":
        filtered = [projectsData.featured];
        break;
      case "completed":
        filtered = projectsData.completed;
        break;
      case "team":
        filtered = projectsData.teamProjects;
        break;
      case "in-progress":
        filtered = projectsData.inProgress;
        break;
      default:
        filtered = projectsData.getAll();
    }

    // Then filter by technology if selected
    if (selectedTech) {
      filtered = filtered.filter((project) =>
        Object.values(project.tech)
          .flat()
          .some((tech) =>
            tech.toLowerCase().includes(selectedTech.toLowerCase()),
          ),
      );
    }

    // Finally apply search if query exists
    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm) ||
          project.subtitle.toLowerCase().includes(searchTerm) ||
          project.description.short.toLowerCase().includes(searchTerm) ||
          project.role.toLowerCase().includes(searchTerm) ||
          Object.values(project.tech)
            .flat()
            .some((tech) => tech.toLowerCase().includes(searchTerm)),
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "recent":
        // Sort by year (newest first)
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "oldest":
        // Sort by year (oldest first)
        filtered.sort((a, b) => (a.year || 0) - (b.year || 0));
        break;
      case "alphabetical":
        // Sort by title A-Z
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "reverse-alpha":
        // Sort by title Z-A
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "views":
        // Sort by popularity (if we had view counts)
        // This would use analytics data
        break;
      default:
        // Default to recent
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  useEffect(() => {
    endMeasure(); // Logs render time in console
  }, []);

  // Simulate loading (remove this in production)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, selectedTech]);
  // Track project views when they become visible
  useEffect(() => {
    if (currentProjects.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const projectId = entry.target.dataset.projectId;
              const project = filteredProjects.find((p) => p.id === projectId);
              if (project) {
                trackProjectView(projectId, project.title);
              }
            }
          });
        },
        { threshold: 0.5 },
      );

      // Observe all project cards
      document.querySelectorAll("[data-project-id]").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [currentProjects, filteredProjects]);

  // Announce filter changes to screen readers
  useEffect(() => {
    const filterName =
      projectsData.categories.find((c) => c.id === activeFilter)?.name || "all";
    const message = `Showing ${currentProjects.length} ${filterName} projects`;
    setAnnouncement(message);
  }, [activeFilter, currentProjects.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="projects"
      className="py-20 bg-primary relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-20 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent-dark rounded-full blur-3xl"></div>
      </div>

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
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
            {projectsData.metadata.title}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {projectsData.metadata.subtitle}
          </p>

          {/* Stats Bar with Counts */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-secondary/50 backdrop-blur-sm px-6 py-3 rounded-xl cursor-pointer"
              onClick={() => setActiveFilter("all")}
            >
              <div className="text-2xl font-bold text-accent">{counts.all}</div>
              <div className="text-sm text-text-secondary">Total Projects</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-secondary/50 backdrop-blur-sm px-6 py-3 rounded-xl cursor-pointer"
              onClick={() => setActiveFilter("featured")}
            >
              <div className="text-2xl font-bold text-accent">
                {counts.featured}
              </div>
              <div className="text-sm text-text-secondary">Featured</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-secondary/50 backdrop-blur-sm px-6 py-3 rounded-xl cursor-pointer"
              onClick={() => setActiveFilter("completed")}
            >
              <div className="text-2xl font-bold text-accent">
                {counts.completed}
              </div>
              <div className="text-sm text-text-secondary">Completed</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-secondary/50 backdrop-blur-sm px-6 py-3 rounded-xl cursor-pointer"
              onClick={() => setActiveFilter("team")}
            >
              <div className="text-2xl font-bold text-accent">
                {counts.team}
              </div>
              <div className="text-sm text-text-secondary">Team Projects</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-secondary/50 backdrop-blur-sm px-6 py-3 rounded-xl cursor-pointer"
              onClick={() => setActiveFilter("in-progress")}
            >
              <div className="text-2xl font-bold text-accent">
                {counts.inProgress}
              </div>
              <div className="text-sm text-text-secondary">In Progress</div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-center bg-secondary/50 backdrop-blur-sm px-6 py-3 rounded-xl cursor-pointer"
              onClick={() => setActiveFilter("all")}
              aria-label={`Show all projects, currently ${counts.all} total`}
              aria-pressed={activeFilter === "all"}
            ></motion.button>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 border border-border">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden w-full flex items-center justify-between p-2 text-text-primary"
            >
              <span className="font-medium">Filter Projects</span>
              <i
                className={`fa-solid fa-chevron-down transition-transform ${showFilters ? "rotate-180" : ""}`}
              ></i>
            </button>

            {/* Filter Controls */}
            <div
              className={`${showFilters ? "block" : "hidden"} md:block mt-4 md:mt-0`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"></i>
                  <input
                    type="text"
                    placeholder="Search projects by name, tech, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-primary rounded-lg border border-border 
             focus:border-accent focus:outline-none text-text-primary"
                    aria-label="Search projects"
                    aria-describedby="search-instructions"
                  />
                  <span id="search-instructions" className="sr-only">
                    Type to filter projects by title, technology, or description
                  </span>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent"
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  )}
                </div>

                {/* Technology Filter */}
                <div className="md:w-64 relative">
                  <i className="fa-solid fa-code absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"></i>
                  <select
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-primary rounded-lg border border-border 
                             focus:border-accent focus:outline-none text-text-primary appearance-none"
                  >
                    <option value="">All Technologies</option>
                    {allTechnologies.map((tech) => (
                      <option key={tech} value={tech}>
                        {tech}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"></i>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(activeFilter !== "all" || searchQuery || selectedTech) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-text-secondary">
                    Active filters:
                  </span>

                  {activeFilter !== "all" && (
                    <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full flex items-center gap-2">
                      <i className="fa-solid fa-tag"></i>
                      {
                        projectsData.categories.find(
                          (c) => c.id === activeFilter,
                        )?.name
                      }
                      <button
                        onClick={() => setActiveFilter("all")}
                        className="hover:text-white"
                      >
                        <i className="fa-solid fa-times"></i>
                      </button>
                    </span>
                  )}

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

                  {selectedTech && (
                    <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full flex items-center gap-2">
                      <i className="fa-solid fa-code"></i>
                      {selectedTech}
                      <button
                        onClick={() => setSelectedTech("")}
                        className="hover:text-white"
                      >
                        <i className="fa-solid fa-times"></i>
                      </button>
                    </span>
                  )}

                  <button
                    onClick={() => {
                      setActiveFilter("all");
                      setSearchQuery("");
                      setSelectedTech("");
                    }}
                    className="px-3 py-1 text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results Count and Sort Options */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <p className="text-text-secondary order-2 sm:order-1">
            Showing{" "}
            <span className="text-accent font-semibold">
              {currentProjects.length}
            </span>{" "}
            of{" "}
            <span className="text-accent font-semibold">
              {filteredProjects.length}
            </span>{" "}
            projects
          </p>

          {/* Enhanced Sort Options */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <i className="fa-solid fa-arrow-down-wide-short text-accent"></i>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-secondary border border-border rounded-lg px-4 py-2 text-text-primary text-sm 
                 focus:border-accent focus:outline-none cursor-pointer hover:border-accent/50 transition-colors"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
              <option value="reverse-alpha">Alphabetical (Z-A)</option>
              <option value="views">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <SkeletonLoader />
        ) : currentProjects.length > 0 ? (
          <>
            <motion.div
              key={`${activeFilter}-${searchQuery}-${selectedTech}-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Featured Project - Full Width on first position */}
              {activeFilter === "all" &&
                !searchQuery &&
                !selectedTech &&
                currentPage === 1 && (
                  <motion.div
                    variants={itemVariants}
                    className="col-span-1 md:col-span-2 lg:col-span-3"
                    onHoverStart={() =>
                      setHoveredProject(projectsData.featured.id)
                    }
                    onHoverEnd={() => setHoveredProject(null)}
                  >
                    <FeaturedProjectCard
                      project={projectsData.featured}
                      isHovered={hoveredProject === projectsData.featured.id}
                    />
                  </motion.div>
                )}

              {/* Other Projects */}
              {currentProjects
                .filter(
                  (p) =>
                    !(
                      activeFilter === "all" &&
                      !searchQuery &&
                      !selectedTech &&
                      currentPage === 1 &&
                      p.id === projectsData.featured.id
                    ),
                )
                .map((project) => (
                  <motion.div
                    key={project.id}
                    data-project-id={project.id}
                    variants={itemVariants}
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProjectCard
                      project={project}
                      isHovered={hoveredProject === project.id}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center gap-2 mt-12"
              >
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center
                    ${
                      currentPage === 1
                        ? "bg-secondary text-text-secondary cursor-not-allowed"
                        : "bg-secondary text-text-primary hover:bg-accent/20 hover:text-accent transition-colors"
                    }`}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show first, last, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                          ${
                            currentPage === pageNum
                              ? "bg-accent text-primary font-semibold"
                              : "bg-secondary text-text-primary hover:bg-accent/20 hover:text-accent"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <span key={i} className="text-text-secondary">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center
                    ${
                      currentPage === totalPages
                        ? "bg-secondary text-text-secondary cursor-not-allowed"
                        : "bg-secondary text-text-primary hover:bg-accent/20 hover:text-accent transition-colors"
                    }`}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </motion.div>
            )}
          </>
        ) : (
          // No Results State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-search text-3xl text-text-secondary"></i>
            </div>
            <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
              No projects found
            </h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
                setSelectedTech("");
              }}
              className="btn-primary"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* View All Link - Only show when not on 'all' filter */}
        {activeFilter !== "all" && !searchQuery && !selectedTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter("all")}
              className="text-accent hover:text-accent-dark transition-colors font-medium inline-flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-left"></i>
              View All Projects
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
      <ProjectAnalytics />

      {/* Accessibility - ADD THESE TWO LINES */}
      <ScreenReaderAnnouncer />
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </section>
  );
};

// ============================================
// FEATURED PROJECT CARD COMPONENT
// ============================================
const FeaturedProjectCard = ({ project, isHovered }) => {
  // Get all tech stack for display
  const allTech = [
    ...(project.tech.frontend || []),
    ...(project.tech.backend || []),
    ...(project.tech.tools || []),
  ];

  return (
    <motion.div
      animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
      className="bg-gradient-to-br from-secondary to-primary rounded-2xl p-6 border border-accent/20 
                shadow-xl relative overflow-hidden group"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
        animate={
          isHovered ? { scale: 1.5, opacity: 0.8 } : { scale: 1, opacity: 0.5 }
        }
        transition={{ duration: 0.5 }}
      ></motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Content */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <motion.span
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full"
            >
              <i className="fa-solid fa-star mr-1"></i>
              FEATURED PROJECT
            </motion.span>
            <span className="px-3 py-1 bg-secondary text-text-secondary text-xs rounded-full">
              {project.year}
            </span>
          </div>

          <motion.h3
            animate={isHovered ? { x: 5 } : { x: 0 }}
            className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-2"
          >
            {project.title}
          </motion.h3>
          <p className="text-accent mb-3">{project.subtitle}</p>
          <p className="text-text-secondary mb-4 leading-relaxed">
            {project.description.medium}
          </p>

          {/* Client/Role */}
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
            <span className="text-text-secondary bg-secondary/50 px-3 py-1 rounded-full">
              <i className="fa-solid fa-user-tie mr-2 text-accent"></i>
              {project.client || "Solo Project"}
            </span>
            <span className="text-text-secondary bg-secondary/50 px-3 py-1 rounded-full">
              <i className="fa-solid fa-code mr-2 text-accent"></i>
              {project.role}
            </span>
          </div>

          {/* Tech Stack with Icons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {allTech.slice(0, 5).map((tech, i) => (
              <TechBadge key={i} tech={tech} size="sm" />
            ))}
            {allTech.length > 5 && (
              <span className="px-3 py-1 bg-primary text-accent text-xs rounded-full">
                +{allTech.length - 5} more
              </span>
            )}
          </div>

          {/* Metrics */}
          <div className="flex gap-6 mb-6">
            {project.outcomes.metrics.map((metric, i) => (
              <motion.div
                key={i}
                className="text-center"
                animate={isHovered ? { y: -2 } : { y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-2xl font-bold text-accent">
                  {metric.value}
                </div>
                <div className="text-xs text-text-secondary flex items-center gap-1">
                  <i className={metric.icon}></i>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-sm"
            >
              <i className="fa-solid fa-globe mr-2"></i>
              Live Demo
            </motion.a>
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline text-sm"
            >
              <i className="fa-brands fa-github mr-2"></i>
              GitHub
            </motion.a>
          </div>
        </div>

        {/* Image/Visual Placeholder */}
        <motion.div
          animate={
            isHovered ? { scale: 1.02, rotate: 1 } : { scale: 1, rotate: 0 }
          }
          className="relative h-64 lg:h-80 rounded-xl overflow-hidden shadow-2xl"
        >
          <ProjectImage
            src={project.media?.screenshots?.[0]}
            alt={project.title}
            projectTitle={project.title}
            projectType={project.type}
          />

          {/* Overlay with tech stack */}
          <motion.div
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// ============================================
// REGULAR PROJECT CARD COMPONENT
// ============================================
const ProjectCard = ({ project, isHovered, onClick }) => {
  // Determine status color and icon
  const getStatusBadge = () => {
    switch (project.status) {
      case ProjectStatus.COMPLETED:
        return {
          color: "bg-green-500/20 text-green-400",
          icon: "fa-solid fa-check-circle",
          label: "Completed",
        };
      case ProjectStatus.TEAM:
        return {
          color: "bg-blue-500/20 text-blue-400",
          icon: "fa-solid fa-users",
          label: "Team Project",
        };
      case ProjectStatus.IN_PROGRESS:
        return {
          color: "bg-yellow-500/20 text-yellow-400",
          icon: "fa-solid fa-rocket",
          label: "In Progress",
        };
      case ProjectStatus.BACKEND:
        return {
          color: "bg-purple-500/20 text-purple-400",
          icon: "fa-solid fa-server",
          label: "Backend API",
        };
      default:
        return {
          color: "bg-accent/20 text-accent",
          icon: "fa-solid fa-code",
          label: "Project",
        };
    }
  };

  const badge = getStatusBadge();

  // Get all tech stack for display
  const allTech = Object.values(project.tech).flat();

  return (
    <motion.div
      onClick={onClick}
      animate={isHovered ? { y: -5, scale: 1.02 } : { y: 0, scale: 1 }}
      className="bg-secondary rounded-xl overflow-hidden border border-border hover:border-accent/50 
            transition-all duration-300 cursor-pointer group h-full flex flex-col"
      role="article"
      aria-label={getStatusAriaLabel(project.status, project.title)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <ProjectImage
          src={project.media?.screenshots?.[0]}
          alt={project.title}
          projectTitle={project.title}
          projectType={project.type}
        />

        {/* Status Badge Overlay */}
        <motion.div
          animate={isHovered ? { x: 0 } : { x: "100%" }}
          className={`absolute top-3 right-3 ${badge.color} px-3 py-1 rounded-full text-xs font-medium 
                     flex items-center gap-1 backdrop-blur-sm shadow-lg`}
        >
          <i className={badge.icon}></i>
          <span>{badge.label}</span>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-display font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-accent mb-2">{project.subtitle}</p>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {project.description.short}
        </p>

        {/* Tech Stack Preview with Icons */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {allTech.slice(0, 3).map((tech, i) => (
            <TechBadge key={i} tech={tech} size="sm" />
          ))}
          {allTech.length > 3 && (
            <span className="px-2 py-1 bg-primary text-accent text-xs rounded-full">
              +{allTech.length - 3}
            </span>
          )}
        </div>

        {/* Role & Links */}
        <div className="flex justify-between items-center text-sm mt-auto">
          <span className="text-text-secondary">
            <i className="fa-solid fa-user mr-1 text-accent"></i>
            {project.role.split(" ")[0]}
          </span>
          <div className="flex gap-3">
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  trackProjectClick(project.id, project.title, "github"); // ← ADD THIS
                }}
                whileHover={{ scale: 1.2, color: "#C77DFF" }}
                className="text-text-secondary hover:text-accent transition-colors"
              >
                <i className="fa-brands fa-github text-lg"></i>
              </motion.a>
            )}

            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  trackProjectClick(project.id, project.title, "live"); // ← ADD THIS
                }}
                whileHover={{ scale: 1.2, color: "#C77DFF" }}
                className="text-text-secondary hover:text-accent transition-colors"
              >
                <i className="fa-solid fa-globe text-lg"></i>
              </motion.a>
            )}

            {project.links.api && (
              <motion.a
                href={project.links.api}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  trackProjectClick(project.id, project.title, "api"); // ← ADD THIS
                }}
                whileHover={{ scale: 1.2, color: "#C77DFF" }}
                className="text-text-secondary hover:text-accent transition-colors"
              >
                <i className="fa-solid fa-server text-lg"></i>
              </motion.a>
            )}
          </div>
        </div>
        {/* ===== ADD SKILL BADGES HERE ===== */}
        {/* Skill Badges - Shows which skills are used in this project */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-code text-accent text-xs"></i>
            <span className="text-xs text-text-secondary">Key Skills:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {projectSkillsMap[project.id]?.slice(0, 4).map((skillId) => {
              // Find the skill details from skillsData
              const allSkills = skillsData.getAllSkills();
              const skill = allSkills.find((s) => s.id === skillId);
              if (!skill) return null;

              return (
                <motion.span
                  key={skillId}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="px-2 py-0.5 bg-primary rounded-full text-xs 
                             text-text-secondary hover:text-accent hover:bg-accent/10 
                             transition-colors cursor-default"
                >
                  {skill.name}
                </motion.span>
              );
            })}
            {projectSkillsMap[project.id]?.length > 4 && (
              <span className="px-2 py-0.5 bg-primary rounded-full text-xs text-accent">
                +{projectSkillsMap[project.id].length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// PROJECT MODAL COMPONENT
// ============================================
const ProjectModal = ({ project, onClose }) => {
  // Get all tech stack
  const allTech = Object.values(project.tech).flat();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-secondary rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-accent/30"
      >
        {/* Modal Header with Image */}
        <div className="relative h-64 bg-gradient-to-br from-accent/20 to-accent-dark/20">
          <ProjectImage
            src={project.media?.screenshots?.[0]}
            alt={project.title}
            projectTitle={project.title}
            projectType={project.type}
          />

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/80 backdrop-blur-sm 
                     flex items-center justify-center hover:bg-accent/20 transition-colors
                     border border-white/10"
          >
            <i className="fa-solid fa-times text-text-secondary"></i>
          </motion.button>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-text-primary mb-2">
                {project.title}
              </h2>
              <p className="text-accent text-lg">{project.subtitle}</p>
            </div>
          </div>

          {/* Full description */}
          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-text-secondary whitespace-pre-line leading-relaxed">
              {project.description.full || project.description.medium}
            </p>
          </div>

          {/* Tech stack in detail */}
          <div className="mb-8">
            <h4 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-code text-accent"></i>
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {allTech.map((tech, i) => (
                <TechBadge key={i} tech={tech} size="md" />
              ))}
            </div>
          </div>

          {/* Features */}
          {project.features && (
            <div className="mb-8">
              <h4 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-list-check text-accent"></i>
                Key Features
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-text-secondary flex items-start gap-2 bg-primary/30 p-3 rounded-lg"
                  >
                    <i className="fa-solid fa-check text-accent mt-1"></i>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Team/Contributions for team projects */}
          {project.team && (
            <div className="mb-8">
              <h4 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-users text-accent"></i>
                Team
              </h4>
              <div className="bg-primary/30 p-4 rounded-lg">
                <p className="text-text-secondary">
                  <span className="text-accent font-medium">
                    {project.team.name}
                  </span>{" "}
                  - {project.team.role}
                </p>
                {project.team.github && (
                  <a
                    href={project.team.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-accent transition-colors inline-flex items-center gap-2 mt-2"
                  >
                    <i className="fa-brands fa-github"></i>
                    GitHub Profile
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Contributions for hackathon projects */}
          {project.contributions && (
            <div className="mb-8">
              <h4 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-code-branch text-accent"></i>
                My Contributions
              </h4>
              <ul className="space-y-2">
                {project.contributions.map((contribution, i) => (
                  <li
                    key={i}
                    className="text-text-secondary flex items-start gap-2"
                  >
                    <i className="fa-solid fa-arrow-right text-accent text-sm mt-1"></i>
                    <span>{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                <i className="fa-solid fa-globe mr-2"></i>
                Live Demo
              </motion.a>
            )}
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                <i className="fa-brands fa-github mr-2"></i>
                GitHub Repository
              </motion.a>
            )}
            {project.links.api && (
              <motion.a
                href={project.links.api}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                <i className="fa-solid fa-server mr-2"></i>
                API Endpoint
              </motion.a>
            )}
            {project.links.documentation && (
              <motion.a
                href={project.links.documentation}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                <i className="fa-solid fa-book mr-2"></i>
                Documentation
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// SKELETON LOADER COMPONENT
// ============================================
const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-secondary rounded-xl overflow-hidden animate-pulse"
        >
          {/* Image skeleton */}
          <div className="h-48 bg-primary/50"></div>

          {/* Content skeleton */}
          <div className="p-5">
            <div className="h-5 bg-primary/50 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-primary/50 rounded w-1/2 mb-3"></div>
            <div className="h-3 bg-primary/50 rounded w-full mb-2"></div>
            <div className="h-3 bg-primary/50 rounded w-2/3 mb-4"></div>

            {/* Tech stack skeleton */}
            <div className="flex gap-1.5 mb-4">
              <div className="h-6 bg-primary/50 rounded-full w-16"></div>
              <div className="h-6 bg-primary/50 rounded-full w-16"></div>
              <div className="h-6 bg-primary/50 rounded-full w-16"></div>
            </div>

            {/* Footer skeleton */}
            <div className="flex justify-between">
              <div className="h-4 bg-primary/50 rounded w-20"></div>
              <div className="flex gap-3">
                <div className="h-4 bg-primary/50 rounded w-4"></div>
                <div className="h-4 bg-primary/50 rounded w-4"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Add this small helper component at the end
const FilterBadge = ({ children, onRemove }) => (
  <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full flex items-center gap-2">
    {children}
    {onRemove && (
      <button onClick={onRemove} className="hover:text-white transition-colors">
        <i className="fa-solid fa-times"></i>
      </button>
    )}
  </span>
);

export default ProjectsSection;
