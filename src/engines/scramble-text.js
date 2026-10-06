/**
 * Scramble Text — Originkit
 * Cybernetic glyph decoding and matrix decryption animation
 * 
 * Ultra-optimized performance:
 * - Word boundary preservation to eliminate line-wrap bouncing / jitter
 * - Pre-built static character spans (zero DOM recreation in animation loop)
 * - Throttled tick rate (35ms) for authentic matrix ticker effect without CPU thrash
 * - Smooth easeOutCubic left-to-right progressive unlock
 */

(function (global) {
  // Curated glyphs that match monospace/pixel typography without font metric distortion
  const DEFAULT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=-_/~!?";

  class TextScrambler {
    constructor(element, options = {}) {
      if (!element) return;
      this.element = element;
      this.originalText = (options.text || element.getAttribute('data-scramble') || element.textContent).trim();
      this.glyphs = options.glyphs || DEFAULT_GLYPHS;
      this.duration = options.duration || 850; // ms
      this.stepTime = options.stepTime || 36; // ms per glyph shuffle tick
      this.isAnimating = false;
      this.rafId = null;
      this.lastTick = 0;

      this.element.setAttribute('data-scramble', this.originalText);

      // Build static character spans ONCE
      this.buildCharSpans();

      // Re-scramble smoothly on mouse hover
      if (options.hover !== false) {
        this.element.addEventListener('mouseenter', () => {
          this.scramble();
        });
      }
    }

    buildCharSpans() {
      const words = this.originalText.split(" ");
      this.charSpans = [];
      this.element.innerHTML = "";

      words.forEach((word, wordIndex) => {
        const wordWrap = document.createElement("span");
        wordWrap.className = "scramble-word";

        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          const span = document.createElement("span");
          span.className = "scramble-char";
          span.textContent = char;
          span.setAttribute("data-orig", char);
          wordWrap.appendChild(span);
          this.charSpans.push(span);
        }

        this.element.appendChild(wordWrap);

        // Add regular space between words
        if (wordIndex < words.length - 1) {
          const space = document.createTextNode(" ");
          this.element.appendChild(space);
        }
      });
    }

    scramble() {
      if (this.isAnimating && this.rafId) {
        cancelAnimationFrame(this.rafId);
      }

      if (!this.charSpans || this.charSpans.length === 0) {
        this.buildCharSpans();
      }

      const totalChars = this.charSpans.length;
      if (totalChars === 0) return;

      const startTime = performance.now();
      this.lastTick = startTime;
      this.isAnimating = true;

      for (let i = 0; i < totalChars; i++) {
        this.charSpans[i].classList.add("scrambling");
      }

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / this.duration);
        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        const shouldShuffle = (now - this.lastTick) >= this.stepTime;
        if (shouldShuffle) {
          this.lastTick = now;
        }

        let allSettled = true;

        for (let i = 0; i < totalChars; i++) {
          const span = this.charSpans[i];
          const orig = span.getAttribute("data-orig");
          const threshold = i / totalChars;

          if (ease >= threshold + (1 / totalChars) * 0.25) {
            // Character is solved / locked
            if (span.textContent !== orig) {
              span.textContent = orig;
            }
            if (span.classList.contains("scrambling")) {
              span.classList.remove("scrambling");
            }
          } else {
            allSettled = false;
            if (shouldShuffle) {
              const randGlyph = this.glyphs[Math.floor(Math.random() * this.glyphs.length)];
              span.textContent = randGlyph;
            }
          }
        }

        if (progress < 1 && !allSettled) {
          this.rafId = requestAnimationFrame(tick);
        } else {
          // Final clean lock
          for (let i = 0; i < totalChars; i++) {
            const span = this.charSpans[i];
            span.textContent = span.getAttribute("data-orig");
            span.classList.remove("scrambling");
          }
          this.isAnimating = false;
          this.rafId = null;
        }
      };

      this.rafId = requestAnimationFrame(tick);
    }
  }

  function initScrambleText(element, options) {
    if (!element) return null;
    return new TextScrambler(element, options);
  }

  global.TextScrambler = TextScrambler;
  global.initScrambleText = initScrambleText;
})(window);
