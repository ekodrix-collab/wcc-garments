import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { DIVISIONS, MOCK_PRODUCTS, SITE_CONFIG } from '@/lib/constants'
import { ProductGrid } from '@/components/products/ProductGrid'

// ── Pre-build all 6 division pages at build time ──────────────────────────────
export function generateStaticParams() {
  return DIVISIONS.map((div) => ({ division: div.slug }))
}

// ── Per-division metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ division: string }>
}): Promise<Metadata> {
  const { division: divisionSlug } = await params
  const division = DIVISIONS.find((d) => d.slug === divisionSlug)
  if (!division) return {}

  return {
    title: division.metaTitle,
    description: division.metaDescription,
    keywords: division.keywords,
    openGraph: {
      title: division.metaTitle,
      description: division.metaDescription,
      type: 'website',
      url: `${SITE_CONFIG.url}/products/${division.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: division.metaTitle,
      description: division.metaDescription,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/products/${division.slug}`,
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function DivisionCategoryPage({
  params,
}: {
  params: Promise<{ division: string }>
}) {
  const { division: divisionSlug } = await params
  const division = DIVISIONS.find((d) => d.slug === divisionSlug)

  if (!division) notFound()

  const products = MOCK_PRODUCTS.filter((p) => p.division_slug === divisionSlug)
  const otherDivisions = DIVISIONS.filter((d) => d.slug !== divisionSlug)

  const mappedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    images: p.images,
    division: { name: p.division, slug: p.division_slug },
    category: { name: p.category },
    moq: p.moq,
    is_new: p.is_new,
    is_offer: p.is_offer,
    offer_label: p.offer_label,
    short_description: p.short_description,
  }))

  // ── JSON-LD Schemas ──────────────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.url || 'https://www.wccgarments.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${SITE_CONFIG.url || 'https://www.wccgarments.com'}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: division.name,
        item: `${SITE_CONFIG.url || 'https://www.wccgarments.com'}/products/${division.slug}`,
      },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${division.name} Products — WCC Garments`,
    description: division.metaDescription,
    url: `${SITE_CONFIG.url || 'https://www.wccgarments.com'}/products/${division.slug}`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      description: p.short_description,
      url: `${SITE_CONFIG.url || 'https://www.wccgarments.com'}/products/${division.slug}/${p.slug}`,
    })),
  }

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: division.metaTitle,
    description: division.metaDescription,
    url: `${SITE_CONFIG.url || 'https://www.wccgarments.com'}/products/${division.slug}`,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.fullName,
      url: SITE_CONFIG.url || 'https://www.wccgarments.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />

      <div className="min-h-screen bg-[var(--bg)]">
        {/* ── Category Hero ─────────────────────────────────────────────── */}
        <header className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.09),transparent_40%),var(--bg-surface)] pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-12">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]"
            >
              <Link href="/" className="transition-colors hover:text-gold">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/products" className="transition-colors hover:text-gold">
                Products
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-[var(--text)]">{division.name}</span>
            </nav>

            <div className="mt-8 max-w-4xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold/90">
                {division.icon} · {division.name} Division
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-[var(--text)] md:text-5xl lg:text-6xl">
                {division.heroHeading}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                {division.heroSubtitle}
              </p>
            </div>

            {/* Stats bar */}
            <div className="mt-10 flex flex-wrap gap-0 divide-x divide-[var(--border)] border border-[var(--border)] bg-[var(--bg)]/60 backdrop-blur-sm w-fit">
              <div className="px-5 py-3">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {division.stat1Label}
                </p>
                <p className="mt-0.5 text-base font-semibold text-[var(--text)]">
                  {division.stat1Value}
                </p>
              </div>
              <div className="px-5 py-3">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {division.stat2Label}
                </p>
                <p className="mt-0.5 text-base font-semibold text-[var(--text)]">
                  {division.stat2Value}
                </p>
              </div>
              <div className="px-5 py-3">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {division.stat3Label}
                </p>
                <p className="mt-0.5 text-base font-semibold text-[var(--text)]">
                  {division.stat3Value}
                </p>
              </div>
              <div className="px-5 py-3">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Products
                </p>
                <p className="mt-0.5 text-base font-semibold text-[var(--text)]">
                  {products.length} Listed
                </p>
              </div>
            </div>

            {/* Division tabs (cross-links) */}
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="border border-gold bg-gold/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                {division.name}
              </span>
              {otherDivisions.map((div) => (
                <Link
                  key={div.slug}
                  href={`/products/${div.slug}`}
                  className="border border-[var(--border)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)] transition-all duration-300 hover:border-gold/40 hover:text-[var(--text)]"
                >
                  {div.name}
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* ── Product Grid ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1560px] px-6 py-12 lg:px-12 lg:py-16">
          <ProductGrid
            products={mappedProducts}
            divisionSlug={divisionSlug}
          />
        </section>

        {/* ── SEO keyword-rich editorial section ───────────────────────── */}
        <section className="border-t border-[var(--border)] bg-[var(--bg-surface)]">
          <div className="mx-auto max-w-[1560px] px-6 py-12 lg:px-12 lg:py-16">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2 lg:col-span-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/80">
                  Why WCC Garments?
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-[var(--text)]">
                  Trusted {division.name} Supplier for B2B Buyers Worldwide
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {division.metaDescription}
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 border border-gold bg-gold px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-gold/90"
                >
                  Request a Quote
                </Link>
              </div>

              <div className="space-y-4 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: 'Custom Branding & Private Label',
                      desc: 'Woven labels, embroidery, heat transfer, custom packaging — all available for qualified bulk orders.',
                    },
                    {
                      title: 'Export-Grade Quality Control',
                      desc: 'Every shipment undergoes multi-stage inspection. AQL-standard batch testing on request.',
                    },
                    {
                      title: 'Fast Turnaround & Lead Times',
                      desc: `Standard lead time: ${division.stat2Value}. Rush orders discussed on production slot availability.`,
                    },
                    {
                      title: 'Global Shipping & Trade Terms',
                      desc: 'FOB Dubai, CIF destination, EXW available. We work with major freight forwarders worldwide.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="border border-[var(--border)] bg-[var(--bg)]/60 p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text)]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Other Divisions Cross-links ───────────────────────────────── */}
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-[1560px] px-6 py-10 lg:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Also Browse
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {otherDivisions.map((div) => (
                <Link
                  key={div.slug}
                  href={`/products/${div.slug}`}
                  className="group flex items-center gap-2 border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2.5 transition-all duration-300 hover:border-gold/40"
                >
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors group-hover:text-gold">
                    {div.icon}
                  </span>
                  <span className="text-xs font-medium text-[var(--text)]">{div.name}</span>
                  <ChevronRight className="h-3 w-3 text-[var(--text-muted)] transition-colors group-hover:text-gold" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
