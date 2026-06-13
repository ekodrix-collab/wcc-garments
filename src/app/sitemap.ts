import { MetadataRoute } from 'next'
import { DIVISIONS } from '@/lib/constants'

const BASE_URL = 'https://wccfashions.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    // ── Core pages ──────────────────────────────────────────────────────────
    { url: BASE_URL,                         lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/products`,           lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/about`,              lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/new-arrivals`,       lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    // Garments hub has its own slug
    { url: `${BASE_URL}/products/garments`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
  ]

  // ── Division + Category + Sub-category pages ─────────────────────────────
  for (const division of DIVISIONS) {
    // Division page
    routes.push({
      url: `${BASE_URL}/products/${division.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: division.status === 'flagship' ? 0.9 : 0.8,
    })

    for (const category of division.categories) {
      if (category.status !== 'active') continue

      // Category page
      routes.push({
        url: `${BASE_URL}/products/${division.slug}/${category.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      })

      // Sub-category pages (if any)
      const subs = (category as { subCategories?: Array<{ slug: string; status: string }> }).subCategories ?? []
      for (const sub of subs) {
        if (sub.status !== 'active') continue
        routes.push({
          url: `${BASE_URL}/products/${division.slug}/${category.slug}/${sub.slug}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      }
    }
  }

  return routes
}
