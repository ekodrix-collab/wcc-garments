'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface ProductCardProps {
  product: {
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
  }
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group relative block overflow-hidden bg-[var(--bg-surface)]"
        data-cursor="view"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.is_new && (
              <span className="bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-black">
                New
              </span>
            )}
            {product.is_offer && (
              <span className="bg-red-500 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                {product.offer_label || 'Offer'}
              </span>
            )}
          </div>

          {/* Hover overlay + Enquire */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 to-transparent p-4 transition-transform duration-500 ease-premium group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1.5 border border-gold px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
              Enquire <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="border-t border-[var(--border)] p-4 transition-colors duration-300 group-hover:border-gold/20">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
            {product.division?.name || 'WCC'}
          </p>
          <h3 className="mt-1 text-sm font-semibold text-[var(--text)]">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
            {product.category?.name || ''}
          </p>
          {product.moq && (
            <p className="mt-2 text-[10px] text-[var(--text-muted)]">Min: {product.moq}</p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
