"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TrustBar() {
  return (
    <section className="relative py-6 sm:py-8 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-full px-6 sm:px-10 py-5 sm:py-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8 lg:gap-12">
            {/* Polygon */}
            <div className="flex items-center gap-2 text-slate-700 hover:text-purple-600 transition-colors cursor-pointer group">
              <svg className="w-5 h-5 text-slate-800 group-hover:text-purple-600 transition-colors" viewBox="0 0 38 33" fill="currentColor">
                <path d="M29 10.2L19.4 4.7a1 1 0 00-1 0L8.8 10.2a1 1 0 00-.5.9v10.8a1 1 0 00.5.9l9.6 5.5a1 1 0 001 0l9.6-5.5a1 1 0 00.5-.9V11.1a1 1 0 00-.5-.9zm-10 14.9l-7.7-4.4V12.3l7.7-4.4 7.7 4.4v8.4l-7.7 4.4z"/>
              </svg>
              <span className="text-sm sm:text-base font-bold tracking-tight text-slate-800 group-hover:text-purple-600 transition-colors">
                polygon
              </span>
            </div>

            {/* Binance */}
            <div className="flex items-center gap-2 text-slate-700 hover:text-amber-500 transition-colors cursor-pointer group">
              <svg className="w-5 h-5 text-[#F3BA2F]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.624 13.92l2.715 2.715-7.34 7.34-7.34-7.34 2.715-2.715 4.625 4.625 4.626-4.625zm4.625-4.625l2.715 2.715-2.715 2.715-2.715-2.715 2.715-2.715zm-18.498 0l2.715 2.715-2.715 2.715L.036 12.01l2.715-2.715zm9.25-9.25l7.34 7.34-2.715 2.715-4.625-4.625-4.625 4.625-2.715-2.715 7.34-7.34zm0 6.55l2.715 2.715-2.715 2.715-2.715-2.715 2.715-2.715z"/>
              </svg>
              <span className="text-xs sm:text-sm font-black tracking-widest text-slate-800 group-hover:text-amber-500 transition-colors uppercase">
                BINANCE
              </span>
            </div>

            {/* Avalanche */}
            <div className="flex items-center gap-2 text-slate-700 hover:text-red-500 transition-colors cursor-pointer group">
              <svg className="w-5 h-5 text-[#E84142]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.07 15.34l-2.07-3.6-2.07 3.6h4.14zm-4.9-8.52L2.5 18.28a.8.8 0 00.7.42h5.18l6.12-10.6a.8.8 0 00-.7-.42H9.17a.8.8 0 00-.7.42zm7.48 4.74l-2.12 3.68h6.24a.8.8 0 00.7-.42.8.8 0 000-.8l-4.12-7.14a.8.8 0 00-.7-.42.8.8 0 00-.7.42l-.7 1.22 1.4 3.46z"/>
              </svg>
              <span className="text-xs sm:text-sm font-black tracking-widest text-slate-800 group-hover:text-red-500 transition-colors uppercase">
                AVALANCHE
              </span>
            </div>

            {/* LayerZero */}
            <div className="flex items-center gap-2 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer group">
              <div className="w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:scale-125 transition-transform" />
              </div>
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
                LayerZero<span className="text-purple-600">.</span>
              </span>
            </div>

            {/* OpenSea */}
            <div className="flex items-center gap-2 text-slate-700 hover:text-blue-500 transition-colors cursor-pointer group">
              <svg className="w-5 h-5 text-[#2081E2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.632 14.526l-1.402 1.402-4.23-4.23 1.402-1.402 4.23 4.23zM7.5 7.875a1.875 1.875 0 113.75 0 1.875 1.875 0 01-3.75 0zm1.758 8.874a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z"/>
              </svg>
              <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-500 transition-colors">
                OpenSea
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
