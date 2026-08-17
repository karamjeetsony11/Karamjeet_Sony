"use client";

import Link from "next/link";

const MARQUEE =
  "Karamjeet Sony · FULL STACK DEVELOPER · OPEN TO FREELANCE · INDIA · ";

const socials = [
  { label: "GitHub", href: "https://github.com/karamjeetsony11", icon: "↗" },
  { label: "Contact", href: "/contact", icon: "→" },
];

const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/5 pt-20">
      {/* Marquee */}
      <div className="overflow-hidden border-b border-white/5 py-4 mb-20">
        <div className="marquee-track flex whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="font-syne font-black text-xs tracking-[0.4em] uppercase text-amber/20 px-10"
            >
              {MARQUEE}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          {/* CTA */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber mb-6">
              {"Let's build together"}
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl leading-[0.9] tracking-tighter text-off-white mb-10">
              Got a project <br />
              in mind? <span className="text-amber italic">Talk to me.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-amber text-[#0D0D0D] font-mono font-bold text-sm tracking-widest uppercase transition-transform hover:scale-105 active:scale-95 shadow-2xl shadow-amber/20"
            >
              Start a project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M9 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-10 md:justify-items-end">
            <div>
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-off-white/30 mb-8">
                Navigation
              </p>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-display font-bold text-xl text-off-white/60 hover:text-amber transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-off-white/30 mb-8">
                Socials
              </p>
              <ul className="space-y-4">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="font-mono text-xs tracking-widest uppercase text-off-white/40 hover:text-amber transition-colors flex items-center gap-2"
                    >
                      {social.label} {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-syne font-bold text-xs text-amber">
              K
            </div>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-off-white/20">
              © 2026 Karamjeet Sony
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-off-white/20">
              Available for freelance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
