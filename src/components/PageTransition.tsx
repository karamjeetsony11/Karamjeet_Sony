"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useContext, useState } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Prevents Next.js App Router from updating the children immediately during exit animations
function FrozenRouter(props: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const [frozen] = useState(() => context);

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const variants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(12px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1], // Cinematic ease-out
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(12px)",
    transition: {
      duration: 0.8,
      ease: [0.64, 0, 0.78, 0], // Cinematic ease-in
    },
  },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="page-transition"
        style={{ minHeight: "100vh", willChange: "transform, opacity, filter" }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
