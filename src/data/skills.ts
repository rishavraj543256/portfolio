export type SkillCategory = "frontend" | "backend" | "ai" | "all";

export interface Skill {
    name: string;
    icon: string;
    category: SkillCategory | SkillCategory[];
}

export const skills: Skill[] = [
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
