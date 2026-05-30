import { useState, useRef } from 'react';
import KeycapBoard from '../KeycapBoard/KeycapBoard.jsx';

export default function Hero() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000, active: false });
  const [hoverState, setHoverState] = useState(false);

  const onMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      });
    }
  };

  const onMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000, active: false });
    setHoverState(false);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative min-h-screen flex items-center pt-24 pb-20 px-5 sm:px-8 lg:px-16 overflow-hidden select-none"
    >
      {/* Noise overlay and grid background */}
      <div className="bg-noise" />
      <div className="interactive-grid-bg opacity-45" />

      {/* Background orbs */}
      <div className="orb" style={{ width: 340, height: 340, background: 'rgba(0,217,255,0.3)', top: '10%', left: -80 }} />
      <div className="orb" style={{ width: 420, height: 420, background: 'rgba(122,92,255,0.25)', top: '30%', right: -100, animationDelay: '-3s' }} />

      <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center relative z-10">

        {/* LEFT SIDE: EDITORIAL CONTENT */}
        <div className="lg:col-span-5 text-left order-2 lg:order-1">

          <h1 className="reveal reveal-d1 gravitas-one-regular text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] text-base-strong mb-6 tracking-tight">
            FUTURE<br />
            <span className="text-gradient text-glow text-[clamp(2rem,6vw,4.8rem)]">LEADERS</span>
          </h1>

          <p className="reveal reveal-d3 max-w-xl text-base-muted text-base sm:text-lg leading-relaxed mb-10">
            We’re building a full-service agency for projects across the ecosystem. We provide community managers, developers, callers for posting and promotion, moderators for Discord, community building and marketing support. Our team can support and grow projects end to end. If you’d like, I can share a quick overview of how we work and our availability.
          </p>

          <div className="reveal reveal-d3 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="btn-primary btn-slide inline-flex items-center gap-2 select-none cursor-pointer font-black"
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
            >
              <span className="btn-slide-text-wrapper">
                <span className="btn-slide-text" data-text="Start Project">Start Project</span>
              </span>
            </a>
            <a
              href="https://discord.gg/SdP2sAD8zT"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost btn-slide inline-flex items-center gap-2 font-bold"
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
            >
              <span className="btn-slide-text-wrapper">
                <span className="btn-slide-text" data-text="Join Discord">Join Discord</span>
              </span>
            </a>
          </div>

        </div>

        {/* RIGHT SIDE: SCATTERED KEYCAPS COMPOSITION */}
        <div className="lg:col-span-7 h-[330px] sm:h-[450px] md:h-[620px] relative order-1 lg:order-2 select-none pointer-events-none">
          <KeycapBoard mousePos={mousePos} setHoverState={setHoverState} />
        </div>

      </div>
    </section>
  );
}

