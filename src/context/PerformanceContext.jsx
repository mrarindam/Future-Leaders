import { createContext, useContext, useState, useEffect, useRef } from 'react';

const PerformanceContext = createContext(null);

export function usePerformance() {
  return useContext(PerformanceContext);
}

export function PerformanceProvider({ children }) {
  const [performanceMode, setPerformanceMode] = useState(() => {
    // 1. Check local storage first
    const saved = localStorage.getItem('fl-eco-mode');
    if (saved !== null) {
      return saved === 'true';
    }

    // 2. Fallbacks / Telemetry auto-activation
    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return true;

    // Mobile viewport
    const isMobileViewport = window.innerWidth < 768;
    if (isMobileViewport) return true;

    // Hardware checks (cores / RAM)
    const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
    if (lowCores || lowMemory) return true;

    return false;
  });

  const [toast, setToast] = useState({ visible: false, message: '', isAuto: false });
  const manualOverride = useRef(localStorage.getItem('fl-eco-mode') !== null);

  // Sync state to local storage
  const togglePerformanceMode = (val) => {
    const nextVal = typeof val === 'boolean' ? val : !performanceMode;
    setPerformanceMode(nextVal);
    localStorage.setItem('fl-eco-mode', String(nextVal));
    manualOverride.current = true;
    
    // Hide toast on manual toggle
    setToast((prev) => ({ ...prev, visible: false }));
  };

  // Sync eco-mode class to HTML root
  useEffect(() => {
    if (performanceMode) {
      document.documentElement.classList.add('eco-mode');
    } else {
      document.documentElement.classList.remove('eco-mode');
    }
  }, [performanceMode]);

  // FPS Profiler logic
  useEffect(() => {
    // If user already manually selected a mode, don't run automatic profiling override
    if (manualOverride.current || performanceMode) return;

    let frameCount = 0;
    let startTime = performance.now();
    let rafId;

    const profile = (timestamp) => {
      frameCount++;
      const elapsed = timestamp - startTime;

      if (elapsed >= 3000) { // Profile for 3 seconds
        const fps = Math.round((frameCount * 1000) / elapsed);
        console.log(`[FL Telemetry] Average framerate profiled: ${fps} FPS`);
        
        if (fps < 45) {
          console.warn('[FL Telemetry] Performance lag detected. Enabling Eco Mode.');
          setPerformanceMode(true);
          setToast({
            visible: true,
            message: 'Eco Mode automatically enabled to keep animation frame rates fluid.',
            isAuto: true
          });
        }
        return;
      }

      rafId = requestAnimationFrame(profile);
    };

    // Start profiler after initial rendering has settled to avoid loading-lag spikes
    const runProfiler = () => {
      startTime = performance.now();
      frameCount = 0;
      rafId = requestAnimationFrame(profile);
    };

    const t = setTimeout(runProfiler, 2000);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t);
    };
  }, [performanceMode]);

  return (
    <PerformanceContext.Provider value={{ performanceMode, togglePerformanceMode }}>
      {children}

      {/* Sleek Visual Glassmorphic Notification Toast */}
      {toast.visible && (
        <div 
          className="fixed bottom-6 right-6 z-[100] max-w-sm w-[90vw] p-5 rounded-2xl border border-cyan-brand/20 dark:border-cyan-brand/10 shadow-2xl glass-strong animate-toast-slide-in text-left select-none"
        >
          {/* Decorative glow orb inside the toast */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-brand/10 dark:bg-cyan-brand/5 blur-xl pointer-events-none rounded-full" />
          
          <div className="flex gap-4 items-start relative z-10">
            <div className="p-2 rounded-xl bg-cyan-brand/10 dark:bg-cyan-brand/20 text-cyan-brand shrink-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                className="w-5 h-5 animate-pulse"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <div className="flex-1">
              <h5 className="font-display font-black text-xs text-base-strong uppercase tracking-widest mb-1">
                Eco Mode Enabled
              </h5>
              <p className="text-xs text-base-muted leading-relaxed font-medium">
                {toast.message}
              </p>
              <div className="mt-3.5 flex gap-3 items-center">
                <button
                  onClick={() => {
                    // Undo optimization
                    togglePerformanceMode(false);
                    setToast((prev) => ({ ...prev, visible: false }));
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-brand/15 hover:bg-cyan-brand/25 text-cyan-brand text-[11px] font-black uppercase tracking-widest transition-all duration-200 border border-cyan-brand/25"
                >
                  Undo
                </button>
                <button
                  onClick={() => setToast((prev) => ({ ...prev, visible: false }))}
                  className="text-[11px] font-bold text-base-faint hover:text-base-strong transition-colors uppercase tracking-widest px-2 py-1"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PerformanceContext.Provider>
  );
}
