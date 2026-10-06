import React from 'react';

export default function Header({ activeSection, onNavigate, onToggleMobileMenu, isMobileMenuOpen }) {
  const navItems = [
    { label: 'Home', section: 0, href: '#hero-section' },
    { label: 'Solutions', section: 1, href: '#services-section' },
    { label: 'Why Us', section: 2, href: '#why-section' },
    { label: 'Team', section: 3, href: '#team-section' },
    { label: 'Contact', section: 4, href: '#contact-section' },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        {/* Desktop Unified Nav Pill (Logo + Links in ONE Container, No Sign In) */}
        <nav className="nav-pill nav-pill-unified" aria-label="Desktop Navigation">
          <a
            href="#hero-section"
            className="nav-logo-link"
            aria-label="Home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(0);
            }}
          >
            <img src="/favicon.png" alt="Future Leaders" width="34" height="34" />
          </a>

          <span className="nav-divider" aria-hidden="true" />

          <div className="nav-links-wrap">
            {navItems.map((item) => (
              <a
                key={item.section}
                href={item.href}
                className={`nav-link ${activeSection === item.section ? 'active' : ''}`}
                data-section={item.section}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.section);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Header Bar (Only visible on screens <= 768px) */}
        <div className="mobile-header-bar">
          <a
            href="#hero-section"
            className="logo-btn mobile-only-logo"
            aria-label="Home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(0);
            }}
          >
            <img src="/favicon.png" alt="Future Leaders" width="44" height="44" />
          </a>

          <button
            className={`burger-btn ${isMobileMenuOpen ? 'open' : ''}`}
            id="burger-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={onToggleMobileMenu}
          >
            <span className="burger-bar" />
            <span className="burger-bar" />
            <span className="burger-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
