import type { auth } from "apis/auth";
import type { NextRequest } from "next/server";

import { betterFetch } from "@better-fetch/fetch";
import { NextResponse } from "next/server";


type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip all auth API calls including get-session
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  try {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
        // Add timeout and retry logic for production
        timeout: 5000,
      }
    );

    const publicRoutes = [
      "/api/auth", // Allow auth API calls
      "/sign-up",
      "/login",
      "/forgot-password",
      "/reset-password",
      "/verify-email",
    ];

    const isPublicRoute = publicRoutes.some(route =>
      request.nextUrl.pathname.startsWith(route),
    );

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (!session && pathname.startsWith("/")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware session fetch error:", error);
    // On error, allow the request to proceed but log it
    // You might want to redirect to login or show error page
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Exclude auth API from middleware matching
    "/((?!_next|api/auth|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};