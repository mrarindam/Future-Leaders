import { Zap, Network, ShieldCheck, Eye } from 'lucide-react';

export default function WhyUs() {
  const items = [
    {
      icon: Zap,
      title: 'Fast Engagement',
      color: 'cyan'
    },
    {
      icon: Network,
      title: 'Strong Community Network',
      color: 'purple'
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Community',
      color: 'cyan'
    },
    {
      icon: Eye,
      title: 'Maximum Transparency',
      color: 'purple'
    }
  ];

  return (
    <section id="why" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-transparent overflow-hidden">
      <div className="max-w-[1800px] mx-auto">

        {/* Section Header */}
        <div className="reveal text-center mb-16 lg:mb-20 select-none">
          <h2 className="section-title text-4xl sm:text-5xl md:text-6xl mb-5 mt-5 text-base-strong">
            Why customers <span className="text-gradient font-black">choose us</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base-muted text-base sm:text-lg leading-relaxed">
            Four pillars that define the Future Leaders ecosystem and standard of service.
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const IconComponent = item.icon;
            const accentColor = item.color === 'cyan' ? 'var(--cyan-accent)' : 'var(--purple-accent)';
            const hoverBorder = item.color === 'cyan' ? 'hover:border-cyan-500/30' : 'hover:border-purple-500/30';

            return (
              <div
                key={item.title}
                className={`reveal ${idx % 4 === 1 ? 'reveal-d1' : idx % 4 === 2 ? 'reveal-d2' : idx % 4 === 3 ? 'reveal-d3' : ''} relative overflow-hidden glass rounded-3xl p-8 h-[240px] flex flex-col items-center justify-center text-center group cursor-pointer hover:scale-[1.03] hover:shadow-glow transition-all duration-300 ${hoverBorder}`}
                style={{ borderColor: 'var(--border)' }}
              >
                {/* Glowing Background Accent */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-white/[0.01] pointer-events-none" 
                />
                <div 
                  className="absolute bottom-[-50px] w-32 h-32 rounded-full blur-[60px] opacity-10 transition-all duration-500 group-hover:opacity-30"
                  style={{ background: accentColor }}
                />

                {/* Professional Glowing Icon Container */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 bg-white/5 mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ 
                    boxShadow: `inset 0 0 16px rgba(255,255,255,0.02)`,
                    borderColor: `rgba(255,255,255,0.08)`
                  }}
                >
                  <IconComponent 
                    className="w-8 h-8 transition-all duration-300" 
                    style={{ 
                      color: accentColor,
                      filter: `drop-shadow(0 0 6px ${accentColor})`
                    }}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display font-black text-lg sm:text-xl text-base-strong leading-tight uppercase tracking-wider group-hover:text-gradient transition-all duration-300 select-none">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
