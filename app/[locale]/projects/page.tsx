import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { ProjectGrid } from '@/components/ProjectGrid'
import { isLocale, type Locale } from '@/content/locales'
import { home } from '@/content/site'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam

  return (
    <main className="editorial-site index-page">
      <SiteHeader locale={locale} path="/projects" />

      <section id="main-content" className="site-width index-content">
        <p className="eyebrow">
          {locale === 'en' ? 'The playground' : '實驗遊樂場'}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          {home[locale].projectsHeading}
        </h1>
        <p className="index-intro">{home[locale].projectsSubheading}</p>
        <ProjectGrid locale={locale} />
      </section>
      <SiteFooter locale={locale} />
    </main>
  )
}
