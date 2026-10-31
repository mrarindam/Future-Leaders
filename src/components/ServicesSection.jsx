import React from 'react';

const SERVICES = [
  {
    num: '01',
    displayNum: '1',
    title: 'KOL Marketing',
    tag: '500+ KOL Network',
    badgeColor: '#FF4B00',
    image: '/assets/services/kol-marketing.webp',
    visualBg: 'linear-gradient(135deg, #f7f3f0 0%, #faede4 45%, #fce1d2 100%)',
    desc: 'Connect with our private network of 500+ KOLs across different regions, countries, and Web3 niches to reach the right audience.',
    deliverables: [
      {
        title: 'Tier-1 Web3 Influencers & Creators',
        desc: 'Direct access to 500+ vetted crypto leaders across X, Telegram & YouTube.',
      },
      {
        title: 'Targeted Token & Campaign Deployments',
        desc: 'Coordinated alpha pushes aligned with TGE, mints & key product milestones.',
      },
      {
        title: 'Transparent ROI & Conversion Tracking',
        desc: 'Live performance metrics on impressions, link clicks & community inflow.',
      },
    ],
    stats: [
      { label: 'Network Size', value: '500+ KOLs' },
      { label: 'Total Reach', value: '45M+' },
      { label: 'Global Markets', value: '30+ Regions' },
    ],
  },
  {
    num: '02',
    displayNum: '2',
    title: 'Community Management',
    tag: 'Organic Growth',
    badgeColor: '#8B5CF6',
    image: '/assets/services/community-management.webp',
    visualBg: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 45%, #ddd6fe 100%)',
    desc: 'Build and grow an active Web3 community with experienced community managers focused on engagement, growth, and long-term support.',
    deliverables: [
      {
        title: '24/7 Dedicated Multi-Region Moderation',
        desc: 'Round-the-clock proactive managers maintaining active, safe discussions.',
      },
      {
        title: 'Engagement Loops & Retention Mechanics',
        desc: 'Gamified daily topics, quizzes, and incentives that prevent community churn.',
      },
      {
        title: 'Ambassador Programs & Interactive AMAs',
        desc: 'Empowering loyal holders into organic brand advocates and event hosts.',
      },
    ],
    stats: [
      { label: 'Coverage', value: '24/7 Active' },
      { label: 'Avg. Retention', value: '88%' },
      { label: 'Mod Response', value: '< 2 Mins' },
    ],
  },
  {
    num: '03',
    displayNum: '3',
    title: 'Discord Management',
    tag: 'Server Security',
    badgeColor: '#5865F2',
    image: '/assets/services/discord-management.webp',
    visualBg: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 45%, #c7d2fe 100%)',
    desc: 'Complete Discord management, including setup, moderation, engagement, and day-to-day community support.',
    deliverables: [
      {
        title: 'Enterprise Server Architecture & Role Systems',
        desc: 'Clean channel hierarchy, permission scoping, and intuitive onboarding.',
      },
      {
        title: 'Anti-Raid & Automated Verification Security',
        desc: 'Multi-layer bot shields, captcha verification, and spam defense mechanisms.',
      },
      {
        title: 'Interactive Stage & Voice Event Production',
        desc: 'High-production community stages, Town Halls, and builder voice workshops.',
      },
    ],
    stats: [
      { label: 'Security Level', value: 'Enterprise' },
      { label: 'Anti-Raid Shield', value: '99.9%' },
      { label: 'Channels Built', value: 'Custom UX' },
    ],
  },
  {
    num: '04',
    displayNum: '4',
    title: 'Social & Growth Marketing',
    tag: 'Viral Traction',
    badgeColor: '#06B6D4',
    image: '/assets/services/social-growth-marketing.webp',
    visualBg: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 45%, #a5f3fc 100%)',
    desc: 'Drive visibility through posts, likes, comments, reposts, paid campaigns, engagement, and targeted growth strategies.',
    deliverables: [
      {
        title: 'Viral X (Twitter) Growth Strategies',
        desc: 'High-impact alpha threads, meme campaigns, and organic reach scaling.',
      },
      {
        title: 'Data-Driven Audience Acquisition',
        desc: 'Targeted social funnel strategies to turn timeline scrollers into active holders.',
      },
      {
        title: 'Cross-Platform Content Amplification',
        desc: 'Consistent high-velocity content deployment across Telegram, X, and Web3 media.',
      },
    ],
    stats: [
      { label: 'Impression Lift', value: '10x Scale' },
      { label: 'Engagement Rate', value: '14.2%' },
      { label: 'Campaign Speed', value: 'Instant' },
    ],
  },
  {
    num: '05',
    displayNum: '5',
    title: 'Collaboration Management',
    tag: 'Tier-1 Partnerships',
    badgeColor: '#F59E0B',
    image: '/assets/services/collab-management.webp',
    visualBg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 45%, #fde68a 100%)',
    desc: 'Connect with relevant projects, communities, creators, and partners through our network of experienced collaboration managers.',
    deliverables: [
      {
        title: 'Cross-Community Strategic Partnerships',
        desc: 'Direct deal brokering with leading Web3 DAOs, protocols, and NFT ecosystems.',
      },
      {
        title: 'Exclusive Whitelist & Giveaway Exchanges',
        desc: 'High-conversion reciprocal campaigns providing verified organic traffic.',
      },
      {
        title: 'Joint Spaces & Collaborative Ecosystem PR',
        desc: 'Co-hosted spaces and unified announcements to multiply brand exposure.',
      },
    ],
    stats: [
      { label: 'Partner Projects', value: '250+' },
      { label: 'Whitelist Allocation', value: 'Guaranteed' },
      { label: 'Synergy Score', value: 'High' },
    ],
  },
  {
    num: '06',
    displayNum: '6',
    title: 'Technical Services',
    tag: 'Web3 Infrastructure',
    badgeColor: '#10B981',
    image: '/assets/services/tech-services.webp',
    visualBg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 45%, #a7f3d0 100%)',
    desc: 'Access Web3 developers and technical support for bots, smart contracts, integrations, and other project requirements.',
    deliverables: [
      {
        title: 'Custom Discord & Telegram Utility Bots',
        desc: 'Tailored bots for token tracking, wallet verification, games, and volume alerts.',
      },
      {
        title: 'Smart Contract Development & Security Audits',
        desc: 'Audited token contracts, staking vaults, and vesting architecture.',
      },
      {
        title: 'Full-Stack DApp Frontends & Web3 Integrations',
        desc: 'High-speed modern interfaces supporting multi-wallet connections and fast RPCs.',
      },
    ],
    stats: [
      { label: 'Uptime', value: '99.98%' },
      { label: 'Audit Ready', value: 'Yes' },
      { label: 'Tech Stack', value: 'EVM / Rust' },
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services-section" className="page-section section-services">
      <div className="services-container">
        {/* SECTION HEADER */}
        <div className="services-header anim">
          <h2 className="services-headline" id="services-headline">
            Solutions Built for Web3 Growth
          </h2>
          <p className="services-subhead">
            From KOL marketing and community growth to partnerships, moderation, and technical support, we provide the resources Web3 projects need to grow and scale.
          </p>
        </div>

        {/* OVERLAPPING STACKING CARDS CONTAINER */}
        <div className="services-stack-list">
          {SERVICES.map((srv, index) => (
            <article
              key={srv.num}
              data-index={index}
              className="service-stack-card is-inview"
              style={{
                '--stack-idx': index,
                '--card-accent': srv.badgeColor,
              }}
            >
              {/* LEFT COLUMN: INFO & DELIVERABLES */}
              <div className="stack-card-left">
                <div className="stack-card-top-meta">
                  <span className="stack-card-tag" style={{ color: srv.badgeColor }}>
                    {srv.tag}
                  </span>
                </div>

                <h3 className="stack-card-title">
                  {srv.displayNum}. {srv.title}
                </h3>

                <p className="stack-card-desc">{srv.desc}</p>

                {/* DELIVERABLES CHECKLIST */}
                <div className="stack-card-deliverables">
                  <span className="stack-deliv-heading">KEY DELIVERABLES:</span>
                  <ul className="stack-deliv-list">
                    {srv.deliverables.map((item, dIdx) => (
                      <li
                        key={dIdx}
                        className="stack-deliv-item"
                        style={{ '--deliv-idx': dIdx }}
                      >
                        <span className="stack-check-dot" style={{ backgroundColor: srv.badgeColor }}>
                          <i className="fa-solid fa-check"></i>
                        </span>
                        <div className="stack-deliv-content">
                          <span className="stack-deliv-item-title stack-deliv-title">{item.title}</span>
                          <span className="stack-deliv-item-desc stack-deliv-desc">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT COLUMN: VISUAL SHOWCASE STAGE */}
              <div
                className={`stack-card-right ${srv.image ? 'has-image' : ''}`}
                style={{ background: srv.image ? '#0d0d11' : srv.visualBg }}
              >
                {srv.image ? (
                  <div className="stack-image-stage">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="stack-service-img"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  /* FLOATING METRICS DISPLAY */
                  <div className="stack-visual-board">
                    <div className="stack-visual-header">
                      <span className="stack-visual-pill" style={{ color: srv.badgeColor }}>
                        <span className="stack-pulse-dot" style={{ backgroundColor: srv.badgeColor }}></span>
                        Live Capabilities
                      </span>
                      <span className="stack-visual-code">SYS // {srv.num}</span>
                    </div>

                    <div className="stack-visual-stats">
                      {srv.stats.map((st, sIdx) => (
                        <div key={sIdx} className="stack-stat-item">
                          <span className="stack-stat-label">{st.label}</span>
                          <span className="stack-stat-val" style={{ color: srv.badgeColor }}>
                            {st.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* ISOMETRIC PLATFORM GRAPHIC */}
                    <div className="stack-visual-graphic">
                      <div className="stack-isometric-tile tile-back"></div>
                      <div className="stack-isometric-tile tile-mid"></div>
                      <div className="stack-isometric-tile tile-front" style={{ borderColor: srv.badgeColor }}>
                        <span className="stack-tile-icon" style={{ color: srv.badgeColor }}>
                          <i className={`fa-solid fa-chart-simple`}></i>
                        </span>
                        <span className="stack-tile-text">{srv.title}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
