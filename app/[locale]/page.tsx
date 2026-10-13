import { SiteHeader } from '@/components/SiteHeader'
import { ProjectPreview } from '@/components/ProjectPreview'
import { isLocale } from '@/content/locales'
import { blogPosts, home, projects, socialLinks, categoryNames } from '@/content/site'
import { notFound } from 'next/navigation'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const c = home[locale]
  const posts = blogPosts.filter(p => p.locales.includes(locale))
  const featured = ['pose-detection', 'spring-parameter-picker', 'webgl-bloom', 'webcam-mirror'].map(id => projects.find(p => p.id === id)!)
  return <main className="editorial-site">
    <SiteHeader locale={locale} />
    <div id="main-content">
      <section className="home-hero home-hero-text site-width">
        <div className="hero-copy">
          <p className="eyebrow">{locale === 'en' ? 'A place for curiosity' : '留給好奇心的一個地方'}</p>
          <h1>{locale === 'en' ? <>I write, build,<br />and <em>keep learning.</em></> : <>寫作、實作，<br /><em>持續學習。</em></>}</h1>
          <p className="hero-summary">{c.summary}</p>
          <div className="hero-actions"><a className="button-primary" href={`/${locale}/projects`}>{c.secondaryAction} <span aria-hidden="true">↗</span></a><a className="text-link" href={`/${locale}/blog`}>{c.primaryAction} <span aria-hidden="true">→</span></a></div>
        </div>

      </section>
      <section className="site-width work-section">
        <div className="section-heading"><div><p className="eyebrow">01 / {c.featuredProjectsLabel}</p><h2>{locale === 'en' ? 'Ideas you can play with.' : '可以動手玩的點子。'}</h2></div><a className="text-link" href={`/${locale}/projects`}>{c.viewAllProjects} <span aria-hidden="true">↗</span></a></div>
        <ul className="featured-grid">{featured.map(p => <li key={p.id}><a className="featured-card" href={`/${locale}${p.href}`}><ProjectPreview id={p.id}/><div className="project-copy"><p className="eyebrow">{categoryNames[p.categoryId as keyof typeof categoryNames][locale]}</p><h3>{p.title[locale]} <span aria-hidden="true">↗</span></h3><p>{p.description?.[locale]}</p></div></a></li>)}</ul>
      </section>
      <section className="writing-section"><div className="site-width writing-layout"><div><p className="eyebrow">02 / {c.latestLabel}</p><h2>{locale === 'en' ? <>Notes from<br />the journey.</> : <>沿路留下的<br />一些筆記。</>}</h2><p className="section-summary">{c.blogSubheading}</p></div><ul className="writing-list">{posts.map((p,i)=><li key={p.slug}><a href={`/${locale}/blog/${p.slug}`}><div className="article-meta"><span>0{i+1}</span><time dateTime={p.date}>{p.date}</time></div><h3>{p.title[locale]} <span aria-hidden="true">↗</span></h3><p>{p.description[locale]}</p></a></li>)}</ul></div></section>
      <footer className="site-width site-footer"><div><p className="eyebrow">{c.linksHeading}</p><h2>{locale === 'en' ? 'Let’s stay curious.' : '一起保持好奇。'}</h2></div><div className="footer-links">{socialLinks.map(s=><a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{typeof s.label === 'string' ? s.label : s.label[locale]} <span aria-hidden="true">↗</span></a>)}</div><p className="footer-credit">{c.footer}</p></footer>
    </div>
  </main>
}
