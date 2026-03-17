// src/components/about/AboutSection.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import aboutData, {
  getDisplayName,
  getInitials,
  getLocationWithFlag,
} from "../../data/aboutData";
import SEOHelper from '../common/SEOHelper';
import PageTransition from '../common/PageTransition';
import AnimatedCounter from '../common/AnimatedCounter';

const AboutSection = () => {
  const [expandedBio, setExpandedBio] = useState(false);
  const [activeTab, setActiveTab] = useState("bio"); // 'bio', 'journey', 'interests'

  return (
    <>
      <SEOHelper 
        title="About | Natasha Hinga - Full-Stack Developer"
        description="Learn more about Natasha Hinga, a Mathematics & Computer Science student at JKUAT building innovative web and mobile solutions."
      />
      <PageTransition>
      <section id="about" className="py-20 bg-primary relative overflow-hidden">
        {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-accent-dark/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-2 block">
            Get to Know Me
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
            About Me
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            The person behind the code
          </p>
        </motion.div>

        {/* About Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Photo & Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border sticky top-24">
              {/* Photo with animated border */}
              <div className="relative mb-6 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-dark rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary">
                  {aboutData.metadata.photoAvailable ? (
                    <img
                      src={aboutData.metadata.photoUrl}
                      alt={aboutData.metadata.photoAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-gradient-to-br from-accent to-accent-dark 
                                  flex items-center justify-center"
                    >
                      <span className="text-5xl font-display font-bold text-white/90">
                        {getInitials()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Online/Available indicator */}
                <div className="absolute bottom-2 right-1/2 translate-x-12">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                  </span>
                </div>
              </div>

              {/* Name & Title with typing animation */}
              <div className="text-center mb-4">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-display font-bold text-text-primary"
                >
                  {getDisplayName()}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-accent mt-1"
                >
                  {aboutData.basic.title}
                </motion.p>
              </div>

              {/* Location & Contact with hover effects */}
              <div className="space-y-2 mb-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-text-secondary group cursor-default"
                >
                  <i className="fa-solid fa-location-dot text-accent w-5 group-hover:scale-110 transition-transform"></i>
                  <span>{getLocationWithFlag()}</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-text-secondary group cursor-default"
                >
                  <i className="fa-solid fa-building-columns text-accent w-5 group-hover:scale-110 transition-transform"></i>
                  <span>{aboutData.basic.university}</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-text-secondary group cursor-default"
                >
                  <i className="fa-solid fa-calendar text-accent w-5 group-hover:scale-110 transition-transform"></i>
                  <span>{aboutData.basic.yearsActive}</span>
                </motion.div>
              </div>

              {/* Quick Stats with animated counters */}
              <div className="grid grid-cols-3 gap-2 mb-6">
               {[
  { value: "5+", label: "Projects" },
  { value: "5", label: "Hackathons" },
  { value: "1.5", label: "Years" },
].map((stat, index) => (
  <motion.div
    key={index}
    whileHover={{ scale: 1.05, y: -2 }}
    className="bg-primary/50 rounded-lg p-3 text-center cursor-default"
  >
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      className="text-xl font-bold text-accent"
    >
      {stat.value.includes('+') ? (
        <>
          <AnimatedCounter value={stat.value.replace('+', '')} />+
        </>
      ) : (
        <AnimatedCounter value={stat.value} />
      )}
    </motion.div>
    <div className="text-xs text-text-secondary">
      {stat.label}
    </div>
  </motion.div>
))}
              </div>

              {/* Resume Button */}
              {aboutData.resume.available && (
                <motion.a
                  href={aboutData.resume.url}
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline w-full mb-6 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-file-pdf"></i>
                  Download Resume
                </motion.a>
              )}

              {/* Social Links with hover animations */}
              <div className="flex justify-center gap-3">
                {Object.values(aboutData.social).map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center
                             hover:bg-accent/20 transition-colors group relative"
                    title={social.label}
                  >
                    <i
                      className={`${social.icon} text-text-secondary group-hover:text-accent`}
                    ></i>

                    {/* Tooltip */}
                    <span
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                                   text-xs bg-secondary px-2 py-1 rounded opacity-0 
                                   group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tabs & Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b border-border pb-2">
              {[
                { id: "bio", label: "Bio", icon: "fa-solid fa-user" },
                {
                  id: "journey",
                  label: "Journey",
                  icon: "fa-solid fa-timeline",
                },
                {
                  id: "interests",
                  label: "Interests",
                  icon: "fa-solid fa-heart",
                },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      activeTab === tab.id
                        ? "bg-accent text-primary"
                        : "text-text-secondary hover:text-accent hover:bg-accent/10"
                    }`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {/* Bio Tab */}
              {activeTab === "bio" && (
                <motion.div
                  key="bio"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Short Bio Card */}
                  <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                    <p className="text-text-secondary text-lg leading-relaxed">
                      {aboutData.bio.medium}
                    </p>
                  </div>

                  {/* Full Bio Card (expandable) */}
                  <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-display font-semibold text-text-primary">
                        My Journey
                      </h3>
                      <button
                        onClick={() => setExpandedBio(!expandedBio)}
                        className="text-accent hover:text-accent-dark transition-colors text-sm"
                      >
                        {expandedBio ? "Show less" : "Read more"}
                      </button>
                    </div>

                    <AnimatePresence>
                      <motion.div
                        className="space-y-4 text-text-secondary"
                        initial={false}
                        animate={{ height: expandedBio ? "auto" : "100px" }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                      >
                        {aboutData.bio.full
                          .split("\n\n")
                          .map((paragraph, index) => (
                            <p key={index} className="leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                      </motion.div>
                    </AnimatePresence>

                    {!expandedBio && (
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-secondary to-transparent"></div>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-language text-accent"></i>
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {aboutData.personal.languages.map((lang, index) => (
                        <motion.div
                          key={lang.name}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 bg-primary/30 px-3 py-2 rounded-lg"
                        >
                          <i className={lang.icon}></i>
                          <span className="text-text-primary">{lang.name}</span>
                          <span className="text-xs px-2 py-1 bg-accent/10 rounded-full text-accent">
                            {lang.proficiency}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Journey Tab */}
              {activeTab === "journey" && (
                <motion.div
                  key="journey"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border"
                >
                  <h3 className="text-xl font-display font-semibold text-text-primary mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-timeline text-accent"></i>
                    My Timeline
                  </h3>

                  <div className="space-y-4">
                    {aboutData.journey.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8 pb-4 border-l-2 border-accent/30 last:border-0"
                      >
                        {/* Timeline Dot */}
                        <div
                          className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full 
                                      ${item.isCurrent ? "bg-accent animate-pulse" : "bg-accent/50"}`}
                        >
                          {item.isCurrent && (
                            <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75"></span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm text-accent">
                            {item.year}
                          </span>
                          <i
                            className={`${item.icon} text-accent/70 text-sm`}
                          ></i>
                        </div>
                        <h4 className="text-text-primary font-medium mb-1">
                          {item.title}
                        </h4>
                        <p className="text-text-secondary text-sm">
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Interests Tab */}
              {activeTab === "interests" && (
                <motion.div
                  key="interests"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Hobbies */}
                  <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-heart text-accent"></i>
                      Hobbies & Interests
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {aboutData.personal.hobbies.map((hobby, index) => (
                        <motion.div
                          key={hobby.name}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="bg-primary/30 rounded-lg p-4 flex items-start gap-3 group cursor-default"
                        >
                          <div
                            className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center
                                        group-hover:bg-accent/20 transition-colors"
                          >
                            <i
                              className={`${hobby.icon} text-accent text-lg`}
                            ></i>
                          </div>
                          <div>
                            <h4 className="text-text-primary font-medium mb-1">
                              {hobby.name}
                            </h4>
                            <p className="text-text-secondary text-sm">
                              {hobby.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Fun Facts */}
                  <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-star text-accent"></i>
                      Fun Facts
                    </h3>

                    <div className="grid grid-cols-1 gap-3">
                      {aboutData.personal.funFacts.map((fact, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 bg-primary/30 rounded-lg p-3"
                        >
                          <i className={`${fact.icon} text-accent mt-1`}></i>
                          <p className="text-text-secondary text-sm">
                            {fact.fact}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
    </PageTransition>
    </>
  );
};

export default AboutSection;
