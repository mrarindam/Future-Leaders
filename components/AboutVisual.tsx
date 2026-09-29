"use client";

import React from "react";
import Image from "next/image";

export default function AboutVisual() {
  return (
    <div className="relative w-full max-w-[520px] lg:max-w-[560px] aspect-[1373/1145] flex items-center justify-center select-none">
      {/* Background Soft Ambient Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-cyan-200/25 via-purple-200/30 to-blue-200/25 blur-3xl" />
        <div className="absolute w-[240px] h-[240px] rounded-full bg-pink-200/20 blur-2xl" />
      </div>

      {/* Static 3D Visual - Clean and Still as requested */}
      <div className="relative w-full h-full drop-shadow-[0_20px_40px_rgba(99,102,241,0.14)]">
        <Image
          src="/images/whychosefutureleaders.png"
          alt="Why Choose Future Leaders 3D Pedestal and Core"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
        />
      </div>
    </div>
  );
}
