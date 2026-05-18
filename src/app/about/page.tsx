'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { CounterStat } from '@/components/ui/CounterStat'
import { GlobalPresence } from '@/components/home/GlobalPresence'
import { Scissors, Layers, ShieldCheck, Truck, Search, Package } from 'lucide-react'

const TIMELINE = [
  { year: '2010', event: 'WCC Garments founded in Dubai, UAE' },
  { year: '2012', event: 'First international export to East Africa' },
  { year: '2014', event: 'Hospitality division launched' },
  { year: '2016', event: 'Expanded to 20+ countries' },
  { year: '2018', event: 'Home furnishings & fragrance divisions added' },
  { year: '2020', event: 'Digital transformation & online catalogue' },
  { year: '2022', event: 'ISO certified manufacturing achieved' },
  { year: '2024', event: '50+ countries, 10,000+ products milestone' },
]

const PROCESS = [
  { icon: Search, name: 'Fabric Sourcing' },
  { icon: Layers, name: 'Pattern Making' },
  { icon: Scissors, name: 'Cutting' },
  { icon: Package, name: 'Stitching' },
  { icon: ShieldCheck, name: 'Quality Check' },
  { icon: Truck, name: 'Export' },
]

const VALUES = ['Quality', 'Precision', 'Reliability', 'Scale']

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <div className="border-b border-[var(--border)] pt-32 pb-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="font-display text-[120px] font-bold leading-none tracking-tighter text-[var(--text)] opacity-[0.06] lg:text-[180px]">
                WCC
              </span>
              <h1 className="-mt-8 font-display text-display-md font-semibold text-[var(--text)] lg:-mt-12">
                About <span className="font-light italic">WCC Garments</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--text-muted)]">
                A UAE-based industrial fashion manufacturing group delivering premium quality garments, uniforms, hospitality textiles, and more to global markets since 2010.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative aspect-[4/3] overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=85" alt="WCC Manufacturing" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[var(--bg-surface)] py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          <CounterStat end={15} suffix="+" label="Years" />
          <CounterStat end={50} suffix="+" label="Countries" />
          <CounterStat end={10} suffix="K+" label="Products" />
          <CounterStat end={6} label="Divisions" />
        </div>
      </div>

      {/* Timeline */}
      <div className="py-section">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <RevealText><h2 className="text-center font-display text-display-sm font-semibold text-[var(--text)]">Our Journey</h2></RevealText>
          <div className="mx-auto mt-12 max-w-2xl">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                className="flex gap-6 border-l-2 border-[var(--border)] py-6 pl-8 last:border-gold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="relative flex-shrink-0 font-display text-2xl font-bold text-gold">
                  {item.year}
                  <span className="absolute -left-[37px] top-1/2 h-3 w-3 -translate-y-1/2 border-2 border-gold bg-[var(--bg)]" />
                </span>
                <p className="text-sm text-[var(--text-muted)]">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Manufacturing Process */}
      <div className="bg-[var(--bg-surface)] py-section">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <RevealText><h2 className="text-center font-display text-display-sm font-semibold text-[var(--text)]">Where Quality <span className="font-light italic">Begins</span></h2></RevealText>
          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-4">
            {PROCESS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div key={step.name} className="flex items-center gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="flex h-16 w-16 flex-col items-center justify-center border border-[var(--border)]">
                    <Icon className="h-5 w-5 text-gold" />
                    <span className="mt-1 text-[8px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{step.name}</span>
                  </div>
                  {i < PROCESS.length - 1 && <span className="text-[var(--text-muted)]">→</span>}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Global Presence */}
      <GlobalPresence />

      {/* Values */}
      <div className="bg-[var(--bg-surface)] py-section">
        <div className="mx-auto max-w-[1440px] px-6 text-center lg:px-12">
          <RevealText><h2 className="font-display text-display-sm font-semibold text-[var(--text)]">Our Core Values</h2></RevealText>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {VALUES.map((val, i) => (
              <motion.div key={val} className="border border-[var(--border)] px-12 py-8 transition-all hover:border-gold/30" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <span className="font-display text-xl font-semibold text-gold">{val}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
