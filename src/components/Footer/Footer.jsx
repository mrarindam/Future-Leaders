import logoImg from '../../images/logo.jpg';

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
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-base" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(10px)' }}>
      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4 select-none">
              <img src={logoImg} alt="Future Leaders Logo" className="w-9 h-9 rounded-xl object-cover flex-shrink-0 border border-base" />
              <span className="font-display font-black tracking-widest text-base-strong">FUTURE <span className="text-gradient">LEADERS</span></span>
            </div>
            <p className="text-base-soft text-sm leading-relaxed">Building Web3 communities and scaling NFT ecosystems through engagement, raids, and strategic alpha.</p>
          </div>
          <div>
            <p className="font-display text-xs tracking-[0.3em] text-base-faint mb-4 uppercase select-none">Navigate</p>
            <ul className="space-y-2 text-sm">
              {[['About', '#about'], ['Services', '#services'], ['Why Us', '#why'], ['Team', '#team'], ['FAQ', '#faq']].map(([l, h]) => (
                <li key={h}><a className="text-base-muted hover:text-cyan-brand transition-colors" href={h}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-xs tracking-[0.3em] text-base-faint mb-4 uppercase select-none">Connect</p>
            <div className="flex gap-3 mb-5">
              <a href="https://discord.gg/SdP2sAD8zT" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="w-11 h-11 rounded-xl glass border border-base flex items-center justify-center transition-all hover:border-cyan-brand/50 hover:scale-105">
                <Icon.Discord className="w-4 h-4 text-base-muted" />
              </a>
              <a href="https://x.com/0Futureleaders" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-11 h-11 rounded-xl glass border border-base flex items-center justify-center transition-all hover:border-cyan-brand/50 hover:scale-105">
                <Icon.X className="w-4 h-4 text-base-muted" />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-base flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-base-faint select-none">
          <p>© {new Date().getFullYear()} Future Leaders. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-base-muted transition">Terms</a>
            <a href="#" className="hover:text-base-muted transition">Privacy</a>
            <a href="#" className="hover:text-base-muted transition">Community Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
