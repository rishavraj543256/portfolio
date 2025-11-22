import { useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Rishav Raj - Python Developer | Portfolio";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Python Developer specializing in automation, web scraping, and process optimization. View my portfolio showcasing innovative solutions and technical expertise.');
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Performance optimization: Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = '/pic.PNG';
    preloadLink.as = 'image';
    document.head.appendChild(preloadLink);

    // Cleanup
    return () => {
      document.head.removeChild(preloadLink);
    };
  }, []);

  // Background particle elements with better performance
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 15 + 8,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key="page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden"
        >
          {/* Optimized background particles */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 will-change-transform"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25, 0],
                  y: [0, Math.random() * 50 - 25, 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50"
          >
            Skip to main content
          </a>

          <Navbar />
          <main id="main-content" className="focus:outline-none" tabIndex={-1}>
            <Hero />
            <AboutMe />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <GitHubStats />
            <Contact />
          </main>
          <Chatbot />
          <Footer />

          {/* Loading indicator for better UX */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="fixed inset-0 bg-background z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Index;