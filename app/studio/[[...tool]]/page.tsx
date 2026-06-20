"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { useEffect, useState } from "react";

export default function StudioPage() {
  const [scheme, setScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Sanity Studio writes data-ui-scheme="light"|"dark" onto its root div.
    // We watch for that attribute to change and update cursor theme accordingly.
    const detect = () => {
      const studioRoot = document.querySelector("[data-ui-scheme]");
      if (studioRoot) {
        const val = studioRoot.getAttribute("data-ui-scheme");
        setScheme(val === "dark" ? "dark" : "light");
      }
    };

    // Run once immediately in case Studio already mounted
    detect();

    // Watch for the attribute appearing or changing
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
      data-cursor-theme={scheme === "dark" ? "dark" : "light"}
      style={{ height: "100vh" }}
    >
      <NextStudio config={config} />
    </div>
  );
}