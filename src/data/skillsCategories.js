// src/data/skillsCategories.js
// Category configuration for the skills section UI

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

export const skillCategories = [
  {
    id: SkillCategory.FRONTEND,
    name: "Frontend Development",
    icon: "fa-solid fa-code",
    description: "Building responsive and interactive user interfaces",
    color: "from-blue-500 to-cyan-500",
    count: 0, // Will be populated
  },
  {
    id: SkillCategory.BACKEND,
    name: "Backend Development",
    icon: "fa-solid fa-server",
    description: "Creating robust APIs and server-side logic",
    color: "from-green-500 to-emerald-500",
    count: 0,
  },
  {
    id: SkillCategory.MOBILE,
    name: "Mobile Development",
    icon: "fa-solid fa-mobile-screen",
    description: "Building cross-platform mobile applications",
    color: "from-purple-500 to-pink-500",
    count: 0,
  },
  {
    id: SkillCategory.LANGUAGES,
    name: "Programming Languages",
    icon: "fa-solid fa-code-branch",
    description: "Languages I use for development",
    color: "from-yellow-500 to-orange-500",
    count: 0,
  },
  {
    id: SkillCategory.DATA_SCIENCE,
    name: "Data Science & AI",
    icon: "fa-solid fa-brain",
    description: "Data analysis, machine learning, and AI experimentation",
    color: "from-indigo-500 to-purple-500",
    count: 0,
  },
  {
    id: SkillCategory.DATABASES,
    name: "Databases",
    icon: "fa-solid fa-database",
    description: "Data storage and management",
    color: "from-red-500 to-pink-500",
    count: 0,
  },
  {
    id: SkillCategory.TOOLS,
    name: "Tools & Deployment",
    icon: "fa-solid fa-screwdriver-wrench",
    description: "Development tools and deployment platforms",
    color: "from-gray-500 to-slate-500",
    count: 0,
  },
  {
    id: SkillCategory.LEARNING,
    name: "Currently Learning",
    icon: "fa-solid fa-graduation-cap",
    description: "Skills I am actively developing",
    color: "from-accent to-accent-dark",
    count: 0,
  },
];

export const getCategoryById = (id) => {
  return skillCategories.find((cat) => cat.id === id);
};

export default skillCategories;
