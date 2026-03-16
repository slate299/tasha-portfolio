// src/utils/analytics.js
// Simple analytics utility to track project views and interactions

// Storage key for localStorage
const STORAGE_KEY = "portfolio_analytics";

// Initialize analytics data structure
const initAnalytics = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // Default analytics structure
  return {
    projectViews: {},
    projectClicks: {},
    filterUsage: {},
    searchQueries: [],
    totalVisits: 0,
    lastVisit: null,
    sessions: [],
  };
};

// Save analytics to localStorage
const saveAnalytics = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to save analytics:", e);
  }
};

// Track project view
export const trackProjectView = (projectId, projectTitle) => {
  const data = initAnalytics();

  if (!data.projectViews[projectId]) {
    data.projectViews[projectId] = {
      id: projectId,
      title: projectTitle,
      views: 0,
      lastViewed: null,
    };
  }

  data.projectViews[projectId].views += 1;
  data.projectViews[projectId].lastViewed = new Date().toISOString();

  saveAnalytics(data);

  // Also log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(
      `📊 Project viewed: ${projectTitle} (${data.projectViews[projectId].views} total views)`,
    );
  }
};

// Track project click (GitHub, live demo, etc.)
export const trackProjectClick = (projectId, projectTitle, linkType) => {
  const data = initAnalytics();

  if (!data.projectClicks[projectId]) {
    data.projectClicks[projectId] = {
      id: projectId,
      title: projectTitle,
      clicks: {},
      total: 0,
    };
  }

  if (!data.projectClicks[projectId].clicks[linkType]) {
    data.projectClicks[projectId].clicks[linkType] = 0;
  }

  data.projectClicks[projectId].clicks[linkType] += 1;
  data.projectClicks[projectId].total += 1;

  saveAnalytics(data);
};

// Track filter usage
export const trackFilterUsage = (filterType, filterValue) => {
  const data = initAnalytics();

  const key = `${filterType}:${filterValue}`;
  data.filterUsage[key] = (data.filterUsage[key] || 0) + 1;

  saveAnalytics(data);
};

// Track search queries
export const trackSearchQuery = (query) => {
  if (!query || query.trim() === "") return;

  const data = initAnalytics();
  data.searchQueries.push({
    query: query,
    timestamp: new Date().toISOString(),
    resultsCount: 0, // Will be updated by caller
  });

  // Keep only last 50 searches
  if (data.searchQueries.length > 50) {
    data.searchQueries = data.searchQueries.slice(-50);
  }

  saveAnalytics(data);
};

// Track session start
export const trackSessionStart = () => {
  const data = initAnalytics();

  data.totalVisits += 1;
  data.lastVisit = new Date().toISOString();

  data.sessions.push({
    timestamp: new Date().toISOString(),
    duration: 0,
    pages: ["projects"],
  });

  // Keep only last 20 sessions
  if (data.sessions.length > 20) {
    data.sessions = data.sessions.slice(-20);
  }

  saveAnalytics(data);
};

// Get analytics report
export const getAnalyticsReport = () => {
  const data = initAnalytics();

  // Sort projects by views
  const topProjects = Object.values(data.projectViews || {})
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Get most used filters
  const topFilters = Object.entries(data.filterUsage || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, count]) => ({ key, count }));

  return {
    totalVisits: data.totalVisits || 0,
    totalProjectViews: Object.values(data.projectViews || {}).reduce(
      (sum, p) => sum + p.views,
      0,
    ),
    topProjects,
    topFilters,
    recentSearches: data.searchQueries?.slice(-5) || [],
    lastVisit: data.lastVisit,
  };
};

// Clear analytics (for testing)
export const clearAnalytics = () => {
  localStorage.removeItem(STORAGE_KEY);
  console.log("📊 Analytics cleared");
};

// Optional: Send to server (for future)
export const syncAnalyticsToServer = async () => {
  const data = initAnalytics();

  // Only in production and if you have a backend
  if (process.env.NODE_ENV === "production" && process.env.REACT_APP_API_URL) {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/analytics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.warn("Failed to sync analytics:", e);
    }
  }
};
