'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { RevealText } from '@/components/ui/RevealText'
import { CounterStat } from '@/components/ui/CounterStat'

const PROPERTY_TYPES = [
  { icon: '🏨', name: 'Luxury Hotels', desc: 'Complete textile solutions for 5-star properties' },
  { icon: '🍽️', name: 'Restaurants & F&B', desc: 'Table linen, chef uniforms, and kitchen textiles' },
  { icon: '🏥', name: 'Healthcare Facilities', desc: 'Medical scrubs, bedding, and patient gowns' },
  { icon: '✈️', name: 'Airlines & Airports', desc: 'Cabin crew uniforms and in-flight textiles' },
  { icon: '🚢', name: 'Cruise Lines', desc: 'Maritime uniforms and cabin furnishings' },
  { icon: '🏢', name: 'Corporate Offices', desc: 'Professional workwear and office textiles' },
]

const CATEGORIES = [
  { name: 'Staff Uniforms', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=85', items: 'Chef coats, waiter uniforms, housekeeping attire, front desk wear' },
  { name: 'Bed & Bath Linen', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85', items: 'Bed sheets, duvet covers, pillowcases, bath towels, bathrobes' },
  { name: 'Table Linen', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=85', items: 'Tablecloths, napkins, runners, chair covers' },
  { name: 'Kitchen Textiles', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=85', items: 'Kitchen towels, aprons, oven mitts, cleaning cloths' },
]

export default function HospitalityPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=90"
          alt="Luxury hotel hospitality"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">Hospitality Division</span>
            <h1 className="mt-4 font-display text-display-lg font-semibold text-white">
              Outfitting the World&apos;s<br />Finest Hospitality
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm text-white/60">
              From hotel linens to staff uniforms — complete textile solutions for the hospitality industry.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)] py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          <CounterStat end={200} suffix="+" label="Hotels Served" />
          <CounterStat end={15} suffix="+" label="Countries" />
          <CounterStat end={50} suffix="K+" label="Units Monthly" />
          <CounterStat end={24} suffix="h" label="Response Time" />
        </div>
      </div>

      {/* Property Types */}
      <div className="py-section">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <RevealText>
            <h2 className="text-center font-display text-display-sm font-semibold text-[var(--text)]">
              Properties We Serve
            </h2>
          </RevealText>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROPERTY_TYPES.map((type, i) => (
              <motion.div
                key={type.name}
                className="group border border-[var(--border)] p-8 transition-all duration-500 hover:border-gold/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="text-3xl">{type.icon}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text)]">{type.name}</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{type.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="bg-[var(--bg-surface)] py-section">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <RevealText>
            <h2 className="font-display text-display-sm font-semibold text-[var(--text)]">
              Our Hospitality Range
            </h2>
          </RevealText>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                className="group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-display text-xl font-semibold text-white">{cat.name}</h3>
                    <p className="mt-1 text-xs text-white/60">{cat.items}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Branding */}
      <div className="py-section">
        <div className="mx-auto max-w-[1440px] px-6 text-center lg:px-12">
          <RevealText>
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">Custom Branding</span>
            <h2 className="mt-3 font-display text-display-sm font-semibold text-[var(--text)]">
              Your Logo. <span className="font-light italic">Our Quality.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-[var(--text-muted)]">
              Custom embroidery, private label, and bespoke manufacturing for hospitality brands worldwide. From design consultation to bulk delivery.
            </p>
            <Link href="/contact" className="btn-gold mt-8 inline-flex text-[10px]">
              Request Hospitality Catalogue <ArrowUpRight className="h-3 w-3" />
            </Link>
          </RevealText>
        </div>
      </div>
    </div>
  )
}
