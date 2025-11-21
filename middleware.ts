import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const authCookie = req.cookies.get("auth_user");
  const user = authCookie ? safeJSONParse(authCookie.value) : null;

  // ADMIN PROTECTED
  if (path.startsWith("/admin")) {
    if (!user || user.role !== "admin") {
      const url = new URL("/", req.url);
      url.searchParams.set("auth", "required");
      url.searchParams.set("reason", "admin");
      url.searchParams.set("redirect", path + req.nextUrl.search);
      return NextResponse.redirect(url);
    }
  }

  // USER PROTECTED ROUTES
  const protectedUserRoutes = ["/dashboard", "/order", "/profile", "/intake"];

  if (protectedUserRoutes.some(route => path.startsWith(route))) {
    if (!user) {
      const url = new URL("/", req.url);
      url.searchParams.set("auth", "required");
      url.searchParams.set("reason", "user");
      url.searchParams.set("redirect", path + req.nextUrl.search);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

function safeJSONParse(val: string) {
  try {
    return JSON.parse(val);
  } catch {
    return null;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/order/:path*",
    "/profile/:path*",
    "/intake/:path*",
    "/admin/:path*",
  ],
};
