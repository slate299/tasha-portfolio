export const heroData = {
  greeting: "👋 Hi, I'm",
  name: "Natasha Hinga",
  headline: {
    before: "Innovative Web Development",
    gradient: "Fueled by Curiosity and Code",
  },
  description:
    "Mathematics & Computer Science student at JKUAT. I build full-stack web and mobile applications. I help businesses, startups, and entrepreneurs bring their ideas to life with interactive, reliable, and modern software solutions.",
  location: "Nairobi, Kenya",

  // ===== ADD THIS PROFILE PICTURE SECTION =====
  profilePicture: {
    enabled: true,        // Set to true when you have a photo
    url: "/images/profile.jpg",  // Path to your photo (add later)
    alt: "Natasha Hinga - Full-Stack Developer",
    placeholder: "NH",      // Fallback when no photo
    size: "medium",         // 'small', 'medium', 'large'
  },
  // ============================================

  stats: [
    { number: "5+", label: "Projects Deployed", icon: "fa-solid fa-code" },
    { number: "5+", label: "Hackathons", icon: "fa-solid fa-trophy" },
    { number: "2", label: "Years Coding", icon: "fa-solid fa-clock" },
  ],

  primaryCta: {
    text: "View My Work",
    link: "#projects",
  },

  secondaryCta: {
    text: "Let's Talk",
    link: "#contact",
  },

  social: [
    {
      name: "GitHub",
      icon: "fa-brands fa-github",
      url: "https://github.com/slate299",
      username: "slate299",
    },
    {
      name: "LinkedIn",
      icon: "fa-brands fa-linkedin-in",
      url: "https://www.linkedin.com/in/natasha-hinga-a2b268337",
      username: "natasha-hinga",
    },
    {
      name: "Twitter",
      icon: "fa-brands fa-x-twitter",
      url: "https://x.com/HingaNatas39546",
      username: "@HingaNatas39546",
    },
  ],

  // You can keep or remove this line - the code will work with both
  profilePlaceholder: "NH",  // Optional - can keep for backward compatibility
};