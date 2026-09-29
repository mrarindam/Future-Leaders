"use client";

import React from "react";
import clsx from "clsx";

export interface OverlappingSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /**
   * Layer depth (higher z-index sits above other sections)
   */
  zIndex?: number;
  /**
   * Overlap amount with the previous section (using clean negative top margin)
   * - "default": -mt-10 sm:-mt-14 lg:-mt-16
   * - "sm": -mt-6 sm:-mt-8
   * - "lg": -mt-14 sm:-mt-20
   * - "none": no overlap
   */
  overlap?: "default" | "sm" | "lg" | "none" | string;
  overlapTop?: "default" | "sm" | "lg" | "none" | string;
  /**
   * Overlap amount with the next section (using clean negative bottom margin)
   * - "default": -mb-10 sm:-mb-14 lg:-mb-16
   * - "sm": -mb-6 sm:-mb-8
   * - "lg": -mb-14 sm:-mb-20
   * - "none": no overlap
   */
  overlapBottom?: "default" | "sm" | "lg" | "none" | string;
  /**
   * Rounded top edge for clean cutout card/sheet look
   * true for "rounded-t-[32px] sm:rounded-t-[44px] lg:rounded-t-[52px]"
   */
  roundedTop?: boolean | string;
  /**
   * Rounded bottom edge for clean cutout card/sheet look
   * true for "rounded-b-[32px] sm:rounded-b-[44px] lg:rounded-b-[52px]"
   */
  roundedBottom?: boolean | string;
  /**
   * Depth shadow cast onto the section underneath on top
   * "dark" | "light" | "blue" | "none" | boolean
   */
  topShadow?: "dark" | "light" | "blue" | "none" | boolean;
  /**
   * Depth shadow cast onto the section underneath on bottom
   * "dark" | "light" | "blue" | "none" | boolean
   */
  bottomShadow?: "dark" | "light" | "blue" | "none" | boolean;
  /**
   * Full sheet elevation shadow (casts both upwards and downwards)
   */
  fullSheetShadow?: boolean;
  /**
   * Top highlight accent border
   */
  topBorder?: "dark" | "light" | "blue" | "none" | boolean;
  /**
   * Bottom accent border
   */
  bottomBorder?: "dark" | "light" | "blue" | "none" | boolean;
}

export default function OverlappingSection({
  children,
  id,
  className = "",
  zIndex = 10,
  overlap,
  overlapTop = "none",
  overlapBottom = "none",
  roundedTop = false,
  roundedBottom = false,
  topShadow = "none",
  bottomShadow = "none",
  fullSheetShadow = false,
  topBorder = "none",
  bottomBorder = "none",
}: OverlappingSectionProps) {
  // Overlap negative top margin (overlap prop is supported as alias for overlapTop)
  const resolvedOverlapTop = overlap !== undefined ? overlap : overlapTop;
  let topOverlapClass = "";
  if (resolvedOverlapTop === "default") {
    topOverlapClass = "-mt-10 sm:-mt-14 lg:-mt-16";
  } else if (resolvedOverlapTop === "sm") {
    topOverlapClass = "-mt-6 sm:-mt-8";
  } else if (resolvedOverlapTop === "lg") {
    topOverlapClass = "-mt-14 sm:-mt-20";
  } else if (typeof resolvedOverlapTop === "string" && resolvedOverlapTop !== "none") {
    topOverlapClass = resolvedOverlapTop;
  }

  // Overlap negative bottom margin
  let bottomOverlapClass = "";
  if (overlapBottom === "default") {
    bottomOverlapClass = "-mb-10 sm:-mb-14 lg:-mb-16";
  } else if (overlapBottom === "sm") {
    bottomOverlapClass = "-mb-6 sm:-mb-8";
  } else if (overlapBottom === "lg") {
    bottomOverlapClass = "-mb-14 sm:-mb-20";
  } else if (typeof overlapBottom === "string" && overlapBottom !== "none") {
    bottomOverlapClass = overlapBottom;
  }

  // Rounded top class
  let roundedTopClass = "";
  if (roundedTop === true) {
    roundedTopClass = "rounded-t-[32px] sm:rounded-t-[44px] lg:rounded-t-[52px]";
  } else if (typeof roundedTop === "string") {
    roundedTopClass = roundedTop;
  }

  // Rounded bottom class
  let roundedBottomClass = "";
  if (roundedBottom === true) {
    roundedBottomClass = "rounded-b-[32px] sm:rounded-b-[44px] lg:rounded-b-[52px]";
  } else if (typeof roundedBottom === "string") {
    roundedBottomClass = roundedBottom;
  }

  // Shadow classes
  let topShadowClass = "";
  if (topShadow === "dark" || topShadow === true) {
    topShadowClass = "shadow-[0_-25px_55px_rgba(0,0,0,0.4)]";
  } else if (topShadow === "blue") {
    topShadowClass = "shadow-[0_-25px_55px_rgba(3,8,30,0.55)]";
  } else if (topShadow === "light") {
    topShadowClass = "shadow-[0_-20px_45px_rgba(0,0,0,0.06)]";
  }

  let bottomShadowClass = "";
  if (bottomShadow === "dark" || bottomShadow === true) {
    bottomShadowClass = "shadow-[0_25px_55px_rgba(0,0,0,0.4)]";
  } else if (bottomShadow === "blue") {
    bottomShadowClass = "shadow-[0_25px_55px_rgba(3,8,30,0.55)]";
  } else if (bottomShadow === "light") {
    bottomShadowClass = "shadow-[0_20px_50px_rgba(0,0,0,0.14)]";
  }

  const sheetShadowClass = fullSheetShadow
    ? "shadow-[0_0_60px_rgba(0,0,0,0.12),0_20px_50px_rgba(0,0,0,0.08),0_-20px_50px_rgba(0,0,0,0.08)]"
    : "";

  // Border classes
  let topBorderClass = "";
  if (topBorder === "dark") {
    topBorderClass = "border-t border-slate-800/80";
  } else if (topBorder === "blue") {
    topBorderClass = "border-t border-blue-900/60";
  } else if (topBorder === "light") {
    topBorderClass = "border-t border-slate-200/80";
  }

  let bottomBorderClass = "";
  if (bottomBorder === "dark") {
    bottomBorderClass = "border-b border-slate-800/80";
  } else if (bottomBorder === "blue") {
    bottomBorderClass = "border-b border-blue-900/60";
  } else if (bottomBorder === "light") {
    bottomBorderClass = "border-b border-slate-200/80";
  }

  return (
    <div
      id={id}
      style={{ zIndex }}
      className={clsx(
        "relative w-full overflow-hidden",
        topOverlapClass,
        bottomOverlapClass,
        roundedTopClass,
        roundedBottomClass,
        topShadowClass,
        bottomShadowClass,
        sheetShadowClass,
        topBorderClass,
        bottomBorderClass,
        className
      )}
    >
      {children}
    </div>
  );
}
