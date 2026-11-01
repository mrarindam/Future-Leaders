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
    bio: 'Head of Growth Future Leaders\nI do what I love | Building network of tomorrow leaders',
    bioLink: {
      phrase: 'Future Leaders',
      url: 'https://x.com/0Futureleaders',
    },
  },
  {
    name: 'Black Mamba',
    role: 'Co-Founder',
    telegram: 'https://t.me/blaaack_mambaa',
    discord: 'https://discord.com/users/813146062947614810',
    twitter: 'https://x.com/blaack_mambaa',
    image: '/assets/team/blackmamba-full.webp',
    avatar: '/assets/team/blackmamba-avatar.webp',
    avatarPosition: 'center 20%',
    bgColor: '#232832',
    bio: 'With 6 years in Web3 and experience working with 500+ projects, Black Mamba focuses on business development, strategic partnerships, and campaign strategy. Leveraging a strong network across Web3 to bring new projects to the agency, build partnerships, and design marketing campaigns that help projects reach the right audience and drive growth.',
  },
  {
    name: 'Viking',
    role: 'Co-Founder',
    telegram: 'https://t.me/badviking1995',
    discord: 'https://discord.com/users/518837405600448513',
    twitter: 'https://x.com/badviking1995',
    image: '/assets/team/viking-full.png',
    avatar: '/assets/team/viking-avatar.png',
    bgColor: '#918c88',
    bio: 'Viking commands marketing momentum and creator partnerships across global Web3 markets, connecting projects directly with Tier-1 KOLs and engaged audiences.',
  },
  {
    name: 'Toji',
    role: 'Growth Manager',
    telegram: 'https://t.me/Tojizeninhc',
    discord: 'https://discord.com/users/1223692374790901932',
    twitter: 'https://x.com/Tojizeninhc',
    image: '/assets/team/tojifl-full.webp',
    avatar: '/assets/team/tojifl-avatar.webp',
    bgColor: '#df1a22',
    bio: 'I am TOJI leading growth at Future Leaders. I have been involved in 200+ Web3 projects, working across community operations, creator relations, KOL marketing, business development, and ecosystem growth. My work includes building and managing communities, coordinating marketing campaigns, developing strategic partnerships, running ambassador programs, and connecting projects with the right creators and audiences. My focus is on turning connections into strong communities and sustainable growth.',
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
    github: 'https://github.com/mrarindam',
    website: 'https://www.mrarindam.xyz/',
    image: '/assets/team/arindam-full.webp',
    avatar: '/assets/team/arindam-avatar.webp',
    bgColor: '#3b4450',
    bio: "I'm Full-Stack Web Developer | Tech Enthusiast | AI Blog Writer",
  },
];

function TypewriterBio({ text, bioLink, memberKey, isVisible }) {
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

  const renderContent = () => {
    if (!bioLink || !bioLink.phrase || !bioLink.url) {
      return <span>{displayedText}</span>;
    }

    const phraseStart = text.indexOf(bioLink.phrase);
    if (phraseStart === -1 || displayedText.length <= phraseStart) {
      return <span>{displayedText}</span>;
    }

    const phraseEnd = phraseStart + bioLink.phrase.length;
    const before = displayedText.slice(0, phraseStart);
    const linked = displayedText.slice(phraseStart, Math.min(displayedText.length, phraseEnd));
    const after = displayedText.length > phraseEnd ? displayedText.slice(phraseEnd) : '';

    return (
      <>
        <span>{before}</span>
        <a
          href={bioLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="team-bio-link"
          onClick={(e) => e.stopPropagation()}
        >
          {linked}
        </a>
        <span>{after}</span>
      </>
    );
  };

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
      {renderContent()}
    </p>
  );
}

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const activeMember = TEAM_MEMBERS[activeIndex];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Automatic member rotation (Autoplay every 4.5s when visible)
  useEffect(() => {
    if (!isVisible || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isVisible, isPaused]);

  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = touchStartRef.current.x - endX;
    const diffY = touchStartRef.current.y - endY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      setIsPaused(true);
      if (diffX > 0) {
        setActiveIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
      }
      setTimeout(() => setIsPaused(false), 5000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="team-section"
      className="page-section section-team font-geist"
      aria-label="Team Members"
    >
      <div className="team-container">
        {/* Top Header: Meet Our Team */}
        <div className="team-section-header">
          <h2 className="team-section-title" id="team-title">
            Meet Our Team
          </h2>
        </div>

        {/* Contained Showcase Stage */}
        <div
          className="team-stage-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Stacked Background Portraits */}
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
              <div className="team-bio-bubble">
                <TypewriterBio
                  text={activeMember.bio}
                  bioLink={activeMember.bioLink}
                  memberKey={activeMember.name}
                  isVisible={isVisible}
                />
              </div>
            </div>

            {/* Bottom Zone: Avatar Picker + Meta Footer */}
            <div className="team-bottom-zone">
              {/* Avatar Picker Row (Core Leaders) */}
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
                    onClick={() => {
                      setActiveIndex(index);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 5000);
                    }}
                  >
                    <span className="team-avatar-dot" aria-hidden="true" />
                    <span className="team-avatar-thumb">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        style={member.avatarPosition ? { objectPosition: member.avatarPosition } : undefined}
                      />
                    </span>
                  </button>
                ))}
              </div>

              {/* Meta Footer */}
              <footer className="team-meta-footer">
                <div className="team-meta-info">
                  <div className="team-meta-name fade-in" key={`name-${activeMember.name}`} id="team-meta-name">
                    {activeMember.name}
                  </div>
                  <div className="team-meta-role" key={`role-${activeMember.name}`} id="team-meta-role">
                    {activeMember.role}
                  </div>
                </div>
                <div className="team-meta-contacts" id="team-meta-contacts">
                  {activeMember.telegram && (
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
                  )}
                  {activeMember.discord && (
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
                  )}
                  {activeMember.twitter && (
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
                  )}
                  {activeMember.github && (
                    <a
                      href={activeMember.github}
                      id="team-contact-gh"
                      className="team-contact-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <i className="fa-brands fa-github" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {activeMember.website && (
                    <a
                      href={activeMember.website}
                      id="team-contact-web"
                      className="team-contact-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Website"
                    >
                      <i className="fa-solid fa-globe" />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
