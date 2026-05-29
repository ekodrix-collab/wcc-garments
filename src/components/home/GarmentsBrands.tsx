'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Layers, Shirt, Globe, Sparkles, Handshake } from 'lucide-react'
import { brandStore } from '@/lib/brand-store'
import { Brand } from '@/types'
import treasurelogo from "../../../public/images/tresurelogo.png"
import vandegrafflogo from "../../../public/images/vadegrafflogo.png"
import tomjacklogo from "../../../public/images/tomjacklogo.png"
import treasureimg from "../../../public/images/treaureimg.png"
import vandegraffimg from "../../../public/images/vendegraddimg.png"
import tomjackimg from "../../../public/images/tomkackimg.png"

import Image from 'next/image'

const BRAND_PANELS = [
  {
    id: 'treasure',
    bg: 'bg-[#1a1a1a]',
    accentColor: '#c9a84c',
    logo: treasurelogo,
    tagline: 'Crafted for Timeless Elegance',
    description: 'Sophisticated formalwear and refined essentials designed for the modern gentleman.',
    specializing: 'Formal Shirts, Premium Collections & Tailored Essentials',
    href: '/products/garments?brand=treasure',
    segment: 'Premium Line',
    image: treasureimg,
  },
  {
    id: 'vandegraff',
    bg: 'bg-[#7a1515]',
    accentColor: '#f0c4c4',
    logo: vandegrafflogo,
    tagline: 'Designed for Every Impression',
    description: 'Contemporary shirts and trousers blending comfort, style and uncompromised quality.',
    specializing: 'Shirts, Trousers, Smart Casuals & Everyday Classics',
    href: '/products/garments?brand=vandegraff',
    segment: 'Value Line',
    image: vandegraffimg,
  },
  {
    id: 'tom-jack',
    bg: 'bg-[#1a2535]',
    accentColor: '#c9a84c',
    logo: tomjacklogo,
    tagline: 'Effortless Style Everyday',
    description: 'Modern casualwear made for those who live life on their own terms.',
    specializing: 'Polo Tees, Casualwear, Basics & Lifestyle Collections',
    href: '/products/garments?brand=tom-jack',
    segment: 'Active Premium',
    image: tomjackimg,
  },
] as const

const VALUE_PROPS = [
  {
    icon: Shirt,
    title: 'PREMIUM QUALITY',
    desc: 'Finest fabrics and international manufacturing standards.',
  },
  {
    icon: Globe,
    title: 'GLOBAL PRESENCE',
    desc: 'Trusted by partners across the world.',
  },
  {
    icon: Sparkles,
    title: 'INNOVATIVE DESIGN',
    desc: 'Blending craftsmanship with contemporary trends.',
  },
  {
    icon: Handshake,
    title: 'SUSTAINABLE PARTNERSHIPS',
    desc: 'Building long-term relationships based on trust and reliability.',
  },
]


export function GarmentsBrands() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isContainerInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    setBrands(brandStore.getBrands())
  }, [])

  const customBrands = brands.filter(
    (brand) => brand.slug !== 'treasure' && brand.slug !== 'vandegraff' && brand.slug !== 'tom-jack'
  )

  return (
    <section className="bg-[var(--bg)] border-t border-[var(--border)]" ref={containerRef}>

      {/* ── TOP HERO SECTION ── */}
      <div className="relative overflow-hidden bg-[#f5f4f2] dark:bg-[var(--bg-subtle)] py-10 md:py-15">
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-center gap-3 mb-3"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
              OUR BRANDS
            </span>
          </motion.div>

          <motion.h2
            className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-[#1a1a1a] dark:text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            Our Manufacturing <span className="text-gold">Brands</span>
          </motion.h2>

          <motion.p
            className="mt-6 max-w-md text-sm leading-relaxed text-[#5a5a5a] dark:text-[var(--text-muted)]"
            initial={{ opacity: 0 }}
            animate={isContainerInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.25 }}
          >
            WCC operates specialized brands, each with a distinct identity
            and shared dedication to quality, craftsmanship and style.
          </motion.p>
        </div>
      </div>

      {/* ── THREE BRAND PANELS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {BRAND_PANELS.map((brand, index) => {
          return (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="relative"
            >
              <Link
                href={brand.href}
                className={`group relative flex flex-col overflow-hidden ${brand.bg} transition-all duration-500`}
                data-cursor="view"
              >
                {/* Background photo with overlay */}
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out "
                    style={{ backgroundImage: `url('${brand.image.src}')` }}
                  />
                  <div className="absolute inset-0 " />
                </div>

                {/* Image overlay content */}
                <div className="relative z-10 flex flex-col p-8" style={{ minHeight: '380px' }}>
                  {/* Logo area — top */}
                  <div className="mb-auto flex ">
                   <Image 
                      src={brand.logo}
                      alt={`${brand.segment} Logo`}
                      className="h-8 w-auto object-contain"
                    />
                  </div>

                  {/* Middle: tagline + divider + description */}
                  <div className="mt-8">
                    <h3
                      className="text-white font-bold leading-tight"
                    >
                      {brand.tagline}
                    </h3>
                    <div className="mt-4 h-px w-8" style={{ backgroundColor: brand.accentColor }} />
                    <p className="mt-4 text-white text-sm leading-relaxed">
                      {brand.description}
                    </p>
                  </div>

                </div>

                {/* White bottom strip: specializing + discover */}
                <div className="relative z-10 bg-white dark:bg-[var(--bg-surface)] px-8 py-5 border dark:border-[var(--border)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[8px] uppercase tracking-[0.3em] font-semibold mb-2 text-gold">
                        SPECIALIZING IN
                      </span>
                      <span className="text-[11px] text-[#3a3a3a] dark:text-[var(--text)] leading-snug">
                        {brand.specializing}
                      </span>
                    </div>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-gold group-hover:bg-gold">
                      <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] transition-colors group-hover:text-white" />
                    </div>
                  </div>
                  {/* Gold accent line */}
                  <div className="mt-4 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="flex justify-center py-10 border-t border-[var(--border)] bg-[var(--bg)]"
      >
        <Link href="/products/garments" className="btn-gold text-[10px]">
          View All Garments <ArrowUpRight className="h-4 w-4" />
        </Link>
      </motion.div>

      {/* ── VALUE PROPOSITIONS BAR ── */}
      {/* <div className="bg-[#f5f4f2] dark:bg-[var(--bg-subtle)] dark:border-[var(--border)]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#e0ddd9] p-5 dark:divide-[var(--border)] divide-y sm:divide-y-0">
            {VALUE_PROPS.map((prop, index) => {
              const Icon = prop.icon
              return (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.07 }}
                  className="flex items-start gap-4 px-8 py-8"
                >
                  <div className="shrink-0 mt-0.5">
                    <Icon className="h-8 w-8 text-[#888] dark:text-[var(--text-muted)]" strokeWidth={1.2} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#1a1a1a] dark:text-white mb-1">
                      {prop.title}
                    </span>
                    <span className="text-xs text-[#777] dark:text-[var(--text-muted)] leading-snug">
                      {prop.desc}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div> */}

      {/* ── CUSTOM BRANDS (dynamic) ── */}
      {customBrands.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isContainerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.45 }}
          className="bg-[var(--bg)] border-t border-[var(--border)] px-6 lg:px-12 py-8 mx-auto max-w-[1440px]"
        >
          <span className="mb-4 block font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
            Dynamically synchronized portfolios
          </span>
          <div className="flex flex-wrap gap-4">
            {customBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/products/garments?brand=${brand.slug}`}
                className="border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text)] transition-colors hover:border-gold hover:text-gold"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}