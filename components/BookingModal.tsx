"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ExternalLink, Loader2 } from "lucide-react";
import { CALENDAR_LINK } from "@/lib/constants";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container (Sleek Dark Theme matching Cal.com) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#111111] rounded-[24px] sm:rounded-[28px] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden z-10 flex flex-col my-auto max-h-[92vh] h-[700px]"
          >
            {/* Modal Header (Unified Dark Header) */}
            <div className="px-5 sm:px-7 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#111111]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Schedule a Strategy Session
                    </h3>
                    <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/25">
                      30 Min
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 line-clamp-1">
                    Select a date &amp; time. A Google Meet invite will be created instantly.
                  </p>
                </div>
              </div>

              {/* Action Buttons: Open external & Close */}
              <div className="flex items-center gap-2">
                <a
                  href={CALENDAR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800/80 border border-white/15 hover:border-white/25 transition-all"
                  title="Open calendar in new tab"
                >
                  <span>Open in full tab</span>
                  <ExternalLink size={13} />
                </a>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body: Cal.com Live Dark Embed */}
            <div className="relative flex-1 w-full h-full bg-[#111111] overflow-hidden">
              {/* Loading State Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111111] z-10 gap-3">
                  <Loader2 size={32} className="text-purple-500 animate-spin" />
                  <p className="text-xs font-semibold text-neutral-400">
                    Connecting to Future Leaders calendar...
                  </p>
                </div>
              )}

              {/* Real Cal.com Embedded Iframe */}
              <iframe
                src={`${CALENDAR_LINK}?embed=true`}
                className="w-full h-full border-0 bg-[#111111]"
                title="Schedule a Call with Future Leaders"
                allow="camera; microphone; autoplay; encrypted-media; fullscreen"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
