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
    { name: 'SAKUNA', photo: sakunaPhoto, c: 'cyan', role: 'Founder', bio: 'Visionary and strategist Sakuna also a well-known Web3 influencer', x: 'https://x.com/0Sakuna'},
    { name: 'TOJI', photo: tojiPhoto, c: 'purple', role: 'Co-Founder', bio: 'Expertise in Web3 marketing, business development, strategic partnerships, community growth, and project scaling. Specialized in connecting projects with KOLs, communities, investors and ecosystem partners to drive growth, visibility and long-term success in the Web3 space.', x: 'https://x.com/Tojizeninhc'},
    { name: 'VIKING', photo: vikingPhoto, c: 'purple', role: 'Co-Founder', bio: 'Web3 strategist, investor and marketing advisor specializing in community growth, brand development and strategic partnerships. As Co-Founder of Future Leaders he helps projects scale their presence and build thriving communities across the Web3 ecosystem.', x: 'https://x.com/badviking1995'},
    { name: 'ARINDAM', photo: arindamPhoto, c: 'cyan', role: 'Dev/Mod', bio: 'Full Stack Web Developer + Community Manager', x: 'https://x.com/ExeArindam'},
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
                  href={members[activeOperator].x}
                  target="_blank"
                  rel="noopener noreferrer"
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
