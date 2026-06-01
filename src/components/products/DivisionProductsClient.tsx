'use client'

import { startTransition, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers } from 'lucide-react'

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

  const sortedCategories = [...categories].sort((a, b) => a.displayOrder - b.displayOrder)
  const activeCount = categories.filter((category) => category.status === 'active').length
  const comingSoonCount = categories.filter((category) => category.status === 'coming-soon').length

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true

    const productCatName = product.category?.name || ''
    const productCatSlug = product.category?.slug || null
    const targetCat = categories.find((category) => category.slug === selectedCategory)
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

    setTimeout(() => {
      filterBarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const renderAllProductsButton = (className = '') => (
    <Link
      href={`/products/${divisionSlug}`}
      className={`group relative inline-flex items-center gap-2 overflow-hidden bg-[var(--text)] px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--bg)] transition-all hover:bg-gold hover:text-black shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] ${className}`}
    >
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
        <div className="w-8 bg-white/20" />
      </div>
      <Layers className="h-3.5 w-3.5" />
      <span>All Products</span>
    </Link>
  )

  return (
    <div className="w-full">
      <section className="mx-auto max-w-[1560px] pt-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
              {divisionName.toUpperCase()} CATALOG
            </span>
            <div className="flex items-end justify-between gap-4 sm:block">
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[var(--text)]">
                Browse by <span className="text-gold">Category</span>
              </h2>
              <div className="shrink-0 sm:hidden">
                {renderAllProductsButton()}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              <span className="border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-1.5">
                {activeCount} Active
              </span>
              <span className="border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-1.5">
                {comingSoonCount} Coming Soon
              </span>
            </div>
          </div>

          <div
            ref={filterBarRef}
            className="sticky top-[84px] z-40 overflow-hidden border border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center gap-4 px-2 py-1">
              <div className="min-w-0 flex-1 overflow-x-auto scrollbar-hide">
                <div className="flex w-max min-w-full items-center gap-0">
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

                  {sortedCategories.map((category) => {
                    const isActive = selectedCategory === category.slug
                    const isDisabled = category.status === 'coming-soon'
                    return (
                      <button
                        key={category.slug}
                        onClick={() => !isDisabled && handleCategoryChange(category.slug)}
                        disabled={isDisabled}
                        className={`relative shrink-0 flex items-center gap-2 px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border-b-2 ${
                          isActive
                            ? 'border-gold text-gold font-extrabold cursor-pointer'
                            : isDisabled
                            ? 'border-transparent text-[var(--text-muted)]/30 cursor-not-allowed'
                            : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer'
                        }`}
                      >
                        {category.name}
                        {isDisabled && (
                          <span className="ml-1 rounded-[2px] bg-[var(--border)] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-[var(--text-muted)]/60">
                            Soon
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:items-center sm:pl-4 sm:border-l sm:border-[var(--border)]">
                {renderAllProductsButton()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1560px] pb-12 pt-10 lg:pb-16">
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
              <p className="mt-3 max-w-md mx-auto text-sm leading-relaxed text-[var(--text-muted)]">
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
