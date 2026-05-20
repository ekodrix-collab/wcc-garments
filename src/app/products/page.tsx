'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductFilter } from '@/components/products/ProductFilter'
import { ProductGridSkeleton } from '@/components/products/ProductSkeleton'
import { DIVISIONS, MOCK_PRODUCTS } from '@/lib/constants'

export default function ProductsPage() {
  const [division, setDivision] = useState('')
  const [products, setProducts] = useState<typeof MOCK_PRODUCTS>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const div = params.get('division') || ''
    setDivision(div)
  }, [])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      let filtered = [...MOCK_PRODUCTS]
      if (division) {
        filtered = filtered.filter((p) => p.division_slug === division)
      }
      setProducts(filtered)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [division])

  const handleDivisionChange = (slug: string) => {
    setDivision(slug)
    const url = slug ? `/products?division=${slug}` : '/products'
    window.history.pushState({}, '', url)
  }

  const mapped = products.map((p) => ({
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

  const activeDivisionName = division
    ? DIVISIONS.find((item) => item.slug === division)?.name ?? 'Selected Division'
    : 'All Divisions'

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_38%),var(--bg-surface)] pt-28 pb-12 md:pt-32 md:pb-14">
        <div className="mx-auto max-w-[1560px] px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
            <Link href="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--text)]">Products</span>
          </nav>

          <motion.div
            className="mt-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold/90">Global Product Catalogue</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--text)] md:text-5xl lg:text-6xl">
              Precision-Made Products for Modern Enterprises
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
              Explore our complete portfolio across garments, uniforms, hospitality textiles, home furnishings, fragrance, and household categories built for large-scale global supply.
            </p>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="border border-[var(--border)] bg-[var(--bg)]/70 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--text)] backdrop-blur-sm">
              {products.length} Products
            </div>
            <div className="border border-[var(--border)] bg-[var(--bg)]/70 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] backdrop-blur-sm">
              {activeDivisionName}
            </div>
          </div>

          <div className="mt-8 overflow-x-auto border border-[var(--border)] bg-[var(--bg)]/65 p-3 backdrop-blur-sm">
            <ProductFilter activeDivision={division} onDivisionChange={handleDivisionChange} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1560px] px-6 py-12 lg:px-12 lg:py-14">
        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : (
          <ProductGrid products={mapped} />
        )}
      </div>
    </div>
  )
}
