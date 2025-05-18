import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Define skill types and categories
type SkillCategory = "frontend" | "backend" | "ai" | "all";

interface Skill {
  name: string;
  icon: string;
  category: SkillCategory | SkillCategory[];
}

// Skills data - Only skills found in the resume
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

// Note: After removing skills that aren't in your resume, make sure to:
// 1. Delete the entire skill entry (the full line)
// 2. If you remove all skills from a category (e.g., all AI skills), you can also remove the corresponding category button below

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
          timeout = setTimeout(typeLoop, 1200); // Wait before erasing
        }
      } else {
        if (i >= 0) {
          setDisplayed(text.slice(0, i));
          i--;
          timeout = setTimeout(typeLoop, 30);
        } else {
          forward = true;
          timeout = setTimeout(typeLoop, 600); // Wait before typing again
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

  // Animation state for looping title animation
  const [showTitle, setShowTitle] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowTitle((prev) => !prev);
    }, 2500); // 2.5 seconds interval
    return () => clearInterval(interval);
  }, []);

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

  return (
    <section id="skills" className="py-20 px-4 relative bg-background" ref={sectionRef}>
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight-gradient"><Typewriter text="Skills" /></span>
        </motion.h2>

        {/* Category selection - Categories will automatically hide if no skills exist in that category */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === "all" 
                ? "bg-[#f43f5e] text-white" 
                : "bg-[#1e293b] text-white hover:bg-[#1e293b]/80"
            }`}
          >
            ALL
          </button>
          
          {hasFrontendSkills && (
            <button
              onClick={() => setActiveCategory("frontend")}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === "frontend" 
                  ? "bg-[#0ea5e9] text-white" 
                  : "bg-[#1e293b] text-white hover:bg-[#1e293b]/80"
              }`}
            >
              FRONTEND
            </button>
          )}
          
          {hasBackendSkills && (
            <button
              onClick={() => setActiveCategory("backend")}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === "backend" 
                  ? "bg-[#10b981] text-white" 
                  : "bg-[#1e293b] text-white hover:bg-[#1e293b]/80"
              }`}
            >
              BACKEND
            </button>
          )}
          
          {hasAISkills && (
            <button
              onClick={() => setActiveCategory("ai")}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === "ai" 
                  ? "bg-[#8b5cf6] text-white" 
                  : "bg-[#1e293b] text-white hover:bg-[#1e293b]/80"
              }`}
            >
              AI & ML
            </button>
          )}
        </div>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredSkills.map((skill, index) => (
              <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center justify-center bg-[#13191f] rounded-lg p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-16 w-16 flex items-center justify-center mb-3">
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="h-12 w-12 object-contain" 
                />
              </div>
              <span className="text-sm text-gray-300 font-medium text-center">{skill.name}</span>
              </motion.div>
            ))}
        </motion.div>
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
