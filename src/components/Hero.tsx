"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
const heading = ["KARAMJEET", "SONY"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Parallax elements
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // ─── Entry Animations ───────────────────

      // Grid reveal
      tl.fromTo(
        gridRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 0.15, scale: 1, duration: 2.5, ease: "expo.out" },
        0,
      );

      // Shape reveals
      [shape1Ref, shape2Ref, shape3Ref].forEach((ref, i) => {
        tl.fromTo(
          ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(40px)" },
          {
            opacity: 0.5,
            scale: 1,
            filter: "blur(60px)",
            duration: 2,
            ease: "power2.out",
          },
          i * 0.1,
        );
      });

      // Heading split-text-like reveal (starts immediately, very fast stagger)
      wordsRef.current.forEach((word, i) => {
        if (!word) return;
        tl.fromTo(
          word,
          {
            opacity: 0,
            y: 30,
            rotateX: -15,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          i * 0.08,
        );
      });

      // Subtitle (reveals right after the heading)
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20, filter: "blur(8px)" },
        {
          opacity: 0.6,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
        0.3,
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.5,
      );

      // ─── Scroll Parallax ───────────────────

      // Heading parallax
      gsap.to(".hero-heading", {
        y: 100,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Scroll Hint fade out
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        y: 30,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });

      // Shape parallax
      gsap.to(shape1Ref.current, {
        y: -150,
        x: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(shape2Ref.current, {
        y: 100,
        x: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(shape3Ref.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Grid parallax
      gsap.to(gridRef.current, {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-36"
    >
      {/* ── Background Elements ── */}

      {/* Mesh Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-0 will-change-transform"
        style={{
          backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black, transparent 80%)",
        }}
      />

      {/* Ambient Blobs */}
      <div
        ref={shape1Ref}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full z-0 opacity-0 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
      <div
        ref={shape2Ref}
        className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full z-0 opacity-0 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, var(--accent-muted) 0%, transparent 70%)",
        }}
      />
      <div
        ref={shape3Ref}
        className="absolute top-[20%] right-[10%] w-[25vw] h-[25vw] rounded-full z-0 opacity-0 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      {/* Cinematic Scanline */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      {/* ── Main Content ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 text-center perspective-1000">
        {/* Eyebrow */}
        <div className="overflow-hidden mb-6">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent animate-pulse">
            FULL-STACK DEVELOPER • SYSTEMS ENGINEER
          </p>
        </div>

        {/* Heading */}
        {/* Heading */}
        <h1 className="hero-heading font-display text-[clamp(1.8rem,6.5vw,5.5rem)] font-extrabold leading-none tracking-tight mb-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          {heading.map((word, i) => (
            <span
              key={word}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="inline-block will-change-transform"
              style={{
                color: i === 1 ? "var(--accent)" : "var(--foreground)",
                textShadow: i === 1 ? "0 0 45px var(--accent-muted)" : "none",
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-base md:text-xl font-light text-foreground max-w-2xl mx-auto leading-relaxed opacity-0 mb-12"
          style={{ letterSpacing: "-0.01em" }}
        >
          I build products around real-world problems—the kind of work that
          makes everyday systems simpler, faster, and genuinely useful. B.Tech
          Computer Science & Engineering student at{" "}
          <span className="text-foreground font-medium">
            Delhi Technological University
          </span>
          .
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 opacity-0"
        >
          <Link
            href="/projects"
            className="group relative px-6 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
          >
            <div className="absolute inset-0 bg-accent transition-transform duration-500 group-hover:scale-110" />
            <span className="relative z-10 font-mono font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#0D0D0D] flex items-center gap-2 sm:gap-3">
              Explore Projects
              <svg
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  d="M1 7h12M9 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="/about"
            className="group font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors py-3 sm:py-4"
          >
            Read the story
            <div className="h-px w-0 group-hover:w-full bg-accent transition-all duration-500 mt-1" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollHintRef}
        className="scroll-hint absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase opacity-40">
          Scroll to explore
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-accent animate-scrollLine" />
        </div>
      </div>
    </section>
  );
}
