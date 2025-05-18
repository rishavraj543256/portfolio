
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
      className="glass-card p-6"
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

// New component for spinning skills
const SpinningSkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: "Python", color: "bg-blue-500" },
    { name: "Selenium", color: "bg-green-500" },
    { name: "BeautifulSoup", color: "bg-purple-500" },
    { name: "MongoDB", color: "bg-yellow-500" },
    { name: "Django", color: "bg-red-500" },
    { name: "Flask", color: "bg-indigo-500" },
    { name: "OpenCV", color: "bg-pink-500" },
    { name: "MySQL", color: "bg-teal-500" },
  ];

  return (
    <motion.div
      ref={containerRef}
      className="relative h-64 md:h-80 w-full flex items-center justify-center my-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-5xl md:text-6xl font-bold text-primary"
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Skills
        </motion.div>
      </div>
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className={`absolute rounded-full ${skill.color} text-white px-4 py-2 text-sm md:text-base font-medium shadow-lg`}
          animate={{
            rotate: [0, 360],
            radius: 120 + (index % 3) * 30,
          }}
          transition={{
            duration: 20,
            delay: index * 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "center center",
            left: "50%",
            top: "50%",
            x: `-50%`,
            y: `-50%`,
          }}
          custom={index}
        >
          {skill.name}
        </motion.div>
      ))}
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="highlight-gradient">My Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I've developed expertise across Python development, web scraping, automation, 
            and various frameworks and tools
          </p>
        </motion.div>

        {/* Spinning Skills Animation */}
        <SpinningSkills />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCategory title="Programming Languages" skills={programming} delay={0} />
          <SkillCategory title="Frameworks & Libraries" skills={frameworks} delay={0.2} />
          <SkillCategory title="Databases & Tools" skills={databases} delay={0.4} />
        </div>

        <motion.div
          className="mt-16 glass-card p-6"
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
            ].map((item) => (
              <motion.div
                key={item}
                className="flex items-center p-3 bg-primary/10 rounded-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
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
