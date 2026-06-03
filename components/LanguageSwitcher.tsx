import { getAlternateLocale, type Locale } from '@/content/locales'
import { home } from '@/content/site'

type Props = {
  locale: Locale
  path?: string
}

export function LanguageSwitcher({ locale, path = '' }: Props) {
  const nextLocale = getAlternateLocale(locale)

  return (
    <a
      href={`/${nextLocale}${path}`}
      className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:border-blue-500 hover:text-blue-600"
    >
      {home[locale].languageLabel}
    </a>
  )
}

