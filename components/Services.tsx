"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import RadialRevealButton from "./RadialRevealButton";
import ServicesInteractiveGrid from "./ServicesInteractiveGrid";
import { SERVICES, ServiceItem } from "@/lib/constants";

interface ServicesProps {
  onOpenBooking: () => void;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section
      id="services"
      className="relative min-h-screen flex items-center justify-center py-20 sm:py-24 bg-[#080B14] text-white overflow-hidden"
    >
      {/* Ambient Dark Web3 Background Glows & High-Tech Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden flex items-center justify-center">
        <div className="w-[900px] h-[500px] bg-gradient-to-r from-purple-900/20 via-indigo-900/20 to-blue-900/20 rounded-full blur-3xl" />
        {/* Futuristic Subtle Background Grid Pattern */}
        <div className="absolute inset-0 opacity-15 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]">
          <svg className="w-full h-full" width="100%" height="100%">
            <defs>
              <pattern id="services-bg-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(148, 163, 184, 0.25)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#services-bg-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header - Single line on PC/laptop */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Solutions Built for Web3 Growth
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed"
          >
            From KOL marketing and community growth to partnerships, moderation, and technical support, we provide the resources Web3 projects need to grow and scale.
          </motion.p>
        </div>

        {/* 6 Services Interactive 3D Perspective Grid */}
        <ServicesInteractiveGrid
          services={SERVICES}
          onSelect={(svc) => setSelectedService(svc)}
        />
      </div>

      {/* Service Detail Modal for deeper exploration (Dark Theme) */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0E1322] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Modal Content */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center p-2.5 bg-slate-800 border border-slate-700"
                >
                  <Logo variant="monogram" color="white" size="sm" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedService.title}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/60">
                    {selectedService.stats}
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {selectedService.description}
              </p>

              <div className="space-y-3 mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  What&apos;s Included
                </div>
                {selectedService.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <RadialRevealButton
                  onClick={() => {
                    setSelectedService(null);
                    onOpenBooking();
                  }}
                  variant="primary"
                  fill="#7c3aed"
                  hoverFill="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#0f172a"
                  rounded={100}
                  className="w-full flex-1 shadow-lg shadow-purple-500/25"
                >
                  <div className="flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold tracking-wide">
                    <span>Book Consultation for this Service</span>
                    <ArrowRight size={15} />
                  </div>
                </RadialRevealButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
