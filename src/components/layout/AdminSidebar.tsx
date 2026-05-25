// Admin Navigation Sidebar Component
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, FolderOpen, Film, Inbox, Megaphone, LogOut, Menu, X, ShieldCheck, Mail, Award } from 'lucide-react'
import { useAdmin } from '@/context/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'

const ADMIN_LINKS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, badge: '' },
  { name: 'Products', href: '/admin/products', icon: Package, badge: '14' },
  { name: 'Brands', href: '/admin/brands', icon: Award, badge: '' },
  { name: 'Categories', href: '/admin/categories', icon: FolderOpen, badge: '10' },
  { name: 'Media & Assets', href: '/admin/media', icon: Film, badge: '6' },
  { name: 'Enquiries', href: '/admin/enquiries', icon: Inbox, badge: '3 New' },
  { name: 'Newsletter', href: '/admin/newsletter', icon: Mail, badge: '' },
  { name: 'Broadcast', href: '/admin/broadcast', icon: Megaphone, badge: 'Live' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAdmin()
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between bg-[#0D0D0D] text-white">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <Link href="/admin" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center border border-gold bg-gold/10">
              <ShieldCheck className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight text-white">
                WCC <span className="text-gold">Admin</span>
              </h2>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold/70">Enterprise OS</p>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          <span className="px-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Navigation Core
          </span>
          <div className="mt-2 space-y-1">
            {ADMIN_LINKS.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group relative flex items-center justify-between rounded-lg px-3.5 py-3 font-mono text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'bg-gold/15 text-gold border-l-2 border-gold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-gold' : 'text-white/40'}`} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      link.badge.includes('New') || link.badge.includes('Live')
                        ? 'bg-gold text-black animate-pulse'
                        : 'bg-white/10 text-white/70'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Bottom Profile / Quick Access */}
      <div className="border-t border-white/10 p-4 space-y-3 bg-black/40">
        <Link
          href="/"
          target="_blank"
          className="group flex items-center justify-between rounded-lg border border-white/10 p-3 text-xs text-white/60 transition-all hover:border-gold hover:bg-gold/5 hover:text-white"
        >
          <div className="flex items-center gap-2 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Website</span>
          </div>
          <span className="font-mono text-[10px] text-gold group-hover:translate-x-0.5 transition-transform">↗</span>
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 py-2.5 font-mono text-xs font-semibold text-red-400 transition-all hover:bg-red-500/20 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" /> Exit System Session
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0D0D0D] px-6 lg:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-gold bg-gold/10">
            <ShieldCheck className="h-4 w-4 text-gold" />
          </div>
          <h2 className="font-display text-md font-bold text-white">
            WCC <span className="text-gold">Admin</span>
          </h2>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg border border-white/10 p-2 text-white/70 hover:bg-white/10 hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden w-72 flex-shrink-0 border-r border-white/10 bg-[#0D0D0D] lg:block min-h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Slide-over Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-72 max-w-[80vw] lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
