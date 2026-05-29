import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';
import heroBg from '../../images/bg.jpg';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_BLOCKS = [
  {
    title: "FULL-SERVICE WEB3 MARKETING AGENCY",
    desc: "We help Web3 projects grow through real community building, strategic marketing, and strong ecosystem support. From paid promotions and KOL campaigns to NFT collaborations, Discord management, ambassador programs, and growth support our team works closely with projects to build genuine engagement and long-term growth. With access to 280+ Web3 KOLs and active communities across X, Discord, and Telegram, we help projects reach real users and build strong visibility in the space."
  }
];

export default function Hero() {
  const sectionRef = useRef(null);
  const textWrapRef = useRef(null);
  const previewRef = useRef(null);
  const curtainRef = useRef(null);
  const blockRefs = useRef([]);

  /* ============ ONE PIN, FOUR PHASES ============ */
  useEffect(() => {
    const section = sectionRef.current;
    const wrap = textWrapRef.current;
    const preview = previewRef.current;
    const curtain = curtainRef.current;
    const blocks = blockRefs.current.filter(Boolean);
    if (!section || !wrap || !preview || !curtain || !blocks.length) return;

    // Initial states for non-default elements
    gsap.set(preview, { xPercent: 100 });
    gsap.set(curtain, { yPercent: -100 });
    blocks.forEach((b, i) => {
      gsap.set(b, i === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=420%',
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        // scrub never lands exactly on progress 0, so force a clean resting state
        // whenever we scroll back to the very top.
        onLeaveBack: () => {
          gsap.set(wrap, { clearProps: 'transform,opacity' });
        },
      }
    });

    // Phase 1 (0 → 0.20) — FUTURE LEADERS zoom out
    tl.to(wrap, { scale: 14, opacity: 0, ease: 'power3.in', duration: 0.20 }, 0);

    // Phase 2 (0.20 → 0.38) — yellow About slides in from right
    tl.to(preview, { xPercent: 0, ease: 'power2.out', duration: 0.18 }, 0.20);

    // Phase 3 (0.38 → 0.62) — hold the about preview so user can read
    tl.to({}, { duration: 0.24 }, 0.38);

    // Phase 4 (0.62 → 1.0) — yellow about slides LEFT off-screen,
    // Services curtain drops DOWN from top to cover the screen
    tl.to(preview, { xPercent: -100, ease: 'power2.inOut', duration: 0.38 }, 0.62)
      .to(curtain, { yPercent: 0, ease: 'power2.inOut', duration: 0.38 }, 0.62);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-section relative h-screen w-full overflow-hidden select-none"
    >
      <img src={heroBg} alt="" className="hero-bg-image" aria-hidden="true" />

      <div ref={textWrapRef} className="hero-text-wrapper">
        <h1 className="hero-fl-text">
          <span className="hero-fl-line">FUTURE</span>
          <span className="hero-fl-line">LEADERS</span>
        </h1>
      </div>

      <div ref={previewRef} className="hero-about-preview" id="about">
        <div className="hero-preview-inner max-w-[1800px] mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="hero-who-wrapper lg:col-span-5 flex flex-col justify-center pl-6 sm:pl-10 border-l-[5px] border-black/80">
              <h2 className="hero-who-heading font-display font-black text-black tracking-tight uppercase leading-[0.82]">
                WHO<br />WE ARE?
              </h2>
            </div>
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[380px]">
              {ABOUT_BLOCKS.map((block, idx) => (
                <div
                  key={idx}
                  ref={el => blockRefs.current[idx] = el}
                  className="hero-about-block absolute inset-0 flex flex-col justify-center gap-5 max-w-3xl"
                >
                  <h3 className="hero-about-title font-display font-black tracking-wide uppercase leading-[1.05] text-[#1a1300]">
                    {block.title}
                  </h3>
                  <p className="hero-about-desc text-[#181100] leading-[1.55] font-normal">
                    {block.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES CURTAIN — drops down from top while yellow slides left */}
      <div ref={curtainRef} className="hero-services-curtain" aria-hidden="true">
        <div className="hero-curtain-inner">
          <div className="hero-curtain-eyebrow font-mono">[ NEXT ]</div>
          <div className="hero-curtain-title font-display font-black uppercase">
            SERVICES
          </div>
          <p className="hero-curtain-desc font-mono">
            WE SPECIALISE IN TWO MAIN AREAS, WHICH OFTEN COEXIST: DIGITAL & BRAND DESIGN. THIS COMBINATION OF SKILLS ALLOWS US TO SEAMLESSLY CRAFT AND SHIP ICONIC BRAND IDENTITIES.
          </p>
        </div>
      </div>
    </section>
  );
}
