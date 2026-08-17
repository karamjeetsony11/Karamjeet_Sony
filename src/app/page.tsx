"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import Link from "next/link";

const ProjectShowcase = dynamic(() => import("@/components/ProjectShowcase"), {
  ssr: false,
});

export default function HomePage() {
  const introRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ─── Intro Section Animations ───
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 75%",
        },
      });

      introTl
        .fromTo(
          introRef.current?.querySelectorAll(".reveal-text") || [],
          { y: 100, rotateX: -30, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.1,
            ease: "expo.out",
          },
        )
        .fromTo(
          introRef.current?.querySelector(
            ".decorative-line",
          ) as HTMLElement | null,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 2, ease: "power4.out" },
          "-=1",
        );

      // ─── Skills Section Animations ───
      gsap.fromTo(
        skillsRef.current?.querySelectorAll(".skill-card-anim") || [],
        { y: 50, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 75%",
          },
        },
      );

      // ─── Education Timeline Animations ───
      gsap.fromTo(
        timelineRef.current?.querySelectorAll(".timeline-card-anim") || [],
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
          },
        },
      );

      // ─── Certifications Animations ───
      gsap.fromTo(
        certRef.current?.querySelectorAll(".cert-card-anim") || [],
        { y: 50, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: certRef.current,
            start: "top 75%",
          },
        },
      );

      // ─── CTA Section Animations ───
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.95, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-background">
      <Hero />

      {/* ─── Intro Section ─── */}
      <section
        ref={introRef}
        className="relative py-24 md:py-48 px-6 md:px-24 overflow-hidden bg-background"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="perspective-1000">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-6 md:mb-8">
              Protocol // Philosophy
            </p>
            <h2 className="reveal-text font-display text-[clamp(2.2rem,8vw,5.5rem)] font-bold leading-[0.9] tracking-tighter text-foreground mb-8 md:mb-12">
              Products for <br />
              <span className="text-accent italic font-light">
                Real Problems.
              </span>
            </h2>
            <div className="decorative-line h-px w-full bg-accent/20 origin-left" />
          </div>

          <div className="pt-4 lg:pt-32">
            <p className="reveal-text font-body text-lg md:text-2xl font-light text-foreground/75 leading-relaxed mb-8 md:mb-10">
              I am a Full Stack Developer and Computer Science & Engineering
              student at Delhi Technological University. I am excited by
              real-world problems and turn them into reliable products,
              practical web experiences, and developer tools.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-4 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-foreground"
            >
              Explore the story
              <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-[#0D0D0D]">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h12M9 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Technical Skills Section ─── */}
      <section
        ref={skillsRef}
        className="py-24 px-6 md:px-24 border-t border-white/5 relative overflow-hidden bg-background"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-6">
            Diagnostic // Technical Stack
          </p>
          <h2 className="font-display text-[clamp(2.2rem,8vw,4.5rem)] font-bold leading-[0.9] tracking-tighter text-foreground mb-16">
            Technical{" "}
            <span className="text-accent italic font-light">Capabilities.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="skill-card-anim p-8 rounded-3xl border border-white/5 bg-glass-bg backdrop-blur-xl group hover:border-accent/20 transition-all duration-500">
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-6">
                01 // Languages
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "C++",
                  "Go",
                  "Rust",
                  "JavaScript",
                  "Java",
                  "Python",
                  "SQL",
                ].map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs font-mono text-foreground/80"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-card-anim p-8 rounded-3xl border border-white/5 bg-glass-bg backdrop-blur-xl group hover:border-accent/20 transition-all duration-500">
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-6">
                02 // Web Development
              </span>
              <div className="flex flex-wrap gap-2.5">
                {["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"].map(
                  (lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs font-mono text-foreground/80"
                    >
                      {lang}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="skill-card-anim p-8 rounded-3xl border border-white/5 bg-glass-bg backdrop-blur-xl group hover:border-accent/20 transition-all duration-500">
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-6">
                03 // Backend & DB
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Gin",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "MySQL",
                  "Redis",
                ].map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs font-mono text-foreground/80"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-card-anim p-8 rounded-3xl border border-white/5 bg-glass-bg backdrop-blur-xl group hover:border-accent/20 transition-all duration-500">
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-6">
                04 // Core CS & Tools
              </span>
              <div className="flex flex-wrap gap-2.5">
                {["Git", "GitHub", "Linux", "VS Code", "DSA", "OOP"].map(
                  (lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs font-mono text-foreground/80"
                    >
                      {lang}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectShowcase />

      {/* ─── Education Timeline Section ─── */}
      <section
        ref={timelineRef}
        className="py-24 px-6 md:px-24 border-t border-white/5 bg-background relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-6">
            Academic Track // Timeline
          </p>
          <h2 className="font-display text-[clamp(2.2rem,8vw,4.5rem)] font-bold leading-[0.9] tracking-tighter text-foreground mb-16">
            Education{" "}
            <span className="text-accent italic font-light">Timeline.</span>
          </h2>

          <div className="relative pl-8 md:pl-12 border-l border-white/10 space-y-16 max-w-4xl">
            {/* Delhi Technological University */}
            <div className="timeline-card-anim relative group">
              <div className="absolute left-[-37px] md:left-[-53px] top-1.5 w-3 h-3 rounded-full bg-accent border-4 border-background transition-transform duration-500 group-hover:scale-150 shadow-[0_0_15px_var(--accent)]" />
              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-12">
                <span className="font-mono text-xs text-foreground/65 mt-1">
                  2023 — 2027
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Bachelor of Technology (B.Tech)
                  </h3>
                  <p className="font-body text-base text-accent mb-1">
                    Computer Science and Engineering
                  </p>
                  <p className="font-body text-sm text-foreground/75">
                    Delhi Technological University, New Delhi
                  </p>
                  <p className="font-mono text-xs text-accent mt-3">
                    CGPA: 7.7 / 10
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Certifications & Achievements Section ─── */}
      <section
        ref={certRef}
        className="py-24 px-6 md:px-24 border-t border-white/5 bg-background relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-6">
            Client Work // Freelance
          </p>
          <h2 className="font-display text-[clamp(2.2rem,8vw,4.5rem)] font-bold leading-[0.9] tracking-tighter text-foreground mb-16">
            Freelance{" "}
            <span className="text-accent italic font-light">Delivery.</span>
          </h2>

          <div className="cert-card-anim max-w-5xl p-8 md:p-12 rounded-3xl border border-white/10 bg-glass-bg backdrop-blur-xl group hover:border-accent/30 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10">
              <div>
                <span className="text-accent font-mono text-[10px] uppercase tracking-widest block mb-5">
                  2026 // NorthWind Estates
                </span>
                <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-[0.9]">
                  Freelance{" "}
                  <span className="text-accent italic font-light">
                    Full-Stack
                  </span>{" "}
                  Developer.
                </h3>
              </div>
              <div>
                <p className="font-body text-base md:text-lg text-foreground/75 leading-relaxed">
                  Built a complete real-estate website from scratch: landing
                  page, property listings, contact and lead-capture workflow,
                  Sanity CMS publishing, and automatic CRM routing for
                  enquiries. Delivered live for active client use at
                  northwindestates.com.
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {[
                    "Next.js",
                    "Sanity CMS",
                    "CRM Integration",
                    "Production Delivery",
                  ].map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[9px] tracking-wider uppercase px-3 py-2 rounded-full border border-white/10 text-foreground/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 md:py-36 px-6 md:px-24 border-t border-white/5">
        <div
          ref={ctaRef}
          className="max-w-7xl mx-auto rounded-[32px] md:rounded-[48px] overflow-hidden relative group p-8 md:p-24"
          style={{ background: "var(--charcoal)" }}
        >
          {/* Animated background decoration */}
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[100%] rounded-full bg-accent blur-[120px] transition-transform duration-1000 group-hover:scale-125" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[80%] rounded-full bg-accent-muted blur-[100px] transition-transform duration-1000 group-hover:scale-110" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
            <div>
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-accent mb-6 md:mb-8">
                Transmission // Open for collaboration
              </p>
              <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-tighter text-off-white">
                Ready to build something <br />
                <span className="text-accent italic font-light">
                  Quietly Powerful?
                </span>
              </h2>
            </div>

            <div className="flex flex-col items-start gap-6 md:gap-8">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-4 sm:gap-6 px-8 py-4 sm:px-12 sm:py-6 rounded-full bg-off-white text-charcoal font-mono font-bold text-[11px] sm:text-[12px] tracking-[0.2em] uppercase transition-all duration-500 hover:bg-accent hover:text-[#0D0D0D]"
              >
                Send a Message
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-500 group-hover:translate-x-2"
                >
                  <path
                    d="M1 7h12M9 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <div className="flex items-center gap-4 pl-4 font-mono text-[9px] tracking-[0.2em] uppercase text-off-white/70">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Q3 2026
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
