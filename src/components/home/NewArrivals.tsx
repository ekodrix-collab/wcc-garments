'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { MOCK_PRODUCTS, SITE_CONFIG } from '@/lib/constants'
import { ProductCard } from '@/components/products/ProductCard'

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
  }).slice(0, 8) // Limit to 8 for a perfectly aligned 4-column grid (2 rows of 4)

  const whatsappBase = SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')

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

        {/* Perfectly Aligned 4-Column Card Grid */}
        <div className="mt-16 min-h-[500px]" ref={gridRef}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6 md:gap-y-10">
            <AnimatePresence mode="popLayout">
              {products.map((product, idx) => {
                // Adapt MOCK_PRODUCTS fields to match ProductCard expects
                const formattedProduct = {
                  ...product,
                  division: { name: product.division, slug: product.division_slug },
                  category: { name: product.category }
                }

                return (
                  <ProductCard
                    key={product.id}
                    product={formattedProduct}
                    index={idx}
                  />
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
