'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { QuoteButton } from '@/components/ui/QuoteButton'
import { CounterStat } from '@/components/ui/CounterStat'

const SLIDE_SETS = [
  {
    id: 1,
    bg: '/hero-main.jpg',
    mid: '/hero-garments.jpg',
    fore: '/product-1.jpg',
    tag: 'Campaign 2026',
    title: 'Industrial Elegance',
  },
  {
    id: 2,
    bg: '/hero-linen.jpg',
    mid: '/hero-household.jpg',
    fore: '/product-3.jpg',
    tag: 'Hospitality Division',
    title: 'Precision Uniforms',
  },
  {
    id: 3,
    bg: '/hero-garments.jpg',
    mid: '/hero-main.jpg',
    fore: '/product-2.jpg',
    tag: 'Global Wholesale',
    title: 'Sovereign Textiles',
  },
]

export function HeroSection() {
  const { scrollYProgress } = useScroll()
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [activeSetIndex, setActiveSetIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSetIndex((prev) => (prev + 1) % SLIDE_SETS.length)
    }, 6000) // 6 seconds gives ample breathing room for the staggered reveals
    return () => clearInterval(interval)
  }, [])

  const currentSet = SLIDE_SETS[activeSetIndex]

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--bg)] pt-32 pb-20 lg:pt-40" data-cursor="view">
      {/* Cinematic subtle background motion */}
      <div className="absolute inset-0 z-0 bg-radial-hero pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none blur-[100px]">
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gold/30"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gold/10"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Side — Editorial Typography (7 Cols) */}
          <motion.div
            style={{ opacity: opacityText }}
            className="relative z-10 lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Margined Section Number */}
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              <span className="h-[1px] w-6 bg-gold" />
              <span>01 — Hero Experience</span>
            </div>

            {/* Giant Typography */}
            <div className="font-display text-[70px] font-bold leading-[0.9] tracking-tight text-[var(--text)] sm:text-[90px] xl:text-[120px]">
              <h1 className="shadow-headline">WESTERN</h1>
              <h1 className="shadow-headline">CLOTHING</h1>
              <h1 className="shadow-headline">COMPANY</h1>
            </div>

            {/* Gold Accent Statement */}
            <motion.p
              className="mt-6 font-display text-xl italic text-gold sm:text-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              &ldquo;Built in UAE. Manufactured for the World.&rdquo;
            </motion.p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
              An industrial fashion manufacturing group operating at global scale. Delivering bespoke garments, hospitality uniforms, home textiles, and premium raw materials across 50+ countries.
            </p>

            {/* Action Bar */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <QuoteButton href="/contact" />
            </div>

            {/* Bottom Authority Key Stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-[var(--border)] pt-8">
              <div className="border-l border-[var(--border)] pl-4">
                <CounterStat end={15} suffix="+" label="Years Expertise" />
              </div>
              <div className="border-l border-[var(--border)] pl-4">
                <CounterStat end={50} suffix="+" label="Export Nations" />
              </div>
              <div className="border-l border-[var(--border)] pl-4">
                <CounterStat end={10} suffix="K+" label="Monthly Units" />
              </div>
            </div>
          </motion.div>

          {/* Right Side — Massive Layered Staggered Cutout Composition (5 Cols) */}
          <div className="relative lg:col-span-5 h-[500px] lg:h-[700px] flex items-center justify-center pointer-events-none overflow-visible">
            <motion.div style={{ y: yBg }} className="relative w-full h-full flex items-center justify-center">
              
              {/* Layer 1: Background Silhouette (Slides left-to-right with rotation) */}
              <div className="absolute left-0 top-10 h-72 w-56 sm:h-96 sm:w-72 z-0 perspective-1000">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSet.bg}
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-lg border border-gold/20 shadow-2xl bg-black"
                    initial={{ opacity: 0, x: -60, rotateY: 15, rotateZ: -12 }}
                    animate={{ opacity: 0.8, x: 0, rotateY: 0, rotateZ: -4 }}
                    exit={{ opacity: 0, x: 60, rotateY: -15, rotateZ: 0 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Image src={currentSet.bg} alt="Hospitality Silhouette" fill className="object-cover filter grayscale contrast-125" sizes="300px" />
                    <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Layer 2: Irregular Clipping Garment Shape (Slides bottom-to-top with scale) */}
              <div className="absolute right-0 bottom-10 h-80 w-64 sm:h-[420px] sm:w-80 z-10 perspective-1000">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSet.mid}
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-lg border border-[var(--border)] shadow-2xl bg-black"
                    initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: 10 }}
                    animate={{ opacity: 0.9, y: 0, scale: 1, rotateX: 0, rotateZ: 6 }}
                    exit={{ opacity: 0, y: -80, scale: 0.8, rotateX: -10 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Image src={currentSet.mid} alt="Industrial Manufacturing" fill className="object-cover" sizes="350px" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Layer 3: Floating Foreground Premium Cutout (Spirals/Rotates in with dynamic scale) */}
              <div className="absolute z-20 h-96 w-72 sm:h-[500px] sm:w-80 perspective-1000">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSet.fore}
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl border border-gold/50 shadow-[0_30px_60px_rgba(59,130,246,0.15)] bg-black"
                    initial={{ opacity: 0, scale: 0.5, rotateZ: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateZ: -2 }}
                    exit={{ opacity: 0, scale: 1.3, rotateZ: -20 }}
                    transition={{ duration: 1.4, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Image src={currentSet.fore} alt="Premium Garment Cutout" fill className="object-cover" priority sizes="400px" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-white pt-16">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold drop-shadow-md">{currentSet.tag}</span>
                      <p className="font-display text-xl font-bold mt-1 drop-shadow-lg">{currentSet.title}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
