/**
 * Liquid Carve Button — Originkit
 * Interactive SVG Goo-filter & dynamic inertia bite-mask button effect
 * 
 * Provides fluid organic liquid carving as pointer hovers and glides across the button.
 */

(function (global) {
  const GOO_STRENGTH = 7;
  const FOLLOW_TAU_MIN = 0.02;
  const FOLLOW_TAU_MAX = 0.35;
  const SQUASH_TAU = 0.09;
  const SQUASH_PER_PX_PER_SEC = 0.0011;
  const SQUASH_MAX = 1.6;

  let uidCounter = 0;

  class LiquidCarveButton {
    constructor(element, options = {}) {
      if (!element) return;
      this.element = element;
      this.uid = "lcb-" + (++uidCounter);

      this.label = options.label || element.getAttribute("data-label") || element.textContent.trim() || "LEARN MORE";
      this.blobColor = options.blobColor || element.getAttribute("data-blob") || "#FF3C00";
      this.fillColor = options.fillColor || element.getAttribute("data-fill") || "rgba(255, 255, 255, 0.08)";
      this.textColor = options.textColor || element.getAttribute("data-text-color") || "#FFFFFF";
      this.blobSize = options.blobSize || 75;
      this.smoothness = options.smoothness !== undefined ? options.smoothness : 55;
      this.rounded = options.rounded !== undefined ? options.rounded : 16;
      this.iconSymbol = options.iconSymbol || '<i class="fa-solid fa-arrow-right"></i>';

      this.hovered = false;
      this.chase = { x: 0, y: 0, tx: 0, ty: 0, squash: 1, angle: 0 };
      this.lastTime = 0;
      this.rafId = null;

      this.buildDOM();
      this.initEvents();
      this.startLoop();
    }

    buildDOM() {
      this.element.classList.add("liquid-carve-container");
      this.element.innerHTML = "";

      const filterId = `goo-${this.uid}`;
      const maskId = `bite-${this.uid}`;
      const rad = this.rounded;
      const blobRadius = this.blobSize / 2;

      // SVG markup with Gooey Filter and Mask
      const svgHTML = `
        <svg class="liquid-carve-svg" aria-hidden="true" width="100%" height="100%">
          <defs>
            <filter id="${filterId}">
              <feGaussianBlur in="SourceGraphic" stdDeviation="${GOO_STRENGTH}" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" />
            </filter>
            <mask id="${maskId}">
              <rect x="-20%" y="-20%" width="140%" height="140%" fill="#fff" />
              <g class="lcb-follow" style="transform-box: fill-box; transform-origin: center;">
                <g class="lcb-squash" style="transform-box: fill-box; transform-origin: center;">
                  <g class="lcb-bite" style="transform-box: fill-box; transform-origin: center; transform: scale(0);">
                    <circle cx="50%" cy="50%" r="${blobRadius}" fill="#000" />
                  </g>
                </g>
              </g>
            </mask>
          </defs>

          <!-- Blob underlayer exposed by mask -->
          <g filter="url(#${filterId})" class="lcb-blob-group">
            <rect class="lcb-blob-rect" x="0" y="0" width="100%" height="100%" rx="${rad}" ry="${rad}" fill="${this.blobColor}" />
          </g>

          <!-- Top fill surface with bite mask -->
          <g filter="url(#${filterId})" class="lcb-fill-group">
            <rect class="lcb-fill-rect" x="0" y="0" width="100%" height="100%" rx="${rad}" ry="${rad}" fill="${this.fillColor}" mask="url(#${maskId})" />
          </g>
        </svg>

        <span class="liquid-carve-content" style="color: ${this.textColor};">
          <span class="liquid-carve-label">${this.label}</span>
          <span class="liquid-carve-icon">${this.iconSymbol}</span>
        </span>
      `;

      this.element.innerHTML = svgHTML;

      this.followEl = this.element.querySelector(".lcb-follow");
      this.squashEl = this.element.querySelector(".lcb-squash");
      this.biteEl = this.element.querySelector(".lcb-bite");
      this.contentEl = this.element.querySelector(".liquid-carve-content");
    }

    initEvents() {
      const getOffset = (e) => {
        const r = this.element.getBoundingClientRect();
        return {
          dx: e.clientX - (r.left + r.width / 2),
          dy: e.clientY - (r.top + r.height / 2),
        };
      };

      this.element.addEventListener("pointerenter", (e) => {
        this.hovered = true;
        const o = getOffset(e);
        this.chase.tx = o.dx;
        this.chase.ty = o.dy;
        this.chase.x = o.dx;
        this.chase.y = o.dy;

        if (this.followEl) {
          this.followEl.style.transform = `translate(${o.dx}px, ${o.dy}px)`;
        }
        if (this.biteEl) {
          this.biteEl.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
          this.biteEl.style.transform = "scale(1)";
        }
      });

      this.element.addEventListener("pointermove", (e) => {
        if (!this.hovered) return;
        const o = getOffset(e);
        this.chase.tx = o.dx;
        this.chase.ty = o.dy;
      });

      this.element.addEventListener("pointerleave", () => {
        this.hovered = false;
        if (this.biteEl) {
          this.biteEl.style.transition = "transform 0.35s ease-out";
          this.biteEl.style.transform = "scale(0)";
        }
      });
    }

    startLoop() {
      const step = (now) => {
        this.rafId = requestAnimationFrame(step);

        const dt = this.lastTime ? Math.min(0.05, (now - this.lastTime) / 1000) : 1 / 60;
        this.lastTime = now;

        const st = this.chase;
        const t = Math.max(0, Math.min(100, Math.round(this.smoothness))) / 100;
        const tau = FOLLOW_TAU_MIN + t * (FOLLOW_TAU_MAX - FOLLOW_TAU_MIN);

        const k = 1 - Math.exp(-dt / tau);
        const dx = (st.tx - st.x) * k;
        const dy = (st.ty - st.y) * k;
        st.x += dx;
        st.y += dy;

        const speed = Math.hypot(dx, dy) / dt;
        const want = Math.min(SQUASH_MAX, 1 + speed * SQUASH_PER_PX_PER_SEC);
        st.squash += (want - st.squash) * (1 - Math.exp(-dt / SQUASH_TAU));

        if (speed > 8) {
          st.angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        }

        if (this.followEl) {
          this.followEl.style.transform = `translate(${st.x}px, ${st.y}px)`;
        }
        if (this.squashEl) {
          this.squashEl.style.transform = `rotate(${st.angle}deg) scale(${st.squash}, ${1 / st.squash})`;
        }
      };

      this.rafId = requestAnimationFrame(step);
    }
  }

  function initLiquidCarveButton(element, options) {
    if (!element) return null;
    return new LiquidCarveButton(element, options);
  }

  function initAllLiquidCarveButtons(selector = ".liquid-carve-btn") {
    const elements = document.querySelectorAll(selector);
    const instances = [];
    elements.forEach((el) => {
      instances.push(new LiquidCarveButton(el));
    });
    return instances;
  }

  global.LiquidCarveButton = LiquidCarveButton;
  global.initLiquidCarveButton = initLiquidCarveButton;
  global.initAllLiquidCarveButtons = initAllLiquidCarveButtons;
})(window);
