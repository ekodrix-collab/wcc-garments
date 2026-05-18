'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ArrowRight } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    images: string[]
    division?: { name: string; slug: string } | null
    category?: { name: string } | null
    moq: string | null
    is_new: boolean
    is_offer: boolean
    offer_label: string | null
    short_description?: string | null
  }
  index?: number
  coverColor?: string
}

export function ProductCard({ product, index = 0, coverColor = '#e8e5e0' }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const containerRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
        }
      },
      { threshold: 0.15 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative w-full overflow-hidden block"
        style={{ aspectRatio: '3/4', background: coverColor }}
        ref={containerRef}
      >
        {/* Product Image */}
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85'}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </motion.div>

        {/* Cinematic Shutter Reveal Cover */}
        <motion.div
          initial={{ y: '0%' }}
          animate={{ y: revealed ? '-102%' : '0%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: index * 0.04 }}
          className="absolute inset-0 z-10 origin-top pointer-events-none"
          style={{ background: coverColor }}
        />

        {/* Editorial Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-20 pointer-events-none">
          {product.is_new && (
            <span className="bg-[#0A0A0A] text-white px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.3em] font-body">
              NEW
            </span>
          )}
          {product.is_offer && (
            <span className="bg-[#8B1A1A] text-white px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.3em] font-body">
              {product.offer_label || 'OFFER'}
            </span>
          )}
        </div>

        {/* Slide-up "ENQUIRE NOW" Shutter Overlay on Hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-2 bg-[#0A0A0A] text-white py-4"
            >
              <FileText size={11} strokeWidth={1.5} />
              <span className="font-body text-[9px] font-bold tracking-[0.4em] uppercase text-white">
                REQUEST DETAILS
              </span>
              <ArrowRight size={10} className="text-white/70 ml-0.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Editorial Typographic Info */}
      <div className="mt-4 px-1 flex flex-col gap-1">
        <span className="font-body text-[9px] font-medium tracking-[0.3em] text-[var(--gold)] uppercase block">
          {product.division?.name || 'WCC DIVISION'}
        </span>
        
        <h3 className="font-body text-[11px] font-light tracking-[0.15em] text-[#0A0A0A] dark:text-white uppercase leading-relaxed transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-0.5 border-t border-[var(--border)] pt-2.5">
          <span className="font-display text-[14px] italic text-[var(--text-muted)] leading-none">
            {product.category?.name || 'Textile'}
          </span>
          {product.moq && (
            <span className="font-body text-[8px] font-bold tracking-[0.15em] text-[#0A0A0A]/50 dark:text-white/40 uppercase">
              MOQ: {product.moq} UNITS
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
