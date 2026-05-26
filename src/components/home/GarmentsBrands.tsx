'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Award, ArrowRight, ShieldCheck, Check, Layers, Sparkles, HelpCircle, Activity, Globe } from 'lucide-react'
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
        SHIRTS &amp; TROUSERS
      </text>
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
  const containerRef = useRef<HTMLDivElement>(null)
  const isContainerInView = useInView(containerRef, { once: true, margin: '-50px' })
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    setBrands(brandStore.getBrands())
  }, [])

  // Safely grab segment slugs
  const getSegmentSlug = (slug: string) => {
    return slug === 'tom-jack' ? 'incentives' : 'core'
  }

  // Find dynamic brands from state store for fallbacks/additional mappings
  const treasureDetails = brands.find(b => b.slug === 'treasure')
  const vandegraffDetails = brands.find(b => b.slug === 'vandegraff')
  const tomJackDetails = brands.find(b => b.slug === 'tom-jack')

  // Identify any custom admin brands added (not matching standard ones)
  const customBrands = brands.filter(b => b.slug !== 'treasure' && b.slug !== 'vandegraff' && b.slug !== 'tom-jack')

  return (
    <section className="bg-[var(--bg)] border-t border-[var(--border)] py-16 md:py-24" ref={containerRef}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-gold/30 bg-gold/5 mb-4"
          >
            <Award className="h-3.5 w-3.5 text-gold shrink-0 animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase font-semibold">
              WCC FASHIONS DIRECTORY
            </span>
          </motion.div>
          
          <motion.h2
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] uppercase"
            initial={{ opacity: 0, y: 15 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Our Manufacturing <span className="text-gold font-serif italic lowercase font-normal">Portfolio</span>
          </motion.h2>
          
          <motion.div 
            className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-6"
            initial={{ width: 0 }}
            animate={isContainerInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <motion.p
            className="font-sans text-base sm:text-lg text-[var(--text-muted)] font-light leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isContainerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            Two distinct philosophies. One commitment to quality.
          </motion.p>
        </div>

        {/* ── TWO-COLUMN PHILOSOPHY HEADERS ROW (Desktop only) ── */}
        <div className="hidden md:grid grid-cols-2 border border-[var(--border)] bg-[var(--bg-surface)] mb-12 font-mono overflow-hidden">
          {/* Left Column: Premium Philosophy */}
          <div className="py-6 px-8 border-r border-[var(--border)] text-left flex flex-col justify-center bg-gradient-to-r from-black/[0.02] to-transparent dark:from-white/[0.01]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-gold rounded-full" />
              <span className="text-xs uppercase text-gold font-bold tracking-[0.2em]">The Premium Line</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1.5">
              Where Excellence Meets Precision
            </span>
          </div>
          
          {/* Right Column: Value Philosophy */}
          <div className="py-6 px-8 text-left flex flex-col justify-center bg-gradient-to-r from-transparent to-black/[0.02] dark:to-white/[0.01]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full" />
              <span className="text-xs uppercase text-[var(--text)] dark:text-neutral-300 font-bold tracking-[0.2em]">The Value Line</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1.5">
              Where Quality Meets Affordability
            </span>
          </div>
        </div>

        {/* ── 2x2 GRID STRUCTURE ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* CARD 1: TRESURE (Top-Left under Premium Philosophy) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="group relative overflow-hidden border border-[var(--border)] bg-black h-[580px] sm:h-[620px] rounded-none flex flex-col justify-between"
          >
            {/* Cinematic Backdrop Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-45 group-hover:scale-[1.03] transition-transform duration-[4000ms] ease-out z-0"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80')` }}
            />
            {/* Dark dramatic overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95 z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

            {/* Top Row: SVG Logo container */}
            <div className="relative z-10 p-6 sm:p-8 flex justify-between items-start">
              <div className="w-[180px] bg-white/[0.03] backdrop-blur-md border border-white/10 p-2 sm:p-3 shadow-2xl">
                <TreasureSVG />
              </div>
              <span className="font-mono text-[9px] font-bold tracking-widest text-gold border border-gold/30 bg-gold/10 px-2 py-0.5 uppercase">
                Premium
              </span>
            </div>

            {/* Center & Bottom Information Overlay */}
            <div className="relative z-10 p-6 sm:p-8 space-y-6">
              
              {/* Copy & Highlights */}
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                  Premium Corporate Excellence
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  Egyptian cotton. Italian finishing. Export-grade quality. Crafted for global leaders demanding pristine fits and executive weight profiles.
                </p>
              </div>

              {/* Sectors Bullet Lists */}
              <div className="border-t border-white/10 pt-4">
                <span className="font-mono text-[9px] tracking-wider uppercase text-gold font-bold">Perfect For:</span>
                <div className="grid grid-cols-2 gap-2 mt-2 font-sans text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Banking Sector</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Luxury Hotels</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Corporate Uniforms</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Government</span>
                  </div>
                </div>
              </div>

              {/* Technical Telemetries Row */}
              <div className="grid grid-cols-2 border border-white/10 bg-black/60 backdrop-blur-sm divide-x divide-white/10 font-mono text-[10px] text-neutral-300">
                <div className="py-2 px-3 flex justify-between items-center">
                  <span className="text-[9px] uppercase text-neutral-500">MOQ</span>
                  <span className="font-bold text-white">500 PCS</span>
                </div>
                <div className="py-2 px-3 flex justify-between items-center">
                  <span className="text-[9px] uppercase text-neutral-500">STYLES</span>
                  <span className="font-bold text-gold">320+ STYLES</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/products/garments?brand=treasure"
                className="w-full flex items-center justify-between border border-gold/40 hover:border-gold bg-gold/10 hover:bg-gold text-white hover:text-black py-3 px-4 font-mono text-[10px] uppercase font-bold tracking-widest transition-all duration-300 group/btn shadow-lg"
              >
                <span>Explore Treasure</span>
                <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Top golden indicator line on card hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* CARD 2: VANDEGRAFF (Top-Right under Value Philosophy) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="group relative overflow-hidden border border-[var(--border)] bg-black h-[580px] sm:h-[620px] rounded-none flex flex-col justify-between"
          >
            {/* Cinematic Backdrop Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-45 group-hover:scale-[1.03] transition-transform duration-[4000ms] ease-out z-0"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80')` }}
            />
            {/* Dark dramatic overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95 z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

            {/* Top Row: SVG Logo container */}
            <div className="relative z-10 p-6 sm:p-8 flex justify-between items-start">
              <div className="w-[180px] bg-white/[0.03] backdrop-blur-md border border-white/10 p-2 sm:p-3 shadow-2xl">
                <VandegraffSVG />
              </div>
              <span className="font-mono text-[9px] font-bold tracking-widest text-neutral-300 border border-white/20 bg-white/5 px-2 py-0.5 uppercase">
                Value Line
              </span>
            </div>

            {/* Center & Bottom Information Overlay */}
            <div className="relative z-10 p-6 sm:p-8 space-y-6">
              
              {/* Copy & Highlights */}
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                  Smart Everyday Essentials
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  Quality fabrics. Competitive pricing. Volume production. Engineered with high-tensile weave structures to optimize scaled commercial operations.
                </p>
              </div>

              {/* Sectors Bullet Lists */}
              <div className="border-t border-white/10 pt-4">
                <span className="font-mono text-[9px] tracking-wider uppercase text-neutral-400 font-bold">Perfect For:</span>
                <div className="grid grid-cols-2 gap-2 mt-2 font-sans text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-red-500 shrink-0" />
                    <span>Retail Chains</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-red-500 shrink-0" />
                    <span>Mass Market</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-red-500 shrink-0" />
                    <span>E-Commerce</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-red-500 shrink-0" />
                    <span>Budget Retail</span>
                  </div>
                </div>
              </div>

              {/* Technical Telemetries Row */}
              <div className="grid grid-cols-2 border border-white/10 bg-black/60 backdrop-blur-sm divide-x divide-white/10 font-mono text-[10px] text-neutral-300">
                <div className="py-2 px-3 flex justify-between items-center">
                  <span className="text-[9px] uppercase text-neutral-500">MOQ</span>
                  <span className="font-bold text-white">1,500 PCS</span>
                </div>
                <div className="py-2 px-3 flex justify-between items-center">
                  <span className="text-[9px] uppercase text-neutral-500">STYLES</span>
                  <span className="font-bold text-red-400">280+ STYLES</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/products/garments?brand=vandegraff"
                className="w-full flex items-center justify-between border border-white/20 hover:border-red-500 bg-white/5 hover:bg-red-600 text-white hover:text-white py-3 px-4 font-mono text-[10px] uppercase font-bold tracking-widest transition-all duration-300 group/btn shadow-lg"
              >
                <span>Explore Vandegraff</span>
                <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Top red indicator line on card hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* CARD 3: TOM & JACK (Bottom-Left under Premium Philosophy) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="group relative overflow-hidden border border-[var(--border)] bg-black h-[580px] sm:h-[620px] rounded-none flex flex-col justify-between"
          >
            {/* Cinematic Backdrop Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-45 group-hover:scale-[1.03] transition-transform duration-[4000ms] ease-out z-0"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80')` }}
            />
            {/* Dark dramatic overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95 z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

            {/* Top Row: SVG Logo container */}
            <div className="relative z-10 p-6 sm:p-8 flex justify-between items-start">
              <div className="w-[180px] bg-white/[0.03] backdrop-blur-md border border-white/10 p-2 sm:p-3 shadow-2xl">
                <TomJackSVG />
              </div>
              <span className="font-mono text-[9px] font-bold tracking-widest text-gold border border-gold/30 bg-gold/10 px-2 py-0.5 uppercase">
                Active Premium
              </span>
            </div>

            {/* Center & Bottom Information Overlay */}
            <div className="relative z-10 p-6 sm:p-8 space-y-6">
              
              {/* Copy & Highlights */}
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                  Contemporary Premium Casual
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  Smart-casual for the modern professional. Business-casual meets urban lifestyle. The ultimate hybrid collection combining flex comfort with sleek aesthetics.
                </p>
              </div>

              {/* Sectors Bullet Lists */}
              <div className="border-t border-white/10 pt-4">
                <span className="font-mono text-[9px] tracking-wider uppercase text-gold font-bold">Perfect For:</span>
                <div className="grid grid-cols-2 gap-2 mt-2 font-sans text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Tech Startups</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Creative Agencies</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Executive Retreats</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Premium Fridays</span>
                  </div>
                </div>
              </div>

              {/* Technical Telemetries Row */}
              <div className="grid grid-cols-2 border border-white/10 bg-black/60 backdrop-blur-sm divide-x divide-white/10 font-mono text-[10px] text-neutral-300">
                <div className="py-2 px-3 flex justify-between items-center">
                  <span className="text-[9px] uppercase text-neutral-500">MOQ</span>
                  <span className="font-bold text-white">750 PCS</span>
                </div>
                <div className="py-2 px-3 flex justify-between items-center">
                  <span className="text-[9px] uppercase text-neutral-500">STYLES</span>
                  <span className="font-bold text-gold">180+ STYLES</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/products/garments?brand=tom-jack"
                className="w-full flex items-center justify-between border border-gold/40 hover:border-gold bg-gold/10 hover:bg-gold text-white hover:text-black py-3 px-4 font-mono text-[10px] uppercase font-bold tracking-widest transition-all duration-300 group/btn shadow-lg"
              >
                <span>Explore Tom &amp; Jack</span>
                <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Top gold indicator line on card hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* CARD 4: ALSO AVAILABLE (Bottom-Right under Value Philosophy) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="group relative overflow-hidden border border-[var(--border)] bg-black h-[580px] sm:h-[620px] rounded-none flex flex-col justify-between"
          >
            {/* Cinematic Backdrop Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-45 group-hover:scale-[1.03] transition-transform duration-[4000ms] ease-out z-0"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80')` }}
            />
            {/* Dark dramatic overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95 z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

            {/* Top Row: Custom WCC Logo container */}
            <div className="relative z-10 p-6 sm:p-8 flex justify-between items-start">
              <div className="w-[180px] bg-white/[0.03] backdrop-blur-md border border-white/10 p-2 sm:p-3 shadow-2xl flex items-center justify-center h-[52px] sm:h-[60px]">
                <div className="flex items-center gap-2 font-mono text-white text-[11px] tracking-[0.2em] font-extrabold uppercase">
                  <Layers className="h-4 w-4 text-gold shrink-0" />
                  <span>WCC GLOBAL</span>
                </div>
              </div>
              <span className="font-mono text-[9px] font-bold tracking-widest text-neutral-300 border border-white/20 bg-white/5 px-2 py-0.5 uppercase">
                Group Catalog
              </span>
            </div>

            {/* Center & Bottom Information Overlay */}
            <div className="relative z-10 p-6 sm:p-8 space-y-6">
              
              {/* Copy & Highlights */}
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                  Smart Premium Collections
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  Premium casual collections with contemporary edge. Complementing our corporate matrix, WCC structures robust seasonal hybrid accessories and custom outer shells.
                </p>
              </div>

              {/* Sectors Bullet Lists */}
              <div className="border-t border-white/10 pt-4">
                <span className="font-mono text-[9px] tracking-wider uppercase text-gold font-bold">Perfect For:</span>
                <div className="grid grid-cols-2 gap-2 mt-2 font-sans text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Custom Yarn Dyes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Performance Outerwear</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Technical Layering</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-gold shrink-0" />
                    <span>Fast-Track Logistics</span>
                  </div>
                </div>
              </div>

              {/* Technical Telemetries Row */}
              <div className="grid grid-cols-2 border border-white/10 bg-black/60 backdrop-blur-sm divide-x divide-white/10 font-mono text-[10px] text-neutral-300">
                <div className="py-2 px-3 flex justify-between items-center">
                  <span className="text-[9px] uppercase text-neutral-500">MOQ</span>
                  <span className="font-bold text-white">1,000 PCS</span>
                </div>
                <div className="py-2 px-3 flex justify-between items-center">
                  <span className="text-[9px] uppercase text-neutral-500">STYLES</span>
                  <span className="font-bold text-gold">410+ STYLES</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/products/garments"
                className="w-full flex items-center justify-between border border-gold/40 hover:border-gold bg-gold/10 hover:bg-gold text-white hover:text-black py-3 px-4 font-mono text-[10px] uppercase font-bold tracking-widest transition-all duration-300 group/btn shadow-lg"
              >
                <span>View Complete Catalog</span>
                <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Top gold indicator line on card hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          
        </div>

        {/* ── DYNAMIC MAPPED ADMIN BRANDS DRAWER (If any exist) ── */}
        {customBrands.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isContainerInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-[var(--border)] text-center font-mono text-[10px]"
          >
            <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block mb-4">
              Dynamically Synchronized Portfolios
            </span>
            <div className="flex flex-wrap justify-center gap-4">
              {customBrands.map(cb => {
                const isCustomIncentives = cb.slug.includes('incentives') || cb.slug === 'tom-jack'
                return (
                  <Link
                    key={cb.id}
                    href={`/products/garments/${isCustomIncentives ? 'incentives' : 'core'}/${cb.slug}`}
                    className="px-4 py-2 border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text)] hover:border-gold hover:text-gold transition-colors font-bold uppercase tracking-wider"
                  >
                    {cb.name}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* ── BOTTOM GLOBAL CATALOG CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href="/products/garments"
            className="inline-flex flex-col items-center gap-2 group"
          >
            <span className="inline-flex items-center gap-2 border border-[var(--border)] group-hover:border-gold bg-[var(--bg-surface)] hover:bg-gold hover:text-black text-[var(--text)] py-4 px-8 font-mono text-[11px] uppercase font-bold tracking-widest transition-all duration-300 shadow-xl">
              <span>View Complete Garments Catalog</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-wider mt-3 uppercase">
              Compare all brands side-by-side
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
