// src/components/skills/LearningTimeline.jsx
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LearningTimeline = () => {
  const [hoveredYear, setHoveredYear] = useState(null);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to timeline progress
  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Timeline data - Your learning journey
  const timelineData = [
    {
      year: "2024",
      quarter: "Q3",
      date: "September 2024",
      title: "Started Coding Journey",
      description: "Began learning programming fundamentals at JKUAT",
      skills: ["HTML", "CSS", "JavaScript Basics"],
      icon: "fa-solid fa-play",
      color: "from-green-500 to-emerald-500",
      achievements: [
        "First line of code",
        "Built first static webpage",
        "Joined university programming club",
      ],
    },
    {
      year: "2024",
      quarter: "Q4",
      date: "October - December 2024",
      title: "Full-Stack Foundations",
      description: "Started eMobilis Mobile App Development training",
      skills: ["React", "Node.js", "Express", "MongoDB"],
      icon: "fa-solid fa-layer-group",
      color: "from-blue-500 to-cyan-500",
      achievements: [
        "Completed first full-stack tutorial",
        "Built first CRUD app",
        "Learned Git & GitHub",
      ],
    },
    {
      year: "2025",
      quarter: "Q1",
      date: "January - March 2025",
      title: "First Projects & Hackathons",
      description:
        "Started building real projects and participating in hackathons",
      skills: ["REST APIs", "JWT Auth", "Deployment"],
      icon: "fa-solid fa-trophy",
      color: "from-yellow-500 to-orange-500",
      achievements: [
        "Participated in first hackathon",
        "Deployed first backend to Render",
        "Built NeuraTrack backend",
      ],
    },
    {
      year: "2025",
      quarter: "Q2",
      date: "April - June 2025",
      title: "PLP Software Development Program",
      description: "16-week intensive program covering full-stack development",
      skills: ["Python", "Django", "Flutter", "Dart", "Database Management"],
      icon: "fa-solid fa-certificate",
      color: "from-purple-500 to-pink-500",
      achievements: [
        "Completed 16-week program",
        "Specialized in PWAs with Flutter",
        "Built AgriMatch project",
        "Learned software engineering essentials",
      ],
    },
    {
      year: "2025",
      quarter: "Q3",
      date: "July - September 2025",
      title: "Client Project & Advanced Development",
      description: "Built Baraka Bliss Staycations for real client",
      skills: [
        "React Advanced",
        "Tailwind CSS",
        "Framer Motion",
        "MongoDB Optimization",
      ],
      icon: "fa-solid fa-briefcase",
      color: "from-indigo-500 to-purple-500",
      achievements: [
        "Built production app for real client",
        "Implemented advanced filtering",
        "Created operator dashboard",
        "Learned client communication",
      ],
    },
    {
      year: "2025",
      quarter: "Q4",
      date: "October - December 2025",
      title: "Backend Specialization",
      description: "Deep dive into backend architecture and system design",
      skills: ["PostgreSQL", "System Design", "API Optimization"],
      icon: "fa-solid fa-server",
      color: "from-red-500 to-pink-500",
      achievements: [
        "Built NeuraTrack with PostgreSQL",
        "Learned database optimization",
        "Implemented JWT security",
        "API documentation best practices",
      ],
    },
    {
      year: "2026",
      quarter: "Q1",
      date: "January - March 2026",
      title: "Data Science & AI Exploration",
      description: "Started learning data analysis and AI at JKUAT",
      skills: ["Python Data Science", "Jupyter", "Pandas", "Kaggle"],
      icon: "fa-solid fa-brain",
      color: "from-teal-500 to-green-500",
      achievements: [
        "Jupyter Notebooks for AI assignments",
        "Kaggle notebooks for data analysis",
        "Basic ML algorithms",
        "Data visualization",
      ],
    },
    {
      year: "2026",
      quarter: "Q2",
      date: "April - June 2026",
      title: "Current Focus",
      description: "Advanced Flutter, System Design, and R for Data Analysis",
      skills: ["Flutter Advanced", "R Programming", "System Design"],
      icon: "fa-solid fa-rocket",
      color: "from-accent to-accent-dark",
      isCurrent: true,
      achievements: [
        "Baraka Bliss mobile app (in progress)",
        "University R coursework",
        "System design for scalable APIs",
        "Learning advanced Flutter patterns",
      ],
    },
  ];

  // Group by year for visual organization
  const groupedByYear = timelineData.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {});

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-40 w-96 h-96 bg-accent-dark/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-2 block">
            My Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
            Learning Timeline
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            From first line of code to production applications
          </p>

          {/* Timeline Stats */}
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">1.5+</div>
              <div className="text-sm text-text-secondary">Years Coding</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">8</div>
              <div className="text-sm text-text-secondary">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">5</div>
              <div className="text-sm text-text-secondary">Hackathons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">30+</div>
              <div className="text-sm text-text-secondary">Technologies</div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/20 via-accent to-accent-dark/20"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {Object.entries(groupedByYear).map(([year, items], yearIndex) => (
              <div key={year}>
                {/* Year Marker */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 mb-8"
                >
                  <div className="flex justify-center">
                    <div
                      className="bg-gradient-to-r from-accent to-accent-dark px-6 py-2 rounded-full 
                                  text-white font-display font-bold shadow-lg shadow-accent/30"
                    >
                      {year}
                    </div>
                  </div>
                </motion.div>

                {/* Items for this year */}
                {items.map((item, index) => {
                  const isEven = index % 2 === 0;
                  const isLeft = isEven; // Alternate sides

                  return (
                    <motion.div
                      key={`${year}-${index}`}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onHoverStart={() => setHoveredYear(`${year}-${index}`)}
                      onHoverEnd={() => setHoveredYear(null)}
                      className={`relative flex flex-col md:flex-row items-start gap-8 mb-12
                                ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                    >
                      {/* Timeline Dot */}
                      <div
                        className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 
                                    w-5 h-5 rounded-full bg-accent border-4 border-primary
                                    shadow-lg shadow-accent/50 z-20
                                    flex items-center justify-center"
                      >
                        {item.isCurrent && (
                          <motion.div
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </div>

                      {/* Content Card */}
                      <div
                        className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:text-right" : "md:text-left"} 
                                    ml-16 md:ml-0`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`bg-secondary/50 backdrop-blur-sm rounded-xl p-6 
                                    border border-border hover:border-accent/50 
                                    transition-all duration-300 relative overflow-hidden
                                    ${item.isCurrent ? "ring-2 ring-accent/50" : ""}`}
                        >
                          {/* Background gradient on hover */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10"
                            style={{
                              background: `linear-gradient(135deg, ${item.color.split(" ")[0]}, ${item.color.split(" ")[2]})`,
                            }}
                          />

                          {/* Date Badge */}
                          <div
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3
                                        bg-gradient-to-r ${item.color} text-white`}
                          >
                            {item.date}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p className="text-text-secondary text-sm mb-4">
                            {item.description}
                          </p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-primary rounded-full text-xs text-text-secondary
                                         hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Achievements */}
                          <div className="space-y-2">
                            {item.achievements.map((achievement, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-2 text-sm"
                              >
                                <i className="fa-solid fa-check text-accent mt-1"></i>
                                <span className="text-text-secondary">
                                  {achievement}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          {/* Current Indicator */}
                          {item.isCurrent && (
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute top-2 right-2 flex items-center gap-2"
                            >
                              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                              <span className="text-xs text-green-400 font-medium">
                                Currently Learning
                              </span>
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Future Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-display font-bold text-text-primary mb-6">
            🚀 Future Goals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-cloud text-accent text-xl"></i>
              </div>
              <h4 className="text-lg font-display font-semibold text-text-primary mb-2">
                Cloud & DevOps
              </h4>
              <p className="text-text-secondary text-sm">
                AWS Certification, Docker, Kubernetes, CI/CD pipelines
              </p>
            </div>

            <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-robot text-accent text-xl"></i>
              </div>
              <h4 className="text-lg font-display font-semibold text-text-primary mb-2">
                AI & Machine Learning
              </h4>
              <p className="text-text-secondary text-sm">
                Deep Learning, TensorFlow, Computer Vision, NLP
              </p>
            </div>

            <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-cubes text-accent text-xl"></i>
              </div>
              <h4 className="text-lg font-display font-semibold text-text-primary mb-2">
                System Architecture
              </h4>
              <p className="text-text-secondary text-sm">
                Microservices, Distributed Systems, Scalable Design
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningTimeline;
