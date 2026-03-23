'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { specSheetData } from '../data/componentData';
import { useEffect, useState } from 'react';

/* ── Animated counter that counts up to a number ── */
function AnimatedCounter({
  target,
  suffix = '',
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration * 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      className="text-3xl md:text-5xl font-inter font-black text-ice-white"
    >
      {count.toLocaleString()}
      {suffix}
    </motion.span>
  );
}

/* ── Stats banner with animated counters ── */
function StatsBanner() {
  const stats = [
    { value: 16384, suffix: '', label: 'CUDA CORES' },
    { value: 64, suffix: 'GB', label: 'DDR5 MEMORY' },
    { value: 1200, suffix: 'W', label: 'PSU POWER' },
    { value: 360, suffix: 'mm', label: 'RADIATOR' },
  ];

  return (
    <section className="py-20 px-6 md:px-12 border-y border-white/5 relative overflow-hidden">
      {/* Background animated grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,243,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,243,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <div className="mt-2 w-8 h-px bg-neon-cyan/30 mx-auto" />
            <p className="mt-3 text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/30 font-jetbrains">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Horizontal marquee with specs ── */
function SpecMarquee() {
  const items = [
    'RTX 4090', '64GB DDR5', 'PCIe Gen 5', '360mm AIO', 'Wi-Fi 7',
    '10GbE LAN', 'Thunderbolt 4', 'NVMe Gen4', '1200W PSU', '4K Ready',
  ];

  return (
    <div className="py-6 border-y border-white/5 overflow-hidden relative">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-xs tracking-[0.3em] uppercase text-white/10 font-jetbrains flex items-center gap-4"
          >
            <span className="w-1 h-1 bg-neon-cyan/30 rounded-full" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Interactive 3D-tilt spec card ── */
function SpecCard({
  item,
  index,
}: {
  item: { category: string; spec: string };
  index: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-8 py-5 border-b border-white/5 group-hover:border-neon-cyan/20 transition-all duration-500 relative px-4 rounded-lg group-hover:bg-white/[0.02]"
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        whileHover={{ x: 8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Hover glow line on left */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-neon-cyan rounded-full"
          initial={{ scaleY: 0 }}
          whileHover={{ scaleY: 1 }}
          style={{ transformOrigin: 'top' }}
        />

        {/* Index number */}
        <span className="text-[10px] text-white/10 font-jetbrains tracking-widest min-w-[30px] group-hover:text-neon-cyan/30 transition-colors duration-500">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Category Label */}
        <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/20 font-jetbrains group-hover:text-neon-cyan/50 transition-colors duration-500 min-w-[140px]">
          {item.category}
        </span>

        {/* Dotted separator */}
        <div className="hidden sm:block flex-1 border-b border-dotted border-white/5 group-hover:border-neon-cyan/10 transition-colors duration-500" />

        {/* Spec Value */}
        <span className="text-sm md:text-base text-white/70 font-jetbrains group-hover:text-ice-white transition-colors duration-500 text-left sm:text-right">
          {item.spec}
        </span>

        {/* Arrow on hover */}
        <motion.span
          className="text-neon-cyan/0 group-hover:text-neon-cyan/60 transition-colors duration-300 text-sm"
          initial={{ x: -5, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          →
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function ComponentGrid() {
  return (
    <>
      {/* Marquee */}
      <SpecMarquee />

      {/* Stats Banner */}
      <StatsBanner />

      {/* Spec Sheet */}
      <section id="spec-sheet" className="relative py-32 px-6 md:px-12 lg:px-24">
        {/* Animated background dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-cyan/10 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Section Header */}
        <motion.div
          className="text-center mb-20 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative lines flanking the heading */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-transparent to-neon-cyan/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ transformOrigin: 'right' }}
            />
            <motion.div
              className="w-2 h-2 border border-neon-cyan/40 rotate-45"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.div
              className="h-px w-16 bg-gradient-to-l from-transparent to-neon-cyan/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-inter font-black text-ice-white tracking-tight mb-4">
            Full Specifications
          </h2>
          <p className="text-white/30 font-jetbrains text-sm md:text-base tracking-wider max-w-lg mx-auto">
            Every component meticulously selected for peak performance.
          </p>
        </motion.div>

        {/* Spec Grid */}
        <div className="max-w-4xl mx-auto space-y-0">
          {specSheetData.map((item, index) => (
            <SpecCard key={item.category} item={item} index={index} />
          ))}
        </div>

        {/* Animated Radar Ring */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Outer pulsing rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-neon-cyan/10 rounded-full"
                animate={{ scale: [1, 1.6 + i * 0.3], opacity: [0.4, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Static concentric circles */}
            <div className="absolute inset-2 border border-white/5 rounded-full" />
            <div className="absolute inset-6 border border-white/5 rounded-full" />
            <div className="absolute inset-10 border border-white/[0.03] rounded-full" />

            {/* Rotating sweep line */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute top-1/2 left-1/2 w-1/2 h-px origin-left"
                style={{
                  background: 'linear-gradient(90deg, rgba(0,243,255,0.6), transparent)',
                }}
              />
            </motion.div>

            {/* Orbiting dots */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute w-1.5 h-1.5 bg-neon-cyan rounded-full"
                style={{ boxShadow: '0 0 8px rgba(0,243,255,0.6)' }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.5,
                }}
              >
                <div
                  className="absolute"
                  style={{
                    top: '50%',
                    left: `${55 + i * 8}px`,
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: i % 2 === 0 ? '#00f3ff' : '#ff00ff',
                    boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(0,243,255,0.6)' : 'rgba(255,0,255,0.6)'}`,
                  }}
                />
              </motion.div>
            ))}

            {/* Center core */}
            <motion.div
              className="relative w-10 h-10 rounded-full border border-neon-cyan/40 flex items-center justify-center z-10"
              style={{ background: 'rgba(0,243,255,0.05)' }}
              animate={{
                boxShadow: [
                  '0 0 15px rgba(0,243,255,0.1)',
                  '0 0 30px rgba(0,243,255,0.3)',
                  '0 0 15px rgba(0,243,255,0.1)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-3 h-3 bg-neon-cyan rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Crosshair lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-x-px" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-px" />
          </div>
        </motion.div>
      </section>
    </>
  );
}
