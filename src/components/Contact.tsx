import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';
import React from "react";

// Typewriter component
const Typewriter = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
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

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      'service_apgug8a',
      'template_hhnj1rp',
      e.target as HTMLFormElement,
      'UHraT5VKk9slG9jGG'
    )
    .then(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSending(false);
    }, (error) => {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again later.",
      });
      setIsSending(false);
    });
  };

  const inputClasses = "w-full bg-transparent border-b-2 border-border focus:border-primary focus:outline-none py-3 transition-all duration-300 text-lg";

  return (
    <section id="contact" className="py-24 px-4 section-bg-gradient">
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
            <span className="gradient-text"><Typewriter text="Get In Touch" /></span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Interested in working together? Feel free to reach out.
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card p-8 card-hover-effect">
              <motion.h3
                className="text-2xl font-bold mb-8 gradient-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Contact Information
              </motion.h3>
              
              <div className="space-y-8">
                {[
                  { icon: "📍", title: "Location", content: "Ahmedabad", delay: 0.1 },
                  { icon: "✉️", title: "Email", content: "rajrishav543256@gmail.com", link: "mailto:rajrishav543256@gmail.com", delay: 0.2 },
                  { icon: "📱", title: "Phone", content: "+91-7903312858", link: "tel:+917903312858", delay: 0.3 }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: item.delay }}
                  >
                    <motion.div 
                      className="mr-6 p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl text-2xl group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold mb-2 text-lg">{item.title}</h4>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className="text-primary hover:text-accent transition-colors duration-300 hover:underline text-base"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-base">{item.content}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="font-semibold mb-6 text-lg">Connect with me</h4>
                <div className="flex space-x-4">
                  {[
                    { 
                      name: "GitHub", 
                      url: "https://github.com/rishavraj543256", 
                      bg: "bg-gradient-to-r from-[#181717] to-[#333]",
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                        </svg>
                      )
                    },
                    { 
                      name: "LinkedIn", 
                      url: "https://linkedin.com/in/rishavraj1998", 
                      bg: "bg-gradient-to-r from-[#0A66C2] to-[#004182]",
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/>
                        </svg>
                      )
                    }
                  ].map((platform, index) => (
                    <motion.a
                      key={platform.name}
                      href={platform.url}
                      className={`${platform.bg} rounded-2xl w-14 h-14 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {platform.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card p-8 card-hover-effect">
              <motion.h3
                className="text-2xl font-bold mb-8 gradient-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Send a Message
              </motion.h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <motion.label
                      htmlFor="name"
                      className="absolute left-0 transition-all duration-300 text-lg font-medium"
                      animate={{
                        top: focusedField === "name" || formData.name ? "-32px" : "0",
                        fontSize: focusedField === "name" || formData.name ? "0.875rem" : "1.125rem",
                        color: focusedField === "name" ? "var(--primary)" : "",
                      }}
                    >
                      Your Name
                    </motion.label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={handleBlur}
                      className={inputClasses}
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.label
                      htmlFor="email"
                      className="absolute left-0 transition-all duration-300 text-lg font-medium"
                      animate={{
                        top: focusedField === "email" || formData.email ? "-32px" : "0",
                        fontSize: focusedField === "email" || formData.email ? "0.875rem" : "1.125rem",
                        color: focusedField === "email" ? "var(--primary)" : "",
                      }}
                    >
                      Your Email
                    </motion.label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      className={inputClasses}
                      required
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.label
                    htmlFor="subject"
                    className="absolute left-0 transition-all duration-300 text-lg font-medium"
                    animate={{
                      top: focusedField === "subject" || formData.subject ? "-32px" : "0",
                      fontSize: focusedField === "subject" || formData.subject ? "0.875rem" : "1.125rem",
                      color: focusedField === "subject" ? "var(--primary)" : "",
                    }}
                  >
                    Subject
                  </motion.label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus("subject")}
                    onBlur={handleBlur}
                    className={inputClasses}
                    required
                  />
                </motion.div>
                
                <motion.div
                  className="relative mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.label
                    htmlFor="message"
                    className="absolute left-0 transition-all duration-300 text-lg font-medium"
                    animate={{
                      top: focusedField === "message" || formData.message ? "-32px" : "0",
                      fontSize: focusedField === "message" || formData.message ? "0.875rem" : "1.125rem",
                      color: focusedField === "message" ? "var(--primary)" : "",
                    }}
                  >
                    Your Message
                  </motion.label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={handleBlur}
                    className={`${inputClasses} min-h-[150px] resize-none`}
                    required
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  className={`px-10 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-semibold transition-all relative overflow-hidden text-lg ${
                    isSending ? "opacity-80" : "btn-hover-effect pulse-glow"
                  }`}
                  disabled={isSending}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={!isSending ? { scale: 1.05 } : {}}
                  whileTap={!isSending ? { scale: 0.95 } : {}}
                >
                  {isSending ? (
                    <>
                      <span className="opacity-0">Send Message</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <motion.svg
                          className="w-6 h-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </motion.svg>
                      </span>
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
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
    </section>
  );
};

export default Contact;