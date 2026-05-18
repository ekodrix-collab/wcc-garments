'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductFilter } from '@/components/products/ProductFilter'
import { ProductGridSkeleton } from '@/components/products/ProductSkeleton'
import { MOCK_PRODUCTS } from '@/lib/constants'

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

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)] pt-32 pb-12">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
            <Link href="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--text)]">Products</span>
          </nav>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1 className="font-display text-display-md font-semibold text-[var(--text)]">
              Our Products
            </h1>
            <p className="mt-2 max-w-lg text-sm text-[var(--text-muted)]">
              Premium quality across all divisions — garments, uniforms, hospitality textiles, home furnishings, fragrance, and household products.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="mt-8 overflow-x-auto">
            <ProductFilter activeDivision={division} onDivisionChange={handleDivisionChange} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : (
          <ProductGrid products={mapped} />
        )}
      </div>
    </div>
  )
}
