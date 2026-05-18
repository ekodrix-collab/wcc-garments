'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { MOCK_PRODUCTS, SITE_CONFIG } from '@/lib/constants'

const CATEGORIES = ['All', 'Garments', 'Uniforms', 'Hospitality', 'Home', 'Fragrance', 'Households']

export function NewArrivals() {
  const [activeTab, setActiveTab] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)

  const handleTabChange = (cat: string) => {
    setActiveTab(cat)
    setTimeout(() => {
      if (gridRef.current) {
        const yOffset = -100 // Ample clearance below fixed navbar
        const element = gridRef.current
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 50)
  }

  const products = MOCK_PRODUCTS.filter((p) => {
    if (activeTab === 'All') return p.is_new || p.featured
    return p.division_slug.toLowerCase() === activeTab.toLowerCase()
  }).slice(0, 10) // Display up to 10 products for a rich, dense magazine layout

  const formatOfferDate = (date?: string) => {
    if (!date) return null
    const parsed = new Date(date)
    if (Number.isNaN(parsed.getTime())) return null
    return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).format(parsed)
  }

  const whatsappBase = SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const getOfferStatus = (product: (typeof MOCK_PRODUCTS)[number]) => {
    if (!product.is_offer) return null
    const startDate = product.offer_start ? new Date(product.offer_start) : null
    const endDate = product.offer_end ? new Date(product.offer_end) : null

    if (startDate && !Number.isNaN(startDate.getTime()) && today < startDate) return 'Upcoming'
    if (endDate && !Number.isNaN(endDate.getTime()) && today > endDate) return 'Expired'
    return 'Active'
  }

  return (
    <section className="bg-[var(--bg)] py-section" data-cursor="view">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Margined Section Number */}
        <div className="mb-8 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
          <span className="h-[1px] w-6 bg-gold" />
          <span>03 — Seasonal Editorial</span>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
              Curated Production
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
              New Arrivals &amp; <span className="font-light italic text-gold">Campaign Releases</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-[var(--text-muted)]">
              B2B-only product launches for wholesale buyers. No public pricing; enquire based on MOQ, lead time, and customization scope.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleTabChange(cat)}
                className={`rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider transition-all duration-400 ${
                  activeTab === cat
                    ? 'bg-gold text-black font-bold shadow-lg shadow-gold/30 scale-105'
                    : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-gold/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/contact?source=new-arrivals&intent=request-quote&businessType=Wholesale%20Distributor"
            className="inline-flex items-center gap-2 border border-gold bg-gold px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-gold-light"
          >
            Request Bulk Quote <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={`https://wa.me/${whatsappBase}?text=${encodeURIComponent('Hi WCC Garments, I need a quote for your new arrivals. Please share MOQ, lead times, and available customization options.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text)] transition-colors hover:border-gold hover:text-gold"
          >
            Enquire On WhatsApp <MessageCircle className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Magazine Editorial Grid Hierarchy: 1 Massive + 2 Medium + 4 Small */}
        <div className="mt-16 min-h-[650px]" ref={gridRef}>
          <motion.div layout style={{ perspective: 1000 }} className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-6">
            <AnimatePresence mode="popLayout">
              {products.map((product, idx) => {
                // Determine layout span based on index
                const isMassive = idx === 0
                const isMedium = idx === 1 || idx === 2
                const spanClass = isMassive
                  ? 'md:col-span-4 lg:col-span-3 aspect-[3/4] lg:aspect-[4/5]'
                  : isMedium
                  ? 'md:col-span-2 lg:col-span-3 aspect-square'
                  : 'md:col-span-2 lg:col-span-1.5 aspect-[4/5]'
                const offerStatus = getOfferStatus(product)

                return (
                  <motion.div
                    layout
                    layoutId={`product-card-${product.id}`}
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.85, y: 60, rotateX: 15, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.85, y: -60, rotateX: -15, filter: 'blur(12px)' }}
                    transition={{
                      layout: { type: 'spring', stiffness: 85, damping: 16, mass: 0.9 },
                      opacity: { duration: 0.5, delay: idx * 0.04 },
                      scale: { duration: 0.5, delay: idx * 0.04 },
                      y: { type: 'spring', stiffness: 90, damping: 18, delay: idx * 0.04 },
                      rotateX: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: idx * 0.04 },
                      filter: { duration: 0.4, delay: idx * 0.04 },
                    }}
                    className={`group relative overflow-hidden bg-[var(--bg-surface)] border border-[var(--border)] transition-all duration-500 hover:border-gold/50 hover:shadow-[0_10px_30px_rgba(201,168,76,0.15)] rounded-xl ${spanClass}`}
                    whileHover={{ y: -8, scale: 1.01 }}
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        loading="lazy"
                        quality={85}
                        className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

                      {/* Badges */}
                      <div className="absolute left-6 top-6 flex flex-col gap-2 font-mono text-[9px] uppercase tracking-wider z-10">
                        {product.is_new && <span className="bg-gold px-3 py-1 font-bold text-black rounded-sm shadow-md">New</span>}
                        {product.is_offer && <span className="bg-red-500 px-3 py-1 font-bold text-white rounded-sm shadow-md">{product.offer_label}</span>}
                        {offerStatus && (
                          <span
                            className={`px-3 py-1 font-bold rounded-sm shadow-md ${
                              offerStatus === 'Active'
                                ? 'bg-emerald-500 text-black'
                                : offerStatus === 'Upcoming'
                                ? 'bg-sky-500 text-black'
                                : 'bg-zinc-500 text-white'
                            }`}
                          >
                            {offerStatus}
                          </span>
                        )}
                      </div>

                      {/* Info Bottom Bar */}
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white z-10">
                        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-gold">
                          {product.division}
                        </span>
                        <h3 className={`font-display font-bold mt-1 tracking-tight transition-colors group-hover:text-gold ${
                          isMassive ? 'text-3xl sm:text-4xl' : isMedium ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                        }`}>
                          {product.name}
                        </h3>
                        <p className="mt-2 text-xs text-white/70 line-clamp-2 font-body">
                          {product.short_description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-wider">
                          <span className="border border-white/30 bg-black/35 px-2 py-1 text-white/80">
                            MOQ: {product.moq}
                          </span>
                          <span className="border border-white/30 bg-black/35 px-2 py-1 text-white/80">
                            Lead Time: {product.lead_time}
                          </span>
                        </div>
                        {product.is_offer && (product.offer_start || product.offer_end) && (
                          <p className="mt-2 text-[10px] uppercase tracking-wider text-white/75">
                            Offer Window: {formatOfferDate(product.offer_start) ?? 'TBD'} - {formatOfferDate(product.offer_end) ?? 'TBD'}
                          </p>
                        )}
                        {product.is_offer && product.offer_terms && (
                          <p className="mt-1 text-[10px] text-white/70 line-clamp-2">
                            Terms: {product.offer_terms}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            className="inline-flex items-center gap-1 border border-white/40 bg-black/35 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:border-gold hover:text-gold"
                          >
                            View Specs <ArrowUpRight className="h-3 w-3" />
                          </Link>
                          <Link
                            href={`/contact?source=new-arrivals&intent=request-quote&businessType=Wholesale%20Distributor&division=${encodeURIComponent(product.division_slug)}&category=${encodeURIComponent(product.category)}`}
                            className="inline-flex items-center gap-1 border border-gold bg-gold px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-black transition-colors hover:bg-gold-light"
                          >
                            Request Quote
                          </Link>
                          <a
                            href={`https://wa.me/${whatsappBase}?text=${encodeURIComponent(`Hi WCC Garments, I am interested in ${product.name}. Please share MOQ, lead time, and quote details.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 border border-white/40 bg-black/35 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:border-gold hover:text-gold"
                          >
                            WhatsApp <MessageCircle className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
