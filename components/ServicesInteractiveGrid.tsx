"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Megaphone,
  Users,
  MessageSquare,
  TrendingUp,
  Handshake,
  Code2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ServiceItem } from "@/lib/constants";

interface ServicesInteractiveGridProps {
  services: ServiceItem[];
  onSelect: (service: ServiceItem) => void;
}

const DURATION = 240;
const LEAVE_DELAY = 180;
const NS = "services-interactive-grid";

export default function ServicesInteractiveGrid({
  services,
  onSelect,
}: ServicesInteractiveGridProps) {
  const [cols, setCols] = useState(3);
  const [hovered, setHovered] = useState<number | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dynamically calculate grid columns based on viewport breakpoint
  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 1024) {
        setCols(3);
      } else if (window.innerWidth >= 768) {
        setCols(2);
      } else {
        setCols(1);
      }
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  const count = services.length;

  // Originkit neighbor algorithm: detects adjacent cards (left, right, top, bottom)
  const neighbours = useMemo(() => {
    if (hovered === null) return [];
    const out: number[] = [];

    if (cols > 1) {
      if (hovered % cols !== 0) out.push(hovered - 1); // Left
      if (hovered % cols !== cols - 1) out.push(hovered + 1); // Right
    }

    out.push(hovered - cols); // Top
    out.push(hovered + cols); // Bottom

    return out.filter((n) => n >= 0 && n < count);
  }, [hovered, cols, count]);

  const onEnter = (i: number) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHovered(i);
  };

  const onLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(null), LEAVE_DELAY);
  };

  const renderIcon = (id: string, color: string) => {
    switch (id) {
      case "kol-marketing":
        return <Megaphone size={24} style={{ color }} />;
      case "community-management":
        return <Users size={24} style={{ color }} />;
      case "discord-management":
        return <MessageSquare size={24} style={{ color }} />;
      case "social-growth-marketing":
        return <TrendingUp size={24} style={{ color }} />;
      case "collaboration-management":
        return <Handshake size={24} style={{ color }} />;
      case "technical-services":
        return <Code2 size={24} style={{ color }} />;
      default:
        return <Sparkles size={24} style={{ color }} />;
    }
  };

  return (
    <div className="relative w-full">
      {/* Embedded CSS for 3D Interactive Grid Performance */}
      <style>{`
        .${NS}-container {
          perspective: 1600px;
          transform-style: preserve-3d;
        }
        .${NS}-card {
          transition: transform ${DURATION}ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow ${DURATION}ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color ${DURATION}ms ease,
                      background-color ${DURATION}ms ease;
          transform-style: preserve-3d;
          will-change: transform, box-shadow;
        }
        .${NS}-card-big {
          transform: scale(1.05) translateY(-8px) translateZ(32px);
          z-index: 30 !important;
        }
        .${NS}-card-small {
          transform: scale(1.02) translateY(-3px) translateZ(12px);
          z-index: 20 !important;
        }
        @keyframes ${NS}-glow-pulse {
          0% { filter: drop-shadow(0 0 6px var(--glow-color)); }
          50% { filter: drop-shadow(0 0 16px var(--glow-color)); }
          100% { filter: drop-shadow(0 0 6px var(--glow-color)); }
        }
        .${NS}-glow {
          animation: ${NS}-glow-pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* 3D Perspective Grid */}
      <div
        onPointerLeave={onLeave}
        className={`${NS}-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7`}
      >
        {services.map((service, index) => {
          const isBig = hovered === index;
          const isSmall = !isBig && neighbours.includes(index);
          const accent = service.accentColor || "#7c3aed";

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              onPointerEnter={() => onEnter(index)}
              onClick={() => onSelect(service)}
              className={[
                `${NS}-card`,
                isBig && `${NS}-card-big`,
                isSmall && `${NS}-card-small`,
                isBig && `${NS}-glow`,
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  "--glow-color": `${accent}88`,
                  backgroundColor: isBig
                    ? "#13192f"
                    : isSmall
                    ? "#0f1528"
                    : "#0a0e1c",
                  borderColor: isBig
                    ? accent
                    : isSmall
                    ? `${accent}77`
                    : "rgba(51, 65, 85, 0.45)",
                  boxShadow: isBig
                    ? `0 24px 50px -12px ${accent}55, 0 0 32px 2px ${accent}40`
                    : isSmall
                    ? `0 14px 30px -10px ${accent}30, 0 0 18px ${accent}20`
                    : "0 10px 30px -10px rgba(0,0,0,0.5)",
                  borderRadius: "24px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "2rem",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                } as React.CSSProperties
              }
            >
              {/* Corner Ambient Radial Tint when Hovered/Active */}
              <div
                className="absolute -top-14 -right-14 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-opacity duration-300"
                style={{
                  backgroundColor: accent,
                  opacity: isBig ? 0.35 : isSmall ? 0.2 : 0.05,
                }}
              />

              {/* Service Icon inside glowing badge */}
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 border shadow-inner"
                style={{
                  backgroundColor: isBig
                    ? `${accent}25`
                    : isSmall
                    ? `${accent}18`
                    : "rgba(30, 41, 59, 0.7)",
                  borderColor: isBig
                    ? `${accent}80`
                    : isSmall
                    ? `${accent}50`
                    : "rgba(51, 65, 85, 0.6)",
                  transform: isBig ? "scale(1.1) rotate(2deg)" : "scale(1)",
                  width: "52px",
                  height: "52px",
                }}
              >
                {renderIcon(service.id, accent)}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold tracking-tight mb-3 transition-colors duration-200"
                style={{
                  color: isBig ? "#ffffff" : isSmall ? "#f1f5f9" : "#e2e8f0",
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                {service.description}
              </p>

              {/* Bottom Action Hint: "Learn More" */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <span
                  className="text-xs font-semibold tracking-wide transition-colors duration-200"
                  style={{
                    color: isBig ? accent : isSmall ? "#cbd5e1" : "#94a3b8",
                  }}
                >
                  View Details
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: isBig
                      ? accent
                      : isSmall
                      ? `${accent}30`
                      : "rgba(30, 41, 59, 0.6)",
                    color: isBig ? "#ffffff" : accent,
                    transform: isBig ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
