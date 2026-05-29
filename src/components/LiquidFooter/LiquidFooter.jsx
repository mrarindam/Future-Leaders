import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture, Vec2, Flowmap } from 'ogl';
import './LiquidFooter.css';

/* ============ SHADERS ============ */
const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Cursor leaves a velocity trail in uFlow. We use that flowmap to drag pixels
// in the direction the cursor was just moving — this is what produces the
// "smear / warp / pull" effect from Apechain.
const fragment = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTex;
  uniform sampler2D uFlow;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTime;

  vec4 sampleTex(sampler2D s, vec2 uv) {
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);
    return texture2D(s, uv);
  }

  void main() {
    vec2 uv = vUv;

    // Sample flow (cursor velocity smeared across a faded buffer)
    vec3 flow = texture2D(uFlow, uv).rgb;
    vec2 flowVec = flow.rg;
    float flowMag = length(flowVec);

    // Drag pixels along the flow direction — only meaningful when there's flow
    float strength = 0.06;
    vec2 displaced = uv - flowVec * strength;

    // RGB chromatic aberration ONLY scales with flow — zero at rest
    float aberration = flowMag * 0.06;
    vec2 dir = flowMag > 0.0001 ? normalize(flowVec) : vec2(0.0);

    float r = sampleTex(uTex, displaced - dir * aberration).r;
    float g = sampleTex(uTex, displaced).g;
    float b = sampleTex(uTex, displaced + dir * aberration).b;
    float a = sampleTex(uTex, displaced).a;

    vec3 col = vec3(r, g, b);

    gl_FragColor = vec4(col, a);
  }
`;

/* ============ TEXT-TO-CANVAS ============ */
function drawTextToCanvas(canvas, width, height, dpr) {
  canvas.width = Math.max(2, Math.floor(width * dpr));
  canvas.height = Math.max(2, Math.floor(height * dpr));
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Responsive logic: split to vertical columns on mobile/portrait
  if (width < height) {
    const col1 = ['F', 'U', 'T', 'U', 'R', 'E', ''];
    const col2 = ['L', 'E', 'A', 'D', 'E', 'R', 'S'];

    const fontSize = Math.min(width * 0.18, height * 0.08);
    const lineH = fontSize * 1.30;
    ctx.font = `900 ${fontSize}px "Orbitron", sans-serif`;

    const cx = width / 2;
    const totalH = lineH * col2.length;
    const startY = (height - totalH) / 2 + lineH / 2;
    const colOffset = fontSize * 0.8;

    for (let i = 0; i < col2.length; i++) {
      const y = startY + i * lineH;
      if (col1[i]) {
        ctx.fillText(col1[i], cx - colOffset, y);
      }
      if (col2[i]) {
        ctx.fillText(col2[i], cx + colOffset, y);
      }
    }
  } else {
    // PC standard layout - 2 lines
    const fontSize = Math.min(width * 0.22, 360);
    const lineH = fontSize * 0.85;
    ctx.font = `900 ${fontSize}px "Orbitron", sans-serif`;

    const cx = width / 2;
    const cy = height / 2;
    ctx.fillText('FUTURE', cx, cy - lineH * 0.5);
    ctx.fillText('LEADERS', cx, cy + lineH * 0.5);
  }
  return true;
}

export default function LiquidFooter() {
  const sectionRef = useRef(null);
  const canvasHostRef = useRef(null);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host || typeof window === 'undefined') return;

    const probe = document.createElement('canvas');
    if (!probe.getContext('webgl') && !probe.getContext('experimental-webgl')) {
      console.warn('[LiquidFooter] WebGL not available');
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let disposed = false;
    let renderer, gl, program, mesh, textCanvas, texture, flowmap, raf;

    try {
      renderer = new Renderer({ dpr, alpha: true, antialias: true });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      host.appendChild(gl.canvas);

      // Cursor trail buffer
      flowmap = new Flowmap(gl, {
        size: 256,
        falloff: 0.18,      // how wide the cursor's influence is
        alpha: 1,
        dissipation: 0.92,  // how fast the trail fades (higher = lasts longer)
      });

      textCanvas = document.createElement('canvas');
      textCanvas.width = 2;
      textCanvas.height = 2;

      texture = new Texture(gl, {
        image: textCanvas,
        generateMipmaps: false,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        wrapS: gl.CLAMP_TO_EDGE,
        wrapT: gl.CLAMP_TO_EDGE,
        flipY: true,
      });

      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTex: { value: texture },
          uFlow: { value: flowmap.uniform.value },
          uResolution: { value: [1, 1] },
          uMouse: { value: [0.5, 0.5] },
          uTime: { value: 0 },
        },
        transparent: true,
      });

      const geometry = new Triangle(gl);
      mesh = new Mesh(gl, { geometry, program });
    } catch (err) {
      console.error('[LiquidFooter] init failed', err);
      return;
    }

    const aspect = new Vec2(1, 1);

    const resize = () => {
      if (disposed) return;
      try {
        const w = Math.max(1, host.clientWidth);
        const h = Math.max(1, host.clientHeight);
        renderer.setSize(w, h);
        if (drawTextToCanvas(textCanvas, w, h, dpr)) {
          texture.image = textCanvas;
          texture.needsUpdate = true;
        }
        program.uniforms.uResolution.value = [w * dpr, h * dpr];
        aspect.set(w / h, 1);
        flowmap.aspect = w / h;
      } catch (err) {
        console.error('[LiquidFooter] resize failed', err);
      }
    };

    requestAnimationFrame(resize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => !disposed && resize()).catch(() => { });
    }
    window.addEventListener('resize', resize);

    // Mouse + Touch + velocity tracking
    const mouse = new Vec2(0.5, 0.5);
    const velocity = new Vec2(0, 0);
    const lastMouse = new Vec2(0.5, 0.5);
    let lastTime = 0;

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;

      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height; // GL y flip

      // Compute velocity per second
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const vx = (x - lastMouse.x) / (dt / 1000);
      const vy = (y - lastMouse.y) / (dt / 1000);
      // Smooth blend velocity to avoid jitter
      velocity.x = velocity.x * 0.7 + vx * 0.3;
      velocity.y = velocity.y * 0.7 + vy * 0.3;

      lastMouse.set(x, y);
      lastTime = now;
      mouse.set(x, y);
    };

    const onTouch = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const r = host.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;

      const x = (touch.clientX - r.left) / r.width;
      const y = 1 - (touch.clientY - r.top) / r.height; // GL y flip

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);

      // Subtle, lightweight swipe touch reaction
      const touchScale = 0.55;
      const vx = ((x - lastMouse.x) / (dt / 1000)) * touchScale;
      const vy = ((y - lastMouse.y) / (dt / 1000)) * touchScale;

      velocity.x = velocity.x * 0.7 + vx * 0.3;
      velocity.y = velocity.y * 0.7 + vy * 0.3;

      lastMouse.set(x, y);
      lastTime = now;
      mouse.set(x, y);
    };

    const onLeave = () => {
      velocity.set(0, 0);
    };

    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);
    host.addEventListener('touchstart', onTouch, { passive: true });
    host.addEventListener('touchmove', onTouch, { passive: true });
    host.addEventListener('touchend', onLeave, { passive: true });

    const start = performance.now();

    // Only run the WebGL render loop while the footer is actually on screen.
    // It's the last section and is offscreen almost the entire time; rendering
    // this full-screen liquid simulation every frame regardless was a constant
    // GPU drain that worsened scroll performance across the whole page.
    let visible = false;
    const io = new IntersectionObserver(
      (entries) => { visible = entries[0]?.isIntersecting ?? false; },
      { threshold: 0.01 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    const loop = () => {
      if (disposed) return;
      if (!visible) {
        raf = requestAnimationFrame(loop);
        return;
      }
      try {
        // Decay velocity each frame so the trail naturally fades
        velocity.x *= 0.92;
        velocity.y *= 0.92;

        // Update flowmap with current cursor position + velocity
        flowmap.mouse.copy(mouse);
        flowmap.velocity.copy(velocity);
        flowmap.update();

        program.uniforms.uFlow.value = flowmap.uniform.value;
        program.uniforms.uMouse.value[0] = mouse.x;
        program.uniforms.uMouse.value[1] = mouse.y;
        program.uniforms.uTime.value = (performance.now() - start) * 0.001;

        renderer.render({ scene: mesh });
      } catch (err) {
        console.error('[LiquidFooter] render error', err);
        disposed = true;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
      host.removeEventListener('touchstart', onTouch);
      host.removeEventListener('touchmove', onTouch);
      host.removeEventListener('touchend', onLeave);
      try {
        if (gl && gl.canvas && gl.canvas.parentNode) {
          gl.canvas.parentNode.removeChild(gl.canvas);
        }
        if (gl) {
          const ext = gl.getExtension('WEBGL_lose_context');
          if (ext) ext.loseContext();
        }
      } catch { }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="liquid-footer relative w-full h-screen overflow-hidden bg-[#0044FF]"
    >
      <div className="liquid-footer__noise absolute inset-0 pointer-events-none" />

      <div
        ref={canvasHostRef}
        className="absolute inset-0"
      />

      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center px-6 text-white/70 text-[11px] font-display tracking-[0.25em] uppercase pointer-events-none z-10">
        <span>© Future Leaders</span>
      </div>
    </section>
  );
}
