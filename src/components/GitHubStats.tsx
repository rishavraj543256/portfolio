import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Star, GitPullRequestIcon, MessageSquare, Code } from "lucide-react";
import CustomGitHubCalendar from "./GitHubCalendar";
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

const GitHubStats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  const stats: GitStat[] = [
    { name: "Total Stars Earned", value: 42, icon: <Star className="w-5 h-5" /> },
    { name: "Total Commits (2024)", value: 587, icon: <Code className="w-5 h-5" /> },
    { name: "Total PRs", value: 38, icon: <GitPullRequestIcon className="w-5 h-5" /> },
    { name: "Total Issues", value: 27, icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Contributed to (last year)", value: 15, icon: <Github className="w-5 h-5" /> },
  ];

  const languages: LanguageStat[] = [
    { name: "Python", percentage: 45.23, color: "#3572A5" },
    { name: "JavaScript", percentage: 28.76, color: "#f1e05a" },
    { name: "TypeScript", percentage: 13.42, color: "#2b7489" },
    { name: "HTML/CSS", percentage: 9.85, color: "#e34c26" },
    { name: "Java", percentage: 2.74, color: "#b07219" },
  ];

  return (
    <section id="github-stats" className="py-20 lg:py-32 px-4 relative section-bg-gradient" ref={sectionRef}>
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
      />
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 flex items-center justify-center gap-4 flex-wrap">
            <Github className="w-8 h-8 md:w-10 md:h-10" />
            <span className="gradient-text"><Typewriter text="GitHub Statistics" /></span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            A snapshot of my open source contributions and coding activities on GitHub
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card bg-gradient-to-br from-background/50 to-background border-border/50 overflow-hidden h-full card-hover-effect">
              <CardHeader className="pb-4">
                <CardTitle className="text-primary text-xl lg:text-2xl">
                  Rishav Raj's GitHub Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {stat.icon}
                        </div>
                        <span className="text-sm lg:text-base font-medium">{stat.name}:</span>
                      </div>
                      <span className="font-bold text-lg lg:text-xl text-primary">{stat.value}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-8">
                  <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl lg:text-4xl font-bold gradient-text">A-</span>
                    </div>
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="rgba(74, 222, 128, 0.2)"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset="50"
                        initial={{ strokeDashoffset: 251.2 }}
                        whileInView={{ strokeDashoffset: 50 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgb(74, 222, 128)" />
                          <stop offset="100%" stopColor="rgb(59, 130, 246)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card bg-gradient-to-br from-background/50 to-background border-border/50 overflow-hidden h-full card-hover-effect">
              <CardHeader className="pb-4">
                <CardTitle className="text-primary text-xl lg:text-2xl">
                  Most Used Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 bg-gradient-to-r from-[#3572A5] via-[#f1e05a] to-[#2b7489] h-4 rounded-full shadow-lg"></div>
                <div className="space-y-6">
                  {languages.map((lang, index) => (
                    <motion.div
                      key={lang.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center">
                          <span 
                            className="h-4 w-4 rounded-full mr-3 shadow-lg" 
                            style={{ backgroundColor: lang.color }} 
                          ></span>
                          <span className="font-medium text-sm lg:text-base">{lang.name}</span>
                        </div>
                        <span className="text-sm lg:text-base font-bold text-primary">{lang.percentage}%</span>
                      </div>
                      <Progress value={lang.percentage} className="h-3" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4"
        >
          <div className="overflow-x-auto">
            <CustomGitHubCalendar username="rishavraj543256" />
          </div>
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

export default GitHubStats;