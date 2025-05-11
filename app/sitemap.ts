import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ryan-zheng.com'
  const lang = 'en'

  const staticRoutes = ['', '/projects', '/blog']
  const blogSlugs = ['life-changing-books']

  return []
}
