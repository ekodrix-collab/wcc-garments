'use client'

import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Array<{
    id: string
    name: string
    slug: string
    images: string[]
    division?: { name: string; slug: string } | null
    category?: { name: string } | null
    moq: string | null
    is_new: boolean
    is_offer: boolean
    offer_label: string | null
    short_description?: string | null
  }>
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="font-display text-xl text-[var(--text-muted)]">No products found</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}
