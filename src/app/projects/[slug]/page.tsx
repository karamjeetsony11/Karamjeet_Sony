"use client";

import { useEffect, useRef, use } from "react";
import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Title Animation
      const titleChars = headerRef.current?.querySelectorAll(".char");
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            stagger: 0.03,
            ease: "power4.out",
            delay: 0.2,
          },
        );
      }

      // Hero Elements Reveal
      gsap.fromTo(
        ".hero-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.8,
        },
      );

      // Section Reveals
      const sections = contentRef.current?.querySelectorAll(".detail-section");
      sections?.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            },
          },
        );
      });

      // Video Parallax
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          ease: "none",
          scrollTrigger: {
            trigger: ".video-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-charcoal pt-20">
        {/* Background Grid & Video */}
        <div className="absolute inset-0 z-0 opacity-20 video-container flex items-center justify-center">
          {project.videoUrl ? (
            <video
              ref={videoRef}
              src={project.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${project.gradient}`}
            />
          )}
        </div>

        {/* Ambient Glow */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(13,13,13,0.8) 100%)`,
          }}
        />

        <div
          className="container mx-auto px-6 md:px-12 relative z-20"
          ref={headerRef}
        >
          <div className="hero-element mb-4 md:mb-6 inline-block">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-amber py-1.5 px-3.5 rounded-full border border-amber/30 bg-amber/5">
              Project Archive · {project.year}
            </span>
          </div>

          <h1
            className="font-display font-bold leading-[0.88] tracking-tighter mb-6 md:mb-8"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 8rem)",
              color: "var(--off-white)",
            }}
          >
            {project.title.split("").map((c, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{ opacity: 0 }}
              >
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </h1>

          <p className="hero-element font-body text-lg md:text-3xl font-light max-w-3xl leading-relaxed text-off-white/60 mb-8 md:mb-12">
            {project.subtitle}
          </p>

          <div className="hero-element flex flex-wrap gap-6 sm:gap-12">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-off-white/40">
                Role
              </span>
              <span className="font-body text-base md:text-lg text-off-white">
                Full Stack Development
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-off-white/40">
                Duration
              </span>
              <span className="font-body text-base md:text-lg text-off-white">
                4 Months
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-off-white/40">
                Launch
              </span>
              <span className="font-body text-base md:text-lg text-off-white">
                {project.year}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hero-element">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-off-white/30">
            explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-amber to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section className="py-20 md:py-32 px-6 md:px-12" ref={contentRef}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24">
          {/* Left Side: Descriptions */}
          <div className="space-y-16 md:space-y-24">
            <div className="detail-section">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber mb-6 md:mb-8">
                The Story
              </p>
              <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl mb-6 md:mb-8 leading-tight text-foreground">
                Solving a real problem <br />
                <span className="italic text-accent">
                  with a useful product.
                </span>
              </h2>
              <ul className="space-y-5 pl-5 list-disc marker:text-accent text-lg font-light leading-relaxed text-foreground/75">
                {project.longDescription.split(". ").map((para, i) => (
                  <li key={i}>{para}.</li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber mb-6 md:mb-8">
                Engineering Focus
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <div className="p-6 sm:p-10 rounded-3xl border border-border-subtle bg-glass-bg">
                  <span className="font-syne font-black text-3xl sm:text-4xl text-amber block mb-2 sm:mb-4">
                    Safe
                  </span>
                  <p className="font-body text-xs sm:text-sm text-ink-light">
                    Clear system boundaries, careful persistence, and reliable
                    state transitions.
                  </p>
                </div>
                <div className="p-6 sm:p-10 rounded-3xl border border-border-subtle bg-glass-bg">
                  <span className="font-syne font-black text-3xl sm:text-4xl text-amber block mb-2 sm:mb-4">
                    Built
                  </span>
                  <p className="font-body text-xs sm:text-sm text-ink-light">
                    For real teams: practical APIs, usable interfaces, and
                    maintainable deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Meta & Sidebar */}
          <div className="space-y-16 sticky top-32 h-fit">
            <div className="detail-section">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber mb-8">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs tracking-wider px-5 py-2 rounded-xl border border-border-subtle bg-glass-bg text-foreground shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-section p-6 sm:p-10 rounded-3xl bg-charcoal text-off-white">
              <h3 className="font-display font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-amber">
                Ready to see it live?
              </h3>
              <p className="text-xs sm:text-sm font-light mb-6 sm:mb-8 text-off-white/60 leading-relaxed">
                Experience the project in its natural habitat. Check out the
                live deployment or the source code on GitHub.
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href={`https://${project.slug}.akarta.tech`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-4 rounded-full bg-amber text-[#0D0D0D] font-mono font-bold text-xs tracking-widest uppercase transition-transform hover:scale-[1.02]"
                >
                  Live Preview
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h12M9 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <Link
                  href="/projects"
                  className="flex items-center justify-center gap-3 py-4 rounded-full border border-off-white/10 font-mono text-xs tracking-widest uppercase transition-colors hover:bg-off-white/5"
                >
                  Back to Archive
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT PROJECT BANNER ── */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-bone/20 border-t border-charcoal/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber mb-6 md:mb-8">
            Next up
          </p>
          <Link href="/projects" className="group">
            <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-8xl leading-none mb-8 md:mb-12 tracking-tighter transition-all group-hover:italic group-hover:text-amber">
              View All <br />
              Archive
            </h2>
          </Link>
          <div className="flex justify-center items-center gap-6">
            <div className="h-px w-20 bg-charcoal/10" />
            <Link
              href="/"
              className="font-mono text-xs tracking-widest uppercase hover:text-amber transition-colors"
            >
              Home
            </Link>
            <div className="h-px w-20 bg-charcoal/10" />
          </div>
        </div>
      </section>
    </main>
  );
}
