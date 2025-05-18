
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate form submission
    setTimeout(() => {
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
    }, 1500);
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="highlight-gradient">Get In Touch</span>
          </h2>
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
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-primary/10 rounded-full text-primary">
                    📍
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <address className="text-muted-foreground not-italic">
                      San Francisco, California, USA
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-primary/10 rounded-full text-primary">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a href="mailto:hello@example.com" className="text-primary hover:underline">
                      hello@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-primary/10 rounded-full text-primary">
                    📱
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <a href="tel:+1234567890" className="text-primary hover:underline">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-3">Connect with me</h4>
                <div className="flex space-x-4">
                  {["github", "linkedin", "twitter", "dribbble"].map((platform) => (
                    <a
                      key={platform}
                      href={`#${platform}`}
                      className="p-2 bg-muted rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <span className="sr-only">{platform}</span>
                      <div className="w-6 h-6 bg-current rounded-full"></div>
                    </a>
                  ))}
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
              <h3 className="text-xl font-bold mb-6">Send a Message</h3>
              
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
