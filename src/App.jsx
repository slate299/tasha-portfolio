import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import ProjectsSection from "./components/projects/ProjectsSection";
import { trackSessionStart } from "./utils/analytics";
import SkillsSection from "./components/skills/SkillsSection";
import AboutSection from "./components/about/AboutSection";

function App() {
  useEffect(() => {
    trackSessionStart();
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
    </div>
  );
}

export default App;
