'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Scissors, Layers, ShieldCheck, Truck, Search, Package } from 'lucide-react'

const SCENES = [
  {
    step: '01',
    title: 'Textile Sourcing & Inspection',
    desc: 'Uncompromising raw material selection from global yarn mills, verified through rigorous tension and density diagnostics.',
    image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?w=900&q=85',
    icon: Search,
  },
  {
    step: '02',
    title: 'Precision CAD Pattern Cutting',
    desc: 'Laser automated fabric slicing ensuring millimeter exactness across thousands of stacked textile layers simultaneously.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=85',
    icon: Scissors,
  },
  {
    step: '03',
    title: 'Industrial Assembly & Stitching',
    desc: 'High-speed automated and artisan needlecraft producing reinforced seams engineered for extreme commercial endurance.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=85',
    icon: Layers,
  },
  {
    step: '04',
    title: 'Flawless QA & Finishing',
    desc: 'Multi-stage optical and mechanical stress tests ensuring zero defects before garment pressing and sanitary enclosure.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=85',
    icon: ShieldCheck,
  },
  {
    step: '05',
    title: 'Secure Enclosure & Export',
    desc: 'Containerized logistics departing from Jebel Ali Port, Dubai directly to corporate hubs and distributors in 50+ countries.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=85',
    icon: Truck,
  },
]

export function ManufacturingStory() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#0A0A0A] text-white">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="absolute top-12 left-6 lg:left-12 z-20">
          <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
            <span className="h-[1px] w-6 bg-gold" />
            <span>04 — Horizontal Signature Story</span>
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight">
            The Dubai Manufacturing Pipeline
          </h2>
          <p className="mt-2 text-xs uppercase tracking-widest text-white/50">
            Scroll vertically to traverse the factory assembly stages
          </p>
        </div>

        {/* Horizontal Track */}
        <motion.div style={{ x }} className="flex gap-12 px-6 lg:px-12 pt-32">
          {SCENES.map((scene, idx) => {
            const Icon = scene.icon
            return (
              <div
                key={scene.step}
                className="relative h-[550px] w-[80vw] sm:w-[60vw] lg:w-[45vw] flex-shrink-0 overflow-hidden border border-white/10 bg-[#111] p-8 sm:p-12 transition-all duration-500 hover:border-gold/40 flex flex-col justify-between"
              >
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700">
                  <Image src={scene.image} alt={scene.title} fill className="object-cover" sizes="800px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Top Number & Icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-display text-6xl font-bold text-gold opacity-80">
                    {scene.step}
                  </span>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-black/60 backdrop-blur-md">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                </div>

                {/* Bottom Title & Description */}
                <div className="relative z-10 max-w-xl">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    Phase 0{idx + 1}
                  </span>
                  <h3 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
                    {scene.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
                    {scene.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
