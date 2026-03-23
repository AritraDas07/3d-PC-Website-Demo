'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import { componentData, ComponentSection } from '../data/componentData';

interface Props {
  scrollYProgress: MotionValue<number>;
}

function SpecTable({ specs }: { specs?: { label: string; value: string }[] }) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="mt-6 space-y-2">
      {specs.map((spec, i) => (
        <motion.div
          key={spec.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          className="flex items-center justify-between gap-4 border-b border-white/5 pb-2"
        >
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/30 font-jetbrains">
            {spec.label}
          </span>
          <span className="text-xs md:text-sm text-neon-cyan font-jetbrains tracking-wider">
            {spec.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}



/* ── Tech corner brackets for that HUD aesthetic ── */
function TechCorners() {
  const cornerStyle = 'absolute w-5 h-5 border-neon-cyan/30';
  return (
    <>
      <div className={`${cornerStyle} top-0 left-0 border-t border-l`} />
      <div className={`${cornerStyle} top-0 right-0 border-t border-r`} />
      <div className={`${cornerStyle} bottom-0 left-0 border-b border-l`} />
      <div className={`${cornerStyle} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

/* ── Floating decorative dots that drift slowly ── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-cyan/20 rounded-full"
          style={{
            top: `${15 + i * 14}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

/* ── Scan line that sweeps across panels ── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent z-20 pointer-events-none"
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    />
  );
}

/* ── Scroll progress bar on the right edge ── */
function ScrollProgress({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 1]);

  return (
    <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center gap-3">
      {/* Track */}
      <div className="relative w-[2px] h-32 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-neon-cyan to-magenta-glow rounded-full origin-bottom"
          style={{ scaleY, opacity: glowOpacity }}
        />
      </div>
      {/* Phase markers */}
      {[0, 0.25, 0.5, 0.75, 1].map((pos) => (
        <motion.div
          key={pos}
          className="absolute w-1.5 h-1.5 rounded-full border border-white/20"
          style={{
            top: `${(1 - pos) * 100}%`,
            background: useTransform(
              scrollYProgress,
              [Math.max(0, pos - 0.05), pos],
              ['transparent', '#00f3ff']
            ),
          }}
        />
      ))}
    </div>
  );
}

/* ── Phase label shown on the left edge ── */
function PhaseLabel({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const phaseIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], [0, 1, 2, 3]);
  const labels = ['01 // OVERVIEW', '02 // COOLING', '03 // CORE', '04 // GRAPHICS'];
  
  return (
    <div className="absolute left-4 md:left-8 bottom-8 z-30 pointer-events-none">
      {labels.map((label, i) => {
        const opacity = useTransform(
          scrollYProgress,
          [i * 0.25, i * 0.25 + 0.05, (i + 1) * 0.25 - 0.05, (i + 1) * 0.25],
          [0, 1, 1, i === 3 ? 1 : 0]
        );
        return (
          <motion.span
            key={label}
            className="absolute bottom-0 left-0 text-[10px] md:text-xs tracking-[0.3em] uppercase text-neon-cyan/50 font-jetbrains whitespace-nowrap"
            style={{ opacity }}
          >
            {label}
          </motion.span>
        );
      })}
    </div>
  );
}

function HeroSection({ section }: { section: ComponentSection }) {
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Dark frosted backdrop */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.5) 50%, transparent 80%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated horizontal line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent mb-8"
        />

        {/* Subtitle with typewriter dots */}
        <motion.h3
          className="text-neon-cyan font-jetbrains text-xs md:text-sm tracking-[0.3em] uppercase mb-4 glow-text-cyan flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.span
            className="inline-block w-2 h-2 bg-neon-cyan/60 rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {section.subtitle}
          <motion.span
            className="inline-block w-2 h-2 bg-neon-cyan/60 rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.h3>

        {/* Main title with stagger */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-inter font-black text-ice-white tracking-tight leading-none mb-6"
          style={{
            textShadow:
              '0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,1)',
          }}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {section.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-white/70 text-base md:text-lg max-w-md font-jetbrains leading-relaxed"
          style={{
            textShadow: '0 0 20px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,1)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {section.description}
        </motion.p>

        {/* Decorative grid dots */}
        <motion.div
          className="mt-6 grid grid-cols-3 gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-neon-cyan/20 rounded-full"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.div>


      </div>
    </div>
  );
}

function DetailPanel({ section }: { section: ComponentSection }) {
  return (
    <motion.div
      className="p-6 md:p-10 rounded-2xl max-w-md pointer-events-auto border border-neon-cyan/20 relative overflow-hidden"
      style={{
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        background: 'rgba(5, 5, 5, 0.80)',
        boxShadow:
          '0 0 30px rgba(0, 243, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* Scan line inside panel */}
      <ScanLine />
      {/* Corner brackets */}
      <TechCorners />

      {/* Status indicator dot */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse-glow" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-neon-cyan/80 font-jetbrains">
          Component Active
        </span>
        {/* Animated line extending from dot */}
        <motion.div
          className="h-px bg-gradient-to-r from-neon-cyan/40 to-transparent flex-1"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      <h3 className="text-neon-cyan font-jetbrains text-xs md:text-sm tracking-[0.25em] uppercase mb-3">
        {section.subtitle}
      </h3>
      <h2 className="text-3xl md:text-5xl font-inter font-bold text-ice-white tracking-tight mb-4 leading-tight">
        {section.title}
      </h2>
      <p className="text-white/80 text-sm md:text-base font-jetbrains leading-relaxed">
        {section.description}
      </p>

      <SpecTable specs={section.specs} />

      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
    </motion.div>
  );
}

export default function HardwareExperience({ scrollYProgress }: Props) {
  // Phase 1: Hero — 0% to 25%
  const opacityHero = useTransform(scrollYProgress, [0, 0.18, 0.25], [1, 1, 0]);
  const yHero = useTransform(scrollYProgress, [0, 0.25], [0, -60]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

  // Phase 2: Cooling — 25% to 50%
  const opacityCooling = useTransform(scrollYProgress, [0.2, 0.27, 0.43, 0.5], [0, 1, 1, 0]);
  const yCooling = useTransform(scrollYProgress, [0.2, 0.27, 0.43, 0.5], [40, 0, 0, -40]);

  // Phase 3: Core — 50% to 75%
  const opacityCore = useTransform(scrollYProgress, [0.45, 0.52, 0.68, 0.75], [0, 1, 1, 0]);
  const yCore = useTransform(scrollYProgress, [0.45, 0.52, 0.68, 0.75], [40, 0, 0, -40]);

  // Phase 4: GPU — 75% to 100%
  const opacityGpu = useTransform(scrollYProgress, [0.7, 0.77, 1], [0, 1, 1]);
  const yGpu = useTransform(scrollYProgress, [0.7, 0.77], [40, 0]);

  const opacities = [opacityHero, opacityCooling, opacityCore, opacityGpu];
  const ys = [yHero, yCooling, yCore, yGpu];
  const scales = [scaleHero, undefined, undefined, undefined];

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6 md:p-16 lg:p-24 z-10">
      {/* Persistent vignette overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.6) 100%)',
        }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Scroll progress bar */}
      <ScrollProgress scrollYProgress={scrollYProgress} />

      {/* Phase label */}
      <PhaseLabel scrollYProgress={scrollYProgress} />

      {componentData.map((section, index) => {
        let alignmentClasses = 'items-center text-center justify-center';
        if (section.align === 'left')
          alignmentClasses =
            'items-start text-left justify-center md:pl-8 lg:pl-16';
        if (section.align === 'right')
          alignmentClasses =
            'items-end text-right justify-center md:pr-8 lg:pr-16';
        if (section.align === 'bottom')
          alignmentClasses =
            'items-center text-center justify-end pb-24 md:pb-32';

        const isHero = section.id === 'hero';

        return (
          <motion.div
            key={section.id}
            style={{
              opacity: opacities[index],
              y: ys[index],
              scale: scales[index],
            }}
            className={`absolute inset-0 flex flex-col ${alignmentClasses} z-10`}
          >
            {isHero ? (
              <HeroSection section={section} />
            ) : (
              <DetailPanel section={section} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
