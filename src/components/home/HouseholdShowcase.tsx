'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { useState, useEffect } from 'react'
import { contentStore } from '@/lib/content-store'

const DEFAULT_HOUSEHOLDS = {
  indicator: "HIGH-DEMAND HOUSEHOLD MANUFACTURING",
  headingStart: "Household items we ",
  headingHighlight: "manufacture",
  description: "Professional bulk household supplies, commercial microfibers, and custom OEM institutional items. Engineered to meet strict industrial sanitization and commercial durability standards for global export.",
  categories: [
    { name: 'Industrial Microfiber', slug: 'microfiber', tagline: 'High-density commercial cleaning wipes', count: '1,000+ MOQ', image: '/images/hh-1.png' },
    { name: 'Bulk Liquids & Sanitizers', slug: 'liquids', tagline: 'Premium wholesale chemical formulations', count: '500L+ MOQ', image: '/images/hh-2.png' },
    { name: 'Institutional Linens', slug: 'kitchen-linens', tagline: 'Heavy-duty commercial sheets & napery', count: '250+ MOQ', image: '/images/hh-3.png' },
    { name: 'OEM Custom Essentials', slug: 'oem-essentials', tagline: 'Bespoke household product branding options', count: '10k+ MOQ', image: '/images/hh-4.png' }
  ]
}

export function HouseholdShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [data, setData] = useState(DEFAULT_HOUSEHOLDS)

  useEffect(() => {
    setData(contentStore.getSectionData('households-showcase', DEFAULT_HOUSEHOLDS))
  }, [])

  return (
    <section className="bg-[var(--bg)] py-16 md:py-24 border-t border-[var(--border)]" ref={ref}>
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
                {data.indicator}
              </span>
            </div>
          </motion.div>
          <motion.h2
            className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--text)]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            {data.headingStart}<span className="text-gold">{data.headingHighlight}</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-sm sm:text-base leading-relaxed text-gray-500 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {data.description}
          </motion.p>
        </div>

        {/* 2x2 Architectural Grid (2 top, 2 bottom) with rounded-none (no border radius) */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {data.categories.map((category: any, index: number) => (
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
                className="group relative block overflow-hidden bg-[var(--bg-surface)] border border-[var(--border)] rounded-none transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
                data-cursor="view"
              >
                {/* 16:9 Cinematic Aspect, No border radius (rounded-none) */}
                <div className="relative overflow-hidden aspect-[16/9] rounded-none">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-85" />
                </div>

                {/* Card Details Bottom */}
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
                  {/* Gold hover sweep line */}
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
