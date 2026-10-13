import type { Locale } from '@/content/locales'
import { home } from '@/content/site'
import { Brand } from './Brand'
import { LanguageSwitcher } from './LanguageSwitcher'

export function SiteHeader({ locale, path = '' }: { locale: Locale; path?: string }) {
  return <header className="site-header">
    <a className="skip-link" href="#main-content">{locale === "en" ? "Skip to content" : "跳到主要內容"}</a>
    <Brand locale={locale} />
    <nav aria-label={locale === 'en' ? 'Main navigation' : '主要導覽'}>
      <a href={`/${locale}/blog`} aria-current={path.startsWith('/blog') ? 'page' : undefined}>{home[locale].navBlog}</a>
      <a href={`/${locale}/projects`} aria-current={path.startsWith('/projects') ? 'page' : undefined}>{home[locale].navProjects}</a>
      <a href={`/${locale}/resume`} aria-current={path.startsWith("/resume") ? "page" : undefined}>{home[locale].navResume}</a>
      <LanguageSwitcher locale={locale} path={path} />
    </nav>
  </header>
}
