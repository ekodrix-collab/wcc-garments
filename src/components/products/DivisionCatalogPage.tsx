import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, ArrowUpRight, ArrowRight } from 'lucide-react'

import { DIVISIONS, MOCK_PRODUCTS, SITE_CONFIG } from '@/lib/constants'
import { getProductHref, resolveDivisionCategorySlug, getDivisionCategoryHref } from '@/lib/category-routing'
import { DivisionProductsClient } from './DivisionProductsClient'

const DEFAULT_HOUSEHOLDS_CATEGORIES = [
  { name: 'Triply Cookware', slug: 'cookware', tagline: 'Professional triply cookware for healthier, faster and even cooking', count: '100+ MOQ', image: '/images/hh-1.png' },
  { name: 'Premium Cutlery', slug: 'cutlery', tagline: 'Elegant stainless steel cutlery for refined everyday dining', count: '250+ MOQ', image: '/images/hh-2.png' },
  { name: 'Table & Serveware', slug: 'table-top', tagline: 'Stylish serveware to elevate presentation for every meal', count: '100+ MOQ', image: '/images/hh-3.png' },
  { name: 'Storage & Organizer', slug: 'utility', tagline: 'Smart storage and organizers to keep your kitchen clutter-free', count: '200+ MOQ', image: '/images/hh-4.png' }
]

const DEFAULT_HOSPITALITY_CATEGORIES = [
  { name: 'Barware Products', slug: 'barware', tagline: 'Premium ice buckets, coolers & shaker tools', count: '100+ MOQ', image: '/images/hos-1.png' },
  { name: 'Cookware Products', slug: 'cookware', tagline: 'Professional triply stainless steel cook pots', count: '50+ MOQ', image: '/images/hos-2.png' },
  { name: 'Serving & Kitchen Tools', slug: 'serving-tools', tagline: 'High-end serving tongs and chef prep utensils', count: '200+ MOQ', image: '/images/hos-3.png' },
  { name: 'Table Cutlery', slug: 'cutlery', tagline: 'Mirror polished hotel-grade cutlery sets', count: '250+ MOQ', image: '/images/hos-4.png' },
  { name: 'Storage & Serving', slug: 'storage-serving', tagline: 'Wire buffet baskets and wood serving trays', count: '150+ MOQ', image: '/images/hos-5.png' }
]

interface DivisionCatalogPageProps {
  divisionSlug: string
  initialCategorySlug?: string | null
}

export function DivisionCatalogPage({
  divisionSlug,
  initialCategorySlug,
}: DivisionCatalogPageProps) {
  const division = DIVISIONS.find((item) => item.slug === divisionSlug)

  if (!division) {
    notFound()
  }

  const isHouseholdsDivision = divisionSlug === 'households'

  const resolvedInitialCategorySlug = resolveDivisionCategorySlug(
    divisionSlug,
    initialCategorySlug
  )
  const showCategoryShowcase = !resolvedInitialCategorySlug && (divisionSlug === 'households' || divisionSlug === 'hospitality')
  const products = MOCK_PRODUCTS.filter((product) => product.division_slug === divisionSlug)
  const otherDivisions = DIVISIONS.filter((item) => item.slug !== divisionSlug)

  const mappedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    images: product.images,
    division: { name: product.division, slug: product.division_slug },
    category: {
      name: product.category,
      slug: resolveDivisionCategorySlug(divisionSlug, product.category) ?? undefined,
    },
    moq: product.moq,
    is_new: product.is_new,
    is_offer: product.is_offer,
    offer_label: product.offer_label,
    short_description: product.short_description,
    brand_slug: product.brand_slug ?? null,
  }))

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
    name: `${division.name} Products - WCC Garments`,
    description: division.metaDescription,
    url: `${SITE_CONFIG.url || 'https://www.wccgarments.com'}/products/${division.slug}`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.name,
      description: product.short_description,
      url: `${SITE_CONFIG.url || 'https://www.wccgarments.com'}${getProductHref(division.slug, product.slug)}`,
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
        <header className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.09),transparent_40%),var(--bg-surface)] pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-12">
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

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="border border-gold bg-gold/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                {division.name}
              </span>
              {otherDivisions.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="border border-[var(--border)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)] transition-all duration-300 hover:border-gold/40 hover:text-[var(--text)]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[1560px] px-6 py-12 lg:px-12 lg:py-16">
          {showCategoryShowcase ? (
            <div className="space-y-12">
              <div className="border-b border-[var(--border)] pb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-[var(--text)]">
                  Select a Product Category
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Choose a category to browse our full product catalog and specifications.
                </p>
              </div>

              {divisionSlug === 'households' ? (
                // 2x2 Architectural Grid for Households
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  {DEFAULT_HOUSEHOLDS_CATEGORIES.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/products/households/${category.slug}`}
                      className="group relative block overflow-hidden bg-[var(--bg-surface)] border border-[var(--border)] rounded-none transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
                    >
                      <div className="relative overflow-hidden aspect-[16/9] rounded-none">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 55vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-85" />
                      </div>

                      <div className="p-5 bg-[var(--bg-surface)]">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-display text-lg font-bold text-[var(--text)] group-hover:text-gold transition-colors duration-300">
                              {category.name}
                            </h3>
                            <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">
                              {category.tagline}
                            </p>
                            <span className="mt-2.5 inline-block font-mono text-[9px] font-bold text-gold uppercase tracking-wider bg-gold/5 border border-gold/10 px-2 py-0.5 rounded-full">
                              {category.count}
                            </span>
                          </div>
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-gold group-hover:bg-gold">
                            <span className="relative flex h-4 w-4 items-center justify-center">
                              <ArrowUpRight className="absolute h-4 w-4 text-[var(--text-muted)] transition-all duration-500 ease-in-out opacity-100 scale-100 translate-x-0 group-hover:opacity-0 group-hover:scale-75 group-hover:translate-x-2" />
                              <ArrowRight className="absolute h-4 w-4 text-white opacity-0 scale-75 -translate-x-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0" />
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                // 5-Column High-End Grid for Hospitality
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {DEFAULT_HOSPITALITY_CATEGORIES.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/products/hospitality/${category.slug}`}
                      className="group relative block overflow-hidden bg-[var(--bg-surface)] border border-[var(--border)] rounded-none transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
                    >
                      <div className="relative overflow-hidden aspect-[3/4] rounded-none">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute inset-3 border border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
                      </div>

                      <div className="p-5 bg-[var(--bg-surface)]">
                        <div className="flex flex-col justify-between h-full min-h-[96px]">
                          <div>
                            <h3 className="font-display text-sm font-bold text-[var(--text)] group-hover:text-gold transition-colors duration-300 uppercase tracking-wider">
                              {category.name}
                            </h3>
                            <p className="mt-1 text-[10px] text-[var(--text-muted)] leading-relaxed line-clamp-2">
                              {category.tagline}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
                            <span className="font-mono text-[9px] font-bold text-gold uppercase tracking-wider bg-gold/5 border border-gold/10 px-2 py-0.5 rounded-full">
                              {category.count}
                            </span>
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-gold group-hover:bg-gold">
                              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                                <ArrowUpRight className="absolute h-3.5 w-3.5 text-[var(--text-muted)] transition-all duration-500 ease-in-out opacity-100 scale-100 translate-x-0 group-hover:opacity-0 group-hover:scale-75 group-hover:translate-x-2" />
                                <ArrowRight className="absolute h-3.5 w-3.5 text-white opacity-0 scale-75 -translate-x-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <DivisionProductsClient
              products={mappedProducts}
              categories={division.categories}
              divisionSlug={divisionSlug}
              divisionName={division.name}
              initialCategorySlug={resolvedInitialCategorySlug ?? undefined}
            />
          )}
        </section>

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
                  className={`mt-5 inline-flex items-center gap-2 border border-gold bg-gold px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-gold/90 ${
                    isHouseholdsDivision ? 'text-white' : 'text-black'
                  }`}
                >
                  Request a Quote
                </Link>
              </div>

              <div className="space-y-4 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: 'Custom Branding & Private Label',
                      desc: 'Woven labels, embroidery, heat transfer, custom packaging - all available for qualified bulk orders.',
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

        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-[1560px] px-6 py-10 lg:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Also Browse
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {otherDivisions.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="group flex items-center gap-2 border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2.5 transition-all duration-300 hover:border-gold/40"
                >
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors group-hover:text-gold">
                    {item.icon}
                  </span>
                  <span className="text-xs font-medium text-[var(--text)]">{item.name}</span>
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
