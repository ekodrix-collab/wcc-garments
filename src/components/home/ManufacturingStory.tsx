'use client'

import Image from 'next/image'
import { Scissors, Layers, ShieldCheck, Truck, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

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
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'next' ? 280 : -280, behavior: 'smooth' })
  }

  return (
    <section className="bg-[#0A0A0A] text-white py-20 px-6 lg:px-12">

      {/* Heading */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
            <span>Horizontal Signature Story</span>
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            The Dubai manufacturing <span className='text-gold'>pipeline</span>
          </h2>
          <p className="mt-2 text-xs uppercase tracking-widest text-white/50">
            Five stages from raw textile to global distribution
          </p>
        </div>

        {/* Nav Buttons */}
        <div className="flex gap-2 shrink-0 pt-2">
          <button
            onClick={() => scroll('prev')}
            className="w-10 h-10 bg-[#1a56db] flex items-center justify-center hover:bg-[#1e40af] transition-colors duration-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => scroll('next')}
            className="w-10 h-10 bg-[#1a56db] flex items-center justify-center hover:bg-[#1e40af] transition-colors duration-200"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Cards Row — original, untouched */}
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {SCENES.map((scene, idx) => {
          const Icon = scene.icon
          return (
            <div
              key={scene.step}
              className="relative h-[380px] w-[260px] flex-shrink-0 overflow-hidden border border-white/10 bg-[#111] p-6 transition-all duration-500 hover:border-gold/40 flex flex-col justify-between"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 opacity-100 transition-all duration-700">
                <Image
                  src={scene.image}
                  alt={scene.title}
                  fill
                  className="object-cover"
                  sizes="260px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Bottom: Title & Description */}
              <div className="relative z-10 mt-auto">
                <div className="rounded-3x1 ">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {scene.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {scene.desc}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}