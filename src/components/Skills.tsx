
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

const programming: Skill[] = [
  { name: "Python", percentage: 90, icon: "🐍" },
  { name: "Javascript", percentage: 70, icon: "📜" },
  { name: "HTML/CSS", percentage: 75, icon: "🌐" },
];

const frameworks: Skill[] = [
  { name: "Django", percentage: 85, icon: "🎯" },
  { name: "Flask", percentage: 80, icon: "🧪" },
  { name: "Selenium", percentage: 85, icon: "🔍" },
  { name: "BeautifulSoup", percentage: 90, icon: "🍲" },
];

const databases: Skill[] = [
  { name: "MongoDB", percentage: 80, icon: "🍃" },
  { name: "MySQL", percentage: 75, icon: "🐬" },
];

const SkillCategory = ({
  title,
  skills,
  delay = 0,
}: {
  title: string;
  skills: Skill[];
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300"
    >
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <span className="mr-2 text-xl">{skill.icon}</span>
                <span>{skill.name}</span>
              </div>
              <span className="text-sm font-medium">{skill.percentage}%</span>
            </div>
            <div className="skill-progress-bar">
              <motion.div
                className="skill-progress-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Enhanced spinning skills component
const SpinningSkills = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const skills = [
    { name: "Python", color: "bg-blue-500" },
    { name: "Selenium", color: "bg-green-500" },
    { name: "BeautifulSoup", color: "bg-purple-500" },
    { name: "MongoDB", color: "bg-yellow-500" },
    { name: "Django", color: "bg-red-500" },
    { name: "Flask", color: "bg-indigo-500" },
    { name: "OpenCV", color: "bg-pink-500" },
    { name: "MySQL", color: "bg-teal-500" },
    { name: "Web Scraping", color: "bg-orange-500" },
    { name: "Automation", color: "bg-emerald-500" },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / containerRef.current.offsetWidth) - 0.5;
        const y = ((e.clientY - rect.top) / containerRef.current.offsetHeight) - 0.5;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovered(true));
      container.addEventListener("mouseleave", () => setIsHovered(false));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () => setIsHovered(true));
        container.removeEventListener("mouseleave", () => setIsHovered(false));
      }
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative h-80 md:h-96 w-full flex items-center justify-center my-12 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute w-full h-full"
        animate={{
          background: theme === "dark"
            ? "radial-gradient(circle at center, rgba(71, 85, 105, 0.2) 0%, rgba(15, 23, 42, 0) 70%)"
            : "radial-gradient(circle at center, rgba(224, 231, 255, 0.6) 0%, rgba(248, 250, 252, 0) 70%)",
        }}
        style={{
          backgroundPosition: isHovered ? `${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%` : "50% 50%",
        }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="relative text-5xl md:text-6xl lg:text-7xl font-bold text-glow"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          animate={{ 
            scale: [0.97, 1.03, 0.97],
            textShadow: [
              theme === "dark" ? "0 0 15px rgba(56, 189, 248, 0.5)" : "0 0 5px rgba(56, 189, 248, 0.3)",
              theme === "dark" ? "0 0 20px rgba(56, 189, 248, 0.7)" : "0 0 10px rgba(56, 189, 248, 0.5)",
              theme === "dark" ? "0 0 15px rgba(56, 189, 248, 0.5)" : "0 0 5px rgba(56, 189, 248, 0.3)",
            ]
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <span className="highlight-gradient">My Skills</span>
          <motion.div 
            className="absolute -z-10 w-32 h-32 rounded-full bg-accent/20 blur-xl"
            style={{ top: '-50%', left: '30%' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -z-10 w-40 h-40 rounded-full bg-primary/20 blur-xl"
            style={{ bottom: '-30%', right: '20%' }}
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {skills.map((skill, index) => {
        // Calculate orbit size based on index
        const orbitSize = 120 + (index % 3) * 40;
        const animationDuration = 15 + (index % 5) * 3;
        const initialRotation = index * (360 / skills.length);

        return (
          <motion.div
            key={skill.name}
            className={`absolute py-2 px-4 rounded-full ${skill.color} text-white font-medium shadow-lg backdrop-blur-sm`}
            initial={{ rotate: initialRotation, scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            animate={{
              rotate: [initialRotation, initialRotation + 360],
            }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: animationDuration,
                ease: "linear",
              },
              scale: { duration: 0.5, delay: index * 0.1 }
            }}
            style={{
              transformOrigin: "center center",
              left: "50%",
              top: "50%",
              x: `-50%`,
              y: `-50%`,
              radius: orbitSize,
            }}
            whileHover={{ 
              scale: 1.2, 
              zIndex: 20,
              boxShadow: "0 0 20px rgba(0,0,0,0.3)"
            }}
          >
            {skill.name}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <section id="skills" className="py-20 px-4 relative" ref={sectionRef}>
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-accent/5 to-transparent"
      />
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="highlight-gradient">My Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I've developed expertise across Python development, web scraping, automation, 
            and various frameworks and tools
          </p>
        </motion.div>

        {/* Enhanced Spinning Skills Animation */}
        <SpinningSkills />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCategory title="Programming Languages" skills={programming} delay={0} />
          <SkillCategory title="Frameworks & Libraries" skills={frameworks} delay={0.2} />
          <SkillCategory title="Databases & Tools" skills={databases} delay={0.4} />
        </div>

        <motion.div
          className="mt-16 glass-card p-6 animated-border rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-4">Key Areas of Expertise</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Web Scraping",
              "Process Automation",
              "XML Processing",
              "Image Recognition",
              "Data Extraction",
              "PDF Generation",
              "Error Handling",
              "Selenium WebDriver",
              "API Integration",
            ].map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center p-3 bg-primary/10 rounded-lg"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "hsl(var(--primary) / 0.2)",
                }}
              >
                <div className="mr-3 text-primary">✓</div>
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
