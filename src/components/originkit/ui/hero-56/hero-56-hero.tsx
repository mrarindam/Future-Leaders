/* eslint-disable */
// @ts-nocheck
"use client";
import XylophoneHelix from "@/components/originkit/ui/hero-56/xylophone-helix"
export default function Hero({ onExplore, onNavigate, theme }: { onExplore?: () => void; onNavigate?: (idx: number) => void; theme?: string }) {
    const isDark = theme === 'dark';
    return (
        <section className="hero">
            <XylophoneHelix
                key={isDark ? 'hero-dark' : 'hero-light'}
                className="hero__helix"
                background={isDark ? "#09090c" : "#ffffff"}
                baseColor={isDark ? "#3e342b" : "#f6e2d2"}
                bars={160}
                shape="helix"
                scale={410}
                camera={{ tilt: 25, sideTilt: 53 }}
                hover={{
                    colors: ["#ff6a13", "#ff9a3c", "#ffc56b", "#ff8a5c", "#fff1e2"],
                    strength: 142,
                    tint: 90,
                    glow: 40,
                }}
            />

            <h1 className="hero__title">
                Empowering Web3 projects
                <span className="hero__serif">
                    to <em>build, grow and scale</em>
                </span>
            </h1>

            <div className="hero__aside">
                <p className="hero__sub">
                    Future Leaders is a Web3 growth network with 500+ KOLs, creators and industry professionals across global markets, helping projects grow through KOL marketing, community management, social campaigns, Discord moderation, collaborations, technical support and strategic growth.
                </p>
                <a
                    href="#services-section"
                    className="hero__cta"
                    onClick={(e) => {
                        if (onExplore) {
                            e.preventDefault();
                            onExplore();
                        } else if (onNavigate) {
                            e.preventDefault();
                            onNavigate(1);
                        }
                    }}
                >
                    Services <span aria-hidden="true">→</span>
                </a>
            </div>
        </section>
    )
}