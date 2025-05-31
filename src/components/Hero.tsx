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

// Add your main skills here (or import from Skills.tsx if you want to keep in sync)
const heroSkills = [
  { name: "Python", color: "#3572A5", size: 1.2 },
  { name: "Django", color: "#092E20", size: 1.1 },
  { name: "Flask", color: "#000000", size: 1.1 },
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

// Tag Cloud component
const TagCloud = ({ radius = 200 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrame: number;
    let lastTime = 0;
    const rotationSpeed = 0.15;

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
        // Modified distribution to favor right side
        const phi = Math.acos(-1 + (2 * i) / heroSkills.length);
        const theta = Math.sqrt(heroSkills.length * Math.PI) * phi;
        
        // Increased radius multiplier and adjusted for right-side bias
        const spreadRadius = radius * 2.5;
        
        // Calculate position with rotation and right-side bias
        const x = spreadRadius * Math.cos(theta + rotation.x) * Math.sin(phi + rotation.y) + radius * 0.5;
        const y = spreadRadius * Math.sin(theta + rotation.x) * Math.sin(phi + rotation.y);
        const z = spreadRadius * Math.cos(phi + rotation.y);
        
        // Adjusted scale calculation for better visibility
        const scale = 0.5 + ((z + spreadRadius) / (2 * spreadRadius)) * 0.8;
        const opacity = 0.3 + (scale * 0.7);
        const transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;

        return (
          <span
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
              background: skill.color,
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'inline-block',
              textAlign: 'center',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = `${transform} scale(1.3)`;
              target.style.zIndex = '100';
              target.style.opacity = '1';
              target.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = transform;
              target.style.zIndex = Math.floor(scale * 10).toString();
              target.style.opacity = opacity.toString();
              target.style.filter = 'brightness(1)';
            }}
          >
            {skill.name}
          </span>
        );
      })}
    </div>
  );
};

const Hero = () => {
  const { theme } = useTheme();
  const avatarRef = useRef<HTMLDivElement>(null);
  const [avatarRadius, setAvatarRadius] = useState(160); // default for md:w-80

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

  // Galaxy effect: generate 60 stars with random positions and sizes
  const starCount = 60;
  const stars = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.5 + 0.5,
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
          filter: drop-shadow(0 0 6px #fff) drop-shadow(0 0 12px #7f7fff);
        }
        .galaxy-nebula {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 60vw;
          height: 60vw;
          max-width: 900px;
          max-height: 900px;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse at 60% 40%, #7f7fff44 0%, #0000 70%),
                      radial-gradient(ellipse at 30% 70%, #e0aaff33 0%, #0000 80%),
                      radial-gradient(ellipse at 80% 80%, #fff2 0%, #0000 60%);
          z-index: 0;
          pointer-events: none;
          filter: blur(32px) brightness(0.7);
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
        .tagcloud--item:hover {
          filter: blur(0) !important;
          z-index: 100 !important;
          transform-origin: center center !important;
        }
      `}</style>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-16 pb-12 px-4 relative overflow-hidden"
      >
        {/* Galaxy effect only in dark mode */}
        {theme === 'dark' && (
          <>
            <div className="galaxy-nebula" />
            {stars.map(star => (
              <div
                key={star.id}
                className="galaxy-star"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  animation: `twinkle ${star.duration}s infinite alternate`,
                  animationDelay: `${star.delay}s`,
                  zIndex: 1,
                }}
              />
            ))}
            <style>{`
              @keyframes twinkle {
                0% { opacity: 0.5; }
                100% { opacity: 1; }
              }
            `}</style>
            {/* Updated container for tag cloud with right positioning */}
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
              <TagCloud radius={avatarRadius + 50} />
            </div>
          </>
        )}
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="text-2xl font-extrabold highlight-gradient mb-2 text-glow animate-bounce"
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
                <Typewriter text="I'm a Python Developer" />
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
              className="order-1 md:order-2 flex justify-center z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div ref={avatarRef} className="relative w-64 h-64 md:w-80 md:h-80">
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
              {/* <span className="text-sm mb-2">Scroll Down</span> */}
              {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg> */}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
