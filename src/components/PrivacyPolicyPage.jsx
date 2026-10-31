import React, { useEffect } from 'react';

export default function PrivacyPolicyPage({ onBackToHome, theme, onToggleTheme }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="privacy-page-wrapper">
      {/* Dedicated Privacy Policy Navigation Header */}
      <header className="privacy-header" aria-label="Privacy Policy Header">
        <div className="privacy-header-inner">
          {/* Logo on Left */}
          <button
            type="button"
            className="privacy-nav-logo"
            onClick={onBackToHome}
            aria-label="Return to Future Leaders Home"
          >
            <img src="/favicon.png" alt="Future Leaders" width="40" height="40" />
            <span className="privacy-brand-text">Future Leaders</span>
          </button>

          {/* Actions on Right */}
          <div className="privacy-header-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#161618"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="privacy-back-btn"
              onClick={onBackToHome}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Privacy Policy Article */}
      <main className="privacy-container" role="main">
        {/* Header Hero */}
        <div className="privacy-hero">
          <div className="privacy-kicker">FUTURE LEADERS LEGAL &amp; DATA GOVERNANCE</div>
          <h1 className="privacy-title">Privacy Policy</h1>
          <div className="privacy-meta">
            <span>Last Updated: November 1, 2026</span>
            <span className="privacy-meta-sep">•</span>
            <span>Version 2.4</span>
            <span className="privacy-meta-sep">•</span>
            <span>Web3 Marketing &amp; Ecosystem Network Standards</span>
          </div>
        </div>

        {/* Highlight Alert Box */}
        <div className="privacy-callout">
          <div className="privacy-callout-icon">🛡️</div>
          <div className="privacy-callout-content">
            <h4>Decentralized &amp; Privacy-First Commitment</h4>
            <p>
              Future Leaders ("we", "our", "us") values your privacy and digital sovereignty.
              We operate at the nexus of Web3 protocols, decentralized networks, and digital marketing.
              We do not sell personal data, nor do we track non-public on-chain cryptographic keys.
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="privacy-body">
          <section className="privacy-section">
            <h2>1. Introduction &amp; Scope</h2>
            <p>
              This Privacy Policy explains how Future Leaders Agency gathers, uses, processes, and protects
              information collected through our website (futureleaders.agency and associated domains), client
              onboarding portals, community platforms (including official Telegram and Discord channels), and
              influencer marketing campaigns.
            </p>
            <p>
              By accessing our website, collaborating with our network of 500+ KOLs and creators, or submitting
              inquiries through our forms, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Information We Collect</h2>
            <p>
              Due to the unique nature of Web3 marketing and ecosystem scaling, we distinguish between standard
              contact data and public on-chain telemetry:
            </p>
            <ul>
              <li>
                <strong>Direct Communications:</strong> Name, professional email address, project name, Telegram
                handle, Discord username, and any message details you provide when submitting a project proposal or collaboration request.
              </li>
              <li>
                <strong>Public Blockchain Data:</strong> If you participate in verified creator campaigns, bounties,
                or token-gated community operations, we may record public cryptographic wallet addresses (e.g., Ethereum,
                Solana, TON, or EVM addresses) and public transaction hashes strictly for campaign attribution and payout settlement.
                <em> Note: We will never request or have access to your private keys or seed phrases.</em>
              </li>
              <li>
                <strong>Community &amp; Social Analytics:</strong> Aggregated campaign metrics from platforms such as
                X (Twitter), Telegram channels, and Discord servers (e.g., impressions, engagement ratios, click-through rates)
                to assess marketing ROI for client projects.
              </li>
              <li>
                <strong>Technical Telemetry:</strong> Anonymized browser type, operating system, referrer URL, IP address,
                and session duration used solely for site security, spam prevention, and server load optimization.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. How We Use Collected Information</h2>
            <p>We process data under strict lawful bases including performance of contract, legitimate interest, and explicit consent:</p>
            <ul>
              <li>To evaluate project proposals and formulate customized Web3 growth and influencer strategies.</li>
              <li>To manage, coordinate, and measure KOL marketing deliverables across global regions.</li>
              <li>To execute verified community moderation and automated verification bot infrastructure.</li>
              <li>To prevent fraudulent bot traffic, malicious form submissions, and sybil activity.</li>
              <li>To deliver administrative notifications, campaign reports, and strategic ecosystem updates.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Web3 Regulatory &amp; Non-Financial Advice Disclaimer</h2>
            <div className="privacy-notice-box">
              <p>
                <strong>Important Regulatory Notice:</strong> Future Leaders operates exclusively as a Web3 digital marketing,
                community acceleration, and advisory growth network. We do <strong>NOT</strong> provide financial, legal, investment,
                or token-economics advisory services.
              </p>
              <p>
                Mention of digital assets, tokens, Layer-1/Layer-2 protocols, or decentralized applications on our platform
                does not constitute an offer to buy, sell, or solicit securities or digital financial instruments. Client projects
                bear full independent responsibility for regulatory compliance in their respective jurisdictions.
              </p>
            </div>
          </section>

          <section className="privacy-section">
            <h2>5. KOL &amp; Influencer Transparency (Global Standards)</h2>
            <p>
              Future Leaders enforces ethical Web3 marketing. All promotional campaigns orchestrated across our 500+ KOL
              network require clear and conspicuous disclosures (such as <code>#ad</code>, <code>#sponsored</code>, or
              clear partnership tags) complying with global advertising guidelines (including FTC, ASA, and European regulatory standards).
              We strictly forbid deceptive pump-and-dump coordination or undisclosed paid endorsements.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Cookies &amp; Tracking Technologies</h2>
            <p>
              Our website uses essential local storage mechanisms (such as preserving your Dark/Light mode preference)
              and minimal privacy-respecting analytics. We do not use intrusive cross-site third-party tracking cookies or sell your
              browsing data to data brokers.
            </p>
          </section>

          <section className="privacy-section">
            <h2>7. Public Ledger Mechanics &amp; Blockchain Immutability</h2>
            <p>
              Please be aware that blockchains and distributed ledger technologies are decentralized, public, and immutable.
              Transactions, wallet addresses, and smart contract interactions broadcast to a public blockchain cannot be altered,
              modified, or deleted by Future Leaders or any third party. Your use of blockchain protocols constitutes acknowledgment
              of this inherent technical characteristic.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Data Security &amp; Retention</h2>
            <p>
              We implement enterprise-grade technical safeguards including TLS 1.3 cryptographic transit encryption, strict access
              controls, and segmented storage to safeguard your submitted information. We retain personal inquiry data only for as
              long as necessary to fulfill contractual obligations, legitimate business purposes, or regulatory compliance requirements.
            </p>
          </section>

          <section className="privacy-section">
            <h2>9. Your Global Rights (GDPR &amp; CCPA Compliance)</h2>
            <p>Depending on your geographic residency, you possess rights regarding your personal information, including:</p>
            <ul>
              <li><strong>Right of Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete contact details.</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your off-chain personal data.</li>
              <li><strong>Right to Restrict or Object:</strong> Object to specific data processing activities or direct communications.</li>
            </ul>
            <p>To exercise any of these rights, contact us through our official verified channels listed below.</p>
          </section>

          <section className="privacy-section">
            <h2>10. Third-Party Links &amp; Communities</h2>
            <p>
              Our platform connects to third-party Web3 infrastructure and platforms such as Telegram, Discord, and X (Twitter).
              We are not responsible for the privacy practices, code integrity, or terms of independent third-party services.
              We encourage you to inspect the privacy disclosures of each platform you interact with.
            </p>
          </section>

          <section className="privacy-section">
            <h2>11. Contact &amp; Data Inquiries</h2>
            <p>For any questions, legal notices, or data inquiries regarding this Privacy Policy, please contact our team via:</p>
            <div className="privacy-contact-card">
              <div>
                <strong>Future Leaders Growth Network</strong>
                <br />
                <span>Web3 Ecosystem &amp; Community Architecture</span>
              </div>
              <div>
                <strong>Official Telegram:</strong>{' '}
                <a href="https://t.me/Futureleaderss0" target="_blank" rel="noopener noreferrer">
                  @Futureleaderss0
                </a>
                <br />
                <strong>Official X (Twitter):</strong>{' '}
                <a href="https://x.com/0Futureleaders" target="_blank" rel="noopener noreferrer">
                  @0Futureleaders
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer of the Privacy Page */}
        <div className="privacy-page-footer">
          <p>© 2026 Future Leaders. All rights reserved.</p>
          <button
            type="button"
            className="privacy-return-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑ Return to Top
          </button>
        </div>
      </main>
    </div>
  );
}

