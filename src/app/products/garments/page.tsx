'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Award, Flame, Star, Layers, ShieldCheck, Factory } from 'lucide-react'
import { brandStore } from '@/lib/brand-store'
import { DIVISIONS, SITE_CONFIG } from '@/lib/constants'
import { ProductCard } from '@/components/products/ProductCard'
import { Brand, Product } from '@/types'

export default function GarmentsHubPage() {
  const [activeSegment, setActiveSegment] = useState<'core' | 'incentives'>('core')
  const [brands, setBrands] = useState<Brand[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Dynamically retrieve brands and products from catalog store
    setBrands(brandStore.getBrands())
    
    // Filter garments products
    const allProducts = brandStore.getProducts()
    const garmentsOnly = allProducts.filter(p => p.division_id === 'Garments' || p.division?.slug === 'garments')
    setProducts(garmentsOnly)
  }, [])

  const division = DIVISIONS.find((d) => d.slug === 'garments') || {
    name: 'Garments',
    icon: 'DIV-01',
    heroHeading: 'Premium Garments. Precision-Built for Global Wholesale.',
    heroSubtitle: 'From cotton formal shirts to velvet blazers — crafted for large-scale B2B buyers across 50+ countries.',
    stat1Label: 'MOQ From', stat1Value: '50 Units',
    stat2Label: 'Lead Time', stat2Value: '12–25 Days',
    stat3Label: 'Export QC', stat3Value: 'Grade A',
  }

  // Filter products by active segment (Core Line = standard products, Value Incentives = offers/volume deals)
  const filteredProducts = products.filter(p => {
    if (activeSegment === 'core') return !p.is_offer
    return p.is_offer
  })

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24">
      {/* ── Category Hero ── */}
      <header className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.09),transparent_40%),var(--bg-surface)] pt-8 pb-12 md:pt-16 md:pb-16">
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
            <span className="text-[var(--text)]">Garments</span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold/90">
              {division.icon} · {division.name} Division
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-[var(--text)] md:text-5xl lg:text-6xl uppercase">
              {division.heroHeading}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base font-light">
              {division.heroSubtitle}
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex flex-wrap gap-0 divide-x divide-[var(--border)] border border-[var(--border)] bg-[var(--bg)]/60 backdrop-blur-sm w-fit shadow-md">
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
                Active Catalog
              </p>
              <p className="mt-0.5 text-base font-semibold text-[var(--text)]">
                {products.length} Listed
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── B2B Segment Toggle Tabs ── */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-surface)] py-6 sticky top-[72px] z-40 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-[1560px] px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-black/5 dark:bg-white/5 border border-[var(--border)] max-w-md w-full sm:w-auto">
            <button
              onClick={() => setActiveSegment('core')}
              className={`flex-1 sm:flex-initial px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeSegment === 'core'
                  ? 'bg-gold text-black shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Core Portfolio
            </button>
            <button
              onClick={() => setActiveSegment('incentives')}
              className={`flex-1 sm:flex-initial px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeSegment === 'incentives'
                  ? 'bg-gold text-black shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Value Incentives
            </button>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] hidden md:block">
            ACTIVE LEVEL: <strong className="text-gold font-bold">{activeSegment === 'core' ? 'STANDARD EXPORT TARIFF' : 'VOLUME AGREEMENT TARIFF'}</strong>
          </div>
        </div>
      </section>

      {/* ── Brand Carousel / Bento links under selected segment ── */}
      <section className="mx-auto max-w-[1560px] px-6 py-12 lg:px-12">
        <div className="mb-8 border-b border-[var(--border)] pb-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            SELECT BY BRAND LABEL
          </span>
          <h3 className="font-display text-xl font-bold uppercase text-[var(--text)] mt-1">
            Browse Registered Brands under {activeSegment === 'core' ? 'Core Portfolio' : 'Value Incentives'}
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, idx) => (
            <Link
              key={brand.id}
              href={`/products/garments/${activeSegment}/${brand.slug}`}
              className="group relative block overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] p-6 hover:border-gold/30 hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute top-0 right-0 h-16 w-16 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Factory className="h-full w-full text-[var(--text)]" />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center font-mono text-[10px] text-gold font-bold">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h4 className="font-display text-lg font-bold tracking-wider text-[var(--text)] uppercase group-hover:text-gold transition-colors">
                  {brand.name}
                </h4>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)] font-light line-clamp-2">
                {brand.description}
              </p>

              <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between text-[10px] font-mono text-gold uppercase tracking-wider font-semibold">
                <span>View Brand Catalog</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Segment Products Grid ── */}
      <section className="mx-auto max-w-[1560px] px-6 py-8 lg:px-12 lg:py-12 border-t border-[var(--border)] bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="mb-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            WHOLESALE STOCKPILE INDEX
          </span>
          <h2 className="mt-1 font-display text-2xl font-semibold uppercase text-[var(--text)] md:text-3xl">
            {activeSegment === 'core' ? 'Core Corporate Collections' : 'Strategic Volume Packages'}
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="border border-[var(--border)] bg-[var(--bg-surface)] px-6 py-20 text-center">
            <p className="font-display text-2xl text-[var(--text)]">No active listings</p>
            <p className="mt-3 text-sm text-[var(--text-muted)]">Register garments products in the Admin panel to activate this segment.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((p, i) => (
              <ProductCard
                key={p.id}
                product={{
                  ...p,
                  division: { name: p.division?.name || 'Garments', slug: p.division?.slug || 'garments' },
                  category: p.category || { name: p.category_id || 'Formal Shirts' }
                }}
                index={i}
                divisionSlug="garments"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
