'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { MOCK_IMAGES } from '@/lib/constants'

const DIVISION_IMAGES: Record<string, string> = {
  garments: MOCK_IMAGES.garments,
  uniforms: MOCK_IMAGES.uniforms,
  hospitality: MOCK_IMAGES.hospitality,
  home: MOCK_IMAGES.home,
  fragrance: MOCK_IMAGES.fragrance,
  households: MOCK_IMAGES.households,
}

interface DivisionCardProps {
  division: {
    name: string
    slug: string
    icon: string
    description: string
    heroHeading: string
    stat1Label: string
    stat1Value: string
    stat2Label: string
    stat2Value: string
    stat3Label: string
    stat3Value: string
  }
  productCount: number
  index: number
  /** large = full-width spanning card, small = standard card */
  variant?: 'large' | 'small'
}

export function DivisionCard({ division, productCount, index, variant = 'small' }: DivisionCardProps) {
  const image = DIVISION_IMAGES[division.slug] || MOCK_IMAGES.textiles

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link
        href={`/products/${division.slug}`}
        className="relative flex flex-col overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] transition-all duration-500 hover:border-gold/40"
        aria-label={`Browse ${division.name} products`}
      >
        {/* Image */}
        <div
          className={`relative w-full overflow-hidden ${variant === 'large' ? 'aspect-[16/7]' : 'aspect-[4/3]'}`}
        >
          <Image
            src={image}
            alt={`${division.name} products — WCC Garments`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes={variant === 'large' ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Division code top-left */}
          <span className="absolute left-4 top-4 border border-white/20 bg-black/40 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
            {division.icon}
          </span>

          {/* Arrow top-right */}
          <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-white/20 bg-black/40 text-white/70 backdrop-blur-sm transition-all duration-300 group-hover:border-gold/60 group-hover:bg-gold/10 group-hover:text-gold">
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </span>

          {/* Heading overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/90">
              {division.name}
            </p>
            <h2 className={`mt-1.5 font-display font-semibold leading-snug text-white ${variant === 'large' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
              {division.heroHeading}
            </h2>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="grid grid-cols-3 divide-x divide-[var(--border)] border-t border-[var(--border)]">
          <div className="px-4 py-3">
            <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {division.stat1Label}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-[var(--text)]">{division.stat1Value}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {division.stat2Label}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-[var(--text)]">{division.stat2Value}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Products
            </p>
            <p className="mt-0.5 text-xs font-semibold text-[var(--text)]">{productCount} Listed</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
