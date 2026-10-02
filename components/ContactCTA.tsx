"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import RadialRevealButton from "./RadialRevealButton";

interface ContactCTAProps {
  onOpenBooking: () => void;
}

export default function ContactCTA({ onOpenBooking }: ContactCTAProps) {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-start items-center pt-16 sm:pt-20 lg:pt-24 pb-28 sm:pb-36 overflow-hidden bg-white"
    >
      {/* Soft Ambient Web3 Background Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/4 left-1/3 w-[580px] h-[580px] bg-purple-100/40 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-[540px] h-[540px] bg-blue-100/40 rounded-full blur-3xl opacity-50" />
      </div>

      {/* 3D Crystal Cubes Visual - Anchored in the bottom-right corner */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="relative w-[360px] sm:w-[540px] md:w-[680px] lg:w-[800px] xl:w-[920px] aspect-[1774/887] right-0 bottom-0 translate-x-4 sm:translate-x-0 translate-y-2 sm:translate-y-0 drop-shadow-[0_20px_45px_rgba(99,102,241,0.18)]">
          <Image
            src="/images/contacts.png"
            alt="Web3 Digital Assets and 3D Pedestals"
            fill
            className="object-contain object-bottom-right"
            sizes="(max-width: 768px) 100vw, 920px"
            priority
          />
        </div>
      </div>

      {/* Main Centered Content Container - Standard max-w-6xl Measurement */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 text-center flex flex-col items-center">
        {/* Headline - Shifted upwards with reduced top void, strictly ONE SINGLE LINE on desktop */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="w-full text-4xl sm:text-5xl md:text-[46px] lg:text-[54px] xl:text-[60px] font-black tracking-tight text-slate-950 mb-8 sm:mb-10 lg:mb-12 leading-tight whitespace-normal lg:whitespace-nowrap"
        >
          Ready to Scale Your Web3 Project?
        </motion.h2>

        {/* Informative, Authentic Subtitle with Generous Breathing Gap */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base sm:text-lg lg:text-[20px] text-slate-600 font-normal leading-relaxed mb-14 sm:mb-16 lg:mb-20 max-w-4xl mx-auto"
        >
          Partner with us to take your project to the next level. Our team provides battle-tested Web3 growth execution — from tier-1 KOL activations and strategic listing advisory to high-conviction Discord and Telegram community incubation. Let&apos;s build sustainable momentum and long-term liquidity for your protocol.
        </motion.p>

        {/* 3 Action Buttons - Spacious, Well-Proportioned, and Refined */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 w-full max-w-4xl mx-auto"
        >
          {/* 1. Schedule a Call (Primary Accent) */}
          <RadialRevealButton
            onClick={onOpenBooking}
            variant="primary"
            borderRadius="1rem"
            fill="#7c3aed"
            hoverFill="#0f172a"
            textColor="#ffffff"
            hoverTextColor="#ffffff"
            className="w-full text-left shadow-[0_10px_25px_rgba(124,58,237,0.28)] hover:shadow-[0_14px_32px_rgba(124,58,237,0.38)]"
          >
            {(isHover) => (
              <div className="flex items-center gap-3.5 p-4 sm:p-5 w-full">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isHover ? "bg-white/15" : "bg-white/20"}`}>
                  <Calendar size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-white tracking-tight whitespace-nowrap">
                    Schedule a Call
                  </div>
                  <div className="text-xs text-purple-200 whitespace-nowrap mt-0.5">
                    Book a free consultation
                  </div>
                </div>
              </div>
            )}
          </RadialRevealButton>

          {/* 2. Follow on X */}
          <RadialRevealButton
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            variant="custom"
            borderRadius="1rem"
            fill="#ffffff"
            hoverFill="#000000"
            textColor="#0f172a"
            hoverTextColor="#ffffff"
            borderWidth={1}
            borderColor="#e2e8f0"
            className="w-full text-left shadow-[0_6px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_26px_rgba(0,0,0,0.12)]"
          >
            {(isHover) => (
              <div className="flex items-center gap-3.5 p-4 sm:p-5 w-full">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isHover ? "bg-white/15 text-white" : "bg-slate-100 text-slate-900"}`}>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-base font-bold tracking-tight whitespace-nowrap ${isHover ? "text-white" : "text-slate-900"}`}>
                    Follow on X
                  </div>
                  <div className={`text-xs whitespace-nowrap mt-0.5 ${isHover ? "text-slate-300" : "text-slate-500"}`}>
                    Connect &amp; DM us on X
                  </div>
                </div>
              </div>
            )}
          </RadialRevealButton>

          {/* 3. Join Discord */}
          <RadialRevealButton
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            variant="custom"
            borderRadius="1rem"
            fill="#ffffff"
            hoverFill="#5865F2"
            textColor="#0f172a"
            hoverTextColor="#ffffff"
            borderWidth={1}
            borderColor="#e2e8f0"
            className="w-full text-left shadow-[0_6px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_26px_rgba(88,101,242,0.25)]"
          >
            {(isHover) => (
              <div className="flex items-center gap-3.5 p-4 sm:p-5 w-full">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isHover ? "bg-white/20 text-white" : "bg-[#5865F2]/10 text-[#5865F2]"}`}>
              <svg className="w-4 h-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-base font-bold tracking-tight whitespace-nowrap ${isHover ? "text-white" : "text-slate-900"}`}>
                    Join Discord
                  </div>
                  <div className={`text-xs whitespace-nowrap mt-0.5 ${isHover ? "text-slate-100" : "text-slate-500"}`}>
                    Connect with our community
                  </div>
                </div>
              </div>
            )}
          </RadialRevealButton>
      </motion.div>
    </div>
  </section>
  );
}
