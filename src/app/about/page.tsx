"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.fromTo(
        ".about-hero-text",
        { y: 100, rotateX: -30, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "expo.out",
          delay: 0.2,
        },
      );

      // Section reveals
      const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          },
        );
      });

      // Tech stack stagger
      gsap.fromTo(
        ".tech-pill",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 85%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const techStack = [
    "React",
    "Next.js",
    "TypeScript",
    "GSAP",
    "TailwindCSS",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Rust",
    "Go",
    "Gin",
    "Redis",
    "MongoDB",
    "Next.js",
    "Node.js",
    "Python",
  ];

  return (
    <main ref={containerRef} className="bg-background pt-28 md:pt-32 lg:pt-48">
      {/* ─── Hero Section ─── */}
      <section className="px-6 md:px-24 mb-24 md:mb-48">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-6 md:mb-8 about-hero-text">
            System Origin // Karamjeet Sony
          </p>
          <h1 className="font-display text-[clamp(2.5rem,10vw,8rem)] font-bold leading-[0.85] tracking-tighter text-foreground perspective-1000">
            <span className="block about-hero-text">Products for</span>
            <span className="block about-hero-text text-accent italic font-light">
              Real Problems.
            </span>
          </h1>
        </div>
      </section>

      {/* ─── Story Section ─── */}
      <section className="px-6 md:px-24 mb-32 md:mb-64 reveal-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="sticky top-48">
            <div className="w-12 h-px bg-accent mb-8 md:mb-12" />
            <h2 className="font-display text-2xl md:text-4xl font-bold italic text-foreground/40">
              {
                '"The work that excites me is turning a real-world problem into a product people can actually use."'
              }
            </h2>
          </div>

          <div className="space-y-12">
            <p className="font-body text-2xl font-light text-foreground/70 leading-relaxed">
              I am a Full Stack Developer and Computer Science & Engineering
              student at Delhi Technological University (2023—2027). I work
              across dependable backend systems and product-focused frontend
              development, building digital systems that are practical, fast,
              and maintainable.
            </p>
            <p className="font-body text-xl font-light text-foreground/50 leading-relaxed">
              From high-concurrency purchase flows to OpenAPI-based mock
              platforms and conversational AI, I specialize in Go, Rust,
              JavaScript, Node.js, and modern web tooling. I am most interested
              in products that remove friction from a real person or team&apos;s
              day.
            </p>
            <div className="grid grid-cols-2 gap-12 pt-12">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-4">
                  Focus
                </p>
                <p className="font-display text-2xl md:text-3xl font-bold">
                  Full Stack & DSA
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-4">
                  DTU CSE
                </p>
                <p className="font-display text-2xl md:text-3xl font-bold">
                  Class of 2027
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tech Stack Section ─── */}
      <section className="px-6 md:px-24 mb-32 md:mb-64 reveal-section">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-16">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
              The Toolkit
            </p>
            <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight">
              Diagnostic // Stack
            </h2>
          </div>

          <div className="tech-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech}
                className="tech-pill p-6 rounded-2xl border border-white/5 bg-glass-bg backdrop-blur-xl group hover:border-accent/30 transition-all duration-500"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/40 group-hover:text-accent transition-colors">
                  {tech}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Philosophy Section ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background text-foreground">
        <div className="absolute inset-0 opacity-[0.03] font-display text-[40vw] font-bold pointer-events-none select-none">
          POETRY
        </div>
        <div className="relative z-10 text-center max-w-4xl px-8">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold italic leading-tight">
            {'"Build what matters.'} <br /> {'Then make it dependable."'}
          </h2>
          <div className="mt-16 w-px h-32 bg-foreground/20 mx-auto" />
        </div>
      </section>

      {/* ─── Contact Footer ─── */}
      <footer className="py-16 md:py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight">
            {"Let's"} talk about your next mission.
          </h3>
          <a
            href="/contact"
            className="px-8 py-4 sm:px-12 sm:py-6 rounded-full bg-accent text-[#0D0D0D] font-mono font-bold text-[11px] sm:text-[12px] tracking-[0.2em] uppercase hover:scale-105 transition-transform"
          >
            Get in Touch
          </a>
        </div>
      </footer>
    </main>
  );
}
