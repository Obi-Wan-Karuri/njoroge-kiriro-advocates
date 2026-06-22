"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 12;
const LERP_FACTOR = 0.12;

interface CursorPos {
  x: number;
  y: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const DARK_BG_COLOURS = [
  "rgb(28, 28, 30)",
  "rgb(26, 77, 53)",
  "rgb(45, 122, 85)",
];

function isColourDark(colour: string): boolean {
  return DARK_BG_COLOURS.includes(colour);
}

function isDarkAtPoint(x: number, y: number): boolean {
  const darkSectionIds = ["hero", "testimonials"];
  const elements = document.elementsFromPoint(x, y);

  for (const el of elements) {
    const htmlEl = el as HTMLElement;

    // Explicit light override — highest priority
    if (
      htmlEl.getAttribute("data-cursor-theme") === "light" ||
      htmlEl.closest("[data-cursor-theme='light']")
    )
      return false;

    // Explicit dark marker
    if (
      htmlEl.getAttribute("data-cursor-theme") === "dark" ||
      htmlEl.closest("[data-cursor-theme='dark']")
    )
      return true;

    // Navbar / header
    if (htmlEl.tagName === "HEADER" || htmlEl.closest("header")) return true;

    // Footer
    if (htmlEl.tagName === "FOOTER" || htmlEl.closest("footer")) return true;

    // Named dark section IDs
    const section = htmlEl.closest("section");
    if (section) {
      if (darkSectionIds.includes(section.id)) return true;
    }

    // Computed background colour fallback
    const bg = window.getComputedStyle(htmlEl).backgroundColor;
    if (
      bg &&
      bg !== "rgba(0, 0, 0, 0)" &&
      bg !== "transparent" &&
      isColourDark(bg)
    ) {
      return true;
    }
  }

  return false;
}

export default function Cursor() {
  const [isOnDark, setIsOnDark] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isStudio, setIsStudio] = useState(false);
  // Start as true (hidden) until we confirm a mouse pointer is being used
  const [isTouch, setIsTouch] = useState(true);
  const mouseRef = useRef<CursorPos>({ x: -100, y: -100 });
  const trailRef = useRef<CursorPos[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  );
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailElemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    setIsStudio(window.location.pathname.startsWith("/studio"));

    // Detect actual input type from the first pointer event.
    // "mouse" = real cursor device, show custom cursor.
    // "touch" or "pen" = touch screen, keep hidden.
    const handlePointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        setIsTouch(false);
      } else {
        setIsTouch(true);
      }
    };

    window.addEventListener("pointerdown", handlePointer);
    // Also catch hover-only mice that never click
    window.addEventListener("pointermove", handlePointer);

    return () => {
      window.removeEventListener("pointerdown", handlePointer);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  useEffect(() => {
    if (isStudio || isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsOnDark(isDarkAtPoint(e.clientX, e.clientY));
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, input, textarea, select"));
    };

    const animate = () => {
      const mouse = mouseRef.current;
      const trail = trailRef.current;

      trail[0] = {
        x: lerp(trail[0].x, mouse.x, LERP_FACTOR * 2),
        y: lerp(trail[0].y, mouse.y, LERP_FACTOR * 2),
      };

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail[i] = {
          x: lerp(trail[i].x, trail[i - 1].x, LERP_FACTOR),
          y: lerp(trail[i].y, trail[i - 1].y, LERP_FACTOR),
        };
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x - 3}px, ${mouse.y - 3}px)`;
      }

      if (ringRef.current) {
        const size = isHovering ? 56 : 40;
        ringRef.current.style.transform = `translate(${
          trail[0].x - size / 2
        }px, ${trail[0].y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }

      trailElemsRef.current.forEach((el, i) => {
        if (!el) return;
        const t = trail[i];
        const size = Math.max(6, 36 - i * 2.5);
        const opacity = (1 - i / TRAIL_LENGTH) * 0.12;
        el.style.transform = `translate(${t.x - size / 2}px, ${
          t.y - size / 2
        }px)`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.opacity = `${opacity}`;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [isHovering, isStudio, isTouch]);

  // Don't render on Studio pages or touch devices
  if (isStudio || isTouch) return null;

  const ringColor = isOnDark ? "rgba(249,249,247,0.9)" : "rgba(28,28,30,0.9)";
  const trailColor = isOnDark ? "rgba(249,249,247,1)" : "rgba(28,28,30,1)";
  const dotColor = isOnDark ? "#f9f9f7" : "#1c1c1e";

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailElemsRef.current[i] = el;
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            borderRadius: "50%",
            border: `1px solid ${trailColor}`,
            pointerEvents: "none",
            zIndex: 99997,
            willChange: "transform, opacity, width, height",
          }}
        />
      ))}

      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          border: `2px solid ${ringColor}`,
          pointerEvents: "none",
          zIndex: 99998,
          transition: "border-color 0.3s, width 0.15s, height 0.15s",
          willChange: "transform, width, height",
        }}
      />

      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: dotColor,
          pointerEvents: "none",
          zIndex: 99999,
          transition: "background-color 0.3s",
          willChange: "transform",
        }}
      />
    </>
  );
}