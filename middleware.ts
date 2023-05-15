import { NextRequest, NextResponse } from 'next/server'
import { i18n } from './i18n-config'

export const config = {
  matcher: ['/'],
}

const getLocales = (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language')
  if (!acceptLanguage) return []

  return acceptLanguage.split(',').map((localeWithQFactor) => {
    const [locale, qFactorString] = localeWithQFactor.split(';')
    const qFactor = qFactorString ? Number(qFactorString.split('=')[1]) : 1

    return { locale: locale ?? '', qFactor }
  })
}

export const middleware = (request: NextRequest) => {
  const locales = getLocales(request)
  const supportedLocales = new Set<string>(i18n.locales)

  // time complexity is not optimal, but it's easier to read and understand
  const maxQFactorlocale = locales
    .filter((locale) => {
      return supportedLocales.has(locale.locale)
    })
    .sort((a, b) => b.qFactor - a.qFactor)[0]

  const locale = maxQFactorlocale?.locale ?? i18n.defaultLocale

  return NextResponse.redirect(
    new URL(`/${locale}${request.nextUrl.pathname}`, request.url)
  )
}
