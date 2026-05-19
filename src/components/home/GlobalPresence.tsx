'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

/* ── Mercator coordinate → SVG viewBox mapping ── */
function mc(lng: number, lat: number) {
  const x = 40 + ((lng + 180) / 360) * 920
  const y = 72 + ((90 - lat) / 180) * 456
  return { x: Math.round(x), y: Math.round(y) }
}

const HQ = { ...mc(55.27, 25.20) }

/* Label offsets (lx, ly) position text away from node to avoid overlap.
   anchor: 'start' | 'middle' | 'end' controls SVG text-anchor. */
const HUBS = [
  { id: 'ahm', city: 'Ahmedabad', country: 'India', role: 'Textile Weaving',           ...mc(72.57, 23.02), lx: -45, ly: 6,   anchor: 'end' as const },
  { id: 'lud', city: 'Ludhiana',  country: 'India', role: 'Knitwear & Hosiery',        ...mc(75.86, 30.90), lx: -40, ly: -8,  anchor: 'end' as const },
  { id: 'del', city: 'New Delhi', country: 'India', role: 'Fashion & Uniforms',        ...mc(77.21, 28.61), lx: 20,  ly: -18, anchor: 'start' as const },
  { id: 'ban', city: 'Bangalore', country: 'India', role: 'Origin R&D Centre',         ...mc(77.59, 12.97), lx: -45, ly: 10,  anchor: 'end' as const },
  { id: 'tir', city: 'Tirupur',   country: 'India', role: 'Bulk Garment Export',       ...mc(77.34, 11.11), lx: 20,  ly: 18,  anchor: 'start' as const },
  { id: 'dha', city: 'Dhaka',     country: 'Bangladesh', role: 'Volume Production',    ...mc(90.41, 23.81), lx: 18,  ly: -14, anchor: 'start' as const },
  { id: 'gua', city: 'Guangzhou', country: 'China', role: 'Specialised Manufacturing', ...mc(113.26, 23.13),lx: 18,  ly: -12, anchor: 'start' as const },
]

const EXPORTS = [
  { id: 'lon', label: 'London',    ...mc(-0.12,  51.51), lx: 14,  ly: -10, anchor: 'start' as const },
  { id: 'cai', label: 'Cairo',     ...mc(31.23,  30.07), lx: 14,  ly: -10, anchor: 'start' as const },
  { id: 'nai', label: 'Nairobi',   ...mc(36.82,  -1.29), lx: 14,  ly: 6,   anchor: 'start' as const },
  { id: 'lag', label: 'Lagos',     ...mc(3.37,    6.45), lx: -12, ly: 10,  anchor: 'end' as const },
  { id: 'nya', label: 'New York',  ...mc(-74.01, 40.71), lx: -14, ly: -10, anchor: 'end' as const },
  { id: 'riy', label: 'Riyadh',    ...mc(46.69,  24.69), lx: -14, ly: 12,  anchor: 'end' as const },
  { id: 'sin', label: 'Singapore', ...mc(103.82,  1.35), lx: 14,  ly: 12,  anchor: 'start' as const },
]

function arc(x1: number, y1: number, x2: number, y2: number, lift = 0.38) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const dist = Math.hypot(x2 - x1, y2 - y1)
  return `M${x1},${y1} Q${mx},${my - dist * lift} ${x2},${y2}`
}

const ZONES = [
  { name: 'GCC & Middle East', pct: 40, cities: 'UAE · KSA · Qatar · Oman · Kuwait' },
  { name: 'Africa', pct: 30, cities: 'Egypt · Kenya · Morocco · Nigeria' },
  { name: 'Europe & UK', pct: 20, cities: 'UK · France · Germany · Italy' },
  { name: 'Asia & Americas', pct: 10, cities: 'Singapore · Japan · USA · Canada' },
]

export function GlobalPresence() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState<string | null>(null)

  const activeHub = HUBS.find(h => h.id === active)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--bg)] py-16 sm:py-20 lg:py-28"
      data-cursor="view"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

        {/* ── Section label ── */}
        <motion.div
          className="mb-4 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--gold)]"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="h-[1px] w-6 bg-[var(--gold)]" />
          <span>05 — Global Presence</span>
        </motion.div>

        {/* ── Section header ── */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <motion.h2
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--text)] sm:text-5xl lg:text-display-sm"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            7 Cities. 3 Nations.{' '}
            <span className="font-light italic text-[var(--gold)]">One Chain.</span>
          </motion.h2>
          <motion.p
            className="max-w-xs text-sm leading-relaxed text-[var(--text-muted)]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            A vertically integrated industrial manufacturing group, dispatching from Dubai to 50+ nations.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════════════
            SIDE-BY-SIDE: Map (left) + Content (right)
        ══════════════════════════════════════════════════ */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">

          {/* ── LEFT: World Map ── */}
          <motion.div
            className="relative lg:col-span-7 overflow-hidden rounded-2xl border border-[var(--border)]"
            style={{ background: 'var(--bg-subtle)' }}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Map image */}
            <div className="relative w-full" style={{ paddingBottom: '56%' }}>
              <Image
                src="/world-map-bg.png"
                alt="WCC Garments global operations map"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
              {/* Overlay to blend with theme */}
              <div className="absolute inset-0 bg-[var(--bg)]/30 dark:bg-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-subtle)]/80 via-transparent to-[var(--bg-subtle)]/30" />

              {/* Ambient glow at Dubai */}
              <div
                className="pointer-events-none absolute"
                style={{
                  left: `${(HQ.x / 1000) * 100}%`,
                  top: `${(HQ.y / 600) * 100}%`,
                  transform: 'translate(-50%,-50%)',
                  width: '28%',
                  maxWidth: '200px',
                  aspectRatio: '1',
                  background: 'radial-gradient(circle, var(--gold-muted) 0%, transparent 70%)',
                }}
              />

              {/* SVG arcs + nodes */}
              <svg viewBox="0 0 1000 600" className="absolute inset-0 h-full w-full">
                <defs>
                  <filter id="gl" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="bgl" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Export arcs */}
                {EXPORTS.map((e, i) => (
                  <motion.path
                    key={'ea' + i}
                    d={arc(HQ.x, HQ.y, e.x, e.y, 0.4)}
                    fill="none"
                    stroke="var(--gold-light)"
                    strokeWidth="0.8"
                    strokeOpacity={0.3}
                    filter="url(#gl)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 2.2, delay: 0.4 + i * 0.12, ease: 'easeInOut' }}
                  />
                ))}

                {/* Hub arcs — gold/blue depending on state */}
                {HUBS.map((h, i) => (
                  <motion.path
                    key={'ha' + i}
                    d={arc(HQ.x, HQ.y, h.x, h.y, 0.3)}
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth={active === h.id ? 2 : 1.2}
                    strokeOpacity={active === h.id ? 0.9 : 0.45}
                    filter="url(#gl)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.6, delay: 0.2 + i * 0.08, ease: 'easeInOut' }}
                  />
                ))}

                {/* ── Export nodes with labels ── */}
                {EXPORTS.map((e) => {
                  const labelX = e.x + e.lx
                  const labelY = e.y + e.ly
                  return (
                    <g key={'en' + e.id}>
                      {/* Leader line */}
                      <line
                        x1={e.x} y1={e.y} x2={labelX} y2={labelY}
                        stroke="var(--gold-light)" strokeWidth="0.5" strokeOpacity={0.35}
                      />
                      {/* Dot */}
                      <circle cx={e.x} cy={e.y} r="3" fill="var(--gold-light)" opacity={0.6} filter="url(#gl)" />
                      {/* Label */}
                      <text
                        x={labelX} y={labelY}
                        textAnchor={e.anchor}
                        dominantBaseline="middle"
                        fill="var(--gold-light)"
                        fontSize="6" fontFamily="monospace" fontWeight="600" letterSpacing="0.8"
                        opacity={0.7}
                      >
                        {e.label.toUpperCase()}
                      </text>
                    </g>
                  )
                })}

                {/* ── Hub nodes with labels ── */}
                {HUBS.map((h) => {
                  const labelX = h.x + h.lx
                  const labelY = h.y + h.ly
                  const isActive = active === h.id
                  return (
                    <g
                      key={'hn' + h.id}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setActive(h.id)}
                      onMouseLeave={() => setActive(null)}
                    >
                      {/* Leader line */}
                      <motion.line
                        x1={h.x} y1={h.y} x2={labelX} y2={labelY}
                        stroke="var(--gold)"
                        strokeWidth={isActive ? 0.8 : 0.5}
                        strokeOpacity={isActive ? 0.7 : 0.3}
                        initial={{ pathLength: 0 }}
                        animate={inView ? { pathLength: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      />
                      {/* Glow ring */}
                      <motion.circle
                        cx={h.x} cy={h.y} r="14"
                        fill="var(--gold)"
                        opacity={isActive ? 0.15 : 0.05}
                        filter="url(#bgl)"
                        animate={isActive ? { r: [14, 20, 14] } : {}}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                      {/* Node dot */}
                      <circle
                        cx={h.x} cy={h.y}
                        r={isActive ? 5 : 3.5}
                        fill="var(--gold)"
                        opacity={isActive ? 1 : 0.7}
                        filter="url(#gl)"
                      />
                      {/* City label */}
                      <text
                        x={labelX} y={labelY}
                        textAnchor={h.anchor}
                        dominantBaseline="middle"
                        fill="var(--gold)"
                        fontSize={isActive ? 7 : 6}
                        fontFamily="monospace"
                        fontWeight={isActive ? 800 : 600}
                        letterSpacing="0.8"
                        opacity={isActive ? 1 : 0.65}
                      >
                        {h.city.toUpperCase()}
                      </text>
                    </g>
                  )
                })}

                {/* Dubai HQ — pulsing beacon */}
                <motion.circle
                  cx={HQ.x}
                  cy={HQ.y}
                  r="26"
                  fill="var(--gold)"
                  opacity={0.1}
                  animate={{ r: [26, 38, 26], opacity: [0.1, 0.03, 0.1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  filter="url(#bgl)"
                />
                <circle cx={HQ.x} cy={HQ.y} r="6" fill="var(--gold)" filter="url(#bgl)" opacity={0.6} />
                <circle cx={HQ.x} cy={HQ.y} r="3.5" fill="var(--gold)" />
                <text
                  x={HQ.x}
                  y={HQ.y - 13}
                  textAnchor="middle"
                  fill="var(--gold)"
                  fontSize="7.5"
                  fontFamily="monospace"
                  fontWeight="700"
                  letterSpacing="2"
                >
                  DUBAI HQ
                </text>
              </svg>
            </div>

            {/* Map bottom stat strip */}
            <div className="flex items-center justify-around border-t border-[var(--border)] bg-[var(--bg-surface)]/80 px-4 py-3 backdrop-blur-sm">
              {[
                ['7', 'Hubs'],
                ['3', 'Countries'],
                ['50+', 'Nations'],
                ['2001', 'Founded'],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="font-display text-xl font-bold text-[var(--text)]">{v}</p>
                  <p className="mt-0.5 font-mono text-[7px] uppercase tracking-widest text-[var(--text-muted)]">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Content Panel ── */}
          <motion.div
            className="flex flex-col gap-5 lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Dubai HQ card */}
            <div className="rounded-xl border border-[var(--gold)]/25 bg-[var(--gold-muted)] p-4 flex items-center gap-4">
              <div className="relative h-3 w-3 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--gold)] opacity-60" />
                <span className="relative block h-3 w-3 rounded-full bg-[var(--gold)]" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-[var(--text)] leading-none">
                  Dubai, UAE
                </p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                  Corporate HQ · Jebel Ali Export
                </p>
              </div>
            </div>

            {/* Hub list */}
            <div className="flex flex-col gap-1.5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--text-muted)] mb-1">
                Production Centres
              </p>
              {HUBS.map((hub, i) => (
                <motion.div
                  key={hub.id}
                  className={`group flex items-center gap-3 rounded-lg border px-4 py-3 cursor-default transition-all duration-300 ${
                    active === hub.id
                      ? 'border-[var(--gold)]/40 bg-[var(--gold-muted)]'
                      : 'border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--gold)]/20'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  onMouseEnter={() => setActive(hub.id)}
                  onMouseLeave={() => setActive(null)}
                >
                  {/* Index */}
                  <span className="w-5 shrink-0 font-mono text-[10px] font-bold text-[var(--text-muted)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Status dot */}
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${
                      active === hub.id
                        ? 'bg-[var(--gold)] shadow-[0_0_6px_var(--gold)]'
                        : 'bg-[var(--text-muted)]/30'
                    }`}
                  />

                  {/* City + role */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-display text-base font-bold leading-none transition-colors duration-300 ${
                        active === hub.id ? 'text-[var(--gold)]' : 'text-[var(--text)]'
                      }`}
                    >
                      {hub.city}
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)] truncate">
                      {hub.role}
                    </p>
                  </div>

                  {/* Country tag */}
                  <span className="shrink-0 rounded-full border border-[var(--border)] px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[var(--text-muted)]">
                    {hub.country}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════
            EXPORT DISTRIBUTION — below the map panel
        ══════════════════════════════════════════════════ */}
        <motion.div
          className="mt-16 border-t border-[var(--border)] pt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Left heading */}
            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--gold)]">
                Export Distribution
              </span>
              <h3 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--text)] sm:text-4xl">
                Four Continents.{' '}
                <span className="font-light italic text-[var(--text-muted)]">
                  One Supply Chain.
                </span>
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-muted)]">
                Containerised B2B wholesale cargo dispatched via Jebel Ali Port to distributors, hospitality groups, and institutional buyers in 50+ nations.
              </p>
            </div>

            {/* Right — zone bars */}
            <div className="space-y-5">
              {ZONES.map((z, i) => (
                <motion.div
                  key={z.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                >
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="font-display text-lg font-bold text-[var(--text)]">
                      {z.name}
                    </span>
                    <span className="font-display text-3xl font-bold text-[var(--gold)]">
                      {z.pct}%
                    </span>
                  </div>
                  <div className="h-[2px] w-full overflow-hidden rounded-full bg-[var(--border)]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'var(--gold)' }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${z.pct}%` } : {}}
                      transition={{ duration: 1.4, delay: 0.6 + i * 0.12, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    {z.cities}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
