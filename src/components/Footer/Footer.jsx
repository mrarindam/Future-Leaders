import { Link, useLocation, useNavigate } from 'react-router-dom';

const Icon = {
  Discord: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.957 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  X: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Telegram: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.55-1.1.55l.4-5.56 10.1-9.13c.44-.39-.1-.61-.68-.22L6.27 13.06l-5.4-1.69c-1.17-.37-1.2-1.17.25-1.73l21.1-8.13c.98-.36 1.83.22 1.51 1.78z" />
    </svg>
  ),
};

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  // Route to the home section when a footer nav link is clicked from another page.
  const handleAnchorClick = (e, href) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + href); // e.g. '/#about'
    }
  };

  return (
    <footer className="relative z-10 bg-[#030303] text-white border-t border-white/10">
      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          {/* Logo & Description */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4 select-none">
              <div className="flex items-center justify-center w-8 h-8 bg-[#121212] border border-white/10 rounded-lg p-1 shrink-0">
                <img
                  src="/logo.webp"
                  alt="Future Leaders Logo"
                  className="w-full h-full object-contain rounded-[4px]"
                />
              </div>
              <span className="font-display font-black tracking-widest text-xl text-white uppercase">FUTURE LEADERS</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Building Web3 communities and scaling NFT ecosystems through engagement, raids, and strategic alpha.
            </p>
            {/* Social Icons (Simple, Borderless, Grayscale) */}
            <div className="flex items-center gap-5 select-none">
              <a href="https://discord.gg/SdP2sAD8zT" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="text-slate-400 hover:text-white transition-colors">
                <Icon.Discord className="w-5 h-5" />
              </a>
              <a href="https://x.com/0Futureleaders" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-slate-400 hover:text-white transition-colors">
                <Icon.X className="w-4 h-4" />
              </a>
              <a href="https://t.me/Futureleaderss0" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-slate-400 hover:text-white transition-colors">
                <Icon.Telegram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 1: Navigation */}
          <div className="md:col-span-2 flex flex-col">
            <p className="font-display text-base lg:text-lg font-bold text-white mb-4 select-none">Navigation</p>
            <ul className="space-y-3 text-base">
              {[
                ['Services', '#services'],
                ['Why Us', '#why'],
                ['Team', '#team'],
                ['FAQ', '#faq']
              ].map(([l, h]) => (
                <li key={h}>
                  <a className="text-slate-400 hover:text-white transition-colors font-medium" href={h} onClick={(e) => handleAnchorClick(e, h)}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="md:col-span-2 flex flex-col">
            <p className="font-display text-base lg:text-lg font-bold text-white mb-4 select-none">Company</p>
            <ul className="space-y-3 text-base">
              {[
                ['About Us', '#about'],
                ['Contact', '#contact']
              ].map(([l, h]) => (
                <li key={h}>
                  <a className="text-slate-400 hover:text-white transition-colors font-medium" href={h} onClick={(e) => handleAnchorClick(e, h)}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col">
            <p className="font-display text-base lg:text-lg font-bold text-white mb-4 select-none">Information</p>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 select-none">
          <p>© {new Date().getFullYear()} Future Leaders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
