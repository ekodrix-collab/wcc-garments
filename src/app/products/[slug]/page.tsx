'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Phone, Mail, MessageCircle } from 'lucide-react'
import { MOCK_PRODUCTS, SITE_CONFIG } from '@/lib/constants'
import { ProductCard } from '@/components/products/ProductCard'

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [activeImage, setActiveImage] = useState(0)

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug)

  const relatedProducts = MOCK_PRODUCTS
    .filter((p) => p.division_slug === product?.division_slug && p.slug !== slug)
    .slice(0, 4)

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] pt-20">
        <div className="border border-[var(--border)] bg-[var(--bg-surface)] px-8 py-10 text-center">
          <h1 className="font-display text-2xl text-[var(--text)]">Product Not Found</h1>
          <Link href="/products" className="btn-gold mt-5 inline-flex text-[10px]">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  const specs = product.specifications || {}
  const whatsappText = encodeURIComponent(`Hi, I am interested in: ${product.name}`)

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-12">
        <nav className="flex flex-wrap items-center gap-2 py-6 text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
          <Link href="/" className="transition-colors hover:text-gold">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="transition-colors hover:text-gold">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/products?division=${product.division_slug}`} className="transition-colors hover:text-gold">
            {product.division}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[var(--text)]">{product.name}</span>
        </nav>

        <div className="border border-[var(--border)] bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_45%),var(--bg-surface)] p-5 md:p-7 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <motion.section
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="relative mx-auto aspect-[1/1] w-full max-w-[640px] overflow-hidden border border-[var(--border)] bg-[var(--bg)]" data-cursor="view">
                <Image
                  src={product.images[activeImage] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
                {product.is_new && (
                  <span className="absolute left-4 top-4 bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black">
                    New Arrival
                  </span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="mx-auto mt-4 grid w-full max-w-[640px] grid-cols-5 gap-2 md:gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={`${img}-${i}`}
                      onClick={() => setActiveImage(i)}
                      className={`relative aspect-square overflow-hidden border transition-all ${
                        activeImage === i
                          ? 'border-gold shadow-[0_0_0_1px_rgba(212,175,55,0.35)]'
                          : 'border-[var(--border)] opacity-75 hover:opacity-100'
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.section>

            <motion.aside
              className="lg:col-span-6 lg:sticky lg:top-28 lg:self-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <span className="inline-flex border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                {product.division}
              </span>

              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-[var(--text)] md:text-4xl">
                {product.name}
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                {product.short_description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="border border-[var(--border)] bg-[var(--bg)]/60 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Category</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text)]">{product.category}</p>
                </div>
                <div className="border border-[var(--border)] bg-[var(--bg)]/60 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">MOQ</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text)]">{product.moq || 'On request'}</p>
                </div>
                <div className="border border-[var(--border)] bg-[var(--bg)]/60 px-4 py-3 sm:col-span-2">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Lead Time</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text)]">{product.lead_time || 'As per production schedule'}</p>
                </div>
              </div>

              {Object.keys(specs).length > 0 && (
                <div className="mt-7 border border-[var(--border)] bg-[var(--bg)]/45 p-5">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Specifications</h2>
                  <div className="mt-4 space-y-3">
                    {Object.entries(specs).map(([key, value]) => (
                      <div key={key} className="flex items-start justify-between gap-5 border-b border-[var(--border)]/70 pb-3 last:border-none last:pb-0">
                        <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="text-right text-sm text-[var(--text)]">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(product.suitable_for ?? []).length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Suitable For</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.suitable_for.map((item) => (
                      <span key={item} className="border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text)]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 grid gap-2.5 sm:grid-cols-3">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center justify-center gap-2 border border-gold bg-gold px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-gold-light"
                >
                  <Phone className="h-4 w-4" /> Call
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}?subject=Enquiry: ${product.name}`}
                  className="inline-flex items-center justify-center gap-2 border border-[var(--border)] px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text)] transition-colors hover:border-gold/60 hover:text-gold"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[var(--border)] px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text)] transition-colors hover:border-gold/60 hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>

            </motion.aside>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="border-t border-[var(--border)] py-16 lg:py-20">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gold/90">Related Selection</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--text)] md:text-3xl">
                  You May Also Like
                </h2>
              </div>
              <Link
                href={`/products?division=${product.division_slug}`}
                className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors hover:text-gold"
              >
                View More
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
          </section>
        )}
      </div>
    </div>
  )
}
