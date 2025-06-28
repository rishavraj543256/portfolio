import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Typewriter component
const Typewriter = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
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

const Education = () => {
  return (
    <section id="education" className="py-20 lg:py-32 px-4 bg-background section-bg-gradient">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 lg:mb-20 text-center text-foreground"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="gradient-text"><Typewriter text="Education" /></span>
        </motion.h2>
        
        {/* Mobile-first responsive timeline */}
        <div className="relative">
          {/* Timeline line - hidden on mobile, visible on md+ */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-secondary"></div>
          
          {/* Mobile timeline line */}
          <div className="md:hidden absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-primary via-accent to-secondary"></div>

          <div className="space-y-12 md:space-y-16">
            {/* B.Tech */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Mobile layout */}
              <div className="md:hidden flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mr-6 shadow-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                  </svg>
                </div>
                <div className="glass-card p-6 flex-1 card-hover-effect">
                  <h3 className="font-bold text-lg md:text-xl text-[#e63946] mb-2">B.Tech (Computer Science and Engineering)</h3>
                  <div className="font-semibold text-sm md:text-base mb-2 text-foreground">Maharishi University of Information Technology, Noida, Uttar Pradesh</div>
                  <div className="text-sm text-muted-foreground mb-2">2018 – 2022</div>
                  <div className="text-sm text-primary font-medium">Percentage: 75%</div>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden md:flex">
                <div className="w-1/2 pr-8 text-right">
                  <motion.div
                    className="glass-card p-6 card-hover-effect"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="font-bold text-xl lg:text-2xl text-[#e63946] mb-3">B.Tech (Computer Science and Engineering)</h3>
                    <div className="font-semibold text-base lg:text-lg mb-2 text-foreground">Maharishi University of Information Technology, Noida, Uttar Pradesh</div>
                    <div className="text-sm lg:text-base text-muted-foreground mb-2">2018 – 2022</div>
                    <div className="text-sm lg:text-base text-primary font-medium">Percentage: 75%</div>
                  </motion.div>
                </div>
                
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl z-10">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                  </svg>
                </div>
                
                <div className="w-1/2 pl-8"></div>
              </div>
            </motion.div>

            {/* Intermediate */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Mobile layout */}
              <div className="md:hidden flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mr-6 shadow-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                  </svg>
                </div>
                <div className="glass-card p-6 flex-1 card-hover-effect">
                  <h3 className="font-bold text-lg md:text-xl text-[#e63946] mb-2">Intermediate (Science)</h3>
                  <div className="font-semibold text-sm md:text-base mb-2 text-foreground">K. R. BOSE SMARAK COLLEGE, Muzaffarpur, Bihar</div>
                  <div className="text-sm text-muted-foreground mb-2">2015 – 2017</div>
                  <div className="text-sm text-primary font-medium">Percentage: 60%</div>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden md:flex">
                <div className="w-1/2 pr-8"></div>
                
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center shadow-2xl z-10">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                  </svg>
                </div>
                
                <div className="w-1/2 pl-8">
                  <motion.div
                    className="glass-card p-6 card-hover-effect"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="font-bold text-xl lg:text-2xl text-[#e63946] mb-3">Intermediate (Science)</h3>
                    <div className="font-semibold text-base lg:text-lg mb-2 text-foreground">K. R. BOSE SMARAK COLLEGE, Muzaffarpur, Bihar</div>
                    <div className="text-sm lg:text-base text-muted-foreground mb-2">2015 – 2017</div>
                    <div className="text-sm lg:text-base text-primary font-medium">Percentage: 60%</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
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
      </div>
    </section>
  );
};

export default Education;