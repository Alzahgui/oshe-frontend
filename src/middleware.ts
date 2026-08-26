// ── src/middleware.ts ──────────────────────────────────────────────────────

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard', '/portal']

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

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/portal/:path*'],
}
