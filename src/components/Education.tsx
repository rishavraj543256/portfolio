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
    <section id="education" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight-gradient"><Typewriter text="Education" /></span>
        </motion.h2>
        <div className="relative flex flex-col md:grid grid-cols-9 mx-auto p-2 text-gray-50">
          {/* B.Tech */}
          <div className="flex md:contents">
            <div className="col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto border-2 border-[#e63946] bg-background text-left shadow-md">
              <h3 className="font-bold text-lg text-[#e63946] mb-1">B.Tech (Computer Science and Engineering)</h3>
              <div className="font-semibold text-base mb-1 text-foreground">Maharishi University of Information Technology, Noida, Uttar Pradesh</div>
              <div className="text-sm text-muted-foreground mb-1">2018 – 2022</div>
              <div className="text-sm text-primary font-medium">Percentage: 75%</div>
            </div>
            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-[#e63946] pointer-events-none"></div>
              </div>
              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-background border-2 border-[#e63946] flex items-center justify-center text-[#e63946]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" /></svg>
              </div>
            </div>
          </div>
          {/* Intermediate */}
          <div className="flex md:contents">
            <div className="col-start-5 col-end-6 md:mx-auto relative ml-10">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-[#e63946] pointer-events-none"></div>
              </div>
              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-background border-2 border-[#e63946] flex items-center justify-center text-[#e63946]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" /></svg>
              </div>
            </div>
            <div className="col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto border-2 border-[#e63946] bg-background text-left shadow-md">
              <h3 className="font-bold text-lg text-[#e63946] mb-1">Intermediate (Science)</h3>
              <div className="font-semibold text-base mb-1 text-foreground">K. R. BOSE SMARAK COLLEGE, Muzaffarpur, Bihar</div>
              <div className="text-sm text-muted-foreground mb-1">2015 – 2017</div>
              <div className="text-sm text-primary font-medium">Percentage: 60%</div>
            </div>
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