'use client'

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Phone, Mail, MessageCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MOCK_PRODUCTS, SITE_CONFIG, COUNTRIES } from '@/lib/constants'
import { EnquirySchema, type EnquiryFormData } from '@/lib/validations'
import { ProductCard } from '@/components/products/ProductCard'
import { SplitSubmitButton } from '@/components/ui/SplitSubmitButton'

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [activeImage, setActiveImage] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enquirySuccess, setEnquirySuccess] = useState(false)

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug)

  const relatedProducts = MOCK_PRODUCTS
    .filter((p) => p.division_slug === product?.division_slug && p.slug !== slug)
    .slice(0, 4)

  const { register, handleSubmit, formState: { errors } } = useForm<EnquiryFormData>({
    resolver: zodResolver(EnquirySchema),
  })

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true)
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          product_name: product?.name,
          source: 'product_page',
        }),
      })
      setEnquirySuccess(true)
    } catch { /* handled */ } finally {
      setIsSubmitting(false)
    }
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-display text-2xl text-[var(--text)]">Product Not Found</h1>
          <Link href="/products" className="btn-gold mt-4 inline-flex text-[10px]">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  const specs = product.specifications || {}

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-6 text-[11px] text-[var(--text-muted)]">
          <Link href="/" className="hover:text-gold">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-gold">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/products?division=${product.division_slug}`} className="hover:text-gold">
            {product.division}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[var(--text)]">{product.name}</span>
        </nav>

        {/* Two Column Layout */}
        <div className="grid gap-12 pb-20 lg:grid-cols-5">
          {/* Left — Image Gallery (60%) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-surface)]" data-cursor="view">
              <Image
                src={product.images[activeImage] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {product.is_new && (
                <span className="absolute left-4 top-4 bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                  New
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-20 overflow-hidden transition-all ${
                      activeImage === i ? 'ring-2 ring-gold' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right — Product Details (40%) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block border border-gold/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
              {product.division}
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold text-[var(--text)] lg:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              {product.short_description}
            </p>

            {/* Divider */}
            <div className="my-6 h-[1px] bg-gold/20" />

            {/* Specifications */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
                Specifications
              </h3>
              <div className="mt-4 space-y-0">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="flex border-b border-[var(--border)] py-3">
                    <span className="w-32 flex-shrink-0 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-sm text-[var(--text)]">{String(value)}</span>
                  </div>
                ))}
                {product.moq && (
                  <div className="flex border-b border-[var(--border)] py-3">
                    <span className="w-32 flex-shrink-0 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">MOQ</span>
                    <span className="text-sm font-medium text-gold">{product.moq}</span>
                  </div>
                )}
                {product.lead_time && (
                  <div className="flex border-b border-[var(--border)] py-3">
                    <span className="w-32 flex-shrink-0 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Lead Time</span>
                    <span className="text-sm text-[var(--text)]">{product.lead_time}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Suitable For */}
            {product.suitable_for.length > 0 && (
              <div className="mt-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
                  Suitable For
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.suitable_for.map((sf) => (
                    <span key={sf} className="border border-[var(--border)] px-3 py-1 text-xs text-[var(--text)]">
                      {sf}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex w-full items-center justify-center gap-2 border border-gold bg-gold py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-black transition-all hover:bg-gold-light">
                <Phone className="h-3.5 w-3.5" /> Call to Enquire
              </a>
              <a href={`mailto:${SITE_CONFIG.email}?subject=Enquiry: ${product.name}`} className="flex w-full items-center justify-center gap-2 border border-[var(--border)] py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text)] transition-all hover:border-gold hover:text-gold">
                <Mail className="h-3.5 w-3.5" /> Email Us
              </a>
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in: ${product.name}`} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 border border-[var(--border)] py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text)] transition-all hover:border-gold hover:text-gold">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>

            {/* Mini Enquiry Form */}
            <div className="mt-10 border border-[var(--border)] p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--text)]">
                Enquire About This Product
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
                <input {...register('name')} placeholder="Your Name *" className={`w-full border bg-transparent px-3 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:border-gold ${errors.name ? 'border-red-500' : 'border-[var(--border)]'}`} />
                <input {...register('company')} placeholder="Company *" className={`w-full border bg-transparent px-3 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:border-gold ${errors.company ? 'border-red-500' : 'border-[var(--border)]'}`} />
                <select {...register('country')} className={`w-full border bg-transparent px-3 py-2.5 text-sm text-[var(--text)] focus:border-gold ${errors.country ? 'border-red-500' : 'border-[var(--border)]'}`}>
                  <option value="">Country *</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input {...register('phone')} placeholder="Phone *" className={`w-full border bg-transparent px-3 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:border-gold ${errors.phone ? 'border-red-500' : 'border-[var(--border)]'}`} />
                <input {...register('email')} type="email" placeholder="Email *" className={`w-full border bg-transparent px-3 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:border-gold ${errors.email ? 'border-red-500' : 'border-[var(--border)]'}`} />
                <div className="pt-2">
                  <SplitSubmitButton
                    loading={isSubmitting}
                    success={enquirySuccess}
                    label="Submit Enquiry"
                  />
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[var(--border)] py-20">
            <h2 className="font-display text-2xl font-semibold text-[var(--text)]">
              You May Also Like
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={{
                    ...p,
                    division: { name: p.division, slug: p.division_slug },
                    category: { name: p.category },
                  }}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
