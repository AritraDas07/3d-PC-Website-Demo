'use client';

import { motion } from 'framer-motion';

function FooterLink({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.a
      href="#"
      className="text-white/20 hover:text-neon-cyan text-xs font-jetbrains tracking-wider uppercase transition-colors duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 3 }}
    >
      {text}
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 md:px-12 overflow-hidden">
      {/* Top gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,243,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,243,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main footer content */}
        <motion.div
          className="flex flex-col md:flex-row items-start justify-between gap-12 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Logo & tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-8 h-8 border border-neon-cyan/40 rotate-45 flex items-center justify-center"
                whileHover={{ rotate: 135, borderColor: '#00f3ff' }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-3 h-3 bg-neon-cyan/60" />
              </motion.div>
              <span className="font-inter text-ice-white text-lg font-bold tracking-wider uppercase">
                PC DEMO
              </span>
            </div>
            <p className="text-white/15 font-jetbrains text-xs tracking-wider max-w-xs leading-relaxed">
              Built for creators, gamers, and those who demand the absolute best.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 md:gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.3em] uppercase text-neon-cyan/40 font-jetbrains mb-1">
                Explore
              </span>
              <FooterLink text="Overview" delay={0.1} />
              <FooterLink text="Specifications" delay={0.2} />
              <FooterLink text="Gallery" delay={0.3} />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.3em] uppercase text-neon-cyan/40 font-jetbrains mb-1">
                Support
              </span>
              <FooterLink text="Documentation" delay={0.15} />
              <FooterLink text="Warranty" delay={0.25} />
              <FooterLink text="Contact" delay={0.35} />
            </div>
          </div>
        </motion.div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-white/20 font-jetbrains text-[10px] tracking-[0.2em] uppercase">
            Designed & Engineered with Precision
          </p>

          {/* Animated dots separator */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-neon-cyan/20 rounded-full"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <p className="text-white/15 font-jetbrains text-[10px] tracking-wider">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
