import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { experience } from "@/data/experience";
import { Briefcase, MapPin } from "lucide-react";
import { useRef } from "react";

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
    const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
    const transformPerspective = "perspective(1000px)";

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform: useMotionTemplate`${transformPerspective} rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" className="py-20 lg:py-32 px-4 bg-background section-bg-gradient" ref={containerRef}>
            <div className="container mx-auto max-w-6xl">
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 lg:mb-24 text-center text-foreground"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="gradient-text">Professional Experience</span>
                </motion.h2>

                <div className="relative">
                    {/* Vertical Line Background */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-muted rounded-full opacity-20"></div>

                    {/* Animated Vertical Line */}
                    <motion.div
                        className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-primary via-accent to-secondary rounded-full origin-top"
                        style={{ scaleY, height: "100%" }}
                    />

                    <div className="space-y-12 md:space-y-20">
                        {experience.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    } gap-8 md:gap-0`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-background rounded-full border-4 border-primary z-10 shadow-[0_0_15px_rgba(var(--primary),0.8)] mt-1.5 md:mt-0">
                                    <div className="w-full h-full bg-primary rounded-full animate-ping opacity-20"></div>
                                </div>

                                {/* Content Card */}
                                <div className="md:w-1/2 flex justify-center md:px-12">
                                    <TiltCard className="w-full">
                                        <div
                                            className="w-full glass-card p-6 md:p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
                                        >
                                            {/* Shine Effect */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-0 pointer-events-none" />

                                            <div className="flex flex-col gap-4 relative z-10 transform-style-3d">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                                        <h3 className="text-xl md:text-2xl font-bold text-[#e63946] transform translate-z-10">
                                                            {item.role}
                                                        </h3>
                                                        <span className="text-xs md:text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 transform translate-z-10">
                                                            {item.duration}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground transform translate-z-5">
                                                        <div className="flex items-center gap-1.5">
                                                            <Briefcase className="w-4 h-4 text-accent" />
                                                            <span className="font-semibold text-foreground">{item.company}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="w-4 h-4 text-accent" />
                                                            <span>{item.location}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <ul className="space-y-2 transform translate-z-5">
                                                    {item.description.map((desc, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                                            <span>{desc}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {item.techStack && (
                                                    <div className="flex flex-wrap gap-2 mt-2 pt-4 border-t border-border/50 transform translate-z-10">
                                                        {item.techStack.map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-secondary/10 text-secondary-foreground hover:bg-primary/20 transition-colors duration-300"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </TiltCard>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
