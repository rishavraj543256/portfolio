
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 pb-12 px-4"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-sm font-medium text-primary mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hi, my name is
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="highlight-gradient">Rishav Raj</span>
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Python Developer
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Automation Developer with expertise in Python, web scraping, and process automation. 
              I build robust solutions that improve operational efficiency and deliver measurable business value.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all relative overflow-hidden group btn-hover-effect"
              >
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium transition-all relative overflow-hidden group btn-hover-effect"
              >
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </motion.div>
            <motion.div 
              className="mt-12 flex items-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { icon: "github", url: "https://github.com/rishavraj543256", label: "GitHub" },
                { icon: "linkedin", url: "https://linkedin.com/in/rishavraj1998", label: "LinkedIn" },
                { icon: "mail", url: "mailto:rajrishav543256@gmail.com", label: "Email" },
                { icon: "phone", url: "tel:+917903312858", label: "Phone" }
              ].map((platform) => (
                <motion.a 
                  key={platform.icon} 
                  href={platform.url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">{platform.label}</span>
                  <div className="w-8 h-8 bg-muted-foreground/50 rounded-full hover:bg-primary transition-colors flex items-center justify-center">
                    <span className="text-lg">{platform.icon === "github" ? "🔗" : 
                                             platform.icon === "linkedin" ? "💼" : 
                                             platform.icon === "mail" ? "✉️" : 
                                             "📱"}</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-70"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div 
                className="absolute inset-4 rounded-full bg-background flex items-center justify-center overflow-hidden"
                animate={{
                  boxShadow: [
                    theme === 'dark' ? '0 0 20px rgba(255,255,255,0.1)' : '0 0 20px rgba(0,0,0,0.1)',
                    theme === 'dark' ? '0 0 30px rgba(255,255,255,0.2)' : '0 0 30px rgba(0,0,0,0.2)',
                    theme === 'dark' ? '0 0 20px rgba(255,255,255,0.1)' : '0 0 20px rgba(0,0,0,0.1)',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <motion.div 
                  className="text-7xl"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  👨‍💻
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute -z-10 h-24 w-24 rounded-full bg-primary/30 blur-xl"
                style={{ top: '10%', left: '15%' }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute -z-10 h-32 w-32 rounded-full bg-accent/30 blur-xl"
                style={{ bottom: '10%', right: '15%' }}
                animate={{
                  scale: [1.2, 1, 1.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:block"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.8, 0.4, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <a href="#projects" className="flex flex-col items-center text-muted-foreground">
            <span className="text-sm mb-2">Scroll Down</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
