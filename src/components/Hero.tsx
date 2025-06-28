import { motion, useAnimation } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { useState, useEffect, useRef } from "react";

// Typewriter component
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

// Add your main skills here
const heroSkills = [
  { name: "Python", color: "#3572A5", size: 1.2 },
  { name: "Django", color: "#092E20", size: 1.1 },
  { name: "Flask", color: "#FFFFFF", size: 1.1 }, // Changed to white for better visibility
  { name: "Selenium", color: "#43B02A", size: 1.0 },
  { name: "MongoDB", color: "#47A248", size: 1.1 },
  { name: "MySQL", color: "#00758F", size: 1.0 },
  { name: "BeautifulSoup", color: "#4B8BBE", size: 0.9 },
  { name: "Numpy", color: "#013243", size: 1.1 },
  { name: "Pandas", color: "#150458", size: 1.1 },
  { name: "Web Scraping", color: "#e63946", size: 0.9 },
  { name: "AI", color: "#8b5cf6", size: 1.2 },
  { name: "Machine Learning", color: "#f59e42", size: 1.0 },
  { name: "LLM", color: "#eab308", size: 1.1 },
  { name: "Git", color: "#F05032", size: 1.0 },
  { name: "Linux", color: "#FCC624", size: 1.0 },
];

// Enhanced Tag Cloud component
const TagCloud = ({ radius = 200, theme = 'dark' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrame: number;
    let lastTime = 0;
    const rotationSpeed = 0.1;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      setRotation(prev => ({
        x: prev.x + rotationSpeed * (deltaTime / 1000),
        y: prev.y + rotationSpeed * (deltaTime / 1000)
      }));

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      ref={containerRef}
      className="tagcloud"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minWidth: radius * 3,
        minHeight: radius * 3,
        left: '25%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {heroSkills.map((skill, i) => {
        const phi = Math.acos(-1 + (2 * i) / heroSkills.length);
        const theta = Math.sqrt(heroSkills.length * Math.PI) * phi;
        
        const spreadRadius = radius * 2.5;
        
        const x = spreadRadius * Math.cos(theta + rotation.x) * Math.sin(phi + rotation.y) + radius * 0.5;
        const y = spreadRadius * Math.sin(theta + rotation.x) * Math.sin(phi + rotation.y);
        const z = spreadRadius * Math.cos(phi + rotation.y);
        
        const scale = 0.5 + ((z + spreadRadius) / (2 * spreadRadius)) * 0.8;
        const opacity = theme === 'light' ? 0.6 + (scale * 0.4) : 0.4 + (scale * 0.6);
        const transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;

        // Adjust colors for light mode
        let skillColor = skill.color;
        if (theme === 'light') {
          if (skill.name === 'Flask') skillColor = '#000000'; // Black for Flask in light mode
          if (skill.name === 'Django') skillColor = '#0C4B33'; // Darker green for Django
          if (skill.name === 'Numpy') skillColor = '#4A90E2'; // Brighter blue for Numpy
          if (skill.name === 'Pandas') skillColor = '#E91E63'; // Pink for Pandas
        }

        return (
          <motion.span
            key={skill.name}
            className="tagcloud--item"
            style={{
              willChange: 'transform, opacity, filter',
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: Math.floor(scale * 10),
              opacity: opacity,
              transformOrigin: '50% 50%',
              transform: transform,
              transition: 'all 0.3s ease-out',
              cursor: 'pointer',
              background: theme === 'light' 
                ? `linear-gradient(135deg, ${skillColor}, ${skillColor}dd)` 
                : `linear-gradient(135deg, ${skillColor}, ${skillColor}dd)`,
              color: theme === 'light' && (skill.name === 'Flask' || skill.name === 'Django') ? '#fff' : '#fff',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: theme === 'light' 
                ? `0 4px 20px ${skillColor}40, 0 0 0 1px ${skillColor}20, 0 2px 10px rgba(0,0,0,0.1)`
                : `0 4px 20px ${skillColor}40, 0 0 0 1px ${skillColor}20`,
              display: 'inline-block',
              textAlign: 'center',
              userSelect: 'none',
              backdropFilter: 'blur(10px)',
              border: theme === 'light' ? `1px solid ${skillColor}30` : 'none',
            }}
            whileHover={{
              scale: 1.4,
              zIndex: 100,
              boxShadow: theme === 'light' 
                ? `0 8px 30px ${skillColor}60, 0 0 0 2px ${skillColor}40, 0 4px 20px rgba(0,0,0,0.2)`
                : `0 8px 30px ${skillColor}60, 0 0 0 2px ${skillColor}40`,
              filter: 'brightness(1.2)',
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {skill.name}
          </motion.span>
        );
      })}
    </div>
  );
};

const Hero = () => {
  const { theme } = useTheme();
  const avatarRef = useRef<HTMLDivElement>(null);
  const [avatarRadius, setAvatarRadius] = useState(160);

  useEffect(() => {
    function updateRadius() {
      if (avatarRef.current) {
        setAvatarRadius(avatarRef.current.offsetWidth / 2);
      }
    }
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Enhanced galaxy effect for dark mode
  const starCount = 80;
  const stars = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.8 + 0.2,
  }));

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
        .galaxy-star {
          position: absolute;
          border-radius: 9999px;
          background: white;
          pointer-events: none;
          filter: drop-shadow(0 0 8px #fff) drop-shadow(0 0 16px #7f7fff);
        }
        .galaxy-nebula {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 70vw;
          height: 70vw;
          max-width: 1000px;
          max-height: 1000px;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse at 60% 40%, #7f7fff55 0%, #0000 70%),
                      radial-gradient(ellipse at 30% 70%, #e0aaff44 0%, #0000 80%),
                      radial-gradient(ellipse at 80% 80%, #fff3 0%, #0000 60%);
          z-index: 0;
          pointer-events: none;
          filter: blur(40px) brightness(0.8);
          animation: nebula-pulse 8s ease-in-out infinite;
        }
        @keyframes nebula-pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }
        .tagcloud {
          pointer-events: none;
          perspective: 1000px;
        }
        .tagcloud--item {
          pointer-events: auto;
          filter: blur(0);
          transition: all 0.3s ease-out;
          backface-visibility: hidden;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(2deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }
      `}</style>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-16 pb-12 px-4 relative overflow-hidden section-bg-gradient"
      >
        {/* Galaxy effect for dark mode */}
        {theme === 'dark' && (
          <>
            <div className="galaxy-nebula" />
            {stars.map(star => (
              <motion.div
                key={star.id}
                className="galaxy-star"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  zIndex: 1,
                }}
                animate={{
                  opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}

        {/* Floating particles for light mode */}
        {theme === 'light' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Skills Tag Cloud - Now appears in BOTH themes */}
        <div 
          className="absolute left-1/2 top-1/2 z-10" 
          style={{ 
            transform: 'translate(-25%, -50%)',
            width: '100%',
            height: '100%',
            maxWidth: '1000px',
            maxHeight: '800px',
          }}
        >
          <TagCloud radius={avatarRadius + 50} theme={theme} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="text-2xl font-extrabold highlight-gradient mb-3 text-glow"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Hi, I am
                </motion.span>
              </motion.div>
              
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="gradient-text">Rishav Raj</span>
              </motion.h1>
              
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Typewriter text="I'm a Python Developer" />
              </motion.h2>
              
              <motion.p
                className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Automation Developer with expertise in Python, web scraping, and process automation. 
                I build robust solutions that improve operational efficiency and deliver measurable business value.
              </motion.p>
              
              <motion.div
                className="flex flex-wrap gap-6 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.a
                  href="#projects"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-medium transition-all relative overflow-hidden group btn-hover-effect pulse-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">View My Work</span>
                </motion.a>
                
                <motion.a
                  href="#contact"
                  className="px-8 py-4 border-2 border-primary text-primary rounded-2xl font-medium transition-all relative overflow-hidden group btn-hover-effect glass-effect"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Contact Me</span>
                </motion.a>
              </motion.div>
              
              <motion.div
                className="flex items-center gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.a
                  href="/Rishav-Raj-Resume.pdf"
                  download
                  className="bg-gradient-to-r from-[#E63946] to-[#d62839] text-white font-bold rounded-2xl px-10 py-4 flex items-center gap-3 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 btn-hover-effect"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Resume
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                  </motion.svg>
                </motion.a>
                
                <div className="flex items-center gap-4">
                  {[
                    { icon: "github", url: "https://github.com/rishavraj543256", label: "GitHub", bg: "bg-gradient-to-r from-[#181717] to-[#333]" },
                    { icon: "linkedin", url: "https://linkedin.com/in/rishavraj1998", label: "LinkedIn", bg: "bg-gradient-to-r from-[#0A66C2] to-[#004182]" },
                    { icon: "mail", url: "mailto:rajrishav543256@gmail.com", label: "Email", bg: "bg-gradient-to-r from-[#EA4335] to-[#c23321]" }
                  ].map((platform, index) => (
                    <motion.a 
                      key={platform.icon} 
                      href={platform.url}
                      className={`group ${platform.bg} rounded-2xl w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl btn-hover-effect`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="sr-only">{platform.label}</span>
                      {platform.icon === "github" && (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                        </svg>
                      )}
                      {platform.icon === "linkedin" && (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/>
                        </svg>
                      )}
                      {platform.icon === "mail" && (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z"/>
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="order-1 md:order-2 flex justify-center z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div ref={avatarRef} className="relative w-72 h-72 md:w-96 md:h-96">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-80"
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
                  className="absolute inset-4 rounded-full bg-background flex items-center justify-center overflow-hidden glass-effect"
                  animate={{
                    boxShadow: [
                      theme === 'dark' ? '0 0 30px rgba(59,130,246,0.3)' : '0 0 30px rgba(0,0,0,0.1)',
                      theme === 'dark' ? '0 0 50px rgba(147,51,234,0.4)' : '0 0 50px rgba(0,0,0,0.2)',
                      theme === 'dark' ? '0 0 30px rgba(59,130,246,0.3)' : '0 0 30px rgba(0,0,0,0.1)',
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <motion.div 
                    className="text-8xl md:text-9xl"
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    👨‍💻
                  </motion.div>
                </motion.div>
                
                {/* Enhanced floating elements */}
                <motion.div
                  className="absolute -z-10 h-32 w-32 rounded-full bg-primary/20 blur-2xl morphing-blob"
                  style={{ top: '10%', left: '15%' }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                
                <motion.div
                  className="absolute -z-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl morphing-blob"
                  style={{ bottom: '10%', right: '15%' }}
                  animate={{
                    scale: [1.3, 1, 1.3],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                
                <motion.div
                  className="absolute -z-10 h-24 w-24 rounded-full bg-secondary/20 blur-xl morphing-blob"
                  style={{ top: '60%', left: '5%' }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.2, 0.5, 0.2],
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
              y: [0, 15, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <a href="#about" className="flex flex-col items-center text-muted-foreground group">
              <span className="text-sm mb-3 group-hover:text-primary transition-colors">Scroll Down</span>
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:text-primary transition-colors"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </motion.svg>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;