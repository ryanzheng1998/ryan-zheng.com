import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
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
    <main className="editorial-site index-page">
      <SiteHeader locale={locale} path="/blog" />

      <section id="main-content" className="site-width index-content">
        <p className="eyebrow">
          {locale === 'en' ? 'The notebook' : '我的筆記'}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          {home[locale].blogHeading}
        </h1>
        <p className="index-intro">{home[locale].blogSubheading}</p>
        <ul className="mt-8 space-y-4">
          {localizedBlogPosts.map((post) => (
            <li key={post.slug} className="article-card">
              <a className="block" href={`/${locale}/blog/${post.slug}`}>
                <time className="article-meta" dateTime={post.date}>
                  {post.date}
                </time>
                <p className="text-lg font-semibold text-[#183e35]">
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
      <SiteFooter locale={locale} />
    </main>
  )
}
