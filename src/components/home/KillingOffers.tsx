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
    <section className="relative overflow-hidden bg-[#0A0A0A] py-section" ref={ref}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* Left — Statement */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                Special Offers
              </span>
              <h2 className="mt-4 font-display text-display-sm font-semibold text-white">
                Premium Quality.
              </h2>
              <h2 className="font-display text-display-sm font-light italic text-gold">
                Exceptional Value.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
                Limited time wholesale pricing on selected collections.
                Contact us for bulk order rates and exclusive deals
                for distributors.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 border border-gold px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-gold transition-all duration-400 hover:bg-gold hover:text-black"
              >
                Enquire About Offers
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </div>

          {/* Right — Offer Cards */}
          <div className="lg:col-span-3">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible">
              {offerProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: [0.76, 0, 0.24, 1] }}
                  className="min-w-[280px] flex-shrink-0 lg:min-w-0"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block overflow-hidden border border-white/10 bg-white/5 transition-colors duration-300 hover:border-gold/30"
                    data-cursor="view"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                        sizes="(max-width: 1024px) 280px, 350px"
                      />
                      {product.offer_label && (
                        <span className="absolute left-3 top-3 bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-black">
                          {product.offer_label}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                        {product.division}
                      </p>
                      <h3 className="mt-2 text-sm font-semibold text-white">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/40">
                        MOQ: {product.moq}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
