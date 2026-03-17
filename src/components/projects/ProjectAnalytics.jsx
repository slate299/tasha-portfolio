// src/components/projects/ProjectAnalytics.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnalyticsReport, clearAnalytics, exportAnalyticsCSV } from '../../utils/analytics';

const ProjectAnalytics = () => {
  const [report, setReport] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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

  // Handle export
  const handleExport = () => {
    const csv = exportAnalyticsCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Load on mount and when opened
  useEffect(() => {
    if (showAnalytics) {
      loadReport();
      
      // Refresh every 30 seconds
      const interval = setInterval(loadReport, 30000);
      return () => clearInterval(interval);
    }
  }, [showAnalytics]);

  // Only show in development or with secret key
  if (process.env.NODE_ENV !== 'development' && !localStorage.getItem('show_analytics')) {
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
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 bottom-0 w-96 bg-secondary border-l border-accent/30 
                       shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-display font-bold text-text-primary">
                  Analytics Dashboard
                </h3>
                <button
                  onClick={() => setShowAnalytics(false)}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center
                           hover:bg-accent/20 transition-colors"
                >
                  <i className="fa-solid fa-times text-text-secondary"></i>
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 mb-6 border-b border-border pb-2">
                {[
                  { id: 'overview', label: 'Overview', icon: 'fa-solid fa-chart-pie' },
                  { id: 'projects', label: 'Projects', icon: 'fa-solid fa-code' },
                  { id: 'engagement', label: 'Engagement', icon: 'fa-solid fa-users' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all
                      ${activeTab === tab.id 
                        ? 'bg-accent text-primary' 
                        : 'text-text-secondary hover:text-accent hover:bg-accent/10'}`}
                  >
                    <i className={`${tab.icon} mr-1`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>

              {report ? (
                <div className="space-y-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <>
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-primary/50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-accent">{report.totalVisits}</div>
                          <div className="text-xs text-text-secondary">Total Visits</div>
                        </div>
                        <div className="bg-primary/50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-accent">{report.totalProjectViews}</div>
                          <div className="text-xs text-text-secondary">Project Views</div>
                        </div>
                        <div className="bg-primary/50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-accent">{report.totalProjectClicks}</div>
                          <div className="text-xs text-text-secondary">Clicks</div>
                        </div>
                        <div className="bg-primary/50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-accent">{report.bounceRate}%</div>
                          <div className="text-xs text-text-secondary">Bounce Rate</div>
                        </div>
                      </div>

                      {/* Performance */}
                      <div className="bg-primary/30 p-4 rounded-lg">
                        <h4 className="text-text-primary font-semibold mb-2 text-sm">Performance</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Avg Load Time</span>
                            <span className="text-accent">{report.averageLoadTime}ms</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">First Visit</span>
                            <span className="text-text-primary">
                              {new Date(report.firstVisit).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Projects Tab */}
                  {activeTab === 'projects' && (
                    <>
                      {/* Top Projects */}
                      <div>
                        <h4 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                          <i className="fa-solid fa-trophy text-accent"></i>
                          Most Viewed
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
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-text-primary text-sm font-medium">
                                  {project.title}
                                </span>
                                <span className="text-accent font-bold">{project.views}</span>
                              </div>
                              <div className="flex justify-between text-xs text-text-secondary">
                                <span>{project.engagementRate}s avg</span>
                                <span>{project.totalTimeSpent || 0}s total</span>
                              </div>
                              <div className="w-full bg-primary rounded-full h-1 mt-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(project.views / report.topProjects[0].views) * 100}%` }}
                                  className="bg-accent h-1 rounded-full"
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Top Clicked */}
                      {report.topClickedProjects.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-mouse-pointer text-accent"></i>
                            Most Clicked
                          </h4>
                          <div className="space-y-2">
                            {report.topClickedProjects.map((project, index) => (
                              <div key={project.id} className="bg-primary/30 p-3 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <span className="text-text-primary text-sm">{project.title}</span>
                                  <span className="text-accent font-bold">{project.total}</span>
                                </div>
                                <div className="flex gap-2 mt-1 text-xs text-text-secondary">
                                  {Object.entries(project.clicks).map(([type, count]) => (
                                    <span key={type}>{type}: {count}</span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Engagement Tab */}
                  {activeTab === 'engagement' && (
                    <>
                      {/* Filters */}
                      {report.topFilters.length > 0 && (
                        <div>
                          <h4 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-sliders text-accent"></i>
                            Popular Filters
                          </h4>
                          <div className="space-y-2">
                            {report.topFilters.map((filter, index) => (
                              <div key={filter.key} className="flex justify-between items-center">
                                <span className="text-text-secondary text-sm">{filter.key}</span>
                                <span className="text-accent text-sm font-medium">{filter.count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Searches */}
                      {report.topSearches.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-magnifying-glass text-accent"></i>
                            Top Searches
                          </h4>
                          <div className="space-y-1">
                            {report.topSearches.map((search, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <span className="text-text-secondary text-sm">"{search.term}"</span>
                                <span className="text-accent text-xs">{search.count}x</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Section Views */}
                      {Object.keys(report.sectionViews).length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-eye text-accent"></i>
                            Section Views
                          </h4>
                          <div className="space-y-1">
                            {Object.entries(report.sectionViews).map(([section, data]) => (
                              <div key={section} className="flex justify-between items-center">
                                <span className="text-text-secondary text-sm capitalize">{section}</span>
                                <span className="text-accent text-xs">{data.views} views</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* User Flow (visible in all tabs) */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-text-primary font-semibold mb-3 text-sm">Recent Activity</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {report.userFlow.slice().reverse().map((action, index) => (
                        <div key={index} className="text-xs text-text-secondary">
                          <span className="text-accent mr-2">•</span>
                          {action.action}: {action.details}
                          <span className="text-text-secondary/50 ml-2">
                            {new Date(action.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <button
                      onClick={handleExport}
                      className="flex-1 text-sm bg-primary text-text-secondary 
                               hover:text-accent transition-colors py-2 rounded-lg
                               flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-download"></i>
                      Export
                    </button>
                    <button
                      onClick={() => setShowConfirmation(true)}
                      className="flex-1 text-sm text-red-400 hover:text-red-300 
                               transition-colors py-2 rounded-lg
                               flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                      Clear
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
                  This will permanently delete all analytics data. This action cannot be undone.
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