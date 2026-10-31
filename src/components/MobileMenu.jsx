import React from 'react';

export default function MobileMenu({ isOpen, onClose, activeSection, onNavigate, theme, onToggleTheme }) {
  const navItems = [
    { label: 'Home', section: 0, href: '#hero-section' },
    { label: 'Solutions', section: 1, href: '#services-section' },
    { label: 'Why Us', section: 2, href: '#why-section' },
    { label: 'Team', section: 3, href: '#team-section' },
    { label: 'FAQ', section: 4, href: '#faq-section' },
  ];

  return (
    <>
      <div
        id="mobile-overlay"
        className={`mobile-overlay ${isOpen ? 'open' : ''}`}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        id="mobile-menu"
        className={`mobile-menu ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        hidden={!isOpen}
      >
        <nav className="mobile-nav-links" aria-label="Mobile Menu Links">
          {navItems.map((item) => (
            <a
              key={item.section}
              href={item.href}
              className={`mobile-nav-link ${activeSection === item.section ? 'active' : ''}`}
              data-section={item.section}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.section);
                onClose();
              }}
            >
              {item.label}
            </a>
          ))}

          <div className="mobile-menu-footer">
            <button
              type="button"
              className="mobile-menu-theme-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <>
                  <svg className="theme-toggle-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <svg className="theme-toggle-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <a
              href="#contact-section"
              className="mobile-menu-contact-btn"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(5);
                onClose();
              }}
            >
              Contact Us
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
