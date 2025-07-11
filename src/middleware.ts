import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/thankyou") {
    const hasSubmissionToken = request.headers
      .get("cookie")
      ?.includes("form_submitted=true");

    const referrer = request.headers.get("referer");
    const isFromOurDomain = referrer?.includes(request.nextUrl.origin);

    if (!isFromOurDomain && !hasSubmissionToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
