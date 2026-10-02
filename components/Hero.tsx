"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import HeroVisual from "./HeroVisual";

interface HeroProps {
  onOpenBooking?: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-24 lg:pt-32 pb-14 sm:pb-16 lg:pb-20 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white"
    >
      {/* Background Decorative Ambient Blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] bg-purple-200/30 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/3 right-1/4 w-[460px] h-[460px] bg-blue-200/30 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 left-1/3 w-[380px] h-[380px] bg-pink-100/30 rounded-full blur-2xl opacity-50" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center">
          {/* Typography & CTAs Column (Order 2 on mobile/tab, Order 1 on PC/desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-start text-left z-10"
          >
            {/* Tagline / Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="font-heading text-[32px] xs:text-[36px] sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-tight leading-[1.14] text-slate-950 mb-2 sm:mb-3 max-w-xl text-balance"
            >
              Empowering Web3 Projects to <br className="hidden lg:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent inline-block">
                Build, Grow &amp; Scale
              </span>
            </motion.h1>

            {/* Supporting Line */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6 }}
              className="font-heading text-lg sm:text-xl lg:text-[22px] font-bold text-slate-800 tracking-tight leading-snug mb-2.5 sm:mb-3.5"
            >
              KOLs, Communities, Partnerships &amp; Growth - All in One Network.
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="text-base sm:text-lg lg:text-[19px] xl:text-[20px] text-slate-600 font-normal leading-relaxed mb-5 sm:mb-6 max-w-xl"
            >
              Future Leaders is a Web3 growth network with 500+ KOLs, creators and industry professionals across global markets, helping projects grow through KOL marketing, community management, social campaigns, Discord moderation, collaborations, technical support and strategic growth.
            </motion.p>

            {/* CTA Buttons with Elegant Padding and Spacing */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              {/* Primary: Explore Services */}
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 shadow-[0_10px_25px_rgba(124,58,237,0.35)] hover:shadow-[0_14px_32px_rgba(124,58,237,0.48)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Explore Services</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Futuristic Static Visual (Order 1 on mobile/tab, Order 2 on PC/desktop) */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex items-center justify-center lg:justify-end -mt-3 sm:mt-0">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
