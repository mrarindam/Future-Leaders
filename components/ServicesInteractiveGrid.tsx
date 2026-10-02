"use client";

import React, { useState } from "react";
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

export default function ServicesInteractiveGrid({
  services,
  onSelect,
}: ServicesInteractiveGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {services.map((service, index) => {
          const isHovered = hoveredId === service.id;
          const accent = service.accentColor || "#7c3aed";

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onHoverStart={() => setHoveredId(service.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => onSelect(service)}
              className="relative flex flex-col justify-between p-7 sm:p-8 rounded-[24px] cursor-pointer overflow-hidden transition-colors duration-200"
              style={{
                backgroundColor: isHovered ? "#12182c" : "#0c101e",
                borderColor: isHovered ? accent : "rgba(51, 65, 85, 0.45)",
                borderWidth: "1px",
                borderStyle: "solid",
                boxShadow: isHovered
                  ? `0 20px 45px -12px ${accent}50, 0 0 28px ${accent}30`
                  : "0 10px 25px -10px rgba(0,0,0,0.5)",
                zIndex: isHovered ? 10 : 1,
              }}
            >
              {/* Corner Ambient Radial Glow — only visible when this specific card is hovered */}
              <div
                className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-opacity duration-300"
                style={{
                  backgroundColor: accent,
                  opacity: isHovered ? 0.35 : 0.04,
                }}
              />

              <div>
                {/* Service Icon inside glowing badge */}
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 border shadow-inner"
                  style={{
                    backgroundColor: isHovered
                      ? `${accent}25`
                      : "rgba(30, 41, 59, 0.7)",
                    borderColor: isHovered
                      ? `${accent}80`
                      : "rgba(51, 65, 85, 0.6)",
                    transform: isHovered ? "scale(1.08) rotate(2deg)" : "scale(1)",
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
                    color: isHovered ? "#ffffff" : "#e2e8f0",
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Bottom Action: "View Details" */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
                <span
                  className="text-xs font-semibold tracking-wide transition-colors duration-200"
                  style={{
                    color: isHovered ? accent : "#94a3b8",
                  }}
                >
                  View Details
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: isHovered
                      ? accent
                      : "rgba(30, 41, 59, 0.6)",
                    color: isHovered ? "#ffffff" : accent,
                    transform: isHovered ? "translateX(4px)" : "translateX(0)",
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
