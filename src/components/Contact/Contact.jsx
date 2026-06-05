import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import discussImg from '../../images/discusstheproejct.webp';

export default function Contact() {
  const handleOpenModal = () => {
    window.dispatchEvent(new CustomEvent('open-project-modal'));
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-transparent overflow-hidden">

      <div className="max-w-[1500px] mx-auto relative z-10">

        {/* Flat Layout Container (No Floating Card/Borders/Shadows) */}
        <div
          className="reveal relative overflow-hidden"
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Premium Text & Discuss Button */}
            <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10">
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

            {/* Right Column: Premium 3D Discussion Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center relative z-10">
              <div className="relative group">
                {/* Floating animation container */}
                <div className="animate-float-slow">
                  <img
                    src={discussImg}
                    alt="Discuss the project illustration"
                    className="w-full max-w-[480px] h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1 select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Floating Animation Styles */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
