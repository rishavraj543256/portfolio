import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { useState, useEffect } from "react";

const Hero = () => {
  const { theme } = useTheme();

  // Typewriter effect for the subtitle
  const fullSubtitle = "I'm a Python Developer";
  const [typedSubtitle, setTypedSubtitle] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedSubtitle(fullSubtitle.slice(0, i + 1));
      i++;
      if (i === fullSubtitle.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Typewriter component for About Me
  const Typewriter = ({ text }: { text: string }) => {
    const [displayed, setDisplayed] = useState("");
    useEffect(() => {
      let i = 0;
      let forward = true;
      let timeout: NodeJS.Timeout;
      function typeLoop() {
        if (forward) {
          if (i <= text.length) {
            setDisplayed(text.slice(0, i));
            i++;
            timeout = setTimeout(typeLoop, 60);
          } else {
            forward = false;
            timeout = setTimeout(typeLoop, 1200);
          }
        } else {
          if (i >= 0) {
            setDisplayed(text.slice(0, i));
            i--;
            timeout = setTimeout(typeLoop, 30);
          } else {
            forward = true;
            timeout = setTimeout(typeLoop, 600);
          }
        }
      }
      typeLoop();
      return () => clearTimeout(timeout);
    }, [text]);
    return (
      <span>
        {displayed}
        <span className="blinking-cursor">|</span>
      </span>
    );
  };

  return (
    <>
      <style>{`
        .blinking-cursor {
          display: inline-block;
          width: 1ch;
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-16 pb-12 px-4"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="text-sm font-medium text-primary mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Hi, I am
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="highlight-gradient">Rishav Raj</span>
              </motion.h1>
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span>{typedSubtitle}</span>
                <span className="blinking-cursor">|</span>
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Automation Developer with expertise in Python, web scraping, and process automation. 
                I build robust solutions that improve operational efficiency and deliver measurable business value.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="#projects"
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all relative overflow-hidden group btn-hover-effect"
                >
                  <span className="relative z-10">View My Work</span>
                  <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 border border-primary text-primary rounded-lg font-medium transition-all relative overflow-hidden group btn-hover-effect"
                >
                  <span className="relative z-10">Contact Me</span>
                  <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </a>
              </motion.div>
              <div className="flex items-center gap-6 mt-12">
                <a
                  href="/Rishav-Raj-Resume.pdf"
                  download
                  className="bg-[#E63946] text-white font-bold rounded-full px-8 py-3 flex items-center gap-2 text-lg shadow-md hover:bg-[#d62839] transition-colors duration-200"
                >
                  Resume
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                  </svg>
                </a>
                <div className="flex items-center gap-4">
                  {[
                    { icon: "github", url: "https://github.com/rishavraj543256", label: "GitHub", bg: "bg-[#181717]", iconColor: "text-white" },
                    { icon: "linkedin", url: "https://linkedin.com/in/rishavraj1998", label: "LinkedIn", bg: "bg-[#0A66C2]", iconColor: "text-white" },
                    { icon: "mail", url: "mailto:rajrishav543256@gmail.com", label: "Email", bg: "bg-[#EA4335]", iconColor: "text-white" }
                  ].map((platform) => (
                    <motion.a 
                      key={platform.icon} 
                      href={platform.url}
                      className={`group ${platform.bg} rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="sr-only">{platform.label}</span>
                      {platform.icon === "github" && (
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                        </svg>
                      )}
                      {platform.icon === "linkedin" && (
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/>
                        </svg>
                      )}
                      {platform.icon === "mail" && (
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z"/>
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              className="order-1 md:order-2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-70"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div 
                  className="absolute inset-4 rounded-full bg-background flex items-center justify-center overflow-hidden"
                  animate={{
                    boxShadow: [
                      theme === 'dark' ? '0 0 20px rgba(255,255,255,0.1)' : '0 0 20px rgba(0,0,0,0.1)',
                      theme === 'dark' ? '0 0 30px rgba(255,255,255,0.2)' : '0 0 30px rgba(0,0,0,0.2)',
                      theme === 'dark' ? '0 0 20px rgba(255,255,255,0.1)' : '0 0 20px rgba(0,0,0,0.1)',
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <motion.div 
                    className="text-7xl"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    👨‍💻
                  </motion.div>
                </motion.div>
                <motion.div
                  className="absolute -z-10 h-24 w-24 rounded-full bg-primary/30 blur-xl"
                  style={{ top: '10%', left: '15%' }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute -z-10 h-32 w-32 rounded-full bg-accent/30 blur-xl"
                  style={{ bottom: '10%', right: '15%' }}
                  animate={{
                    scale: [1.2, 1, 1.2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:block"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.8, 0.4, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <a href="#projects" className="flex flex-col items-center text-muted-foreground">
              <span className="text-sm mb-2">Scroll Down</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
