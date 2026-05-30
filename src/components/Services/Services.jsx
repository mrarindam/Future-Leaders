import paidPartnershipImg from '../../images/services/paid_partnership.webp';
import kolMarketingImg from '../../images/services/kol_marketing.webp';
import nftCollabImg from '../../images/services/nft_collab.webp';
import communityBuildingImg from '../../images/services/community_building.webp';
import communityManagementImg from '../../images/services/community_management.webp';
import moderationsImg from '../../images/services/moderations.webp';
import ambassadorProgramImg from '../../images/services/ambassador_program.webp';
import marketingSupportImg from '../../images/services/marketing_support.webp';
import webDevelopmentImg from '../../images/services/web_development.webp';

const Icon = {
  ArrowExt: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function Services() {
  const data = [
    {
      num: '01',
      color: 'cyan',
      img: paidPartnershipImg,
      title: 'Paid Promotions',
      desc: 'We run targeted paid promotions through our network of 280+ Web3 KOLs and crypto communities. Our campaigns focus on real reach, genuine engagement and helping projects connect with active Web3 audiences.',
      bullets: ['Network of 280+ KOLs', 'Real, organic reach', 'Active Web3 audiences']
    },
    {
      num: '02',
      color: 'purple',
      img: kolMarketingImg,
      title: 'KOL Marketing',
      desc: 'We work with trusted KOLs across the Web3 space to promote projects through strategic paid posting campaigns. This helps projects increase awareness, attract new users and grow their market presence.',
      bullets: ['Strategic posting campaigns', 'Brand awareness & visibility', 'User & market growth']
    },
    {
      num: '03',
      color: 'cyan',
      img: nftCollabImg,
      title: 'NFT Collaborations',
      desc: 'We partner with vetted NFT teams to support launches, mints, and ecosystem collaborations. Our goal is to create strong partnerships that bring visibility, engagement and value to both communities.',
      bullets: ['Launch & mint support', 'Vetted NFT partnerships', 'Cross-community engagement']
    },
    {
      num: '04',
      color: 'purple',
      img: communityBuildingImg,
      title: 'Community Building',
      desc: 'We help projects grow active communities across Discord, Telegram, and X. Our focus is on real engagement, organic growth, and building communities that stay active long term.',
      bullets: ['Multi-platform setup (Discord/TG/X)', 'Organic growth strategies', 'Long-term retention emphasis']
    },
    {
      num: '05',
      color: 'cyan',
      img: communityManagementImg,
      title: 'Community Management',
      desc: 'Our community managers handle daily engagement, announcements, support, and overall community activity. We help keep your community organized, active, and professionally managed.',
      bullets: ['Daily active engagement', 'Professional announcements & support', 'Sustained user activity']
    },
    {
      num: '06',
      color: 'purple',
      img: moderationsImg,
      title: 'Discord Moderation',
      desc: 'We provide experienced Discord moderators to manage chats, support members, prevent spam and maintain a healthy community environment. Our moderation team helps keep communities safe, active and well-managed.',
      bullets: ['Experienced 24/7 moderation', 'Anti-spam & security control', 'Healthy chat environment']
    },
    {
      num: '07',
      color: 'cyan',
      img: ambassadorProgramImg,
      title: 'Ambassador Programs',
      desc: 'We help projects launch ambassador programs that increase community engagement and project awareness. Through our network and communities, we connect projects with active supporters who help grow the ecosystem.',
      bullets: ['Program structuring & launch', 'Supporter connecting & scaling', 'Ecosystem awareness growth']
    },
    {
      num: '08',
      color: 'purple',
      img: marketingSupportImg,
      title: 'Marketing Support',
      desc: 'We provide complete marketing support based on your project’s goals and growth stage. From promotions and partnerships to engagement strategies and campaign planning, our team helps projects scale effectively.',
      bullets: ['Tailored marketing strategy', 'Partnerships & campaigns', 'Effective scaling tools']
    },
    {
      num: '09',
      color: 'cyan',
      img: webDevelopmentImg,
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

        {/* 9-Card Responsive Modern 3D Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.map((item, i) => (
            <div
              key={item.num}
              className={`reveal ${i % 3 === 1 ? 'reveal-d1' : i % 3 === 2 ? 'reveal-d2' : ''} glass service-card rounded-3xl p-6 sm:p-8 cursor-pointer hover:scale-[1.02] hover:shadow-glow transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[320px] sm:min-h-[340px] group`}
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Floating 3D Transparent Asset Image on top right */}
              <div className="absolute right-[-15px] top-[-15px] w-36 h-36 opacity-85 group-hover:opacity-100 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 pointer-events-none z-0">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(122,92,255,0.22)]"
                />
              </div>

              {/* Card Content - Naturally Flowing Stack */}
              <div className="relative z-10 flex flex-col gap-4 w-full h-full">
                {/* Number and Arrow Header */}
                <div className="flex items-center justify-between select-none">
                  <span
                    className="font-display text-sm tracking-[0.3em] font-black"
                    style={{ color: item.color === 'cyan' ? 'var(--cyan-accent)' : 'var(--purple-accent)' }}
                  >
                    {item.num}
                  </span>
                  <Icon.ArrowExt className="w-5 h-5 text-base-faint group-hover:text-cyan-brand transition-colors" />
                </div>

                {/* Title, Description & Bullets grouped tightly */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-display font-black text-xl mb-3 text-base-strong uppercase tracking-tight group-hover:text-gradient transition-all duration-300 select-none max-w-[70%] sm:max-w-[75%] md:max-w-[80%] pr-2">
                    {item.title}
                  </h3>
                  <p className="text-base-soft text-xs sm:text-sm leading-relaxed max-w-[82%] select-none">
                    {item.desc}
                  </p>
                  
                  {/* Bullets directly under description */}
                  <ul className="space-y-1.5 text-xs sm:text-sm text-base-soft font-medium select-none mt-1">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
                          style={{ background: item.color === 'cyan' ? 'var(--cyan-accent)' : 'var(--purple-accent)' }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
