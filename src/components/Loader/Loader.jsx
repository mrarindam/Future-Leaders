import { useEffect, useState } from 'react';
import logoImg from '../../images/logo.jpg';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // 1. Force the page to always scroll to top on mount
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Lock body and root HTML scroll to prevent any scrolling in the background
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // 3. Keep scroll locked to (0,0) in case browser triggers auto-scroll restores
    const preventScroll = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('scroll', preventScroll);

    const t = setTimeout(() => {
      setHidden(true);

      // 4. Clean up scroll locks
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('scroll', preventScroll);
      window.scrollTo(0, 0);

      // Dispatch custom event to notify App that loader is finished
      window.dispatchEvent(new CustomEvent('fl-loader-done'));
    }, 1200);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('scroll', preventScroll);
    };
  }, []);

  return (
    <div className={`loader${hidden ? ' hidden' : ''}`} aria-hidden={hidden}>
      <img 
        src={logoImg} 
        alt="Future Leaders Logo" 
        className="w-16 h-16 rounded-2xl object-cover mb-2 border border-base shadow-glow-cyan animate-pulse flex-shrink-0" 
      />
      <div className="loader-logo">FUTURE LEADERS</div>
      <div className="loader-bar" />
      <div className="font-display text-xs text-base-faint tracking-[0.4em]">INITIALIZING WEB3 PROTOCOL</div>
    </div>
  );
}

