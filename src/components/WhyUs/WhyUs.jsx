import fastImg from '../../images/whyus/fast.webp';
import teamImg from '../../images/whyus/team.webp';
import shieldImg from '../../images/whyus/shield.webp';
import transparencyImg from '../../images/whyus/transperency.webp';

export default function WhyUs() {
  const items = [
    {
      img: fastImg,
      title: 'Fast Engagement'
    },
    {
      img: teamImg,
      title: 'Strong Community Network'
    },
    {
      img: shieldImg,
      title: 'Trusted Community'
    },
    {
      img: transparencyImg,
      title: 'Maximum Transparency'
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

        {/* 4-Card Responsive Grid - Image and Title only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className={`reveal ${idx % 4 === 1 ? 'reveal-d1' : idx % 4 === 2 ? 'reveal-d2' : idx % 4 === 3 ? 'reveal-d3' : ''} relative overflow-hidden glass rounded-3xl p-8 h-[240px] flex flex-col items-center justify-center text-center group cursor-pointer hover:scale-[1.02] hover:shadow-glow transition-all duration-300`}
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Glowing Background Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/[0.01] pointer-events-none" />

              {/* 3D Glass Asset Image */}
              <div className="w-28 h-28 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 pointer-events-none">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(122,92,255,0.25)]"
                />
              </div>

              {/* Title only */}
              <h3 className="font-display font-black text-base sm:text-lg text-base-strong leading-tight uppercase tracking-wide group-hover:text-gradient transition-all duration-300 select-none">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
