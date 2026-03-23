'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Navbar from '../components/Navbar';
import RigScrollCanvas from '../components/RigScrollCanvas';
import HardwareExperience from '../components/HardwareExperience';
import ComponentGrid from '../components/ComponentGrid';
import Footer from '../components/Footer';

const TOTAL_FRAMES = 240;
const IMAGE_FOLDER = '/images/pc-exploded-sequence';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <main className="bg-deep-space-black min-h-screen">
      <Navbar />

      {/* ========== SCROLL SEQUENCE (Locked for 600vh) ========== */}
      <section ref={containerRef} className="h-[600vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* z-0: Canvas Background */}
          <RigScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={TOTAL_FRAMES}
            imageFolderPath={IMAGE_FOLDER}
          />

          {/* z-10: HUD Overlay */}
          <HardwareExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* ========== REST OF SITE (Scrolls naturally after sequence) ========== */}
      <div className="relative z-20 bg-deep-space-black">
        <ComponentGrid />
        <Footer />
      </div>
    </main>
  );
}
