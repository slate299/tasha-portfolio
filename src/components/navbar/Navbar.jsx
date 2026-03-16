// src/components/navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "#", id: "home" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "About", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleLinkClick = (id) => {
    setActiveLink(id);
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-primary/95 backdrop-blur-md shadow-lg py-3"
            : "bg-primary/30 backdrop-blur-sm py-4 md:py-5"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-display font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveLink("home")}
          >
            <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
              Tasha
            </span>
            <span className="text-accent">.</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  activeLink === link.id
                    ? "text-accent"
                    : "text-text-secondary hover:text-accent"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => handleLinkClick(link.id)}
              >
                {link.name}
                {activeLink === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}

            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm py-2 px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fa-solid fa-file-pdf mr-2"></i>
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 relative">
              <motion.span
                className="absolute left-0 w-5 h-0.5 bg-accent rounded-full"
                animate={{
                  top: isOpen ? "8px" : "2px",
                  rotate: isOpen ? 45 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 w-5 h-0.5 bg-accent rounded-full"
                animate={{
                  top: "8px",
                  opacity: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 w-5 h-0.5 bg-accent rounded-full"
                animate={{
                  top: isOpen ? "8px" : "14px",
                  rotate: isOpen ? -45 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-primary/95 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-secondary shadow-2xl z-40 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="p-6 border-b border-border">
                  <span className="text-xl font-display font-bold text-text-primary">
                    Menu
                  </span>
                </div>

                {/* Menu Links */}
                <div className="flex-1 py-6">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`block px-6 py-3 text-base font-medium transition-colors duration-300 ${
                        activeLink === link.id
                          ? "text-accent bg-accent/10"
                          : "text-text-secondary hover:text-accent hover:bg-accent/5"
                      }`}
                      onClick={() => handleLinkClick(link.id)}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>

                {/* Menu Footer */}
                <div className="p-6 border-t border-border">
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full text-center"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <i className="fa-solid fa-file-pdf mr-2"></i>
                    Resume
                  </motion.a>

                  {/* Social Links in Mobile Menu */}
                  <div className="flex justify-center gap-4 mt-4">
                    <a
                      href="https://github.com/slate299"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-accent transition-colors"
                    >
                      <i className="fa-brands fa-github text-xl"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/natasha-hinga-a2b268337"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-accent transition-colors"
                    >
                      <i className="fa-brands fa-linkedin-in text-xl"></i>
                    </a>
                    <a
                      href="https://x.com/HingaNatas39546"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-accent transition-colors"
                    >
                      <i className="fa-brands fa-x-twitter text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
