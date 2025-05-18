import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="bg-background">
      <div className="container mx-auto py-8 px-4 flex flex-col items-center justify-center">
        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-center">
          <span className="highlight-gradient">Quick Links</span>
        </h3>
        {/* Center: Quick Links (horizontal, animated, looping) */}
        <nav className="flex flex-row space-x-8 text-foreground text-base items-center justify-center">
          {quickLinks.map((link, idx) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="footer-link hover:underline underline-offset-4 transition-colors inline-block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: [0, 1, 1, 0], y: [24, 0, 0, 24] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: idx * 0.3,
              }}
              whileHover={{ scale: 1.08, color: '#e63946' }}
              whileTap={{ scale: 0.96 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
      </div>
      <div className="border-t border-border text-center text-sm text-muted-foreground py-4">
        Made with <span className="text-[#e63946]">❤️</span> by Rishav Raj. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
