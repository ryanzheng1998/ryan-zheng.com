import type { Locale } from '@/content/locales'
import { home, socialLinks } from '@/content/site'

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-width interior-footer">
      <a href={`/${locale}`}>Ryan Zheng / 鄭聖玄</a>
      <div>
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {typeof link.label === 'string' ? link.label : link.label[locale]}{' '}
            ↗
          </a>
        ))}
      </div>
      <p>{home[locale].footer}</p>
    </footer>
  )
}
