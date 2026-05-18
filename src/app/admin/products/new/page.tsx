'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Plus, Trash2, Tag, Layers, Check, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { DIVISIONS } from '@/lib/constants'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [specKey, setSpecKey] = useState('')
  const [specVal, setSpecVal] = useState('')
  const [formData, setFormData] = useState({
    name: '', slug: '', division_id: 'Garments', category_id: '',
    short_description: '', description: '', moq: '500 Units', lead_time: '15-25 Working Days',
    featured: false, is_new: true, is_offer: false, offer_label: '',
    published: true, tags: ['Cotton', 'Industrial Export', 'Anti-Microbial'],
    specs: [
      { key: 'Fabric Composition', value: '100% Long-Staple Premium Cotton' },
      { key: 'Weave Type', value: 'High-Density 300TC Twill' },
      { key: 'Certifications', value: 'ISO 9001:2015, OEKO-TEX Standard 100' }
    ],
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) })
  }

  const handleAddSpec = () => {
    if (!specKey || !specVal) return
    setFormData({ ...formData, specs: [...formData.specs, { key: specKey, value: specVal }] })
    setSpecKey('')
    setSpecVal('')
  }

  const handleRemoveSpec = (idx: number) => {
    setFormData({ ...formData, specs: formData.specs.filter((_, i) => i !== idx) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSaving(false)
    setSuccess(true)
    setTimeout(() => {
      router.push('/admin/products')
    }, 1500)
  }

  const inputClass = "w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3.5 text-xs text-white placeholder-white/20 focus:border-gold focus:outline-none focus:bg-black transition-all font-mono"
  const labelClass = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-white/50 font-mono"

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto text-white font-mono">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 font-sans">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl font-bold tracking-tight text-white font-sans">Create Product Entry</h1>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                New Catalog Node
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-white/50">
              Deploy commercial specifications to global B2B index
            </p>
          </div>
        </div>
      </div>

      {success && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-5 flex items-center gap-3 text-emerald-400 font-sans text-sm font-bold shadow-2xl">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 animate-bounce" />
          <span>Product commercial listing successfully validated and committed to WCC catalog network. Redirecting...</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-12 font-mono">
        {/* Main Product Info Form */}
        <div className="lg:col-span-8 space-y-6 font-sans">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl space-y-6">
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
              <Layers className="h-5 w-5 text-gold" />
              <span>Core Specifications</span>
            </h3>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Product Nomenclature *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                  className={inputClass}
                  placeholder="e.g. 400TC Egyptian Sateen Hotel Bedding Set"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Catalog Slug *</label>
                <input name="slug" value={formData.slug} onChange={handleChange} className={inputClass} placeholder="egyptian-sateen-bedding-set" required />
              </div>
            </div>

            <div>
              <label className={labelClass}>Brief Summary Descriptor</label>
              <textarea name="short_description" value={formData.short_description} onChange={handleChange} className={inputClass} rows={2} placeholder="Ultra-luxurious sateen weave bedding engineered for 5-star hospitality comfort..." />
            </div>

            <div>
              <label className={labelClass}>Comprehensive Commercial Overview</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className={inputClass} rows={5} placeholder="Full industrial material breakdown, commercial laundering resistance ratings, and custom jacquard monogramming options..." />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Minimum Order Quantity (MOQ) *</label>
                <input name="moq" value={formData.moq} onChange={handleChange} className={inputClass} placeholder="e.g. 500 Units" required />
              </div>
              <div>
                <label className={labelClass}>Standard Lead Time *</label>
                <input name="lead_time" value={formData.lead_time} onChange={handleChange} className={inputClass} placeholder="e.g. 15-25 Working Days" required />
              </div>
            </div>
          </div>

          {/* Technical Specifications Key-Value Builder */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl space-y-6 font-mono">
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4 font-sans">
              <Tag className="h-5 w-5 text-purple-400" />
              <span>Technical Data Matrix &amp; Tags</span>
            </h3>

            {/* Tag Input */}
            <div>
              <label className={labelClass}>Search Tags &amp; Index Keywords (Press Enter)</label>
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type tag and press Enter... e.g. Anti-Static"
                className={inputClass}
              />
              <div className="flex flex-wrap gap-2 pt-3">
                {formData.tags.map(t => (
                  <span key={t} className="inline-flex items-center gap-2 rounded-lg bg-gold/10 border border-gold/30 px-3 py-1 font-mono text-xs font-bold text-gold uppercase">
                    <span>{t}</span>
                    <button type="button" onClick={() => handleRemoveTag(t)} className="text-gold/60 hover:text-red-400">✕</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Spec Builder */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <label className={labelClass}>Material Specification Matrix</label>
              <div className="grid sm:grid-cols-12 gap-2">
                <input type="text" value={specKey} onChange={e => setSpecKey(e.target.value)} placeholder="e.g. Tensile Strength" className="sm:col-span-5 rounded-lg border border-white/10 bg-black/50 p-3 text-xs text-white" />
                <input type="text" value={specVal} onChange={e => setSpecVal(e.target.value)} placeholder="e.g. 120 N/cm" className="sm:col-span-5 rounded-lg border border-white/10 bg-black/50 p-3 text-xs text-white" />
                <button type="button" onClick={handleAddSpec} className="sm:col-span-2 rounded-lg bg-white/10 text-white font-bold text-xs hover:bg-gold hover:text-black transition-all p-3">Add Spec</button>
              </div>

              <div className="divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden bg-black/30">
                {formData.specs.map((sp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 text-xs">
                    <span className="text-white/40">{sp.key}</span>
                    <div className="flex items-center gap-3 font-bold text-white">
                      <span>{sp.value}</span>
                      <button type="button" onClick={() => handleRemoveSpec(idx)} className="text-red-400 hover:text-red-300 p-1">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Form Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl space-y-6 font-sans">
            <h3 className="font-display text-base font-bold text-white border-b border-white/10 pb-3">Organization Hierarchy</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Division Core *</label>
                <select name="division_id" value={formData.division_id} onChange={handleChange} className={inputClass}>
                  {DIVISIONS.map((d) => <option key={d.slug} value={d.name}>{d.name}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>Primary Category *</label>
                <input name="category_id" value={formData.category_id} onChange={handleChange} className={inputClass} placeholder="e.g. Bed Linen" required />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl space-y-6 font-sans">
            <h3 className="font-display text-base font-bold text-white border-b border-white/10 pb-3">Commercial Badging</h3>
            <div className="space-y-4 font-mono text-xs">
              {[
                { name: 'featured', label: 'Feature on Homepage Gallery' },
                { name: 'is_new', label: 'Badge as New Arrival 2026' },
                { name: 'is_offer', label: 'Activate Special Offer Ribbon' },
                { name: 'published', label: 'Publish Live on Web Store' },
              ].map((flag) => (
                <label key={flag.name} className="flex items-center gap-3.5 text-white/80 cursor-pointer hover:text-gold transition-colors">
                  <input
                    type="checkbox"
                    name={flag.name}
                    checked={formData[flag.name as keyof typeof formData] as boolean}
                    onChange={handleChange}
                    className="h-4 w-4 accent-gold rounded border-white/20 bg-black"
                  />
                  <span>{flag.label}</span>
                </label>
              ))}
            </div>

            {formData.is_offer && (
              <div className="pt-2">
                <label className={labelClass}>Custom Promotional Ribbon Label</label>
                <input name="offer_label" value={formData.offer_label} onChange={handleChange} className={inputClass} placeholder="e.g. 15% Wholesale Tier Discount" />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl space-y-4 font-sans">
            <h3 className="font-display text-base font-bold text-white border-b border-white/10 pb-3">Digital Asset Cover</h3>
            <div className="space-y-3">
              <input name="image" value={formData.image} onChange={handleChange} className={inputClass} placeholder="Cover Image URL..." />
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-gold font-mono text-xs font-bold uppercase tracking-widest text-black hover:bg-gold-light transition-all shadow-xl disabled:opacity-50"
            >
              {saving ? <><Loader2 className="h-5 w-5 animate-spin text-black" /> Committing Catalog...</> : <><Save className="h-4 w-4" /> Deploy Listing Now</>}
            </button>
            <Link href="/admin/products" className="flex h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 font-mono text-xs font-bold uppercase tracking-wider text-white/60 hover:bg-white/10 hover:text-white transition-all">
              Cancel &amp; Discard
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
