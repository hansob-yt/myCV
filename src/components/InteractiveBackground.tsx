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
      const count = Math.min(130, Math.max(75, Math.floor((width * height) / 11000)));
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
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 1.2,
          colorIndex: i % themeConfigRef.current.particleColors.length,
          density: Math.random() * 28 + 14,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          pulseVal: Math.random() * Math.PI
        });
      }
    };

    initParticles();

    // Physics Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const currentConfig = themeConfigRef.current;
      const isDayMode = modeRef.current === 'light';
      const palette = currentConfig.particleColors;

      // Draw Cursor Energy Glow Halo
      if (pointer.x > 0 && pointer.y > 0) {
        const haloGradient = ctx.createRadialGradient(
          pointer.x, pointer.y, 0,
          pointer.x, pointer.y, pointer.radius
        );

        if (isDayMode) {
          haloGradient.addColorStop(0, 'rgba(2, 132, 199, 0.15)');
          haloGradient.addColorStop(0.5, 'rgba(79, 70, 229, 0.08)');
          haloGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          haloGradient.addColorStop(0, `${currentConfig.accentColor}33`);
          haloGradient.addColorStop(0.5, `${currentConfig.secondaryGlow}15`);
          haloGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, pointer.radius, 0, Math.PI * 2);
        ctx.fillStyle = haloGradient;
        ctx.fill();
      }

      // Draw Constellation Connections between nearby particles
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 110;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDayMode ? 0.28 : 0.32);
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            
            if (isDayMode) {
              ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
              ctx.lineWidth = 1.0;
            } else {
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.lineWidth = 0.9;
            }

            ctx.stroke();
          }
        }

        // Draw Interactive Laser Lines from Pointer to Nearby Particles
        if (pointer.x > 0 && pointer.y > 0) {
          const mdx = pointer.x - particles[a].x;
          const mdy = pointer.y - particles[a].y;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mouseDist < pointer.radius) {
            const lineAlpha = (1 - mouseDist / pointer.radius) * (isDayMode ? 0.7 : 0.6);
            const colorItem = palette[particles[a].colorIndex % palette.length];
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(particles[a].x, particles[a].y);
            ctx.strokeStyle = colorItem.glow.replace('0.8', String(lineAlpha)).replace('0.7', String(lineAlpha)).replace('0.6', String(lineAlpha));
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        }
      }

      // Update & Render Each Particle
      particles.forEach((p) => {
        p.pulseVal += p.pulseSpeed;
        const pulseFactor = Math.sin(p.pulseVal) * 0.35 + 1;

        // Pointer Repulsion Physics
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < pointer.radius && distance > 0) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = pointer.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * p.density * 0.75;
          const directionY = forceDirectionY * force * p.density * 0.75;

          // Push AWAY from pointer
          p.x -= directionX;
          p.y -= directionY;
        } else {
          // Smooth return toward natural equilibrium
          if (p.x !== p.originX) {
            const homeDx = p.originX - p.x;
            p.x += homeDx * 0.022;
          }
          if (p.y !== p.originY) {
            const homeDy = p.originY - p.y;
            p.y += homeDy * 0.022;
          }
        }

        // Constant gentle ambient drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges smoothly
        if (p.x < 0) { p.x = width; p.originX = width; }
        if (p.x > width) { p.x = 0; p.originX = 0; }
        if (p.y < 0) { p.y = height; p.originY = height; }
        if (p.y > height) { p.y = 0; p.originY = 0; }

        // Render Particle Node
        const colorItem = palette[p.colorIndex % palette.length];
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = colorItem.color;

        if (!isDayMode) {
          ctx.shadowBlur = 9;
          ctx.shadowColor = colorItem.glow;
        } else {
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        }

        ctx.fill();
        ctx.restore();
      });

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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden ambient-background no-print transition-colors duration-700 ease-out"
      style={{ backgroundColor: themeConfig.bgColor }}
    >
      
      {/* High-Performance Persistent Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block absolute inset-0"
      />

      {/* Dynamic ambient glowing aurora flares */}
      <div 
        className="absolute top-[8%] left-[8%] w-[580px] h-[580px] rounded-full blur-[150px] opacity-40 dark:opacity-30 transition-all duration-1000 ease-out pointer-events-none"
        style={{ backgroundColor: themeConfig.primaryGlow }}
      />
      <div 
        className="absolute top-[45%] right-[5%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-35 dark:opacity-25 transition-all duration-1000 ease-out pointer-events-none"
        style={{ backgroundColor: themeConfig.secondaryGlow }}
      />
      <div 
        className="absolute bottom-[10%] left-[20%] w-[520px] h-[520px] rounded-full blur-[140px] opacity-35 dark:opacity-25 transition-all duration-1000 ease-out pointer-events-none"
        style={{ backgroundColor: themeConfig.tertiaryGlow }}
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
