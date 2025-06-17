import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup", "/verify-email"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the access token from cookies
  const accessToken = request.cookies.get("access_token")?.value;

  try {
    // If no token, treat as unauthenticated
    if (!accessToken) {
      if (!publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    }

    // Verify token by making API call with the cookie
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
    const response = await fetch(`${apiUrl}/auth/get-logged-in-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Cookie: `access_token=${accessToken}`,
      },
    });

    if (response.ok) {
      const user = await response.json();
      if (user && user.success) {
        // ✅ User is logged in — redirect away from public routes
        if (publicRoutes.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next(); // Allow access to protected routes
      } else {
        // Invalid token or user not found
        if (!publicRoutes.includes(pathname)) {
          return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
      }
    } else {
      // API call failed (401, 403, etc.)
      if (!publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    }
  } catch (error) {
    console.log("Middleware auth error:", error);
    // On error, assume unauthenticated
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
