const DISCORD_URL = 'https://discord.gg/SdP2sAD8zT';
const TELEGRAM_URL = 'https://t.me/Futureleaderss0';

const Icon = {
  Discord: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.957 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  Telegram: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.55-1.1.55l.4-5.56 10.1-9.13c.44-.39-.1-.61-.68-.22L6.27 13.06l-5.4-1.69c-1.17-.37-1.2-1.17.25-1.73l21.1-8.13c.98-.36 1.83.22 1.51 1.78z" />
    </svg>
  ),
};

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="reveal relative glass-strong holo-border rounded-3xl p-8 sm:p-16 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(0,217,255,0.25), transparent 60%), radial-gradient(circle at 50% 100%, rgba(122,92,255,0.25), transparent 60%)'
            }}
          />
          <div className="relative">
            <h2 className="section-title text-4xl sm:text-5xl md:text-6xl mb-5 mt-5 leading-tight text-base-strong">
              Join <span className="text-gradient">FUTURE LEADERS</span>
            </h2>
            <p className="max-w-xl mx-auto text-base-muted text-base sm:text-lg leading-relaxed mb-10">
              Build connections. Earn opportunities. Grow together. The next chapter of Web3 is community led and it starts here.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 select-none">
              <a
                href="#contact"
                className="btn-primary btn-slide inline-flex items-center gap-3 text-base !px-10 !py-5 hover:scale-105 transition-all cursor-pointer font-black"
              >
                <span className="btn-slide-text-wrapper">
                  <span className="btn-slide-text" data-text="Start Project">Start Project</span>
                </span>
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost btn-slide inline-flex items-center gap-3 text-base !px-10 !py-5 hover:scale-105 transition-all font-bold"
              >
                <Icon.Discord className="w-5 h-5 text-[#5865F2] shrink-0" />
                <span className="btn-slide-text-wrapper">
                  <span className="btn-slide-text" data-text="Join the Discord">Join the Discord</span>
                </span>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 select-none">
              <a
                href="https://x.com/0Futureleaders"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass border border-base rounded-full px-5 py-2.5 text-xs sm:text-sm text-base-soft hover:text-cyan-brand hover:border-cyan-brand/50 hover:scale-105 transition-all font-display tracking-widest uppercase font-bold"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow Us
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass border border-base rounded-full px-5 py-2.5 text-xs sm:text-sm text-base-soft hover:text-cyan-brand hover:border-cyan-brand/50 hover:scale-105 transition-all font-display tracking-widest uppercase font-bold"
              >
                <Icon.Telegram className="w-4 h-4" />
                Join Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
