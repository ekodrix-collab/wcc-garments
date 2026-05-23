'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const GARMENT_CATEGORIES = [
  { name: 'Formal Shirts', slug: 'formal-shirts', tagline: 'Crisp, premium tailored fits', count: '140+ Styles', image: '/images/formal-shirts.png' },
  { name: 'Blazers & Suits', slug: 'blazers-suits', tagline: 'Executive bespoke tailoring', count: '80+ Styles', image: '/images/Blazers and suits.png' },
  { name: 'Jeans & Denims', slug: 'jeans-denims', tagline: 'Durable premium industrial denim', count: '210+ Styles', image: '/images/jeans-denims.png' },
  { name: 'Polo & T-Shirts', slug: 'polo-tshirts', tagline: 'High-comfort mercerized cotton', count: '320+ Styles', image: '/images/polo tshirts.png' },
  { name: 'Trousers & Chinos', slug: 'trousers', tagline: 'Perfect fit corporate trousers', count: '110+ Styles', image: '/images/trousers.png' },
  { name: 'Outerwear & Jackets', slug: 'jackets', tagline: 'All-weather luxury protective outerwear', count: '95+ Styles', image: '/images/jackets.png' },
]

export function DivisionCutouts() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-[var(--bg)] py-16 md:py-24" ref={ref}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                OUR MANUFACTURING DIVISIONS
              </span>
            </div>
          </motion.div>
          <motion.h2
            className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--text)]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            Garments we <span className='text-gold'>manufacture</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-sm sm:text-base leading-relaxed text-gray-500 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            High-quality garments, linens, and B2B supplies crafted with precision. While garments remain our absolute core business, we have successfully expanded our industrial capacities to serve major developments in hospitality, home decor, fragrance, and household supply.
          </motion.p>
        </div>

        {/* Division Grid - 3x2 Symmetrical */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {GARMENT_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 + index * 0.08,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <Link
                href={`/products?category=${category.slug}`}
                className="group relative block overflow-hidden bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
                data-cursor="view"
              >
                {/* Image aspect-[3/4] */}
                <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[3/4]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Subtle lighting mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-85" />
                </div>

                {/* Info Bottom */}
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
                      <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] transition-colors group-hover:text-white" />
                    </div>
                  </div>
                  {/* Gold accent line */}
                  <div className="mt-4 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
