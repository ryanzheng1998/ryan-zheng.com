import { NextRequest, NextResponse } from 'next/server'
import { getLocale } from './functions/getLocale'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname !== '/') {
    return NextResponse.next()
  }

  const locale = getLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}`

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
