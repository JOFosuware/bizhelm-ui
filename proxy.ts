import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = new Set([
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
]);

export default function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Allow Next internals/static
  const { pathname } = url;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Allow public auth pages
  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const mockMode = process.env.NEXT_PUBLIC_MOCK_MODE === "true";
  if (mockMode) {
    return NextResponse.next();
  }

  // Cookie name expected from BizHelm Go backend (see spec)
  const session = req.cookies.get("bh_session")?.value;
  if (!session) {
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (Next's internal)
     * - static files
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
