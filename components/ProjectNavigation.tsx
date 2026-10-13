'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isLocale } from '@/content/locales'
import { projects, categoryNames } from '@/content/site'

export function ProjectNavigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(false)
  }, [pathname])
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  const [, locale, ...segments] = pathname.split('/')
  if (!locale || !isLocale(locale)) return null
  const path = '/' + segments.join('/')
  const project = projects.find((p) => p.href === path)
  if (!project || project.id === 'spring-parameter-picker') return null
  const related = projects.filter(
    (p) => p.categoryId === project.categoryId && !p.external,
  )
  const index = related.findIndex((p) => p.id === project.id)
  const next =
    related.length > 1 ? related[(index + 1) % related.length] : undefined
  return (
    <aside
      className="demo-navigation"
      aria-label={locale === 'en' ? 'Project navigation' : '作品導覽'}
    >
      {open && (
        <div className="demo-details" id="demo-details">
          <p className="eyebrow">
            {
              categoryNames[project.categoryId as keyof typeof categoryNames][
                locale
              ]
            }
          </p>
          <h2>{project.title[locale]}</h2>
          <p>{project.description[locale]}</p>
          <h3>{locale === 'en' ? 'Try it' : '操作方式'}</h3>
          <p>{project.instructions[locale]}</p>
          <div className="demo-detail-actions">
            <a href={`/${locale === 'en' ? 'zh' : 'en'}${path}`}>
              {locale === 'en' ? '中文' : 'English'}
            </a>
            <button onClick={() => window.location.reload()}>
              {locale === 'en' ? 'Restart demo' : '重新開始'}
            </button>
          </div>
          {next && (
            <a className="next-project" href={`/${locale}${next.href}`}>
              <span>{locale === 'en' ? 'Explore next' : '下一個實驗'}</span>
              {next.title[locale]} →
            </a>
          )}
        </div>
      )}
      <div className="demo-toolbar">
        <a href={`/${locale}/projects`}>
          ← {locale === 'en' ? 'Projects' : '所有作品'}
        </a>
        <button
          aria-expanded={open}
          aria-controls={open ? 'demo-details' : undefined}
          onClick={() => setOpen(!open)}
        >
          {open
            ? locale === 'en'
              ? 'Close'
              : '關閉'
            : locale === 'en'
              ? 'How to use'
              : '操作說明'}
        </button>
      </div>
    </aside>
  )
}
