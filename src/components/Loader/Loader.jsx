import { useEffect, useState } from 'react';
import logoImg from '../../images/logo.jpg';
import './Loader.css';

const TOTAL_BLOCKS = 22;
const TOTAL_DURATION = 1800; // ms — full progress fill

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Lock the page so the user can't scroll while loading
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / TOTAL_DURATION);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          // Make sure we're at the very top, then release scroll
          window.scrollTo(0, 0);
          html.style.overflow = prevHtmlOverflow;
          body.style.overflow = prevBodyOverflow;
          // Tell GSAP/Lenis to recalc now that the page is interactive
          window.dispatchEvent(new Event('fl-loader-done'));
          setHidden(true);
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const filled = Math.floor(progress * TOTAL_BLOCKS);
  const pct = Math.round(progress * 100);

  return (
    <div className={`hud-loader${hidden ? ' hud-loader--hidden' : ''}`} aria-hidden={hidden}>
      <div className="hud-loader__grid" aria-hidden />

      <div className="hud-loader__panel">
        <div className="hud-loader__row hud-loader__row--text">
          <div className="hud-loader__logo">
            <img src={logoImg} alt="" />
          </div>
          <div className="hud-loader__label">
            <span>INITIALIZING...</span>
            <span className="hud-loader__pct">{pct}%</span>
          </div>
        </div>

        <div className="hud-loader__row hud-loader__row--bar">
          {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => {
            let state = 'empty';
            if (i < filled) state = 'full';
            else if (i === filled) state = 'partial';
            return (
              <span key={i} className={`hud-loader__block hud-loader__block--${state}`} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
