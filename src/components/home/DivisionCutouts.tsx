'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { MOCK_IMAGES } from '@/lib/constants'

const DIVISION_CARDS = [
  { name: 'Garments', slug: 'garments', tagline: 'Precision in Every Stitch', categories: 8, image: MOCK_IMAGES.garments },
  { name: 'Uniforms & Workwear', slug: 'uniforms', tagline: 'Outfitting Industries', categories: 6, image: MOCK_IMAGES.uniforms },
  { name: 'Hospitality', slug: 'hospitality', tagline: 'Where Service Meets Luxury', categories: 10, image: MOCK_IMAGES.hospitality },
  { name: 'Home Furnishings', slug: 'home', tagline: 'Textile Excellence', categories: 7, image: MOCK_IMAGES.home },
  { name: 'Fragrance', slug: 'fragrance', tagline: 'Art of Scent', categories: 4, image: MOCK_IMAGES.fragrance },
  { name: 'Households', slug: 'households', tagline: 'Quality at Scale', categories: 5, image: MOCK_IMAGES.households },
]

export function DivisionCutouts() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-[var(--bg)] " ref={ref}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                Our Divisions
              </span>
            </div>
          </motion.div>
          <motion.h2
            className="mt-4 font-display text-display-md font-semibold text-[var(--text)] uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            What We <span className='text-blue-500'>Make</span>
          </motion.h2>
        </div>

        {/* Division Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIVISION_CARDS.map((division, index) => (
            <motion.div
              key={division.slug}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 + index * 0.1,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <Link
                href={`/products?division=${division.slug}`}
                className="group relative block overflow-hidden bg-[var(--bg-surface)]"
                data-cursor="view"
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden aspect-[3/4]"
                >
                  <Image
                    src={division.image}
                    alt={division.name}
                    fill
                    className="object-cover border transition-transform duration-700 ease-premium group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
                </div>

                {/* Info Bottom */}
                <div className="border-t border-[var(--border)] p-5 transition-all duration-500 group-hover:border-gold/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[var(--text)]">
                        {division.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        {division.categories} Categories
                      </p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-gold group-hover:bg-gold">
                      <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-muted)] transition-colors group-hover:text-white" />
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
