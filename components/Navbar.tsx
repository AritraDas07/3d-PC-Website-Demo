'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ${
        scrolled
          ? 'glass-panel border-b border-white/5'
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-8 h-8 border border-neon-cyan/60 rotate-45 flex items-center justify-center">
            <div className="w-3 h-3 bg-neon-cyan/80 rotate-0" />
          </div>
        </div>
        <span className="font-inter text-ice-white text-lg font-bold tracking-wider uppercase">
          PC DEMO
        </span>
      </div>

      {/* CTA Button */}
      <motion.button
        className="relative group px-5 py-2 border border-neon-cyan/40 text-neon-cyan font-jetbrains text-xs tracking-[0.2em] uppercase overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          const specSection = document.getElementById('spec-sheet');
          if (specSection) {
            specSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="relative z-10">Full Spec Sheet</span>
        <motion.div
          className="absolute inset-0 bg-neon-cyan/10"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </motion.nav>
  );
}
