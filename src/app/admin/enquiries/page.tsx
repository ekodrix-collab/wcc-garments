'use client'

import { useState } from 'react'
import { Search, Inbox, AlertCircle, CheckCircle2, Clock, ArrowRight, Eye, Phone, Mail, Globe, MapPin, Building2, PackageCheck, Send, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface EnquiryItem {
  id: string
  company: string
  country: string
  email: string
  phone: string
  products: string
  status: 'new' | 'contacted' | 'quoted' | 'converted'
  priority: 'urgent' | 'high' | 'normal'
  date: string
  quantity: string
  message: string
  rep: string
}

const INITIAL_ENQUIRIES: EnquiryItem[] = [
  { id: 'ENQ-2026-008', company: 'Gulf Textiles Trading', country: 'Saudi Arabia', email: 'procurement@gulftextiles.com', phone: '+966 50 123 4567', products: 'Garments, Uniforms', status: 'new', priority: 'urgent', date: '17 May 2026', quantity: '10,000 - 25,000 Units', message: 'Urgently looking for high-quality cotton twill coveralls and corporate staff uniforms for upcoming tender.', rep: 'Unassigned' },
  { id: 'ENQ-2026-007', company: 'Lagos Fashion House', country: 'Nigeria', email: 'director@lagosfashion.ng', phone: '+234 803 111 2222', products: 'Garments', status: 'contacted', priority: 'high', date: '16 May 2026', quantity: '5,000 Units', message: 'Looking for OEM manufacturing partner for our 2026 winter streetwear collection. Spec sheets attached.', rep: 'Sarah K.' },
  { id: 'ENQ-2026-006', company: 'Marriott Hotel Group', country: 'United Arab Emirates', email: 'dubai.purchasing@marriott.com', phone: '+971 4 414 0000', products: 'Hospitality, Uniforms', status: 'quoted', priority: 'urgent', date: '15 May 2026', quantity: '50,000+ Units', message: 'Complete bedding replacement and concierge uniform overhaul for 3 properties across Dubai and Abu Dhabi.', rep: 'Alex M.' },
  { id: 'ENQ-2026-005', company: 'Oman Royal Tender Board', country: 'Oman', email: 'tenders@mof.gov.om', phone: '+968 24 777 888', products: 'Government Uniforms', status: 'quoted', priority: 'high', date: '12 May 2026', quantity: '100,000 Units', message: 'Formal government tender inquiry for military and civil defense standard uniform fabrics.', rep: 'Alex M.' },
  { id: 'ENQ-2026-004', company: 'Nairobi Retail Chain', country: 'Kenya', email: 'import@nairobibigbox.ke', phone: '+254 20 123 456', products: 'Households, Fragrance', status: 'converted', priority: 'normal', date: '10 May 2026', quantity: '2,500 Units', message: 'Trial order for private label room fresheners and bulk micro-fiber cleaning cloths.', rep: 'Sarah K.' },
]

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(INITIAL_ENQUIRIES)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [activeModal, setActiveModal] = useState<EnquiryItem | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const handleUpdateStatus = (id: string, newStatus: EnquiryItem['status']) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e))
    if (activeModal && activeModal.id === id) {
      setActiveModal(prev => prev ? { ...prev, status: newStatus } : null)
    }
    setUpdateSuccess(true)
    setTimeout(() => setUpdateSuccess(false), 2000)
  }

  const filteredEnquiries = enquiries.filter(enq => {
    const matchSearch = enq.company.toLowerCase().includes(search.toLowerCase()) || 
                        enq.email.toLowerCase().includes(search.toLowerCase()) || 
                        enq.id.toLowerCase().includes(search.toLowerCase()) ||
                        enq.country.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || enq.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto text-white">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white">Commercial CRM</h1>
            <span className="rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-0.5 font-mono text-xs font-bold text-blue-400">
              {enquiries.length} Active Leads
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-white/50">
            Enterprise procurement inquiries, RFQs, and government tenders
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 font-mono text-xs">
          {(['all', 'new', 'contacted', 'quoted', 'converted'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`rounded-lg px-4 py-2.5 font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-gold text-black shadow-lg font-bold'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab === 'all' ? 'All Records' : tab} ({enquiries.filter(e => tab === 'all' || e.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by company name, email, record ID, or country..."
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 font-mono text-xs text-white placeholder-white/30 focus:border-gold focus:outline-none focus:bg-black transition-all shadow-lg"
        />
      </div>

      {/* Enquiries CRM List Grid */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl font-mono">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 bg-black/40 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              <tr>
                <th className="px-6 py-4">Commercial Entity</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Product Category</th>
                <th className="px-6 py-4">Est. Quantity</th>
                <th className="px-6 py-4">Status &amp; Priority</th>
                <th className="px-6 py-4 text-right">Action Desk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-xs text-white/80">
              <AnimatePresence>
                {filteredEnquiries.map((enq) => (
                  <motion.tr
                    key={enq.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => setActiveModal(enq)}
                  >
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-gold">{enq.id}</span>
                          <span className="h-1 w-1 rounded-full bg-white/30" />
                          <span className="text-[11px] text-white/40">{enq.date}</span>
                        </div>
                        <p className="font-display text-base font-bold text-white group-hover:text-gold transition-colors">{enq.company}</p>
                        <div className="flex items-center gap-1.5 text-[11px] text-white/50 pt-0.5 font-mono">
                          <Globe className="h-3 w-3 text-gold" />
                          <span>{enq.country}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 space-y-1">
                      <p className="font-medium text-white flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-white/40" />
                        <span>{enq.email}</span>
                      </p>
                      <p className="text-[11px] text-white/50 flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-white/40" />
                        <span>{enq.phone}</span>
                      </p>
                    </td>
                    <td className="px-6 py-5 font-semibold text-white/90">
                      {enq.products}
                    </td>
                    <td className="px-6 py-5">
                      <span className="rounded bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-bold text-gold">
                        {enq.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-5 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          enq.status === 'new' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                          enq.status === 'quoted' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                          enq.status === 'converted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                        }`}>
                          {enq.status === 'new' && <AlertCircle className="h-3 w-3 animate-bounce" />}
                          {enq.status === 'quoted' && <CheckCircle2 className="h-3 w-3" />}
                          {enq.status === 'contacted' && <Clock className="h-3 w-3" />}
                          {enq.status === 'converted' && <Check className="h-3 w-3" />}
                          <span>{enq.status}</span>
                        </span>
                        
                        <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                          enq.priority === 'urgent' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          enq.priority === 'high' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                          'bg-white/5 text-white/40 border border-white/10'
                        }`}>
                          {enq.priority}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveModal(enq) }}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/70 transition-all hover:bg-gold hover:text-black hover:border-gold font-semibold"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredEnquiries.length === 0 && (
          <div className="p-16 text-center font-mono space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 mx-auto">
              <Inbox className="h-6 w-6 text-white/30" />
            </div>
            <p className="text-sm text-white/60 font-semibold">No commercial records found matching your active CRM filters.</p>
          </div>
        )}
      </div>

      {/* Enquiry Detail Inspector Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl border border-gold/30 bg-[#0D0D0D] p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded bg-gold/10 border border-gold/30 px-2 py-0.5 text-[10px] font-bold text-gold uppercase tracking-wider">{activeModal.id}</span>
                    <span className="text-xs text-white/40">{activeModal.date}</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white">{activeModal.company}</h2>
                  <div className="flex items-center gap-4 text-xs text-white/60 pt-1">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-gold" /> {activeModal.country}</span>
                    <span className="flex items-center gap-1.5"><Building2 className="h-3 w-3 text-blue-400" /> Rep: {activeModal.rep}</span>
                  </div>
                </div>

                <button onClick={() => setActiveModal(null)} className="rounded-lg p-1 text-white/40 hover:text-white hover:bg-white/10">
                  ✕
                </button>
              </div>

              {updateSuccess && (
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center text-xs font-bold text-emerald-400">
                  ✓ Commercial status successfully synchronized.
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 block">Contact Protocols</span>
                  <a href={`mailto:${activeModal.email}`} className="flex items-center gap-3 text-xs text-white hover:text-gold transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-black border border-white/10"><Mail className="h-3.5 w-3.5 text-gold" /></div>
                    <span className="truncate">{activeModal.email}</span>
                  </a>
                  <a href={`tel:${activeModal.phone}`} className="flex items-center gap-3 text-xs text-white hover:text-gold transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-black border border-white/10"><Phone className="h-3.5 w-3.5 text-gold" /></div>
                    <span>{activeModal.phone}</span>
                  </a>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 block">Commercial Scope</span>
                  <div className="text-xs space-y-1">
                    <p className="text-white/60">Target Divisions: <strong className="text-white">{activeModal.products}</strong></p>
                    <p className="text-white/60">Est. Quantity: <strong className="text-gold">{activeModal.quantity}</strong></p>
                    <p className="text-white/60">Urgency Level: <strong className="text-red-400 uppercase">{activeModal.priority}</strong></p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 block">Client Specification Message</span>
                <p className="text-xs text-white/80 leading-relaxed font-sans italic bg-black/40 p-4 rounded-lg border border-white/5">
                  &ldquo;{activeModal.message}&rdquo;
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white/60">Update Lead Workflow Status</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['new', 'contacted', 'quoted', 'converted'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(activeModal.id, st)}
                      className={`rounded-lg border p-3 text-center text-xs font-semibold uppercase tracking-wider transition-all ${
                        activeModal.status === st
                          ? 'bg-gold text-black border-gold font-bold shadow-lg shadow-gold/20'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/30'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={`mailto:${activeModal.email}?subject=Re: Commercial Enquiry (${activeModal.id}) - WCC Garments`}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gold py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-gold-light transition-all shadow-lg"
                >
                  <Send className="h-4 w-4" />
                  <span>Reply via Email Dispatch</span>
                </a>
                <button
                  onClick={() => setActiveModal(null)}
                  className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold text-white/70 hover:bg-white/10 transition-all"
                >
                  Close Console
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
