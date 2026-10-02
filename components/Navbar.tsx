"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import RadialRevealButton from "./RadialRevealButton";

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Lock body scroll when mobile fullscreen navigation is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar background styling on scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Robust viewport-based active section detection
      const sections = ["home", "services", "about", "team", "contact"];
      const targetPoint = 220; // 220px from top of viewport

      // If scrolled to the bottom of the page, highlight 'contact'
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection("contact");
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if the section occupies the upper-middle of viewport
          if (rect.top <= targetPoint && rect.bottom > targetPoint) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300"
      >
        <div className="max-w-6xl mx-auto">
          <nav
            className={`flex items-center justify-between px-5 sm:px-6 py-3 rounded-full transition-all duration-300 ${
              isScrolled
                ? "bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                : "bg-white/80 backdrop-blur-lg border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
            }`}
          >
            {/* Left: Future Leaders Logo */}
            <a
              href="#home"
              className="flex items-center hover:opacity-90 transition-opacity"
              aria-label="Future Leaders Home"
            >
              <Logo size="md" />
            </a>

            {/* Center: Desktop Navigation Links (Clean & Simple) */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.filter((link) => link.href !== "#contact").map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-purple-600 bg-purple-50/80 font-semibold"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/70"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-1 left-4 right-4 h-[2px] bg-purple-600 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right: "Contact Us" CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <RadialRevealButton
                href="#contact"
                variant="primary"
                fill="#7c3aed"
                hoverFill="#090D16"
                textColor="#ffffff"
                hoverTextColor="#ffffff"
                className="px-5 py-2 text-sm font-semibold shadow-[0_4px_16px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_22px_rgba(124,58,237,0.45)]"
              >
                <span>Contact Us</span>
              </RadialRevealButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-slate-700 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] md:hidden bg-white flex flex-col justify-between overflow-y-auto"
          >
            {/* Ambient Background Accents for Modern Web3 Feel */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100/60 rounded-full blur-3xl pointer-events-none -z-0" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-0" />

            {/* Top Bar inside Fullscreen Navigation */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center"
                aria-label="Future Leaders Home"
              >
                <Logo size="md" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-800 transition-all shadow-sm"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Navigation Links (Clean & Minimal) */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-7 sm:px-10 py-8 space-y-3">
              {NAV_LINKS.map((link, idx) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.25 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-3.5 px-5 rounded-2xl text-2xl font-bold tracking-tight transition-all text-left ${
                      isActive
                        ? "bg-purple-50 text-purple-600 shadow-sm"
                        : "text-slate-800 hover:text-purple-600 hover:bg-slate-50/80"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </div>

            {/* Bottom Actions & Social Connect */}
            <div className="relative z-10 p-6 sm:p-8 bg-slate-50/90 border-t border-slate-100 flex flex-col gap-4">
              <RadialRevealButton
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenBooking) onOpenBooking();
                }}
                variant="primary"
                fill="#7c3aed"
                hoverFill="#090D16"
                textColor="#ffffff"
                hoverTextColor="#ffffff"
                className="w-full py-4 text-center text-base font-semibold shadow-lg shadow-purple-500/25"
              >
                <span>Schedule a Call</span>
              </RadialRevealButton>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500 font-medium">Follow &amp; Join Community</span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={SOCIAL_LINKS.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-black hover:border-slate-400 shadow-sm transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href={SOCIAL_LINKS.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#5865F2] hover:bg-[#5865F2]/10 shadow-sm transition-colors"
                    aria-label="Discord"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </a>
                  <a
                    href={SOCIAL_LINKS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#0088cc] hover:bg-[#0088cc]/10 shadow-sm transition-colors"
                    aria-label="Telegram"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
