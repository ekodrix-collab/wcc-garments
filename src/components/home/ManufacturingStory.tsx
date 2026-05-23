'use client'

import Image from 'next/image'
import { Scissors, Layers, ShieldCheck, Truck, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { motion } from 'framer-motion'

const SCENES = [
  {
    step: '01',
    title: 'Textile Sourcing & Inspection',
    desc: 'Uncompromising raw material selection from global yarn mills, verified through rigorous tension and density diagnostics.',
    image: '/images/manufacturing-pipeline/textstyle sorcing.png',
    icon: Search,
  },
  {
    step: '02',
    title: 'Precision CAD Pattern Cutting',
    desc: 'Laser automated fabric slicing ensuring millimeter exactness across thousands of stacked textile layers simultaneously.',
    image: '/images/manufacturing-pipeline/2pipeline img.png',
    icon: Scissors,
  },
  {
    step: '03',
    title: 'Industrial Assembly & Stitching',
    desc: 'High-speed automated and artisan needlecraft producing reinforced seams engineered for extreme commercial endurance.',
    image: '/images/manufacturing-pipeline/3pipelineimg.png',
    icon: Layers,
  },
  {
    step: '04',
    title: 'Flawless QA & Finishing',
    desc: 'Multi-stage optical and mechanical stress tests ensuring zero defects before garment pressing and sanitary enclosure.',
    image: '/images/manufacturing-pipeline/4pipelineimg.png',
    icon: ShieldCheck,
  },
  {
    step: '05',
    title: 'Secure Enclosure & Export',
    desc: 'Containerized logistics departing from Jebel Ali Port, Dubai directly to corporate hubs and distributors in 50+ countries.',
    image: '/images/factory.jpeg',
    icon: Truck,
  },
]

export function ManufacturingStory() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'next' ? 320 : -320, behavior: 'smooth' })
  }

  return (
    <section className="bg-[#0A0A0A] text-white py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(218,165,32,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Heading */}
      <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
              MANUFACTURING EXCELLENCE
            </span>
          </div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            The Dubai manufacturing <span className='text-gold'>pipeline</span>
          </h2>
          <p className="mt-3 text-xs uppercase tracking-widest text-white/50 font-mono">
            ✦ Five stages from raw textile to global distribution
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => scroll('prev')}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-all duration-300 active:scale-95"
            aria-label="Previous Step"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('next')}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-all duration-300 active:scale-95"
            aria-label="Next Step"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cards Row */}
      <div 
        ref={scrollRef} 
        className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {SCENES.map((scene, idx) => {
          const Icon = scene.icon
          return (
            <div
              key={scene.step}
              className="group relative h-[490px] w-[300px] sm:w-[330px] flex-shrink-0 overflow-hidden border border-white/10 rounded-2xl bg-neutral-950 p-6 flex flex-col justify-between transition-all duration-500 hover:border-gold/40 hover:shadow-[0_20px_50px_rgba(218,165,32,0.15)] snap-start"
            >
              {/* Card Image Background (Full Vibrant Color & Tack-Sharp Quality) */}
              <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.2s] ease-out">
                <Image
                  src={scene.image}
                  alt={scene.title}
                  fill
                  unoptimized={true}
                  className="object-cover transition-all duration-[1s] ease-out"
                  sizes="330px"
                  priority={idx < 3}
                />
                {/* Custom deep high-contrast gradient layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              </div>

              {/* Header: Step Indicator & Icon */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/80 backdrop-blur-md text-gold shadow-lg">
                  <span className="font-mono text-base font-bold tracking-tight">
                    {scene.step}
                  </span>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/80 backdrop-blur-md text-gold group-hover:border-gold group-hover:bg-gold group-hover:text-black transition-all duration-500 shadow-lg">
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>

              {/* Bottom Details (Always 100% readable with a premium floating backdrop) */}
              <div className="relative z-10 bg-black/80 backdrop-blur-xl border border-white/10 p-5 rounded-xl mt-auto shadow-2xl">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                  {scene.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-xs leading-relaxed text-white/80">
                  {scene.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}