import { ArrowRight } from 'lucide-react';

const DISCORD_URL = 'https://discord.gg/SdP2sAD8zT';
const TELEGRAM_URL = 'https://t.me/Futureleaderss0';

export default function Contact() {
  const handleOpenModal = () => {
    window.dispatchEvent(new CustomEvent('open-project-modal'));
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-transparent overflow-hidden">
      <div className="max-w-[1500px] mx-auto relative z-10">
        
        {/* Premium Glass Container */}
        <div className="reveal glass rounded-[2.5rem] border border-white/10 p-8 sm:p-12 md:p-16 relative overflow-hidden bg-black/40 backdrop-blur-md">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

            {/* Left Column: Premium Text & Discuss Button */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="badge mb-6 select-none">
                <span className="badge-dot" style={{ background: '#ffffff' }} />
                Get In Touch
              </span>

              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-base-strong uppercase tracking-tight leading-[1.1] mb-6 select-none">
                Let's Build Something <br className="hidden sm:inline" />
                <span className="text-gradient font-black">That Gets Noticed</span>
              </h2>

              <p className="text-base-soft text-base sm:text-lg lg:text-xl leading-relaxed mb-10 max-w-xl select-none">
                From KOL campaigns to developer support, tell us what you're building and we'll create the right strategy.
              </p>

              {/* White Outline Pill Button (Opening Form) */}
              <button
                onClick={handleOpenModal}
                className="border-2 border-white text-white hover:bg-white hover:text-slate-950 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 font-display font-black text-sm sm:text-base uppercase tracking-widest px-8 sm:px-10 py-4 rounded-2xl cursor-pointer select-none flex items-center gap-3 group btn-slide"
              >
                <span className="btn-slide-text-wrapper">
                  <span className="btn-slide-text" data-text="Discuss Your Project">Discuss Your Project</span>
                </span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 shrink-0 z-10" />
              </button>
            </div>

            {/* Right Column: Clean, Professional Social/Contact Connections */}
            <div className="lg:col-span-5 flex flex-col gap-4 w-full">
              
              {/* Discord Connection Card */}
              <a 
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 hover:shadow-glow transition-all duration-300 group/item cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#5865F2]/10 flex items-center justify-center border border-[#5865F2]/20">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#5865F2]">
                      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.957 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-base sm:text-lg uppercase tracking-tight">Discord Community</h4>
                    <p className="text-xs sm:text-sm text-slate-400">Join our chat and hang out with the team</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 transition-transform duration-300 group-hover/item:translate-x-1 group-hover/item:text-white" />
              </a>

              {/* Telegram Connection Card */}
              <a 
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 hover:shadow-glow transition-all duration-300 group/item cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#229ED9]/10 flex items-center justify-center border border-[#229ED9]/20">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#229ED9]">
                      <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.55-1.1.55l.4-5.56 10.1-9.13c.44-.39-.1-.61-.68-.22L6.27 13.06l-5.4-1.69c-1.17-.37-1.2-1.17.25-1.73l21.1-8.13c.98-.36 1.83.22 1.51 1.78z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-base sm:text-lg uppercase tracking-tight">Telegram channel</h4>
                    <p className="text-xs sm:text-sm text-slate-400">Reach out directly and subscribe for updates</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 transition-transform duration-300 group-hover/item:translate-x-1 group-hover/item:text-white" />
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
