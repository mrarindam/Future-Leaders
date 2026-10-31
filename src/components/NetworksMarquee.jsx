import React from 'react';

const NETWORKS = [
  {
    name: 'Ethereum',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.366 4.354 7.365-4.354L12.056 0z" />
      </svg>
    ),
  },
  {
    name: 'Solana',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4 18.25a1.25 1.25 0 0 1 .88-2.13h14.24a.63.63 0 0 1 .44 1.07l-3.32 3.32a1.25 1.25 0 0 1-.88.37H1.12a.63.63 0 0 1-.44-1.07l3.32-3.32v-.24zm0-6.5a1.25 1.25 0 0 1 .88-2.13h14.24a.63.63 0 0 1 .44 1.07l-3.32 3.32a1.25 1.25 0 0 1-.88.37H1.12a.63.63 0 0 1-.44-1.07l3.32-3.32v-.24zm11.44-8.63a1.25 1.25 0 0 0-.88-.37H.32a.63.63 0 0 0-.44 1.07l3.32 3.32a1.25 1.25 0 0 0 .88.37h14.24a.63.63 0 0 0 .44-1.07l-3.32-3.32z" />
      </svg>
    ),
  },
  {
    name: 'Avalanche',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2L1 21h5.8l5.2-9 5.2 9H23L12 2zm0 6.2l3.4 5.9h-6.8L12 8.2z" />
      </svg>
    ),
  },
  {
    name: 'Cosmos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
        <line x1="5.2" y1="18.8" x2="18.8" y2="5.2" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Arbitrum',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1.5L2.25 7.13v11.25L12 24l9.75-5.62V7.13L12 1.5zm-1.5 5.25h3v7.5l-3 1.73V6.75zm-4.5 4.12l3-1.73v5.62l-3 1.73v-5.62zm12 5.62l-3 1.73V12l3-1.73v5.62z" />
      </svg>
    ),
  },
  {
    name: 'Optimism',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="11" />
        <text x="12" y="15.8" fill="#ffffff" fontSize="10.5" fontWeight="900" fontStyle="italic" textAnchor="middle" fontFamily="system-ui, sans-serif">
          OP
        </text>
      </svg>
    ),
  },
  {
    name: 'Celestia',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <ellipse cx="12" cy="12" rx="4.5" ry="10" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
      </svg>
    ),
  },
  {
    name: 'Polkadot',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="3" r="2.1" />
        <circle cx="18.36" cy="5.64" r="2.1" />
        <circle cx="21" cy="12" r="2.1" />
        <circle cx="18.36" cy="18.36" r="2.1" />
        <circle cx="12" cy="21" r="2.1" />
        <circle cx="5.64" cy="18.36" r="2.1" />
        <circle cx="3" cy="12" r="2.1" />
        <circle cx="5.64" cy="5.64" r="2.1" />
      </svg>
    ),
  },
  {
    name: 'NEAR',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4 19.5V4.5l11.5 15h4.5V4.5h-4v10.5L4.5 4H0v15.5h4z" />
      </svg>
    ),
  },
  {
    name: 'Chainlink',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2L4 6.6v9.2L12 20.4l8-4.6V6.6L12 2zm0 3.3l5.2 3v5.9L12 17.2l-5.2-3V8.3L12 5.3z" />
      </svg>
    ),
  },
  {
    name: 'Hyperledger',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="4" y1="7" x2="20" y2="17" />
        <line x1="4" y1="17" x2="20" y2="7" />
        <circle cx="12" cy="12" r="3.5" fill="none" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    name: 'Polygon',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.5 7.5L12 4.9 7.5 7.5v5.2l4.5 2.6 4.5-2.6V7.5zm-4.5 10.3l-4.5-2.6v-2.2l4.5 2.6 4.5-2.6v2.2l-4.5 2.6z" />
      </svg>
    ),
  },
  {
    name: 'Base',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6h4v12h-4a6 6 0 1 1 0-12z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'BNB Chain',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1.5L7.76 5.74l4.24 4.24 4.24-4.24L12 1.5zm6.24 6.24l-4.24 4.24 4.24 4.24 4.24-4.24-4.24-4.24zM12 14l-4.24-4.24L3.52 14l4.24 4.24L12 14zm-6.24-6.22L1.52 12l4.24 4.24 4.24-4.24-4.24-4.22zm6.24 6.22l4.24 4.24L12 22.48l-4.24-4.24L12 14z" />
      </svg>
    ),
  },
  {
    name: 'Sui',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C8 8 5 13 5 16.5a7 7 0 0 0 14 0C19 13 16 8 12 2zm0 18.5a4.5 4.5 0 0 1-4.5-4.5c0-2.3 2-5.7 4.5-9.3 2.5 3.6 4.5 7 4.5 9.3a4.5 4.5 0 0 1-4.5 4.5z" />
      </svg>
    ),
  },
  {
    name: 'Aptos',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3 18h18v2.5H3V18zm2-6h14v2.5H5V12zm4-6h6v2.5H9V6zm-5-3h16v1.5H4V3z" />
      </svg>
    ),
  },
];

const TECHNOLOGIES = [
  {
    name: 'Solidity',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.5 2L12 9.5l4.5 7.5 4.5-7.5L16.5 2zm-9 0L3 9.5l4.5 7.5L12 9.5 7.5 2zm4.5 12.5L7.5 22 12 17l4.5 5-4.5-7.5z" />
      </svg>
    ),
  },
  {
    name: 'Node.Js',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.4L5.2 8.3v7.4l6.8 3.9 6.8-3.9V8.3L12 4.4z" />
        <path d="M9.5 8h2v5.5H15v1.8H9.5V8z" />
      </svg>
    ),
  },
  {
    name: 'Golang',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M1.5 10.5h4v1.5h-4v-1.5zm-1 3h5v1.5h-5v-1.5zm2 3h3v1.5h-3v-1.5zm11.5-6.5a4.5 4.5 0 0 0-4.5 4.5c0 2.48 2.02 4.5 4.5 4.5 2.1 0 3.86-1.44 4.34-3.4H14v-2h6.8c.13.62.2 1.25.2 1.9 0 4.14-3.36 7.5-7.5 7.5a7.5 7.5 0 1 1 0-15c2.6 0 4.88 1.33 6.2 3.35l-2.2 1.3c-.88-1.3-2.34-2.15-4-2.15zm8.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.9 2c-3.4 0-5.4.3-5.4 1.8 0 1.2.6 1.8 2 1.8h3.4v1.2H7.2C4 6.8 2.5 8.7 2.5 11.8c0 2.8 1.4 4.8 4.6 4.8h1.4v-1.9c0-1.8 1.5-3.3 3.4-3.3h5.2c1.4 0 2.5-1.1 2.5-2.5V5.5C19.6 3 17 2 11.9 2zm-1.8 1.7a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm1.8 18.3c3.4 0 5.4-.3 5.4-1.8 0-1.2-.6-1.8-2-1.8H12v-1.2h4.7c3.2 0 4.7-1.9 4.7-5 0-2.8-1.4-4.8-4.6-4.8h-1.4v1.9c0 1.8-1.5 3.3-3.4 3.3H6.8c-1.4 0-2.5 1.1-2.5 2.5v3.4c0 2.5 2.6 3.5 7.6 3.5zm1.8-1.7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
      </svg>
    ),
  },
  {
    name: 'Web3.Js',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l9 5.2v9.6L12 22l-9-5.2V7.2L12 2zm0 2.3L5 8.3l7 4 7-4-7-4zm-7 7.2v6.2l6 3.5v-6.2l-6-3.5zm8 3.5l6-3.5v6.2l-6 3.5v-6.2z" />
      </svg>
    ),
  },
  {
    name: 'C++',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.25L3.75 7v10L12 21.75 20.25 17V7L12 2.25zm0 2.3l6.25 3.6v7.7L12 19.45l-6.25-3.6V8.15L12 4.55zM9.5 9a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3c1.2 0 2.2-.7 2.7-1.8l-1.3-.7c-.3.6-.8 1-1.4 1a1.5 1.5 0 0 1-1.5-1.5v0A1.5 1.5 0 0 1 9.5 10.5c.6 0 1.1.4 1.4 1l1.3-.7A3 3 0 0 0 9.5 9zm4.5 1.5v1h-1v1h1v1h1v-1h1v-1h-1v-1h-1zm3 0v1h-1v1h1v1h1v-1h1v-1h-1v-1h-1z" />
      </svg>
    ),
  },
  {
    name: 'IPFS',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1.5l9 5.2v10.5L12 22.5 3 17.2V6.7L12 1.5zm0 2.3L5.25 7.8 12 11.7l6.75-3.9L12 3.8zm-7.5 5.5v7.7l6.5 3.8v-7.7L4.5 9.3zm15 0l-6.5 3.8v7.7l6.5-3.8V9.3z" />
      </svg>
    ),
  },
  {
    name: 'Rust',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 2a8 8 0 0 1 7.4 5h-2.1a6 6 0 0 0-1.8-2.2l1.1-1.8A7.9 7.9 0 0 1 12 4zm-3.5 1.8l1.1 1.8A6 6 0 0 0 7.8 10H5.7a8 8 0 0 1 2.8-4.2zm-4.1 6.2h2.2a6 6 0 0 0 0 2H4.4a8 8 0 0 1 0-2zm1.3 4.2h2.1a6 6 0 0 0 1.8 2.2l-1.1 1.8A8 8 0 0 1 5.6 16.2zm6.4 3.8a8 8 0 0 1-4.6-1.5l1.1-1.8a6 6 0 0 0 2.4.9v2.4zm2 0v-2.4a6 6 0 0 0 2.4-.9l1.1 1.8A8 8 0 0 1 14 20zm4.4-3.8h-2.1a6 6 0 0 0-1.8-2.2l1.1-1.8a8 8 0 0 1 2.8 4zm1.2-4.2h-2.2a6 6 0 0 0 0-2h2.2a8 8 0 0 1 0 2zM9 8h4.5a2.5 2.5 0 0 1 1.8 4.2L16 16h-2.2l-.7-3.5H11V16H9V8zm2 2v2.5h2.5a1.25 1.25 0 0 0 0-2.5H11z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3 3h18v18H3V3zm8.5 7.5h-5V9H14v1.5h-1.5V17h-2v-6.5zm5.5 1.7c-.8-.4-1.4-.7-1.4-1.2 0-.4.4-.7 1-.7.6 0 1.2.3 1.7.7l1-1.2c-.8-.7-1.7-1-2.7-1-1.8 0-3 1.1-3 2.5 0 1.2.8 1.9 2.2 2.5.9.4 1.5.7 1.5 1.3 0 .5-.5.8-1.2.8-.8 0-1.6-.4-2.2-1l-1 1.3c.9.9 2 1.3 3.2 1.3 2 0 3.3-1.1 3.3-2.6 0-1.4-.9-2.1-2.4-2.7z" />
      </svg>
    ),
  },
  {
    name: 'Hardhat',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-9 9v3h18v-3a9 9 0 0 0-9-9zm-1 3.2h2v4.8h-2V6.2zm-4 1.8l1.4 1.4-3.4 3.4-1.4-1.4 3.4-3.4zm8 0l3.4 3.4-1.4 1.4-3.4-3.4 1.4-1.4zM2 17h20v4H2v-4z" />
      </svg>
    ),
  },
  {
    name: 'Foundry',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3 5h18v3l-5 3v3h4v3H4v-3h4v-3L3 8V5zm7 11h4v4h-4v-4zm-8 4h20v2H2v-2z" />
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2zm0 2.3L4.8 8v8l7.2 4.1 7.2-4.1V8L12 4.3zM12 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm5 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
      </svg>
    ),
  },
];

export default function NetworksMarquee() {
  const duplicatedNetworks = [...NETWORKS, ...NETWORKS];
  const duplicatedTech = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section className="networks-marquee-section" aria-label="Blockchain And Technologies We Work With">
      <h2 className="networks-marquee-title">
        Blockchain And Technologies We Work With
      </h2>

      <div className="networks-marquee-rows">
        {/* ROW 1: BLOCKCHAIN NETWORKS */}
        <div className="networks-marquee-viewport">
          <div className="networks-marquee-track track-left-to-right">
            {duplicatedNetworks.map((network, index) => (
              <div
                key={`net-${network.name}-${index}`}
                className="networks-marquee-item"
              >
                <span className="networks-marquee-icon">{network.icon}</span>
                <span className="networks-marquee-name">{network.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: TECHNOLOGIES */}
        <div className="networks-marquee-viewport">
          <div className="networks-marquee-track track-left-to-right">
            {duplicatedTech.map((tech, index) => (
              <div
                key={`tech-${tech.name}-${index}`}
                className="networks-marquee-item"
              >
                <span className="networks-marquee-icon">{tech.icon}</span>
                <span className="networks-marquee-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
