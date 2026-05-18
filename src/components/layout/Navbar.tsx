'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, ChevronDown, Building2, ShieldCheck, Factory, Briefcase, Home, Package, ArrowRight, Award, Clock } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { NAV_LINKS } from '@/lib/constants'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const pathname = usePathname()

  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    setMegaMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  if (isAdmin) return null

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-500 ${
          isScrolled || megaMenuOpen
            ? 'border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="group relative z-10 flex items-center gap-3" onClick={() => setMegaMenuOpen(false)}>
            <div className="relative h-11 w-11 overflow-hidden transition-transform duration-500 group-hover:scale-105 sm:h-12 sm:w-12">
              <Image
                src="/images/wcc-logo.png"
                alt="WCC Garments Logo"
                fill
                className="object-contain"
                priority
                sizes="48px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                WCC <span className="font-light text-gold">—</span> GARMENTS
              </span>
              <span className="font-mono text-[8px] font-medium uppercase tracking-[0.35em] text-gold/80 sm:text-[9px]">
                Western Clothing Co.
              </span>
            </div>
          </Link>

          {/* Center Nav Links - Desktop */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isProducts = link.name.toLowerCase() === 'products'
              return (
                <div
                  key={link.href}
                  className="group relative py-3 cursor-pointer"
                  onMouseEnter={() => isProducts && setMegaMenuOpen(true)}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMegaMenuOpen(false)}
                    className="flex items-center gap-1.5"
                  >
                    <span
                      className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                        pathname === link.href || (isProducts && megaMenuOpen)
                          ? 'text-gold font-bold scale-105'
                          : 'text-white/80 group-hover:text-gold'
                      }`}
                    >
                      {link.name}
                    </span>
                    {isProducts && (
                      <ChevronDown className={`h-3.5 w-3.5 text-white/50 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180 text-gold' : 'group-hover:text-gold'}`} />
                    )}
                  </Link>
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-500 ease-premium ${
                      pathname === link.href || (isProducts && megaMenuOpen) ? 'w-full shadow-[0_0_10px_#C9A84C]' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </div>
              )
            })}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            <ThemeToggle className="hidden sm:flex" />
            <Link
              href="/contact"
              className="group relative hidden lg:inline-flex items-center gap-2 rounded-full border border-gold bg-gold/10 px-6 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-gold backdrop-blur-md transition-all hover:bg-gold hover:text-black hover:shadow-[0_0_25px_rgba(201,168,76,0.4)]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="relative z-[110] flex h-10 w-10 items-center justify-center lg:hidden text-white hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Clean & Professional Mega Menu Dropdown */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onMouseLeave={() => setMegaMenuOpen(false)}
              className="absolute left-0 right-0 top-full z-[90] border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.95)]"
            >
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

              <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12">
                <div className="grid gap-10 lg:grid-cols-12">
                  {/* Left Column (8 Cols): Structured Industrial Divisions */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
                        Explore by Industrial Division
                      </span>
                      <span className="font-mono text-xs text-gold font-bold">10,000+ SKUs Available</span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans text-xs">
                      <Link
                        href="/products?division=garments"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-gold/10 hover:border-gold/50 flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-center gap-3 font-bold text-white group-hover:text-gold font-display text-sm">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black border border-white/10 group-hover:border-gold text-gold"><Factory className="h-4 w-4" /></div>
                          <span>Garments Division</span>
                        </div>
                        <p className="text-white/60 leading-relaxed text-[11px]">Premium corporate shirts, twill trousers, and bespoke formalwear manufactured for global export.</p>
                      </Link>

                      <Link
                        href="/products?division=uniforms"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-gold/10 hover:border-gold/50 flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-center gap-3 font-bold text-white group-hover:text-gold font-display text-sm">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black border border-white/10 group-hover:border-gold text-blue-400"><ShieldCheck className="h-4 w-4" /></div>
                          <span>Uniforms &amp; Safety</span>
                        </div>
                        <p className="text-white/60 leading-relaxed text-[11px]">Professional chef uniforms, industrial safety coveralls, and healthcare scrub attire.</p>
                      </Link>

                      <Link
                        href="/products?division=hospitality"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group rounded-xl border border-gold/30 bg-gold/5 p-4 transition-all hover:bg-gold/15 hover:border-gold flex flex-col justify-between space-y-3 shadow-lg"
                      >
                        <div className="flex items-center gap-3 font-bold text-gold font-display text-sm">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 border border-gold/30 text-gold"><Building2 className="h-4 w-4" /></div>
                          <span>Hospitality Division</span>
                        </div>
                        <p className="text-white/80 leading-relaxed text-[11px]">400TC Egyptian sateen bed linen sets, plush luxury bath towels, and restaurant table napery.</p>
                      </Link>

                      <Link
                        href="/products?division=fragrance"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-gold/10 hover:border-gold/50 flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-center gap-3 font-bold text-white group-hover:text-gold font-display text-sm">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black border border-white/10 group-hover:border-gold text-purple-400"><Briefcase className="h-4 w-4" /></div>
                          <span>Fragrance &amp; Oud</span>
                        </div>
                        <p className="text-white/60 leading-relaxed text-[11px]">Pure concentrated oud oils, private label luxury perfumery, and custom corporate gift boxes.</p>
                      </Link>

                      <Link
                        href="/products?division=home"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-gold/10 hover:border-gold/50 flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-center gap-3 font-bold text-white group-hover:text-gold font-display text-sm">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black border border-white/10 group-hover:border-gold text-emerald-400"><Home className="h-4 w-4" /></div>
                          <span>Home Furnishings</span>
                        </div>
                        <p className="text-white/60 leading-relaxed text-[11px]">Luxury jacquard throws, decorative cushions, and high-density interior drapery fabrics.</p>
                      </Link>

                      <Link
                        href="/products?division=households"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-gold/10 hover:border-gold/50 flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-center gap-3 font-bold text-white group-hover:text-gold font-display text-sm">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black border border-white/10 group-hover:border-gold text-amber-400"><Package className="h-4 w-4" /></div>
                          <span>Households Supply</span>
                        </div>
                        <p className="text-white/60 leading-relaxed text-[11px]">Bulk microfiber cleaning cloths, commercial laundry detergents, and hospitality bar mops.</p>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column (4 Cols): Featured Highlights & Quick Links */}
                  <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
                    <div className="border-b border-white/10 pb-3">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-2">
                        <Award className="h-4 w-4 text-gold" />
                        <span>Featured Commercial Highlights</span>
                      </span>
                    </div>

                    <div className="space-y-4">
                      <Link
                        href="/products/hotel-bed-linen-collection"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3.5 transition-all hover:border-gold hover:bg-white/10"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-black border border-white/10">
                          <Image src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80" alt="Bedding" fill className="object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div>
                          <h5 className="font-sans font-bold text-white group-hover:text-gold transition-colors text-sm">Hotel Bed Linen Collection</h5>
                          <p className="text-[11px] text-white/60 font-mono mt-0.5">MOQ: 200 Sets / 100% Combed Cotton</p>
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-mono font-bold mt-1 bg-amber-400/10 px-2 py-0.5 rounded">
                            <Clock className="h-3 w-3" /> Quick Ship (15-20 Days)
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/products/egyptian-cotton-premium-shirts"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3.5 transition-all hover:border-gold hover:bg-white/10"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-black border border-white/10">
                          <Image src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80" alt="Shirt" fill className="object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div>
                          <h5 className="font-sans font-bold text-white group-hover:text-gold transition-colors text-sm">Egyptian Cotton Premium Shirts</h5>
                          <p className="text-[11px] text-white/60 font-mono mt-0.5">300TC Weave / Global Wholesale</p>
                          <span className="inline-flex items-center gap-1 text-[10px] text-purple-400 font-mono font-bold mt-1 bg-purple-400/10 px-2 py-0.5 rounded">
                            Premium Tier Selection
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <Link
                        href="/products"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group flex items-center justify-between rounded-xl bg-gold py-3.5 px-5 font-mono text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-gold-light shadow-lg"
                      >
                        <span>Explore Complete Product Index</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-[105] flex flex-col bg-[#0A0A0A]"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-1 flex-col justify-center px-8 space-y-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between border-b border-white/10 py-5"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span
                      className={`font-display text-3xl font-bold ${
                        pathname === link.href ? 'text-gold' : 'text-white'
                      }`}
                    >
                      {link.name}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white/30 transition-colors group-hover:text-gold" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="border-t border-white/10 px-8 py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between font-mono">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">Commercial Hot Line</p>
                  <p className="mt-1 text-sm text-gold font-bold">info@wccgarments.com</p>
                </div>
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
