'use client'

import { useState } from 'react'
import type { Locale } from '@/content/locales'
import { categoryNames, projects } from '@/content/site'
import { ProjectPreview } from './ProjectPreview'

export function ProjectGrid({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const filtered = projects.filter(
    (p) =>
      (category === 'all' || p.categoryId === category) &&
      `${p.title.en} ${p.title.zh} ${p.description?.[locale] ?? ''} ${categoryNames[p.categoryId as keyof typeof categoryNames][locale]}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  )
  return (
    <>
      <div className="project-filters">
        <label htmlFor="project-search" className="eyebrow">
          {locale === 'en' ? 'Find an experiment' : '找一個實驗'}
        </label>
        <input
          id="project-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={locale === 'en' ? 'Search projects…' : '搜尋作品…'}
        />
        <div
          className="category-filters"
          aria-label={locale === 'en' ? 'Filter by category' : '依分類篩選'}
        >
          <button
            aria-pressed={category === 'all'}
            onClick={() => setCategory('all')}
          >
            {locale === 'en' ? 'All' : '全部'} <span>{projects.length}</span>
          </button>
          {Object.entries(categoryNames).map(([id, name]) => (
            <button
              key={id}
              aria-pressed={category === id}
              onClick={() => setCategory(id)}
            >
              {name[locale]}
            </button>
          ))}
        </div>
        <p className="result-count" role="status">
          {locale === 'en'
            ? `${filtered.length} ${filtered.length === 1 ? 'experiment' : 'experiments'}`
            : `${filtered.length} 個實驗`}
        </p>
      </div>
      {filtered.length === 0 && (
        <div className="empty-projects">
          <h2>
            {locale === 'en' ? 'No projects found.' : '沒有找到符合的作品。'}
          </h2>
          <p>
            {locale === 'en'
              ? 'Try another keyword or category.'
              : '試試其他關鍵字或分類。'}
          </p>
          <button
            className="text-link"
            onClick={() => {
              setQuery('')
              setCategory('all')
            }}
          >
            {locale === 'en' ? 'Reset filters →' : '重設篩選 →'}
          </button>
        </div>
      )}
      {Object.entries(categoryNames).map(([id, name]) => {
        const items = filtered.filter((p) => p.categoryId === id)
        if (!items.length) return null
        return (
          <section key={id} className="project-category">
            <h2>
              {name[locale]}{' '}
              <span>{items.length.toString().padStart(2, '0')}</span>
            </h2>
            <ul className="project-directory-grid">
              {items.map((p) => (
                <li key={p.id}>
                  <a
                    className="directory-card"
                    href={p.external ? p.href : `/${locale}${p.href}`}
                    target={p.external ? '_blank' : undefined}
                    rel={p.external ? 'noopener noreferrer' : undefined}
                  >
                    <ProjectPreview id={p.id} />
                    <div>
                      <h3>
                        {p.title[locale]} <span aria-hidden="true">↗</span>
                      </h3>
                      {p.description && <p>{p.description[locale]}</p>}
                      <span className="directory-label">
                        {p.external
                          ? locale === 'en'
                            ? 'External project'
                            : '外部作品'
                          : locale === 'en'
                            ? 'Interactive experiment'
                            : '互動實驗'}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </>
  )
}
