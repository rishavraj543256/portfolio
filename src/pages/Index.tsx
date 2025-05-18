
import { useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Portfolio | Rishav Raj - Full Stack Developer";
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key="page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <Skills />
            <GitHubStats />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Index;
