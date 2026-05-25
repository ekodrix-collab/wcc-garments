'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Award } from 'lucide-react'
import { brandStore } from '@/lib/brand-store'
import { Brand } from '@/types'

export function GarmentsBrands() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' })
  const [brands, setBrands] = useState<Brand[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    // Load brands from catalog store (fully handles localStorage sync)
    setBrands(brandStore.getBrands())
  }, [])

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return
    const scrollAmount = direction === 'left' ? -380 : 380
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const updateScrollState = () => {
    if (!containerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll <= 0) return
    setScrollPosition(scrollLeft / maxScroll)
  }

  // Predefined beautiful B2B brand banners in case logos aren't set
  const brandCovers = [
    'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80', // formal corporate
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', // industrial workwear
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80'  // hospitality / active
  ]

  const brandDiscounts = [
    'CORE PORTFOLIO',
    'INDUSTRIAL GRADE',
    'VOLUME TIER PRICE'
  ]

  return (
    <section className="bg-[var(--bg)] border-t border-[var(--border)] py-16 md:py-24" ref={headerRef}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
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
              Explore our primary corporate clothing labels. Each brand serves a distinct B2B vertical, guaranteeing rigorous fabric composition, specialized durability, and custom branding for global wholesale procurement.
            </motion.p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => handleScroll('left')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:border-gold hover:text-gold transition-all duration-300 shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:border-gold hover:text-gold transition-all duration-300 shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrolling Cards Scroller Container */}
        <div
          ref={containerRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {brands.map((brand, i) => {
            // Map segments based on default rules
            const isOffer = brand.slug === 'tom-jack'
            const segmentSlug = isOffer ? 'incentives' : 'core'
            const defaultCover = brandCovers[i % brandCovers.length]
            const discountLabel = brandDiscounts[i % brandDiscounts.length]

            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, x: 50 }}
                animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                className="w-[340px] sm:w-[380px] shrink-0 snap-start snap-always group"
              >
                <div className="relative overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] flex flex-col justify-between h-[450px]">
                  
                  {/* Background Image / Banner */}
                  <div className="relative w-full h-[300px] overflow-hidden bg-neutral-900">
                    <Image
                      src={brand.logo_desktop || defaultCover}
                      alt={brand.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="380px"
                    />
                    
                    {/* Visual Shutter Dark Mask overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Ribbon Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-gold text-black font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                        {discountLabel}
                      </span>
                    </div>

                    {/* Brand Emblem Logo centered bottom */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10 text-white">
                      <div>
                        <h4 className="font-display text-2xl font-bold tracking-wider text-white uppercase">
                          {brand.name}
                        </h4>
                        <p className="text-[10px] font-mono tracking-widest text-gold uppercase mt-1">
                          {segmentSlug === 'core' ? 'Core Portfolio' : 'Value Incentive'}
                        </p>
                      </div>
                      
                      {/* Logo Frame */}
                      <div className="h-12 w-12 rounded-full overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center p-1.5 shadow-md">
                        <Image
                          src={brand.logo_mobile || defaultCover}
                          alt={`${brand.name} mobile logo`}
                          width={40}
                          height={40}
                          className="object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[var(--text)] line-clamp-1">
                        {brand.tagline}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)] line-clamp-2 font-light">
                        {brand.description}
                      </p>
                    </div>

                    {/* CTA Navigation Route standard */}
                    <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
                        {brand.slug.toUpperCase()} SELECTION
                      </span>
                      <Link
                        href={`/products/garments/${segmentSlug}/${brand.slug}`}
                        className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-gold uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                      >
                        <span>View Portfolio</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Scrolling Progress Indicator (Sliding Line) */}
        <div className="mt-8 mx-auto w-full max-w-[200px] h-[2px] bg-[var(--border)] overflow-hidden relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gold w-1/3"
            animate={{ left: `${scrollPosition * 66.6}%` }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
          />
        </div>

      </div>
    </section>
  )
}
