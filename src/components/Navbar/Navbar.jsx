import { useEffect, useState } from 'react';
import {
  Menu as MenuIcon,
  X as XIcon,
  Home,
  Layers,
  ShieldCheck,
  Users,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();
  const navigate = useNavigate();

  // Nav links point to in-page sections (#services, etc). When we're on another
  // route (e.g. the Privacy Policy page), intercept the click, route to home,
  // then let App scroll to the target section. On home, native smooth-scroll runs.
  const handleAnchorClick = (e, href) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + href); // e.g. '/#services'
    }
    setMobileMenuOpen(false);
  };

  // Load and apply theme (force dark mode)
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'Services', href: '#services', icon: Layers },
    { label: 'Why Us', href: '#why', icon: ShieldCheck },
    { label: 'Operators', href: '#team', icon: Users },
    { label: 'Reach Us', href: '#contact', icon: MessageSquare },
    { label: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300 w-full flex justify-center pointer-events-none"
    >
      <div
        className={`transition-all duration-300 pointer-events-auto ${scrolled
            ? 'w-full lg:w-[92%] lg:max-w-[1250px] lg:mt-4 bg-transparent lg:bg-black/70 lg:backdrop-blur-md border-none lg:border lg:border-white/10 shadow-none lg:shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3 lg:py-2.5 px-6 rounded-none lg:rounded-full'
            : 'w-full bg-transparent py-5 px-6 lg:px-12 border-none rounded-none'
          }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleAnchorClick(e, '#home')} className="flex items-center select-none">
            <div className="flex items-center justify-center w-12 h-12 bg-[#121212] border border-white/10 rounded-xl p-1.5 transition-transform hover:scale-105">
              <img
                src="/logo.webp"
                alt="Future Leaders Logo"
                className="w-full h-full object-contain rounded-[6px]"
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="group flex items-center gap-2 text-xs xl:text-sm font-display font-black tracking-widest uppercase hover:text-white transition-colors text-slate-400"
              >
                <link.icon className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="btn-primary btn-slide flex items-center gap-2 select-none cursor-pointer font-black"
            >
              <span className="btn-slide-text-wrapper">
                <span className="btn-slide-text" data-text="Start Project">Start Project</span>
              </span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Flush Full-Width Mobile Menu Panel */}
      <div
        className={`absolute top-full left-0 right-0 bg-[#050505] border-b border-white/10 transition-all duration-300 lg:hidden flex flex-col shadow-2xl ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
      >
        <div className="flex flex-col py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="group flex items-center justify-center gap-3 text-sm font-display font-black tracking-widest uppercase hover:text-white transition-colors text-slate-300 py-4 px-6 border-b border-white/5 last:border-none"
            >
              <link.icon className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              <span>{link.label}</span>
            </a>
          ))}
          <div className="px-6 py-4">
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="btn-primary btn-slide w-full text-center py-3.5 justify-center select-none cursor-pointer font-black flex items-center gap-2"
            >
              <span className="btn-slide-text-wrapper">
                <span className="btn-slide-text" data-text="Start Project">Start Project</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

