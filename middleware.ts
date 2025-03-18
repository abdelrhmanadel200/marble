import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    // Check for the auth cookie
    const authToken = request.cookies.get("auth_token")?.value

    if (!authToken) {
      // Redirect to login if no auth token is found
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("from", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    // We could also verify the token here if needed
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
