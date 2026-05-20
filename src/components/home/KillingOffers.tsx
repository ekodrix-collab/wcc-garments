'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/constants'

export function KillingOffers() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const offerProducts = MOCK_PRODUCTS.filter((p) => p.is_offer)

  return (
    <section
      className="relative overflow-hidden bg-[#0A0A0A] py-section"
      ref={ref}
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600&q=80')",
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-5 items-center">
          {/* Left — Statement */}
          <div className="lg:col-span-2 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                Special Offers
              </span>
              <h2 className="mt-4 font-display text-display-sm font-semibold text-white uppercase">
                Premium Quality
              </h2>
              <h2 className="font-display text-display-sm font-bold uppercase text-gold">
                Exceptional Value
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/90">
                Limited time wholesale pricing on selected collections.
                Contact us for bulk order rates and exclusive deals
                for distributors.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 border border-gold px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-gold transition-all duration-400 hover:bg-gold hover:text-white"
              >
                Enquire About Offers
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </div>

          {/* Right — Offer Cards */}
          <div className="lg:col-span-3">
            <div
              className="grid grid-cols-2 grid-rows-2 gap-4 lg:gap-5"
              style={{ height: 'calc(100vh - 80px)' }}
            >
              {offerProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: [0.76, 0, 0.24, 1] }}
                  className="min-h-0 h-full"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group relative block h-full overflow-hidden border border-white/10 transition-colors duration-300 hover:border-gold/30"
                    data-cursor="view"
                  >
                    {/* Image fills entire card */}
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                      sizes="(max-width: 1024px) 280px, 350px"
                    />

                    {/* Dark gradient overlay at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badge — top left */}
                    {product.offer_label && (
                      <span className="absolute left-3 top-3 bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white z-10">
                        {product.offer_label}
                      </span>
                    )}

                    {/* Text overlay — bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                        {product.division}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-white">
                        {product.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-white/60">
                        MOQ: {product.moq}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Enquire <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Placeholder cards if no offers */}
              {offerProducts.length === 0 && (
                <div className="col-span-2 flex h-64 items-center justify-center rounded border border-white/10">
                  <p className="text-sm text-white/30">Offers coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}