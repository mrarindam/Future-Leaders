import { useEffect, useState } from 'react';
import {
  Menu as MenuIcon,
  X as XIcon,
  Sun,
  Moon,
  Home,
  Layers,
  ShieldCheck,
  Users,
  MessageSquare,
  HelpCircle,
  Zap,
  ZapOff
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import navLogoImg from '../../images/navLogo.webp';
import { usePerformance } from '../../context/PerformanceContext.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const { performanceMode, togglePerformanceMode } = usePerformance();
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

  // Load and apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('fl-theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('fl-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  };

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
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300 w-full"
    >
      <div
        className={`w-full mx-auto transition-all duration-300 ${scrolled
            ? 'glass-strong shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-3 px-6 sm:px-12 border-b border-base'
            : 'bg-transparent py-5 px-6 sm:px-12 border-none'
          }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleAnchorClick(e, '#home')} className="flex items-center select-none">
            <img
              src={navLogoImg}
              alt="Future Leaders Logo"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="flex items-center gap-2 text-xs xl:text-sm font-display font-black tracking-widest uppercase hover:text-cyan-brand transition-colors text-base-muted"
              >
                <link.icon className="w-4 h-4 text-cyan-brand/85" />
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Eco Mode Toggle */}
            <button
              onClick={() => togglePerformanceMode()}
              title={performanceMode ? 'Eco Mode: ON (Battery & GPU Saver active)' : 'Eco Mode: OFF (High Fidelity active)'}
              aria-label="Toggle Performance Eco Mode"
              className={`w-10 h-10 rounded-xl glass border flex items-center justify-center transition-all duration-300 ${performanceMode
                  ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'border-base text-cyan-brand hover:border-cyan-brand/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                }`}
            >
              {performanceMode ? <ZapOff className="w-5 h-5" /> : <Zap className="w-5 h-5 animate-pulse" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-10 h-10 rounded-xl glass border border-base flex items-center justify-center text-base-strong hover:border-cyan-brand/50 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

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
            {/* Mobile Eco Mode Toggle */}
            <button
              onClick={() => togglePerformanceMode()}
              aria-label="Toggle Performance Eco Mode"
              className={`w-9 h-9 rounded-lg glass border flex items-center justify-center transition-all duration-300 ${performanceMode
                  ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10'
                  : 'border-base text-cyan-brand'
                }`}
            >
              {performanceMode ? <ZapOff className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-lg glass border border-base flex items-center justify-center text-base-strong"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="w-9 h-9 rounded-lg glass border border-base flex items-center justify-center text-base-strong"
            >
              {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Flush Full-Width Mobile Menu Panel */}
      <div
        className={`absolute top-full left-0 right-0 bg-white dark:bg-[#07070d] border-b border-slate-200 dark:border-slate-800/80 transition-all duration-300 lg:hidden flex flex-col shadow-2xl ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
      >
        <div className="flex flex-col py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="flex items-center gap-3 text-sm font-display font-black tracking-widest uppercase hover:text-cyan-brand transition-colors text-base-strong py-4 px-6 border-b border-slate-100 dark:border-slate-900/50 last:border-none"
            >
              <link.icon className="w-4 h-4 text-cyan-brand" />
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

