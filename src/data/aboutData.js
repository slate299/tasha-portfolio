// src/data/aboutData.js
// Professional about me data structure - scalable and easy to update

/**
 * About me information
 * Structured for easy updates and consistent display
 */
export const aboutData = {
  // Basic Information
  basic: {
    name: "Natasha Wambui Hinga",
    preferredName: "Tasha",
    title: "Full-Stack Developer & Mathematics/CS Student",
    location: "Nairobi, Kenya",
    email: "natashahinga58@gmail.com",
    university:
      "Jomo Kenyatta University of Agriculture and Technology (JKUAT)",
    degree: "BSc Mathematics & Computer Science",
    yearsActive: "2024 - 2028",
  },

  // Professional Bio (3 paragraphs for flexibility)
  bio: {
    short:
      "Mathematics & Computer Science student at JKUAT with a passion for building full-stack web and mobile applications that solve real problems.",

    medium:
      "I'm a full-stack developer based in Nairobi, Kenya, currently pursuing my degree in Mathematics & Computer Science at JKUAT. My journey into tech started in September 2024, and since then I've built everything from booking platforms for local businesses to healthcare APIs and hackathon projects.",

    full: `My journey into software development began with curiosity and has evolved into a passion for creating solutions that make a difference. As a Mathematics & Computer Science student at JKUAT, I've developed a strong foundation in problem-solving and logical thinking that I apply to every project I build.

I specialize in full-stack JavaScript development with React and Node.js, but I'm constantly expanding my toolkit. Recently, I've been diving into data science with Python and exploring mobile development with Flutter. I believe in writing clean, maintainable code and building applications that users actually enjoy using.

What drives me is the opportunity to work on projects that have real impact - whether it's helping a local business digitize their operations with Baraka Bliss, building health-tech solutions with NeuraTrack, or collaborating with teams in hackathons. I'm excited about the future of tech in Kenya and eager to contribute to its growth.`,
  },

  // Personal Details
  personal: {
    birthday: "Not publicly displayed", // Privacy first!
    languages: [
      {
        name: "English",
        proficiency: "Fluent",
        level: 100, // for progress bar if needed
        icon: "fa-solid fa-language",
      },
      {
        name: "Swahili",
        proficiency: "Fluent",
        level: 100,
        icon: "fa-solid fa-language",
      },
      {
        name: "Kikuyu",
        proficiency: "Native",
        level: 100,
        icon: "fa-solid fa-language",
      },
    ],

    hobbies: [
      {
        name: "Coding Side Projects",
        icon: "fa-solid fa-code",
        description: "Building things that don't exist yet",
      },
      {
        name: "Hackathons",
        icon: "fa-solid fa-trophy",
        description: "Love the adrenaline of building under pressure",
      },
      {
        name: "Tech Blogging",
        icon: "fa-solid fa-pen",
        description: "Sharing what I learn along the way",
      },
      {
        name: "Open Source",
        icon: "fa-solid fa-code-branch",
        description: "Contributing to the developer community",
      },
      {
        name: "Mathematics Puzzles",
        icon: "fa-solid fa-calculator",
        description: "Keeping my problem-solving skills sharp",
      },
    ],

    interests: [
      "Web Development",
      "Mobile Apps",
      "Data Science",
      "AI/ML",
      "Open Source",
      "Tech Education",
    ],

    funFacts: [
      {
        fact: "Started coding in September 2024 and built my first full-stack app within 6 months",
        icon: "fa-solid fa-rocket",
      },
      {
        fact: "Participated in 5 hackathons in my first year of coding",
        icon: "fa-solid fa-trophy",
      },
      {
        fact: "Built a production app for a real client before finishing my second year",
        icon: "fa-solid fa-briefcase",
      },
      {
        fact: "Co-founded GRAF HET Developers with my brother",
        icon: "fa-solid fa-handshake",
      },
    ],
  },

  // Professional Journey Timeline (compact version)
  journey: [
    {
      year: "2024",
      title: "Started Coding Journey",
      description: "Began learning at JKUAT and eMobilis",
      icon: "fa-solid fa-play",
    },
    {
      year: "2025",
      title: "First Projects & Hackathons",
      description: "Built NeuraTrack, participated in 3 hackathons",
      icon: "fa-solid fa-trophy",
    },
    {
      year: "2025",
      title: "PLP Certification",
      description: "Completed 16-week software development program",
      icon: "fa-solid fa-certificate",
    },
    {
      year: "2025",
      title: "First Client Project",
      description: "Baraka Bliss Staycations for Rose Tom",
      icon: "fa-solid fa-briefcase",
    },
    {
      year: "2026",
      title: "Data Science & AI",
      description: "Expanding into Python, Jupyter, and ML",
      icon: "fa-solid fa-brain",
    },
    {
      year: "2026",
      title: "Current Focus",
      description: "Advanced Flutter, System Design, and R",
      icon: "fa-solid fa-rocket",
      isCurrent: true,
    },
  ],

  // Social Media Links (consolidated)
  social: {
    github: {
      url: "https://github.com/slate299",
      username: "slate299",
      icon: "fa-brands fa-github",
      label: "GitHub",
    },
    linkedin: {
      url: "https://www.linkedin.com/in/natasha-hinga-a2b268337",
      username: "natasha-hinga",
      icon: "fa-brands fa-linkedin-in",
      label: "LinkedIn",
    },
    twitter: {
      url: "https://x.com/HingaNatas39546",
      username: "@HingaNatas39546",
      icon: "fa-brands fa-x-twitter",
      label: "Twitter/X",
    },
    email: {
      url: "mailto:natashahinga58@gmail.com",
      username: "natashahinga58@gmail.com",
      icon: "fa-solid fa-envelope",
      label: "Email",
    },
  },

  // Resume/CV
  resume: {
    available: true,
    url: "/Natasha_Hinga_Resume.pdf", // You'll add this file later
    lastUpdated: "2026-03-15",
    formats: ["PDF"],
    downloadCount: 0, // Will track via analytics
  },

  // Call to Action preferences
  cta: {
    primary: "View My Work",
    secondary: "Let's Talk",
    resume: "Download Resume",
  },

  // Metadata for the section
  metadata: {
    lastUpdated: "2026-03-15",
    version: "1.0.0",
    photoAvailable: false, // Set to true when you add photo
    photoUrl: "/images/profile.jpg", // Add this line
    photoAlt: "Natasha Hinga - Full-Stack Developer",
    showHobbies: true,
    showJourney: true,
    showFunFacts: true,
  },
};

// Helper function to get full name with preferred display
export const getDisplayName = () => {
  return aboutData.basic.preferredName
    ? `${aboutData.basic.preferredName} ${aboutData.basic.name.split(" ").slice(1).join(" ")}`
    : aboutData.basic.name;
};

// Helper to get initials for avatar placeholder
export const getInitials = () => {
  const name = aboutData.basic.preferredName || aboutData.basic.name;
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Helper to format location with flag emoji (optional)
export const getLocationWithFlag = () => {
  return `🇰🇪 ${aboutData.basic.location}`;
};

// Export individual sections for granular imports
export const basicInfo = aboutData.basic;
export const bio = aboutData.bio;
export const personalDetails = aboutData.personal;
export const journeyTimeline = aboutData.journey;
export const socialLinks = aboutData.social;
export const resumeInfo = aboutData.resume;

export default aboutData;
