'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Award, ArrowRight } from 'lucide-react'
import { brandStore } from '@/lib/brand-store'
import { Brand } from '@/types'

// ── Crisp Premium Inline SVG Logos ──
function VandegraffSVG() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="160" fill="#8B1A1A" />
      {/* Curved V Swooshes */}
      <path d="M190 40 C175 40 178 70 200 80 C222 70 225 40 210 40 C195 40 198 75 190 40 Z" fill="white" opacity="0.9" />
      <path d="M195 48 C185 48 188 68 200 75 C212 68 215 48 205 48 C195 48 198 72 195 48 Z" fill="#8B1A1A" />
      <path d="M178 45 C190 75 210 75 222 45 C205 45 200 68 178 45 Z" fill="white" opacity="0.9" />
      {/* VANDEGRAFF Text */}
      <text x="50%" y="115" textAnchor="middle" fill="white" fontFamily="Cinzel, Georgia, serif" fontSize="23" fontWeight="bold" letterSpacing="0.25em">
        VANDEGRAFF
      </text>
      {/* SHIRTS & TROUSERS */}
      <text x="50%" y="138" textAnchor="middle" fill="#EAD8D8" fontFamily="Montserrat, Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="0.32em">
        SHIRTS & TROUSERS
      </text>
      {/* Registered sign */}
      <text x="345" y="103" fill="white" fontFamily="sans-serif" fontSize="6">®</text>
    </svg>
  )
}

function TreasureSVG() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circular Gate Crown Emblem Left */}
      <g transform="translate(45, 30)">
        {/* Crown top */}
        <path d="M10 20 L20 35 L40 15 L60 35 L70 20 L65 48 L15 48 Z" fill="#8B1A1A" />
        <circle cx="10" cy="18" r="2.5" fill="#8B1A1A" />
        <circle cx="40" cy="13" r="2.5" fill="#8B1A1A" />
        <circle cx="70" cy="18" r="2.5" fill="#8B1A1A" />
        {/* Curved Gate base */}
        <path d="M10 54 C10 65 30 78 40 78 C50 78 70 65 70 54 C55 54 48 70 40 78 C32 70 25 54 10 54 Z" fill="black" className="dark:fill-white" />
        <path d="M10 70 C25 80 55 80 70 70 C55 82 25 82 10 70 Z" fill="black" className="dark:fill-white" />
        <path d="M22 62 C30 54 50 54 58 62 C50 58 30 58 22 62 Z" fill="black" className="dark:fill-white" />
        <line x1="40" y1="48" x2="40" y2="78" stroke="black" className="dark:stroke-white" strokeWidth="2.5" />
      </g>
      {/* TREASURE Text */}
      <text x="145" y="93" fill="black" className="dark:fill-white" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="bold" letterSpacing="0.4em">
        TREASURE
      </text>
    </svg>
  )
}

function TomJackSVG() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Monogram crest */}
      <circle cx="85" cy="80" r="35" stroke="#DAA520" strokeWidth="2.5" />
      <circle cx="85" cy="80" r="29" stroke="#DAA520" strokeWidth="1" strokeDasharray="3 3" />
      {/* Intertwined T & J */}
      <path d="M72 65 L98 65 M85 65 L85 92 C85 98 78 100 74 97" stroke="#DAA520" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M92 73 L92 90 C92 96 82 98 78 92" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      {/* TOM & JACK text */}
      <text x="145" y="85" fill="black" className="dark:fill-white" fontFamily="Inter, sans-serif" fontSize="23" fontWeight="bold" letterSpacing="0.32em">
        TOM &amp; JACK
      </text>
      <text x="145" y="105" fill="#DAA520" fontFamily="sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.25em">
        ACTIVE LUXURY APPAREL
      </text>
    </svg>
  )
}

export function GarmentsBrands() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' })
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    setBrands(brandStore.getBrands())
  }, [])

  // Map segments based on B2B conventions
  const getSegmentSlug = (slug: string) => {
    return slug === 'tom-jack' ? 'incentives' : 'core'
  }

  return (
    <section className="bg-[var(--bg)] border-t border-[var(--border)] py-16 md:py-20" ref={headerRef}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-gold shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                OUR ENTERPRISE LABELS
              </span>
            </div>
          </motion.div>
          
          <motion.h2
            className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--text)] uppercase"
            initial={{ opacity: 0, y: 25 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Our Garments <span className="text-gold">Brands</span>
          </motion.h2>
          
          <motion.p
            className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-muted)] max-w-2xl font-light"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            Select a brand label to view detailed corporate portfolios, custom fabric structures, and dynamic wholesale agreements.
          </motion.p>
        </div>

        {/* ── Brand Logos Showcase Symmetrical Grid ── */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
          {brands.map((brand, idx) => {
            const segmentSlug = getSegmentSlug(brand.slug)
            
            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.08 }}
                className="relative"
              >
                <Link
                  href={`/products/garments/${segmentSlug}/${brand.slug}`}
                  className="relative overflow-hidden aspect-[8/3] border cursor-pointer transition-all duration-500 rounded-none flex items-center justify-center p-6 bg-white/[0.02] dark:bg-white/[0.01] border-[var(--border)] hover:border-gold hover:shadow-[0_15px_40px_rgba(218,165,32,0.1)] group block"
                >
                  {/* High-end Crisp SVGs for default brands */}
                  {brand.slug === 'treasure' && (
                    <div className="w-full h-full flex items-center justify-center max-w-[220px] transition-transform duration-500 group-hover:scale-[1.03]">
                      <TreasureSVG />
                    </div>
                  )}
                  {brand.slug === 'vandegraff' && (
                    <div className="w-full h-full flex items-center justify-center max-w-[220px] border border-white/5 shadow-md transition-transform duration-500 group-hover:scale-[1.03]">
                      <VandegraffSVG />
                    </div>
                  )}
                  {brand.slug === 'tom-jack' && (
                    <div className="w-full h-full flex items-center justify-center max-w-[220px] transition-transform duration-500 group-hover:scale-[1.03]">
                      <TomJackSVG />
                    </div>
                  )}

                  {/* Fallback support for dynamically added custom admin brands */}
                  {brand.slug !== 'treasure' && brand.slug !== 'vandegraff' && brand.slug !== 'tom-jack' && (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center font-mono transition-transform duration-500 group-hover:scale-[1.03]">
                      {brand.logo_mobile ? (
                        <div className="relative w-full h-full max-w-[130px] aspect-[3/1]">
                          <Image src={brand.logo_mobile} alt={brand.name} fill className="object-contain" />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="font-display font-bold text-sm tracking-widest text-[var(--text)] uppercase group-hover:text-gold transition-colors">
                            {brand.name}
                          </span>
                          <span className="block text-[8px] text-[var(--text-muted)] uppercase tracking-wider font-mono">
                            {segmentSlug === 'core' ? 'Core Line' : 'Incentives'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Subtle Glowing Hover corner arrow indicator */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 text-gold">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  
                  {/* Dynamic Glowing Gold Top Bar Indicator on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
