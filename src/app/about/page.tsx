'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { CounterStat } from '@/components/ui/CounterStat'
import { GlobalPresence } from '@/components/home/GlobalPresence'
import { MapPin, Target, Lightbulb, Users, ShieldCheck, Factory, Globe2, Layers } from 'lucide-react'

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
    <div className="min-h-screen bg-[var(--bg)] mt-16">
      {/* Hero */}
      <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[70vh] w-full flex items-center overflow-hidden">
        <Image src="/images/about-hero.jpg" alt="WCC Fashions Manufacturing Facility" fill className="object-cover object-center" priority sizes="100vw" />

        {/* Subtle Dark Gradient Overlay behind text only */}
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent w-full md:w-[60%] lg:w-[45%] z-10" />

        <div className="relative z-20 w-full mx-auto max-w-[1440px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[50%] lg:w-[35%]"
          >
            <span className="font-display text-sm font-semibold tracking-widest text-gold uppercase mb-6 block">
              Since 2001
            </span>
            <h1 className="font-display text-5xl lg:textxl leading-[1.1] font-bold text-white mb-6">
              25+ Years of <br />
              <span className="font-bold text-gold">Manufacturing Excellence</span>
            </h1>
            <p className="text-sm leading-relaxed text-neutral-300 mb-10">
              Founded in Bangalore in 2001, WCC Fashions has grown into a global textile manufacturing partner with headquarters in Dubai. We operate 7 production facilities across 3 countries, delivering export-quality garments, uniforms, hospitality linens, home furnishings, and fragrances for B2B clients worldwide.
            </p>

          </motion.div>
        </div>
      </div>

      {/* Hero Stats Bar */}
      <div className="bg-black py-10 border-b border-[var(--border)]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 text-left lg:justify-center">
              <Globe2 className="w-10 h-10 text-gold stroke-[1.5] shrink-0" />
              <div>
                <p className="text-3xl font-bold text-white mb-1">50+</p>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Countries</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-left lg:justify-center">
              <Factory className="w-10 h-10 text-gold stroke-[1.5] shrink-0" />
              <div>
                <p className="text-3xl font-bold text-white mb-1">7</p>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Production<br className="hidden lg:block"/>Facilities</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-left lg:justify-center">
              <Layers className="w-10 h-10 text-gold stroke-[1.5] shrink-0" />
              <div>
                <p className="text-3xl font-bold text-white mb-1">6</p>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Specialized<br className="hidden lg:block"/>Divisions</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-left lg:justify-center">
              <Users className="w-10 h-10 text-gold stroke-[1.5] shrink-0" />
              <div>
                <p className="text-3xl font-bold text-white mb-1">25+</p>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Years<br className="hidden lg:block"/>Experience</p>
              </div>
            </div>
          </div>
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
      <div className="py-section bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <RevealText><h2 className="font-display text-display-sm font-semibold text-[var(--text)]">Our <span className='text-gold'>Journey</span></h2></RevealText>
            <p className="mt-6 text-sm text-[var(--text-muted)] leading-relaxed">
              From our origins in Bangalore in 2001 to our current status as a Dubai-headquartered global manufacturing group, our 25-year journey has been defined by continuous expansion, uncompromised quality, and strong B2B partnerships.
            </p>
          </div>

          {/* Desktop/Tablet Horizontal Timeline */}
          <div className="hidden lg:block relative w-full pb-10">
            <div className="relative flex justify-between items-center w-full min-h-[350px]">
              {/* Actual line that we'll draw through the middle */}
              <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-[var(--border)] -translate-y-1/2 rounded-full" />
              
              {/* Arrow head at the end of the line */}
              <div className="absolute right-0 top-1/2 w-4 h-4 border-t-[3px] border-r-[3px] border-[var(--border)] transform rotate-45 -translate-y-1/2 translate-x-[2px]" />

              {TIMELINE.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    className="relative flex flex-col items-center flex-1 group"
                    initial={{ opacity: 0, y: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {isEven ? (
                      <div className="absolute bottom-1/2 mb-3 flex flex-col items-center w-full px-2">
                        <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-4 xl:p-5 rounded-xl text-center shadow-lg group-hover:border-gold/50 transition-colors duration-300 relative w-full max-w-[190px]">
                          <span className="font-display text-2xl xl:text-3xl font-bold text-gold block mb-2 xl:mb-3">{item.year}</span>
                          <p className="text-[11px] xl:text-xs text-[var(--text-muted)] group-hover:text-neutral-300 transition-colors leading-relaxed">{item.event}</p>
                        </div>
                        <div className="h-6 xl:h-8 w-[2px] border-l-2 border-dashed border-[var(--border)] group-hover:border-gold/50 transition-colors duration-300 mt-3" />
                      </div>
                    ) : (
                      <div className="absolute top-1/2 mt-3 flex flex-col items-center w-full px-2">
                        <div className="h-6 xl:h-8 w-[2px] border-l-2 border-dashed border-[var(--border)] group-hover:border-gold/50 transition-colors duration-300 mb-3" />
                        <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-4 xl:p-5 rounded-xl text-center shadow-lg group-hover:border-gold/50 transition-colors duration-300 relative w-full max-w-[190px]">
                          <span className="font-display text-2xl xl:text-3xl font-bold text-gold block mb-2 xl:mb-3">{item.year}</span>
                          <p className="text-[11px] xl:text-xs text-[var(--text-muted)] group-hover:text-neutral-300 transition-colors leading-relaxed">{item.event}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* The Node on the line */}
                    <div className="w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-[var(--bg)] border-[3px] border-gold z-10 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:bg-gold transition-all duration-300" />
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="lg:hidden max-w-lg mx-auto">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                className="flex gap-5 border-l-[3px] border-[var(--border)] pb-8 pl-6 relative last:pb-0 last:border-transparent"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[var(--bg)] border-[3px] border-gold" />
                <div className="-mt-2 bg-[var(--bg-surface)] border border-[var(--border)] p-5 rounded-xl w-full hover:border-gold/50 transition-colors">
                  <span className="font-display text-2xl font-bold text-gold block mb-2">
                    {item.year}
                  </span>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.event}</p>
                </div>
              </motion.div>
            ))}
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
