
import { motion } from "framer-motion";

const Hero = () => {
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
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all btn-hover-effect"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium transition-all hover:bg-primary/10 btn-hover-effect"
              >
                Contact Me
              </a>
            </motion.div>
            <motion.div 
              className="mt-12 flex items-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { icon: "github", url: "https://github.com/rishavraj543256" },
                { icon: "linkedin", url: "https://linkedin.com/in/rishavraj1998" },
                { icon: "mail", url: "mailto:rajrishav543256@gmail.com" },
                { icon: "phone", url: "tel:+917903312858" }
              ].map((platform) => (
                <a 
                  key={platform.icon} 
                  href={platform.url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{platform.icon}</span>
                  <div className="w-6 h-6 bg-muted-foreground/50 rounded-full hover:bg-primary transition-colors"></div>
                </a>
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
              <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center overflow-hidden">
                <div className="text-7xl">👨‍💻</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
