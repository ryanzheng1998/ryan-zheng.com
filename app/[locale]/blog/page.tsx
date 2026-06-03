import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { isLocale, type Locale } from '@/content/locales'
import { blogPosts, home } from '@/content/site'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function BlogIndex({ params }: Props) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const localizedBlogPosts = blogPosts.filter((post) =>
    post.locales.includes(locale),
  )

  return (
    <main className="min-h-screen bg-white px-6 py-16 font-sans text-neutral-800">
      <nav className="mx-auto mb-12 flex max-w-3xl items-center justify-between">
        <a href={`/${locale}`} className="text-sm font-medium text-blue-600">
          Ryan Zheng
        </a>
        <LanguageSwitcher locale={locale} path="/blog" />
      </nav>

      <section className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">
          {home[locale].blogHeading}
        </h1>
        <ul className="mt-8 space-y-4">
          {localizedBlogPosts.map((post) => (
            <li
              key={post.slug}
              className="rounded-2xl bg-gray-50 p-5 shadow-md transition hover:bg-white hover:shadow-xl"
            >
              <a href={`/${locale}/blog/${post.slug}`}>
                <p className="text-lg font-semibold text-blue-700">
                  {post.title[locale]}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {post.description[locale]}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
