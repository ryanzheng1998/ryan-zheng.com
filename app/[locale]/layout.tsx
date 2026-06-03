import { notFound } from 'next/navigation'
import { isLocale, locales, type Locale } from '@/content/locales'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return children
}

export type LocaleParams = Promise<{ locale: Locale }>
