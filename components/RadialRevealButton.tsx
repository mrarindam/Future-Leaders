"use client";

import * as React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  useAnimate,
  useReducedMotion,
  type AnimationPlaybackControls,
  type Transition,
} from "framer-motion";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const radiusFromPercent = (w: number, h: number, pct: number) =>
  (Math.min(w, h) / 2) * (Math.max(0, Math.min(100, pct)) / 100);

export type RadialButtonVariant =
  | "primary"
  | "dark"
  | "white"
  | "x-twitter"
  | "discord"
  | "custom";

export interface RadialRevealButtonProps {
  children?: React.ReactNode | ((isHover: boolean) => React.ReactNode);
  hoverChildren?: React.ReactNode;
  label?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  variant?: RadialButtonVariant;
  fill?: string;
  hoverFill?: string;
  textColor?: string;
  hoverTextColor?: string;
  borderWidth?: number;
  borderColor?: string;
  rounded?: number; // 0 to 100 percent
  borderRadius?: string | number;
  transition?: Transition;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

const DEFAULT_TRANSITION: Transition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1],
  duration: 0.5,
};

export default function RadialRevealButton({
  children,
  hoverChildren,
  label,
  href,
  onClick,
  className = "",
  style,
  variant = "primary",
  fill: fillProp,
  hoverFill: hoverFillProp,
  textColor: textColorProp,
  hoverTextColor: hoverTextColorProp,
  borderWidth,
  borderColor,
  rounded = 100,
  borderRadius,
  transition = DEFAULT_TRANSITION,
  target,
  rel,
  type = "button",
  disabled,
  ariaLabel,
}: RadialRevealButtonProps) {
  // Variant preset styling
  let defaultFill = "#7c3aed";
  let defaultHoverFill = "#0b0f19";
  let defaultTextColor = "#ffffff";
  let defaultHoverTextColor = "#ffffff";
  let defaultBorderColor = "transparent";
  let defaultBorderWidth = 0;

  if (variant === "primary") {
    defaultFill = "#7c3aed"; // rich purple
    defaultHoverFill = "#0b0f19"; // sleek dark web3
    defaultTextColor = "#ffffff";
    defaultHoverTextColor = "#ffffff";
  } else if (variant === "dark") {
    defaultFill = "#0e1322";
    defaultHoverFill = "#7c3aed";
    defaultTextColor = "#ffffff";
    defaultHoverTextColor = "#ffffff";
    defaultBorderColor = "#1e293b";
    defaultBorderWidth = 1;
  } else if (variant === "white") {
    defaultFill = "#ffffff";
    defaultHoverFill = "#7c3aed";
    defaultTextColor = "#0f172a";
    defaultHoverTextColor = "#ffffff";
    defaultBorderColor = "#e2e8f0";
    defaultBorderWidth = 1;
  } else if (variant === "x-twitter") {
    defaultFill = "#ffffff";
    defaultHoverFill = "#000000";
    defaultTextColor = "#0f172a";
    defaultHoverTextColor = "#ffffff";
    defaultBorderColor = "#e2e8f0";
    defaultBorderWidth = 1;
  } else if (variant === "discord") {
    defaultFill = "#ffffff";
    defaultHoverFill = "#5865F2";
    defaultTextColor = "#0f172a";
    defaultHoverTextColor = "#ffffff";
    defaultBorderColor = "#e2e8f0";
    defaultBorderWidth = 1;
  }

  const fill = fillProp ?? defaultFill;
  const hoverFill = hoverFillProp ?? defaultHoverFill;
  const textColor = textColorProp ?? defaultTextColor;
  const hoverTextColor = hoverTextColorProp ?? defaultHoverTextColor;
  const bColor = borderColor ?? defaultBorderColor;
  const bWidth = borderWidth ?? defaultBorderWidth;

  const [scope, animate] = useAnimate();
  const [radiusBox, setRadiusBox] = useState({ w: 0, h: 0 });

  useIsoLayoutEffect(() => {
    const el = scope.current as HTMLElement | null;
    if (!el) return;
    const read = () =>
      setRadiusBox((prev) =>
        prev.w === el.offsetWidth && prev.h === el.offsetHeight
          ? prev
          : { w: el.offsetWidth, h: el.offsetHeight }
      );
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scope]);

  const radiusPx = radiusFromPercent(radiusBox.w, radiusBox.h, rounded);
  const overlayRef = useRef<HTMLSpanElement>(null);
  const clipCtrl = useRef<AnimationPlaybackControls | null>(null);
  const reducedMotion = useReducedMotion();

  const clip = useRef({ r: 0, x: 50, y: 50, max: 160 });

  const applyClip = () => {
    const el = overlayRef.current;
    if (!el) return;
    const { r, x, y } = clip.current;
    const value = `circle(${r}% at ${x}% ${y}%)`;
    el.style.clipPath = value;
    (el.style as any).webkitClipPath = value;
  };

  const anchorTo = (e: React.PointerEvent) => {
    const el = overlayRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    const unit = Math.hypot(r.width, r.height) / Math.SQRT2;
    const far = Math.max(
      Math.hypot(px, py),
      Math.hypot(r.width - px, py),
      Math.hypot(px, r.height - py),
      Math.hypot(r.width - px, r.height - py)
    );
    clip.current.x = (px / r.width) * 100;
    clip.current.y = (py / r.height) * 100;
    clip.current.max = (far / unit) * 100 + 4;
  };

  const growTo = (to: number) => {
    clipCtrl.current?.stop();
    if (reducedMotion) {
      clip.current.r = to;
      applyClip();
      return;
    }
    clipCtrl.current = animate(clip.current.r, to, {
      ...(transition as any),
      onUpdate: (v: number) => {
        clip.current.r = v;
        applyClip();
      },
    });
  };

  const onEnter = (e: React.PointerEvent) => {
    anchorTo(e);
    applyClip();
    growTo(clip.current.max);
  };

  const onLeave = (e: React.PointerEvent) => {
    if (clip.current.r >= clip.current.max - 0.5) {
      anchorTo(e);
      clip.current.r = clip.current.max;
      applyClip();
    }
    growTo(0);
  };

  useIsoLayoutEffect(() => {
    applyClip();
    return () => clipCtrl.current?.stop();
  }, []);

  const Tag = href ? "a" : "button";
  const tagProps: any = href
    ? {
        href,
        target,
        rel: target === "_blank" ? "noopener noreferrer" : rel,
      }
    : {
        type,
        disabled,
      };

  const effectiveBorderRadius = borderRadius !== undefined ? borderRadius : radiusPx;
  const contentToRender =
    typeof children === "function" ? children(false) : children || label;
  const hoverContentToRender =
    typeof children === "function"
      ? children(true)
      : hoverChildren || contentToRender;

  return (
    <Tag
      {...tagProps}
      ref={scope}
      onClick={onClick}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      aria-label={ariaLabel}
      className={`group relative select-none cursor-pointer overflow-hidden transition-transform duration-200 active:scale-95 ${className}`}
      style={{
        borderRadius: effectiveBorderRadius,
        borderWidth: bWidth > 0 ? bWidth : undefined,
        borderStyle: bWidth > 0 ? "solid" : undefined,
        borderColor: bWidth > 0 ? bColor : undefined,
        backgroundColor: fill,
        color: textColor,
        ...style,
      }}
    >
      {/* Base Layer */}
      <span
        className="w-full h-full flex items-center justify-center pointer-events-none"
        style={{ color: textColor }}
      >
        {contentToRender}
      </span>

      {/* Overlay Layer with Radial Reveal effect */}
      <span
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          borderRadius: effectiveBorderRadius,
          backgroundColor: hoverFill,
          color: hoverTextColor,
          clipPath: "circle(0% at 50% 50%)",
          WebkitClipPath: "circle(0% at 50% 50%)",
        }}
      >
        {hoverContentToRender}
      </span>
    </Tag>
  );
}
