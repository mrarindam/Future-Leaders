"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, TrendingUp, Users, ShieldCheck, Globe } from "lucide-react";
import AboutVisual from "./AboutVisual";
import { ABOUT_FEATURES } from "@/lib/constants";

export default function About() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "layers":
        return <Layers size={20} className="text-purple-600" />;
      case "globe":
        return <Globe size={20} className="text-blue-600" />;
      case "trendingUp":
        return <TrendingUp size={20} className="text-emerald-600" />;
      case "users":
        return <Users size={20} className="text-amber-600" />;
      case "shieldCheck":
        return <ShieldCheck size={20} className="text-blue-600" />;
      default:
        return <Layers size={20} className="text-purple-600" />;
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center py-20 sm:py-24 bg-white text-slate-900 overflow-hidden"
    >
      {/* Background Soft Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Feature List */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Headline - Single line on PC/desktop */}
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold tracking-tight text-slate-950 mb-4">
              Why Choose Future Leaders?
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-lg">
              We are more than a Web3 agency - we are a growth network connecting projects with the right people, communities, and resources to grow and scale.
            </p>

            {/* Feature List (Modern White Cards) */}
            <div className="space-y-3.5 w-full max-w-lg">
              {ABOUT_FEATURES.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:bg-white hover:border-slate-300/80 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-200"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${feature.badgeBg}`}
                  >
                    {getIcon(feature.icon)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-slate-900">
                      {feature.title}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {feature.description}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Pedestal Visual */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <AboutVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
