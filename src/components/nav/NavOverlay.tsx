"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function GithubIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { num: "01", label: "Projects", href: "#projects" },
  { num: "02", label: "Experience", href: "#experience" },
  { num: "03", label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    Icon: GithubIcon,
    href: "https://github.com/Arshadali04",
    label: "GitHub",
  },
  {
    Icon: LinkedinIcon,
    href: "https://linkedin.com/in/arshadali4",
    label: "LinkedIn",
  },
];

interface NavOverlayProps {
  open: boolean;
  onClose: () => void;
}

const E = [0.22, 1, 0.36, 1] as const;

const overlayVariants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.7, ease: E },
  },
  exit: {
    clipPath: "inset(100% 0% 0% 0%)",
    transition: { duration: 0.55, ease: E },
  },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: E } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
};

export default function NavOverlay({ open, onClose }: NavOverlayProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstLinkRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="nav-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[200] flex flex-col bg-bg-2"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close button — mirrors menu button position */}
          <div className="flex justify-end p-6 md:p-10">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-fg focus-visible:outline-accent"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Nav list */}
          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-1 flex-col justify-center px-8 md:px-16 lg:px-24"
          >
            <ul className="space-y-2 md:space-y-4">
              {NAV_ITEMS.map(({ num, label, href }, i) => (
                <motion.li key={href} variants={itemVariants}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-baseline gap-5 py-3 transition-all",
                      "focus-visible:outline-none focus-visible:ring-0"
                    )}
                  >
                    <span className="eyebrow w-8 text-muted transition-colors group-hover:text-accent">
                      {num}
                    </span>
                    <span className="font-display text-[clamp(2.5rem,8vw,6rem)] font-bold leading-none tracking-tight text-fg transition-all group-hover:translate-x-2 group-hover:text-fg">
                      {label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Divider */}
            <div className="mt-10 h-px w-24 bg-border" />

            {/* Socials */}
            <div className="mt-8 flex flex-col gap-4">
              <span className="eyebrow text-muted">Socials</span>
              <div className="flex gap-5">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent hover:text-fg focus-visible:outline-accent"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
