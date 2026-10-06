/**
 * Predictive Arc — Originkit
 * Pure WebGL Retro Dot-Matrix Shader Engine for "Why Choose Future Leaders"
 */

(function (global) {
  const MAX_DPR = 2;

  const VERT_SRC = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

  const FRAG_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime, uDpr, uCell, uDot;
uniform float uPeak, uHeight, uThick, uFall;
uniform vec3  uBg, uBase, uAccent, uHigh;
uniform vec2  uMouse;
uniform float uMouseRadius, uMouseStrength;

void main(){
  float cs = max(uCell, 2.0);
  vec2 ci = floor(gl_FragCoord.xy / cs);
  vec2 cc = (ci + 0.5) * cs;

  float x = cc.x / uDpr;
  float y = (uRes.y - cc.y) / uDpr;
  float w = uRes.x / uDpr;
  float h = uRes.y / uDpr;

  float normX = (x - w * 0.5) / (w * 0.75);
  float curveY = h * uPeak + normX * normX * (h * uHeight);

  float mdx = x - uMouse.x;
  float influence = uMouseStrength * exp(-(mdx * mdx) / (2.0 * uMouseRadius * uMouseRadius + 1.0));
  curveY = mix(curveY, uMouse.y, influence);

  float dist = abs(y - curveY);
  float th = (140.0 + (1.0 - abs(normX)) * 80.0) * uThick;

  vec3 col = uBg;
  if (dist < th) {
    float i = 1.0 - dist / th;
    float waveX = sin(x * 0.015 + uTime);
    float waveY = cos(y * 0.02 + uTime);
    i = i * 0.7 + waveX * waveY * 0.3 * i;
    i *= max(0.0, 1.0 - pow(abs(normX), uFall));

    if (i > 0.02) {
      float side = uDot * i * uDpr;
      vec2 d = abs(gl_FragCoord.xy - cc);
      float cov = 1.0 - smoothstep(side * 0.5 - 1.0, side * 0.5 + 1.0, max(d.x, d.y));

      vec3 ink = mix(uBase, uAccent, clamp(pow(i, 1.1), 0.0, 1.0));
      ink = mix(ink, uHigh, smoothstep(0.72, 1.0, i));
      col = mix(uBg, ink, cov * clamp(i * 1.6, 0.0, 1.0));
    }
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error("PredictiveArc shader error:", gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  function parseColor(input, fb) {
    if (!input) return fb;
    const str = String(input).trim();
    if (str.charAt(0) === "#") {
      let hex = str.slice(1);
      if (hex.length === 3 || hex.length === 4) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      if (hex.length >= 6) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r / 255, g / 255, b / 255];
      }
      return fb;
    }
    const m = str.match(/[\d.]+/g);
    if (m && m.length >= 3) {
      return [
        Math.min(255, parseFloat(m[0])) / 255,
        Math.min(255, parseFloat(m[1])) / 255,
        Math.min(255, parseFloat(m[2])) / 255,
      ];
    }
    return fb;
  }

  function num(v, fb) {
    return typeof v === "number" && isFinite(v) ? v : fb;
  }

  function clampN(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  const ARCH_DEFAULTS = { peak: 100, archHeight: 0, thickness: 206, falloff: 600 };
  const POINTER_DEFAULTS = { enabled: true, radius: 236, strength: 34 };

  /**
   * Initialize Predictive Arc WebGL Engine
   * @param {HTMLElement} container - The section or wrapper element
   * @param {HTMLCanvasElement} canvas - The canvas element
   * @param {Object} options - Custom configuration options
   */
  function initPredictiveArc(container, canvas, options = {}) {
    if (!canvas) return null;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
    if (!gl) {
      console.warn("PredictiveArc: WebGL unavailable");
      return null;
    }

    const arch_ = { ...ARCH_DEFAULTS, ...(options.arch || {}) };
    const pointer_ = { ...POINTER_DEFAULTS, ...(options.pointer || {}) };

    const background = options.background || "#030303";
    const baseColor = options.baseColor || "#FF3C00";
    const accentColor = options.accentColor || "#FF9898";
    const highlight = options.highlight || "#FF3C00";
    const density = options.density !== undefined ? options.density : 78;
    const dotSize = options.dotSize !== undefined ? options.dotSize : 102;
    const speed = options.speed !== undefined ? options.speed : 100;

    const v = {
      bg: background,
      base: baseColor,
      accent: accentColor,
      high: highlight,
      density: Math.round(clampN(num(density, 160), 40, 320)),
      dotSize: clampN(num(dotSize, 100), 20, 400) / 100,
      speed: clampN(num(speed, 50), 0, 100) / 50,
      peak: clampN(num(arch_.peak, 35), 0, 100) / 100,
      archHeight: clampN(num(arch_.archHeight, 70), 0, 300) / 100,
      thickness: clampN(num(arch_.thickness, 100), 20, 400) / 100,
      falloff: clampN(num(arch_.falloff, 250), 50, 600) / 100,
      pointerEnabled: pointer_.enabled !== false,
      pointerRadius: clampN(num(pointer_.radius, 220), 40, 600),
      pointerStrength: clampN(num(pointer_.strength, 60), 0, 100) / 100,
    };

    const pointerState = { x: 0, y: 0, targetX: 0, targetY: 0, active: 0, targetActive: 0 };

    const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return null;

    const prog = gl.createProgram();
    if (!prog) return null;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("PredictiveArc link error:", gl.getProgramInfoLog(prog));
      return null;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const locs = {};
    const u = (name) => {
      if (!(name in locs)) locs[name] = gl.getUniformLocation(prog, name);
      return locs[name];
    };

    let raf = 0;
    let last = performance.now();
    let clock = 0;
    let isVisible = true;

    // Pointer Event Listeners
    const targetEl = container || canvas;
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointerState.targetX = e.clientX - rect.left;
      pointerState.targetY = rect.height - (e.clientY - rect.top);
      pointerState.targetActive = 1;
    };

    const onPointerLeave = () => {
      pointerState.targetActive = 0;
    };

    targetEl.addEventListener("pointermove", onPointerMove, { passive: true });
    targetEl.addEventListener("pointerleave", onPointerLeave, { passive: true });
    targetEl.addEventListener("pointercancel", onPointerLeave, { passive: true });

    // IntersectionObserver to pause when offscreen
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
            if (isVisible && !raf) {
              last = performance.now();
              raf = requestAnimationFrame(render);
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(targetEl);
    }

    const render = (now) => {
      if (!isVisible) {
        raf = 0;
        return;
      }

      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      clock = (clock + dt * 0.9 * v.speed) % 6283;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cw = canvas.clientWidth || window.innerWidth || 1200;
      const ch = canvas.clientHeight || window.innerHeight || 800;
      const bw = Math.max(1, Math.round(cw * dpr));
      const bh = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      gl.viewport(0, 0, bw, bh);

      const pitchCss = Math.min(bw, bh) / dpr / v.density;

      const posLerp = Math.min(1, dt * 12);
      const activeLerp = Math.min(1, dt * 6);
      pointerState.x += (pointerState.targetX - pointerState.x) * posLerp;
      pointerState.y += (pointerState.targetY - pointerState.y) * posLerp;
      pointerState.active += (pointerState.targetActive - pointerState.active) * activeLerp;

      gl.uniform2f(u("uRes"), bw, bh);
      gl.uniform1f(u("uTime"), clock);
      gl.uniform1f(u("uDpr"), dpr);
      gl.uniform1f(u("uCell"), Math.max(2, pitchCss * dpr));
      gl.uniform1f(u("uDot"), pitchCss * 1.2 * v.dotSize);
      gl.uniform1f(u("uPeak"), v.peak);
      gl.uniform1f(u("uHeight"), v.archHeight);
      gl.uniform1f(u("uThick"), v.thickness);
      gl.uniform1f(u("uFall"), v.falloff);
      gl.uniform2f(u("uMouse"), pointerState.x, pointerState.y);
      gl.uniform1f(u("uMouseRadius"), v.pointerRadius);
      gl.uniform1f(u("uMouseStrength"), v.pointerEnabled ? v.pointerStrength * pointerState.active : 0);

      const cg = parseColor(v.bg, [0.012, 0.012, 0.012]);
      const cb = parseColor(v.base, [0.169, 0.055, 0.369]);
      const ca = parseColor(v.accent, [0.627, 0.314, 1.0]);
      const chh = parseColor(v.high, [1, 1, 1]);
      gl.uniform3f(u("uBg"), cg[0], cg[1], cg[2]);
      gl.uniform3f(u("uBase"), cb[0], cb[1], cb[2]);
      gl.uniform3f(u("uAccent"), ca[0], ca[1], ca[2]);
      gl.uniform3f(u("uHigh"), chh[0], chh[1], chh[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return {
      destroy: () => {
        cancelAnimationFrame(raf);
        targetEl.removeEventListener("pointermove", onPointerMove);
        targetEl.removeEventListener("pointerleave", onPointerLeave);
        targetEl.removeEventListener("pointercancel", onPointerLeave);
      },
    };
  }

  global.initPredictiveArc = initPredictiveArc;
})(typeof window !== "undefined" ? window : this);
