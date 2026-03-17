import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { heroData } from "../../data/heroData";
import SEOHelper from '../common/SEOHelper';
import TypewriterEffect from '../common/TypewriterEffect';
import FloatingElement from '../common/FloatingElement';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parallax effect only on desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Reduce animations on mobile
  const floatingAnimation = isMobile
    ? {}
    : {
        y: {
          duration: 3,
          y: [0, -10, 0],
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  return (
    <>
      <SEOHelper 
        title="Natasha Hinga | Full-Stack Developer & CS Student"
        description="Mathematics & Computer Science student at JKUAT building full-stack web and mobile applications. Specialized in React, Node.js, Flutter, and Python."
      />
      <section className="relative min-h-screen flex items-center bg-primary overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background decorative elements - reduced opacity on mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
        </div>

        {/* Grid overlay - hidden on mobile for performance */}
        {!isMobile && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #262636 1px, transparent 0)`,
              backgroundSize: "40px 40px",
              opacity: 0.3,
            }}
          ></div>
        )}

        <div className="container-custom relative z-10 w-full">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* LEFT COLUMN - Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.p
                variants={itemVariants}
                className="text-accent font-semibold mb-3 md:mb-4 flex items-center justify-center lg:justify-start gap-2 text-sm md:text-base"
              >
                <span className="w-6 md:w-8 h-[2px] bg-accent"></span>
                {heroData.greeting}
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 leading-tight"
              >
                {heroData.name}
              </motion.h1>

              <motion.h2
  variants={itemVariants}
  className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6 font-display leading-tight"
>
  <span className="block sm:inline">
    {heroData.headline.before}
  </span>{" "}
  <TypewriterEffect 
    text={heroData.headline.gradient}
    speed={100}
    delay={500}
    className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent block sm:inline"
  />
</motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-text-secondary text-base sm:text-lg mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                {heroData.description}
              </motion.p>

              {/* Stats - stacked on mobile, row on desktop */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 mb-6 md:mb-8"
              >
                {heroData.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center sm:justify-start gap-3 group cursor-default"
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                      <i
                        className={`${stat.icon} text-accent text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300`}
                      ></i>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-display font-bold text-text-primary">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm text-text-secondary">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons - full width on mobile, auto on desktop */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-6 md:mb-8"
              >
                <motion.a
                  href={heroData.primaryCta.link}
                  className="btn-primary relative overflow-hidden group w-full sm:w-auto text-center"
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">
                    {heroData.primaryCta.text}
                  </span>
                  <i className="fa-solid fa-arrow-right ml-2 relative z-10 group-hover:translate-x-1 transition-transform"></i>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-dark to-accent"
                    initial={{ x: "-100%" }}
                    whileHover={!isMobile ? { x: 0 } : {}}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>

                <motion.a
                  href={heroData.secondaryCta.link}
                  className="btn-outline group w-full sm:w-auto text-center"
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  {heroData.secondaryCta.text}
                  <i className="fa-solid fa-message ml-2 group-hover:rotate-12 transition-transform"></i>
                </motion.a>
              </motion.div>

              {/* Social Links - centered on mobile */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-4 pt-6 md:pt-8 border-t border-border"
              >
                <span className="text-sm text-text-secondary">Find me on:</span>
                <div className="flex gap-3">
                  {heroData.social.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center 
                                 hover:bg-accent transition-all duration-300 group relative"
                      whileHover={!isMobile ? { y: -3 } : {}}
                      whileTap={{ scale: 0.95 }}
                      title={item.username}
                    >
                      <i
                        className={`${item.icon} text-text-secondary group-hover:text-primary transition-colors relative z-10 text-sm sm:text-base`}
                      ></i>
                      {!isMobile && (
                        <motion.div
                          className="absolute inset-0 bg-accent rounded-full"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN - Profile - appears first on mobile */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0 px-4 sm:px-6"
              style={
                !isMobile
                  ? {
                      x: mousePosition.x,
                      y: mousePosition.y,
                    }
                  : {}
              }
            >
              <div className="relative">
                {/* Animated glow rings - reduced on mobile */}
                <motion.div
                  className="absolute inset-0 bg-accent/20 rounded-full blur-2xl md:blur-3xl"
                  animate={
                    !isMobile
                      ? {
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }
                      : {}
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Outer ring - hidden on mobile */}
                {!isMobile && (
                  <motion.div
                    className="absolute -inset-4 border-2 border-accent/20 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 360, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}

                {/* Profile circle - smaller on mobile */}
                <motion.div
                  className={`relative 
                    ${heroData.profilePicture?.size === 'small' ? 'w-32 h-32 sm:w-40 sm:h-40' : 
                      heroData.profilePicture?.size === 'large' ? 'w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96' : 
                      'w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96'}
                    bg-gradient-to-br from-accent to-accent-dark 
                    rounded-full flex items-center justify-center shadow-2xl
                    border-4 border-white/10 cursor-pointer group mx-auto
                    overflow-hidden`}
                  animate={
                    !isMobile
                      ? {
                          y: [0, -10, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={
                    !isMobile
                      ? {
                          scale: 1.05,
                          transition: { duration: 0.3 },
                        }
                      : {}
                  }
                >
                  {heroData.profilePicture?.enabled ? (
                    // Real profile photo
                    <img 
                      src={heroData.profilePicture.url}
                      alt={heroData.profilePicture.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    // Placeholder with initials
                    <span
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white/90 
                                   group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                    >
                      {heroData.profilePicture?.placeholder || heroData.profilePlaceholder || "NH"}
                    </span>
                  )}

                  {/* Decorative particles - hidden on mobile */}
                  {!isMobile && (
                    <>
                      <motion.div
                        className="absolute -top-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-accent rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                      />
                      <motion.div
                        className="absolute -bottom-2 -left-2 w-2 h-2 md:w-3 md:h-3 bg-accent-dark rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.3, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: 1,
                        }}
                      />
                    </>
                  )}
                </motion.div>

                {/* Floating tech icons - hidden on mobile */}
               {!isMobile && (
  <>
    <FloatingElement amplitude={8} duration={3} delay={0.2}>
      <motion.div
        className="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-8 h-8 md:w-10 md:h-10 
                  bg-secondary rounded-xl flex items-center justify-center 
                  border border-accent/30 shadow-lg backdrop-blur-sm"
      >
        <i className="fa-brands fa-react text-accent text-lg md:text-xl"></i>
      </motion.div>
    </FloatingElement>

    <FloatingElement amplitude={8} duration={3} delay={0.4}>
      <motion.div
        className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 w-8 h-8 md:w-10 md:h-10 
                  bg-secondary rounded-xl flex items-center justify-center 
                  border border-accent/30 shadow-lg backdrop-blur-sm"
      >
        <i className="fa-brands fa-node text-accent text-lg md:text-xl"></i>
      </motion.div>
    </FloatingElement>
  </>
)}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        {!isMobile && (
          <motion.div
            className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-accent/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 md:h-3 bg-accent rounded-full mt-2"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Floating particles for desktop only - extra polish */}
        {!isMobile && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent/30 rounded-full"
                style={{
                  top: `${20 + i * 30}%`,
                  left: `${10 + i * 20}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Hero;