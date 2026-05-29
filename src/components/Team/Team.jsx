import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import sakunaPhoto from '../../images/dp/sakuna.webp';
import tojiPhoto from '../../images/dp/toji.webp';
import arindamPhoto from '../../images/dp/arindam.webp';
import vikingPhoto from '../../images/dp/viking.webp';
import './Team.css';

gsap.registerPlugin(ScrollTrigger);

/* ============ LOCAL ICONS ============ */
const Icon = {
  Discord: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.957 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  X: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

export default function Team() {
  const [activeOperator, setActiveOperator] = useState(0);
  const containerRef = useRef(null);

  const members = [
    { name: 'SAKUNA', photo: sakunaPhoto, c: 'cyan', role: 'Founder', bio: 'Architecting the vision and forging tier-1 partnerships across Web3.' },
    { name: 'TOJI', photo: tojiPhoto, c: 'purple', role: 'Strategy Lead', bio: 'Building the playbooks that turn engagement into measurable growth.' },
    { name: 'ARINDAM', photo: arindamPhoto, c: 'cyan', role: 'Community Ops', bio: 'Running the day-to-day — keeping members engaged, rewarded and informed.' },
    { name: 'VIKING', photo: vikingPhoto, c: 'purple', role: 'Raid Captain', bio: 'Commanding the raid squads — execution speed and signal that move metrics.' }
  ];

  let teamScroll;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    teamScroll = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=260%",
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const idx = Math.min(3, Math.floor(self.progress * 4));
        setActiveOperator(idx);
      }
    });

    return () => {
      if (teamScroll) teamScroll.kill();
    };
  }, []);

  // Tilt-out the previous section ("The Edge We Offer" / Rewards) as Team enters
  // + slide Team in from the left at the same time
  useEffect(() => {

    const rewardsEl = document.getElementById('rewards');
    const team = containerRef.current;
    if (!rewardsEl || !team) return;

    const tiltST = ScrollTrigger.create({
      trigger: team,
      start: 'top bottom',
      end: 'top top',
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        // Apply the 3D promotion props together with the transform, so the heavy
        // GPU layer only exists while the tilt is animating.
        gsap.set(rewardsEl, {
          transformPerspective: 1400,
          transformOrigin: 'center top',
          force3D: true,
          rotationX: -28 * p,
          skewY: -5 * p,
          scale: 1 - 0.18 * p,
          opacity: 1 - 0.55 * p,
        });
        gsap.set(team, {
          force3D: true,
          xPercent: -25 * (1 - p),
          opacity: 0.4 + 0.6 * p,
        });
      },
      onToggle: (self) => {
        // When the tilt range is exited (scrolling above it back toward the Hero,
        // or below it once Team is pinned), strip the 3D transform + perspective
        // so the full-screen Rewards section is no longer a permanently
        // GPU-promoted layer compositing behind every other section. Leaving it
        // promoted is what caused the flicker/lag/text-cut on the reverse scroll
        // back up to the Hero once Team had been reached.
        if (!self.isActive) {
          gsap.set(rewardsEl, { clearProps: 'transform,perspective,opacity' });
          gsap.set(team, { clearProps: 'transform,opacity' });
        }
      }
    });

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      tiltST.kill();
      clearTimeout(refreshTimer);
      gsap.set(rewardsEl, { clearProps: 'all' });
      gsap.set(team, { clearProps: 'all' });
    };
  }, []);

  const handleOperatorClick = (idx) => {
    if (!teamScroll) return;
    const start = teamScroll.start;
    const end = teamScroll.end;
    const targetScroll = start + (idx / 3) * (end - start);
    window.scrollTo({
      top: targetScroll + 10,
      behavior: "smooth"
    });
  };

  return (
    <section
      id="team"
      ref={containerRef}
      className="relative h-screen flex flex-col justify-center bg-white overflow-hidden"
    >
      <div className="absolute top-[20%] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,0,0,0.04)_0%,transparent_60%)] pointer-events-none filter blur-2xl" />

      <div className="max-w-[1800px] mx-auto w-full px-5 sm:px-8 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className="reveal text-center mb-6 sm:mb-8 lg:mb-20">
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-[6rem] uppercase tracking-tight mb-2 sm:mb-5 mt-2 text-black leading-none">The Operators</h2>
          <p className="max-w-2xl mx-auto text-black/60 text-xs sm:text-base lg:text-lg leading-relaxed">Four leaders building the future of Web3 community ops.</p>
        </div>

        {/* 3-Column Interactive Layout */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">

          {/* Column 1 (Left 25%): Operator Nav */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-8 flex-wrap lg:flex-nowrap border-b lg:border-b-0 lg:border-r border-black/[0.08] pb-4 sm:pb-6 lg:pb-0 lg:pr-8">
            {members.map((member, i) => (
              <button
                key={member.name}
                onClick={() => handleOperatorClick(i)}
                className={`text-center lg:text-left font-display font-black text-sm sm:text-2xl md:text-3xl lg:text-[2.2rem] uppercase tracking-tight py-1 sm:py-2 lg:py-4 transition-all duration-300 outline-none ${
                  activeOperator === i ? 'text-[var(--cyan-accent)] scale-105 opacity-100 pl-0 lg:pl-4' : 'text-black/40 opacity-50 hover:opacity-80 hover:scale-102'
                }`}
              >
                {member.name}
              </button>
            ))}
          </div>

          {/* Column 2 (Center 40%): Hero Portrait Reveal */}
          <div className="lg:col-span-5 h-[240px] sm:h-[400px] lg:h-[480px] w-full flex items-center justify-center relative">
            <div className="w-[180px] sm:w-[300px] lg:w-[380px] aspect-[3/4] rounded-3xl overflow-hidden border border-black/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.15)] relative bg-black/[0.02]">
              {members.map((member, i) => (
                <div
                  key={member.name}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    activeOperator === i ? 'opacity-100 scale-100 clip-reveal' : 'opacity-0 scale-110 clip-hidden pointer-events-none'
                  }`}
                  style={{
                    clipPath: activeOperator === i ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
                  }}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 (Right 35%): Operator Details */}
          <div className="lg:col-span-4 lg:pl-6 text-center lg:text-left min-h-[140px] sm:min-h-[220px] flex flex-col justify-center">
            <div className="operator-details-container space-y-2 sm:space-y-4">
              <h3 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-black tracking-wider leading-none">
                {members[activeOperator].name}
              </h3>
              <p className="font-display tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-sm font-bold text-black/70">
                {members[activeOperator].role}
              </p>
              <p className="text-black/70 text-xs sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                {members[activeOperator].bio}
              </p>

              <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
                <a
                  href="#cta"
                  className="btn-discord inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-xs font-display hover:scale-105 transition-all bg-black text-white"
                >
                  <Icon.Discord className="w-3.5 h-3.5" />
                  DISCORD
                </a>
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-xs font-display hover:scale-105 transition-all border border-black/30 text-black hover:border-black"
                >
                  <Icon.X className="w-3.5 h-3.5" />
                  TWITTER
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
