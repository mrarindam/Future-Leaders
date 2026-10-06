/**
 * Character Cursor — Originkit
 * Interactive canvas character grid trailing cursor effect
 * 
 * Generates dynamic matrix character tiles in a localized radius around the pointer
 * with high-performance RAF loop and grid index set.
 */

(function (global) {
  const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?/~";

  const DEFAULTS = {
    cellSize: 18,
    radius: 46,
    density: 18,
    hold: 12,
    boxColor: "#FF3C00", // Matches Future Leaders brand accent orange
    textColor: "#FFFFFF",
  };

  class CharacterCursor {
    constructor(options = {}) {
      // Only enable for desktop mice/trackpads
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
      }

      this.options = { ...DEFAULTS, ...options };
      this.initCanvas();
      this.initEvents();
      this.startLoop();
    }

    initCanvas() {
      this.canvas = document.createElement("canvas");
      this.canvas.id = "originkit-character-cursor";
      this.canvas.style.position = "fixed";
      this.canvas.style.top = "0";
      this.canvas.style.left = "0";
      this.canvas.style.width = "100vw";
      this.canvas.style.height = "100vh";
      this.canvas.style.pointerEvents = "none";
      this.canvas.style.zIndex = "999999";
      this.canvas.style.display = "block";
      document.body.appendChild(this.canvas);

      this.ctx = this.canvas.getContext("2d");
      this.rebuild();

      window.addEventListener("resize", () => this.rebuild(), { passive: true });
    }

    rebuild() {
      if (!this.canvas || !this.ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.canvas.width = Math.floor(this.w * dpr);
      this.canvas.height = Math.floor(this.h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cell = this.options.cellSize;
      this.cols = Math.max(1, Math.ceil(this.w / cell) + 1);
      this.rows = Math.max(1, Math.ceil(this.h / cell) + 1);
      this.grid = new Array(this.cols * this.rows);

      for (let i = 0; i < this.grid.length; i++) {
        this.grid[i] = {
          char: " ",
          activeAt: 0,
          delay: 0.05,
          duration: 0.25,
          hidden: false,
          box: "",
          text: "",
        };
      }
      this.activeCells = new Set();
    }

    initEvents() {
      this.mouseX = -1e4;
      this.mouseY = -1e4;
      this.trailX = -1e4;
      this.trailY = -1e4;

      window.addEventListener("pointermove", (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
      }, { passive: true });

      document.addEventListener("pointerleave", () => {
        this.mouseX = -1e4;
        this.mouseY = -1e4;
      });

      this.visible = true;
      document.addEventListener("visibilitychange", () => {
        this.visible = !document.hidden;
      });
    }

    startLoop() {
      let last = performance.now();
      const cell = this.options.cellSize;

      const frame = (now) => {
        this.raf = requestAnimationFrame(frame);
        if (!this.visible) {
          last = now;
          return;
        }

        const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
        last = now;
        const p = this.options;
        const t = now / 1000;

        let moving = false;
        if (this.mouseX <= -1e4) {
          this.trailX = -1e4;
          this.trailY = -1e4;
        } else if (this.trailX <= -1e4) {
          this.trailX = this.mouseX;
          this.trailY = this.mouseY;
        } else {
          const dx = this.mouseX - this.trailX;
          const dy = this.mouseY - this.trailY;
          if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            const ease = 1 - Math.exp(-dt / 0.005);
            this.trailX += dx * ease;
            this.trailY += dy * ease;
            moving = true;
          } else {
            this.trailX = this.mouseX;
            this.trailY = this.mouseY;
          }
        }

        if (moving) {
          const box = p.boxColor;
          const text = p.textColor;
          const r = Math.max(1, p.radius);
          const rSq = r * r;
          const impact = p.density / 8;
          const holdScale = Math.max(0.1, p.hold / 10);
          const startCol = Math.max(0, Math.floor((this.trailX - r) / cell));
          const endCol = Math.min(this.cols - 1, Math.ceil((this.trailX + r) / cell));
          const startRow = Math.max(0, Math.floor((this.trailY - r) / cell));
          const endRow = Math.min(this.rows - 1, Math.ceil((this.trailY + r) / cell));

          for (let c = startCol; c <= endCol; c++) {
            for (let rw = startRow; rw <= endRow; rw++) {
              const cx = c * cell + cell / 2;
              const cy = rw * cell + cell / 2;
              const dx = this.trailX - cx;
              const dy = this.trailY - cy;
              const distSq = dx * dx + dy * dy;
              if (distSq >= rSq) continue;

              const falloff = Math.pow(1 - Math.sqrt(distSq) / r, 1.5);
              if (Math.random() >= falloff * impact) continue;

              const idx = c * this.rows + rw;
              const cellData = this.grid[idx];
              if (!cellData) continue;

              if (cellData.activeAt === 0 || t - cellData.activeAt > 0.2) {
                cellData.delay = (0.03 + Math.random() * 0.05) * holdScale;
                cellData.duration = (0.1 + Math.random() * 0.15) * holdScale;
                cellData.hidden = Math.random() < 0.04;
              }
              cellData.activeAt = t;
              if (cellData.char === " " || Math.random() < 0.15) {
                cellData.char = POOL[Math.floor(Math.random() * POOL.length)];
              }
              cellData.box = box;
              cellData.text = text;
              this.activeCells.add(idx);
            }
          }
        }

        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.font = `700 ${cell - 5}px "Geist", monospace`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        const scramble = 1 - Math.exp(-7.2 * dt);

        for (const idx of this.activeCells) {
          const cellData = this.grid[idx];
          if (!cellData || cellData.activeAt === 0) {
            this.activeCells.delete(idx);
            continue;
          }

          const elapsed = t - cellData.activeAt;
          if (elapsed >= cellData.delay + cellData.duration) {
            cellData.char = " ";
            cellData.activeAt = 0;
            cellData.hidden = false;
            this.activeCells.delete(idx);
            continue;
          }

          if (cellData.hidden) continue;

          const c = Math.floor(idx / this.rows);
          const rw = idx % this.rows;

          if (elapsed >= cellData.delay && Math.random() < scramble) {
            cellData.char = POOL[Math.floor(Math.random() * POOL.length)];
          }

          const x = c * cell;
          const y = rw * cell;

          this.ctx.fillStyle = cellData.box || p.boxColor;
          this.ctx.fillRect(x, y, cell, cell);
          this.ctx.fillStyle = cellData.text || p.textColor;
          this.ctx.fillText(cellData.char, x + cell / 2, y + cell / 2);
        }
      };

      this.raf = requestAnimationFrame(frame);
    }
  }

  function initCharacterCursor(options) {
    return new CharacterCursor(options);
  }

  global.CharacterCursor = CharacterCursor;
  global.initCharacterCursor = initCharacterCursor;
})(window);
