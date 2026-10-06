/**
 * Pixel Trail — Originkit
 * Pure Vanilla JavaScript implementation of Originkit Pixel Trail
 */

(function (global) {
  const MAX_CELLS = 4200;
  const FADE_EASING = "linear";
  const WALK_FRACTION = 0.5;
  const MAX_WALK_STEPS = 96;

  /**
   * Initialize Pixel Trail on a container element
   * @param {HTMLElement} host - The target section or container
   * @param {Object} options - Configuration options
   */
  function initPixelTrail(host, options = {}) {
    if (!host) return null;

    const background = options.background || "#0E0404";
    const pixelColor = (options.pixel && options.pixel.color) || "#FFFFFF";
    const pixelGap = options.pixel && options.pixel.gap !== undefined ? options.pixel.gap : 0;
    const pixelRadius = options.pixel && options.pixel.radius !== undefined ? options.pixel.radius : 0;
    const hold = options.trail && options.trail.hold !== undefined ? options.trail.hold : 0.3;
    const fade = options.trail && options.trail.fade !== undefined ? options.trail.fade : 0.45;
    const reach = options.trail && options.trail.reach !== undefined ? options.trail.reach : 0;
    let columns = options.columns || 24;

    // Create or locate grid container inside host
    let gridEl = host.querySelector(".pixel-trail-grid");
    if (!gridEl) {
      gridEl = document.createElement("div");
      gridEl.className = "pixel-trail-grid";
      host.insertBefore(gridEl, host.firstChild);
    }

    gridEl.style.position = "absolute";
    gridEl.style.inset = "0";
    gridEl.style.display = "grid";
    gridEl.style.alignContent = "start";
    gridEl.style.pointerEvents = "none";
    gridEl.style.zIndex = "1";

    let cells = [];
    let timers = [];
    let last = null;
    let gridInfo = { cols: columns, rows: 0, pitch: 0, gap: pixelGap };

    function buildGrid() {
      for (const t of timers) {
        if (t) clearTimeout(t);
      }
      gridEl.innerHTML = "";

      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      if (w <= 0 || h <= 0) return;

      let cols = Math.max(2, Math.round(columns));
      const measure = (c) => {
        const cell = Math.max(1, (w - pixelGap * (c - 1)) / c);
        const pitch = cell + pixelGap;
        return { pitch, rows: Math.max(1, Math.ceil((h + pixelGap) / pitch)) };
      };

      let m = measure(cols);
      let guard = 0;
      while (cols * m.rows > MAX_CELLS && cols > 2 && guard++ < 16) {
        cols = Math.max(2, Math.floor(cols * 0.85));
        m = measure(cols);
      }

      gridInfo = { cols, rows: m.rows, pitch: m.pitch, gap: pixelGap };

      gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      gridEl.style.gap = `${pixelGap}px`;

      const totalCount = cols * m.rows;
      const fragment = document.createDocumentFragment();
      cells = new Array(totalCount);
      timers = new Array(totalCount).fill(0);

      for (let i = 0; i < totalCount; i++) {
        const cell = document.createElement("div");
        cell.className = "pixel-trail-cell";
        cell.style.width = "100%";
        cell.style.aspectRatio = "1 / 1";
        cell.style.backgroundColor = pixelColor;
        cell.style.borderRadius = `${pixelRadius}px`;
        cell.style.opacity = "0";
        cell.style.mixBlendMode = "difference";
        cell.style.pointerEvents = "none";
        fragment.appendChild(cell);
        cells[i] = cell;
      }
      gridEl.appendChild(fragment);
      last = null;
    }

    buildGrid();

    const strike = (col, row, alpha) => {
      const { cols, rows } = gridInfo;
      if (col < 0 || row < 0 || col >= cols || row >= rows) return;

      const i = row * cols + col;
      const el = cells[i];
      if (!el) return;

      if (timers[i]) clearTimeout(timers[i]);

      const current = parseFloat(el.style.opacity) || 0;
      const next = current > alpha ? current : alpha;

      el.style.transition = "none";
      el.style.opacity = String(next);

      timers[i] = setTimeout(() => {
        timers[i] = 0;
        el.style.transition = `opacity ${fade}s ${FADE_EASING}`;
        el.style.opacity = "0";
      }, hold * 1000);
    };

    const stamp = (x, y) => {
      const { pitch } = gridInfo;
      if (pitch <= 0) return;

      const col = Math.floor(x / pitch);
      const row = Math.floor(y / pitch);

      if (reach <= 0) {
        strike(col, row, 1);
        return;
      }

      for (let dr = -reach; dr <= reach; dr++) {
        for (let dc = -reach; dc <= reach; dc++) {
          const d = Math.sqrt(dc * dc + dr * dr);
          if (d > reach + 0.5) continue;
          strike(col + dc, row + dr, 1 - d / (reach + 1));
        }
      }
    };

    const trace = (x, y) => {
      const pitch = gridInfo.pitch;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const steps = Math.min(
          MAX_WALK_STEPS,
          Math.ceil(Math.sqrt(dx * dx + dy * dy) / (pitch * WALK_FRACTION))
        );
        for (let i = 1; i < steps; i++) {
          stamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
        }
      }
      stamp(x, y);
      last = { x, y };
    };

    const onPointer = (e) => {
      if (gridInfo.pitch <= 0) return;
      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      trace(x, y);
    };

    const onLeave = () => {
      last = null;
    };

    host.addEventListener("pointermove", onPointer, { passive: true });
    host.addEventListener("pointerdown", onPointer, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });
    host.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches && e.touches[0]) {
          onPointer(e.touches[0]);
        }
      },
      { passive: true }
    );

    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildGrid, 120);
    };
    window.addEventListener("resize", onResize);

    return {
      destroy: () => {
        for (const t of timers) if (t) clearTimeout(t);
        host.removeEventListener("pointermove", onPointer);
        host.removeEventListener("pointerdown", onPointer);
        host.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("resize", onResize);
      },
    };
  }

  global.initPixelTrail = initPixelTrail;
})(typeof window !== "undefined" ? window : this);
