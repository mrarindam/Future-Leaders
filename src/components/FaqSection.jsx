import React, { useState, useEffect, useRef } from 'react';
import KeycapWall from './originkit/ui/faq-01/keycap-wall';
import KeycapButton from './originkit/ui/faq-01/keycap-button';
import './originkit/faq-01.css';

const FAQS = [
  {
    id: 'faq-1',
    question: 'How does Future Leaders select and vet KOLs for Web3 campaigns?',
    answer:
      'We maintain an exclusive, invite-only network of 500+ verified Web3 KOLs across X (Twitter), Telegram, YouTube, and regional alpha syndicates. Every creator undergoes rigorous due diligence—evaluating real impression-to-engagement ratios, on-chain follower retention, past project track records, and niche alignment (DeFi, Gaming, AI, Layer 1/2) to eliminate bot traffic and ensure high-conversion reach.',
  },
  {
    id: 'faq-2',
    question: 'When is the best stage for a Web3 project to begin marketing?',
    answer:
      'The optimal window is 8 to 12 weeks before your Token Generation Event (TGE), public mint, or mainnet launch. Early runway allows our team to establish an organic community foundation, launch ambassador initiatives, and generate steady organic interest before coordinating Tier-1 KOL raids and viral pushes at your highest-leverage milestones.',
  },
  {
    id: 'faq-3',
    question: 'What makes your Discord & Community Management different from standard moderators?',
    answer:
      'We do not provide passive chat sitters. Our 24/7 multi-region team operates as strategic community architects. We design enterprise role hierarchies, install multi-layer anti-raid security and verification bots, host high-production voice stages and AMAs, and introduce daily engagement loops and incentive structures that transform casual holders into long-term brand advocates.',
  },
  {
    id: 'faq-4',
    question: 'How do you measure and report ROI on marketing campaigns?',
    answer:
      'Transparency and tangible data drive everything we do. We provide live tracking dashboards covering verified impression velocity, unique referral link conversions, Telegram & Discord member inflow, 30-day retention rates, and wallet conversion milestones. You receive detailed performance reports so you can attribute every metric to specific campaign initiatives.',
  },
  {
    id: 'faq-5',
    question: 'Do you provide custom Web3 technical support and bot development?',
    answer:
      'Yes. Our in-house technical team develops custom Telegram and Discord utility bots—including live price tickers, automated buy alerts, token-gated role verification, and gamified community bots. We also offer advisory and development support on smart contract architecture, security audits, and full-stack Web3 integrations.',
  },
  {
    id: 'faq-6',
    question: 'How quickly can we onboard and launch a campaign with Future Leaders?',
    answer:
      'Following a brief discovery call to align on your growth targets, timeline, and tokenomics, our core team can deploy dedicated community managers within 24 to 48 hours. Coordinated KOL campaigns and multi-channel alpha pushes typically launch within 5 to 7 business days following strategic creative preparation.',
  },
];

export default function FaqSection({ theme = 'dark', onNavigateToContact }) {
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -4% 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleAskClick = (e) => {
    if (onNavigateToContact) {
      e.preventDefault();
      onNavigateToContact();
    }
  };

  return (
    <section
      id="faq-section"
      ref={sectionRef}
      className={`page-section section-faq faq-01 ${inView ? 'is-inview' : ''}`}
      aria-label="Frequently Asked Questions"
    >
      <div className="faq">
        {/* Left Sticky Column: Intro & Interactive Keycap Wall */}
        <div className="side">
          <p className="eyebrow">
            <kbd>?</kbd> FAQ &amp; WORKFLOW
          </p>
          <h2>Questions we often get from Web3 founders.</h2>
          <p>
            Everything you need to know about partnering with Future Leaders. If your question is not listed here, connect directly with our founding team.
          </p>

          {/* Interactive Mechanical Keycap Canvas Wall */}
          <figure className="set" style={{ margin: 0 }}>
            <div id="wall" aria-label="Future Leaders interactive keycap wall">
              <KeycapWall
                key={isDark ? 'dark-wall' : 'light-wall'}
                background={isDark ? '#0d0d12' : '#f0eee8'}
                baseColor={isDark ? '#1a1a24' : '#ffffff'}
                accentColor={isDark ? '#FF4B00' : '#161618'}
                lightKeys={isDark ? 30 : 54}
                font={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: 20 }}
                size={46}
                gap={6}
                rounded={16}
                speed={20}
                hover={65}
                keys={{ tall: 4, texture: 100, presses: 30 }}
                style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0 }}
              />
            </div>
            <figcaption>Future Leaders · Growth Network · Interactive Hub</figcaption>
          </figure>

          {/* 3D Keycap CTA Button */}
          <div className="ask">
            <div id="askKey">
              <KeycapButton
                label="ASK"
                font={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 600,
                  fontSize: '17px',
                  letterSpacing: '0.08em',
                }}
                colors={{ fill: '#FF4B00', textColor: '#FFFFFF', hoverTextColor: '#FFFFFF' }}
                prism={{ color: '#FF7A3C', float: 8, intensity: 90, thickness: 14, hoverFloat: 6 }}
                padding="16px 28px 16px 28px"
                rounded={26}
                camera={{ tilt: 45, rotate: -35 }}
                link="#contact-section"
                newTab={false}
                onClick={handleAskClick}
                style={{ minWidth: 0, minHeight: 0 }}
              />
            </div>
            <p>
              <b>Talk to our founders</b>
              We review every inquiry and respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Right Column: Accordion FAQ List with Staggered Scroll Reveal */}
        <div className={`list ${inView ? 'is-inview' : ''}`}>
          {FAQS.map((faq, index) => (
            <details
              key={faq.id}
              name="future-leaders-faq"
              className={`faq-item ${inView ? 'is-visible' : ''}`}
              style={{ '--item-idx': index }}
            >
              <summary>
                <span>{faq.question}</span>
                <span className="cap" aria-hidden="true" />
              </summary>
              <div className="answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
