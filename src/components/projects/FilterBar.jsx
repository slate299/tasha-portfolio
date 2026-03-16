// src/components/projects/FilterBar.jsx
import React from "react";
import { motion } from "framer-motion";

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedTech,
  setSelectedTech,
  allTechnologies,
  activeFilter,
  setActiveFilter,
  onClearAll,
}) => {
  return (
    <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 border border-border">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"></i>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-primary rounded-lg border border-border 
                     focus:border-accent focus:outline-none text-text-primary"
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

      {/* Active Filters */}
      {(activeFilter !== "all" || searchQuery || selectedTech) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-4 border-t border-border"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-text-secondary">Active filters:</span>

            {activeFilter !== "all" && (
              <FilterBadge onRemove={() => setActiveFilter("all")}>
                <i className="fa-solid fa-tag mr-1"></i>
                {activeFilter}
              </FilterBadge>
            )}

            {searchQuery && (
              <FilterBadge onRemove={() => setSearchQuery("")}>
                <i className="fa-solid fa-search mr-1"></i>"{searchQuery}"
              </FilterBadge>
            )}

            {selectedTech && (
              <FilterBadge onRemove={() => setSelectedTech("")}>
                <i className="fa-solid fa-code mr-1"></i>
                {selectedTech}
              </FilterBadge>
            )}

            <button
              onClick={onClearAll}
              className="px-3 py-1 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              Clear all
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const FilterBadge = ({ children, onRemove }) => (
  <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full flex items-center gap-2">
    {children}
    <button onClick={onRemove} className="hover:text-white">
      <i className="fa-solid fa-times"></i>
    </button>
  </span>
);

export default FilterBar;
