"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { projects } from "@/lib/projects";
import Link from "next/link";

export default function ProjectsPage() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.fromTo(
        ".projects-hero-text",
        { y: 60, opacity: 0, rotateX: -20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          delay: 0.2,
        },
      );

      // List reveal
      gsap.fromTo(
        ".project-row",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-background pt-28 md:pt-32 lg:pt-48 pb-32 md:pb-64">
      {/* ─── Hero Section ─── */}
      <section className="px-6 md:px-24 mb-16 md:mb-32">
        <div className="max-w-7xl mx-auto">
          <p className="projects-hero-text font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-6 md:mb-8">
            Case Studies // Index
          </p>
          <h1 className="font-display text-[clamp(2.5rem,12vw,9rem)] font-bold leading-[0.85] tracking-tighter text-foreground perspective-1000">
            <span className="block projects-hero-text">Products for</span>
            <span className="block projects-hero-text text-accent italic font-light">
              Real Problems.
            </span>
          </h1>
        </div>
      </section>

      {/* ─── Projects List ─── */}
      <section ref={listRef} className="px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 border-t border-white/10">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="project-row group relative grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-8 items-center py-10 md:py-16 border-b border-white/5"
              >
                {/* Background Hover Effect */}
                <div className="absolute inset-0 bg-accent translate-y-[101%] transition-transform duration-500 group-hover:translate-y-0" />

                {/* Index */}
                <div className="relative z-10 font-display text-4xl font-thin opacity-45 group-hover:opacity-100 group-hover:text-[#0D0D0D] transition-all duration-500 md:group-hover:translate-x-4 will-change-transform">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Info */}
                <div className="relative z-10 transition-transform duration-500 md:group-hover:translate-x-4 will-change-transform">
                  <div className="flex items-center gap-4 mb-2">
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent group-hover:text-[#0D0D0D]/75 transition-colors">
                      {project.year}
                    </p>
                    <span className="w-1 h-1 rounded-full bg-accent group-hover:bg-[#0D0D0D]/40" />
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-foreground/65 group-hover:text-[#0D0D0D]/70 transition-colors">
                      {project.tags.slice(0, 3).join(" • ")}
                    </p>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-6xl font-bold tracking-tight text-foreground group-hover:text-[#0D0D0D] transition-colors">
                    {project.title}
                  </h2>
                </div>

                {/* Arrow */}
                <div className="relative z-10 hidden md:flex w-16 h-16 rounded-full border border-white/10 items-center justify-center group-hover:border-[#0D0D0D]/20 group-hover:rotate-45 transition-all duration-700 md:group-hover:-translate-x-4 will-change-transform">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-foreground group-hover:text-[#0D0D0D] transition-colors"
                  >
                    <path
                      d="M1 7h12M9 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer Accent ─── */}
      <section className="mt-32 md:mt-64 px-6 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-foreground/50">
          End of Archive // More coming soon
        </p>
        <div className="mt-8 md:mt-12 w-px h-16 md:h-24 bg-gradient-to-b from-foreground/30 to-transparent mx-auto" />
      </section>
    </main>
  );
}
