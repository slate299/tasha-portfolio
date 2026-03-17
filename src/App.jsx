import React, { useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";  // Removed AnimatePresence import
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import BackToTopPremium from "./components/common/BackToTopPremium";
import PageTransition from "./components/common/PageTransition";
import { trackSessionStart, trackPageView } from "./utils/analytics";
import { getStructuredData } from "./utils/seo";

// Lazy load non-critical sections
const ProjectsSection = lazy(() => import("./components/projects/ProjectsSection"));
const SkillsSection = lazy(() => import("./components/skills/SkillsSection"));
const AboutSection = lazy(() => import("./components/about/AboutSection"));
const ContactSection = lazy(() => import("./components/contact/ContactSection"));
const NewsletterSection = lazy(() => import("./components/newsletter/NewsletterSection"));

// Loading component
const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-accent/30 rounded-full"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    trackSessionStart();
    trackPageView('home');
  }, []);

  useEffect(() => {
    const structuredData = getStructuredData();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>
      
      {/* Render sections directly - no AnimatePresence needed */}
      <Suspense fallback={<SectionLoader />}>
        <PageTransition>
          <Hero />
        </PageTransition>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <PageTransition>
          <ProjectsSection />
        </PageTransition>
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <PageTransition>
          <SkillsSection />
        </PageTransition>
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <PageTransition>
          <AboutSection />
        </PageTransition>
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <PageTransition>
          <NewsletterSection />
        </PageTransition>
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <PageTransition>
          <ContactSection />
        </PageTransition>
      </Suspense>
      
      <BackToTopPremium />
    </div>
  );
}

export default App;