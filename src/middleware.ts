// ── src/middleware.ts ──────────────────────────────────────────────────────

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// (dashboard) is a route group — none of these paths actually live under
// /dashboard in the URL, so each needs listing explicitly to be protected.
const PROTECTED_PATHS = [
  '/dashboard', '/users', '/posts', '/settings',
  '/announcements', '/nav-menus', '/hero-stats', '/quick-access-cards',
  '/news-articles', '/law-documents', '/safety-metrics', '/safety-trends',
  '/industry-risks', '/events', '/ai-features', '/testimonials',
  '/partners', '/footer-link-groups',
]

export function middleware(request: NextRequest) {
  const authenticated = request.cookies.get('authenticated')?.value
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))

  if (isProtected && !authenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from /login
  if (pathname === '/login' && authenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*', '/users/:path*', '/posts/:path*', '/settings/:path*',
    '/announcements/:path*', '/nav-menus/:path*', '/hero-stats/:path*', '/quick-access-cards/:path*',
    '/news-articles/:path*', '/law-documents/:path*', '/safety-metrics/:path*', '/safety-trends/:path*',
    '/industry-risks/:path*', '/events/:path*', '/ai-features/:path*', '/testimonials/:path*',
    '/partners/:path*', '/footer-link-groups/:path*',
    '/login',
  ],
}
