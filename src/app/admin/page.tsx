'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Package, Inbox, Film, Users, Plus, ArrowUpRight, TrendingUp, CheckCircle2, Clock, AlertCircle, ArrowRight, Eye, RefreshCw } from 'lucide-react'

const STATS = [
  { label: 'Total Products in Catalog', value: '14', change: '+18% this month', icon: Package, color: '#3B82F6' },
  { label: 'Pending Enquiries', value: '3', change: '2 requires urgent action', icon: Inbox, color: '#3B82F6' },
  { label: 'Digital Assets & Media', value: '6', change: '100% optimized', icon: Film, color: '#8B5CF6' },
  { label: 'Active Global Contacts', value: '12', change: '+4 new this week', icon: Users, color: '#10B981' },
]

const RECENT_ENQUIRIES = [
  { id: 'ENQ-2026-003', company: 'Gulf Textiles Trading', country: 'Saudi Arabia', division: 'Garments & Uniforms', status: 'new', priority: 'high', date: '15 May 2026', items: 2500, rep: 'Unassigned' },
  { id: 'ENQ-2026-002', company: 'Lagos Fashion House', country: 'Nigeria', division: 'Garments', status: 'contacted', priority: 'normal', date: '14 May 2026', items: 1000, rep: 'Sarah K.' },
  { id: 'ENQ-2026-001', company: 'Marriott Hotel Group', country: 'UAE', division: 'Hospitality Linen', status: 'quoted', priority: 'urgent', date: '10 May 2026', items: 5000, rep: 'Alex M.' },
]

const SYSTEM_LOGS = [
  { time: '10 mins ago', user: 'System', action: 'Automated Catalog Backup Completed successfully' },
  { time: '1 hour ago', user: 'Alex M.', action: 'Quoted Marriott Hotel Group (#ENQ-2026-001)' },
  { time: '3 hours ago', user: 'Sarah K.', action: 'Uploaded 4 new product images to Garments Division' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'quoted'>('all')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise(r => setTimeout(r, 800))
    setRefreshing(false)
  }

  const filteredEnquiries = RECENT_ENQUIRIES.filter(enq => {
    if (activeTab === 'new') return enq.status === 'new'
    if (activeTab === 'quoted') return enq.status === 'quoted'
    return true
  })

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto text-white">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white">Executive Dashboard</h1>
            <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Online &amp; Secure
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-white/50">
            Real-time telemetry and commercial management console • UTC+4 Dubai
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 font-mono text-xs font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-gold' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync Telemetry'}</span>
          </button>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-gold-light hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <Plus className="h-4 w-4" />
            <span>Add Listing</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-gold/50 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Subtle top background highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-white/40">{stat.label}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/40 group-hover:border-gold/30 transition-colors">
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="mt-4 font-display text-4xl font-bold tracking-tight text-white">{stat.value}</p>
              <div className="mt-2 flex items-center gap-2 font-mono text-[11px]">
                <TrendingUp className="h-3 w-3 text-gold" />
                <span className="text-gold">{stat.change}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Access Action Bar */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/products/new" className="group flex items-center justify-between rounded-xl border border-gold/30 bg-gold/10 p-5 text-sm font-semibold text-gold transition-all hover:bg-gold/20 hover:border-gold">
          <div className="flex items-center gap-3 font-mono">
            <Plus className="h-5 w-5" />
            <span>Create Product Listing</span>
          </div>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link href="/admin/media" className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white hover:border-white/20">
          <div className="flex items-center gap-3 font-mono">
            <Film className="h-5 w-5 text-purple-400" />
            <span>Asset Gallery &amp; Banners</span>
          </div>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link href="/admin/enquiries" className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white hover:border-white/20">
          <div className="flex items-center gap-3 font-mono">
            <Inbox className="h-5 w-5 text-blue-400" />
            <span>Commercial Enquiries</span>
          </div>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link href="/admin/broadcast" className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white hover:border-white/20">
          <div className="flex items-center gap-3 font-mono">
            <ArrowUpRight className="h-5 w-5 text-emerald-400" />
            <span>Marketing Broadcasts</span>
          </div>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Enquiries CRM Console */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-lg font-bold text-white">Active Enterprise Enquiries</h2>
              <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-blue-400">
                {RECENT_ENQUIRIES.length} Total
              </span>
            </div>
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 p-1 font-mono text-xs">
              {(['all', 'new', 'quoted'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-md px-3 py-1 font-semibold uppercase tracking-wider transition-all ${
                    activeTab === tab ? 'bg-gold text-black shadow-sm' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-xl">
            <div className="divide-y divide-white/10">
              <AnimatePresence mode="wait">
                {filteredEnquiries.map((enq) => (
                  <motion.div
                    key={enq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 transition-colors hover:bg-white/5"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-gold">{enq.id}</span>
                        <h3 className="font-display text-base font-bold text-white">{enq.company}</h3>
                        <span className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                          enq.priority === 'urgent' ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' :
                          enq.priority === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-white/10 text-white/60 border border-white/10'
                        }`}>
                          {enq.priority}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-white/60">
                        {enq.country} • <span className="text-white/40">Division Interest:</span> <span className="text-white">{enq.division}</span>
                      </p>
                      <div className="flex items-center gap-4 font-mono text-[11px] text-white/40 pt-1">
                        <span>Est. Qty: <strong className="text-white">{enq.items.toLocaleString()} units</strong></span>
                        <span>•</span>
                        <span>Rep: <strong className={enq.rep === 'Unassigned' ? 'text-amber-400 font-bold' : 'text-white'}>{enq.rep}</strong></span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${
                        enq.status === 'new' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                        enq.status === 'quoted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                        'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                      }`}>
                        {enq.status === 'new' && <AlertCircle className="h-3 w-3" />}
                        {enq.status === 'quoted' && <CheckCircle2 className="h-3 w-3" />}
                        {enq.status === 'contacted' && <Clock className="h-3 w-3" />}
                        <span>{enq.status}</span>
                      </span>
                      <Link
                        href="/admin/enquiries"
                        className="flex items-center gap-1.5 font-mono text-xs font-semibold text-gold transition-all hover:translate-x-0.5 hover:underline opacity-80 group-hover:opacity-100"
                      >
                        <span>Open Record</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="bg-black/40 border-t border-white/10 p-3 text-center">
              <Link href="/admin/enquiries" className="font-mono text-xs font-semibold text-white/60 hover:text-gold transition-colors">
                View All Historical Enquiries →
              </Link>
            </div>
          </div>
        </div>

        {/* System Activity & Telemetry Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-white">System Telemetry Log</h2>
            <span className="font-mono text-xs text-white/40">Real-time</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-xl space-y-4">
            <div className="space-y-3">
              {SYSTEM_LOGS.map((log, index) => (
                <div key={index} className="flex gap-3 text-sm border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <div className="mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-gold" />
                  </div>
                  <div className="space-y-0.5 flex-1 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{log.user}</span>
                      <span className="text-[10px] text-white/40">{log.time}</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">{log.action}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 mt-2">
              <div className="rounded-lg bg-black/60 p-4 border border-white/10 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-white/60">
                  <span>Storage Allocation</span>
                  <span className="text-gold">14.2 GB / 50 GB</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full w-[28%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/40 pt-1">
                  <span>Database health: Optimal</span>
                  <span>Latency: 28ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
