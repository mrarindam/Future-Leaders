"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[620px] xl:max-w-[660px] aspect-[1373/1145] flex items-center justify-center select-none">
      {/* Background Soft Ambient Aura Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-purple-400/25 via-indigo-300/30 to-cyan-300/25 blur-3xl" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-pink-300/20 blur-2xl" />
      </div>

      {/* Completely Static 3D Hero Artwork (No wobble, no tilt) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full flex items-center justify-center drop-shadow-[0_25px_50px_rgba(99,102,241,0.2)]"
      >
        <Image
          src="/images/herodesign.png"
          alt="Future Leaders Web3 Growth Agency 3D Monogram"
          fill
          priority
          className="object-contain drop-shadow-[0_15px_30px_rgba(59,130,246,0.15)]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 660px"
        />
      </motion.div>
    </div>
  );
}
