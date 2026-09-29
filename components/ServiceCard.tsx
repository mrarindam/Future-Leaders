"use client";

import React from "react";
import { motion } from "framer-motion";
import { Megaphone, Users, MessageSquare, Compass, Handshake, Code2, TrendingUp } from "lucide-react";
import { ServiceItem } from "@/lib/constants";

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  onSelect: (service: ServiceItem) => void;
}

export default function ServiceCard({ service, index, onSelect }: ServiceCardProps) {
  // Render icon according to service ID
  const renderIcon = () => {
    switch (service.id) {
      case "kol-marketing":
        return <Megaphone size={22} className="text-purple-400" />;
      case "community-management":
        return <Users size={22} className="text-emerald-400" />;
      case "discord-management":
        return <MessageSquare size={22} className="text-indigo-400" />;
      case "social-growth-marketing":
      case "strategic-advisory":
        return <TrendingUp size={22} className="text-amber-400" />;
      case "collaboration-management":
        return <Handshake size={22} className="text-cyan-400" />;
      case "technical-services":
        return <Code2 size={22} className="text-pink-400" />;
      default:
        return <Users size={22} className="text-purple-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect(service)}
      className="group relative cursor-pointer flex flex-col p-7 sm:p-8 rounded-[24px] bg-[#0E1322]/90 backdrop-blur-md border border-slate-800/80 shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:border-purple-500/50 hover:bg-[#131930] transition-all duration-300 overflow-hidden"
    >
      {/* Subtle hover gradient glow border on hover */}
      <div
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1.5px ${service.accentColor}55`,
        }}
      />

      {/* Top Part: Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 bg-slate-800/90 border border-slate-700/60 shadow-inner"
      >
        {renderIcon()}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold tracking-tight text-white mb-3 group-hover:text-purple-300 transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
}
