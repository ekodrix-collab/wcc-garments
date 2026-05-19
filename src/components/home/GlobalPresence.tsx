'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

/* ── Mercator coordinate → SVG viewBox mapping ── */
function mc(lng: number, lat: number) {
  const x = 40  + ((lng + 180) / 360) * 920
  const y = 72  + ((90 - lat)  / 180) * 456
  return { x: Math.round(x), y: Math.round(y) }
}

const HQ = { ...mc(55.27, 25.20), label: 'Dubai, UAE', role: 'Corporate HQ · B2B Export Hub' }

const HUBS = [
  { id:'ahm', city:'Ahmedabad',  country:'India',      role:'Textile Weaving',           ...mc(72.57, 23.02) },
  { id:'lud', city:'Ludhiana',   country:'India',      role:'Knitwear & Hosiery',        ...mc(75.86, 30.90) },
  { id:'del', city:'New Delhi',  country:'India',      role:'Fashion & Uniforms',        ...mc(77.21, 28.61) },
  { id:'ban', city:'Bangalore',  country:'India',      role:'Origin R&D Centre',         ...mc(77.59, 12.97) },
  { id:'tir', city:'Tirupur',    country:'India',      role:'Bulk Garment Export',       ...mc(77.34, 11.11) },
  { id:'dha', city:'Dhaka',      country:'Bangladesh', role:'Volume Production',         ...mc(90.41, 23.81) },
  { id:'gua', city:'Guangzhou',  country:'China',      role:'Specialised Manufacturing', ...mc(113.26, 23.13) },
]

const EXPORTS = [
  { id:'lon', label:'London',    ...mc(-0.12,  51.51) },
  { id:'cai', label:'Cairo',     ...mc(31.23,  30.07) },
  { id:'nai', label:'Nairobi',   ...mc(36.82,  -1.29) },
  { id:'lag', label:'Lagos',     ...mc(3.37,    6.45) },
  { id:'nya', label:'New York',  ...mc(-74.01, 40.71) },
  { id:'riy', label:'Riyadh',    ...mc(46.69,  24.69) },
  { id:'sin', label:'Singapore', ...mc(103.82,  1.35) },
]

function arc(x1: number, y1: number, x2: number, y2: number, lift = 0.38) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const dist = Math.hypot(x2 - x1, y2 - y1)
  return `M${x1},${y1} Q${mx},${my - dist * lift} ${x2},${y2}`
}

const ZONES = [
  { name: 'GCC & Middle East', pct: 40, cities: 'UAE · KSA · Qatar · Oman · Kuwait' },
  { name: 'Africa',            pct: 30, cities: 'Egypt · Kenya · Morocco · Nigeria' },
  { name: 'Europe & UK',       pct: 20, cities: 'UK · France · Germany · Italy' },
  { name: 'Asia & Americas',   pct: 10, cities: 'Singapore · Japan · USA · Canada' },
]

export function GlobalPresence() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState<string | null>(null)

  const tooltip = [
    ...HUBS.map(h => ({ id: h.id, city: h.city, country: h.country, role: h.role })),
    ...EXPORTS.map(e => ({ id: e.id, city: e.label, country: 'Export Market', role: 'Distribution' })),
    { id: 'hq', city: 'Dubai', country: 'UAE', role: 'HQ · Export Command' },
  ].find(t => t.id === active)

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#06080F] text-white py-12 sm:py-16 lg:py-20" data-cursor="view">

      {/* ── HEADER ─────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mb-6 sm:mb-8">
        {/* Eyebrow */}
        <motion.div className="flex items-center gap-2.5 mb-5"
          initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: .5 }}>
          <span className="h-px w-6 bg-[#C9A84C]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[.3em] text-[#C9A84C]">
            05 — Global Network
          </span>
        </motion.div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <motion.h2
            className="font-display font-black tracking-tighter leading-[.9] text-white text-3xl sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .75, ease: [.76, 0, .24, 1] }}>
            Woven Across <span className="italic text-[#C9A84C]">Continents.</span>
          </motion.h2>
          <motion.p className="max-w-xs text-xs sm:text-sm leading-relaxed text-white/40"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: .3 }}>
            7 production centres across 3 countries — dispatched from Dubai to 50+ nations.
          </motion.p>
        </div>
      </div>

      {/* ── MAP ────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-5 sm:px-10 lg:px-16">
        <motion.div
          className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/[.07]"
          initial={{ opacity: 0, scale: .98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: .9 }}>

          {/* Map image — compact aspect ratio */}
          <div className="relative w-full" style={{ paddingBottom: '42%' }}>
            <Image
              src="/world-map-bg.png"
              alt="World map showing WCC Garments global operations"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
              priority
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080F]/60 via-transparent to-[#06080F]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06080F]/40 via-transparent to-[#06080F]/40" />

            {/* Gold ambient glow at Dubai */}
            <div className="pointer-events-none absolute" style={{
              left: `${(HQ.x / 1000) * 100}%`, top: `${(HQ.y / 600) * 100}%`,
              transform: 'translate(-50%,-50%)', width: '25%', maxWidth: '250px', aspectRatio: '1',
              background: 'radial-gradient(circle, rgba(201,168,76,.15) 0%, transparent 70%)',
            }} />

            {/* SVG arcs + nodes */}
            <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
              <defs>
                <filter id="gl" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="bgl" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <linearGradient id="ga" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F0C84C" stopOpacity=".9" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity=".35" />
                </linearGradient>
                <linearGradient id="ba" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity=".7" />
                  <stop offset="100%" stopColor="#88CCFF" stopOpacity=".5" />
                </linearGradient>
              </defs>

              {/* Export arcs */}
              {EXPORTS.map((e, i) => (
                <motion.path key={'ea' + i} d={arc(HQ.x, HQ.y, e.x, e.y, 0.4)}
                  fill="none" stroke="url(#ba)" strokeWidth="1" filter="url(#gl)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: .65 } : {}}
                  transition={{ duration: 2, delay: .4 + i * .12, ease: 'easeInOut' }} />
              ))}

              {/* Hub arcs */}
              {HUBS.map((h, i) => (
                <motion.path key={'ha' + i} d={arc(HQ.x, HQ.y, h.x, h.y, 0.3)}
                  fill="none" stroke={active === h.id ? '#FFE060' : 'url(#ga)'}
                  strokeWidth={active === h.id ? 1.8 : 1.2} filter="url(#gl)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: active === h.id ? 1 : .55 } : {}}
                  transition={{ duration: 1.6, delay: .25 + i * .08, ease: 'easeInOut' }} />
              ))}

              {/* Export nodes */}
              {EXPORTS.map((e) => (
                <g key={'en' + e.id} style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActive(e.id)} onMouseLeave={() => setActive(null)}>
                  <circle cx={e.x} cy={e.y} r="10" fill="#88CCFF" opacity=".04" filter="url(#gl)" />
                  <circle cx={e.x} cy={e.y} r="3" fill="#AADDFF" stroke="#FFF" strokeWidth=".6" filter="url(#gl)" />
                  {/* Labels hidden on small screens via font-size */}
                  <text x={e.x} y={e.y - 8} textAnchor="middle" fill="#88BBEE"
                    fontSize="6.5" fontFamily="monospace" fontWeight="700" letterSpacing="1"
                    className="hidden sm:block">
                    {e.label.toUpperCase()}
                  </text>
                </g>
              ))}

              {/* Hub nodes */}
              {HUBS.map((h) => (
                <g key={'hn' + h.id} style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActive(h.id)} onMouseLeave={() => setActive(null)}>
                  <motion.circle cx={h.x} cy={h.y} r="14" fill="#C9A84C"
                    opacity={active === h.id ? .16 : .06} filter="url(#bgl)"
                    animate={active === h.id ? { r: [14, 22, 14] } : {}}
                    transition={{ duration: 1.4, repeat: Infinity }} />
                  <circle cx={h.x} cy={h.y} r={active === h.id ? 5 : 3.5}
                    fill={active === h.id ? '#FFE060' : '#C9A84C'}
                    stroke="#FFE898" strokeWidth={active === h.id ? 1 : .4} filter="url(#gl)" />
                </g>
              ))}

              {/* Dubai HQ */}
              <motion.circle cx={HQ.x} cy={HQ.y} r="30" fill="#C9A84C"
                animate={{ r: [30, 44, 30], opacity: [.12, .04, .12] }}
                transition={{ duration: 2.5, repeat: Infinity }} filter="url(#bgl)" />
              <motion.circle cx={HQ.x} cy={HQ.y} r="16" fill="#C9A84C"
                animate={{ r: [16, 24, 16], opacity: [.2, .07, .2] }}
                transition={{ duration: 2.5, delay: .4, repeat: Infinity }} filter="url(#gl)" />
              <circle cx={HQ.x} cy={HQ.y} r="6" fill="#F0C84C" filter="url(#bgl)" />
              <circle cx={HQ.x} cy={HQ.y} r="3.5" fill="#FFFFFF"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setActive('hq')} onMouseLeave={() => setActive(null)} />
              <text x={HQ.x} y={HQ.y - 14} textAnchor="middle" fill="#F0C84C"
                fontSize="8" fontFamily="monospace" fontWeight="700" letterSpacing="2"
                className="hidden sm:block">DUBAI HQ</text>

              {/* Tooltip — only on desktop */}
              {tooltip && (
                <foreignObject x="14" y="12" width="180" height="80" className="hidden sm:block">
                  <div style={{
                    background: 'rgba(6,8,15,.88)', border: '1px solid rgba(201,168,76,.25)',
                    borderRadius: '10px', padding: '10px 13px', backdropFilter: 'blur(12px)',
                  }}>
                    <p style={{ fontFamily: 'monospace', fontSize: '7px', letterSpacing: '1.5px', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '3px' }}>{tooltip.country}</p>
                    <p style={{ fontFamily: 'Georgia,serif', fontSize: '16px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{tooltip.city}</p>
                    <p style={{ fontFamily: 'monospace', fontSize: '7.5px', color: 'rgba(255,255,255,.35)', marginTop: '5px' }}>{tooltip.role}</p>
                  </div>
                </foreignObject>
              )}
            </svg>
          </div>

          {/* Stats bar — responsive */}
          <div className="flex items-center justify-around border-t border-white/[.06] bg-[#06080F]/90 px-4 py-3 sm:py-4 backdrop-blur-md">
            {[['7', 'Hubs'], ['3', 'Countries'], ['50+', 'Nations'], ['25+', 'Years']].map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="font-display text-lg sm:text-xl font-black text-white leading-none">{v}</p>
                <p className="font-mono text-[7px] sm:text-[8px] uppercase tracking-widest text-white/25 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── HUB CARDS ──────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-2">
        <p className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[.3em] text-white/20 mb-4">Production Centres</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {/* Dubai HQ */}
          <motion.div className="flex flex-col justify-between rounded-xl border border-[#C9A84C]/30 bg-[#C9A84C]/8 p-3 sm:p-4"
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: .2 }}>
            <div className="relative h-1.5 w-1.5 mb-3">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#C9A84C] opacity-70" />
              <span className="relative block h-1.5 w-1.5 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,.9)]" />
            </div>
            <div>
              <p className="font-display text-xs sm:text-sm font-black text-[#C9A84C] leading-none">Dubai</p>
              <p className="font-mono text-[7px] sm:text-[8px] uppercase tracking-wider text-[#C9A84C]/50 mt-0.5">HQ · UAE</p>
            </div>
          </motion.div>

          {HUBS.map((h, i) => (
            <motion.div key={h.id}
              className={`flex flex-col justify-between rounded-xl border p-3 sm:p-4 cursor-default transition-all duration-300 ${
                active === h.id
                  ? 'border-[#C9A84C]/35 bg-[#C9A84C]/8'
                  : 'border-white/[.05] bg-white/[.02] hover:border-white/10'
              }`}
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .45, delay: .25 + i * .05 }}
              onMouseEnter={() => setActive(h.id)} onMouseLeave={() => setActive(null)}>
              <span className={`mb-3 block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                active === h.id ? 'bg-[#C9A84C] shadow-[0_0_6px_rgba(201,168,76,.8)]' : 'bg-white/15'
              }`} />
              <div>
                <p className={`font-display text-xs sm:text-sm font-black leading-none transition-colors duration-300 ${
                  active === h.id ? 'text-[#C9A84C]' : 'text-white'
                }`}>{h.city}</p>
                <p className="font-mono text-[7px] sm:text-[8px] uppercase tracking-wider text-white/25 mt-0.5">{h.country}</p>
                <p className="text-[9px] sm:text-[10px] text-white/30 mt-1.5 leading-snug hidden sm:block">{h.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── EXPORT ZONES ───────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-8 sm:pt-12 pb-4">
        <div className="border-t border-white/[.04] pt-8 sm:pt-10">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14 items-start">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .7, delay: .3 }}>
              <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[.3em] text-[#C9A84C]">Export Distribution</span>
              <h3 className="mt-3 font-display font-black tracking-tighter leading-[.92] text-white text-2xl sm:text-3xl lg:text-4xl">
                Four Continents.{' '}
                <span className="italic text-white/20">One Supply Chain.</span>
              </h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/35 max-w-xs">
                Containerised B2B wholesale cargo from Jebel Ali Port to distributors and institutional buyers in 50+ nations.
              </p>
            </motion.div>

            {/* Right — bars */}
            <div className="space-y-4 sm:space-y-5">
              {ZONES.map((z, i) => (
                <motion.div key={z.name}
                  initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: .55, delay: .35 + i * .08 }}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-display text-sm sm:text-base font-bold text-white">{z.name}</span>
                    <span className="font-display text-2xl sm:text-3xl font-black text-[#C9A84C]">{z.pct}%</span>
                  </div>
                  <div className="h-[2px] w-full rounded-full bg-white/[.06] overflow-hidden">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#C9A84C]/30"
                      initial={{ width: 0 }} animate={inView ? { width: `${z.pct}%` } : {}}
                      transition={{ duration: 1.4, delay: .45 + i * .12, ease: 'easeOut' }} />
                  </div>
                  <p className="mt-1 font-mono text-[8px] sm:text-[9px] text-white/20 uppercase tracking-wider">{z.cities}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
