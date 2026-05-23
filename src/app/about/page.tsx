'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { CounterStat } from '@/components/ui/CounterStat'
import { GlobalPresence } from '@/components/home/GlobalPresence'
import { MapPin, Target, Lightbulb, Users, ShieldCheck, Factory, Globe2 } from 'lucide-react'

const TIMELINE = [
  { year: '2001', event: 'WCC Fashions founded in Bangalore, India.' },
  { year: '2005', event: 'Expanded production to key textile hubs: Ahmedabad, Delhi, and Ludhiana.' },
  { year: '2010', event: 'Strategic shift of Headquarters to Dubai, UAE for global export reach.' },
  { year: '2014', event: 'Launched dedicated Uniforms & Workwear and Hospitality textile divisions.' },
  { year: '2018', event: 'International expansion with production facilities in Bangladesh and China.' },
  { year: '2022', event: 'Achieved major export milestones serving B2B clients across 50+ nations.' },
  { year: '2026', event: 'Celebrating 25+ years of industrial-scale manufacturing excellence.' },
]

const LOCATIONS = [
  { country: 'UAE', city: 'Dubai', role: 'Global Headquarters', detail: 'Strategic hub for sales, customer relations, and export operations to GCC, Africa, and beyond.' },
  { country: 'India', city: '5 Production Centers', role: 'Primary Manufacturing', detail: 'Vertically integrated facilities across Ahmedabad, Ludhiana, Bangalore, Delhi, and Tirupur.' },
  { country: 'Bangladesh', city: 'Dhaka', role: 'Bulk Production', detail: 'High-volume, cost-effective manufacturing facility ensuring competitive pricing.' },
  { country: 'China', city: 'Guangzhou', role: 'Sourcing & Mfg', detail: 'Strategic sourcing operations and specialized raw material manufacturing.' },
]

const VALUES = [
  { icon: ShieldCheck, title: 'Quality Assurance', desc: 'Export-grade quality standards in every stitch and thread.' },
  { icon: Factory, title: 'Scale & Capability', desc: 'Industrial-scale manufacturing handling small programs to massive contracts.' },
  { icon: Globe2, title: 'Global Reach', desc: 'Manufacturing across 3 countries, supplying to businesses in 50+ nations.' },
  { icon: Users, title: 'Partnership Approach', desc: 'Building long-term relationships. We grow when you grow.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <div className="border-b border-[var(--border)] pt-32 pb-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="font-display text-sm font-semibold tracking-widest text-gold uppercase mb-6 block">
                Since 2001
              </span>
              <h1 className="font-display text-display-md font-semibold text-[var(--text)]">
                25+ Years of <span className="font-light italic text-gold">Manufacturing Excellence</span>
              </h1>
              <div className="mt-8 space-y-4 text-sm leading-relaxed text-[var(--text-muted)] max-w-lg">
                <p>
                  Established in 2001 in Bangalore, India, WCC Fashions (WCC Fashions LLC) has evolved into a premier multi-division industrial textile manufacturing group. With our global headquarters strategically located in Dubai, UAE, we have spent over a quarter-century perfecting the art of bulk textile production for B2B clients worldwide.
                </p>
                <p>
                  We are not just a supplier; we are your manufacturing partner. Operating 7 international production facilities across 3 countries, we deliver export-grade garments, professional uniforms, luxury hospitality linens, home furnishings, and specialized fragrances.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-surface)] rounded-none border border-[var(--border)] shadow-2xl group cursor-pointer">
              <Image src="/images/aboutpage-image.png" alt="WCC Fashions Manufacturing Facility" fill className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out rounded-none" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[var(--bg-surface)] py-16 border-b border-[var(--border)]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 lg:grid-cols-4">
          <CounterStat end={25} suffix="+" label="Years Experience" />
          <CounterStat end={7} label="Production Centers" />
          <CounterStat end={6} label="Specialized Divisions" />
          <CounterStat end={50} suffix="+" label="Countries Served" />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-section border-b border-[var(--border)] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-[var(--border)] hidden lg:block" />
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-2 gap-16 relative z-10">
          <motion.div className="bg-[var(--bg)] p-8 border border-[var(--border)]" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-4 mb-6">
              <Target className="w-8 h-8 text-gold" />
              <h2 className="font-display text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed">
              To provide businesses worldwide with reliable, scalable, and high-quality textile manufacturing solutions. We strive to simplify global procurement for our B2B partners through vertical integration, multi-country production, and an unwavering commitment to export-grade quality.
            </p>
          </motion.div>
          <motion.div className="bg-[var(--bg)] p-8 border border-[var(--border)]" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-4 mb-6">
              <Lightbulb className="w-8 h-8 text-gold" />
              <h2 className="font-display text-2xl font-semibold">Our Vision</h2>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed">
              To be the most trusted global manufacturing partner for corporate, hospitality, and retail sectors, recognized for our quarter-century of expertise, ethical production standards, and ability to deliver exceptional value at an industrial scale.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Global Manufacturing Footprint */}
      <div className="bg-[var(--bg-surface)] py-section border-b border-[var(--border)]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <RevealText><h2 className="font-display text-display-sm font-semibold text-[var(--text)]">Global <span className="font-light italic text-gold">Footprint</span></h2></RevealText>
            <p className="mt-4 text-[var(--text-muted)]">7 international production and sourcing locations across 3 countries, strategically headquartered in Dubai.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map((loc, i) => (
              <motion.div key={loc.country} className="border border-[var(--border)] bg-[var(--bg)] p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <MapPin className="w-6 h-6 text-gold mb-4" />
                <h3 className="font-display text-xl font-semibold mb-1">{loc.country}</h3>
                <p className="text-sm text-gold mb-4 font-medium">{loc.city}</p>
                <div className="h-[1px] w-full bg-[var(--border)] mb-4" />
                <p className="text-sm font-semibold text-[var(--text)] mb-2">{loc.role}</p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{loc.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Presence Component */}
      <GlobalPresence />

      {/* Timeline */}
      <div className="py-section bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <RevealText><h2 className="font-display text-display-sm font-semibold text-[var(--text)]">Our Journey</h2></RevealText>
              <p className="mt-6 text-[var(--text-muted)] leading-relaxed">
                From our origins in Bangalore in 2001 to our current status as a Dubai-headquartered global manufacturing group, our 25-year journey has been defined by continuous expansion, uncompromised quality, and strong B2B partnerships.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="max-w-2xl">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    className="flex gap-8 border-l-2 border-[var(--border)] py-6 pl-8 relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="absolute -left-[5px] top-[30px] h-2 w-2 rounded-full bg-gold" />
                    <span className="flex-shrink-0 font-display text-2xl font-bold text-gold w-20">
                      {item.year}
                    </span>
                    <p className="text-sm text-[var(--text-muted)] pt-1">{item.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[var(--bg-surface)] py-section border-t border-[var(--border)]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 text-center">
          <RevealText><h2 className="font-display text-display-sm font-semibold text-[var(--text)]">Our Core Values</h2></RevealText>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div key={val.title} className="border border-[var(--border)] bg-[var(--bg)] px-8 py-10 transition-all hover:border-gold/50 flex flex-col items-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Icon className="w-10 h-10 text-gold mb-6" />
                  <h3 className="font-display text-lg font-semibold text-[var(--text)] mb-3">{val.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
