import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a fully static site (e.g. for GitHub Pages) into ./out.
// BASE_PATH is the sub-path the site is served from, e.g. "/IELTSGUIDE".
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true } } : {}),
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
