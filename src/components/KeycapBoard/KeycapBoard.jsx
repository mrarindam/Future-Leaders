import { useEffect, useRef } from 'react';
import { usePerformance } from '../../context/PerformanceContext.jsx';

function Keycap({ char, color, initX, initY, initRotate, initScale, mousePos, setHoverState }) {
  const { performanceMode } = usePerformance();
  const ref = useRef(null);

  // Physics reference states (directly updated via requestAnimationFrame for max 60FPS speed!)
  const physics = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotate: initRotate,
    vRotate: 0,
    depth: 0,
    vDepth: 0,
    phase: Math.random() * Math.PI * 2,
    driftSpeed: 0.015 + Math.random() * 0.02,
  });

  // Size cache ref (updated on resize to eliminate getBoundingClientRect inside frames!)
  const parentSize = useRef({ width: 0, height: 0 });

  // Update parent and element dimensions on mount and resize
  useEffect(() => {
    if (performanceMode) return;

    const updateSize = () => {
      const parent = ref.current?.offsetParent;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        parentSize.current = { width: rect.width, height: rect.height };
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [performanceMode]);

  useEffect(() => {
    // Return early if in Eco Mode - completely saves 100% RAF physics thread time!
    if (performanceMode) return;

    let frameId;
    const update = () => {
      const p = physics.current;
      const el = ref.current;
      if (!el) return;

      const pWidth = parentSize.current.width || el.offsetParent?.clientWidth || 0;
      const pHeight = parentSize.current.height || el.offsetParent?.clientHeight || 0;

      if (!pWidth || !pHeight) {
        frameId = requestAnimationFrame(update);
        return;
      }

      const initialPixelX = (initX / 100) * pWidth;
      const initialPixelY = (initY / 100) * pHeight;

      // Keycap width is 88px on md devices, else 64px
      const capSize = window.innerWidth >= 768 ? 88 : 64;
      const capCenterX = p.x + capSize / 2;
      const capCenterY = p.y + capSize / 2;

      const dx = mousePos.x - capCenterX;
      const dy = mousePos.y - capCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      let forceX = 0;
      let forceY = 0;
      let targetRot = initRotate;
      let depthTarget = 0;
      const activeRadius = 220; // Expanded active zone for organic feedback
      
      if (distance < activeRadius && mousePos.active) {
        const factor = (activeRadius - distance) / activeRadius; // 0 to 1

        // Liquid push force (soft repulsion)
        const pushForce = factor * 42;
        const angle = Math.atan2(dy, dx);
        forceX = -Math.cos(angle) * pushForce;
        forceY = -Math.sin(angle) * pushForce;

        // Soft rotation offset (keys tilt toward cursor)
        targetRot = initRotate + (dx / activeRadius) * 22;

        // Compress the keys on click/hover proximity
        if (distance < 65) {
          depthTarget = 1.0; // Pressed in fully
        } else {
          depthTarget = factor * 0.75;
        }
      }
      
      // Automatically float/drift (idle organic movement)
      p.phase += p.driftSpeed;
      const driftX = Math.sin(p.phase) * 7;
      const driftY = Math.cos(p.phase * 1.3) * 7;
      const targetPixelX = initialPixelX + forceX + driftX;
      const targetPixelY = initialPixelY + forceY + driftY;
      
      // Positioning physics
      const k = 0.07;
      const d = 0.83;
      p.vx = (p.vx + (targetPixelX - p.x) * k) * d;
      p.vy = (p.vy + (targetPixelY - p.y) * k) * d;
      p.x += p.vx;
      p.y += p.vy;
      
      // Rotation physics
      const kRot = 0.04;
      const dRot = 0.82;
      p.vRotate = (p.vRotate + (targetRot - p.rotate) * kRot) * dRot;
      p.rotate += p.vRotate;
      
      // Compress/depth physics (makes it feel like mechanical keys compressing!)
      const kDepth = 0.12;
      const dDepth = 0.78;
      p.vDepth = (p.vDepth + (depthTarget - p.depth) * kDepth) * dDepth;
      p.depth += p.vDepth;
      
      // Animate translate & rotation
      el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotate}deg) scale(${initScale})`;

      // Animate top compression face
      const topFace = el.querySelector('.keycap-top');
      if (topFace) {
        // Linear isometric push
        const pressX = p.depth * 8;
        const pressY = p.depth * 8;
        topFace.style.transform = `translate(${pressX}px, ${pressY}px)`;
      }
      frameId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frameId);
  }, [initX, initY, initRotate, initScale, mousePos, performanceMode]);

  const colorGradients = {
    orange: 'from-[#FF7A5C] to-[#FF4B2B] shadow-[inset_0_3px_6px_rgba(255,255,255,0.4)]',
    purple: 'from-[#B295FF] to-[#7F5CFF] shadow-[inset_0_3px_6px_rgba(255,255,255,0.4)]',
    green: 'from-[#5CFFB5] to-[#1CD380] shadow-[inset_0_3px_6px_rgba(255,255,255,0.4)]',
    yellow: 'from-[#FFE07A] to-[#FFB700] shadow-[inset_0_3px_6px_rgba(255,255,255,0.4)]',
    pink: 'from-[#FF80B7] to-[#FF3B81] shadow-[inset_0_3px_6px_rgba(255,255,255,0.4)]',
    blue: 'from-[#4AD2FF] to-[#0095D4] shadow-[inset_0_3px_6px_rgba(255,255,255,0.4)]',
    cream: 'from-[#FBFBFC] to-[#D5D8E1] shadow-[inset_0_3px_6px_rgba(255,255,255,0.5)] border-[#0F0F1A]',
  };

  // Eco Mode positioning style vs Physics positioning style
  const inlineStyle = performanceMode
    ? {
        left: `${initX}%`,
        top: `${initY}%`,
        transform: `translate(-50%, -50%) rotate(${initRotate}deg) scale(${initScale})`,
        touchAction: 'none',
      }
    : {
        left: 0,
        top: 0,
        touchAction: 'none',
      };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      className="absolute w-16 h-16 md:w-[88px] md:h-[88px] select-none pointer-events-auto cursor-pointer transition-transform duration-300"
      style={inlineStyle}
    >
      {/* 3D Isometric Extrusion block */}
      <div className="absolute inset-0 bg-[#0F0F1A] rounded-2xl border-2 border-[#0F0F1A] translate-x-[8px] translate-y-[8px] shadow-md" />

      {/* Dynamic Compressible Face */}
      <div
        className={`keycap-top absolute inset-0 bg-gradient-to-br ${colorGradients[color] || colorGradients.orange} rounded-2xl border-2 border-[#0F0F1A] flex items-center justify-center`}
        style={performanceMode ? { transform: 'translate(0px, 0px)' } : undefined}
      >
        <span className="font-display font-black text-2xl md:text-3xl text-[#0F0F1A] select-none">{char}</span>
        <div className="absolute top-1 left-1 right-1 h-2 bg-white/20 rounded-t-xl" />
      </div>
    </div>
  );
}

export default function KeycapBoard({ mousePos, setHoverState }) {
  const keycaps = [
    // Row 1: FUTURE </>
    { char: 'F', color: 'orange', x: 5, y: 15, rotate: -8, scale: 1.05 },
    { char: 'U', color: 'purple', x: 18, y: 22, rotate: 10, scale: 0.95 },
    { char: 'T', color: 'green', x: 31, y: 12, rotate: -5, scale: 1 },
    { char: 'U', color: 'blue', x: 44, y: 25, rotate: 12, scale: 1.1 },
    { char: 'R', color: 'yellow', x: 57, y: 15, rotate: -10, scale: 0.95 },
    { char: 'E', color: 'orange', x: 70, y: 28, rotate: 15, scale: 1.05 },
    { char: '</>', color: 'cream', x: 83, y: 18, rotate: -8, scale: 1.1 },

    // Row 2: LEADERS
    { char: 'L', color: 'green', x: 8, y: 62, rotate: 12, scale: 1 },
    { char: 'E', color: 'purple', x: 20, y: 55, rotate: -15, scale: 1.05 },
    { char: 'A', color: 'yellow', x: 32, y: 68, rotate: 8, scale: 0.95 },
    { char: 'D', color: 'orange', x: 45, y: 58, rotate: -10, scale: 1.1 },
    { char: 'E', color: 'blue', x: 58, y: 70, rotate: 12, scale: 1 },
    { char: 'R', color: 'purple', x: 71, y: 60, rotate: -14, scale: 1.05 },
    { char: 'S', color: 'green', x: 84, y: 67, rotate: 10, scale: 0.95 },
  ];
  return (
    <div className="absolute inset-0 select-none pointer-events-none">
      {keycaps.map((k, idx) => (
        <Keycap
          key={idx}
          char={k.char}
          color={k.color}
          initX={k.x}
          initY={k.y}
          initRotate={k.rotate}
          initScale={k.scale}
          mousePos={mousePos}
          setHoverState={setHoverState}
        />
      ))}
    </div>
  );
}

