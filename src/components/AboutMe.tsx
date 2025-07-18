import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

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

const AboutMe = () => {
  return (
    <section id="about" className="py-20 lg:py-32 px-4 bg-background section-bg-gradient">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 lg:mb-20 text-center text-foreground"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="gradient-text"><Typewriter text="About Me" /></span>
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          {/* Enhanced Image Section */}
          <motion.div 
            className="flex-shrink-0 flex justify-center items-start w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.img
                src="/pic.PNG"
                alt="Rishav Raj"
                className="relative rounded-3xl object-cover w-full max-w-md h-auto shadow-2xl border-4 border-background glass-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
          
          {/* Enhanced Content Section */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ul className="space-y-6 text-base md:text-lg text-foreground w-full">
              {[
                {
                  text: (
                    <>
                      <span className="text-primary font-semibold">Hello!</span> My name is{" "}
                      <span className="font-bold text-[#e63946]">Rishav Raj</span> and I am from{" "}
                      <span className="text-primary font-semibold">Bihar, India</span>.
                    </>
                  ),
                  delay: 0.1
                },
                {
                  text: (
                    <>
                      I am a <span className="text-primary font-bold">Python Developer</span> passionate about{" "}
                      <span className="text-primary font-semibold">automation</span>,{" "}
                      <span className="text-primary font-semibold">web scraping</span>, and{" "}
                      <span className="text-primary font-semibold">process optimization</span>.
                    </>
                  ),
                  delay: 0.2
                },
                {
                  text: (
                    <>
                      My professional journey includes impactful roles at{" "}
                      <span className="text-[#e63946] font-bold">TNBT Group</span>,{" "}
                      <span className="text-[#e63946] font-bold">Qubeta Techno Lab</span>, and{" "}
                      <span className="text-[#e63946] font-bold">Advarisk</span>, where I built automation tools for tax, healthcare, and data extraction workflows.
                    </>
                  ),
                  delay: 0.3
                },
                {
                  text: (
                    <>
                      I am skilled in{" "}
                      <span className="text-primary font-semibold">Python, Django, Flask, Selenium, MongoDB, MySQL</span>{" "}
                      and more, with hands-on experience in both backend and frontend development.
                    </>
                  ),
                  delay: 0.4
                },
                {
                  text: (
                    <>
                      My strengths include{" "}
                      <span className="text-primary font-semibold">adaptability</span>,{" "}
                      <span className="text-primary font-semibold">commitment</span>, and a drive for{" "}
                      <span className="text-primary font-semibold">continuous learning</span>.
                    </>
                  ),
                  delay: 0.5
                },
                {
                  text: "With a passion for both teamwork and independent work, I regularly take on freelance projects across various industries.",
                  delay: 0.55
                },
                {
                  text: "I am always eager to tackle new challenges and contribute to innovative projects that make a real difference.",
                  delay: 0.6
                }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: item.delay }}
                >
                  <motion.div
                    className="mt-2 text-[#e63946] flex-shrink-0"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaArrowRight className="w-4 h-4" />
                  </motion.div>
                  <span className="leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Call to Action */}
            <motion.div
              className="mt-12 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-semibold transition-all btn-hover-effect text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 border-2 border-primary text-primary rounded-2xl font-semibold transition-all glass-effect hover:bg-primary/10 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
              </motion.a>
            </motion.div>
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
      </div>
    </section>
  );
};

export default AboutMe;