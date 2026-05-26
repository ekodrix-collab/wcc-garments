'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ArrowRight, ArrowUpRight, Tag, Clock, Award, ShieldCheck, Check, Layers, SlidersHorizontal, X } from 'lucide-react'
import { DIVISIONS } from '@/lib/constants'
import { brandStore } from '@/lib/brand-store'
import { ProductCard } from '@/components/products/ProductCard'
import { Product } from '@/types'

// ─── Explicit local types to widen the const-inferred DIVISIONS union ─────────
interface SubCat {
  id: string
  name: string
  slug: string
  status: string
  displayOrder: number
}
interface GarmentCategory {
  id: string
  name: string
  slug: string
  status: string
  displayOrder: number
  subCategories: SubCat[]
}

// ─── Crisp Premium Inline SVG Logos ───
function TreasureLogoSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(10, 10)">
        <path d="M10 20 L20 35 L40 15 L60 35 L70 20 L65 48 L15 48 Z" fill="#DAA520" />
        <circle cx="10" cy="18" r="2.5" fill="#DAA520" />
        <circle cx="40" cy="13" r="2.5" fill="#DAA520" />
        <circle cx="70" cy="18" r="2.5" fill="#DAA520" />
        <path d="M10 54 C10 65 30 78 40 78 C50 78 70 65 70 54 C55 54 48 70 40 78 C32 70 25 54 10 54 Z" fill="white" />
        <line x1="40" y1="48" x2="40" y2="78" stroke="white" strokeWidth="2.5" />
      </g>
      <text x="120" y="70" fill="white" fontFamily="Inter, sans-serif" fontSize="28" fontWeight="bold" letterSpacing="0.4em">
        TREASURE
      </text>
    </svg>
  )
}

function VandegraffLogoSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="90" height="90" fill="#8B1A1A" rx="4" />
      <path d="M60 30 C50 30 52 50 67 57 C82 50 84 30 74 30 C64 30 66 53 60 30 Z" fill="white" />
      <path d="M52 33 C60 53 74 53 82 33 C70 33 67 48 52 33 Z" fill="white" />
      <text x="130" y="68" fill="white" fontFamily="Cinzel, Georgia, serif" fontSize="24" fontWeight="bold" letterSpacing="0.25em">
        VANDEGRAFF
      </text>
      <text x="130" y="88" fill="#EAD8D8" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.32em">
        SHIRTS &amp; TROUSERS
      </text>
    </svg>
  )
}

function TomJackLogoSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="35" stroke="#DAA520" strokeWidth="2" />
      <circle cx="60" cy="60" r="29" stroke="#DAA520" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M47 45 L73 45 M60 45 L60 72 C60 78 53 80 49 77" stroke="#DAA520" strokeWidth="3" strokeLinecap="round" />
      <path d="M67 53 L67 70 C67 76 57 78 53 72" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <text x="120" y="65" fill="white" fontFamily="Inter, sans-serif" fontSize="23" fontWeight="bold" letterSpacing="0.32em">
        TOM &amp; JACK
      </text>
      <text x="120" y="82" fill="#DAA520" fontFamily="sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.25em">
        ACTIVE LUXURY APPAREL
      </text>
    </svg>
  )
}

// ─── Constants ────────────────────────────────────────────────────────────────
const division = DIVISIONS.find((d) => d.slug === 'garments')!
const CATEGORIES = (division.categories ?? []) as GarmentCategory[]

const CATEGORY_IMAGES: Record<string, string> = {
  'formal-shirts': '/images/formal-shirts.png',
  'blazers-suits': '/images/Blazers and suits.png',
  'jeans-denims':  '/images/jeans-denims.png',
  'polo-tshirts':  '/images/polo tshirts.png',
  'trousers':      '/images/trousers.png',
  'jackets':       '/images/jackets.png',
}

const STYLE_COUNT: Record<string, string> = {
  'formal-shirts': '140+ Styles',
  'blazers-suits': '80+ Styles',
  'jeans-denims':  '210+ Styles',
  'polo-tshirts':  '320+ Styles',
  'trousers':      '110+ Styles',
  'jackets':       '95+ Styles',
}

const SLUG_TO_CATEGORY: Record<string, string[]> = {
  'formal-shirts': ['Formal Shirts', 'Casual Shirts'],
  'blazers-suits': ['Blazers & Suits', 'Formal Outerwear'],
  'jeans-denims':  ['Jeans & Denims', 'Cargo Pants'],
  'polo-tshirts':  ['Polo Shirts', 'T-Shirts', 'Polo & T-Shirts'],
  'trousers':      ['Trousers & Chinos', 'Trousers', 'Chinos'],
  'jackets':       ['Outerwear & Jackets', 'Outerwear', 'Jackets'],
}

type CatStatus = 'active' | 'coming-soon' | 'newly-started'

const STATUS_CONFIG: Record<CatStatus, { badge: string; style: string }> = {
  'active':        { badge: 'ACTIVE',        style: 'bg-gold text-black' },
  'coming-soon':   { badge: 'COMING SOON',   style: 'bg-neutral-600 text-white' },
  'newly-started': { badge: 'NEWLY STARTED', style: 'bg-amber-500 text-white' },
}

// ─── BRANDS DATA CONFIG ───
const BRANDS_CONFIG = [
  {
    slug: 'treasure',
    name: 'Treasure',
    tagline: 'Sleek Corporate Tailoring & Bespoke Formal Wear',
    desc: 'Egyptian cotton. Italian finishing. Export-grade quality. Crafted for global leaders demanding pristine fits and executive weight profiles.',
    moq: '500 PCS',
    styles: '320+ STYLES',
    segment: 'core',
    badge: 'PREMIUM LINE',
    style: 'border-gold text-gold bg-gold/5',
    perfectFor: ['Banking Sector', 'Luxury Hotels', 'Corporate Uniforms', 'Government'],
    bgImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80',
    logoSvg: TreasureLogoSVG
  },
  {
    slug: 'vandegraff',
    name: 'Vandegraff',
    tagline: 'Heavy-Duty Corporate Attire & Technical Workwear',
    desc: 'Smart Everyday Essentials. Competitive pricing. Volume production. Engineered with high-tensile weave structures to optimize scaled commercial operations.',
    moq: '1,500 PCS',
    styles: '280+ STYLES',
    segment: 'core',
    badge: 'VALUE LINE',
    style: 'border-red-500/30 text-red-400 bg-red-950/10',
    perfectFor: ['Retail Chains', 'Mass Market', 'E-Commerce', 'Budget Retail'],
    bgImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80',
    logoSvg: VandegraffLogoSVG
  },
  {
    slug: 'tom-jack',
    name: 'Tom & Jack',
    tagline: 'Contemporary Active Apparel & Refined Team Wear',
    desc: 'Active Premium. Smart-casual for the modern professional. Business-casual meets urban lifestyle. The ultimate hybrid collection combining flex comfort with sleek aesthetics.',
    moq: '250 PCS',
    styles: '410+ STYLES',
    segment: 'incentives',
    badge: 'ACTIVE PREMIUM',
    style: 'border-gold text-gold bg-gold/5',
    perfectFor: ['Tech Startups', 'Creative Agencies', 'Executive Retreats', 'Luxury Golf Clubs'],
    bgImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80',
    logoSvg: TomJackLogoSVG
  }
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function GarmentsHubClient() {
  const searchParams   = useSearchParams()
  const router         = useRouter()
  const filterBarRef   = useRef<HTMLDivElement>(null)

  const urlCategory    = searchParams.get('category') ?? 'all'
  const urlBrand       = searchParams.get('brand') ?? 'all'

  const activeCategory = (CATEGORIES.find((c) => c.slug === urlCategory) ?? null) as GarmentCategory | null
  const activeBrand    = BRANDS_CONFIG.find((b) => b.slug === urlBrand) ?? null

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const all = brandStore.getProducts()
    const garments = all.filter(
      (p) => p.division_id === 'Garments' || p.division?.slug === 'garments' || p.division?.name === 'Garments'
    )
    setProducts(garments)
  }, [])

  // Filter products by active category AND brand
  const filteredProducts = products.filter((p) => {
    // 1. Category check
    let categoryMatch = true
    if (activeCategory) {
      const catName = p.category?.name ?? (p as unknown as Record<string, string>)['category'] ?? ''
      const matches = SLUG_TO_CATEGORY[activeCategory.slug] ?? []
      categoryMatch = matches.some((m) => catName.toLowerCase().includes(m.toLowerCase()))
    }

    // 2. Brand check
    let brandMatch = true
    if (urlBrand !== 'all') {
      brandMatch = p.brand_slug === urlBrand
    }

    return categoryMatch && brandMatch
  })

  // Navigation helpers that maintain both parameters
  const updateFilters = (catSlug: string | null, brandSlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (catSlug === 'all' || catSlug === null) {
      if (catSlug === 'all') params.delete('category')
    } else {
      params.set('category', catSlug)
    }

    if (brandSlug === 'all' || brandSlug === null) {
      if (brandSlug === 'all') params.delete('brand')
    } else {
      params.set('brand', brandSlug)
    }

    router.push(`/products/garments${params.toString() ? '?' + params.toString() : ''}`, { scroll: false })
    
    // Auto-scroll to catalog grid area only for category filtering for smooth UX
    if (catSlug !== null) {
      setTimeout(() => {
        filterBarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  const clearAllFilters = () => {
    router.push('/products/garments', { scroll: false })
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24">

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-white/10 pt-12 pb-16 md:pt-20 md:pb-20">
        {/* Subtle gold radial */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(218,165,32,0.07),transparent_60%)]" />

        <div className="relative mx-auto max-w-[1560px] px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/30">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/60">Garments</span>
            {activeCategory && (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className="text-gold">{activeCategory.name}</span>
              </>
            )}
          </nav>

          <div className="mt-8">
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.35em] text-gold/80">
              DIV-01 · Garments Division
              {activeCategory ? ` — ${activeCategory.name}` : ''}
              {activeBrand ? ` · ${activeBrand.name}` : ''}
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] uppercase md:text-5xl lg:text-[4rem]">
              {activeCategory ? activeCategory.name : activeBrand ? activeBrand.name : division.heroHeading}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base font-light">
              {activeBrand 
                ? `${activeBrand.tagline}. ${activeBrand.desc}`
                : activeCategory
                ? `Browse our full range of ${activeCategory.name} — precision-engineered for global B2B wholesale. Request a bulk quotation for any style.`
                : division.heroSubtitle}
            </p>
          </div>

          {/* Stats strip */}
          <div className="mt-10 flex flex-wrap gap-0 divide-x divide-white/10 border border-white/10 w-fit">
            {[
              { label: division.stat1Label, value: activeBrand ? activeBrand.moq : division.stat1Value },
              { label: division.stat2Label, value: division.stat2Value },
              { label: 'Active Lines', value: '3 Brands' },
              { label: 'Products Matching', value: `${filteredProducts.length}` },
            ].map((s) => (
              <div key={s.label} className="px-5 py-3 bg-white/[0.02]">
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">{s.label}</p>
                <p className="mt-0.5 text-base font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── INTERACTIVE MANUFACTURING HOUSES SHOWCASE (BRAND BROWSE) ── */}
      {urlCategory === 'all' && (
        <section className="mx-auto max-w-[1560px] px-6 lg:px-12 py-16 border-b border-white/5 bg-gradient-to-b from-[#090909] to-[#080808]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 bg-gold/5 mb-4">
              <Award className="h-3.5 w-3.5 text-gold shrink-0" />
              <span className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase font-semibold">
                Select B2B Fashion House
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white">
              Browse by Manufacturing <span className="text-gold font-serif italic lowercase font-normal">Line</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-white/40 font-light">
              We operate three specialized fashion houses targeting specific commercial requirements. Click on a brand to view its collection.
            </p>
          </div>

          {/* 3 Brand Showcase Cards Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {BRANDS_CONFIG.map((b) => {
              const isSelected = urlBrand === b.slug
              const LogoComponent = b.logoSvg
              
              return (
                <div
                  key={b.slug}
                  onClick={() => updateFilters(null, isSelected ? 'all' : b.slug)}
                  className={`group relative overflow-hidden border transition-all duration-500 cursor-pointer flex flex-col justify-between p-6 h-[280px] sm:h-[320px] ${
                    isSelected 
                      ? 'border-gold bg-[#0e0e0e] shadow-[0_15px_40px_rgba(218,165,32,0.1)]'
                      : 'border-white/10 bg-black/40 hover:border-white/20 hover:bg-[#0c0c0c] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  {/* Background Image subtle overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 transition-opacity duration-500 z-0"
                    style={{ backgroundImage: `url('${b.bgImage}')` }}
                  />
                  
                  {/* Top Row: Custom Brand Logo & Badge */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="w-[140px] opacity-90 group-hover:opacity-100 transition-opacity">
                      <LogoComponent className="w-full h-auto" />
                    </div>
                    <span className={`text-[8px] font-bold tracking-widest px-2 py-0.5 uppercase border ${
                      isSelected ? 'border-gold text-gold bg-gold/15' : 'border-white/20 text-white/50 bg-white/5'
                    }`}>
                      {b.badge}
                    </span>
                  </div>

                  {/* Bottom Row: Info and Selectors */}
                  <div className="relative z-10 space-y-4">
                    <div>
                      <h3 className="font-display text-sm font-bold text-white group-hover:text-gold transition-colors uppercase">
                        {b.tagline}
                      </h3>
                      <p className="mt-1 text-[11px] text-white/50 leading-relaxed font-light line-clamp-3">
                        {b.desc}
                      </p>
                    </div>

                    {/* Telemetries block */}
                    <div className="flex justify-between items-center border-t border-white/5 pt-3 font-mono text-[9px] text-white/40">
                      <div>
                        <span>MOQ: </span>
                        <span className="font-bold text-white">{b.moq}</span>
                      </div>
                      <div>
                        <span>CAPACITY: </span>
                        <span className="font-bold text-gold">{b.styles}</span>
                      </div>
                    </div>

                    {/* Selection feedback indicator */}
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-wider pt-1">
                      <span className={isSelected ? 'text-gold' : 'text-white/40 group-hover:text-white/70'}>
                        {isSelected ? '✓ ACTIVE FILTER' : 'EXPLORE COLLECTION'}
                      </span>
                      <ArrowRight className={`h-3 w-3 transform transition-transform duration-300 ${
                        isSelected ? 'translate-x-1 text-gold' : 'group-hover:translate-x-1 text-white/40 group-hover:text-white/70'
                      }`} />
                    </div>
                  </div>

                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 ${
                    isSelected ? 'bg-gold' : 'bg-transparent group-hover:bg-white/20'
                  }`} />
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── ACTIVE FILTERS BAR (Only visible if filters exist) ── */}
      <AnimatePresence>
        {(urlCategory !== 'all' || urlBrand !== 'all') && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#0b0b0b] border-b border-white/10 py-3"
          >
            <div className="mx-auto max-w-[1560px] px-6 lg:px-12 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-white/40 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                  <SlidersHorizontal className="h-3 w-3" />
                  Active Filters:
                </span>
                
                {/* Category Pill */}
                {urlCategory !== 'all' && activeCategory && (
                  <button
                    onClick={() => updateFilters('all', null)}
                    className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/30 hover:border-gold/60 text-gold px-2.5 py-1 text-[10px] font-bold uppercase transition-colors"
                  >
                    Category: {activeCategory.name}
                    <X className="h-3 w-3" />
                  </button>
                )}

                {/* Brand Pill */}
                {urlBrand !== 'all' && activeBrand && (
                  <button
                    onClick={() => updateFilters(null, 'all')}
                    className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/30 hover:border-gold/60 text-gold px-2.5 py-1 text-[10px] font-bold uppercase transition-colors"
                  >
                    Brand: {activeBrand.name}
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              <button
                onClick={clearAllFilters}
                className="text-white/50 hover:text-white underline underline-offset-4 text-[10px] uppercase font-bold tracking-wider"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STICKY CATEGORY FILTER BAR ─────────────────────────────── */}
      <div ref={filterBarRef} className="sticky top-[72px] z-40 border-b border-white/10 bg-[#080808]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="mx-auto max-w-[1560px] px-4 lg:px-12">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide py-1">
            {/* ALL tab */}
            <button
              onClick={() => updateFilters('all', null)}
              className={`relative shrink-0 px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border-b-2 ${
                urlCategory === 'all'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              All Categories
            </button>

            {/* Category tabs */}
            {CATEGORIES.map((cat) => {
              const isActive = urlCategory === cat.slug
              const isDisabled = cat.status === 'coming-soon'
              return (
                <button
                  key={cat.slug}
                  onClick={() => !isDisabled && updateFilters(cat.slug, null)}
                  disabled={isDisabled}
                  className={`relative shrink-0 flex items-center gap-2 px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border-b-2 ${
                    isActive
                      ? 'border-gold text-gold'
                      : isDisabled
                      ? 'border-transparent text-white/20 cursor-not-allowed'
                      : 'border-transparent text-white/40 hover:text-white/70'
                  }`}
                >
                  {cat.name}
                  {isDisabled && <span className="ml-1 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider bg-white/10 text-white/30">SOON</span>}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── CONTENT AREA ────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {urlCategory === 'all' ? (
          /* ── ALL CATEGORIES VIEW: Premium Cinematic Grid ── */
          <motion.div
            key="all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Spotlight Brand Profile (Only when a specific brand is selected but no category) */}
            {activeBrand && (
              <section className="mx-auto max-w-[1560px] px-6 lg:px-12 pt-12">
                <div className="relative border border-gold/30 bg-[#0c0c0c] overflow-hidden p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(218,165,32,0.06),transparent_50%)]" />
                  
                  <div className="relative z-10 max-w-3xl space-y-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-gold border border-gold/30 bg-gold/10 px-2 py-0.5 uppercase">
                      Active Spotlight · {activeBrand.badge}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                      {activeBrand.name} Profile
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed font-light">
                      {activeBrand.desc} Customization services include custom labels, bespoke logo embroidery, custom-dye options, and CIF global transport directly from our Jebel Ali Hub.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="border-l-2 border-gold/50 pl-3">
                        <span className="block text-[8px] font-mono uppercase text-white/40 tracking-wider">Minimum Order</span>
                        <span className="text-xs font-mono font-bold text-white">{activeBrand.moq}</span>
                      </div>
                      <div className="border-l-2 border-gold/50 pl-3">
                        <span className="block text-[8px] font-mono uppercase text-white/40 tracking-wider">Lead Time</span>
                        <span className="text-xs font-mono font-bold text-white">{division.stat2Value}</span>
                      </div>
                      <div className="border-l-2 border-gold/50 pl-3">
                        <span className="block text-[8px] font-mono uppercase text-white/40 tracking-wider">Perfect For</span>
                        <span className="text-xs font-mono font-bold text-gold">{activeBrand.perfectFor.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 shrink-0 flex flex-col gap-3 w-full md:w-auto">
                    <Link
                      href={`/products/garments/${activeBrand.segment}/${activeBrand.slug}`}
                      className="bg-gold hover:bg-gold/90 text-black py-3 px-6 font-mono text-[10px] font-bold uppercase tracking-widest text-center transition-all flex items-center justify-center gap-2 shadow-2xl"
                    >
                      <span>B2B RFQ Cart Portal</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => updateFilters(null, 'all')}
                      className="border border-white/10 hover:border-white/30 text-white/60 hover:text-white py-3 px-6 font-mono text-[10px] font-bold uppercase tracking-widest text-center transition-all"
                    >
                      Clear Brand Filter
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Category Grid */}
            {!activeBrand && (
              <section className="mx-auto max-w-[1560px] px-6 lg:px-12 py-14">
                <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gold">GARMENTS CATALOG</span>
                    <h2 className="mt-2 font-display text-2xl font-bold uppercase text-white md:text-3xl">
                      Browse by Category
                    </h2>
                  </div>
                  <p className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                    {CATEGORIES.filter((c) => c.status === 'active').length} active · {CATEGORIES.filter((c) => c.status === 'coming-soon').length} coming soon
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {CATEGORIES.sort((a, b) => a.displayOrder - b.displayOrder).map((cat, index) => {
                    const status    = cat.status as CatStatus
                    const cfg       = STATUS_CONFIG[status] ?? STATUS_CONFIG['active']
                    const image     = CATEGORY_IMAGES[cat.slug] ?? 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
                    const styleCount = STYLE_COUNT[cat.slug] ?? '80+ Styles'
                    const isDisabled = status === 'coming-soon'

                    return (
                      <motion.div
                        key={cat.slug}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <button
                          onClick={() => !isDisabled && updateFilters(cat.slug, null)}
                          disabled={isDisabled}
                          className={`group relative block w-full text-left overflow-hidden border transition-all duration-500 ${
                            isDisabled
                              ? 'border-white/5 cursor-not-allowed'
                              : 'border-white/10 hover:border-gold/40 hover:shadow-[0_20px_60px_rgba(218,165,32,0.08)]'
                          }`}
                        >
                          {/* Image */}
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={image}
                              alt={cat.name}
                              fill
                              className={`object-cover transition-transform duration-700 ease-out ${isDisabled ? 'grayscale opacity-30' : 'opacity-60 group-hover:scale-[1.04] group-hover:opacity-70'}`}
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            <div className={`absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 ${!isDisabled ? 'group-hover:opacity-100' : ''}`} />

                            {/* Status badge — only show for non-active states, matches KillingOffers pattern exactly */}
                            {status !== 'active' && (
                              <span className={`absolute left-4 top-4 px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest z-10 ${cfg.style}`}>
                                {cfg.badge}
                              </span>
                            )}

                            {/* Style count */}
                            <span className="absolute right-4 bottom-4 font-mono text-[9px] font-bold text-white/60 bg-black/60 backdrop-blur-sm px-2 py-1">
                              {styleCount}
                            </span>

                            {/* Hover filter CTA */}
                            {!isDisabled && (
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                                <div className="flex items-center gap-2 bg-gold text-black px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                  Filter by {cat.name} <ArrowRight className="h-3.5 w-3.5" />
                                </div>
                              </div>
                            )}

                            {/* Coming soon overlay */}
                            {isDisabled && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <Clock className="h-8 w-8 text-white/20 mb-2" />
                                <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Available Soon</p>
                              </div>
                            )}
                          </div>

                          {/* Info panel */}
                          <div className="bg-[#0D0D0D] border-t border-white/[0.07] p-5">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className={`font-display text-lg font-bold uppercase transition-colors duration-300 ${isDisabled ? 'text-white/25' : 'text-white group-hover:text-gold'}`}>
                                {cat.name}
                              </h3>
                              {!isDisabled && (
                                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/20 transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              )}
                            </div>

                            {/* Sub-category chips */}
                            {cat.subCategories && cat.subCategories.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {cat.subCategories.slice(0, 3).map((sub) => (
                                  <span key={sub.id} className="px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider border border-gold/15 bg-gold/5 text-gold/50">
                                    {sub.name}
                                  </span>
                                ))}
                                {cat.subCategories.length > 3 && (
                                  <span className="px-2 py-0.5 font-mono text-[8px] border border-white/10 text-white/25">
                                    +{cat.subCategories.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Gold accent line */}
                            {!isDisabled && (
                              <div className="mt-4 h-[1px] w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
                            )}
                          </div>
                        </button>
                      </motion.div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* All Products Grid */}
            <ProductsGrid
              products={filteredProducts}
              heading={activeBrand ? `${activeBrand.name} Collection` : "All Garment Products"}
              subheading={activeBrand ? `SHOWCASING ${activeBrand.name.toUpperCase()}` : "FULL CATALOG"}
              emptyMsg="No products listed yet matching this combination. Contact our Dubai export office."
            />
          </motion.div>

        ) : !activeCategory ? null : (
          /* ── FILTERED CATEGORY VIEW ── */
          <motion.div
            key={activeCategory.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category cinematic banner */}
            <div className="relative h-[280px] md:h-[360px] overflow-hidden border-b border-white/10">
              <Image
                src={CATEGORY_IMAGES[activeCategory.slug] ?? 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80'}
                alt={activeCategory.name}
                fill
                className="object-cover object-center opacity-40"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-3.5 w-3.5 text-gold" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Garments · {activeCategory.name}</span>
                </div>
                <h2 className="font-display text-3xl font-bold uppercase text-white md:text-5xl">
                  {activeCategory.name}
                </h2>
                <p className="mt-3 text-sm text-white/50 max-w-lg font-light">
                  Premium {activeCategory.name.toLowerCase()} crafted for global B2B wholesale. All styles available in custom colors, fabrics, and branding.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                    {STYLE_COUNT[activeCategory.slug] ?? '80+ Styles'}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">MOQ {activeBrand ? activeBrand.moq : division.stat1Value}</span>
                  <span className="text-white/20">·</span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">Lead Time {division.stat2Value}</span>
                </div>
              </div>
            </div>

            {/* Sub-categories (if any) */}
            {activeCategory.subCategories && activeCategory.subCategories.length > 0 && (
              <div className="border-b border-white/[0.07] bg-[#0D0D0D]">
                <div className="mx-auto max-w-[1560px] px-6 lg:px-12 py-6">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-3">Sub-Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {activeCategory.subCategories.map((sub) => (
                      <span
                        key={sub.id}
                        className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border transition-colors ${
                          sub.status === 'active'
                            ? 'border-gold/30 bg-gold/10 text-gold cursor-default'
                            : 'border-white/10 bg-white/5 text-white/30'
                        }`}
                      >
                        {sub.name}
                        {sub.status === 'coming-soon' && <span className="ml-2 text-[7px]">SOON</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Filtered products */}
            <ProductsGrid
              products={filteredProducts}
              heading={activeBrand ? `${activeBrand.name} - ${activeCategory.name}` : `${activeCategory.name} Products`}
              subheading={activeBrand ? `SHOWCASING ${activeBrand.name.toUpperCase()} IN ${activeCategory.name.toUpperCase()}` : `${STYLE_COUNT[activeCategory.slug] ?? '80+ Styles'} available`}
              emptyMsg={`No matching products listed. Try clearing the brand filter to see all ${activeCategory.name} products.`}
            />

            {/* Back to all */}
            <div className="mx-auto max-w-[1560px] px-6 lg:px-12 pb-14 flex items-center justify-between gap-4">
              <button
                onClick={() => updateFilters('all', null)}
                className="flex items-center gap-2 border border-white/10 bg-white/5 px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
              >
                ← Back to All Categories
              </button>

              {activeBrand && (
                <Link
                  href={`/products/garments/${activeBrand.segment}/${activeBrand.slug}`}
                  className="bg-gold text-black px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-gold/90 transition-all shadow-lg"
                >
                  Explore Dedicated B2B RFQ Portal →
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ENQUIRY CTA ─────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1560px] px-6 py-12 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-gold">BULK ENQUIRY</p>
            <h3 className="mt-1 font-display text-xl font-bold uppercase text-white">
              Ready to order? Request a quotation instantly.
            </h3>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2.5 bg-gold px-8 py-3.5 font-mono text-xs font-bold text-black uppercase tracking-widest hover:bg-gold/90 transition-all shrink-0 shadow-[0_0_40px_rgba(218,165,32,0.2)]"
          >
            Request a Quotation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

// ─── Shared Products Grid Sub-Component ──────────────────────────────────────
function ProductsGrid({
  products,
  heading,
  subheading,
  emptyMsg,
}: {
  products: Product[]
  heading: string
  subheading: string
  emptyMsg: string
}) {
  return (
    <section className="mx-auto max-w-[1560px] px-6 py-12 lg:px-12 border-t border-white/[0.07]">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/30">{subheading}</span>
          <h2 className="mt-1 font-display text-2xl font-bold uppercase text-white md:text-3xl">{heading}</h2>
        </div>
        {products.length > 0 && (
          <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider">{products.length} item{products.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {products.length === 0 ? (
        <div className="border border-white/[0.07] bg-white/[0.02] px-6 py-20 text-center">
          <p className="font-display text-xl text-white/40">{emptyMsg}</p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-6 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-gold hover:bg-gold hover:text-black transition-all">
            Contact for Enquiry <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={{
                ...p,
                division: { name: p.division?.name ?? 'Garments', slug: p.division?.slug ?? 'garments' },
                category: p.category ?? { name: (p as unknown as Record<string, string>)['category_id'] ?? 'Garments' },
              }}
              index={i}
              divisionSlug="garments"
            />
          ))}
        </div>
      )}
    </section>
  )
}
