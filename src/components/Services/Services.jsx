import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: '01',
    title: 'KOL Marketing',
    desc: 'Strategic paid posting campaigns with trusted KOLs across the Web3 space. We position projects in front of the right audiences to drive awareness, attract new users and accelerate market presence.',
  },
  {
    num: '02',
    title: 'NFT Collaboration',
    desc: 'Deep partnership with vetted NFT teams to amplify launches, mints, and roadmap execution. We collaborate closely to secure exclusive allocations and strategic partnerships that drive mutual value.',
  },
  {
    num: '03',
    title: 'Community Building',
    desc: 'End-to-end community growth across Discord, Telegram, and X. We focus on real engagement, organic expansion and building loyal communities that stay active long after launch.',
  },
  {
    num: '04',
    title: 'Community Management',
    desc: 'Full-stack community operations covering daily engagement, announcements, member support and activity flow. We keep your community organized, energetic and professionally managed around the clock.',
  },
  {
    num: '05',
    title: 'Discord Moderation',
    desc: 'Experienced moderation teams that manage chats, support members, prevent spam and maintain a healthy server environment. We keep communities safe, active and ready to scale.',
  },
  {
    num: '06',
    title: 'Ambassador Programs',
    desc: 'Custom ambassador programs designed to deepen community engagement and expand project awareness. We connect projects with active supporters from our network who drive ecosystem growth from within.',
  },
  {
    num: '07',
    title: 'Marketing Support',
    desc: "Complete marketing execution tailored to your project's stage and goals. From promotions and partnerships to engagement strategy and campaign planning, we help projects scale with precision.",
  },
  {
    num: '08',
    title: 'Development Support',
    desc: 'Direct access to vetted developers and technical specialists when projects need them. From website builds and ecosystem tools to integrations and on-demand technical support, we cover the full stack.',
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightListRef = useRef(null);

  useEffect(() => {
    // Only initialize GSAP ScrollTriggers on desktop screens.
    // This optimizes mobile performance and prevents layout glitches.
    if (window.innerWidth < 1024) return;

    const items = gsap.utils.toArray(".services-nav-item");
    if (!items.length) return;

    // Highlight the active service as each title scrolls through the viewport.
    const triggers = items.map((item, idx) =>
      ScrollTrigger.create({
        trigger: item,
        start: "top 55%",
        end: "bottom 45%",
        invalidateOnRefresh: true,
        onToggle: (self) => {
          if (self.isActive) {
            setActiveService(idx);
          }
        }
      })
    );

    let pin;
    if (leftColRef.current && containerRef.current) {
      pin = ScrollTrigger.create({
        trigger: leftColRef.current,
        start: "center center",
        endTrigger: containerRef.current,
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    }

    return () => {
      triggers.forEach((t) => t.kill());
      if (pin) pin.kill();
    };
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#eaebeb] text-black border-b border-black/[0.04]"
    >
      <div className="max-w-[1800px] mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">

          {/* DESKTOP LEFT — description card; pinned to viewport center via GSAP */}
          <div
            ref={leftColRef}
            className="hidden lg:flex lg:col-span-5 lg:col-start-1 flex-col justify-center select-none"
          >
            <div className="service-desc-frame relative w-full rounded-3xl overflow-hidden bg-white p-10 sm:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.05)]">
              {SERVICES.map((s, idx) => (
                <div
                  key={idx}
                  className={`service-desc-panel absolute inset-0 flex flex-col justify-center p-10 sm:p-12 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeService === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                >
                  <div className="font-mono text-xs tracking-[0.35em] text-black/45 mb-4">
                    [ {s.num} / {String(SERVICES.length).padStart(2, '0')} ]
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-black mb-5 leading-[1.05]">
                    {s.title}
                  </h3>
                  <p className="text-black/75 text-base sm:text-lg leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
              {/* spacer to give the absolute panels a height */}
              <div className="invisible py-10 sm:py-12">
                <div className="font-mono text-xs tracking-[0.35em] mb-4">[ 00 / 00 ]</div>
                <h3 className="font-display font-black text-2xl sm:text-3xl mb-5 leading-[1.05]">PLACEHOLDER TITLE</h3>
                <p className="text-base sm:text-lg leading-relaxed">
                  {SERVICES[0].desc}
                </p>
              </div>
            </div>
          </div>

          {/* DESKTOP RIGHT — scrollable service titles list */}
          <div className="hidden lg:flex lg:col-span-7 lg:col-start-6 flex-col justify-start">
            <div ref={rightListRef} className="services-nav-list relative z-10 flex flex-col w-full border-t border-black/[0.08]">
              {SERVICES.map((s, idx) => (
                <div
                  key={idx}
                  className={`services-nav-item services-nav-item-${idx} py-10 md:py-14 border-b border-black/[0.08] cursor-pointer flex items-center justify-between transition-all select-none px-6 ${activeService === idx ? 'bg-white opacity-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] pl-8 font-black border-l-4 border-black' : 'opacity-35 font-normal'
                    }`}
                  style={{ color: '#000' }}
                >
                  <span className="font-display uppercase tracking-tight text-xl sm:text-2xl lg:text-3xl leading-none">
                    {s.title}
                  </span>
                  <span className="font-display text-sm tracking-[0.2em] opacity-60">[{s.num}]</span>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE — interactive accordion list */}
          <div className="w-full lg:hidden">
            <div className="services-nav-list flex flex-col w-full border border-black/[0.06] bg-white rounded-3xl overflow-hidden p-3 sm:p-4 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
              {SERVICES.map((s, idx) => {
                const isActive = activeService === idx;
                return (
                  <div
                    key={idx}
                    className={`services-mobile-item py-5 px-4 sm:px-6 border-b border-black/[0.05] last:border-b-0 cursor-pointer transition-all duration-300 rounded-2xl ${
                      isActive 
                        ? 'bg-[#eaebeb]/40 border-l-4 border-black font-black opacity-100' 
                        : 'opacity-40 font-normal active:bg-black/[0.02]'
                    }`}
                    onClick={() => setActiveService(isActive ? -1 : idx)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display uppercase tracking-tight text-base sm:text-lg leading-none text-black">
                        {s.title}
                      </span>
                      <span className="font-display text-xs tracking-wider opacity-60 text-black">[{s.num}]</span>
                    </div>
                    
                    <div
                      className="transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden"
                      style={{
                        maxHeight: isActive ? '300px' : '0px',
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? '14px' : '0px'
                      }}
                    >
                      <p className="text-black/75 text-sm leading-relaxed border-t border-black/[0.06] pt-3 font-normal">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
