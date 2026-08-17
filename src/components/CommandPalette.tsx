"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const commandItems = [
  { label: "Go to Home", href: "/", icon: "⌂" },
  { label: "View Projects", href: "/projects", icon: "◈" },
  { label: "About Me", href: "/about", icon: "◉" },
  { label: "View Resume", href: "/resume", icon: "📄" },
  { label: "Contact Form", href: "/contact", icon: "✉" },
  { label: "Download Resume", href: "/Resume.pdf", icon: "↓" },
  { label: "GitHub", href: "https://github.com/karamjeetsony11", icon: "◎" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setQuery("");
        inputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const filtered = commandItems.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#05131e]/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -16 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-[18%] left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
          >
            <div className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.35)] border border-sky-200/15 bg-[#08202f]">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(255,255,255,0.07)]">
                <svg
                  className="w-4 h-4 text-sky-300/60 shrink-0"
                  fill="none"
                  viewBox="0 0 20 20"
                >
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
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sky-50 text-sm placeholder-sky-200/35 outline-none tracking-wide"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100/10 text-sky-100/45 border border-sky-100/10 font-mono">
                  ESC
                </kbd>
              </div>
              <ul className="py-2 max-h-72 overflow-y-auto">
                {filtered.length === 0 && (
                  <li className="px-5 py-8 text-center text-[#4a4038] text-sm">
                    No results found
                  </li>
                )}
                {filtered.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3.5 px-5 py-3 hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-150 group"
                    >
                      <span className="w-7 h-7 rounded-lg bg-[#0a2638] flex items-center justify-center text-[#38bdf8] text-sm border border-[rgba(255,255,255,0.06)] group-hover:border-[#38bdf8]/30 transition-colors">
                        {item.icon}
                      </span>
                      <span className="text-sky-50/75 text-sm tracking-wide group-hover:text-sky-50 transition-colors">
                        {item.label}
                      </span>
                      <span className="ml-auto text-[10px] text-sky-200/30 group-hover:text-sky-200/65 font-mono">
                        ↵
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="border-t border-[rgba(255,255,255,0.05)] px-5 py-2.5 flex gap-4">
                {["↑↓ navigate", "↵ open", "esc close"].map((h) => (
                  <span
                    key={h}
                    className="text-[10px] text-sky-100/30 tracking-wider font-mono"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
