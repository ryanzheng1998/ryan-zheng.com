import type { Locale } from '@/content/locales'

export function Brand({ locale }: { locale: Locale }) {
  return <a href={`/${locale}`} className="brand" aria-label="Ryan Zheng — home">
    <img src="/icon.svg" width="40" height="40" alt="" />
    <span>Ryan Zheng<span className="brand-sub">鄭聖玄</span></span>
  </a>
}
