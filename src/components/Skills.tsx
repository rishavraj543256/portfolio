import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Define skill types and categories
type SkillCategory = "frontend" | "backend" | "ai" | "all";

interface Skill {
  name: string;
  icon: string;
  category: SkillCategory | SkillCategory[];
}

// Skills data
const skills: Skill[] = [
  // Frontend
  { name: "HTML", icon: "/icons/html.svg", category: ["frontend", "all"] },
  { name: "CSS", icon: "/icons/css.svg", category: ["frontend", "all"] },
  { name: "JavaScript", icon: "/icons/javascript.svg", category: ["frontend", "all"] },
  
  // Backend
  { name: "Python", icon: "/icons/python.svg", category: ["backend", "all"] },
  { name: "Django", icon: "/icons/django.svg", category: ["backend", "all"] },
  { name: "Flask", icon: "/icons/flask.svg", category: ["backend", "all"] },
  { name: "Selenium", icon: "/icons/selenium.svg", category: ["backend", "all"] },
  { name: "MongoDB", icon: "/icons/mongodb.svg", category: ["backend", "all"] },
  { name: "MySQL", icon: "/icons/mysql.svg", category: ["backend", "all"] },
  { name: "BeautifulSoup", icon: "/icons/beautifulsoup.svg", category: ["backend", "all"] },
  { name: "Numpy", icon: "/icons/NumPy.svg", category: ["backend", "all"] },
  { name: "Pandas", icon: "/icons/Pandas.svg", category: ["backend", "all"] },
  { name: "Web Scraping", icon: "/icons/web_scraping.svg", category: ["backend", "all"] },
  
  // AI/ML
  { name: "AI", icon: "/icons/ai.svg", category: ["ai", "all"] },
  { name: "Machine Learning", icon: "/icons/ml.svg", category: ["ai", "all"] },
  { name: "LLM", icon: "/icons/llm.svg", category: ["ai", "all"] },
  
  // Others
  { name: "Git", icon: "/icons/git.svg", category: ["all"] },
  { name: "VSCode", icon: "/icons/vscode.svg", category: ["all"] },
  { name: "Windows", icon: "/icons/windows.svg", category: ["all"] },
  { name: "Linux", icon: "/icons/linux.svg", category: ["all"] },
];

// Typewriter component
const Typewriter = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
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

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");

  // Check if we have skills in each category
  const hasBackendSkills = skills.some(skill => 
    Array.isArray(skill.category) ? skill.category.includes("backend") : skill.category === "backend"
  );
  
  const hasFrontendSkills = skills.some(skill => 
    Array.isArray(skill.category) ? skill.category.includes("frontend") : skill.category === "frontend"
  );
  
  const hasAISkills = skills.some(skill => 
    Array.isArray(skill.category) ? skill.category.includes("ai") : skill.category === "ai"
  );
  
  const filteredSkills = skills.filter(skill => 
    Array.isArray(skill.category) 
      ? skill.category.includes(activeCategory)
      : skill.category === activeCategory
  );

  const categoryColors = {
    all: "from-[#f43f5e] to-[#e11d48]",
    frontend: "from-[#0ea5e9] to-[#0284c7]",
    backend: "from-[#10b981] to-[#059669]",
    ai: "from-[#8b5cf6] to-[#7c3aed]"
  };

  return (
    <section id="skills" className="py-24 px-4 relative bg-background section-bg-gradient" ref={sectionRef}>
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-center text-foreground"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="gradient-text"><Typewriter text="Skills" /></span>
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Technologies and tools I use to bring ideas to life
        </motion.p>

        {/* Enhanced Category selection */}
        <motion.div 
          className="flex justify-center gap-4 mb-16 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={() => setActiveCategory("all")}
            className={`px-8 py-3 rounded-2xl transition-all duration-300 font-semibold ${
              activeCategory === "all" 
                ? `bg-gradient-to-r ${categoryColors.all} text-white shadow-2xl` 
                : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ALL
          </motion.button>
          
          {hasFrontendSkills && (
            <motion.button
              onClick={() => setActiveCategory("frontend")}
              className={`px-8 py-3 rounded-2xl transition-all duration-300 font-semibold ${
                activeCategory === "frontend" 
                  ? `bg-gradient-to-r ${categoryColors.frontend} text-white shadow-2xl` 
                  : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              FRONTEND
            </motion.button>
          )}
          
          {hasBackendSkills && (
            <motion.button
              onClick={() => setActiveCategory("backend")}
              className={`px-8 py-3 rounded-2xl transition-all duration-300 font-semibold ${
                activeCategory === "backend" 
                  ? `bg-gradient-to-r ${categoryColors.backend} text-white shadow-2xl` 
                  : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BACKEND
            </motion.button>
          )}
          
          {hasAISkills && (
            <motion.button
              onClick={() => setActiveCategory("ai")}
              className={`px-8 py-3 rounded-2xl transition-all duration-300 font-semibold ${
                activeCategory === "ai" 
                  ? `bg-gradient-to-r ${categoryColors.ai} text-white shadow-2xl` 
                  : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              AI & ML
            </motion.button>
          )}
        </motion.div>

        {/* Enhanced Skills grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="group"
            >
              <motion.div
                className="flex flex-col items-center justify-center glass-card p-6 h-32 hover:shadow-2xl transition-all duration-500 card-hover-effect"
                whileHover={{ 
                  y: -8,
                  scale: 1.05,
                  rotateY: 10,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="h-12 w-12 flex items-center justify-center mb-3 relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="h-10 w-10 object-contain group-hover:drop-shadow-lg transition-all duration-300" 
                  />
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                <span className="text-sm text-foreground font-semibold text-center group-hover:text-primary transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
      
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
    </section>
  );
};

export default Skills;