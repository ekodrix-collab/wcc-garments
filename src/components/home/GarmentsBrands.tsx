'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Award, ArrowUpRight, ShieldCheck, Layers, Cpu, Sparkles } from 'lucide-react'
import { brandStore } from '@/lib/brand-store'
import { Brand } from '@/types'

// ── Crisp Premium Inline SVG Logos ──
function VandegraffSVG() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="160" fill="#8B1A1A" />
      {/* Curved V Swooshes */}
      <path d="M190 40 C175 40 178 70 200 80 C222 70 225 40 210 40 C195 40 198 75 190 40 Z" fill="white" opacity="0.9" />
      <path d="M195 48 C185 48 188 68 200 75 C212 68 215 48 205 48 C195 48 198 72 195 48 Z" fill="#8B1A1A" />
      <path d="M178 45 C190 75 210 75 222 45 C205 45 200 68 178 45 Z" fill="white" opacity="0.9" />
      {/* VANDEGRAFF Text */}
      <text x="50%" y="115" textAnchor="middle" fill="white" fontFamily="Cinzel, Georgia, serif" fontSize="23" fontWeight="bold" letterSpacing="0.25em">
        VANDEGRAFF
      </text>
      {/* SHIRTS & TROUSERS */}
      <text x="50%" y="138" textAnchor="middle" fill="#EAD8D8" fontFamily="Montserrat, Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="0.32em">
        SHIRTS & TROUSERS
      </text>
      {/* Registered sign */}
      <text x="345" y="103" fill="white" fontFamily="sans-serif" fontSize="6">®</text>
    </svg>
  )
}

function TreasureSVG() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circular Gate Crown Emblem Left */}
      <g transform="translate(45, 30)">
        {/* Crown top */}
        <path d="M10 20 L20 35 L40 15 L60 35 L70 20 L65 48 L15 48 Z" fill="#8B1A1A" />
        <circle cx="10" cy="18" r="2.5" fill="#8B1A1A" />
        <circle cx="40" cy="13" r="2.5" fill="#8B1A1A" />
        <circle cx="70" cy="18" r="2.5" fill="#8B1A1A" />
        {/* Curved Gate base */}
        <path d="M10 54 C10 65 30 78 40 78 C50 78 70 65 70 54 C55 54 48 70 40 78 C32 70 25 54 10 54 Z" fill="black" className="dark:fill-white" />
        <path d="M10 70 C25 80 55 80 70 70 C55 82 25 82 10 70 Z" fill="black" className="dark:fill-white" />
        <path d="M22 62 C30 54 50 54 58 62 C50 58 30 58 22 62 Z" fill="black" className="dark:fill-white" />
        <line x1="40" y1="48" x2="40" y2="78" stroke="black" className="dark:stroke-white" strokeWidth="2.5" />
      </g>
      {/* TREASURE Text */}
      <text x="145" y="93" fill="black" className="dark:fill-white" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="bold" letterSpacing="0.4em">
        TREASURE
      </text>
    </svg>
  )
}

function TomJackSVG() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Monogram crest */}
      <circle cx="85" cy="80" r="35" stroke="#DAA520" strokeWidth="2.5" />
      <circle cx="85" cy="80" r="29" stroke="#DAA520" strokeWidth="1" strokeDasharray="3 3" />
      {/* Intertwined T & J */}
      <path d="M72 65 L98 65 M85 65 L85 92 C85 98 78 100 74 97" stroke="#DAA520" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M92 73 L92 90 C92 96 82 98 78 92" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      {/* TOM & JACK text */}
      <text x="145" y="85" fill="black" className="dark:fill-white" fontFamily="Inter, sans-serif" fontSize="23" fontWeight="bold" letterSpacing="0.32em">
        TOM &amp; JACK
      </text>
      <text x="145" y="105" fill="#DAA520" fontFamily="sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.25em">
        ACTIVE LUXURY APPAREL
      </text>
    </svg>
  )
}

export function GarmentsBrands() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' })
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    setBrands(brandStore.getBrands())
  }, [])

  // Map segments based on B2B conventions
  const getSegmentSlug = (slug: string) => {
    return slug === 'tom-jack' ? 'incentives' : 'core'
  }

  // Predefined specifications array for Treasure, Tom & Jack, and Vandegraff
  const brandSpecs: Record<string, {
    tier: string
    colorClass: string
    gradientGlow: string
    borderHoverClass: string
    highlightLabel: string
    specs: { label: string; val: string }[]
  }> = {
    treasure: {
      tier: 'EXECUTIVE LUXURY TIER',
      colorClass: 'text-gold',
      gradientGlow: 'from-gold/5 via-transparent to-transparent',
      borderHoverClass: 'hover:border-gold/50',
      highlightLabel: 'Prestige & VIP Protocol',
      specs: [
        { label: 'Primary Fabric', val: '100% Combed Egyptian Cotton / Fine Merino Blend' },
        { label: 'Procurement Focus', val: 'Boardroom Presence, Luxury Front-of-House' },
        { label: 'Stitch Geometry', val: 'Bespoke Tailored Fit, Double-Needle Micro Stitching' },
        { label: 'Starting MOQ', val: '50 Units (VIP prioritized sampling)' }
      ]
    },
    'tom-jack': {
      tier: 'VERSATILE HYBRID TIER',
      colorClass: 'text-blue-400 dark:text-neutral-300',
      gradientGlow: 'from-blue-500/5 via-transparent to-transparent',
      borderHoverClass: 'hover:border-blue-400/50 dark:hover:border-neutral-400/50',
      highlightLabel: 'Contemporary Team & active',
      specs: [
        { label: 'Primary Fabric', val: 'Mercerized Cotton, Pique Blends, Comfort Stretch' },
        { label: 'Procurement Focus', val: 'Global Corporate Teams, Active Events, Hospitality' },
        { label: 'Stitch Geometry', val: 'Modern Classic Fit, Reinforced Flex Seams' },
        { label: 'Starting MOQ', val: '250 Units (Custom color dyeing)' }
      ]
    },
    vandegraff: {
      tier: 'OPERATIONAL VALUE TIER',
      colorClass: 'text-red-500',
      gradientGlow: 'from-red-600/5 via-transparent to-transparent',
      borderHoverClass: 'hover:border-red-500/50',
      highlightLabel: 'Industrial Grade & Cost-Efficiency',
      specs: [
        { label: 'Primary Fabric', val: 'Heavy Poly-Cotton Twill, Ripstop Cargo Poly-Blend' },
        { label: 'Procurement Focus', val: 'High-Volume Operational Crew, Field Workwear' },
        { label: 'Stitch Geometry', val: 'Industrial Loose Fit, Multi-Point Bar Tack Seams' },
        { label: 'Starting MOQ', val: '500 Units (Maximum scaled off-price)' }
      ]
    }
  }

  return (
    <section className="bg-[var(--bg)] border-t border-[var(--border)] py-16 md:py-24" ref={headerRef}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-gold shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                WCC FASHIONS APPAREL DIRECTORY
              </span>
            </div>
          </motion.div>
          
          <motion.h2
            className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--text)] uppercase"
            initial={{ opacity: 0, y: 25 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Garments Portfolio <span className="text-gold">Matrix</span>
          </motion.h2>
          
          <motion.p
            className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-muted)] max-w-2xl font-light"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            We have structured our manufacturing labels across a clear commercial spectrum—enabling global procurement officers to immediately target premium executive wear, durable operational garments, or hybrid team apparel.
          </motion.p>
        </div>

        {/* ── Psychological B2B Positioning Spectrum Bar (UX Anchor) ── */}
        <div className="relative mb-12 hidden md:block">
          {/* Gradient Track line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-gold/30 via-neutral-300/40 to-red-600/30" />
          
          {/* Symmetrical Columns Labels */}
          <div className="grid grid-cols-3 pt-4 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)]">
            <div className="text-left flex items-center gap-2">
              <span className="h-2 w-2 rounded-none bg-gold" />
              <span>EXECUTIVE LUXURY</span>
            </div>
            <div className="text-center flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-none bg-blue-400 dark:bg-neutral-300 animate-pulse" />
              <span>HYBRID APPAREL &amp; VERSATILITY</span>
            </div>
            <div className="text-right flex items-center justify-end gap-2">
              <span>OPERATIONAL EFFICIENCY &amp; VALUE</span>
              <span className="h-2 w-2 rounded-none bg-red-600" />
            </div>
          </div>
        </div>

        {/* ── Symmetrical Brand Matrix Grid ── */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {brands.map((brand, idx) => {
            const segmentSlug = getSegmentSlug(brand.slug)
            
            // Fetch spec configuration based on brand slug, default fallback for custom added brands
            const specConfig = brandSpecs[brand.slug as keyof typeof brandSpecs] || {
              tier: 'DYNAMIC PORTFOLIO TIER',
              colorClass: 'text-gold',
              gradientGlow: 'from-gold/5 via-transparent to-transparent',
              borderHoverClass: 'hover:border-gold/50',
              highlightLabel: 'General Procurement',
              specs: [
                { label: 'Primary Fabric', val: 'Standard Textile Base / Custom Blends' },
                { label: 'Procurement Focus', val: 'Configured dynamically in admin logs' },
                { label: 'Stitch Geometry', val: 'Standard fit parameters apply' },
                { label: 'Starting MOQ', val: 'On request' }
              ]
            }

            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 + idx * 0.1 }}
                className="group relative"
              >
                <Link
                  href={`/products/garments/${segmentSlug}/${brand.slug}`}
                  className={`relative block h-full overflow-hidden border border-[var(--border)] bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg)] p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 rounded-none flex flex-col justify-between ${specConfig.borderHoverClass}`}
                >
                  
                  {/* Faint Radial Background Glow */}
                  <div className={`absolute -top-24 -left-24 h-48 w-48 bg-gradient-to-br rounded-full opacity-60 filter blur-2xl transition-opacity group-hover:opacity-100 ${specConfig.gradientGlow}`} />

                  <div className="relative z-10 space-y-6">
                    
                    {/* Positioning Tier Header */}
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                      <span className={`font-mono text-[10px] font-extrabold uppercase tracking-widest ${specConfig.colorClass}`}>
                        {specConfig.tier}
                      </span>
                      <Layers className="h-3.5 w-3.5 text-[var(--text-muted)] opacity-60 shrink-0" />
                    </div>

                    {/* Dynamic Graphic SVG Logo centered */}
                    <div className="relative overflow-hidden aspect-[8/3] flex items-center justify-center p-3 bg-white/[0.01] border border-[var(--border)] transition-transform duration-500 group-hover:scale-[1.02]">
                      {brand.slug === 'treasure' && <TreasureSVG />}
                      {brand.slug === 'vandegraff' && <VandegraffSVG />}
                      {brand.slug === 'tom-jack' && <TomJackSVG />}

                      {/* Fallback support for dynamically added custom admin brands */}
                      {brand.slug !== 'treasure' && brand.slug !== 'vandegraff' && brand.slug !== 'tom-jack' && (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center font-mono">
                          {brand.logo_mobile ? (
                            <div className="relative w-full h-full max-w-[130px] aspect-[3/1]">
                              <Image src={brand.logo_mobile} alt={brand.name} fill className="object-contain" />
                            </div>
                          ) : (
                            <span className="font-display font-bold text-sm tracking-widest text-[var(--text)] uppercase">
                              {brand.name}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Slogan details */}
                    <div>
                      <h4 className="font-display text-sm font-bold text-[var(--text)] uppercase line-clamp-1">
                        {specConfig.highlightLabel}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)] font-light line-clamp-2">
                        {brand.description}
                      </p>
                    </div>

                    {/* Symmetrical B2B Fabric Telemetry Specifications Table */}
                    <div className="border border-[var(--border)] bg-black/[0.1] dark:bg-black/[0.4] rounded-none overflow-hidden font-mono text-[10px]">
                      <div className="bg-black/20 dark:bg-black/60 px-3.5 py-1.5 border-b border-[var(--border)] font-bold tracking-wider text-[var(--text-muted)] uppercase">
                        Technical Spec Matrix
                      </div>
                      <div className="divide-y divide-[var(--border)]">
                        {specConfig.specs.map((sp, sIdx) => (
                          <div key={sIdx} className="px-3.5 py-2.5 flex flex-col gap-1 sm:flex-row sm:items-start justify-between">
                            <span className="text-[9px] uppercase text-[var(--text-muted)] font-medium tracking-wider leading-relaxed shrink-0 w-24">
                              {sp.label}
                            </span>
                            <span className="text-[10px] text-[var(--text)] font-semibold text-left sm:text-right leading-relaxed font-sans">
                              {sp.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* bottom action row */}
                  <div className="mt-8 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-[10px] font-bold text-gold uppercase tracking-wider relative z-10">
                    <span>View Brand Portfolio</span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Dynamic Glowing Gold Top Bar Indicator on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
