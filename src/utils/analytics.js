// src/utils/analytics.js
// Enhanced analytics utility with advanced tracking

// Storage key for localStorage
const STORAGE_KEY = 'portfolio_analytics_v2';

// Initialize analytics data structure
const initAnalytics = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default analytics structure
  return {
    // Project tracking
    projectViews: {},
    projectClicks: {},
    projectTimeSpent: {},
    
    // Filter tracking
    filterUsage: {},
    searchQueries: [],
    
    // Session tracking
    totalVisits: 0,
    lastVisit: null,
    sessions: [],
    
    // Engagement metrics
    scrollDepth: {},
    buttonClicks: {},
    sectionViews: {},
    
    // User journey
    userFlow: [],
    
    // Performance
    loadTimes: [],
    
    // Settings
    trackingEnabled: true,
    firstVisit: new Date().toISOString()
  };
};

// Save analytics to localStorage
const saveAnalytics = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save analytics:', e);
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
      totalTimeSpent: 0,
      viewHistory: []
    };
  }
  
  data.projectViews[projectId].views += 1;
  data.projectViews[projectId].lastViewed = new Date().toISOString();
  data.projectViews[projectId].viewHistory.push({
    timestamp: new Date().toISOString(),
    sessionId: getSessionId()
  });
  
  saveAnalytics(data);
  
  // Start timing how long user looks at this project
  startProjectTimer(projectId);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Project viewed: ${projectTitle} (${data.projectViews[projectId].views} total views)`);
  }
};

// Track time spent on project
let projectTimers = {};

const startProjectTimer = (projectId) => {
  if (projectTimers[projectId]) {
    clearInterval(projectTimers[projectId].interval);
  }
  
  const startTime = Date.now();
  projectTimers[projectId] = {
    startTime,
    interval: setInterval(() => {
      const data = initAnalytics();
      const timeSpent = Math.floor((Date.now() - startTime) / 1000); // seconds
      
      if (data.projectViews[projectId]) {
        data.projectViews[projectId].totalTimeSpent = timeSpent;
        saveAnalytics(data);
      }
    }, 1000)
  };
};

export const stopProjectTimer = (projectId) => {
  if (projectTimers[projectId]) {
    clearInterval(projectTimers[projectId].interval);
    delete projectTimers[projectId];
  }
};

// Track project click
export const trackProjectClick = (projectId, projectTitle, linkType) => {
  const data = initAnalytics();
  
  if (!data.projectClicks[projectId]) {
    data.projectClicks[projectId] = {
      id: projectId,
      title: projectTitle,
      clicks: {},
      total: 0
    };
  }
  
  if (!data.projectClicks[projectId].clicks[linkType]) {
    data.projectClicks[projectId].clicks[linkType] = 0;
  }
  
  data.projectClicks[projectId].clicks[linkType] += 1;
  data.projectClicks[projectId].total += 1;
  
  saveAnalytics(data);
  
  // Track user flow
  trackUserFlow('click', `${projectTitle} - ${linkType}`);
};

// Track filter usage
export const trackFilterUsage = (filterType, filterValue) => {
  const data = initAnalytics();
  
  const key = `${filterType}:${filterValue}`;
  data.filterUsage[key] = (data.filterUsage[key] || 0) + 1;
  
  saveAnalytics(data);
  trackUserFlow('filter', `${filterType}: ${filterValue}`);
};

// Track search queries
export const trackSearchQuery = (query, resultsCount = 0) => {
  if (!query || query.trim() === '') return;
  
  const data = initAnalytics();
  data.searchQueries.push({
    query: query,
    timestamp: new Date().toISOString(),
    resultsCount: resultsCount,
    sessionId: getSessionId()
  });
  
  // Keep only last 100 searches
  if (data.searchQueries.length > 100) {
    data.searchQueries = data.searchQueries.slice(-100);
  }
  
  saveAnalytics(data);
  trackUserFlow('search', query);
};

// Track scroll depth
export const trackScrollDepth = (page, depth) => {
  const data = initAnalytics();
  
  if (!data.scrollDepth[page]) {
    data.scrollDepth[page] = [];
  }
  
  // Only track if depth is higher than previous max
  const maxDepth = Math.max(...data.scrollDepth[page].map(d => d.depth), 0);
  if (depth > maxDepth) {
    data.scrollDepth[page].push({
      depth,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    });
    saveAnalytics(data);
  }
};

// Track button clicks
export const trackButtonClick = (buttonName, buttonLocation) => {
  const data = initAnalytics();
  const key = `${buttonLocation}:${buttonName}`;
  
  data.buttonClicks[key] = (data.buttonClicks[key] || 0) + 1;
  saveAnalytics(data);
  trackUserFlow('button', `${buttonLocation} - ${buttonName}`);
};

// Track section views
export const trackSectionView = (sectionName) => {
  const data = initAnalytics();
  
  if (!data.sectionViews[sectionName]) {
    data.sectionViews[sectionName] = {
      views: 0,
      lastViewed: null,
      viewHistory: []
    };
  }
  
  data.sectionViews[sectionName].views += 1;
  data.sectionViews[sectionName].lastViewed = new Date().toISOString();
  data.sectionViews[sectionName].viewHistory.push({
    timestamp: new Date().toISOString(),
    sessionId: getSessionId()
  });
  
  saveAnalytics(data);
  trackUserFlow('section', sectionName);
};

// Track user flow (journey through site)
const trackUserFlow = (action, details) => {
  const data = initAnalytics();
  
  data.userFlow.push({
    action,
    details,
    timestamp: new Date().toISOString(),
    url: window.location.pathname,
    sessionId: getSessionId()
  });
  
  // Keep only last 200 events
  if (data.userFlow.length > 200) {
    data.userFlow = data.userFlow.slice(-200);
  }
  
  saveAnalytics(data);
};

// Generate session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Track session start
export const trackSessionStart = () => {
  const data = initAnalytics();
  
  data.totalVisits += 1;
  data.lastVisit = new Date().toISOString();
  
  const sessionId = getSessionId();
  data.sessions.push({
    sessionId,
    timestamp: new Date().toISOString(),
    duration: 0,
    pages: [],
    entryPage: window.location.pathname,
    referrer: document.referrer || 'direct'
  });
  
  // Track page load time
  if (window.performance) {
    const perfData = window.performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    data.loadTimes.push({
      time: loadTime,
      timestamp: new Date().toISOString(),
      url: window.location.pathname
    });
  }
  
  // Keep only last 50 sessions
  if (data.sessions.length > 50) {
    data.sessions = data.sessions.slice(-50);
  }
  
  saveAnalytics(data);
  
  // Track scroll depth
  trackScrollDepth(window.location.pathname, 0);
};

// Track page view
export const trackPageView = (pageName) => {
  const data = initAnalytics();
  const sessionId = getSessionId();
  
  const session = data.sessions.find(s => s.sessionId === sessionId);
  if (session) {
    if (!session.pages.includes(pageName)) {
      session.pages.push(pageName);
    }
  }
  
  saveAnalytics(data);
  trackSectionView(pageName);
};

// Get analytics report
export const getAnalyticsReport = () => {
  const data = initAnalytics();
  
  // Sort projects by views
  const topProjects = Object.values(data.projectViews || {})
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map(p => ({
      ...p,
      engagementRate: p.views > 0 ? Math.round((p.totalTimeSpent / p.views) * 10) / 10 : 0
    }));
  
  // Sort projects by clicks
  const topClickedProjects = Object.values(data.projectClicks || {})
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
  
  // Get most used filters
  const topFilters = Object.entries(data.filterUsage || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, count]) => ({ key, count }));
  
  // Get popular search terms
  const searchTerms = (data.searchQueries || []).reduce((acc, item) => {
    acc[item.query] = (acc[item.query] || 0) + 1;
    return acc;
  }, {});
  
  const topSearches = Object.entries(searchTerms)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([term, count]) => ({ term, count }));
  
  // Calculate engagement metrics
  const totalTimeSpent = Object.values(data.projectViews || {}).reduce(
    (sum, p) => sum + (p.totalTimeSpent || 0), 0
  );
  
  const averageTimePerProject = data.projectViews ? 
    Math.round((totalTimeSpent / Object.keys(data.projectViews).length) * 10) / 10 : 0;
  
  // Calculate bounce rate (approx)
  const sessionsWithOnePage = data.sessions.filter(s => s.pages.length <= 1).length;
  const bounceRate = data.sessions.length > 0 ? 
    Math.round((sessionsWithOnePage / data.sessions.length) * 100) : 0;
  
  return {
    // Overview
    totalVisits: data.totalVisits || 0,
    totalProjectViews: Object.values(data.projectViews || {}).reduce((sum, p) => sum + p.views, 0),
    totalProjectClicks: Object.values(data.projectClicks || {}).reduce((sum, p) => sum + p.total, 0),
    bounceRate,
    
    // Projects
    topProjects,
    topClickedProjects,
    averageTimePerProject,
    
    // Engagement
    topFilters,
    topSearches,
    buttonClicks: data.buttonClicks || {},
    sectionViews: data.sectionViews || {},
    
    // Journey
    userFlow: data.userFlow.slice(-20), // Last 20 actions
    recentSearches: data.searchQueries?.slice(-5) || [],
    
    // Technical
    lastVisit: data.lastVisit,
    firstVisit: data.firstVisit,
    averageLoadTime: data.loadTimes.length > 0 ?
      Math.round(data.loadTimes.reduce((sum, l) => sum + l.time, 0) / data.loadTimes.length) : 0
  };
};

// Clear analytics (for testing)
export const clearAnalytics = () => {
  localStorage.removeItem(STORAGE_KEY);
  console.log('📊 Analytics cleared');
};

// Export analytics data as CSV
export const exportAnalyticsCSV = () => {
  const data = initAnalytics();
  
  let csv = 'Type,Name,Value,Timestamp\n';
  
  // Add project views
  Object.values(data.projectViews || {}).forEach(p => {
    p.viewHistory?.forEach(v => {
      csv += `Project View,${p.title},1,${v.timestamp}\n`;
    });
  });
  
  // Add clicks
  Object.entries(data.projectClicks || {}).forEach(([id, p]) => {
    Object.entries(p.clicks || {}).forEach(([type, count]) => {
      csv += `Project Click,${p.title} - ${type},${count},${p.lastViewed || ''}\n`;
    });
  });
  
  // Add searches
  data.searchQueries?.forEach(s => {
    csv += `Search,${s.query},${s.resultsCount || 0},${s.timestamp}\n`;
  });
  
  return csv;
};

// Sync to server (optional)
export const syncAnalyticsToServer = async () => {
  const data = initAnalytics();
  
  if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_API_URL) {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (e) {
      console.warn('Failed to sync analytics:', e);
    }
  }
};