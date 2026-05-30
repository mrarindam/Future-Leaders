import { useState } from 'react';
import sakunaPhoto from '../../images/dp/sakuna.webp';
import tojiPhoto from '../../images/dp/toji.webp';
import arindamPhoto from '../../images/dp/arindam.webp';
import vikingPhoto from '../../images/dp/viking.webp';

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

  const members = [
    {
      name: 'SAKUNA',
      photo: sakunaPhoto,
      colorClass: 'text-[#00D9FF] dark:text-[#00D9FF]',
      role: 'Founder',
      bio: 'Visionary and strategist. Founder of the Future Leaders network and a well-known Web3 influencer',
      twitter: 'https://x.com/0Sakuna'
    },
    {
      name: 'TOJI',
      photo: tojiPhoto,
      colorClass: 'text-[#7A5CFF] dark:text-[#B295FF]',
      role: 'Co-Founder',
      bio: 'Co-Founder of Future Leaders with expertise in Web3 marketing, business development, strategic partnerships, community growth and project scaling. Specialized in connecting projects with KOLs, communities, investors and ecosystem partners to drive growth, visibility and long-term success in the Web3 space.',
      twitter: 'https://x.com/Tojizeninhc'
    },
    {
      name: 'VIKING',
      photo: vikingPhoto,
      colorClass: 'text-[#FF7A5C] dark:text-[#FF7A5C]',
      role: 'Co-Founder',
      bio: 'Web3 strategist, investor and marketing advisor specializing in community growth, brand development and strategic partnerships. As Co-Founder of FutureLeaders he helps projects scale their presence and build thriving communities across the Web3 ecosystem.',
      twitter: 'https://x.com/badviking1995'
    },
    {
      name: 'ARINDAM',
      photo: arindamPhoto,
      colorClass: 'text-[#FF80B7] dark:text-[#FF80B7]',
      role: 'MOD/DEV',
      bio: 'Full Stack Web Developer & Moderator of Future Leaders',
      twitter: 'https://x.com/ExeArindam'
    }
  ];

  return (
    <section
      id="team"
      className="relative py-24 sm:py-32 bg-transparent text-base-strong overflow-hidden"
    >
      <div className="absolute top-[20%] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,0,0,0.04)_0%,transparent_60%)] pointer-events-none filter blur-2xl dark:bg-[radial-gradient(circle,rgba(255,255,255,0.01)_0%,transparent_60%)]" />

      <div className="max-w-[1800px] mx-auto w-full px-5 sm:px-8 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className="reveal text-center mb-16 lg:mb-20 select-none">
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] uppercase tracking-tight mb-5 mt-5 text-base-strong leading-none">
            The <span className="text-gradient text-glow font-black">Operators</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base-muted text-sm sm:text-base leading-relaxed">All team members are transparent and do not hide their identities. During our time working together, there have been no incidents that could call into question our reputation or the security of our partnership.</p>
        </div>

        {/* 3-Column Interactive Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Column 1 (Left 25%): Operator Nav */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col justify-center lg:justify-start gap-4 lg:gap-8 flex-wrap lg:flex-nowrap border-b lg:border-b-0 lg:border-r border-base pb-6 lg:pb-0 lg:pr-8">
            {members.map((member, i) => (
              <button
                key={member.name}
                onMouseEnter={() => setActiveOperator(i)}
                onClick={() => setActiveOperator(i)}
                className={`text-left font-display font-black text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] uppercase tracking-tight py-2 lg:py-4 transition-all duration-300 outline-none ${activeOperator === i
                  ? `${member.colorClass} scale-105 opacity-100 pl-0 lg:pl-4`
                  : 'text-base-soft opacity-50 hover:opacity-80 hover:scale-102'
                  }`}
              >
                {member.name}
              </button>
            ))}
          </div>

          {/* Column 2 (Center 40%): Hero Portrait Reveal */}
          <div className="lg:col-span-5 h-[340px] sm:h-[480px] w-full flex items-center justify-center relative">
            <div className="w-[280px] sm:w-[380px] aspect-[3/4] rounded-3xl overflow-hidden border border-base shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] relative bg-black/[0.02]">
              {members.map((member, i) => (
                <div
                  key={member.name}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeOperator === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
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
          <div className="lg:col-span-4 lg:pl-6 text-center lg:text-left min-h-[220px] flex flex-col justify-center">
            <div className="operator-details-container space-y-4">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-base-strong tracking-wider leading-none">
                {members[activeOperator].name}
              </h3>
              <p className="font-display tracking-[0.3em] uppercase text-xs font-bold text-base-muted">
                {members[activeOperator].role}
              </p>
              <p className="text-base-soft text-sm sm:text-base leading-relaxed">
                {members[activeOperator].bio}
              </p>

              <div className="flex justify-center lg:justify-start gap-4 pt-4 select-none">
                <a
                  href={members[activeOperator].twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-display hover:scale-105 transition-all border border-base text-base-strong hover:border-cyan-brand"
                >
                  <Icon.X className="w-4 h-4" />
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
