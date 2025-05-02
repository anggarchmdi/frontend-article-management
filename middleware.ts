// middleware.ts
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const authData = request.cookies.get("auth")?.value

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/articles", request.url))
  }

  // Role-based redirection
  if (authData) {
    try {
      const user = JSON.parse(authData)

      const isAdminPath = request.nextUrl.pathname.startsWith("/admin")
      const isUserPath = request.nextUrl.pathname.startsWith("/articles")

      if (user.role === "admin" && isUserPath) {
        return NextResponse.redirect(new URL("/admin", request.url))
      }

      if (user.role === "user" && isAdminPath) {
        return NextResponse.redirect(new URL("/articles", request.url))
      }

    } catch (err) {
      console.error("Invalid auth cookie")
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ],
}
