// ── src/middleware.ts ──────────────────────────────────────────────────────

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard', '/portal']
const GUEST_ONLY_PATHS = ['/login', '/register']

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('authenticated')?.value === '1'
  const { pathname } = request.nextUrl

  // Protect /dashboard/* and /portal/* — redirect to /login if unauthenticated
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Already logged in — skip /login and /register, go straight to the dashboard
  const isGuestOnly = GUEST_ONLY_PATHS.some((p) => pathname.startsWith(p))
  if (isGuestOnly && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/portal/:path*', '/login', '/register'],
}
