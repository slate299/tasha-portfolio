// src/data/projectsData.js
// Professional projects data structure - scalable, typed, and maintainable

/**
 * Project status enum for consistency
 * @readonly
 * @enum {string}
 */
export const ProjectStatus = {
  FEATURED: "featured",
  COMPLETED: "completed",
  TEAM: "team",
  IN_PROGRESS: "in-progress",
  BACKEND: "backend",
};

/**
 * Project type enum
 * @readonly
 * @enum {string}
 */
export const ProjectType = {
  FULLSTACK: "fullstack",
  BACKEND: "backend",
  FRONTEND: "frontend",
  MOBILE: "mobile",
  HACKATHON: "hackathon",
};

/**
 * Professional projects database
 * Structured for easy filtering, sorting, and future CMS integration
 */
export const projectsData = {
  // Metadata for the projects section
  metadata: {
    title: "Professional Work",
    subtitle: "Real projects solving real problems",
    featuredCount: 1,
    totalProjects: 8,
    lastUpdated: "2026-03-15",
  },

  // Categories for filtering
  categories: [
    { id: "all", name: "All Projects", icon: "fa-solid fa-layer-group" },
    { id: "featured", name: "Featured", icon: "fa-solid fa-star" },
    { id: "fullstack", name: "Full-Stack", icon: "fa-solid fa-code" },
    { id: "backend", name: "Backend API", icon: "fa-solid fa-server" },
    { id: "team", name: "Team Projects", icon: "fa-solid fa-users" },
    { id: "in-progress", name: "In Development", icon: "fa-solid fa-rocket" },
  ],

  // ============================================
  // 1. FEATURED PROJECT - Your strongest work
  // ============================================
  featured: {
    id: "baraka-bliss-react",
    title: "Baraka Bliss Staycations",
    subtitle: "Luxury Apartment Booking Platform",
    description: {
      short:
        "Full-stack booking platform connecting guests with luxury apartment rentals across Kenya.",
      medium:
        "A comprehensive platform featuring a beautiful client-facing interface for browsing apartments and making inquiries, plus a powerful operator dashboard for managing listings and guest communications.",
      full: `Built for client Rose Tom, owner of Baraka Bliss Staycations, this platform solves the challenge of managing apartment rentals manually. 
      
The system features real-time availability tracking, an advanced filtering system with 15+ criteria, a WhatsApp-first contact strategy that increased response rates by 60%, and an operator dashboard that reduced manual work by 80%. The platform handles everything from inquiries to booking management, making it a complete solution for the growing vacation rental business.`,
    },
    role: "Solo Full-Stack Developer",
    client: "Rose Tom, Baraka Bliss Staycations",
    timeline: "2025-2026",

    // Technical details
    tech: {
      frontend: [
        "React 18",
        "Tailwind CSS",
        "Framer Motion",
        "React Router v6",
        "React Hook Form",
        "Axios",
      ],
      backend: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Multer"],
      tools: ["Git", "Vercel", "Render", "Postman", "ESLint"],
      architecture: "MVC Pattern with RESTful API",
    },

    // Key features as bullet points
    features: [
      "Advanced filtering system with 15+ criteria",
      "Real-time availability tracking",
      "Operator dashboard with CRUD operations",
      "Bulk inquiry management with CSV export",
      "Kenyan phone number validation",
      "WhatsApp-first contact integration",
      "Responsive design (mobile, tablet, desktop)",
      "WCAG AA compliant accessibility",
    ],

    // Measurable outcomes
    outcomes: {
      metrics: [
        { value: "80%", label: "Less Manual Work", icon: "fa-solid fa-clock" },
        { value: "60%", label: "Faster Response", icon: "fa-solid fa-bolt" },
        {
          value: "100%",
          label: "Client Satisfaction",
          icon: "fa-solid fa-star",
        },
      ],
      problemSolved:
        "Eliminated manual booking management and reduced inquiry response time from hours to minutes",
    },

    // Links
    links: {
      live: "https://baraka-bliss-staycations-frontend.vercel.app/",
      github: "https://github.com/slate299/baraka-bliss-staycations-frontend",
      caseStudy: "#", // Optional: link to detailed case study
      documentation:
        "https://github.com/slate299/baraka-bliss-staycations-frontend#readme",
    },

    // Media
    media: {
      screenshots: [
        "/projects/baraka-bliss/homepage.jpg",
        "/projects/baraka-bliss/listings.jpg",
        "/projects/baraka-bliss/dashboard.jpg",
      ],
      demoVideo: null, // Optional
      thumbnail: "/projects/baraka-bliss/thumbnail.jpg",
    },

    // Metadata
    status: ProjectStatus.FEATURED,
    type: ProjectType.FULLSTACK,
    year: 2026,
    tags: ["commercial", "client-project", "production"],
  },

  // ============================================
  // 2. COMPLETED BACKEND PROJECTS
  // ============================================
  completed: [
    {
      id: "neuratrack-backend",
      title: "NeuraTrack API",
      subtitle: "Epilepsy Tracking & Management System",
      description: {
        short:
          "HIPAA-compliant backend API for epilepsy tracking with AI-assisted insights.",
        medium:
          "A comprehensive healthcare API that enables users to track seizures, medication intake, and receive AI-powered insights. Built with security and scalability in mind, the system handles sensitive health data with proper encryption and authentication.",
      },
      role: "Lead Backend Developer",
      organization: "GRAF HET Developers (Co-founder)",
      team: {
        name: "Julius Hinga",
        role: "Frontend Developer",
        github: "https://github.com/Julius-Nganga",
      },
      tech: {
        backend: ["Node.js", "Express", "PostgreSQL", "JWT", "bcrypt"],
        tools: ["Render", "Postman", "Git"],
        architecture: "RESTful API with JWT authentication",
      },
      features: [
        "Seizure logging with type classification",
        "Medication tracking and reminders",
        "Emergency alert system (ethical MVP)",
        "JWT-based authentication",
        "Protected routes with role-based access",
        "Health data encryption",
      ],
      links: {
        api: "https://neuratrack-backend.onrender.com",
        github: "https://github.com/slate299/neuratrack-backend",
        documentation: "https://github.com/slate299/neuratrack-backend#readme",
      },
      status: ProjectStatus.COMPLETED,
      type: ProjectType.BACKEND,
      year: 2026,
      tags: ["healthtech", "api", "team-project"],
    },
  ],

// ============================================
// 3. TEAM PROJECTS (HACKATHONS)
// ============================================
teamProjects: [
  {
    id: "logigas",
    title: "LogiGas",
    subtitle: "Smart LPG Delivery Platform",
    description: {
      short: "Location-intelligent LPG delivery system for optimized gas distribution.",
      medium: "LogiGas is a smart LPG delivery platform that uses location intelligence to streamline gas distribution and improve delivery efficiency.",
    },
    role: "Backend Developer",
    event: "Hackathon 2025",
    tech: {
      backend: ["Node.js", "Express", "MongoDB", "JWT"],
      apis: ["OpenStreetMaps API", "Geocoding"],
      tools: ["Postman", "Git"],
    },
    contributions: [
      "Designed and implemented RESTful API for order management",
      "Built user authentication and authorization system",
      "Integrated location-based routing endpoints",
      "Created database schema for delivery optimization",
    ],
    links: {
      github: "https://github.com/slate299/logigas-backend",
      api: null,
    },
    // ===== ADD MEDIA FOR LOGIGAS =====
    media: {
      screenshots: [
        "/projects/logigas/api-docs.jpg",
        "/projects/logigas/postman-tests.jpg",
        "/projects/logigas/team-photo.jpg",
      ],
      thumbnail: "/projects/logigas/thumbnail.jpg",
    },
    // ================================
    status: ProjectStatus.TEAM,
    type: ProjectType.HACKATHON,
    year: 2025,
    tags: ["hackathon", "logistics", "api"],
  },
  {
    id: "canopy",
    title: "Canopy",
    subtitle: "Forest Monitoring Platform",
    description: {
      short: "Environmental monitoring platform for tracking forest health and threats.",
      medium: "Canopy helps communities report local environmental threats and gives conservation teams a clear visual overview through interactive maps and analytics.",
    },
    role: "Backend Developer",
    event: "Hackathon 2025",
    tech: {
      backend: ["Node.js", "Express", "MongoDB"],
      tools: ["Postman", "Git"],
    },
    contributions: [
      "Built data ingestion APIs for environmental sensors",
      "Implemented user reporting system",
      "Created endpoints for map visualization data",
      "Designed database schema for environmental data",
    ],
    links: {
      github: "https://github.com/slate299/canopy-backend",
    },
    // ===== ADD MEDIA FOR CANOPY =====
    media: {
      screenshots: [
        "/projects/canopy/Canopy.jpg",
        "/projects/canopy/postman-tests.jpg",
        "/projects/canopy/team-presentation.jpg",
      ],
      thumbnail: "/projects/canopy/thumbnail.jpg",
    },
    // ================================
    status: ProjectStatus.TEAM,
    type: ProjectType.HACKATHON,
    year: 2025,
    tags: ["hackathon", "environment", "api"],
  },
  {
    id: "dryplan",
    title: "DryPlan",
    subtitle: "Weather-Aware Event Planning",
    description: {
      short: "Smart event planning platform with weather insights.",
      medium: "DryPlan helps users plan events with weather-aware insights, including rain probability and backup suggestions.",
    },
    role: "Backend Developer",
    event: "Hackathon 2025",
    tech: {
      backend: ["Node.js", "Express", "MongoDB"],
      apis: ["Weather API Integration"],
      tools: ["Postman", "Git"],
    },
    contributions: [
      "Built event management API endpoints",
      "Integrated weather data services",
      "Implemented backup plan recommendation logic",
      "Created RESTful endpoints for frontend consumption",
    ],
    links: {
      github: "https://github.com/slate299/dryplan-groupWork-/tree/main/backend",
    },
    // ===== ADD MEDIA FOR DRYPLAN =====
    media: {
      screenshots: [
        "/projects/dryplan/hackathon-pitch.jpg",
        "/projects/dryplan/api-endpoints.jpg",
        "/projects/dryplan/weather-integration.jpg",
      ],
      thumbnail: "/projects/dryplan/thumbnail.jpg",
    },
    // ================================
    status: ProjectStatus.TEAM,
    type: ProjectType.HACKATHON,
    year: 2025,
    tags: ["hackathon", "weather", "events"],
  },
],

  // ============================================
  // 4. WORKS IN PROGRESS
  // ============================================
  inProgress: [
  {
    id: "baraka-bliss-flutter",
    title: "Baraka Bliss Mobile App",
    subtitle: "Cross-platform mobile experience",
    description: {
      short: "Mobile version of Baraka Bliss built with Flutter for iOS and Android.",
      medium: "Cross-platform mobile app bringing the Baraka Bliss booking experience to mobile devices. Currently facing Firebase storage optimization challenges.",
    },
    role: "Solo Mobile Developer",
    tech: {
      frontend: ["Flutter", "Dart"],
      backend: ["Firebase", "Cloud Firestore"],
    },
    progress: "70% complete - Storage optimization in progress",
    challenges: [
      "Firebase storage limits for property images",
      "Optimizing image loading for slow connections",
      "Implementing offline-first architecture",
    ],
    nextSteps: [
      "Migrate to Cloudinary for image hosting",
      "Implement pagination for listings",
      "Add push notifications",
    ],
    links: {
      github: "https://github.com/slate299/baraka_bliss_staycations-mobile",
    },
    // ===== ADD THIS MEDIA SECTION =====
    media: {
      screenshots: [
        "/projects/baraka-bliss-flutter/screenshot1.jpg",
        "/projects/baraka-bliss-flutter/screenshot2.jpg",
        "/projects/baraka-bliss-flutter/screenshot3.jpg",
      ],
      thumbnail: "/projects/baraka-bliss-flutter/thumbnail.jpg",
    },
    // =================================
    status: ProjectStatus.IN_PROGRESS,
    type: ProjectType.MOBILE,
    year: 2026,
    tags: ["mobile", "flutter", "in-development"],
  },
  {
    id: "neuratrack-frontend",
    title: "NeuraTrack Frontend",
    subtitle: "Epilepsy tracking web application",
    description: {
      short: "React-based frontend for the NeuraTrack healthcare platform.",
      medium: "Web application that consumes the NeuraTrack API to provide an intuitive interface for epilepsy patients to track their condition.",
    },
    role: "Project Lead & Backend Developer",
    team: {
      name: "Julius Hinga",
      role: "Frontend Developer",
      github: "https://github.com/Julius-Nganga",
    },
    tech: {
      frontend: ["React", "Tailwind CSS", "Chart.js"],
      backend: "NeuraTrack API (completed)",
    },
    progress: "Backend complete, frontend in active development",
    features: [
      "Seizure tracking dashboard",
      "Medication schedule manager",
      "Health insights visualization",
      "Emergency contact integration",
    ],
    links: {
      backend: "https://github.com/slate299/neuratrack-backend",
      frontend: "https://github.com/Julius-Nganga/neuratrack-frontend",
    },
    // ===== ADD THIS MEDIA SECTION =====
    media: {
      screenshots: [
        "/projects/neuratrack-frontend/dashboard-mockup.jpg",
        "/projects/neuratrack-frontend/tracking-view.jpg",
        "/projects/neuratrack-frontend/analytics.jpg",
      ],
      thumbnail: "/projects/neuratrack-frontend/thumbnail.jpg",
    },
    // =================================
    status: ProjectStatus.IN_PROGRESS,
    type: ProjectType.FULLSTACK,
    year: 2026,
    tags: ["healthtech", "team-project", "in-development"],
  },
     {
    id: "agri-match",
    title: "Agri-Match",
    subtitle: "Agricultural Machinery & Operator Marketplace",
    description: {
      short: "An innovative platform connecting farmers with machinery rentals and skilled operators.",
      medium: "Agri-Match is a secondary marketplace for renting agricultural machinery, hiring skilled operators, and fostering collaboration among stakeholders to promote agricultural productivity. Features include machinery rentals, operator listings, wishlist functionality, and user authentication for listing creators and renters.",
      full: `Agri-Match is an innovative platform designed to connect farmers, operators, and service providers in the agricultural industry. Its primary focus is to create a secondary marketplace for renting agricultural machinery, hiring skilled operators, and fostering collaboration among stakeholders to promote agricultural productivity.

Key features include:
• Machinery Rentals: Users can list agricultural machinery available for rent, providing farmers with access to essential equipment without the heavy upfront investment.
• Operator Listings: Farmers and other users can hire skilled operators to manage machinery and farm operations.
• Wishlist Functionality: Users can save their preferred listings to keep track of machinery or services they're interested in.
• User Authentication: Only certain users (such as listing creators, renters, and wishlist users) are required to authenticate, ensuring security and personalization.
• SDG 2 - Zero Hunger Focus: By facilitating access to tools, machinery, and skilled labor, the project aims to contribute to the global fight against hunger and enhance food production through more efficient farming.`
    },
    role: "Full-Stack Developer",
    client: "eMobilis Bootcamp Project",
    timeline: "2025",
    tech: {
      frontend: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      backend: ["Python", "Django"],
      database: ["SQLite"],
      tools: ["Git", "GitHub"],
    },
    features: [
      "Machinery rental listings with detailed equipment information",
      "Operator profiles and hiring system",
      "Personalized wishlist for saved items",
      "User authentication for renters and listing creators",
      "Responsive carousel for featured listings",
      "Streamlined listing creation process",
      "Search and browse functionality",
      "SDG 2 (Zero Hunger) aligned features"
    ],
    challenges: [
      "Integrating rental booking logic with availability tracking",
      "Designing intuitive user flows for both farmers and operators",
      "Implementing secure authentication for different user types",
      "Creating a responsive interface that works on mobile devices"
    ],
    nextSteps: [
      "Implement payment integration for rentals",
      "Add real-time availability calendar",
      "Create mobile app version with React Native",
      "Add geolocation for nearby machinery search"
    ],
    links: {
      github: "https://github.com/slate299/agri_match", // Add your actual repo URL
      demo: null, // Add if deployed
    },
    // ===== ADD MEDIA SECTION FOR IMAGES =====
    media: {
      screenshots: [
        "/projects/agri-match/homepage.jpg",
        "/projects/agri-match/listings.jpg",
        "/projects/agri-match/rental-detail.jpg",
        "/projects/agri-match/operator-listing.jpg",
        "/projects/agri-match/wishlist.jpg",
      ],
      thumbnail: "/projects/agri-match/thumbnail.jpg",
    },
    // ========================================
    status: ProjectStatus.IN_PROGRESS,
    type: ProjectType.FULLSTACK,
    year: 2025,
    progress: "60% complete - Core features implemented",
    tags: ["agriculture", "marketplace", "sdg", "bootcamp", "django"],
  },
    
  ],

  // ============================================
  // 5. ALL PROJECTS (Aggregated for easy mapping)
  // ============================================
  getAll: function () {
    return [
      this.featured,
      ...this.completed,
      ...this.teamProjects,
      ...this.inProgress,
    ];
  },

  // Helper methods for filtering
  getByStatus: function (status) {
    switch (status) {
      case ProjectStatus.FEATURED:
        return [this.featured];
      case ProjectStatus.COMPLETED:
        return this.completed;
      case ProjectStatus.TEAM:
        return this.teamProjects;
      case ProjectStatus.IN_PROGRESS:
        return this.inProgress;
      default:
        return this.getAll();
    }
  },

  getByType: function (type) {
    return this.getAll().filter((p) => p.type === type);
  },

  getByYear: function (year) {
    return this.getAll().filter((p) => p.year === year);
  },

  // 🔴 PASTE THE NEW METHODS HERE 🔴
  // Search functionality
  search: function (query) {
    if (!query) return this.getAll();

    const searchTerm = query.toLowerCase();
    return this.getAll().filter((project) => {
      return (
        project.title.toLowerCase().includes(searchTerm) ||
        project.subtitle.toLowerCase().includes(searchTerm) ||
        project.description.short.toLowerCase().includes(searchTerm) ||
        project.description.medium.toLowerCase().includes(searchTerm) ||
        project.role.toLowerCase().includes(searchTerm) ||
        Object.values(project.tech)
          .flat()
          .some((tech) => tech.toLowerCase().includes(searchTerm)) ||
        (project.tags &&
          project.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))
      );
    });
  },

  // Get unique technologies across all projects
  getAllTechnologies: function () {
    const techSet = new Set();
    this.getAll().forEach((project) => {
      Object.values(project.tech)
        .flat()
        .forEach((tech) => {
          techSet.add(tech);
        });
    });
    return Array.from(techSet).sort();
  },

  // Get projects by technology
  getByTechnology: function (technology) {
    return this.getAll().filter((project) =>
      Object.values(project.tech)
        .flat()
        .some((tech) => tech.toLowerCase().includes(technology.toLowerCase())),
    );
  },

  // Get projects count by status
  getCountByStatus: function () {
    return {
      all: this.getAll().length,
      featured: 1,
      completed: this.completed.length,
      team: this.teamProjects.length,
      inProgress: this.inProgress.length,
    };
  },
  // 🔴 STOP PASTING HERE 🔴
};

// Export individual sections for granular imports
export const featuredProject = projectsData.featured;
export const completedProjects = projectsData.completed;
export const teamProjects = projectsData.teamProjects;
export const inProgressProjects = projectsData.inProgress;

export default projectsData;
