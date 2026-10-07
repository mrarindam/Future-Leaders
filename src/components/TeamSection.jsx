import React, { useState, useEffect, useRef } from 'react';

const TEAM_MEMBERS = [
  {
    name: 'Sakuna',
    role: 'Founder',
    telegram: 'https://t.me/SAKUNA17',
    discord: 'https://discord.com/users/1330573065234546749',
    twitter: 'https://x.com/0Sakuna',
    image: '/assets/team/sakuna-full.webp',
    avatar: '/assets/team/sakuna-avatar.webp',
    bgColor: '#79bee7',
    bio: 'Sakuna sets the visual direction and strategic vision of every project. He turns rough concepts into clear, confident design languages that feel effortless yet leave a lasting impression.',
  },
  {
    name: 'Toji',
    role: 'Co-Founder',
    telegram: 'https://t.me/Tojizeninhc',
    discord: 'https://discord.com/users/1223692374790901932',
    twitter: 'https://x.com/Tojizeninhc',
    image: '/assets/team/toji-full.webp',
    avatar: '/assets/team/toji-avatar.webp',
    bgColor: '#df1a22',
    bio: 'Toji shapes community operations and growth mechanics. He builds active environments where members turn into brand advocates and long-term project supporters.',
  },
  {
    name: 'Viking',
    role: 'Growth Lead',
    telegram: 'https://t.me/badviking1995',
    discord: 'https://discord.com/users/518837405600448513',
    twitter: 'https://x.com/badviking1995',
    image: '/assets/team/viking-full.png',
    avatar: '/assets/team/viking-avatar.png',
    bgColor: '#918c88',
    bio: 'Viking commands marketing momentum and creator partnerships across global Web3 markets, connecting projects directly with Tier-1 KOLs and engaged audiences.',
  },
  {
    name: 'Anas',
    role: 'Operations Lead',
    telegram: 'https://t.me/Anas1btc',
    discord: 'https://discord.com/users/767831622837338163',
    twitter: 'https://x.com/Anas1BTC',
    image: '/assets/team/anas-full.webp',
    avatar: '/assets/team/anas-avatar.jpg',
    bgColor: '#ef6b01',
    bio: 'Anas architects high-retention Discord infrastructures and moderation systems, safeguarding ecosystems and ensuring 24/7 seamless engagement.',
  },
  {
    name: 'Arindam',
    role: 'Technical Lead',
    telegram: 'https://t.me/MrxArindam',
    discord: 'https://discord.com/users/1056180691987091467',
    twitter: 'https://x.com/ExeArindam',
    image: '/assets/team/arindam-full.webp',
    avatar: '/assets/team/arindam-avatar.webp',
    bgColor: '#3b4450',
    bio: 'Arindam engineers custom verification bots, data analytics pipelines, and secure Web3 growth integrations to scale community operations with zero friction.',
  },
];

function TypewriterBio({ text, memberKey, isVisible }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      setIsTyping(true);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);

    let currentIndex = 0;
    let timer = null;

    // Small delay before typing streams out
    const startDelay = setTimeout(() => {
      const typeNext = () => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayedText(text.slice(0, currentIndex));

          const char = text[currentIndex - 1];
          let delay = 13; // Fast, smooth typewriter speed (~1.8s total)
          if (char === '.' || char === '!' || char === '?') {
            delay = 75;
          } else if (char === ',') {
            delay = 35;
          }

          timer = setTimeout(typeNext, delay);
        } else {
          setIsTyping(false);
        }
      };

      typeNext();
    }, 60);

    return () => {
      clearTimeout(startDelay);
      if (timer) clearTimeout(timer);
    };
  }, [text, memberKey, isVisible]);

  return (
    <p
      className="team-bio"
      id="team-bio-desc"
      onClick={() => {
        if (isTyping) {
          setDisplayedText(text);
          setIsTyping(false);
        }
      }}
      title={isTyping ? 'Click to reveal immediately' : undefined}
    >
      <span>{displayedText}</span>
    </p>
  );
}

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const activeMember = TEAM_MEMBERS[activeIndex];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team-section"
      className="page-section section-team font-geist"
      aria-label="Team Members"
    >
      {/* Full-bleed Stacked Background Portraits (5 members) */}
      <div className="team-bg-stack" aria-hidden="true">
        {TEAM_MEMBERS.map((m, idx) => (
          <div
            key={m.name}
            className={`team-bg-slide ${activeIndex === idx ? 'active' : ''}`}
            style={{
              backgroundImage: `url('${m.image}')`,
              backgroundColor: m.bgColor,
            }}
          />
        ))}
      </div>

      {/* Light Dark Vignette Gradient Overlay */}
      <div className="team-gradient-overlay" aria-hidden="true" />

      {/* Content Layer (z-10) */}
      <div className="team-content-wrapper">
        {/* Top Zone: Dynamic Bio with typing effect */}
        <div className="team-top-zone">
          <TypewriterBio
            text={activeMember.bio}
            memberKey={activeMember.name}
            isVisible={isVisible}
          />
        </div>

        {/* Bottom Zone: Avatar Picker + Meta Footer */}
        <div className="team-bottom-zone">
          {/* Avatar Picker Row (5 Core Leaders) */}
          <div className="team-avatar-row" role="tablist" aria-label="Team member avatars">
            {TEAM_MEMBERS.map((member, index) => (
              <button
                key={member.name}
                type="button"
                className={`team-avatar-btn ${activeIndex === index ? 'active' : ''}`}
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={`Show ${member.name}`}
                data-index={index}
                onClick={() => setActiveIndex(index)}
              >
                <span className="team-avatar-dot" aria-hidden="true" />
                <span className="team-avatar-thumb">
                  <img src={member.avatar} alt={member.name} />
                </span>
              </button>
            ))}
          </div>

          {/* Meta Footer */}
          <footer className="team-meta-footer">
            <div className="team-meta-name fade-in" key={`name-${activeMember.name}`} id="team-meta-name">
              {activeMember.name}
            </div>
            <div className="team-meta-role" key={`role-${activeMember.name}`} id="team-meta-role">
              {activeMember.role}
            </div>
            <div className="team-meta-contacts" id="team-meta-contacts">
              <a
                href={activeMember.telegram}
                id="team-contact-tg"
                className="team-contact-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <i className="fa-brands fa-telegram" />
                <span>Telegram</span>
              </a>
              <a
                href={activeMember.discord}
                id="team-contact-dc"
                className="team-contact-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <i className="fa-brands fa-discord" />
                <span>Discord</span>
              </a>
              <a
                href={activeMember.twitter}
                id="team-contact-tw"
                className="team-contact-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="fa-brands fa-x-twitter" />
                <span>Twitter</span>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
