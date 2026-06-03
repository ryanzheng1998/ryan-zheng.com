import Image from 'next/image'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { isLocale, type Locale } from '@/content/locales'
import { blogPosts, home, projects, socialLinks } from '@/content/site'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

const featuredProjectIds = [
  'pose-detection',
  'spring-parameter-picker',
  'webgl-bloom',
  'webcam-mirror',
]

export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const content = home[locale]
  const localizedBlogPosts = blogPosts.filter((post) =>
    post.locales.includes(locale),
  )
  const latestPost = localizedBlogPosts[0]
  const featuredProjects = featuredProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project) => project !== undefined)

  return (
    <main className="min-h-screen bg-stone-50 font-sans text-neutral-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href={`/${locale}`} className="font-semibold tracking-tight">
          Ryan Zheng
        </a>
        <nav className="flex items-center gap-5 text-sm font-medium text-neutral-600">
          <a href={`/${locale}/blog`} className="hidden hover:text-neutral-950 sm:inline">
            {content.navBlog}
          </a>
          <a
            href={`/${locale}/projects`}
            className="hidden hover:text-neutral-950 sm:inline"
          >
            {content.navProjects}
          </a>
          <LanguageSwitcher locale={locale} />
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1fr_360px] lg:pb-24 lg:pt-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.03] tracking-tight text-neutral-950 sm:text-6xl">
            {content.introTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-neutral-700">
            {content.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`/${locale}/blog`}
              className="rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              {content.primaryAction}
            </a>
            <a
              href={`/${locale}/projects`}
              className="rounded-md border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-500"
            >
              {content.secondaryAction}
            </a>
          </div>
        </div>

        <div className="justify-self-center text-center lg:justify-self-end lg:text-left">
          <Image
            src="/me.jpeg"
            width={360}
            height={480}
            priority
            alt={locale === 'en' ? 'Ryan Zheng' : 'Ryan Zheng 的照片'}
            className="aspect-[3/4] w-64 rounded-lg object-cover shadow-2xl shadow-neutral-300 sm:w-80 lg:w-[360px]"
          />
          <p className="mt-4 text-sm leading-6 text-neutral-600">
            {content.name}
          </p>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-teal-700">
              {content.latestLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950">
              {content.blogHeading}
            </h2>
            <p className="mt-4 max-w-md leading-7 text-neutral-600">
              {content.blogSubheading}
            </p>
          </div>

          {latestPost && (
            <a
              href={`/${locale}/blog/${latestPost.slug}`}
              className="group block rounded-lg border border-neutral-200 bg-stone-50 p-6 transition hover:border-neutral-300 hover:bg-white"
            >
              <p className="text-sm text-neutral-500">{latestPost.date}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950 group-hover:text-blue-700">
                {latestPost.title[locale]}
              </h3>
              <p className="mt-3 leading-7 text-neutral-600">
                {latestPost.description[locale]}
              </p>
            </a>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-teal-700">
              {content.featuredProjectsLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950">
              {content.projectsHeading}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
              {content.projectsSubheading}
            </p>
          </div>
          <a
            href={`/${locale}/projects`}
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            {content.viewAllProjects}
          </a>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project) => (
            <li key={project.id}>
              <a
                href={
                  project.external
                    ? project.href
                    : `/${locale}${project.href}`
                }
                target={project.external ? '_blank' : undefined}
                rel={project.external ? 'noopener noreferrer' : undefined}
                className="group flex min-h-40 flex-col justify-between rounded-lg border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200"
              >
                <p className="text-lg font-semibold text-neutral-950 group-hover:text-blue-700">
                  {project.title[locale]}
                </p>
                <p className="mt-8 text-sm font-medium text-neutral-500">
                  {project.external ? 'External' : `/${locale}${project.href}`}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-neutral-950 px-5 py-12 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {content.linksHeading}
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              {locale === 'en'
                ? 'Find me around the web.'
                : '也可以在這些地方找到我。'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ href, label }) => {
              const displayLabel =
                typeof label === 'string' ? label : label[locale]

              return (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-white/35 hover:text-white"
                >
                  {displayLabel}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="bg-neutral-950 px-5 pb-8 text-center text-sm text-neutral-500 sm:px-8">
        {content.footer}
      </footer>
    </main>
  )
}
