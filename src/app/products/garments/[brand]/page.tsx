'use client'

import { use, useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  CheckCircle2,
  ChevronRight,
  Factory,
  Send,
  ShoppingBag,
} from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'
import { api } from '@/lib/api'
import { brandStore } from '@/lib/brand-store'
import { Brand, Product } from '@/types'
import TreasuryPage from '../treasury/page'

interface PageProps {
  params: Promise<{
    brand: string
  }>
}

type PageStatus = 'loading' | 'ready' | 'not-found'

export default function GarmentsBrandPage({ params }: PageProps) {
  const { brand: brandSlug } = use(params)

  if (brandSlug === 'treasure') {
    return <TreasuryPage />
  }

  const [status, setStatus] = useState<PageStatus>('loading')
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
    message: '',
  })

  useEffect(() => {
    setStatus('loading')

    const nextBrand = brandStore.getBrandBySlug(brandSlug)
    if (!nextBrand) {
      setStatus('not-found')
      return
    }

    const brandProducts = brandStore.getProducts().filter((product) => {
      const isGarment =
        product.division_id === 'Garments' || product.division?.slug === 'garments'
      return isGarment && product.brand_slug === brandSlug
    })

    setBrand(nextBrand)
    setProducts(brandProducts)
    setActiveCategory('all')
    setRfqCart([])
    setIsRfqModalOpen(false)
    setRfqSubmitted(false)
    setStatus('ready')
  }, [brandSlug])

  if (status === 'not-found') {
    notFound()
  }

  if (status !== 'ready' || !brand) {
    return (
      <div className="min-h-screen bg-[var(--bg)] pt-24 flex items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Loading...
        </span>
      </div>
    )
  }

  const categories = [
    'all',
    ...Array.from(
      new Set(products.map((product) => product.category?.name || product.category_id || 'Formal Shirts'))
    ),
  ]

  const filteredProducts = products.filter((product) => {
    if (activeCategory === 'all') {
      return true
    }

    const categoryName = product.category?.name || product.category_id || 'Formal Shirts'
    return categoryName.toLowerCase() === activeCategory.toLowerCase()
  })

  const toggleRfqItem = (product: Product) => {
    setRfqCart((currentCart) => {
      const exists = currentCart.some((item) => item.id === product.id)
      if (exists) {
        return currentCart.filter((item) => item.id !== product.id)
      }

      return [...currentCart, product]
    })
  }

  const handleRfqSubmit = async (event: FormEvent) => {
    event.preventDefault()
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
        message: `Brand RFQ for ${brand.name.toUpperCase()}. Selected Products: [${rfqCart.map((product) => product.name).join(', ')}]. Buyer Message: ${rfqForm.message}`,
        source: 'Brand RFQ Cart Drawer',
      })

      setSubmittingRfq(false)
      setRfqSubmitted(true)
      setRfqCart([])

      setTimeout(() => {
        setIsRfqModalOpen(false)
        setRfqSubmitted(false)
        setRfqForm({
          name: '',
          company: '',
          email: '',
          phone: '',
          quantity: '500-1000 Units',
          message: '',
        })
      }, 2000)
    } catch (error) {
      console.error(error)
      setSubmittingRfq(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-16">
      <div className="mx-auto max-w-[1560px] px-6 py-4 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]"
        >
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="transition-colors hover:text-gold">
            Products
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products/garments" className="transition-colors hover:text-gold">
            Garments
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[var(--text)]">{brand.name}</span>
        </nav>
      </div>

      <section className="mx-auto mb-10 max-w-[1560px] px-6 lg:px-12">
        <div className="relative h-[250px] w-full overflow-hidden border border-[var(--border)] bg-neutral-900 shadow-xl sm:h-[350px]">
          <div className="absolute inset-0">
            <Image
              src={brand.logo_desktop || 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=1200&q=80'}
              alt={`${brand.name} banner cover`}
              fill
              className="hidden object-cover sm:block"
              priority
              sizes="1440px"
            />
            <Image
              src={brand.logo_mobile || brand.logo_desktop || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'}
              alt={`${brand.name} banner cover mobile`}
              fill
              className="block object-cover sm:hidden"
              priority
              sizes="640px"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-white sm:p-12">
            <div>
              <span className="bg-gold px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
                Brand Portfolio
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
                {brand.name}
              </h1>
              <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-wider text-gold sm:text-sm">
                {brand.tagline}
              </p>
              <p className="mt-3 hidden max-w-2xl text-xs leading-relaxed text-white/70 md:block">
                {brand.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-40 mx-auto mb-8 max-w-[1560px] border-b border-[var(--border)] bg-[var(--bg)]/95 px-6 py-4 shadow-sm backdrop-blur-md lg:px-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-none px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory.toLowerCase() === category.toLowerCase()
                    ? 'bg-gold text-white shadow-md'
                    : 'border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>

          {rfqCart.length > 0 && (
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-gold">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              <span>{rfqCart.length} PRODUCTS MARKED FOR B2B RFQ</span>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1560px] px-6 lg:px-12">
        {filteredProducts.length === 0 ? (
          <div className="border border-[var(--border)] bg-[var(--bg-surface)] px-6 py-20 text-center">
            <p className="font-display text-2xl text-[var(--text)]">No items match this brand yet</p>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              Check another category or update the garments catalog in admin.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product, index) => {
              const inCart = rfqCart.some((item) => item.id === product.id)

              return (
                <div key={product.id} className="relative group flex flex-col justify-between">
                  <button
                    onClick={() => toggleRfqItem(product)}
                    className={`absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center border shadow-lg transition-all ${
                      inCart
                        ? 'scale-105 border-gold bg-gold text-white'
                        : 'border-white/20 bg-black/80 text-white hover:scale-105 hover:border-gold hover:bg-gold hover:text-white'
                    }`}
                    title={inCart ? 'Marked for Wholesale Quote' : 'Mark for Wholesale Quote'}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>

                  <ProductCard
                    product={{
                      ...product,
                      division: { name: product.division?.name || 'Garments', slug: 'garments' },
                      category: product.category || { name: product.category_id || 'Formal Shirts' },
                    }}
                    index={index}
                    divisionSlug="garments"
                  />

                  <div className="mt-3">
                    <button
                      onClick={() => toggleRfqItem(product)}
                      className={`w-full border py-2 text-center font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
                        inCart
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:border-gold/50 hover:text-[var(--text)]'
                      }`}
                    >
                      {inCart ? 'Marked for Wholesale RFQ' : '+ Add to Bulk RFQ Request'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {rfqCart.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 z-50 flex w-auto max-w-md flex-col gap-4 border border-gold/30 bg-[#0D0D0D] p-6 font-mono text-white shadow-[0_20px_50px_rgba(0,0,0,0.85)] sm:left-auto sm:right-12">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 shrink-0 text-gold" />
              <span className="text-xs font-bold uppercase tracking-wider">RFQ Cart Consolidated</span>
            </div>
            <span className="border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-bold text-gold">
              {rfqCart.length} Selected
            </span>
          </div>

          <div className="scrollbar-none max-h-24 divide-y divide-white/5 overflow-y-auto pr-2">
            {rfqCart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 text-[10px]">
                <span className="truncate pr-3 text-white/80">{item.name}</span>
                <button onClick={() => toggleRfqItem(item)} className="text-red-400 hover:text-red-300">
                  x
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsRfqModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 bg-gold py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-gold-light"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Request Wholesale Price Quote</span>
          </button>
        </div>
      )}

      {isRfqModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 font-mono text-white backdrop-blur-sm">
          <div className="relative w-full max-w-lg space-y-6 border border-gold/20 bg-[#0E0E0E] p-8 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Factory className="h-5 w-5 text-gold" />
                <h3 className="font-display text-lg font-bold uppercase">{brand.name} Bulk Enquiry</h3>
              </div>
              <button onClick={() => setIsRfqModalOpen(false)} className="text-white/40 hover:text-white">
                x
              </button>
            </div>

            {rfqSubmitted ? (
              <div className="space-y-4 py-8 text-center font-sans">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-8 w-8 animate-bounce" />
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wider text-white">RFQ Submitted Successfully</h4>
                <p className="mx-auto max-w-xs text-xs leading-relaxed text-white/50">
                  Our Dubai wholesale export desk is reviewing your request and will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className="space-y-4">
                <div className="space-y-2 border border-white/10 bg-white/5 p-4 text-[10px] uppercase text-white/60">
                  <span className="font-bold text-gold">Selected Products:</span>
                  <ul className="list-disc space-y-1 list-inside text-white/80">
                    {rfqCart.map((item) => (
                      <li key={item.id} className="truncate">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={rfqForm.name}
                      onChange={(event) => setRfqForm({ ...rfqForm, name: event.target.value })}
                      className="w-full border border-white/10 bg-black/60 p-3 text-xs text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">
                      Enterprise Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={rfqForm.company}
                      onChange={(event) => setRfqForm({ ...rfqForm, company: event.target.value })}
                      className="w-full border border-white/10 bg-black/60 p-3 text-xs text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">
                      Email ID *
                    </label>
                    <input
                      type="email"
                      required
                      value={rfqForm.email}
                      onChange={(event) => setRfqForm({ ...rfqForm, email: event.target.value })}
                      className="w-full border border-white/10 bg-black/60 p-3 text-xs text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">
                      Enquiry Volume Range
                    </label>
                    <select
                      value={rfqForm.quantity}
                      onChange={(event) => setRfqForm({ ...rfqForm, quantity: event.target.value })}
                      className="w-full border border-white/10 bg-black/60 p-3 text-xs text-white focus:border-gold focus:outline-none"
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
                  <label className="mb-1 block text-[9px] uppercase tracking-wider text-white/40">
                    Custom Branding / Logistics Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={rfqForm.message}
                    onChange={(event) => setRfqForm({ ...rfqForm, message: event.target.value })}
                    placeholder="Woven labels, customized embroidery, FOB Dubai terms, etc..."
                    className="w-full border border-white/10 bg-black/60 p-3 text-xs text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submittingRfq}
                    className="flex w-full items-center justify-center gap-2 bg-gold py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-gold-light"
                  >
                    {submittingRfq ? 'Deploying RFQ Telemetry...' : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Submit Wholesale RFQ
                      </>
                    )}
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
