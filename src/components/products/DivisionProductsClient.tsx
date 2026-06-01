'use client'

import { startTransition, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard } from './ProductCard'
import {
  categoryMatchesSelection,
  getDivisionCategoryHref,
  resolveDivisionCategorySlug,
} from '@/lib/category-routing'

interface Category {
  id: string
  name: string
  slug: string
  status: 'active' | 'coming-soon'
  displayOrder: number
  subCategories?: any[]
}

interface DivisionProductsClientProps {
  products: Array<{
    id: string
    name: string
    slug: string
    images: string[]
    division?: { name: string; slug: string } | null
    category?: { name: string; slug?: string } | null
    moq: string | null
    is_new: boolean
    is_offer: boolean
    offer_label: string | null
    short_description?: string | null
  }>
  categories: Category[]
  divisionSlug: string
  divisionName: string
  initialCategorySlug?: string
}

export function DivisionProductsClient({
  products,
  categories,
  divisionSlug,
  divisionName,
  initialCategorySlug,
}: DivisionProductsClientProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>(
    resolveDivisionCategorySlug(divisionSlug, initialCategorySlug) ?? 'all'
  )
  const filterBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedCategory(resolveDivisionCategorySlug(divisionSlug, initialCategorySlug) ?? 'all')
  }, [divisionSlug, initialCategorySlug])

  // Sort categories by displayOrder
  const sortedCategories = [...categories].sort((a, b) => a.displayOrder - b.displayOrder)

  // Filter products based on selected category
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true
    
    const productCatName = product.category?.name || ''
    const productCatSlug = product.category?.slug || null
    const targetCat = categories.find((c) => c.slug === selectedCategory)
    if (!targetCat) return true

    return categoryMatchesSelection({
      divisionSlug,
      productCategoryName: productCatName,
      productCategorySlug: productCatSlug,
      selectedCategory,
      targetCategoryName: targetCat.name,
    })
  })

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug)
    startTransition(() => {
      router.replace(getDivisionCategoryHref(divisionSlug, slug))
    })

    // Scroll to the catalog grid smoothly
    setTimeout(() => {
      filterBarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="w-full">
      {/* ── STICKY CATEGORY FILTER BAR ─────────────────────────────── */}
      <div 
        ref={filterBarRef} 
        className="sticky top-[72px] z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] -mx-6 px-6 lg:-mx-12 lg:px-12 scroll-mt-24"
      >
        <div className="mx-auto max-w-[1560px]">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide py-1">
            {/* ALL tab */}
            <button
              onClick={() => handleCategoryChange('all')}
              className={`relative shrink-0 px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border-b-2 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'border-gold text-gold font-extrabold'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              All Categories
            </button>

            {/* Category tabs */}
            {sortedCategories.map((cat) => {
              const isActive = selectedCategory === cat.slug
              const isDisabled = cat.status === 'coming-soon'
              return (
                <button
                  key={cat.slug}
                  onClick={() => !isDisabled && handleCategoryChange(cat.slug)}
                  disabled={isDisabled}
                  className={`relative shrink-0 flex items-center gap-2 px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border-b-2 ${
                    isActive
                      ? 'border-gold text-gold font-extrabold cursor-pointer'
                      : isDisabled
                      ? 'border-transparent text-[var(--text-muted)]/30 cursor-not-allowed'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer'
                  }`}
                >
                  {cat.name}
                  {isDisabled && (
                    <span className="ml-1 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider bg-[var(--border)] text-[var(--text-muted)]/60 rounded-[2px]">
                      SOON
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── CATALOG HEADING ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] pt-12">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
              {divisionName.toUpperCase()} CATALOG
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-[var(--text)]">
              Browse by <span className="text-gold">Category</span>
            </h2>
          </div>
          <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
            {categories.filter((c) => c.status === 'active').length} active · {categories.filter((c) => c.status === 'coming-soon').length} coming soon
          </p>
        </div>
      </section>

      {/* ── PRODUCT GRID ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] pb-12 lg:pb-16">
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="border border-[var(--border)] bg-[var(--bg-surface)] px-6 py-20 text-center"
            >
              <p className="font-display text-2xl text-[var(--text)]">No products listed in this category yet</p>
              <p className="mt-3 text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                We manufacture bespoke and custom-designed collections for B2B wholesale orders. Contact our Dubai team to request custom manufacturing options.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-8"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  divisionSlug={divisionSlug || product.division?.slug}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
