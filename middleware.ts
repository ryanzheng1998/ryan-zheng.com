import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale } from './content/locales'
import { getLocale } from './functions/getLocale'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname !== '/') {
    return NextResponse.next()
  }

  const locale = getLocale(request)
  const targetLocale = locale === 'zh' ? 'zh' : defaultLocale

  const url = request.nextUrl.clone()
  url.pathname = `/${targetLocale}`

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
