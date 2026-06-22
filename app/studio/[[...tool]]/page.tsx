"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { useEffect, useState } from "react";

export default function StudioPage() {
  const [scheme, setScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const detect = () => {
      const studioRoot = document.querySelector("[data-ui-scheme]");
      if (studioRoot) {
        const val = studioRoot.getAttribute("data-ui-scheme");
        setScheme(val === "dark" ? "dark" : "light");
      }
    };

    detect();

    const observer = new MutationObserver(detect);
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-ui-scheme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-cursor-theme={scheme === "dark" ? "light" : "dark"}
      style={{ height: "100vh" }}
    >
      <NextStudio
        config={config}
        unstable_noAuthBoundary={false}
      />
    </div>
  );
}