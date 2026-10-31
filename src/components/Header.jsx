import React from 'react';

export default function Header({
  activeSection,
  onNavigate,
  onToggleMobileMenu,
  isMobileMenuOpen,
  theme,
  onToggleTheme,
}) {
  const navItems = [
    { label: 'Home', section: 0, href: '#hero-section' },
    { label: 'Solutions', section: 1, href: '#services-section' },
    { label: 'Why Us', section: 2, href: '#why-section' },
    { label: 'Team', section: 3, href: '#team-section' },
    { label: 'FAQ', section: 4, href: '#faq-section' },
  ];

  return (
    <header className="header header--wide">
      <div className="header-inner header-inner--wide">
        {/* Desktop Wide Frosted Navigation Bar matching Hero style */}
        <nav className="nav-wide-bar" aria-label="Desktop Navigation">
          {/* Logo on Left */}
          <a
            href="#hero-section"
            className="nav-wide-logo"
            aria-label="Future Leaders Home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(0);
            }}
          >
            <img src="/favicon.png" alt="Future Leaders" width="44" height="44" />
            <span className="nav-brand-text">Future Leaders</span>
          </a>

          {/* Nav Links in Center */}
          <div className="nav-wide-links">
            {navItems.map((item) => (
              <a
                key={item.section}
                href={item.href}
                className={`nav-wide-link ${activeSection === item.section ? 'active' : ''}`}
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

          {/* Right Action Cluster: Contact Button + Theme Toggle */}
          <div className="nav-wide-actions">
            <a
              href="#contact-section"
              className="nav-wide-btn"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(5);
              }}
            >
              Contact Us
            </a>

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                /* Sun Icon */
                <svg
                  className="theme-toggle-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
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
                /* Moon Icon */
                <svg
                  className="theme-toggle-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Header Bar (Only visible on screens <= 899px) */}
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
            <img src="/favicon.png" alt="Future Leaders" width="38" height="38" />
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
