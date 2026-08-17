"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";

const MotionLink = motion.create(Link);
import { useLenis } from "@/components/SmoothScrollProvider";

const CommandPalette = dynamic(() => import("./CommandPalette"), {
  ssr: false,
});

/* ─── Types ─────────────────────────────────────────── */
interface NavLink {
  href: string;
  label: string;
  sub: string;
  index: string;
}

/* ─── Data ───────────────────────────────────────────── */
const navLinks: NavLink[] = [
  { href: "/", label: "Home", sub: "Welcome", index: "01" },
  { href: "/projects", label: "Work", sub: "Portfolio", index: "02" },
  { href: "/about", label: "About", sub: "Story", index: "03" },
  { href: "/resume", label: "Resume", sub: "CV", index: "04" },
];

/* ─── Magnetic Hook ──────────────────────────────────── */
function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * strength);
      y.set((e.clientY - rect.top - rect.height / 2) * strength);
    },
    [x, y, strength],
  );
  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  return { ref, sx, sy };
}

/* ─── Main Navbar ────────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const { lenis } = useLenis();

  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  // ── Theme Sync ──
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
  }, [isDark]);

  // ── Keyboard shortcut ──
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // ── Scroll ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const docH = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── GSAP Entry ──
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -48 },
      { opacity: 1, y: 0, duration: 1.6, ease: "expo.out", delay: 0.1 },
    );
  }, []);

  // ── Magnetic CTA ──
  const {
    ref: ctaRef,
    sx: ctaSx,
    sy: ctaSy,
  } = useMagnetic<HTMLAnchorElement>(0.4);

  const light = {
    bar: "bg-background/80 border-border-subtle shadow-xl backdrop-blur-xl",
    text: "text-foreground",
    muted: "text-foreground/65",
    chip: "bg-foreground/5 border-foreground/10 text-foreground/65",
    topbar: "bg-foreground/5 border-foreground/5 text-foreground/30",
    toggle: "bg-foreground/5 border-foreground/10 text-accent",
    navPill: "bg-foreground/5",
    ctaBg: "var(--accent)",
    ctaColor: "#071824",
    ctaShadow: "0 4px 20px rgba(var(--accent-rgb), 0.25)",
  };

  const dark = {
    bar: "bg-background/90 border-border-subtle shadow-2xl backdrop-blur-xl",
    text: "text-foreground",
    muted: "text-foreground/65",
    chip: "bg-foreground/5 border-foreground/10 text-foreground/65",
    topbar: "bg-foreground/5 border-foreground/5 text-foreground/20",
    toggle: "bg-foreground/5 border-foreground/10 text-accent",
    navPill: "bg-foreground/5",
    ctaBg: "var(--accent)",
    ctaColor: "#071824",
    ctaShadow: "0 4px 20px rgba(var(--accent-rgb), 0.25)",
  };

  const t = isDark ? dark : light;

  // ── Magnetic Logo ──
  const {
    ref: logoRef,
    sx: logoSx,
    sy: logoSy,
  } = useMagnetic<HTMLDivElement>(0.2);

  return (
    <>
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
      />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ opacity: 0 }}
      >
        {/* ── Scroll progress bar ── */}
        <div
          suppressHydrationWarning
          className="absolute top-0 left-0 h-[2px] z-10 transition-all duration-100 rounded-r-full bg-gradient-to-r from-[#38bdf8] via-[#7dd3fc] to-[#bae6fd]"
          style={{
            width: `${scrollProgress}%`,
          }}
        />

        {/* ── Main Bar (Floating Glass Dock) ── */}
        <div
          suppressHydrationWarning
          className={`w-[calc(100%-2rem)] mx-auto max-w-5xl transition-all duration-500 flex items-center justify-between rounded-full border border-white/5 bg-background/60 backdrop-blur-xl relative mt-4 py-3 px-6 ${
            scrolled ? "scrolled" : ""
          } ${isDark ? "nav-dock-dark" : "nav-dock-light"}`}
        >
          {/* ── LEFT: BRAND / LOGO & HUD Clock ── */}
          <motion.div
            ref={logoRef}
            style={{ x: logoSx, y: logoSy }}
            className="flex items-center gap-3.5"
          >
            <Link
              href="/"
              aria-label="Home"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  if (lenis) lenis.scrollTo(0, { duration: 1.2 });
                  else window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center group shrink-0"
            >
              <div
                className={`relative w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-500 ${
                  isDark
                    ? "border-white/10 bg-white/5 group-hover:border-[#38bdf8]/40"
                    : "border-black/10 bg-black/5 group-hover:border-[#0a2638]/40"
                }`}
              >
                <svg
                  viewBox="0 0 32 32"
                  className="w-5 h-5 text-[#38bdf8]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  {/* Outer hexagon */}
                  <polygon
                    points="16,3 29,10 29,24 16,31 3,24 3,10"
                    strokeWidth="1"
                    stroke="rgba(125,211,252,0.35)"
                  />
                  {/* Inner stylized monogram K */}
                  <path
                    d="M 12 10 V 22 M 20 10 L 12 16 L 20 22"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </Link>

            <div className="hidden md:flex flex-col leading-tight select-none">
              <span className="font-display font-bold text-sm tracking-tight text-foreground">
                Karamjeet Sony
              </span>
              <span className="mt-0.5 font-mono text-[8px] tracking-[0.18em] uppercase text-accent">
                Full-stack engineering
              </span>
            </div>
          </motion.div>

          {/* ── CENTER: NAV LINKS ── */}
          <motion.ul
            layout
            className="hidden md:flex items-center gap-1.5 relative"
          >
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              const isHov = hoveredLink === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onMouseEnter={() => setHoveredLink(href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={(e) => {
                      if (isActive) {
                        e.preventDefault();
                        if (lenis) lenis.scrollTo(0, { duration: 1.2 });
                        else window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={`relative flex items-center px-4 py-2 rounded-xl text-[10px] font-mono font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${
                      isActive ? t.text : `${t.muted} hover:${t.text}`
                    }`}
                  >
                    <AnimatePresence>
                      {(isActive || isHov) && (
                        <motion.span
                          layoutId="navHighlight"
                          className={`absolute inset-0 rounded-xl ${t.navPill}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18 }}
                        />
                      )}
                    </AnimatePresence>
                    <span className="relative z-10">{label}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>

          {/* ── RIGHT: CTA & HAMBURGER ── */}
          <div className="flex items-center gap-4">
            {/* Custom Theme Switch Slider */}
            <div
              onClick={() => setIsDark(!isDark)}
              className={`relative w-11 h-6 rounded-full cursor-pointer flex items-center px-1 group transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border border-white/10 hover:border-[#38bdf8]/40"
                  : "bg-black/5 border border-black/10 hover:border-[#0a2638]/40"
              }`}
              role="button"
              aria-label="Toggle theme"
            >
              <motion.div
                className="w-4 h-4 rounded-full bg-[#38bdf8] flex items-center justify-center text-[7px] font-bold text-[#071824] select-none shadow-md"
                animate={{ x: isDark ? 18 : 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
              >
                {isDark ? "☾" : "☀"}
              </motion.div>
            </div>

            {/* Sleek Outlined CTA */}
            <MotionLink
              ref={ctaRef}
              href="/contact"
              className={`group relative overflow-hidden hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full border text-[10px] font-mono font-bold tracking-[0.15em] uppercase cursor-pointer transition-all duration-500 ${
                isDark
                  ? "border-[#38bdf8]/30 hover:border-[#38bdf8] bg-white/5 hover:bg-[#38bdf8] hover:text-[#071824] text-[#eff9ff]"
                  : "border-[#0a2638]/30 hover:border-[#0a2638] bg-black/5 hover:bg-[#0a2638] hover:text-[#f4fafd] text-[#0a2638]"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{
                x: ctaSx,
                y: ctaSy,
              }}
            >
              <span className="relative z-10">{"Let's Talk"}</span>
              <svg
                className="relative z-10 w-3 h-3 transition-transform duration-500 group-hover:translate-x-1"
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
            </MotionLink>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className={`md:hidden w-9 h-9 rounded-xl flex flex-col justify-center items-center gap-1.5 border transition-all duration-300 ${t.toggle}`}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={
                    menuOpen
                      ? i === 0
                        ? { rotate: 45, y: 6 }
                        : i === 1
                          ? { opacity: 0, scaleX: 0 }
                          : { rotate: -45, y: -6 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  className={`h-[1.5px] block rounded-[2px] origin-center transition-colors duration-300 ${
                    i === 1 ? "w-3" : "w-[18px]"
                  } ${isDark ? "bg-[#38bdf8]" : "bg-[#0a2638]"}`}
                />
              ))}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className={`md:hidden w-[calc(100%-2rem)] mx-auto mt-1 rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-2xl ${
                isDark
                  ? "bg-[#0f0d0b]/95 border-[rgba(255,255,255,0.07)]"
                  : "bg-[rgba(252,249,244,0.97)] border-[rgba(0,0,0,0.07)]"
              }`}
            >
              <ul className="p-3 space-y-1">
                {navLinks.map(({ href, label, sub, index }, i) => {
                  const isActive = pathname === href;
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.05 }}
                    >
                      <Link
                        href={href}
                        onClick={(e) => {
                          setMenuOpen(false);
                          if (isActive) {
                            e.preventDefault();
                            if (lenis) lenis.scrollTo(0, { duration: 1.2 });
                            else
                              window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                          isActive
                            ? isDark
                              ? "bg-[#38bdf8] text-[#071824]"
                              : "bg-[#0a2638] text-[#f4fafd]"
                            : isDark
                              ? "hover:bg-[rgba(255,255,255,0.05)] text-[#c8bfb4]"
                              : "hover:bg-[#f0ebe3] text-[#3a3530]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-[9px] font-mono text-[#38bdf8] ${isActive ? "opacity-70" : ""}`}
                          >
                            {index}
                          </span>
                          <span className="font-bold text-sm tracking-wide">
                            {label}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] tracking-[0.2em] uppercase ${isActive ? "opacity-60" : t.muted}`}
                        >
                          {sub}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div
                className={`border-t px-4 py-3 ${isDark ? "border-[rgba(255,255,255,0.05)]" : "border-[#ede7de]"}`}
              >
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setCommandOpen(true);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-colors ${
                    isDark
                      ? "hover:bg-[rgba(255,255,255,0.04)] text-[#6b5f54]"
                      : "hover:bg-[#f0ebe3] text-[#9a8f83]"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                    <circle
                      cx="9"
                      cy="9"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M14 14l3 3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="tracking-wide text-[12px] font-medium">
                    Open Command Palette
                  </span>
                  <kbd
                    className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-mono border ${isDark ? "bg-[#2a231d] border-[rgba(255,255,255,0.06)] text-[#3a3028]" : "bg-white border-[#ddd] text-[#aaa]"}`}
                  >
                    ⌘K
                  </kbd>
                </button>
              </div>

              <div
                className={`border-t px-6 py-4 flex items-center justify-between ${isDark ? "border-[rgba(255,255,255,0.05)]" : "border-[#ede7de]"}`}
              >
                <span className={`text-[11px] ${t.muted} tracking-wide`}>
                  Available for freelance work
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-600 font-bold tracking-widest uppercase">
                    Available
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
