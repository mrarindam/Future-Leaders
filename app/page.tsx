"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import OverlappingSection from "@/components/OverlappingSection";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-purple-100 selection:text-purple-800">
      {/* Floating Navbar */}
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      {/* Main Page Sections with Clean Structured Stacking & Overlap */}
      <main className="relative">
        {/* Layer 1: Hero (Clean Modern White - Base) */}
        <OverlappingSection zIndex={10}>
          <Hero onOpenBooking={() => setBookingOpen(true)} />
        </OverlappingSection>

        {/* Layer 2: Services (Modern Dark Theme - clean normal section below Hero) */}
        <OverlappingSection zIndex={20}>
          <Services onOpenBooking={() => setBookingOpen(true)} />
        </OverlappingSection>

        {/* Layer 3: Why Choose Future Leaders (Elevated White Layer - overlaps Services at top and Team at bottom) */}
        <OverlappingSection
          zIndex={40}
          overlapTop="default"
          overlapBottom="default"
          roundedTop={true}
          roundedBottom={true}
          topShadow="light"
          bottomShadow="light"
          className="bg-white"
        >
          <About />
        </OverlappingSection>

        {/* Layer 4: The Leaders Behind Future Leaders (Modern Blue Theme - underneath Why Choose, above Contact CTA) */}
        <OverlappingSection zIndex={30}>
          <Team />
        </OverlappingSection>

        {/* Layer 5: Ready to Scale Your Web3 Project (Contact CTA - flat top, solid white curved bottom overlapping Footer) */}
        <OverlappingSection
          zIndex={20}
          overlapBottom="default"
          roundedBottom={true}
          bottomShadow="dark"
          className="bg-white"
        >
          <ContactCTA onOpenBooking={() => setBookingOpen(true)} />
        </OverlappingSection>
      </main>

      {/* Layer 6: Footer (Modern Dark - sits naturally at the bottom underneath Contact CTA) */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Interactive Booking & Strategy Call Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
