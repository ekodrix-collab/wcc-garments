'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ChevronRight, Award, ShoppingBag, Send, ShieldCheck, Check,
  ArrowRight, Factory, CheckCircle2, Globe, Sparkles, Star
} from 'lucide-react'
import { brandStore } from '@/lib/brand-store'
import { TreasureSVG } from '@/components/home/GarmentsBrands'
import { ProductCard } from '@/components/products/ProductCard'
import { Brand, Product } from '@/types'
import { api } from '@/lib/api'

export default function TreasuryPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: '-50px' })
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: '-50px' })
  const isProductsInView = useInView(productsRef, { once: true, margin: '-50px' })

  const [brand, setBrand] = useState<Brand | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [rfqCart, setRfqCart] = useState<Product[]>([])
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false)
  const [rfqSubmitted, setRfqSubmitted] = useState(false)
  const [submittingRfq, setSubmittingRfq] = useState(false)
  const [rfqForm, setRfqForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '500-1000 Units',
    message: ''
  })

  useEffect(() => {
    const b = brandStore.getBrandBySlug('treasure')
    if (b) setBrand(b)

    const allProducts = brandStore.getProducts()
    const brandProducts = allProducts.filter(p => {
      const isGarment = p.division_id === 'Garments' || p.division?.slug === 'garments'
      const isBrandMatch = p.brand_slug === 'treasure'
      return isGarment && isBrandMatch
    })
    setProducts(brandProducts)
  }, [])

  if (!brand) return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 flex items-center justify-center">
      <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">Loading…</span>
    </div>
  )

  // Extract categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category?.name || p.category_id || 'Formal Shirts')))]

  const filteredProducts = products.filter(p => {
    if (activeCategory === 'all') return true
    const catName = p.category?.name || p.category_id || 'Formal Shirts'
    return catName.toLowerCase() === activeCategory.toLowerCase()
  })

  const toggleRfqItem = (prod: Product) => {
    setRfqCart(prev => {
      const idx = prev.findIndex(p => p.id === prod.id)
      if (idx !== -1) return prev.filter(p => p.id !== prod.id)
      return [...prev, prod]
    })
  }

  const handleRfqSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittingRfq(true)
    try {
      await api.submitEnquiry({
        name: rfqForm.name,
        company: rfqForm.company,
        email: rfqForm.email,
        phone: rfqForm.phone,
        business_type: 'Wholesale Distributor',
        product_interest: ['Garments & Fashion'],
        quantity_range: rfqForm.quantity,
        message: `TREASURE Brand RFQ — Selected Products: [${rfqCart.map(p => p.name).join(', ')}]. Message: ${rfqForm.message}`,
        source: 'Treasury Brand Page'
      })
      setSubmittingRfq(false)
      setRfqSubmitted(true)
      setRfqCart([])
      setTimeout(() => {
        setIsRfqModalOpen(false)
        setRfqSubmitted(false)
        setRfqForm({ name: '', company: '', email: '', phone: '', quantity: '500-1000 Units', message: '' })
      }, 2500)
    } catch (err) {
      console.error(err)
      setSubmittingRfq(false)
    }
  }

  const highlights = [
    { icon: ShieldCheck, label: 'Export-Grade QC', desc: 'Every piece passes 12-point quality audit' },
    { icon: Globe, label: '50+ Countries', desc: 'Trusted by B2B buyers across five continents' },
    { icon: Factory, label: 'MOQ 500 PCS', desc: 'Flexible minimums for test orders' },
    { icon: Star, label: 'Premium Fabrics', desc: '100% Egyptian cotton & Italian finishes' },
  ]

  return (
    <div className="min-h-screen bg-[var(--bg)]">

      {/* ── Breadcrumbs ── */}
      <div className="mx-auto max-w-[1560px] px-6 pt-24 pb-4 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]"
        >
          <Link href="/" className="transition-colors hover:text-gold">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="transition-colors hover:text-gold">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products/garments" className="transition-colors hover:text-gold">Garments</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[var(--text)] font-semibold">Treasure</span>
        </nav>
      </div>

      {/* ── Hero Banner ── */}
      <section ref={heroRef} className="mx-auto max-w-[1560px] px-6 lg:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative h-[350px] sm:h-[450px] lg:h-[500px] w-full overflow-hidden border border-[var(--border)] bg-neutral-900"
        >
          {/* Desktop Cover */}
          <Image
            src={brand.logo_desktop || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80'}
            alt="Treasure brand banner"
            fill
            className="object-cover hidden sm:block"
            priority
            sizes="1440px"
          />
          {/* Mobile Cover */}
          <Image
            src={brand.logo_mobile || brand.logo_desktop || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80'}
            alt="Treasure brand banner mobile"
            fill
            className="object-cover block sm:hidden"
            priority
            sizes="640px"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Glassmorphism SVG Logo badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20"
          >
            <div className="w-[160px] sm:w-[200px] bg-white/[0.06] backdrop-blur-xl border border-white/15 p-3 shadow-2xl">
              <TreasureSVG />
            </div>
          </motion.div>

          {/* Premium tag */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-widest text-gold border border-gold/30 bg-gold/10 backdrop-blur-md px-3 py-1.5 uppercase">
              <Award className="h-3 w-3" />
              Premium Brand
            </span>
          </motion.div>

          {/* Hero text overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12 text-white z-10"
          >
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              {brand.name}
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-mono text-gold uppercase tracking-wider font-semibold">
              {brand.tagline}
            </p>
            <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed hidden sm:block">
              {brand.description}
            </p>
            <p className="mt-3 text-xs text-white/60 max-w-xl font-light leading-relaxed block sm:hidden">
              {brand.description}
            </p>
          </motion.div>

          {/* Top gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-gold-light to-gold" />
        </motion.div>
      </section>

      {/* ── Brand Highlights Grid ── */}
      <section ref={featuresRef} className="mx-auto max-w-[1560px] px-6 lg:px-12 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group border border-[var(--border)] bg-[var(--bg-surface)] p-5 sm:p-6 hover:border-gold/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 flex items-center justify-center border border-gold/20 bg-gold/5 text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300">
                  <h.icon className="h-4 w-4" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">{h.label}</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Brand Story Section ── */}
      <section className="mx-auto max-w-[1560px] px-6 lg:px-12 mb-16">
        <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-8 sm:p-12 relative overflow-hidden">
          {/* Decorative noise layer */}
          <div className="noise-layer absolute inset-0" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 bg-gold/5 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase font-semibold">The Brand</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text)] uppercase tracking-tight">
                Crafted for <span className="text-gold font-serif italic lowercase font-normal">Excellence</span>
              </h2>
              <div className="h-[2px] w-16 bg-gradient-to-r from-gold to-transparent my-6" />
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                Treasure represents the pinnacle of corporate garment manufacturing. Each piece is meticulously crafted from premium Egyptian cotton and finished with Italian tailoring techniques.
              </p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Trusted by banking institutions, luxury hotel chains, and government bodies across 50+ countries for their executive uniforms and formal corporate attire.
              </p>

              {/* Sectors */}
              <div className="mt-8 border-t border-[var(--border)] pt-6">
                <span className="font-mono text-[9px] tracking-wider uppercase text-gold font-bold">Perfect For:</span>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {['Banking Sector', 'Luxury Hotels', 'Corporate Uniforms', 'Government'].map(s => (
                    <div key={s} className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-gold shrink-0" />
                      <span className="text-xs text-[var(--text-muted)]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats panel */}
            <div className="space-y-4">
              {[
                { label: 'Minimum Order Quantity', value: '500 PCS', accent: true },
                { label: 'Available Styles', value: '320+ Styles', accent: true },
                { label: 'Lead Time', value: '15–25 Days', accent: false },
                { label: 'Export Grade', value: 'Grade A QC', accent: false },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center justify-between border border-[var(--border)] bg-[var(--bg)] p-4 hover:border-gold/30 transition-colors">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{stat.label}</span>
                  <span className={`font-mono text-sm font-bold ${stat.accent ? 'text-gold' : 'text-[var(--text)]'}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products Section ── */}
      <section ref={productsRef} className="mx-auto max-w-[1560px] px-6 lg:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isProductsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 bg-gold/5 mb-3">
                <ShoppingBag className="h-3.5 w-3.5 text-gold" />
                <span className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase font-semibold">Product Catalog</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)] uppercase tracking-tight">
                Treasure <span className="text-gold font-serif italic lowercase font-normal">Collection</span>
              </h2>
            </div>
            {rfqCart.length > 0 && (
              <div className="font-mono text-xs text-gold font-bold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                <span>{rfqCart.length} PRODUCTS MARKED FOR B2B RFQ</span>
              </div>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6 border-b border-[var(--border)]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-gold text-black shadow-md'
                    : 'text-[var(--text-muted)] border border-[var(--border)] bg-[var(--bg-surface)] hover:text-[var(--text)]'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Products grid */}
          {filteredProducts.length === 0 ? (
            <div className="border border-[var(--border)] bg-[var(--bg-surface)] px-6 py-20 text-center">
              <p className="font-display text-2xl text-[var(--text)]">No products found</p>
              <p className="mt-3 text-sm text-[var(--text-muted)]">Products in this category will appear here once added via the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((p, idx) => {
                const inCart = rfqCart.some(item => item.id === p.id)
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isProductsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.08 * idx }}
                    className="relative group flex flex-col justify-between"
                  >
                    {/* B2B RFQ Cart Toggle */}
                    <button
                      onClick={() => toggleRfqItem(p)}
                      className={`absolute top-4 right-4 z-30 h-10 w-10 flex items-center justify-center border shadow-lg transition-all ${
                        inCart
                          ? 'bg-gold border-gold text-black scale-105'
                          : 'bg-black/80 border-white/20 text-white hover:bg-gold hover:border-gold hover:text-black hover:scale-105'
                      }`}
                      title={inCart ? 'Marked for Wholesale Quote' : 'Mark for Wholesale Quote'}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>

                    <ProductCard
                      product={{
                        ...p,
                        division: { name: p.division?.name || 'Garments', slug: 'garments' },
                        category: p.category || { name: p.category_id || 'Formal Shirts' }
                      }}
                      index={idx}
                      divisionSlug="garments"
                    />

                    {/* RFQ Toggle Bar */}
                    <div className="mt-3">
                      <button
                        onClick={() => toggleRfqItem(p)}
                        className={`w-full py-2 font-mono text-[10px] font-bold uppercase tracking-wider border transition-all text-center ${
                          inCart
                            ? 'bg-gold/10 border-gold text-gold'
                            : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:border-gold/50 hover:text-[var(--text)]'
                        }`}
                      >
                        {inCart ? '✓ Marked for Wholesale RFQ' : '+ Add to Bulk RFQ Request'}
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </section>

      {/* ── CTA Section ── */}
      <section className="mx-auto max-w-[1560px] px-6 lg:px-12 pb-20">
        <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="noise-layer absolute inset-0" />
          <div className="relative z-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)] uppercase tracking-tight">
              Ready to Order <span className="text-gold font-serif italic lowercase font-normal">Treasure?</span>
            </h3>
            <p className="mt-4 text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
              Get custom pricing for bulk orders. Our export team will prepare a tailored commercial tariff within 24 hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-gold bg-gold text-black py-3 px-8 font-mono text-[11px] uppercase font-bold tracking-widest hover:bg-gold-light transition-all shadow-lg"
              >
                <Send className="h-3.5 w-3.5" />
                Request Wholesale Quote
              </Link>
              <Link
                href="/products/garments"
                className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] py-3 px-8 font-mono text-[11px] uppercase font-bold tracking-widest hover:border-gold hover:text-gold transition-all"
              >
                View All Garments
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Floating RFQ Cart ── */}
      {rfqCart.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-12 z-50 w-auto max-w-md bg-[#0D0D0D] border border-gold/30 text-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] font-mono flex flex-col gap-4">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-gold shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">RFQ Cart</span>
            </div>
            <span className="bg-gold/10 border border-gold/30 px-2 py-0.5 text-[9px] font-bold text-gold">
              {rfqCart.length} Selected
            </span>
          </div>
          <div className="max-h-24 overflow-y-auto divide-y divide-white/5 pr-2 scrollbar-none">
            {rfqCart.map(item => (
              <div key={item.id} className="py-2 flex items-center justify-between text-[10px]">
                <span className="truncate text-white/80 pr-3">{item.name}</span>
                <button onClick={() => toggleRfqItem(item)} className="text-red-400 hover:text-red-300">✕</button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsRfqModalOpen(true)}
            className="w-full bg-gold py-3 text-xs font-bold text-black uppercase tracking-widest hover:bg-gold-light transition-all text-center flex items-center justify-center gap-2"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Request Wholesale Price Quote</span>
          </button>
        </div>
      )}

      {/* ── RFQ Modal ── */}
      {isRfqModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm font-mono text-white">
          <div className="relative w-full max-w-lg border border-gold/20 bg-[#0E0E0E] p-8 shadow-2xl space-y-6">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Factory className="h-5 w-5 text-gold" />
                <h3 className="font-display text-lg font-bold uppercase">Treasure — Bulk Enquiry</h3>
              </div>
              <button
                onClick={() => setIsRfqModalOpen(false)}
                className="text-white/40 hover:text-white"
              >
                ✕
              </button>
            </div>

            {rfqSubmitted ? (
              <div className="py-8 text-center space-y-4 font-sans">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto rounded-full">
                  <CheckCircle2 className="h-8 w-8 animate-bounce" />
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">RFQ Submitted Successfully</h4>
                <p className="text-xs text-white/50 max-w-xs mx-auto leading-relaxed">
                  Our Dubai wholesale export desk will prepare a custom commercial tariff within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 space-y-2 text-[10px] uppercase text-white/60">
                  <span className="text-gold font-bold">Selected Products:</span>
                  <ul className="list-disc list-inside space-y-1 text-white/80">
                    {rfqCart.map(item => <li key={item.id} className="truncate">{item.name}</li>)}
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={rfqForm.name}
                      onChange={e => setRfqForm({...rfqForm, name: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">Company *</label>
                    <input
                      type="text"
                      required
                      value={rfqForm.company}
                      onChange={e => setRfqForm({...rfqForm, company: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">Email *</label>
                    <input
                      type="email"
                      required
                      value={rfqForm.email}
                      onChange={e => setRfqForm({...rfqForm, email: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">Quantity Range</label>
                    <select
                      value={rfqForm.quantity}
                      onChange={e => setRfqForm({...rfqForm, quantity: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:border-gold focus:outline-none"
                    >
                      <option value="50-250 Units">50 - 250 Units</option>
                      <option value="250-500 Units">250 - 500 Units</option>
                      <option value="500-1000 Units">500 - 1,000 Units</option>
                      <option value="1000-5000 Units">1,000 - 5,000 Units</option>
                      <option value="5000+ Units">5,000+ Units</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">Requirements</label>
                  <textarea
                    rows={3}
                    value={rfqForm.message}
                    onChange={e => setRfqForm({...rfqForm, message: e.target.value})}
                    placeholder="Custom labels, embroidery, FOB terms..."
                    className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submittingRfq}
                    className="w-full bg-gold py-3 text-xs font-bold text-black uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2"
                  >
                    {submittingRfq ? 'Submitting...' : <><Send className="h-3.5 w-3.5" /> Submit Wholesale RFQ</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
