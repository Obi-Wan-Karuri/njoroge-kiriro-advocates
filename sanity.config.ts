import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const basePath = "/studio";

export default defineConfig({
  name: "default",
  title: "Njoroge Kiriro Advocates",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});