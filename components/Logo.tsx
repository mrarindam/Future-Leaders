"use client";

import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "monogram";
  color?: "dark" | "white";
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({
  className = "",
  variant = "full",
  color = "dark",
  size = "md",
}: LogoProps) {
  const isDark = color === "dark";

  // Size mappings (aspect ratio is 1039 / 472 ≈ 2.20 : 1)
  const dimensions = {
    sm: { width: 32, height: 15, text: "text-[9px] leading-[9px]" },
    md: { width: 44, height: 20, text: "text-[11px] leading-[10px]" },
    lg: { width: 68, height: 31, text: "text-[14px] leading-[13px]" },
    xl: { width: 98, height: 45, text: "text-[18px] leading-[17px]" },
  };

  const current = dimensions[size];
  const logoSrc = isDark ? "/images/logo-dark.png" : "/images/logo-white.png";

  const Monogram = (
    <svg
      viewBox="0 0 1039 472"
      width={current.width}
      height={current.height}
      style={{
        width: `${current.width}px`,
        height: `${current.height}px`,
        maxWidth: `${current.width}px`,
        maxHeight: `${current.height}px`,
      }}
      className="flex-shrink-0 object-contain block select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image href={logoSrc} width="1039" height="472" />
    </svg>
  );

  if (variant === "monogram") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {Monogram}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none font-sans group ${className}`}
    >
      {Monogram}

      {/* Typography: FUTURE LEADERS stacked */}
      <div className="flex flex-col tracking-tight font-extrabold">
        <span
          className={`font-black tracking-[0.14em] uppercase ${
            current.text
          } ${isDark ? "text-slate-950" : "text-white"}`}
        >
          FUTURE
        </span>
        <span
          className={`font-extrabold tracking-[0.18em] uppercase ${
            current.text
          } ${isDark ? "text-slate-900" : "text-slate-100"}`}
        >
          LEADERS
        </span>
      </div>
    </div>
  );
}
