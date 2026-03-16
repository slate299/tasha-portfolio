// src/components/skills/CertificationsSection.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  certificationsList,
  learningSkills,
  funStats,
} from "../../data/skillsData";

const CertificationsSection = () => {
  const [expandedCert, setExpandedCert] = useState(null);
  const [showAllCerts, setShowAllCerts] = useState(false);

  // Display limited or all certifications
  const displayedCerts = showAllCerts
    ? certificationsList
    : certificationsList.slice(0, 2);

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-40 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-accent-dark/10 rounded-full blur-3xl"></div>
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
            Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
            Certifications & Learning
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Formal training and continuous skill development
          </p>
        </motion.div>

        {/* Main Grid - SWAPPED: Learning/Stats on left, Certifications on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Currently Learning & Fun Stats (Now takes 1/3) */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              {/* Currently Learning */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border h-fit"
              >
                <h3 className="text-xl font-display font-semibold text-text-primary mb-6 flex items-center gap-3">
                  <i className="fa-solid fa-graduation-cap text-accent"></i>
                  Currently Learning
                </h3>

                <div className="space-y-6">
                  {learningSkills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <i className={`${skill.icon} text-accent`}></i>
                          <span className="text-text-primary font-medium text-sm">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-accent text-xs font-semibold">
                          {skill.progress}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-1.5 bg-primary rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full"
                        />
                      </div>

                      <p className="text-xs text-text-secondary line-clamp-2">
                        {skill.reason}
                      </p>
                      {skill.expectedCompletion && (
                        <p className="text-xs text-accent mt-1">
                          Est: {skill.expectedCompletion}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Fun Stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border h-fit"
              >
                <h3 className="text-xl font-display font-semibold text-text-primary mb-6 flex items-center gap-3">
                  <i className="fa-solid fa-chart-simple text-accent"></i>
                  Fun Stats
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-text-secondary text-sm">
                      Coding Since
                    </span>
                    <span className="text-text-primary font-medium text-sm">
                      {funStats.codingSince}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-text-secondary text-sm">
                      Years Active
                    </span>
                    <span className="text-text-primary font-medium text-sm">
                      {funStats.yearsActive}+
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-text-secondary text-sm">
                      Projects
                    </span>
                    <span className="text-text-primary font-medium text-sm">
                      {funStats.totalProjects}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-text-secondary text-sm">
                      Hackathons
                    </span>
                    <span className="text-text-primary font-medium text-sm">
                      {funStats.hackathonsParticipated}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-text-secondary text-sm">GitHub</span>
                    <span className="text-text-primary font-medium text-sm">
                      {funStats.githubContributions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-text-secondary text-sm">
                      Technologies
                    </span>
                    <span className="text-text-primary font-medium text-sm">
                      {funStats.technologiesUsed}+
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-text-secondary text-sm">Coffee</span>
                    <span className="text-xl">{funStats.coffeeConsumed}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN - Certifications (Now takes 2/3) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-display font-semibold text-text-primary flex items-center gap-3">
                <i className="fa-solid fa-certificate text-accent"></i>
                Certifications
              </h3>
              {certificationsList.length > 2 && (
                <button
                  onClick={() => setShowAllCerts(!showAllCerts)}
                  className="text-accent hover:text-accent-dark transition-colors text-sm font-medium"
                >
                  {showAllCerts
                    ? "Show Less"
                    : `View All (${certificationsList.length})`}
                </button>
              )}
            </div>

            <div className="space-y-4">
              {displayedCerts.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-secondary/50 backdrop-blur-sm rounded-xl overflow-hidden
                           border border-border hover:border-accent/50 
                           transition-all duration-300 group"
                >
                  {/* Certificate Card */}
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon/Avatar */}
                      <div
                        className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent-dark/20 
                                   rounded-xl flex items-center justify-center flex-shrink-0
                                   group-hover:from-accent/30 group-hover:to-accent-dark/30 
                                   transition-all duration-300"
                      >
                        <i className="fa-solid fa-scroll text-3xl text-accent"></i>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4
                              className="text-xl font-display font-semibold text-text-primary 
                                       group-hover:text-accent transition-colors mb-1"
                            >
                              {cert.name}
                            </h4>
                            <p className="text-text-secondary mb-2">
                              {cert.issuer} • {cert.date}
                            </p>
                          </div>

                          {/* Expand/Collapse Button */}
                          <button
                            onClick={() =>
                              setExpandedCert(
                                expandedCert === cert.id ? null : cert.id,
                              )
                            }
                            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center
                                     hover:bg-accent/20 transition-colors flex-shrink-0"
                          >
                            <i
                              className={`fa-solid fa-chevron-down transition-transform 
                                         ${expandedCert === cert.id ? "rotate-180" : ""} text-text-secondary`}
                            ></i>
                          </button>
                        </div>

                        {/* Credential ID if available */}
                        {cert.credentialId &&
                          cert.credentialId !== "Pending" && (
                            <div className="flex items-center gap-2 text-sm mb-3">
                              <span className="text-text-secondary">
                                Credential ID:
                              </span>
                              <code className="px-2 py-1 bg-primary rounded text-accent text-xs">
                                {cert.credentialId}
                              </code>
                            </div>
                          )}

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-primary rounded-full text-xs text-text-secondary
                                       hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedCert === cert.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-border"
                        >
                          <p className="text-text-secondary text-sm leading-relaxed">
                            {cert.description}
                          </p>

                          {cert.link && cert.link !== "#" && (
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 mt-4 text-accent hover:text-accent-dark 
                                       transition-colors text-sm font-medium"
                            >
                              <i className="fa-solid fa-external-link-alt"></i>
                              Verify Certificate
                            </a>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
