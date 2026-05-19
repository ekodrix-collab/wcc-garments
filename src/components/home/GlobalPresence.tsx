'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CounterStat } from '@/components/ui/CounterStat'

const REGIONS = [
  { name: 'GCC & Middle East', hubs: 'Dubai, Abu Dhabi, Riyadh, Doha, Muscat, Manama', share: '40%' },
  { name: 'East & North Africa', hubs: 'Cairo, Nairobi, Addis Ababa, Casablanca', share: '30%' },
  { name: 'Europe & UK', hubs: 'London, Paris, Frankfurt, Milan', share: '20%' },
  { name: 'Asia & Americas', hubs: 'Singapore, Tokyo, New York, Toronto', share: '10%' },
]

export function GlobalPresence() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-section text-white" ref={ref} data-cursor="view">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Margined Section Number */}
        <div className="mb-6 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
          <span className="h-[1px] w-6 bg-gold" />
          <span>05 — International Export</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Summary */}
          <div className="lg:col-span-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
              Dubai Export Command Center
            </span>
            <h2 className="mt-3 font-display text-display-sm font-semibold">
              Supplying 50+ Nations <span className="font-light italic text-gold">from Jebel Ali Port</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Strategically positioned at the crossroads of global commerce, WCC Garments maintains an agile supply chain capable of deploying containerized garment and textile shipments within 48 hours of production completion.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <CounterStat end={50} suffix="+" label="Export Destinations" />
              <CounterStat end={48} suffix="h" label="Deployment Agility" />
            </div>
          </div>

          {/* Right Map & Glowing Supply Routes */}
          <div className="relative lg:col-span-7 h-[400px] sm:h-[500px] flex items-center justify-center">
            {/* Pulsing UAE Epicenter Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
              <span className="relative flex h-6 w-6 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-gold" />
              </span>
              <span className="mt-2 font-mono text-[10px] font-bold uppercase tracking-widest text-gold bg-black/80 px-2 py-0.5 rounded border border-gold/30">
                DUBAI HUB (HQ)
              </span>
            </div>

            {/* Simulated Animated Supply Route SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 800 500">
              {/* Route 1: Dubai to GCC/Europe */}
              <motion.path
                d="M400,250 Q300,150 200,180"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                strokeDasharray="6,6"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 3, ease: 'easeInOut' }}
              />
              <motion.circle cx="200" cy="180" r="4" fill="#3B82F6" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} />

              {/* Route 2: Dubai to Africa */}
              <motion.path
                d="M400,250 Q320,350 250,380"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                strokeDasharray="6,6"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
              />
              <motion.circle cx="250" cy="380" r="4" fill="#3B82F6" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2.5 }} />

              {/* Route 3: Dubai to Asia */}
              <motion.path
                d="M400,250 Q550,300 650,280"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                strokeDasharray="6,6"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 3, delay: 1, ease: 'easeInOut' }}
              />
              <motion.circle cx="650" cy="280" r="4" fill="#3B82F6" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2.2 }} />

              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.1)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Regional Hubs Breakout */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10 pt-12">
          {REGIONS.map((region, idx) => (
            <motion.div
              key={region.name}
              className="border border-white/10 bg-white/5 p-6 transition-colors hover:border-gold/30"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-gold">Zone 0{idx + 1}</span>
                <span className="font-mono text-xs font-bold text-white/40">{region.share}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-white">{region.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">{region.hubs}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
