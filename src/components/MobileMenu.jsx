import React from 'react';

export default function MobileMenu({ isOpen, onClose, activeSection, onNavigate }) {
  const navItems = [
    { label: 'Home', section: 0, href: '#hero-section' },
    { label: 'Solutions', section: 1, href: '#services-section' },
    { label: 'Why Us', section: 2, href: '#why-section' },
    { label: 'Team', section: 3, href: '#team-section' },
    { label: 'Contact', section: 4, href: '#contact-section' },
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
        </nav>
      </div>
    </>
  );
}
