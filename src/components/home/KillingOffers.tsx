'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const EXPANSION_CARDS = [
  {
    id: 'hospitality-textiles',
    name: 'Hospitality Textiles',
    tag: 'B2B Luxury Suites',
    badge: 'MAJOR EXPANSION',
    moq: '100 sets',
    image: '/images/hospitality.png',
    statusStyle: 'bg-emerald-500 text-white'
  },
  {
    id: 'uniforms-workwear',
    name: 'Uniforms & Workwear',
    tag: 'Industrial Apparel',
    badge: 'ESTABLISHED',
    moq: '50 units',
    image: '/images/uniform-workwear.png',
    statusStyle: 'bg-blue-500 text-white'
  },
  {
    id: 'fragrance-collection',
    name: 'Fragrance Collection',
    tag: 'Luxury Scent',
    badge: 'NEWLY STARTED',
    moq: '500 units',
    image: '/images/fragrance.png',
    statusStyle: 'bg-gold text-white'
  },
  {
    id: 'household-supplies',
    name: 'Household Supplies',
    tag: 'Linens & Essentials',
    badge: 'COMING SOON',
    moq: 'Bulk supplies',
    image: '/images/household.png',
    statusStyle: 'bg-amber-500 text-white'
  }
]

export function KillingOffers() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="relative overflow-hidden bg-[#0A0A0A] py-24"
      ref={ref}
    >
      {/* Background texture gradient overlay */}
      <div className="absolute inset-0 bg-black/85" />
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-5 items-center">
          {/* Left — Expansion Statement */}
          <div className="lg:col-span-2 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                OUR DIVERSIFIED FUTURE
              </span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-white uppercase leading-tight">
                Our Strategic
              </h2>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase text-gold leading-tight">
                Expansion
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral-400">
                While premium garments remain our core business, we have successfully expanded our industrial capacities to serve major developments in uniforms, luxury hospitality textiles, home decor, fragrance, and household supply.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-gold hover:text-black hover:border-gold"
              >
                Inquire For Bulk Orders
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* Right — 2x2 Clean Expansion Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {EXPANSION_CARDS.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Link
                    href={`/products?division=${card.id.split('-')[0]}`}
                    className="group relative block h-[260px] overflow-hidden border border-white/10 rounded-2xl bg-neutral-950 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(218,165,32,0.05)]"
                    data-cursor="view"
                  >
                    {/* Background Image with strong contrast overlay */}
                    <div className="absolute inset-0">
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-cover opacity-80 scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        sizes="(max-width: 1024px) 280px, 350px"
                      />
                      {/* Deep dark gradient overlay specifically for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                    </div>

                    {/* expansion badge top left */}
                    <span className={`absolute left-4 top-4 px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest rounded-full z-10 ${card.statusStyle}`}>
                      {card.badge}
                    </span>

                    {/* text contents bottom left */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold leading-none">
                        {card.tag}
                      </p>
                      <h3 className="mt-2 text-base font-bold text-white group-hover:text-gold transition-colors duration-300">
                        {card.name}
                      </h3>
                      <p className="mt-1 text-[11px] text-white/70">
                        MOQ: {card.moq}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-gold opacity-0 transition-all duration-300 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
                        Enquire Now <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}