"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { useEffect, useState } from "react";

export default function StudioPage() {
  const [scheme, setScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Detect system colour scheme for cursor theming
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setScheme(mq.matches ? "dark" : "light");
    const handler = (e: MediaQueryListEvent) =>
      setScheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      data-cursor-theme={scheme === "dark" ? "dark" : "light"}
      style={{ height: "100vh" }}
    >
      <NextStudio config={config} />
    </div>
  );
}