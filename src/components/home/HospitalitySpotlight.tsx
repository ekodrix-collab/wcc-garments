'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const PROPERTY_TYPES = [
  { icon: 'LH', name: 'Luxury Hotels', count: '200+' },
  { icon: 'FB', name: 'Restaurants & F&B', count: '150+' },
  { icon: 'HC', name: 'Healthcare', count: '80+' },
  { icon: 'AL', name: 'Airlines', count: '30+' },
  { icon: 'CL', name: 'Cruise Lines', count: '20+' },
  { icon: 'CP', name: 'Corporate', count: '100+' },
]

export function HospitalitySpotlight() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden bg-[var(--bg-surface)] py-section" ref={ref}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left — Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="relative aspect-[4/5] border overflow-hidden shadow-md ">
              <Image
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80"
                alt="Healthcare hospitality linens in hospital setting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  Hospitality Division
                </span>
                <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                  Outfitting the World&apos;s Finest Hospitality
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                Hospitality Excellence
              </span>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--text)]">
                From hotel linens to staff <span className='text-gold'>uniforms</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                Complete hospitality textile solutions including premium bed linen,
                bath towels, table cloths, chef uniforms, and front-of-house attire.
                Custom embroidery and private label available.
              </p>
            </motion.div>

            {/* Property Types */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PROPERTY_TYPES.map((type, i) => (
                <motion.div
                  key={type.name}
                  className="border border-[var(--border)] p-4 transition-all duration-300 hover:border-gold/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                >
                  <span className="font-mono text-lg font-bold tracking-wider text-gold">{type.icon}</span>
                  <p className="mt-2 text-xs font-medium text-[var(--text)]">{type.name}</p>
                  <p className="text-[10px] text-gold">{type.count} clients</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/hospitality"
                className="btn-gold text-[10px]"
              >
                Explore Hospitality
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}