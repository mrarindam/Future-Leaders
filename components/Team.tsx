"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TeamCard from "./TeamCard";
import { TEAM_MEMBERS } from "@/lib/constants";

export default function Team() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  // Track active slide based on horizontal scroll position
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider || slider.children.length === 0) return;
    const scrollLeft = slider.scrollLeft;
    const card = slider.children[0] as HTMLElement;
    const cardWidth = card.offsetWidth + 16; // width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(Math.max(index, 0), TEAM_MEMBERS.length - 1));
  };

  // Automatic horizontal slideshow for mobile
  useEffect(() => {
    if (isInteracting) return;
    const timer = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider || slider.children.length === 0) return;
      const card = slider.children[0] as HTMLElement;
      const cardWidth = card.offsetWidth + 16;
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScroll - 20) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3600);

    return () => clearInterval(timer);
  }, [isInteracting]);

  const scrollPrev = () => {
    setIsInteracting(true);
    const slider = sliderRef.current;
    if (slider && slider.children.length > 0) {
      const card = slider.children[0] as HTMLElement;
      const cardWidth = card.offsetWidth + 16;
      if (slider.scrollLeft <= 20) {
        slider.scrollTo({ left: slider.scrollWidth, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
    setTimeout(() => setIsInteracting(false), 5000);
  };

  const scrollNext = () => {
    setIsInteracting(true);
    const slider = sliderRef.current;
    if (slider && slider.children.length > 0) {
      const card = slider.children[0] as HTMLElement;
      const cardWidth = card.offsetWidth + 16;
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScroll - 20) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }
    setTimeout(() => setIsInteracting(false), 5000);
  };

  const scrollToSlide = (idx: number) => {
    setIsInteracting(true);
    const slider = sliderRef.current;
    if (slider && slider.children[idx]) {
      const targetCard = slider.children[idx] as HTMLElement;
      targetCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
    setTimeout(() => setIsInteracting(false), 5000);
  };

  return (
    <section
      id="team"
      className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-36 pb-20 sm:pb-24 bg-gradient-to-b from-[#060D24] via-[#091538] to-[#060D24] text-white overflow-hidden"
    >
      {/* Modern Blue Ambient Web3 Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="max-w-4xl mb-10 sm:mb-16 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
          >
            The Leaders Behind Future Leaders
          </motion.h2>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET VIEW: 5-column balanced responsive grid (Hidden on mobile) */}
        {/* ========================================================================= */}
        <div className="hidden md:grid md:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 justify-center">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={member.name}
              className={`flex ${
                index === 4
                  ? "md:col-span-1 xl:col-span-1 md:max-w-none md:mx-0 w-full"
                  : "w-full"
              }`}
            >
              <TeamCard member={member} index={index} />
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VIEW: Automatic Horizontal Slideshow with Gaps & Controls         */}
        {/* ========================================================================= */}
        <div className="block md:hidden">
          {/* Horizontal Snap Scroll Track with Gaps */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setTimeout(() => setIsInteracting(false), 5000)}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {TEAM_MEMBERS.map((member, index) => (
              <div
                key={member.name}
                className="shrink-0 w-[84%] max-w-[320px] snap-center flex"
              >
                <TeamCard member={member} index={index} />
              </div>
            ))}
          </div>

          {/* Bottom Navigation & Controls: Left Button, Indicators, Right Button */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {/* Left Button */}
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-[#0B1A3F] border border-blue-700/60 flex items-center justify-center text-blue-300 hover:text-white hover:border-cyan-400 active:scale-95 transition-all shadow-md"
              aria-label="Previous team member"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Pagination Indicators (Dots / Pills) */}
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0B1A3F]/80 border border-blue-800/50 backdrop-blur-sm">
              {TEAM_MEMBERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeSlide
                      ? "w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                      : "w-2 bg-blue-700/60 hover:bg-blue-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-[#0B1A3F] border border-blue-700/60 flex items-center justify-center text-blue-300 hover:text-white hover:border-cyan-400 active:scale-95 transition-all shadow-md"
              aria-label="Next team member"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
