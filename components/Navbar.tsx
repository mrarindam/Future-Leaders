"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/constants";

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 shadow-[0_4px_16px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_22px_rgba(124,58,237,0.45)] transition-all duration-300"
              >
                <span>Contact Us</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="#contact"
                className="px-3.5 py-1.5 text-xs font-semibold text-white rounded-full bg-purple-600 shadow-sm"
              >
                Contact Us
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.filter((link) => link.href !== "#contact").map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "text-purple-600 bg-purple-50 font-semibold"
                        : "text-slate-800 hover:text-purple-600 hover:bg-purple-50/70"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-3 border-t border-slate-100">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3 text-center text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
