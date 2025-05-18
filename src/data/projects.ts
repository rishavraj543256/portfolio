
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio website with smooth animations built using React and Tailwind CSS.",
    image: "/placeholder.svg",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description: "Admin dashboard for managing an e-commerce platform with analytics and inventory management.",
    image: "/placeholder.svg",
    tags: ["React", "Node.js", "MongoDB", "Chart.js"],
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 3,
    title: "Travel Blog App",
    description: "A blog application focused on travel experiences with a rich text editor and image management.",
    image: "/placeholder.svg",
    tags: ["Next.js", "PostgreSQL", "Tailwind CSS", "AWS S3"],
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 4,
    title: "Task Management App",
    description: "A drag and drop task management application with real-time updates and collaboration features.",
    image: "/placeholder.svg",
    tags: ["React", "Firebase", "Redux", "Styled Components"],
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 5,
    title: "Weather Forecast App",
    description: "A beautiful weather application with animated visualizations and 7-day forecasts.",
    image: "/placeholder.svg",
    tags: ["React", "TypeScript", "OpenWeather API", "D3.js"],
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 6,
    title: "Music Player",
    description: "A sleek music player with visualizations and playlist management.",
    image: "/placeholder.svg",
    tags: ["React", "Electron", "Node.js", "Web Audio API"],
    demoUrl: "#",
    repoUrl: "#"
  }
];
