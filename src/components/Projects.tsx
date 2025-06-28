import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useRef } from "react";
import React from "react";

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

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section id="projects" className="py-24 px-4 section-bg-gradient" ref={projectsRef}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text"><Typewriter text="My Projects" /></span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Here are some of my recent works. Each project was carefully crafted with attention to detail, 
            using modern technologies and best practices to deliver exceptional user experiences.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={item}
              className="project-card card-hover-effect group"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-t-3xl">
                <div 
                  className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 project-image transition-transform duration-700 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${project.image})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                  }}
                />
                
                {/* Enhanced overlay */}
                <div className="project-overlay opacity-0 absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/80 to-secondary/90 flex flex-col items-center justify-center text-white p-6 transition-all duration-500 backdrop-blur-sm">
                  <motion.h3 
                    className="text-2xl font-bold mb-3 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="mb-6 text-sm text-center leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 justify-center mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="flex space-x-4"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        className="text-sm px-6 py-3 rounded-full bg-white text-primary font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Live Demo
                      </motion.a>
                    )}
                    {project.repoUrl && (
                      <motion.a
                        href={project.repoUrl}
                        className="text-sm px-6 py-3 rounded-full bg-black/30 text-white font-medium hover:bg-black/50 transition-all border border-white/30 backdrop-blur-sm"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Code
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-muted/50 to-muted/30 text-muted-foreground border border-muted/30">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-16"
        >
          <motion.a
            href="#"
            className="px-8 py-4 border-2 border-primary text-primary rounded-2xl font-medium transition-all hover:bg-primary/10 btn-hover-effect glass-effect"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.a>
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

export default Projects;