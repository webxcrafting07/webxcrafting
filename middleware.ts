import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = request.nextUrl.pathname

  // Handle literal trailing or standalone $ and & to prevent Google Search Console 404s
  if (pathname === '/$' || pathname === '/&' || pathname.endsWith('$') || pathname.endsWith('&')) {
    url.pathname = '/'
    return NextResponse.redirect(url, 301)
  }

  const hostname = request.headers.get('host')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webxcrafting.in'
  const canonicalHost = new URL(siteUrl).host

  // Enforce www if canonicalHost has it and current hostname doesn't, skipping localhost
  const isLocalhost = hostname && (hostname.includes('localhost') || hostname.includes('127.0.0.1'))
  if (!isLocalhost && canonicalHost.startsWith('www.') && hostname && !hostname.startsWith('www.')) {
    url.host = canonicalHost
    return NextResponse.redirect(url, 301)
  }

  // Enforce non-www if canonicalHost doesn't have it and current hostname does
  if (!canonicalHost.startsWith('www.') && hostname && hostname.startsWith('www.')) {
    url.host = canonicalHost
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (SEO robots file)
     * - sitemap.xml (SEO sitemap)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml).*)',
  ],
}
