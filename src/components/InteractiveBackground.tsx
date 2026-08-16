import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes definition
    const particleCount = Math.min(45, Math.floor(width / 30));
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      baseY: number;
      color: string;
    }> = [];

    const colorsDark = ['#38bdf8', '#818cf8', '#34d399', '#a855f7'];
    const colorsLight = ['#0284c7', '#6366f1', '#059669', '#9333ea'];

    const colors = theme === 'dark' ? colorsDark : colorsLight;

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseY: y,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = (particles[i].y - (scrollY * 0.15) % height) - (particles[j].y - (scrollY * 0.15) % height);
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, (particles[i].y - (scrollY * 0.15) % height + height) % height);
            ctx.lineTo(particles[j].x, (particles[j].y - (scrollY * 0.15) % height + height) % height);
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(56, 189, 248, ${0.12 * (1 - dist / 120)})` 
              : `rgba(2, 132, 199, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const effectiveY = ((p.y - (scrollY * 0.2)) % height + height) % height;

        ctx.beginPath();
        ctx.arc(p.x, effectiveY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = theme === 'dark' ? 0.45 : 0.25;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden ambient-background no-print">
      {/* Background canvas for smooth interactive parallax particles */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating subtle ambient gradients that adapt to scroll */}
      <div 
        className="absolute top-10 left-10 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[120px] transition-transform duration-700 ease-out"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />
      <div 
        className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-indigo-500/10 dark:bg-indigo-600/12 rounded-full blur-[130px] transition-transform duration-700 ease-out"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />
      <div 
        className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-purple-500/8 dark:bg-purple-600/10 rounded-full blur-[140px]"
      />
    </div>
  );
};
