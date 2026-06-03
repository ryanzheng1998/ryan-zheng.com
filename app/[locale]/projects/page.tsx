import { LanguageSwitcher } from '@/components/LanguageSwitcher'
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
    <main className="min-h-screen bg-white px-6 py-16 font-sans text-neutral-800">
      <nav className="mx-auto mb-12 flex max-w-3xl items-center justify-between">
        <a href={`/${locale}`} className="text-sm font-medium text-blue-600">
          Ryan Zheng
        </a>
        <LanguageSwitcher locale={locale} path="/projects" />
      </nav>

      <section className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">
          {home[locale].projectsHeading}
        </h1>
        <ProjectGrid locale={locale} />
      </section>
    </main>
  )
}
