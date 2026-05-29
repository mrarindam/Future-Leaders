import React, { useState, useEffect } from 'react';
import './Navbar.css';
import navLogo from '../../images/navLogo.png';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the very top of the page
      if (currentScrollY < 80) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - Hide
        setVisible(false);
      } else {
        // Scrolling up - Show
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const DiscordLogo = () => (
    <svg viewBox="0 0 127.14 96.36" className="discord-icon" aria-hidden="true">
      <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.88,6.83,77.19,77.19,0,0,0,49.58,0,105.15,105.15,0,0,0,19.14,8.07C2.81,32.22-1.71,55.77.49,78.9A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c.87-.64,1.72-1.31,2.53-2a75.76,75.76,0,0,0,72.6,0c.81.7,1.66,1.37,2.53,2a68.43,68.43,0,0,1-10.45,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.52-17.46C129.85,50.21,125.13,26.85,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
    </svg>
  );

  return (
    <nav className={`navbar ${visible ? 'navbar--visible' : 'navbar--hidden'}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={navLogo} alt="Future Leaders Logo" className="navbar-logo-img" />
        </div>
        <button className="navbar-btn-slide">
          <div className="navbar-btn-slide-wrapper">
            {/* Default State: Black on White */}
            <div className="navbar-btn-slide-row navbar-btn-slide-row--default">
              <DiscordLogo />
              <span>JOIN US</span>
            </div>
            {/* Hovered State: White on Black */}
            <div className="navbar-btn-slide-row navbar-btn-slide-row--hover">
              <DiscordLogo />
              <span>JOIN US</span>
            </div>
          </div>
        </button>
      </div>
    </nav>
  );
}
