'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound, useRouter } from 'next/navigation'
import { ChevronRight, Award, Layers, ShoppingBag, Send, Phone, ShieldCheck, Mail, CheckCircle2, Factory } from 'lucide-react'
import { brandStore } from '@/lib/brand-store'
import { ProductCard } from '@/components/products/ProductCard'
import { Brand, Product } from '@/types'
import { api } from '@/lib/api'

interface PageProps {
  params: Promise<{
    segment: string
    brand: string
  }>
}

export default function GarmentsBrandSegmentPage({ params }: PageProps) {
  const router = useRouter()
  const { segment: segmentSlug, brand: brandSlug } = use(params)
  
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
    // Validate segment slug
    if (segmentSlug !== 'core' && segmentSlug !== 'incentives') {
      notFound()
    }

    // Load active brand
    const b = brandStore.getBrandBySlug(brandSlug)
    if (!b) {
      notFound()
    }
    setBrand(b)

    // Load and filter garments products belonging to this brand and segment
    const allProducts = brandStore.getProducts()
    const brandProducts = allProducts.filter(p => {
      const isGarment = p.division_id === 'Garments' || p.division?.slug === 'garments'
      const isBrandMatch = p.brand_slug === brandSlug
      const isSegmentMatch = segmentSlug === 'core' ? !p.is_offer : p.is_offer
      return isGarment && isBrandMatch && isSegmentMatch
    })
    setProducts(brandProducts)
  }, [brandSlug, segmentSlug])

  if (!brand) return null

  // Extract all categories active for this brand/segment
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category?.name || p.category_id || 'Formal Shirts')))]

  // Filter products by category
  const filteredProducts = products.filter(p => {
    if (activeCategory === 'all') return true
    const catName = p.category?.name || p.category_id || 'Formal Shirts'
    return catName.toLowerCase() === activeCategory.toLowerCase()
  })

  // RFQ Cart Helpers
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
      // Submit consolidated RFQ request to backend (enquiry mock API)
      await api.submitEnquiry({
        name: rfqForm.name,
        company: rfqForm.company,
        email: rfqForm.email,
        phone: rfqForm.phone,
        business_type: 'Wholesale Distributor',
        product_interest: ['Garments & Fashion'],
        quantity_range: rfqForm.quantity,
        message: `Consolidated B2B RFQ Enquiry for Brand: ${brand.name.toUpperCase()} (${segmentSlug === 'core' ? 'Core Line' : 'Value Incentive'}). Selected Products: [${rfqCart.map(p => p.name).join(', ')}]. Buyer Message: ${rfqForm.message}`,
        source: 'RFQ Cart Drawer'
      })
      
      setSubmittingRfq(false)
      setRfqSubmitted(true)
      setRfqCart([])
      setTimeout(() => {
        setIsRfqModalOpen(false)
        setRfqSubmitted(false)
        setRfqForm({ name: '', company: '', email: '', phone: '', quantity: '500-1000 Units', message: '' })
      }, 2000)
    } catch (err) {
      console.error(err)
      setSubmittingRfq(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-16">
      
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-[1560px] px-6 py-4 lg:px-12">
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
          <span className="text-[var(--text-muted)] uppercase">{segmentSlug === 'core' ? 'Core Portfolio' : 'Value Incentives'}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[var(--text)]">{brand.name}</span>
        </nav>
      </div>

      {/* ── Dynamic Brand Cover Header Banner ── */}
      <section className="mx-auto max-w-[1560px] px-6 lg:px-12 mb-10">
        <div className="relative h-[250px] sm:h-[350px] w-full overflow-hidden border border-[var(--border)] bg-neutral-900 shadow-xl">
          
          {/* Desktop Cover vs Mobile Cover (falls back to premium Unsplash backdrop) */}
          <div className="absolute inset-0">
            <Image
              src={brand.logo_desktop || 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=1200&q=80'}
              alt={`${brand.name} banner cover`}
              fill
              className="object-cover hidden sm:block"
              priority
              sizes="1440px"
            />
            <Image
              src={brand.logo_mobile || brand.logo_desktop || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'}
              alt={`${brand.name} banner cover mobile`}
              fill
              className="object-cover block sm:hidden"
              priority
              sizes="640px"
            />
          </div>

          {/* Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

          {/* Header Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 text-white z-10">
            <div>
              <span className="bg-gold text-black font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                {segmentSlug === 'core' ? 'CORE LINE PORTFOLIO' : 'VOLUME INCENTIVE EXPORT'}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase mt-4">
                {brand.name}
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-mono text-gold uppercase tracking-wider font-semibold">
                {brand.tagline}
              </p>
              <p className="mt-3 text-xs text-white/70 max-w-2xl font-light leading-relaxed hidden md:block">
                {brand.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dynamic Category Selector Tabs ── */}
      <section className="mx-auto max-w-[1560px] px-6 lg:px-12 mb-8 sticky top-[72px] z-40 bg-[var(--bg)]/95 backdrop-blur-md py-4 border-b border-[var(--border)] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all rounded-none whitespace-nowrap ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-gold text-black shadow-md'
                    : 'text-[var(--text-muted)] border border-[var(--border)] bg-[var(--bg-surface)] hover:text-[var(--text)]'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Cart telemetry */}
          {rfqCart.length > 0 && (
            <div className="font-mono text-xs text-gold font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span>{rfqCart.length} PRODUCTS MARKED FOR B2B RFQ</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Products Display Grid with B2B Checkbox Selection ── */}
      <section className="mx-auto max-w-[1560px] px-6 lg:px-12">
        {filteredProducts.length === 0 ? (
          <div className="border border-[var(--border)] bg-[var(--bg-surface)] px-6 py-20 text-center">
            <p className="font-display text-2xl text-[var(--text)]">No items match filters</p>
            <p className="mt-3 text-sm text-[var(--text-muted)]">Check another category or check the Admin catalog.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((p, idx) => {
              const inCart = rfqCart.some(item => item.id === p.id)
              return (
                <div key={p.id} className="relative group flex flex-col justify-between">
                  
                  {/* B2B RFQ Cart Toggle (check box on top right) */}
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
                  
                  {/* RFQ Toggle Status Indicator Bar */}
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
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── B2B RFQ Consolidated Cart Floating Bottom Drawer ── */}
      {rfqCart.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-12 z-50 w-auto max-w-md bg-[#0D0D0D] border border-gold/30 text-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] font-mono flex flex-col gap-4">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-gold shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">RFQ Cart Consolidated</span>
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

      {/* ── RFQ Request Details Modal ── */}
      {isRfqModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm font-mono text-white">
          <div className="relative w-full max-w-lg border border-gold/20 bg-[#0E0E0E] p-8 shadow-2xl space-y-6">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Factory className="h-5 w-5 text-gold" />
                <h3 className="font-display text-lg font-bold uppercase">Consolidated Bulk Enquiry</h3>
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
                  Our Dubai wholesale export desks are parsing your query. A custom commercial tariff sheet will be routed within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 space-y-2 text-[10px] uppercase text-white/60">
                  <span className="text-gold font-bold">Query Items Stack:</span>
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
                    <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">Enterprise Company *</label>
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
                    <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">Email ID *</label>
                    <input
                      type="email"
                      required
                      value={rfqForm.email}
                      onChange={e => setRfqForm({...rfqForm, email: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">Enquiry Vol Quantity Range</label>
                    <select
                      value={rfqForm.quantity}
                      onChange={e => setRfqForm({...rfqForm, quantity: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:border-gold focus:outline-none"
                    >
                      <option value="50-250 Units">50 - 250 Units</option>
                      <option value="250-500 Units">250 - 500 Units</option>
                      <option value="500-1000 Units">500 - 1,000 Units</option>
                      <option value="1000-5000 Units">1,000 - 5,000 Units (Container)</option>
                      <option value="5000+ Units">5,000+ Units (Volumetric)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">Custom Branding / Logistics Requirements</label>
                  <textarea
                    rows={3}
                    value={rfqForm.message}
                    onChange={e => setRfqForm({...rfqForm, message: e.target.value})}
                    placeholder="Woven labels, customized embroidery, FOB Dubai terms, etc..."
                    className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submittingRfq}
                    className="w-full bg-gold py-3 text-xs font-bold text-black uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2"
                  >
                    {submittingRfq ? 'Deploying RFQ Telemetry...' : <><Send className="h-3.5 w-3.5" /> Submit Wholesale RFQ</>}
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
