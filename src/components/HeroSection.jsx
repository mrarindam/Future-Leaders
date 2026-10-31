import React from 'react';
import Hero56 from './originkit/hero-56';

export default function HeroSection({ onExplore, onNavigate, theme }) {
  return (
    <section id="hero-section" className="page-section section-hero">
      <Hero56 onExplore={onExplore} onNavigate={onNavigate} theme={theme} />
    </section>
  );
}
