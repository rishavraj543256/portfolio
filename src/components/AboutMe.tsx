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
    <section id="about" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight-gradient"><Typewriter text="About Me" /></span>
        </motion.h2>
        <div className="flex flex-col md:flex-row items-start gap-16">
          {/* Illustration */}
          <div className="flex-shrink-0 flex justify-center items-start w-full md:w-1/2">
            <img
              src="/pic.PNG"
              alt="Rishav Raj"
              className="rounded-2xl object-cover w-full h-auto shadow-lg border-4 border-background"
            />
          </div>
          {/* About Me Content */}
          <div className="w-full md:w-1/2">
            <ul className="space-y-4 text-lg text-foreground w-full">
              <li className="flex items-start gap-3">
                <FaArrowRight className="mt-1.5 text-[#e63946] flex-shrink-0" />
                <span><span className="text-primary">Hello!</span> My name is <span className="font-semibold text-[#e63946]">Rishav Raj</span> and I am from <span className="text-primary">Bihar, India</span>.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaArrowRight className="mt-1.5 text-[#e63946] flex-shrink-0" />
                <span>I am a <span className="text-primary font-semibold">Python Developer</span> passionate about <span className="text-primary">automation</span>, <span className="text-primary">web scraping</span>, and <span className="text-primary">process optimization</span>.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaArrowRight className="mt-1.5 text-[#e63946] flex-shrink-0" />
                <span>My professional journey includes impactful roles at <span className="text-[#e63946] font-semibold">TNBT Group</span>, <span className="text-[#e63946] font-semibold">Qubeta Techno Lab</span>, and <span className="text-[#e63946] font-semibold">Advarisk</span>, where I built automation tools for tax, healthcare, and data extraction workflows.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaArrowRight className="mt-1.5 text-[#e63946] flex-shrink-0" />
                <span>I am skilled in <span className="text-primary">Python, Django, Flask, Selenium, MongoDB, MySQL</span> and more, with hands-on experience in both backend and frontend development.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaArrowRight className="mt-1.5 text-[#e63946] flex-shrink-0" />
                <span>My strengths include <span className="text-primary">adaptability</span>, <span className="text-primary">commitment</span>, and a drive for <span className="text-primary">continuous learning</span>.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaArrowRight className="mt-1.5 text-[#e63946] flex-shrink-0" />
                <span>I am always eager to tackle new challenges and contribute to innovative projects that make a real difference.</span>
              </li>
            </ul>
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

export default AboutMe; 