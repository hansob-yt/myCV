import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const [pointerActive, setPointerActive] = useState(false);
  const [particleCountDisplay, setParticleCountDisplay] = useState(0);

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

    // Unified, persistent Antigravity neon palette that remains consistent throughout the page
    const darkPalette = [
      { color: '#00f0ff', glow: 'rgba(0, 240, 255, 0.8)' },  // Electric Cyan
      { color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.8)' },  // Sky Neon
      { color: '#818cf8', glow: 'rgba(129, 140, 248, 0.8)' }, // Indigo Glow
      { color: '#a855f7', glow: 'rgba(168, 85, 247, 0.8)' },  // Violet Neon
      { color: '#34d399', glow: 'rgba(52, 211, 153, 0.8)' },  // Mint Emerald
      { color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.7)' },   // Rose Cyber
    ];

    const lightPalette = [
      { color: '#0284c7', glow: 'rgba(2, 132, 199, 0.6)' },
      { color: '#4f46e5', glow: 'rgba(79, 70, 229, 0.6)' },
      { color: '#7c3aed', glow: 'rgba(124, 58, 237, 0.6)' },
      { color: '#059669', glow: 'rgba(5, 150, 105, 0.6)' },
      { color: '#e11d48', glow: 'rgba(225, 29, 72, 0.5)' }
    ];

    const palette = theme === 'dark' ? darkPalette : lightPalette;

    interface Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      glowColor: string;
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
        const colorObj = palette[Math.floor(Math.random() * palette.length)];

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 1.2,
          color: colorObj.color,
          glowColor: colorObj.glow,
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

      // Draw Cursor Energy Glow Halo
      if (pointer.x > 0 && pointer.y > 0) {
        const haloGradient = ctx.createRadialGradient(
          pointer.x, pointer.y, 0,
          pointer.x, pointer.y, pointer.radius
        );
        haloGradient.addColorStop(0, theme === 'dark' ? 'rgba(0, 240, 255, 0.16)' : 'rgba(2, 132, 199, 0.10)');
        haloGradient.addColorStop(0.5, theme === 'dark' ? 'rgba(129, 140, 248, 0.07)' : 'rgba(99, 102, 241, 0.05)');
        haloGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

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
            const alpha = (1 - dist / maxDist) * (theme === 'dark' ? 0.32 : 0.2);
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(56, 189, 248, ${alpha})` 
              : `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw Interactive Laser Lines from Pointer to Nearby Particles
        if (pointer.x > 0 && pointer.y > 0) {
          const mdx = pointer.x - particles[a].x;
          const mdy = pointer.y - particles[a].y;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mouseDist < pointer.radius) {
            const lineAlpha = (1 - mouseDist / pointer.radius) * (theme === 'dark' ? 0.6 : 0.4);
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(particles[a].x, particles[a].y);
            ctx.strokeStyle = particles[a].glowColor.replace('0.8', String(lineAlpha));
            ctx.lineWidth = 1.3;
            ctx.stroke();
          }
        }
      }

      // Update & Render Each Particle
      particles.forEach((p) => {
        // Natural Floating Oscillation
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

        // Render Glowing Particle Node
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        if (theme === 'dark') {
          ctx.shadowBlur = 9;
          ctx.shadowColor = p.glowColor;
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
  }, [theme]); // Strictly depends only on theme; never resets or reacts to scroll

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden ambient-background no-print">
      
      {/* High-Performance Persistent Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block absolute inset-0"
      />

      {/* Consistent, persistent ambient glowing aurora flares */}
      <div 
        className="absolute top-[8%] left-[8%] w-[580px] h-[580px] rounded-full blur-[150px] opacity-35 dark:opacity-25 pointer-events-none bg-sky-500"
      />
      <div 
        className="absolute top-[45%] right-[5%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-30 dark:opacity-20 pointer-events-none bg-indigo-600"
      />
      <div 
        className="absolute bottom-[10%] left-[20%] w-[520px] h-[520px] rounded-full blur-[140px] opacity-30 dark:opacity-20 pointer-events-none bg-purple-600"
      />

      {/* Floating Status / Physics HUD indicator */}
      <div className="hidden xl:flex fixed bottom-6 left-6 z-40 items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-md text-slate-500 dark:text-slate-400 select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span>Antigravity Particle Mesh: {particleCountDisplay} Nodes</span>
        {pointerActive && <span className="text-cyan-500 dark:text-cyan-400">• Pointer Active</span>}
      </div>

    </div>
  );
};
