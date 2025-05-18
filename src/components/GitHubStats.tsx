import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Star, GitPullRequestIcon, MessageSquare, Code } from "lucide-react";
import CustomGitHubCalendar from "./GitHubCalendar";
import GitHubCalendar from 'react-github-calendar';
import React from "react";

interface GitStat {
  name: string;
  value: number;
  icon: React.ReactNode;
}

interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

// Typewriter component
const Typewriter = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = React.useState("");
  React.useEffect(() => {
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

const GitHubStats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  // Updated with real data
  const stats: GitStat[] = [
    { name: "Total Stars Earned", value: 42, icon: <Star className="w-5 h-5" /> },
    { name: "Total Commits (2024)", value: 587, icon: <Code className="w-5 h-5" /> },
    { name: "Total PRs", value: 38, icon: <GitPullRequestIcon className="w-5 h-5" /> },
    { name: "Total Issues", value: 27, icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Contributed to (last year)", value: 15, icon: <Github className="w-5 h-5" /> },
  ];

  // Updated with real languages data
  const languages: LanguageStat[] = [
    { name: "Python", percentage: 45.23, color: "#3572A5" },
    { name: "JavaScript", percentage: 28.76, color: "#f1e05a" },
    { name: "TypeScript", percentage: 13.42, color: "#2b7489" },
    { name: "HTML/CSS", percentage: 9.85, color: "#e34c26" },
    { name: "Java", percentage: 2.74, color: "#b07219" },
  ];

  return (
    <section id="github-stats" className="py-20 px-4 relative" ref={sectionRef}>
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
      />
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Github className="w-8 h-8" />
            <span className="highlight-gradient"><Typewriter text="GitHub Statistics" /></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A snapshot of my open source contributions and coding activities on GitHub
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-card bg-gradient-to-br from-background/50 to-background border-border/50 overflow-hidden h-full">
              <CardHeader>
                <CardTitle className="text-primary text-xl">
                  Rishav Raj's GitHub Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.map((stat) => (
                    <div key={stat.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {stat.icon}
                        <span>{stat.name}:</span>
                      </div>
                      <span className="font-bold text-lg">{stat.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 h-32 w-32 mx-auto relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">A-</span>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="rgba(74, 222, 128, 0.2)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="rgb(74, 222, 128)"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="50"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-card bg-gradient-to-br from-background/50 to-background border-border/50 overflow-hidden h-full">
              <CardHeader>
                <CardTitle className="text-primary text-xl">
                  Most Used Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 bg-gradient-to-r from-[#3572A5] via-[#f1e05a] to-[#2b7489] h-3 rounded-full"></div>
                <div className="space-y-6">
                  {languages.map((lang) => (
                    <div key={lang.name}>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <span 
                            className="h-3 w-3 rounded-full mr-2" 
                            style={{ backgroundColor: lang.color }} 
                          ></span>
                          <span>{lang.name}</span>
                        </div>
                        <span className="text-sm">{lang.percentage}%</span>
                      </div>
                      <Progress value={lang.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4"
        >
          <CustomGitHubCalendar username="rishavraj543256" />
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;

// Add blinking cursor style
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
