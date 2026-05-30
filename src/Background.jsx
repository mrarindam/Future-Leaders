import { useEffect, useRef } from 'react';
import { usePerformance } from './context/PerformanceContext.jsx';

export default function Background() {
  const { performanceMode } = usePerformance();
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  // Mouse glow (runs when performanceMode changes)
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    if (performanceMode) {
      // Hide the mouse glow and do not run animation loop in Eco Mode
      glow.style.opacity = '0';
      return;
    }

    glow.style.opacity = '1';
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let gx = mouseX, gy = mouseY;
    
    const onMove = (e) => { 
      mouseX = e.clientX; 
      mouseY = e.clientY; 
    };
    document.addEventListener('mousemove', onMove);
    
    let rafId;
    const animate = () => {
      gx += (mouseX - gx) * 0.12;
      gy += (mouseY - gy) * 0.12;
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [performanceMode]);

  // Particles (simple white/cyan network particles)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let rafId;

    if (performanceMode) {
      // Clean canvas and skip particle simulation in Eco Mode
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 24000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 1 + Math.random() * 1.5,
          a: 0.15 + Math.random() * 0.35,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const linkRGB = '0, 217, 255';
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; 
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          
          if (d < 120) {
            ctx.strokeStyle = `rgba(${linkRGB}, ${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); 
            ctx.moveTo(p.x, p.y); 
            ctx.lineTo(q.x, q.y); 
            ctx.stroke();
          }
        }
        
        ctx.fillStyle = `rgba(${linkRGB}, ${p.a})`;
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); 
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, [performanceMode]);

  return (
    <>
      <div className="bg-aurora animate-aurora-optimized" />
      <div className="bg-grid animate-grid-optimized" />
      <canvas ref={canvasRef} className="bg-particles" aria-hidden="true" />
      <div ref={glowRef} className="mouse-glow" aria-hidden="true" style={{ transition: 'opacity 0.4s ease' }} />
    </>
  );
}

