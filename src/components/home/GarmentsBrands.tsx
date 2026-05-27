'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Layers } from 'lucide-react'
import { brandStore } from '@/lib/brand-store'
import { Brand } from '@/types'

export function VandegraffSVG() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="160" fill="#8B1A1A" />
      <path d="M190 40 C175 40 178 70 200 80 C222 70 225 40 210 40 C195 40 198 75 190 40 Z" fill="white" opacity="0.9" />
      <path d="M195 48 C185 48 188 68 200 75 C212 68 215 48 205 48 C195 48 198 72 195 48 Z" fill="#8B1A1A" />
      <path d="M178 45 C190 75 210 75 222 45 C205 45 200 68 178 45 Z" fill="white" opacity="0.9" />
      <text x="50%" y="115" textAnchor="middle" fill="white" fontFamily="Cinzel, Georgia, serif" fontSize="23" fontWeight="bold" letterSpacing="0.25em">
        VANDEGRAFF
      </text>
      <text x="50%" y="138" textAnchor="middle" fill="#EAD8D8" fontFamily="Montserrat, Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="0.32em">
        SHIRTS &amp; TROUSERS
      </text>
      <text x="345" y="103" fill="white" fontFamily="sans-serif" fontSize="6">R</text>
    </svg>
  )
}

export function TreasureSVG() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(45, 30)">
        <path d="M10 20 L20 35 L40 15 L60 35 L70 20 L65 48 L15 48 Z" fill="#8B1A1A" />
        <circle cx="10" cy="18" r="2.5" fill="#8B1A1A" />
        <circle cx="40" cy="13" r="2.5" fill="#8B1A1A" />
        <circle cx="70" cy="18" r="2.5" fill="#8B1A1A" />
        <path d="M10 54 C10 65 30 78 40 78 C50 78 70 65 70 54 C55 54 48 70 40 78 C32 70 25 54 10 54 Z" fill="black" className="dark:fill-white" />
        <path d="M10 70 C25 80 55 80 70 70 C55 82 25 82 10 70 Z" fill="black" className="dark:fill-white" />
        <path d="M22 62 C30 54 50 54 58 62 C50 58 30 58 22 62 Z" fill="black" className="dark:fill-white" />
        <line x1="40" y1="48" x2="40" y2="78" stroke="black" className="dark:stroke-white" strokeWidth="2.5" />
      </g>
      <text x="145" y="93" fill="black" className="dark:fill-white" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="bold" letterSpacing="0.4em">
        TREASURE
      </text>
    </svg>
  )
}

export function TomJackSVG() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="85" cy="80" r="35" stroke="#DAA520" strokeWidth="2.5" />
      <circle cx="85" cy="80" r="29" stroke="#DAA520" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M72 65 L98 65 M85 65 L85 92 C85 98 78 100 74 97" stroke="#DAA520" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M92 73 L92 90 C92 96 82 98 78 92" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <text x="145" y="85" fill="black" className="dark:fill-white" fontFamily="Inter, sans-serif" fontSize="23" fontWeight="bold" letterSpacing="0.32em">
        TOM &amp; JACK
      </text>
      <text x="145" y="105" fill="#DAA520" fontFamily="sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.25em">
        ACTIVE LUXURY APPAREL
      </text>
    </svg>
  )
}

const BRAND_SHOWCASE = [
  {
    id: 'treasure',
    title: 'Premium Corporate Excellence',
    segment: 'Premium Line',
    description: 'Egyptian cotton, refined finishing, and executive-grade construction for institutions that need polished uniform programs.',
    highlights: ['Banking Sector', 'Luxury Hotels'],
    stats: ['500 PCS MOQ', '320+ Styles'],
    href: '/products/garments/treasure',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80',
    borderClass: 'hover:border-gold/30',
    iconHoverClass: 'group-hover:border-gold group-hover:bg-gold group-hover:text-white',
    lineClass: 'bg-gold',
    highlightClass: 'text-gold',
    chipClass: 'border-gold/20 bg-gold/5 text-gold',
    logo: TreasureSVG,
  },
  {
    id: 'vandegraff',
    title: 'Smart Everyday Essentials',
    segment: 'Value Line',
    description: 'Competitive large-scale production with dependable fabrics and commercial styling for value-driven retail programs.',
    highlights: ['Retail Chains', 'Mass Market'],
    stats: ['1,500 PCS MOQ', '280+ Styles'],
    href: '/products/garments/vandegraff',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80',
    borderClass: 'hover:border-red-500/30',
    iconHoverClass: 'group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white',
    lineClass: 'bg-red-500',
    highlightClass: 'text-[var(--text)]',
    chipClass: 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)]',
    logo: VandegraffSVG,
  },
  {
    id: 'tom-jack',
    title: 'Contemporary Premium Casual',
    segment: 'Active Premium',
    description: 'Hybrid business-casual collections balancing comfort, movement, and sharp styling for modern teams and premium programs.',
    highlights: ['Tech Startups', 'Creative Agencies'],
    stats: ['750 PCS MOQ', '180+ Styles'],
    href: '/products/garments/tom-jack',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80',
    borderClass: 'hover:border-gold/30',
    iconHoverClass: 'group-hover:border-gold group-hover:bg-gold group-hover:text-white',
    lineClass: 'bg-gold',
    highlightClass: 'text-gold',
    chipClass: 'border-gold/20 bg-gold/5 text-gold',
    logo: TomJackSVG,
  },
  {
    id: 'wcc-global',
    title: 'Extended Group Catalog',
    segment: 'Group Catalog',
    description: 'Outerwear, technical layering, and complementary premium collections designed to round out larger sourcing briefs.',
    highlights: ['Technical Layering', 'Fast-Track Logistics'],
    stats: ['1,000 PCS MOQ', '410+ Styles'],
    href: '/products/garments',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80',
    borderClass: 'hover:border-gold/30',
    iconHoverClass: 'group-hover:border-gold group-hover:bg-gold group-hover:text-white',
    lineClass: 'bg-gold',
    highlightClass: 'text-gold',
    chipClass: 'border-gold/20 bg-gold/5 text-gold',
    logo: null,
  },
] as const

export function GarmentsBrands() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isContainerInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    setBrands(brandStore.getBrands())
  }, [])

  const customBrands = brands.filter(
    (brand) => brand.slug !== 'treasure' && brand.slug !== 'vandegraff' && brand.slug !== 'tom-jack'
  )

  return (
    <section className="bg-[var(--bg)] border-t border-[var(--border)] py-16 md:py-24" ref={containerRef}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                WCC FASHIONS DIRECTORY
              </span>
            </div>
          </motion.div>
          <motion.h2
            className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--text)]"
            initial={{ opacity: 0, y: 30 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            Our manufacturing <span className="text-gold">brands</span>
          </motion.h2>
          <motion.p
            className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-gray-500"
            initial={{ opacity: 0 }}
            animate={isContainerInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Two distinct philosophies and one shared commitment to quality, with brand identities structured for
            premium executive wear, value retail supply, and contemporary uniform programs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {BRAND_SHOWCASE.map((brand, index) => {
            const Logo = brand.logo

            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + index * 0.08,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <Link
                  href={brand.href}
                  className={`group relative block overflow-hidden rounded-none border border-[var(--border)] bg-[var(--bg-surface)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] ${brand.borderClass}`}
                  data-cursor="view"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-none">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url('${brand.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                      <span className={`inline-block border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${brand.chipClass}`}>
                        {brand.segment}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="max-w-[220px] border border-white/10 bg-black/70 p-3 backdrop-blur-md">
                        {Logo ? (
                          <div className="h-14">
                            <Logo />
                          </div>
                        ) : (
                          <div className="flex h-14 items-center gap-2 font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-white">
                            <Layers className="h-4 w-4 shrink-0 text-gold" />
                            <span>WCC GLOBAL</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[var(--bg-surface)] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-bold text-[var(--text)] transition-colors duration-300 group-hover:text-gold">
                          {brand.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                          {brand.description}
                        </p>
                      </div>
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-all duration-300 ${brand.iconHoverClass}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {brand.stats.map((stat) => (
                        <span
                          key={stat}
                          className="inline-block border border-gold/10 bg-gold/5 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-gold"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {brand.highlights.map((highlight) => (
                        <span key={highlight} className={`text-[11px] font-medium ${brand.highlightClass}`}>
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className={`mt-4 h-[2px] w-0 transition-all duration-500 group-hover:w-full ${brand.lineClass}`} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {customBrands.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isContainerInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-16 border-t border-[var(--border)] pt-8"
          >
            <span className="mb-4 block font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
              Dynamically synchronized portfolios
            </span>
            <div className="flex flex-wrap gap-4">
              {customBrands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/products/garments/${brand.slug}`}
                  className="border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text)] transition-colors hover:border-gold hover:text-gold"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-16"
        >
          <Link
            href="/products/garments"
            className="group inline-flex items-center gap-3 border border-[var(--border)] bg-[var(--bg-surface)] px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--text)] transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white"
          >
            <span>View Complete Garments Catalog</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
