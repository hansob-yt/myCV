import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { mode, themeConfig } = useTheme();
  const [pointerActive, setPointerActive] = useState(false);
  const [particleCountDisplay, setParticleCountDisplay] = useState(0);

  // Keep ref to latest themeConfig and mode
  const themeConfigRef = useRef(themeConfig);
  themeConfigRef.current = themeConfig;

  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse / Pointer coordinates in viewport
    const pointer = {
      x: -2000,
      y: -2000,
      radius: 175,
      isMoving: false,
    };

    const handlePointerMove = (e: PointerEvent | MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      pointer.x = clientX;
      pointer.y = clientY;
      pointer.isMoving = true;
      setPointerActive(true);
    };

    const handlePointerLeave = () => {
      pointer.x = -2000;
      pointer.y = -2000;
      pointer.isMoving = false;
      setPointerActive(false);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('mouseleave', handlePointerLeave);

    interface Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      size: number;
      colorIndex: number;
      density: number;
      pulseSpeed: number;
      pulseVal: number;
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      const count = Math.min(110, Math.max(65, Math.floor((width * height) / 13000)));
      setParticleCountDisplay(count);
      particles = [];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 2.2 + 1.2,
          colorIndex: i % themeConfigRef.current.particleColors.length,
          density: Math.random() * 26 + 14,
          pulseSpeed: Math.random() * 0.025 + 0.01,
          pulseVal: Math.random() * Math.PI
        });
      }
    };

    initParticles();

    // High-Performance Animation Loop (No heavy shadowBlur per particle)
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const currentConfig = themeConfigRef.current;
      const isDayMode = modeRef.current === 'light';
      const palette = currentConfig.particleColors;

      // 1. Hardware Accelerated Canvas Ambient Aurora Glows (100x faster than DOM filter:blur(150px))
      const grad1 = ctx.createRadialGradient(width * 0.15, height * 0.15, 0, width * 0.15, height * 0.15, Math.min(width, height) * 0.45);
      grad1.addColorStop(0, isDayMode ? 'rgba(56, 189, 248, 0.18)' : `${currentConfig.primaryGlow}25`);
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.85, height * 0.55, 0, width * 0.85, height * 0.55, Math.min(width, height) * 0.5);
      grad2.addColorStop(0, isDayMode ? 'rgba(99, 102, 241, 0.14)' : `${currentConfig.secondaryGlow}20`);
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Cursor Energy Glow Halo
      if (pointer.x > 0 && pointer.y > 0) {
        const haloGradient = ctx.createRadialGradient(
          pointer.x, pointer.y, 0,
          pointer.x, pointer.y, pointer.radius
        );

        if (isDayMode) {
          haloGradient.addColorStop(0, 'rgba(2, 132, 199, 0.14)');
          haloGradient.addColorStop(0.6, 'rgba(79, 70, 229, 0.05)');
          haloGradient.addColorStop(1, 'transparent');
        } else {
          haloGradient.addColorStop(0, `${currentConfig.accentColor}30`);
          haloGradient.addColorStop(0.6, `${currentConfig.secondaryGlow}12`);
          haloGradient.addColorStop(1, 'transparent');
        }

        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, pointer.radius, 0, Math.PI * 2);
        ctx.fillStyle = haloGradient;
        ctx.fill();
      }

      // 3. Constellation Connections (Optimized batching)
      const maxDist = 100;
      const maxDistSq = maxDist * maxDist;

      for (let a = 0; a < particles.length; a++) {
        const pa = particles[a];

        for (let b = a + 1; b < particles.length; b++) {
          const pb = particles[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDist) * (isDayMode ? 0.25 : 0.28);
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = isDayMode ? `rgba(2, 132, 199, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Pointer Laser Lines
        if (pointer.x > 0 && pointer.y > 0) {
          const mdx = pointer.x - pa.x;
          const mdy = pointer.y - pa.y;
          const mouseDistSq = mdx * mdx + mdy * mdy;
          const pointerRadiusSq = pointer.radius * pointer.radius;

          if (mouseDistSq < pointerRadiusSq) {
            const mouseDist = Math.sqrt(mouseDistSq);
            const lineAlpha = (1 - mouseDist / pointer.radius) * 0.65;
            const colorItem = palette[pa.colorIndex % palette.length];
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(pa.x, pa.y);
            ctx.strokeStyle = isDayMode 
              ? `rgba(2, 132, 199, ${lineAlpha})` 
              : colorItem.glow.replace('0.8', String(lineAlpha)).replace('0.7', String(lineAlpha));
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // 4. Update & Render Particle Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulseVal += p.pulseSpeed;
        const pulseFactor = Math.sin(p.pulseVal) * 0.3 + 1;

        // Pointer Repulsion Physics
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < pointer.radius && distance > 0) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = pointer.radius;
          const force = (maxDistance - distance) / maxDistance;
          p.x -= forceDirectionX * force * p.density * 0.7;
          p.y -= forceDirectionY * force * p.density * 0.7;
        } else {
          // Smooth return toward equilibrium
          if (p.x !== p.originX) {
            p.x += (p.originX - p.x) * 0.022;
          }
          if (p.y !== p.originY) {
            p.y += (p.originY - p.y) * 0.022;
          }
        }

        // Ambient drift
        p.x += p.vx;
        p.y += p.vy;

        // Viewport wrapping
        if (p.x < 0) { p.x = width; p.originX = width; }
        if (p.x > width) { p.x = 0; p.originX = 0; }
        if (p.y < 0) { p.y = height; p.originY = height; }
        if (p.y > height) { p.y = 0; p.originY = 0; }

        // Render Particle (Crisp circles without heavy per-node shadow blur)
        const colorItem = palette[p.colorIndex % palette.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = colorItem.color;
        ctx.fill();

        // Soft subtle glow halo rendered with radial arc instead of slow shadowBlur
        if (!isDayMode) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * pulseFactor * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${colorItem.color}25`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden ambient-background no-print transition-colors duration-300 ease-out"
      style={{ backgroundColor: themeConfig.bgColor }}
    >
      {/* High-Performance Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block absolute inset-0 will-change-transform"
      />

      {/* Floating Status / Physics HUD indicator */}
      <div className="hidden xl:flex fixed bottom-6 left-6 z-40 items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-md text-slate-600 dark:text-slate-400 select-none">
        <span className="relative flex h-2 w-2">
          <span 
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: themeConfig.accentColor }}
          />
          <span 
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: themeConfig.accentColor }}
          />
        </span>
        <span>{mode === 'light' ? '☀️ Day' : '🌙 Night'}: {themeConfig.name} ({particleCountDisplay} Nodes)</span>
        {pointerActive && <span style={{ color: themeConfig.accentColor }}>• Pointer Active</span>}
      </div>
    </div>
  );
};
