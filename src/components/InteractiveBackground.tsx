import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface InteractiveBackgroundProps {
  activeSection?: string;
}

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

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ 
  activeSection = 'bio' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const [pointerActive, setPointerActive] = useState(false);
  const [particleCountDisplay, setParticleCountDisplay] = useState(0);

  // Dynamic section color accent
  const getSectionColor = (section: string) => {
    switch (section) {
      case 'experience': return '#3b82f6';
      case 'projects': return '#10b981';
      case 'skills': return '#f59e0b';
      case 'extras': return '#a855f7';
      case 'contact': return '#06b6d4';
      default: return '#00f0ff';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates in viewport
    const pointer = {
      x: -2000,
      y: -2000,
      radius: 175,
      isMoving: false,
      lastMoveTime: 0
    };

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

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
      pointer.lastMoveTime = Date.now();
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

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.4;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    // Color palettes for particles (Bright, high-contrast Antigravity neon aesthetic)
    const darkPalette = [
      { color: '#00f0ff', glow: 'rgba(0, 240, 255, 0.8)' }, // Electric Cyan
      { color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.8)' }, // Sky Neon
      { color: '#818cf8', glow: 'rgba(129, 140, 248, 0.8)' }, // Indigo Glow
      { color: '#a855f7', glow: 'rgba(168, 85, 247, 0.8)' }, // Violet Neon
      { color: '#34d399', glow: 'rgba(52, 211, 153, 0.8)' }, // Mint Emerald
      { color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.7)' },  // Rose Cyber
    ];

    const lightPalette = [
      { color: '#0284c7', glow: 'rgba(2, 132, 199, 0.6)' },
      { color: '#4f46e5', glow: 'rgba(79, 70, 229, 0.6)' },
      { color: '#7c3aed', glow: 'rgba(124, 58, 237, 0.6)' },
      { color: '#059669', glow: 'rgba(5, 150, 105, 0.6)' },
      { color: '#e11d48', glow: 'rgba(225, 29, 72, 0.5)' }
    ];

    const palette = theme === 'dark' ? darkPalette : lightPalette;

    let particles: Particle[] = [];

    const initParticles = () => {
      // Calculate responsive particle density
      const count = Math.min(130, Math.max(70, Math.floor((width * height) / 11000)));
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
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          size: Math.random() * 2.6 + 1.2,
          color: colorObj.color,
          glowColor: colorObj.glow,
          density: Math.random() * 30 + 15,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          pulseVal: Math.random() * Math.PI
        });
      }
    };

    initParticles();

    // Physics Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen scroll velocity
      scrollVelocity *= 0.92;

      // Draw Cursor Energy Halo if active
      if (pointer.x > 0 && pointer.y > 0) {
        const haloGradient = ctx.createRadialGradient(
          pointer.x, pointer.y, 0,
          pointer.x, pointer.y, pointer.radius
        );
        haloGradient.addColorStop(0, theme === 'dark' ? 'rgba(0, 240, 255, 0.18)' : 'rgba(2, 132, 199, 0.12)');
        haloGradient.addColorStop(0.5, theme === 'dark' ? 'rgba(129, 140, 248, 0.08)' : 'rgba(99, 102, 241, 0.06)');
        haloGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, pointer.radius, 0, Math.PI * 2);
        ctx.fillStyle = haloGradient;
        ctx.fill();
      }

      // Draw Connections between nearby particles
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 110;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (theme === 'dark' ? 0.35 : 0.22);
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(56, 189, 248, ${alpha})` 
              : `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }

        // Draw Interactive Laser Lines from Cursor to Nearby Particles!
        if (pointer.x > 0 && pointer.y > 0) {
          const mdx = pointer.x - particles[a].x;
          const mdy = pointer.y - particles[a].y;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mouseDist < pointer.radius) {
            const lineAlpha = (1 - mouseDist / pointer.radius) * (theme === 'dark' ? 0.65 : 0.45);
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(particles[a].x, particles[a].y);
            ctx.strokeStyle = particles[a].glowColor.replace('0.8', String(lineAlpha));
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        }
      }

      // Update & Render Each Particle
      particles.forEach((p) => {
        // Natural Floating Oscillation
        p.pulseVal += p.pulseSpeed;
        const pulseFactor = Math.sin(p.pulseVal) * 0.4 + 1;

        // Mouse Repulsion Physics
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < pointer.radius && distance > 0) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = pointer.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * p.density * 0.8;
          const directionY = forceDirectionY * force * p.density * 0.8;

          // Push AWAY from pointer (Antigravity repulsion wave)
          p.x -= directionX;
          p.y -= directionY;
        } else {
          // Return toward natural equilibrium
          if (p.x !== p.originX) {
            const homeDx = p.originX - p.x;
            p.x += homeDx * 0.025;
          }
          if (p.y !== p.originY) {
            const homeDy = p.originY - p.y;
            p.y += homeDy * 0.025;
          }
        }

        // Scroll velocity drift influence
        p.y -= scrollVelocity * (p.density / 25);

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges smoothly
        if (p.x < 0) { p.x = width; p.originX = width; }
        if (p.x > width) { p.x = 0; p.originX = 0; }
        if (p.y < 0) { p.y = height; p.originY = height; }
        if (p.y > height) { p.y = 0; p.originY = 0; }

        // Render Particle Dot with Glowing Halo
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        if (theme === 'dark') {
          ctx.shadowBlur = 10;
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
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, activeSection]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden ambient-background no-print">
      
      {/* High-Performance Canvas for Antigravity Interactive Particles */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block absolute inset-0"
      />

      {/* Subtle Ambient Aurora Light Flares for Depth */}
      <div 
        className="absolute top-[10%] left-[10%] w-[550px] h-[550px] rounded-full blur-[140px] opacity-40 dark:opacity-30 transition-colors duration-1000 ease-out pointer-events-none"
        style={{ backgroundColor: getSectionColor(activeSection) }}
      />
      <div 
        className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-30 dark:opacity-25 transition-colors duration-1000 ease-out pointer-events-none bg-indigo-500"
      />

      {/* Floating Status / Physics pill indicator */}
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
