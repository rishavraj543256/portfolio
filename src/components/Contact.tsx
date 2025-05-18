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
          timeout = setTimeout(typeLoop, 1200); // Wait before erasing
        }
      } else {
        if (i >= 0) {
          setDisplayed(text.slice(0, i));
          i--;
          timeout = setTimeout(typeLoop, 30);
        } else {
          forward = true;
          timeout = setTimeout(typeLoop, 600); // Wait before typing again
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

  const inputClasses = "w-full bg-transparent border-b border-border focus:border-primary focus:outline-none py-2 transition-all duration-300";

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="highlight-gradient"><Typewriter text="Get In Touch" /></span>
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in working together? Feel free to reach out.
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-6">
              <motion.h3
                className="text-xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                Contact Information
              </motion.h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-primary/10 rounded-full text-primary">
                    📍
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <address className="text-muted-foreground not-italic">
                      Ahmedabad
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-primary/10 rounded-full text-primary">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a href="mailto:rajrishav543256@gmail.com" className="text-primary hover:underline">
                      rajrishav543256@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-primary/10 rounded-full text-primary">
                    📱
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <a href="tel:+917903312858" className="text-primary hover:underline">
                      +91-7903312858
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-3">Connect with me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/rishavraj543256"
                    className="p-2 bg-muted rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">github</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/rishavraj1998"
                    className="p-2 bg-muted rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">linkedin</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-6">
              <motion.h3
                className="text-xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                Send a Message
              </motion.h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="relative">
                    <motion.label
                      htmlFor="name"
                      className="absolute left-0 transition-all duration-300"
                      animate={{
                        top: focusedField === "name" || formData.name ? "-24px" : "0",
                        fontSize: focusedField === "name" || formData.name ? "0.875rem" : "1rem",
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
                  </div>
                  
                  <div className="relative">
                    <motion.label
                      htmlFor="email"
                      className="absolute left-0 transition-all duration-300"
                      animate={{
                        top: focusedField === "email" || formData.email ? "-24px" : "0",
                        fontSize: focusedField === "email" || formData.email ? "0.875rem" : "1rem",
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
                  </div>
                </div>
                
                <div className="relative mb-6">
                  <motion.label
                    htmlFor="subject"
                    className="absolute left-0 transition-all duration-300"
                    animate={{
                      top: focusedField === "subject" || formData.subject ? "-24px" : "0",
                      fontSize: focusedField === "subject" || formData.subject ? "0.875rem" : "1rem",
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
                </div>
                
                <div className="relative mb-8">
                  <motion.label
                    htmlFor="message"
                    className="absolute left-0 transition-all duration-300"
                    animate={{
                      top: focusedField === "message" || formData.message ? "-24px" : "0",
                      fontSize: focusedField === "message" || formData.message ? "0.875rem" : "1rem",
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
                    className={`${inputClasses} min-h-[120px]`}
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className={`px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all relative overflow-hidden ${
                    isSending ? "opacity-80" : "btn-hover-effect"
                  }`}
                  disabled={isSending}
                  whileHover={!isSending ? { scale: 1.03 } : {}}
                  whileTap={!isSending ? { scale: 0.98 } : {}}
                >
                  {isSending ? (
                    <>
                      <span className="opacity-0">Send Message</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
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
                        </svg>
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
    </section>
  );
};

export default Contact;

// Add blinking cursor style
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
