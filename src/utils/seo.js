// src/utils/seo.js
// Helper functions for dynamic SEO updates

export const updateMetaTags = (title, description, image) => {
  // Update title
  document.title = title;
  
  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // Update Open Graph tags
  const updateMetaTag = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (tag) {
      tag.setAttribute('content', content);
    }
  };
  
  updateMetaTag('og:title', title);
  updateMetaTag('og:description', description);
  updateMetaTag('og:image', image);
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:image', image);
};

// Structured data for better SEO (JSON-LD)
export const getStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Natasha Hinga",
    "url": "https://yourdomain.com",
    "sameAs": [
      "https://github.com/slate299",
      "https://linkedin.com/in/natasha-hinga-a2b268337",
      "https://x.com/HingaNatas39546"
    ],
    "jobTitle": "Full-Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Jomo Kenyatta University of Agriculture and Technology"
      },
      {
        "@type": "CollegeOrUniversity",
        "name": "Power Learn Project"
      },
      {
        "@type": "CollegeOrUniversity",
        "name": "eMobilis Technology Training Institute"
      }
    ],
    "knowsAbout": [
      "React",
      "Node.js",
      "Python",
      "Flutter",
      "MongoDB",
      "PostgreSQL"
    ]
  };
};