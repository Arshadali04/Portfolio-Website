"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

const Preloader = dynamic(() => import("@/components/preloader/Preloader"), {
  ssr: false,
});
import Hero from "@/components/hero/Hero";
import Philosophy from "@/components/philosophy/Philosophy";
import Projects from "@/components/projects/Projects";
import Experience from "@/components/experience/Experience";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreloadComplete = () => {
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {loading && (
          <Preloader key="preloader" onComplete={handlePreloadComplete} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <main>
          <Hero />
          <Philosophy />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
