// src/data/skillsData.js
// Professional skills data structure - scalable, categorized, and linked to projects

/**
 * Skill proficiency levels for consistency
 * @readonly
 * @enum {string}
 */
export const ProficiencyLevel = {
  EXPERT: "expert",
  ADVANCED: "advanced",
  INTERMEDIATE: "intermediate",
  BEGINNER: "beginner",
};

/**
 * Skill categories for organization
 * @readonly
 * @enum {string}
 */
export const SkillCategory = {
  FRONTEND: "frontend",
  BACKEND: "backend",
  MOBILE: "mobile",
  LANGUAGES: "languages",
  DATA_SCIENCE: "data-science",
  DATABASES: "databases",
  TOOLS: "tools",
  LEARNING: "learning",
};

/**
 * Proficiency level configuration
 * Used for consistent display across the section
 */
export const proficiencyConfig = {
  [ProficiencyLevel.EXPERT]: {
    label: "Expert",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    barColor: "bg-green-500",
    width: "100%",
    order: 5,
  },
  [ProficiencyLevel.ADVANCED]: {
    label: "Advanced",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    barColor: "bg-blue-500",
    width: "80%",
    order: 4,
  },
  [ProficiencyLevel.INTERMEDIATE]: {
    label: "Intermediate",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    barColor: "bg-yellow-500",
    width: "60%",
    order: 3,
  },
  [ProficiencyLevel.BEGINNER]: {
    label: "Beginner",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    barColor: "bg-purple-500",
    width: "40%",
    order: 2,
  },
};

/**
 * Professional skills database
 * Structured for easy filtering, sorting, and integration with projects
 */
export const skillsData = {
  // Metadata
  metadata: {
    title: "Technical Expertise",
    subtitle: "Skills and technologies I work with",
    totalSkills: 0, // Will be calculated
    lastUpdated: "2026-03-15",
    yearsCoding: 1.5,
    startedCoding: "September 2024",
  },

  // ============================================
  // 1. FRONTEND SKILLS
  // ============================================
  frontend: [
    {
      id: "react",
      name: "React",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1,
      icon: "fa-brands fa-react",
      projects: ["baraka-bliss-react", "portfolio"],
      description:
        "Building component-based user interfaces using hooks and modern React patterns",
      keywords: ["hooks", "context", "components", "state management"],
      highlights: [
        "Built full-stack booking platform with React",
        "Implemented custom hooks for data fetching",
        "Created reusable component library",
      ],
    },
    {
      id: "javascript",
      name: "JavaScript",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1.5,
      icon: "fa-brands fa-js",
      projects: ["baraka-bliss-react", "agri-match", "hackathon-projects"],
      description:
        "ES6+, asynchronous programming, API integration, and dynamic UI logic",
      keywords: ["ES6", "async/await", "promises", "DOM manipulation"],
      highlights: [
        "Used across all web projects",
        "Implemented complex async operations",
        "Built interactive UI components",
      ],
    },
    {
      id: "html5",
      name: "HTML5",
      level: ProficiencyLevel.ADVANCED,
      years: 1.5,
      icon: "fa-brands fa-html5",
      projects: ["all-web-projects"],
      description:
        "Semantic markup, responsive layouts, accessibility basics, and modern HTML techniques",
      keywords: ["semantic HTML", "accessibility", "SEO", "forms"],
      highlights: [
        "Built accessible web applications",
        "Implemented semantic structure for better SEO",
        "Created responsive layouts",
      ],
    },
    {
      id: "css3",
      name: "CSS3",
      level: ProficiencyLevel.ADVANCED,
      years: 1.5,
      icon: "fa-brands fa-css3-alt",
      projects: ["all-web-projects"],
      description:
        "Modern CSS techniques including Flexbox, Grid, and animations",
      keywords: ["flexbox", "grid", "animations", "responsive"],
      highlights: [
        "Created responsive designs for all projects",
        "Implemented complex layouts with CSS Grid",
        "Built custom animations",
      ],
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1,
      icon: "fa-brands fa-css3-alt",
      projects: ["portfolio", "baraka-bliss-react"],
      description:
        "Utility-first CSS framework for building responsive and modern UI layouts",
      keywords: ["utility classes", "responsive", "custom themes"],
      highlights: [
        "Built entire portfolio with Tailwind",
        "Implemented dark theme with custom colors",
        "Created responsive layouts efficiently",
      ],
    },
    {
      id: "framer-motion",
      name: "Framer Motion",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 0.5,
      icon: "fa-solid fa-magic",
      projects: ["portfolio"],
      description:
        "Adding smooth animations and transitions to React applications",
      keywords: ["animations", "transitions", "gestures"],
      highlights: [
        "Added professional animations to portfolio",
        "Implemented page transitions",
        "Created interactive hover effects",
      ],
    },
  ],

  // ============================================
  // 2. BACKEND SKILLS
  // ============================================
  backend: [
    {
      id: "nodejs",
      name: "Node.js",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1,
      icon: "fa-brands fa-node",
      projects: [
        "baraka-bliss-backend",
        "neuratrack-backend",
        "todo-api",
        "hackathon-apis",
      ],
      description:
        "Building REST APIs and backend services with JavaScript runtime environment",
      keywords: ["REST APIs", "middleware", "file handling", "authentication"],
      highlights: [
        "Built complete backend for Baraka Bliss",
        "Developed NeuraTrack API with JWT auth",
        "Created multiple hackathon backends",
      ],
    },
    {
      id: "express",
      name: "Express",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1,
      icon: "fa-solid fa-bolt",
      projects: ["baraka-bliss-backend", "neuratrack-backend", "todo-api"],
      description:
        "Creating RESTful APIs and middleware-based backend architecture",
      keywords: ["routing", "middleware", "error handling"],
      highlights: [
        "Built RESTful APIs for multiple projects",
        "Implemented custom middleware for auth",
        "Created error handling patterns",
      ],
    },
    // Add this to backend or languages section
{
  id: "django",
  name: "Django",
  level: ProficiencyLevel.INTERMEDIATE,
  years: 1,
  icon: "fa-brands fa-python", // or "fa-solid fa-server"
  projects: ["agri-match", "django-projects"],
  description: "Python web framework for building robust web applications quickly.",
  keywords: ["MVT", "ORM", "admin", "authentication"],
  highlights: [
    "Built Agri-Match as eMobilis final project",
    "Implemented user authentication and authorization",
    "Designed database models with Django ORM",
    "Created admin interface for content management",
  ],
}
  ],

  // ============================================
// 3. MOBILE SKILLS
// ============================================
mobile: [
  {
    id: "flutter",
    name: "Flutter",
    level: ProficiencyLevel.INTERMEDIATE, // Changed from BEGINNER to INTERMEDIATE
    years: 1,
    icon: "fa-solid fa-mobile",
    projects: ["baraka-bliss-flutter", "plp-pwa-project"],
    description:
      "Cross-platform mobile development with Flutter and Dart. Specialized in PWAs during PLP program.",
    keywords: ["widgets", "state management", "Firebase", "PWA"],
    highlights: [
      "PLP specialization in Mobile Friendly PWAs with Flutter",
      "Built Baraka Bliss mobile app as final project",
      "Developed cross-platform applications",
      "Currently learning advanced Flutter patterns",
    ],
  },
  {
    id: "dart",
    name: "Dart",
    level: ProficiencyLevel.INTERMEDIATE, // Changed from BEGINNER to INTERMEDIATE
    years: 1,
    icon: "fa-solid fa-code",
    projects: ["baraka-bliss-flutter"],
    description: "Programming language used for Flutter mobile development",
    keywords: ["OOP", "async", "collections", "Flutter"],
    highlights: [
      "Used extensively in PLP program",
      "Built complete Flutter applications",
      "Strong understanding of Dart fundamentals",
    ],
  },
],

  // ============================================
  // 4. PROGRAMMING LANGUAGES
  // ============================================
  languages: [
    {
      id: "python",
      name: "Python",
      level: ProficiencyLevel.ADVANCED,
      years: 1.5,
      icon: "fa-brands fa-python",
      projects: [
        "agri-match",
        "django-projects",
        "assignments",
        "ai-assignments",
        "kaggle-notebooks",
      ],
      description:
        "Data manipulation, basic machine learning, and experimenting with AI algorithms. Used for software engineering assignments and data analysis.",
      keywords: [
        "data analysis",
        "machine learning",
        "pandas",
        "numpy",
        "jupyter",
      ],
      highlights: [
        "Built AI/ML assignments for software engineering",
        "Created Kaggle notebooks for data analysis",
        "Used Jupyter Notebooks for experimentation",
        "Data manipulation with pandas",
        "Basic ML algorithms implementation",
      ],
    },
    {
      id: "java",
      name: "Java",
      level: ProficiencyLevel.BEGINNER,
      years: 1,
      icon: "fa-brands fa-java",
      projects: ["university-coursework"],
      description:
        "Object-oriented programming concepts including classes, inheritance, and encapsulation",
      keywords: ["OOP", "classes", "inheritance"],
      highlights: [
        "University coursework",
        "Learned OOP fundamentals",
        "Basic Java applications",
      ],
    },
    {
      id: "c",
      name: "C",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1,
      icon: "fa-solid fa-microchip",
      projects: ["university-coursework"],
      description:
        "Fundamental programming concepts including memory management and procedural programming",
      keywords: ["pointers", "memory management", "procedural"],
      highlights: [
        "University coursework",
        "Learned memory management",
        "Basic C programs",
      ],
    },
    {
      id: "r",
      name: "R",
      level: ProficiencyLevel.BEGINNER,
      years: 0.5,
      icon: "fa-solid fa-chart-line",
      projects: ["university-coursework"],
      description:
        "Data analysis and statistical computing (currently learning)",
      keywords: ["statistics", "data analysis", "visualization"],
      highlights: [
        "Currently learning at JKUAT",
        "Data analysis coursework",
        "Statistical computing",
      ],
    },
  ],

  // ============================================
  // 5. DATA SCIENCE & AI
  // ============================================
  dataScience: [
    {
      id: "jupyter",
      name: "Jupyter Notebooks",
      level: ProficiencyLevel.ADVANCED,
      years: 1.5,
      icon: "fa-solid fa-notebook",
      projects: ["ai-assignments", "kaggle-notebooks"],
      description:
        "Interactive development environment for data analysis, visualization, and AI experimentation.",
      keywords: ["notebooks", "visualization", "markdown", "code cells"],
      highlights: [
        "Used for AI assignments and experiments",
        "Data visualization and analysis",
        "Documentation and presentation of findings",
      ],
    },
    {
      id: "kaggle",
      name: "Kaggle",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1,
      icon: "fa-solid fa-brain",
      projects: ["kaggle-notebooks"],
      description:
        "Data science platform for competitions, datasets, and learning. Used for practical data analysis and ML experimentation.",
      keywords: ["competitions", "datasets", "notebooks", "community"],
      highlights: [
        "Created data analysis notebooks",
        "Explored datasets and ML algorithms",
        "Learning from community kernels",
      ],
    },
    {
      id: "pandas",
      name: "Pandas",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1,
      icon: "fa-solid fa-table",
      projects: ["ai-assignments", "kaggle-notebooks"],
      description:
        "Python library for data manipulation and analysis. Used for cleaning, transforming, and analyzing datasets.",
      keywords: ["dataframes", "data cleaning", "analysis"],
      highlights: [
        "Data manipulation for assignments",
        "Data cleaning and preprocessing",
        "Exploratory data analysis",
      ],
    },
  ],

  // ============================================
  // 6. DATABASES
  // ============================================
  databases: [
    {
      id: "mongodb",
      name: "MongoDB",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1,
      icon: "fa-solid fa-database",
      projects: ["baraka-bliss", "hackathon-projects"],
      description: "NoSQL database design and management",
      keywords: ["document store", "aggregation", "indexes"],
      highlights: [
        "Used in multiple projects",
        "Schema design for applications",
        "Performance optimization",
      ],
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 0.5,
      icon: "fa-solid fa-database",
      projects: ["neuratrack-backend"],
      description: "Relational database management system",
      keywords: ["SQL", "relations", "queries"],
      highlights: [
        "Used in NeuraTrack backend",
        "Learning SQL optimization",
        "Basic database design",
      ],
    },
    {
      id: "firebase",
      name: "Firebase",
      level: ProficiencyLevel.BEGINNER,
      years: 0.5,
      icon: "fa-solid fa-fire",
      projects: ["baraka-bliss-flutter"],
      description: "Backend-as-a-Service for mobile and web applications",
      keywords: ["authentication", "firestore", "storage"],
      highlights: [
        "Used in Flutter project",
        "Learning Firebase services",
        "Basic Firestore operations",
      ],
    },
     {
    id: "mysql",
    name: "MySQL",
    level: ProficiencyLevel.INTERMEDIATE,
    years: 1,
    icon: "fa-solid fa-database",
    projects: ["agri-match", "django-projects"],
    description: "Relational database management system used with Django for web applications.",
    keywords: ["SQL", "queries", "relations", "Django ORM"],
    highlights: [
      "Used in Agri-Match eMobilis project",
      "Database design and modeling",
      "SQL query optimization",
      "Integration with Django",
    ],
  },
  ],

  // ============================================
  // 7. TOOLS & DEPLOYMENT
  // ============================================
  tools: [
    {
      id: "git",
      name: "Git",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 2,
      icon: "fa-brands fa-git-alt",
      projects: ["all-projects"],
      description: "Version control, branching, and collaboration workflows",
      keywords: ["version control", "branching", "collaboration"],
      highlights: [
        "Used in all projects",
        "Branching and merging workflows",
        "Collaboration with team members",
      ],
    },
    {
      id: "github",
      name: "GitHub",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 2,
      icon: "fa-brands fa-github",
      projects: ["all-repositories"],
      description: "Code hosting, project management, and collaboration",
      keywords: ["repositories", "pull requests", "actions"],
      highlights: [
        "All code hosted on GitHub",
        "Project documentation",
        "Open source collaboration",
      ],
    },
    {
      id: "vercel",
      name: "Vercel",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1,
      icon: "fa-solid fa-cloud",
      projects: ["baraka-bliss-frontend", "portfolio"],
      description: "Frontend deployment and continuous integration",
      keywords: ["deployment", "hosting", "CI/CD"],
      highlights: [
        "Deployed Baraka Bliss frontend",
        "Hosting portfolio",
        "Learning deployment workflows",
      ],
    },
    {
      id: "render",
      name: "Render",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1,
      icon: "fa-solid fa-server",
      projects: ["multiple-backends"],
      description: "Hosting and deployment of backend APIs",
      keywords: ["backend hosting", "deployment", "environment"],
      highlights: [
        "Hosted multiple Node.js backends",
        "Environment configuration",
        "Production deployments",
      ],
    },
    {
      id: "postman",
      name: "Postman",
      level: ProficiencyLevel.INTERMEDIATE,
      years: 1,
      icon: "fa-solid fa-envelope",
      projects: ["api-development"],
      description: "API testing and documentation",
      keywords: ["API testing", "collections", "environments"],
      highlights: [
        "Tested all APIs during development",
        "Created API collections",
        "Environment management",
      ],
    },
  ],

  // ============================================
  // 8. CURRENTLY LEARNING
  // ============================================
  learning: [
    {
      id: "r-learning",
      name: "R for Data Analysis",
      progress: 40,
      icon: "fa-solid fa-chart-line",
      reason: "Mathematics & Computer Science coursework at JKUAT",
      expectedCompletion: "2026",
      resources: ["University courses", "DataCamp"],
      projects: [],
    },
    {
      id: "flutter-advanced",
      name: "Advanced Flutter",
      progress: 30,
      icon: "fa-solid fa-mobile",
      reason: "Developing Baraka Bliss mobile app",
      expectedCompletion: "2026",
      resources: ["Flutter documentation", "YouTube tutorials"],
      projects: ["baraka-bliss-flutter"],
    },
    {
      id: "system-design",
      name: "System Design for Backend",
      progress: 25,
      icon: "fa-solid fa-sitemap",
      reason: "Improving backend architecture for APIs",
      expectedCompletion: "2026",
      resources: ["System Design Interview course", "Tech blogs"],
      projects: ["neuratrack-backend"],
    },
    // Add to learning array around line 400
    {
      id: "cloud-learning",
      name: "Cloud Computing (AWS)",
      progress: 15,
      icon: "fa-solid fa-cloud",
      reason: "Future goal for scalable deployments",
      expectedCompletion: "2026",
      resources: ["AWS Free Tier", "Online Courses"],
      projects: [],
    },
    {
      id: "ai-ml-learning",
      name: "AI & Machine Learning",
      progress: 20,
      icon: "fa-solid fa-brain",
      reason: "Expanding data science skills",
      expectedCompletion: "2026",
      resources: ["Kaggle", "Coursera"],
      projects: ["ai-assignments"],
    },
  ],

// ============================================
// 9. CERTIFICATIONS
// ============================================
certifications: [
  {
    id: "plp-software-dev",
    name: "Software Development Certificate",
    issuer: "Power Learn Project (PLP)",
    date: "July - November 2025",
    credentialId: "Available",
    logo: "/certificates/plp-logo.png",
    certificateImage: "/certificates/plp-certificate.jpg",
    description:
      "16-week intensive program covering Software Development with specialization in Mobile Friendly PWAs with Dart and Flutter. The curriculum included Python programming, Web Technologies, Database Management, Startup Building & Employability, and Software Engineering Essentials. The specialization focused on building Progressive Web Apps using Flutter and Dart, with hands-on projects including AI/ML experimentation using Jupyter Notebooks and Kaggle.",
    skills: [
      "Python",
      "Flutter",
      "Dart",
      "Progressive Web Apps",
      "Jupyter Notebooks",
      "Kaggle",
      "AI/ML Fundamentals",
      "Database Management",
      "Software Engineering",
    ],
    link: "#",
    featured: true,
  },
  {
    id: "emobilis-fullstack",
    name: "Full Stack Development Certificate",
    issuer: "eMobilis Technology Training Institute",
    date: "September - November 2024 (8 weeks)",
    credentialId: "Pending",
    logo: "/certificates/emobilis-logo.png",
    certificateImage: null, 
    description:
      "8-week intensive Full Stack Development program covering frontend and backend technologies. The course included HTML5, CSS3, JavaScript for frontend development, and Python with Django for backend development, with MySQL for database management. The final project, Agri-Match, was a platform connecting farmers with machinery rentals and skilled operators, demonstrating full-stack capabilities including user authentication, database design, and responsive UI development.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Python",
      "Django",
      "MySQL",
      "Full Stack Development",
      "Responsive Design",
      "User Authentication",
    ],
    link: "#",
    featured: true,
  },
],

  // ============================================
  // 10. FUN STATS
  // ============================================
  funStats: {
    codingSince: "September 2024",
    yearsActive: 1.5,
    totalProjects: 8,
    hackathonsParticipated: 5,
    githubContributions: "450+ (2025)",
    linesOfCode: "50,000+",
    technologiesUsed: 30,
    coffeeConsumed: "☕☕☕☕☕",
  },

  // ============================================
  // HELPER METHODS
  // ============================================

  // Get all skills
  getAllSkills: function () {
    return [
      ...this.frontend,
      ...this.backend,
      ...this.mobile,
      ...this.languages,
      ...(this.dataScience || []),
      ...this.databases,
      ...this.tools,
    ];
  },

  // Get skills by category
  getByCategory: function (category) {
    switch (category) {
      case SkillCategory.FRONTEND:
        return this.frontend;
      case SkillCategory.BACKEND:
        return this.backend;
      case SkillCategory.MOBILE:
        return this.mobile;
      case SkillCategory.LANGUAGES:
        return this.languages;
      case SkillCategory.DATA_SCIENCE:
        return this.dataScience || [];
      case SkillCategory.DATABASES:
        return this.databases;
      case SkillCategory.TOOLS:
        return this.tools;
      case SkillCategory.LEARNING:
        return this.learning;
      default:
        return this.getAllSkills();
    }
  },

  // Get skills by proficiency level
  getByLevel: function (level) {
    return this.getAllSkills().filter((skill) => skill.level === level);
  },

  // Get skills related to a specific project
  getByProject: function (projectId) {
    return this.getAllSkills().filter(
      (skill) => skill.projects && skill.projects.includes(projectId),
    );
  },

  // Search skills by keyword
  searchSkills: function (query) {
    const searchTerm = query.toLowerCase();
    return this.getAllSkills().filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchTerm) ||
        skill.description.toLowerCase().includes(searchTerm) ||
        skill.keywords?.some((k) => k.toLowerCase().includes(searchTerm)),
    );
  },

  // Get category counts
  getCategoryCounts: function () {
    return {
      frontend: this.frontend.length,
      backend: this.backend.length,
      mobile: this.mobile.length,
      languages: this.languages.length,
      dataScience: this.dataScience?.length || 0,
      databases: this.databases.length,
      tools: this.tools.length,
      learning: this.learning.length,
      total: this.getAllSkills().length,
    };
  },

  // Update metadata
  updateMetadata: function () {
    this.metadata.totalSkills = this.getAllSkills().length;
    return this.metadata;
  },
};

// Initialize metadata
skillsData.updateMetadata();

// Add this after the helper methods, before the exports

// ============================================
// PROJECT-SKILL MAPPING
// ============================================

// Map project IDs to the skills used in them
export const projectSkillsMap = {
  "baraka-bliss-react": [
    "react",
    "javascript",
    "html5",
    "css3",
    "tailwind",
    "nodejs",
    "express",
    "mongodb",
    "git",
    "github",
    "vercel",
    "render",
  ],
  "baraka-bliss-backend": [
    "nodejs",
    "express",
    "mongodb",
    "git",
    "github",
    "render",
    "postman",
  ],
  "neuratrack-backend": [
    "nodejs",
    "express",
    "postgresql",
    "git",
    "github",
    "render",
    "postman",
    "system-design",
  ],
  "todo-api": ["nodejs", "express", "mongodb", "git", "github"],
  "agri-match": [
    "python",
    "django",
    "javascript",
    "html5",
    "css3",
    "git",
    "github",
  ],
  dryplan: ["nodejs", "express", "mongodb", "git", "github", "postman"],
  canopy: ["nodejs", "express", "mongodb", "git", "github", "postman"],
  logigas: ["nodejs", "express", "mongodb", "git", "github", "postman"],
  portfolio: [
    "react",
    "javascript",
    "html5",
    "css3",
    "tailwind",
    "framer-motion",
    "git",
    "github",
    "vercel",
  ],
  "baraka-bliss-flutter": ["flutter", "dart", "firebase", "git", "github"],
  "kaggle-notebooks": ["python", "jupyter", "pandas", "kaggle"],
  "ai-assignments": ["python", "jupyter", "pandas"],
  "hackathon-apis": [
    "nodejs",
    "express",
    "mongodb",
    "git",
    "github",
    "postman",
  ],
  "all-web-projects": ["html5", "css3", "javascript"],
  "all-projects": ["git", "github"],
  "all-repositories": ["github"],
  "api-development": ["postman"],
  "django-projects": ["python", "django"],
  "university-coursework": ["java", "c", "r"],
};

// Map skill IDs to the projects that use them (inverse of above)
export const skillProjectsMap = {};

// Build the inverse mapping
Object.entries(projectSkillsMap).forEach(([projectId, skillIds]) => {
  skillIds.forEach((skillId) => {
    if (!skillProjectsMap[skillId]) {
      skillProjectsMap[skillId] = [];
    }
    if (!skillProjectsMap[skillId].includes(projectId)) {
      skillProjectsMap[skillId].push(projectId);
    }
  });
});

// Export individual sections for granular imports
export const frontendSkills = skillsData.frontend;
export const backendSkills = skillsData.backend;
export const mobileSkills = skillsData.mobile;
export const languagesSkills = skillsData.languages;
export const dataScienceSkills = skillsData.dataScience;
export const databasesSkills = skillsData.databases;
export const toolsSkills = skillsData.tools;
export const learningSkills = skillsData.learning;
export const certificationsList = skillsData.certifications;
export const funStats = skillsData.funStats;

export default skillsData;
