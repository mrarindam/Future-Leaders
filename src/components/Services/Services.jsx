import {
  Megaphone,
  Share2,
  Layers,
  Users,
  HeartHandshake,
  ShieldAlert,
  Award,
  LineChart,
  Code
} from 'lucide-react';

export default function Services() {
  const data = [
    {
      num: '01',
      color: 'cyan',
      icon: Megaphone,
      title: 'Paid Promotions',
      desc: 'We run targeted paid promotions through our network of 280+ Web3 KOLs and crypto communities. Our campaigns focus on real reach, genuine engagement and helping projects connect with active Web3 audiences.',
      bullets: ['Network of 280+ KOLs', 'Real, organic reach', 'Active Web3 audiences']
    },
    {
      num: '02',
      color: 'purple',
      icon: Share2,
      title: 'KOL Marketing',
      desc: 'We work with trusted KOLs across the Web3 space to promote projects through strategic paid posting campaigns. This helps projects increase awareness, attract new users and grow their market presence.',
      bullets: ['Strategic posting campaigns', 'Brand awareness & visibility', 'User & market growth']
    },
    {
      num: '03',
      color: 'cyan',
      icon: Layers,
      title: 'NFT Collaborations',
      desc: 'We partner with vetted NFT teams to support launches, mints, and ecosystem collaborations. Our goal is to create strong partnerships that bring visibility, engagement and value to both communities.',
      bullets: ['Launch & mint support', 'Vetted NFT partnerships', 'Cross-community engagement']
    },
    {
      num: '04',
      color: 'purple',
      icon: Users,
      title: 'Community Building',
      desc: 'We help projects grow active communities across Discord, Telegram, and X. Our focus is on real engagement, organic growth, and building communities that stay active long term.',
      bullets: ['Multi-platform setup (Discord/TG/X)', 'Organic growth strategies', 'Long-term retention emphasis']
    },
    {
      num: '05',
      color: 'cyan',
      icon: HeartHandshake,
      title: 'Community Management',
      desc: 'Our community managers handle daily engagement, announcements, support, and overall community activity. We help keep your community organized, active, and professionally managed.',
      bullets: ['Daily active engagement', 'Professional announcements & support', 'Sustained user activity']
    },
    {
      num: '06',
      color: 'purple',
      icon: ShieldAlert,
      title: 'Discord Moderation',
      desc: 'We provide experienced Discord moderators to manage chats, support members, prevent spam and maintain a healthy community environment. Our moderation team helps keep communities safe, active and well-managed.',
      bullets: ['Experienced 24/7 moderation', 'Anti-spam & security control', 'Healthy chat environment']
    },
    {
      num: '07',
      color: 'cyan',
      icon: Award,
      title: 'Ambassador Programs',
      desc: 'We help projects launch ambassador programs that increase community engagement and project awareness. Through our network and communities, we connect projects with active supporters who help grow the ecosystem.',
      bullets: ['Program structuring & launch', 'Supporter connecting & scaling', 'Ecosystem awareness growth']
    },
    {
      num: '08',
      color: 'purple',
      icon: LineChart,
      title: 'Marketing Support',
      desc: 'We provide complete marketing support based on your project’s goals and growth stage. From promotions and partnerships to engagement strategies and campaign planning, our team helps projects scale effectively.',
      bullets: ['Tailored marketing strategy', 'Partnerships & campaigns', 'Effective scaling tools']
    },
    {
      num: '09',
      color: 'cyan',
      icon: Code,
      title: 'Development Support',
      desc: 'We also connect projects with developers and technical support when needed. Whether it’s website development, ecosystem tools, integrations or technical assistance, we help projects find the right support to grow smoothly.',
      bullets: ['Website & tool development', 'Ecosystem integrations', 'Smooth technical growth']
    }
  ];

  return (
    <section id="services" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-transparent overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Section Header */}
        <div className="reveal text-center mb-16 lg:mb-20 select-none">
          <h2 className="section-title text-4xl sm:text-5xl md:text-6xl mb-5 mt-5 text-base-strong">
            Our <span className="text-gradient font-black">Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base-muted text-base sm:text-lg leading-relaxed">
            Full-stack marketing, promotion and development services engineered to scale your Web3 project.
          </p>
        </div>

        {/* 9-Card Responsive Modern Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.map((item, i) => {
            const IconComponent = item.icon;
            const accentColor = item.color === 'cyan' ? 'var(--cyan-accent)' : 'var(--purple-accent)';
            const colorClass = item.color === 'cyan' ? 'hover:border-cyan-500/30' : 'hover:border-purple-500/30';
            
            return (
              <div
                key={item.num}
                className={`reveal ${i % 3 === 1 ? 'reveal-d1' : i % 3 === 2 ? 'reveal-d2' : ''} glass service-card rounded-3xl p-8 sm:p-10 cursor-pointer hover:scale-[1.02] hover:shadow-glow transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[360px] sm:min-h-[380px] group ${colorClass}`}
                style={{ borderColor: 'var(--border)' }}
              >
                {/* Visual Glow Effect in background */}
                <div 
                  className="absolute right-[-40px] top-[-40px] w-40 h-40 rounded-full blur-[80px] opacity-20 transition-all duration-500 group-hover:opacity-40"
                  style={{ background: accentColor }}
                />

                {/* Card Content - Naturally Flowing Stack */}
                <div className="relative z-10 flex flex-col gap-6 w-full h-full justify-between">
                  
                  {/* Top Bar: Number & Clean Icon */}
                  <div className="flex items-center justify-between select-none">
                    <span
                      className="font-display text-sm tracking-[0.3em] font-black"
                      style={{ color: accentColor }}
                    >
                      {item.num}
                    </span>
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 bg-white/5 transition-all duration-300 group-hover:scale-110"
                      style={{ 
                        boxShadow: `inset 0 0 12px rgba(255,255,255,0.03)`,
                        borderColor: `rgba(255,255,255,0.08)`
                      }}
                    >
                      <IconComponent 
                        className="w-6 h-6 transition-all duration-300" 
                        style={{ color: accentColor }}
                      />
                    </div>
                  </div>

                  {/* Title & Description & Bullets grouped */}
                  <div className="flex flex-col gap-4 flex-grow justify-center">
                    <h3 className="font-display font-black text-xl md:text-2xl text-base-strong uppercase tracking-tight group-hover:text-gradient transition-all duration-300 select-none">
                      {item.title}
                    </h3>
                    <p className="text-base-soft text-sm sm:text-[15px] leading-relaxed select-none">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Bullets at the bottom */}
                  <ul className="space-y-2 text-sm text-base-soft font-medium select-none border-t border-white/5 pt-4">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ 
                            background: accentColor,
                            boxShadow: `0 0 8px ${accentColor}`
                          }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
