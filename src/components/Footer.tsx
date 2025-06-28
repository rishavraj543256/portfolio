import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
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

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="bg-background section-bg-gradient">
      <div className="container mx-auto py-12 px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-4">
              Rishav Raj
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Python Developer passionate about automation, web scraping, and building innovative solutions that make a difference.
            </p>
            <div className="flex space-x-4">
              {[
                { 
                  icon: <FaGithub className="w-5 h-5" />, 
                  url: "https://github.com/rishavraj543256", 
                  bg: "bg-gradient-to-r from-[#181717] to-[#333]" 
                },
                { 
                  icon: <FaLinkedin className="w-5 h-5" />, 
                  url: "https://linkedin.com/in/rishavraj1998", 
                  bg: "bg-gradient-to-r from-[#0A66C2] to-[#004182]" 
                },
                { 
                  icon: <FaEnvelope className="w-5 h-5" />, 
                  url: "mailto:rajrishav543256@gmail.com", 
                  bg: "bg-gradient-to-r from-[#EA4335] to-[#c23321]" 
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className={`${social.bg} rounded-xl w-12 h-12 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6 gradient-text">
              <Typewriter text="Quick Links" />
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="footer-link block hover:text-primary transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-primary">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-primary w-4 h-4" />
                <span className="text-muted-foreground text-sm">Ahmedabad, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary w-4 h-4" />
                <a href="mailto:rajrishav543256@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  rajrishav543256@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary w-4 h-4" />
                <a href="tel:+917903312858" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +91-7903312858
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-border pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © 2024 Rishav Raj. All rights reserved.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                Made with <span className="text-[#e63946] animate-pulse">❤️</span> using React & TypeScript
              </p>
            </div>
          </div>
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
    </footer>
  );
};

export default Footer;