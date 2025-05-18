
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

const frontend: Skill[] = [
  { name: "HTML/CSS", percentage: 95, icon: "🌐" },
  { name: "JavaScript", percentage: 90, icon: "📜" },
  { name: "TypeScript", percentage: 85, icon: "🔷" },
  { name: "React", percentage: 92, icon: "⚛️" },
  { name: "Next.js", percentage: 88, icon: "▲" },
];

const backend: Skill[] = [
  { name: "Node.js", percentage: 85, icon: "🟢" },
  { name: "Express", percentage: 80, icon: "🚂" },
  { name: "PostgreSQL", percentage: 75, icon: "🐘" },
  { name: "MongoDB", percentage: 78, icon: "🍃" },
  { name: "GraphQL", percentage: 70, icon: "◈" },
];

const tools: Skill[] = [
  { name: "Git", percentage: 90, icon: "🌿" },
  { name: "Docker", percentage: 75, icon: "🐳" },
  { name: "AWS", percentage: 70, icon: "☁️" },
  { name: "CI/CD", percentage: 65, icon: "🔄" },
  { name: "Figma", percentage: 80, icon: "🎨" },
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
            I've developed expertise across front-end, back-end, and the tools that bring them together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCategory title="Frontend Development" skills={frontend} delay={0} />
          <SkillCategory title="Backend Development" skills={backend} delay={0.2} />
          <SkillCategory title="Tools & Others" skills={tools} delay={0.4} />
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
              "Responsive Web Design",
              "Progressive Web Apps",
              "API Development",
              "Database Design",
              "UI/UX Optimization",
              "Performance Tuning",
              "Testing & Debugging",
              "State Management",
              "Serverless Architecture",
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
