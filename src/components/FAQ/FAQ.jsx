import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Is there any cost to join?',
    a: 'No. Joining is completely free. You can become a member of the Future Leaders community at zero cost and start benefiting from our network immediately.'
  },
  {
    q: 'How to join?',
    a: 'You can join through our Discord invite link. Once inside, follow the onboarding steps and you will be part of our growing Web3 community.'
  },
  {
    q: 'Do you take any fees?',
    a: 'No, we do not take any fees from community members. Our revenue comes from project partnerships and service packages, not from our members.'
  },
  {
    q: 'What services do you offer?',
    a: 'We offer paid promotions, KOL marketing, NFT collaborations, community building, community management, Discord moderation, ambassador programs, marketing support, and development support.'
  },
  {
    q: 'How do I start a project with you?',
    a: 'Click on "Discuss The Project" in the contact section or "Start Project" in the navigation bar. Fill out the form and our operators will get back to you within 12 hours with a custom growth plan.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-transparent overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute top-[20%] left-[-150px] w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="reveal text-center mb-16 lg:mb-20 select-none">
          <h2 className="section-title text-4xl sm:text-5xl md:text-6xl mb-5 mt-3 text-base-strong">
            Common <span className="text-gradient font-black">Questions</span>
          </h2>
          <p className="max-w-xl mx-auto text-base-muted text-base sm:text-lg leading-relaxed">
            Everything you need to know about the Future Leaders platform.
          </p>
        </div>

        {/* Accordion Container — no reveal class here to avoid re-render hiding */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: isOpen
                    ? 'var(--glass-strong-bg)'
                    : 'var(--glass-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  boxShadow: isOpen ? 'var(--shadow-card)' : 'none',
                }}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggle(i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.25rem 1.5rem', textAlign: 'left', cursor: 'pointer', background: 'transparent', border: 'none', outline: 'none' }}
                >
                  <span
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                      letterSpacing: '0.02em',
                      color: 'var(--text)',
                      userSelect: 'none',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </span>

                  {/* +/- Icon */}
                  <span
                    style={{
                      flexShrink: 0,
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isOpen ? 'var(--cyan-accent)' : 'transparent',
                      border: isOpen ? '1px solid var(--cyan-accent)' : '1px solid var(--border)',
                      color: isOpen ? '#050505' : 'var(--text-muted)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {isOpen
                      ? <Minus style={{ width: '0.9rem', height: '0.9rem', strokeWidth: 3 }} />
                      : <Plus style={{ width: '0.9rem', height: '0.9rem', strokeWidth: 2.5 }} />
                    }
                  </span>
                </button>

                {/* Answer Panel — height animated via maxHeight */}
                <div
                  style={{
                    maxHeight: isOpen ? '400px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div
                    style={{
                      padding: '0 1.5rem 1.25rem 1.5rem',
                      color: 'var(--text-soft)',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      userSelect: 'none',
                    }}
                  >
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
