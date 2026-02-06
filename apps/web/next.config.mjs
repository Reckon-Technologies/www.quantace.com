/**
 * Next.js Configuration for Monorepo Apps
 *
 * This config does three main things:
 * 1. Environment Variable Loading: Manually reads and parses environment variables
 *    from a root-level .env.local file (../../.env.local) so both apps can share
 *    the same auth credentials from a single file at the monorepo root
 * 2. Package Transpilation: Transpiles workspace packages (@workspace/*) since
 *    they're written in TypeScript and need compilation for the browser
 * 3. Content Security Policy: Sets CSP headers to whitelist Google OAuth domains
 *    and APIs needed for authentication to work properly
 */

import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));
 
// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
jiti("./env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@workspace/ui",
    "@workspace/auth",
    "@workspace/trpc",
    "@workspace/db",
  ],
  async rewrites() {
    const isLocal
      = process.env.NODE_ENV !== "production" && !process.env.VERCEL;
    const backendUrl
      = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:9999";

    return [
      {
        source: "/api/:path*",
        destination: isLocal
          ? "http://localhost:9999/api/:path*"
          : `${backendUrl}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://apis.google.com",
              "style-src 'self' 'unsafe-inline' https://accounts.google.com",
              "img-src 'self' data: https://*.googleusercontent.com https://accounts.google.com https://github.com/shadcn.png",
              "connect-src 'self' http://localhost:3000 http://localhost:3001 http://localhost:9999 https://localhost:3000 https://localhost:3001 https://accounts.google.com https://play.google.com https://apis.google.com",
              "frame-src 'self' https://accounts.google.com",
              "font-src 'self' data:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
