
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Github, Star, GitPullRequestIcon, MessageSquare, Code } from "lucide-react";

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

  // Updated with more realistic contribution data
  const contributionData = [
    { month: "Jan", contributions: 42 },
    { month: "Feb", contributions: 38 },
    { month: "Mar", contributions: 67 },
    { month: "Apr", contributions: 51 },
    { month: "May", contributions: 72 },
    { month: "Jun", contributions: 49 },
    { month: "Jul", contributions: 63 },
    { month: "Aug", contributions: 58 },
    { month: "Sep", contributions: 47 },
    { month: "Oct", contributions: 52 },
    { month: "Nov", contributions: 44 },
    { month: "Dec", contributions: 54 },
  ];

  const chartConfig = {
    python: { theme: { light: "#3572A5", dark: "#3572A5" } },
    javascript: { theme: { light: "#f1e05a", dark: "#f1e05a" } },
    typescript: { theme: { light: "#2b7489", dark: "#2b7489" } },
    html: { theme: { light: "#e34c26", dark: "#e34c26" } },
    java: { theme: { light: "#b07219", dark: "#b07219" } },
  };

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
            <span className="highlight-gradient">GitHub Statistics</span>
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
          <Card className="glass-card bg-gradient-to-br from-background/50 to-background border-border/50">
            <CardHeader>
              <CardTitle className="text-primary text-xl flex items-center gap-2">
                <Github className="w-5 h-5" />
                GitHub Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-64" config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contributionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <XAxis dataKey="month" />
                    <YAxis hide />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                    />
                    <Bar dataKey="contributions">
                      {contributionData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.contributions > 60 ? '#4ade80' : entry.contributions > 45 ? '#60a5fa' : '#9ca3af'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">637 contributions in the last year</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Less</span>
                  {['#9ca3af', '#60a5fa', '#4ade80', '#ec4899'].map((color, index) => (
                    <span 
                      key={index} 
                      className="h-3 w-3 rounded-sm" 
                      style={{ backgroundColor: color }} 
                    ></span>
                  ))}
                  <span className="text-sm text-muted-foreground">More</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
