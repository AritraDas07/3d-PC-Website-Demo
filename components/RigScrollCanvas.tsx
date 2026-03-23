'use client';

import { MotionValue, useMotionValueEvent } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function RigScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Build the filename from a 1-indexed frame number
  // Files are named: ezgif-frame-001.jpg ... ezgif-frame-240.jpg
  const getFramePath = useCallback(
    (index: number) => {
      const num = String(index + 1).padStart(3, '0');
      return `${imageFolderPath}/ezgif-frame-${num}.jpg`;
    },
    [imageFolderPath]
  );

  // Draw a single frame onto the canvas with object-fit: contain logic
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[frameIndex];

    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Only resize the canvas buffer if dimensions changed
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Object-fit: contain math
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (imgAspect > canvasAspect) {
      // Image is wider relative to canvas
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgAspect;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      // Image is taller relative to canvas
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgAspect;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Preload all images
  useEffect(() => {
    let mounted = true;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(totalFrames);

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          if (!mounted) return;
          images[index] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
          resolve();
        };
        img.onerror = () => {
          // Still count it so progress completes
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
          resolve();
        };
      });
    };

    // Load in batches for better performance
    const loadBatch = async (startIdx: number, batchSize: number) => {
      const promises: Promise<void>[] = [];
      for (let i = startIdx; i < Math.min(startIdx + batchSize, totalFrames); i++) {
        promises.push(loadImage(i));
      }
      await Promise.all(promises);
    };

    const loadAll = async () => {
      // Load first frame immediately for instant display
      await loadImage(0);
      if (mounted && images[0]) {
        imagesRef.current = images;
        drawFrame(0);
      }

      // Load rest in batches of 20
      for (let i = 1; i < totalFrames; i += 20) {
        if (!mounted) break;
        await loadBatch(i, 20);
        imagesRef.current = images;
      }

      if (mounted) {
        setIsLoading(false);
        drawFrame(currentFrameRef.current);
      }
    };

    loadAll();

    return () => {
      mounted = false;
    };
  }, [totalFrames, getFramePath, drawFrame]);

  // Respond to scroll changes
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const frameIndex = Math.min(
      Math.floor(latest * (totalFrames - 1)),
      totalFrames - 1
    );

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;

      // Use rAF to avoid drawing more than once per frame
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex);
      });
    }
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-deep-space-black z-20">
          <div className="relative w-48 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-neon-cyan transition-all duration-300 ease-out rounded-full"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="mt-4 text-neon-cyan/60 font-jetbrains text-xs tracking-[0.3em] uppercase">
            Loading Sequence — {loadProgress}%
          </p>
        </div>
      )}
    </div>
  );
}
