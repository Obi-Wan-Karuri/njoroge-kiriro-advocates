"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { useEffect } from "react";

export default function StudioPage() {
  useEffect(() => {
    document.body.classList.add("studio-page");
    return () => document.body.classList.remove("studio-page");
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <NextStudio config={config} unstable_noAuthBoundary={false} />
    </div>
  );
}