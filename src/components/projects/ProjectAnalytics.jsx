// src/components/projects/ProjectAnalytics.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAnalyticsReport, clearAnalytics } from "../../utils/analytics";

const ProjectAnalytics = () => {
  const [report, setReport] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Load analytics data
  const loadReport = () => {
    setReport(getAnalyticsReport());
  };

  // Handle clear with confirmation
  const handleClear = () => {
    clearAnalytics();
    loadReport();
    setShowConfirmation(false);
  };

  // Load on mount and when opened
  useEffect(() => {
    if (showAnalytics) {
      loadReport();
    }
  }, [showAnalytics]);

  // Only show in development or with secret key
  if (
    process.env.NODE_ENV !== "development" &&
    !localStorage.getItem("show_analytics")
  ) {
    return null;
  }

  return (
    <>
      {/* Floating button to toggle analytics */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAnalytics(!showAnalytics)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent rounded-full 
                   flex items-center justify-center shadow-2xl z-50
                   hover:shadow-accent/50 transition-shadow"
        title="View Analytics"
      >
        <i className="fa-solid fa-chart-simple text-primary text-2xl"></i>
      </motion.button>

      {/* Analytics Panel */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 bottom-0 w-96 bg-secondary border-l border-accent/30 
                       shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-display font-bold text-text-primary">
                  Project Analytics
                </h3>
                <button
                  onClick={() => setShowAnalytics(false)}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center
                           hover:bg-accent/20 transition-colors"
                >
                  <i className="fa-solid fa-times text-text-secondary"></i>
                </button>
              </div>

              {report ? (
                <div className="space-y-6">
                  {/* Overview Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-primary/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-accent">
                        {report.totalVisits}
                      </div>
                      <div className="text-xs text-text-secondary">
                        Total Visits
                      </div>
                    </div>
                    <div className="bg-primary/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-accent">
                        {report.totalProjectViews}
                      </div>
                      <div className="text-xs text-text-secondary">
                        Project Views
                      </div>
                    </div>
                  </div>

                  {/* Top Projects */}
                  <div>
                    <h4 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                      <i className="fa-solid fa-trophy text-accent"></i>
                      Top Projects
                    </h4>
                    <div className="space-y-2">
                      {report.topProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-primary/30 p-3 rounded-lg"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-text-primary text-sm font-medium">
                              {project.title}
                            </span>
                            <span className="text-accent font-bold">
                              {project.views}
                            </span>
                          </div>
                          <div className="w-full bg-primary rounded-full h-1 mt-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(project.views / report.topProjects[0].views) * 100}%`,
                              }}
                              className="bg-accent h-1 rounded-full"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Filter Usage */}
                  {report.topFilters.length > 0 && (
                    <div>
                      <h4 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-sliders text-accent"></i>
                        Popular Filters
                      </h4>
                      <div className="space-y-2">
                        {report.topFilters.map((filter, index) => (
                          <div
                            key={filter.key}
                            className="flex justify-between items-center"
                          >
                            <span className="text-text-secondary text-sm">
                              {filter.key}
                            </span>
                            <span className="text-accent text-sm font-medium">
                              {filter.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Searches */}
                  {report.recentSearches.length > 0 && (
                    <div>
                      <h4 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-magnifying-glass text-accent"></i>
                        Recent Searches
                      </h4>
                      <div className="space-y-1">
                        {report.recentSearches.map((search, index) => (
                          <div
                            key={index}
                            className="text-sm text-text-secondary"
                          >
                            "{search.query}"
                            <span className="text-xs text-text-secondary/50 ml-2">
                              {new Date(search.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Last Visit */}
                  {report.lastVisit && (
                    <div className="text-xs text-text-secondary/50 pt-4 border-t border-border">
                      Last visit: {new Date(report.lastVisit).toLocaleString()}
                    </div>
                  )}

                  {/* Admin Actions */}
                  <div className="pt-4 border-t border-border">
                    <button
                      onClick={() => setShowConfirmation(true)}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors
                               flex items-center gap-2"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                      Clear Analytics Data
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fa-solid fa-chart-simple text-4xl text-text-secondary/30 mb-4"></i>
                  <p className="text-text-secondary">Loading analytics...</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-secondary rounded-xl p-6 max-w-sm mx-4 border border-accent/30"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-exclamation-triangle text-red-400 text-2xl"></i>
                </div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                  Clear Analytics?
                </h3>
                <p className="text-text-secondary mb-6">
                  This will permanently delete all analytics data. This action
                  cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex-1 bg-red-500 text-white font-semibold py-2 px-4 
                             rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectAnalytics;
