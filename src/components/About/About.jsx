import navLogoImg from '../../images/future leaders.png';

export default function About() {
  const expertises = [
    'KOL & Influencer Marketing (X/Twitter)',
    'Ambassador Program Strategy & Execution',
    'Improving Wallchain and Sorsa Score',
    'Help Builder to build Fast websites'
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-transparent overflow-hidden">

      <div className="max-w-[1800px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="reveal text-center mb-16 lg:mb-20 select-none">
          <h2 className="section-title text-4xl sm:text-5xl md:text-6xl mb-5 mt-5 text-base-strong">
            Who We Are
          </h2>
          <p className="max-w-2xl mx-auto text-base-muted text-base sm:text-lg leading-relaxed">
            Future Leaders is a premium Web3 marketing agency and developer hub, partnering with 280+ KOLs and launching custom ecosystem tools.
          </p>
        </div>

        {/* Modern 2-Column Creative Split Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Core Expertise details */}
          <div className="lg:col-span-7 flex flex-col gap-8 reveal">
            <div>
              <span className="badge mb-4">
                <span className="badge-dot" style={{ background: '#ffffff' }} />
                Expertise
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-base-strong uppercase tracking-tight mb-6">
                Core Expertise
              </h3>

              {/* Premium List Items */}
              <ul className="space-y-4">
                {expertises.map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 select-none"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        color: '#ffffff',
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-base-soft text-base sm:text-lg font-medium leading-relaxed">
                      {exp}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Glass Experience Card */}
            <div
              className="glass p-6 sm:p-8 rounded-3xl select-none relative overflow-hidden group hover:scale-[1.01] transition-all duration-300 w-full"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="font-display text-xs tracking-[0.25em] text-base-faint uppercase mb-2">Experience</p>
              <h4 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight leading-tight">
                2 Years in Marketing & 5 Years in Development
              </h4>
            </div>
          </div>

          {/* Right Column: Large Logo Showcase Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center reveal reveal-d2">
            <div className="relative group select-none">

              {/* Outer logo stack glass card */}
              <div className="glass rounded-[2.5rem] p-12 sm:p-16 flex items-center justify-center shadow-2xl relative z-10 border border-white/10 group-hover:border-white/20 transition-all duration-500 hover:scale-[1.01]">
                <img
                  src={navLogoImg}
                  alt="Future Leaders Showcase Logo"
                  className="w-64 sm:w-80 h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)] transition-all duration-700 group-hover:scale-105 group-hover:rotate-2"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
