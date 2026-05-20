'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { CounterStat } from '@/components/ui/CounterStat'
import { ShieldCheck, Award, Globe, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-20" ref={ref} data-cursor="view">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Margined Section Number */}
        <div className=" flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
          <span className='text-[11px] font-semibold uppercase tracking-[0.4em] text-gold'>Corporate Identity</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* Mobile heading first, desktop hidden until right side */}
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-[var(--text)] sm:text-5xl">
                WCC <span className="font-bold text-gold font-['Anton'] uppercase">Since 2010</span>
              </h2>
            </motion.div>
          </div>

          {/* Left Side — Stunning High-End Editorial Image with Floating Badge (5 Cols) */}
          <motion.div
            className="relative lg:col-span-5 order-1 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[var(--border)] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=90"
                alt="WCC Industrial Garment Floor"
                fill
                className="object-cover contrast-110 filter"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Internal Image Overlay Copy */}
              <div className="absolute top-8 left-8 z-10 max-w-[85%] rounded-xl border border-white/10 bg-black/60 p-6 backdrop-blur-md text-white">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gold">
                  Dubai Operations Hub
                </span>
                <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Industrial Precision at Scale
                </h3>
              </div>
            </div>

            {/* Overlapping Floating Glass Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0A0A0A]/95 p-6 shadow-2xl backdrop-blur-xl lg:-right-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                <ShieldCheck className="h-6 w-6 text-gold" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold">
                  Certified Standards
                </span>
                <p className="font-body text-xs font-bold text-white">
                  ISO 9001:2015 / OEM Export Grade
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side — Editorial Copy & 3 Authority Stats (7 Cols) */}
          <div className="lg:col-span-7 lg:pl-8 xl:pl-16 order-2 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <h2 className="hidden lg:block font-display text-4xl font-bold leading-tight tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
                WCC <span className="font-bold text-gold font-['Anton'] uppercase">Since 2010</span>
              </h2>

              <div className="mt-8 space-y-6 text-sm font-normal leading-relaxed text-[var(--text-muted)] sm:text-base font-body">
                <p className="text-lg font-semibold text-[var(--text)]">
                  Western Clothing Company (WCC Garments LLC) is a premier UAE-based industrial fashion manufacturing group.
                </p>
                <p>
                  Operating out of our advanced Dubai manufacturing infrastructure, we deliver end-to-end commercial solutions—from precision pattern CAD and fabric sourcing to full-scale container export across 50+ nations worldwide.
                </p>
                <p>
                  Our multi-division capabilities bridge high-end fashion garments, heavy-duty industrial workwear, luxury hotel linens, and authentic Arabian fragrances under strict ISO quality benchmarks.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <Link
                  href="/about"
                  className="btn-gold font-mono text-xs font-bold tracking-[0.2em]"
                >
                  Explore Corporate Heritage
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* 3 Authority Stats Grid */}
            <motion.div
              className="mt-10 grid grid-cols-1 gap-8 border-t border-[var(--border)] pt-12 sm:grid-cols-3"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="border-l-2 border-gold pl-6 transition-colors hover:border-[var(--text)]">
                <CounterStat end={25} suffix="+" label="Years Expertise" />
                <p className="mt-2 font-body text-xs text-[var(--text-muted)]">
                  Unrivaled manufacturing history and procurement experience since our Dubai inception.
                </p>
              </div>

              <div className="border-l-2 border-gold pl-6 transition-colors hover:border-[var(--text)]">
                <CounterStat end={50} suffix="+" label="Export Nations" />
                <p className="mt-2 font-body text-xs text-[var(--text-muted)]">
                  Active global distribution networks spanning GCC, Africa, Europe, and the Americas.
                </p>
              </div>

              <div className="border-l-2 border-gold pl-6 transition-colors hover:border-[var(--text)]">
                <CounterStat end={10} suffix="K+" label="Monthly Capacity" />
                <p className="mt-2 font-body text-xs text-[var(--text-muted)]">
                  Industrial-scale output supporting massive tenders and commercial supply chains.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
