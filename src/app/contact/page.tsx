"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [clientTime, setClientTime] = useState("");

  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal header components
      gsap.fromTo(
        ".contact-reveal",
        { y: 80, rotateX: -20, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "expo.out",
          delay: 0.2,
        },
      );

      // Reveal form and cards
      gsap.fromTo(
        ".contact-fade-in",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          delay: 0.4,
        },
      );
    }, containerRef);

    // Initialize clock to avoid hydration error
    const tick = () => {
      const now = new Date();
      setClientTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    tick();
    const interval = setInterval(tick, 1000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setErrorMessage("All transmission coordinates are required.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        // Clear form
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMessage(
          data.error || "Transmission encountered an anomaly. Please retry.",
        );
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Connection link severed. Unable to transmit signal.");
      setStatus("error");
    }
  };

  return (
    <main
      ref={containerRef}
      className="bg-background pt-28 md:pt-32 lg:pt-48 pb-16 md:pb-32 min-h-screen relative overflow-hidden"
    >
      {/* Background visual ticks */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-24 left-12 w-px h-16 bg-foreground" />
        <div className="absolute top-36 left-8 text-[10px] font-mono tracking-widest uppercase">
          COORD // 25.5940.N
        </div>
        <div className="absolute top-[40%] right-24 w-12 h-px bg-foreground" />
        <div className="absolute bottom-24 right-12 w-px h-16 bg-foreground" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section */}
        <section className="mb-12 md:mb-20">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-4 md:mb-6 contact-reveal">
            Transmission Protocol // 005
          </p>
          <h1 className="font-display text-[clamp(2.2rem,8vw,6.5rem)] font-bold leading-[0.85] tracking-tighter text-foreground perspective-1000">
            <span className="block contact-reveal">Establish a</span>
            <span className="block contact-reveal text-accent italic font-light">
              Direct Connection.
            </span>
          </h1>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 xl:gap-24 items-start">
          {/* Left Column: Info & Diagnostic */}
          <div className="space-y-12 contact-fade-in">
            <div className="border-l border-accent/20 pl-6 space-y-6">
              <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/50">
                Core Coordinates
              </h2>
              <p className="font-body text-xl font-light text-foreground/70 leading-relaxed">
                Have a query, project scope, or general idea? Submit the
                transmission interface, and I will align coordinates to reply
                within 24 standard cycles.
              </p>
            </div>

            {/* Diagnostic Matrix Panel */}
            <div className="rounded-2xl border border-border-subtle bg-glass-bg p-6 space-y-6 font-mono text-[11px] tracking-wider text-foreground/60">
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle">
                <span className="uppercase text-foreground/30">
                  System Node
                </span>
                <span className="font-bold text-accent">Active // Ready</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle">
                <span className="uppercase text-foreground/30">
                  Direct Link
                </span>
                <span className="font-bold text-foreground">
                  Use the message form
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle">
                <span className="uppercase text-foreground/30">
                  Node Location
                </span>
                <span className="text-foreground">India // UTC+5:30</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle">
                <span className="uppercase text-foreground/30">
                  System Time
                </span>
                <span className="text-foreground font-bold">
                  {clientTime || "--:--:--"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="uppercase text-foreground/30">Encryption</span>
                <span className="text-foreground">TLS 1.3 / Secured</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="contact-fade-in relative">
            <div className="rounded-3xl border border-border-subtle bg-glass-bg p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  /* Success State Overlay */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-8"
                  >
                    <div className="w-20 h-20 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center text-emerald-500 text-3xl shadow-lg shadow-emerald-500/5">
                      ✓
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
                        Transmission Transmitted
                      </h3>
                      <p className="font-body text-sm text-foreground/60 max-w-sm mx-auto">
                        Your message has successfully bypassed network gateways
                        and reached my terminal.
                      </p>
                    </div>

                    <button
                      onClick={() => setStatus("idle")}
                      className="px-8 py-4 rounded-full border border-border-subtle hover:border-accent hover:text-accent font-mono text-[10px] tracking-widest uppercase transition-all duration-300 active:scale-95"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  /* Standard Form State */
                  <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Name input */}
                      <div className="space-y-2.5">
                        <label
                          htmlFor="name"
                          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/40"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="ABC"
                          disabled={status === "sending"}
                          className="w-full bg-background/30 border border-border-subtle rounded-xl px-5 py-4 text-sm text-foreground placeholder-foreground/20 outline-none transition-all duration-300 focus:border-accent/40 focus:ring-1 focus:ring-accent/10 disabled:opacity-50"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-2.5">
                        <label
                          htmlFor="email"
                          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/40"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="abc@example.com"
                          disabled={status === "sending"}
                          className="w-full bg-background/30 border border-border-subtle rounded-xl px-5 py-4 text-sm text-foreground placeholder-foreground/20 outline-none transition-all duration-300 focus:border-accent/40 focus:ring-1 focus:ring-accent/10 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Subject Input */}
                    <div className="space-y-2.5">
                      <label
                        htmlFor="subject"
                        className="block font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/40"
                      >
                        Subject Matter
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Collaboration opportunity / Project Inquiry"
                        disabled={status === "sending"}
                        className="w-full bg-background/30 border border-border-subtle rounded-xl px-5 py-4 text-sm text-foreground placeholder-foreground/20 outline-none transition-all duration-300 focus:border-accent/40 focus:ring-1 focus:ring-accent/10 disabled:opacity-50"
                      />
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2.5">
                      <label
                        htmlFor="message"
                        className="block font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/40"
                      >
                        Signal Body (Message)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Detail your request, project dimensions, or transmission details..."
                        disabled={status === "sending"}
                        className="w-full bg-background/30 border border-border-subtle rounded-xl px-5 py-4 text-sm text-foreground placeholder-foreground/20 outline-none transition-all duration-300 focus:border-accent/40 focus:ring-1 focus:ring-accent/10 resize-none disabled:opacity-50"
                      />
                    </div>

                    {/* Error Alerts */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 font-mono text-[11px] flex items-center gap-3"
                        >
                          <span className="text-sm">⚠</span>
                          <span>{errorMessage}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Section */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                      {/* Security verification hint */}
                      <span className="font-mono text-[9px] tracking-wider text-foreground/30 uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                        Safe encrypted transmission guaranteed
                      </span>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className={`w-full sm:w-auto min-w-[180px] group relative overflow-hidden flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4.5 rounded-2xl font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 active:scale-[0.98] ${
                          status === "sending"
                            ? "bg-foreground/5 text-foreground/40 border border-border-subtle cursor-wait"
                            : "bg-accent text-charcoal shadow-xl shadow-accent/10 hover:scale-[1.02]"
                        }`}
                      >
                        {status === "sending" ? (
                          <>
                            <span className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Transmit Signal</span>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 14 14"
                              fill="none"
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            >
                              <path
                                d="M1 7h12M9 3l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
