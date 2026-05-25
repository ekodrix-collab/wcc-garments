'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Search, Edit2, Trash2, Save, Loader2, Award, CheckCircle2, ShieldCheck } from 'lucide-react'
import { brandStore } from '@/lib/brand-store'
import { Brand } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [search, setSearch] = useState('')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  
  // Form State
  const [formData, setFormData] = useState<{
    id?: string
    name: string
    slug: string
    tagline: string
    description: string
    logo_mobile: string
    logo_desktop: string
    featured: boolean
    display_order: number
  }>({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    logo_mobile: '',
    logo_desktop: '',
    featured: true,
    display_order: 1
  })

  useEffect(() => {
    setBrands(brandStore.getBrands())
  }, [])

  const handleOpenEdit = (brand?: Brand) => {
    if (brand) {
      setFormData({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        tagline: brand.tagline,
        description: brand.description,
        logo_mobile: brand.logo_mobile,
        logo_desktop: brand.logo_desktop,
        featured: brand.featured,
        display_order: brand.display_order
      })
    } else {
      setFormData({
        name: '',
        slug: '',
        tagline: '',
        description: '',
        logo_mobile: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
        logo_desktop: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=1200&q=80',
        featured: true,
        display_order: brands.length + 1
      })
    }
    setIsEditModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    
    // Save to our catalog store helper
    brandStore.saveBrand(formData)
    
    setBrands(brandStore.getBrands())
    setSaving(false)
    setSuccess(true)
    
    setTimeout(() => {
      setIsEditModalOpen(false)
      setSuccess(false)
    }, 1000)
  }

  const handleDelete = (id: string) => {
    brandStore.deleteBrand(id)
    setBrands(brandStore.getBrands())
    setIsDeleteModalOpen(null)
  }

  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.tagline.toLowerCase().includes(search.toLowerCase())
  )

  const inputClass = "w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3.5 text-xs text-white placeholder-white/20 focus:border-gold focus:outline-none focus:bg-black transition-all font-mono"
  const labelClass = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-white/50 font-mono"

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto text-white font-mono">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 font-sans">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white uppercase">Brands Directory</h1>
            <span className="bg-gold/10 border border-gold/30 px-3 py-0.5 font-mono text-xs font-bold text-gold rounded-none">
              {filteredBrands.length} Active
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-white/50">
            Configure mobile &amp; desktop brand representations and mapping parameters
          </p>
        </div>

        <button
          onClick={() => handleOpenEdit()}
          className="flex items-center gap-2.5 rounded-none bg-gold px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-gold-light shadow-md self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Brand</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 p-4 border border-white/10">
        <div className="flex items-center gap-2 text-xs font-bold text-white/60">
          <Award className="h-4 w-4 text-gold" />
          <span>WCC Enterprise Garments Catalog Labels</span>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands by name..."
            className="w-full rounded-none border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 font-mono text-xs text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Brand Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBrands.map((brand, index) => (
          <div
            key={brand.id}
            className="border border-white/10 bg-white/5 p-6 flex flex-col justify-between h-[320px] rounded-none group hover:border-gold/40 hover:bg-white/10 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full border border-gold bg-gold/10 overflow-hidden relative flex-shrink-0">
                    <Image src={brand.logo_mobile} alt={brand.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-gold transition-colors">{brand.name}</h3>
                    <span className="text-[9px] font-mono text-white/40 uppercase">SLUG: {brand.slug}</span>
                  </div>
                </div>
                
                <span className="bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[9px] text-white/60 rounded-none">
                  Order: {brand.display_order}
                </span>
              </div>

              <p className="mt-4 text-xs font-bold text-white/80 line-clamp-1">{brand.tagline}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/50 line-clamp-4 font-light">{brand.description}</p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-white/10 mt-4">
              <button
                onClick={() => handleOpenEdit(brand)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all rounded-none"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>Modify</span>
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(brand.id)}
                className="flex h-10 w-10 items-center justify-center text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-none transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="border border-white/10 bg-white/5 p-16 text-center text-white/50 space-y-3 font-mono">
          <Award className="h-8 w-8 text-white/20 mx-auto" />
          <p>No brands currently indexed in local catalog telemetries.</p>
        </div>
      )}

      {/* Edit / Add Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-mono text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-none border border-white/10 bg-[#0E0E0E] p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-sans">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-gold" />
                  <h3 className="font-display text-xl font-bold uppercase">
                    {formData.id ? 'Modify Label Entry' : 'Create Label Node'}
                  </h3>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="text-white/40 hover:text-white">✕</button>
              </div>

              {success ? (
                <div className="py-8 text-center space-y-4 font-sans">
                  <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto rounded-full">
                    <CheckCircle2 className="h-8 w-8 animate-bounce" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-wider">Save Success</h4>
                  <p className="text-xs text-white/50 max-w-xs mx-auto leading-relaxed">
                    Brand parameters successfully registered and committed to localized network telemetry logs.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-4 font-sans">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Brand Label Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({
                          ...formData,
                          name: e.target.value,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                        })}
                        className={inputClass}
                        placeholder="e.g. TREASURE"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>URL Safe Slug *</label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={e => setFormData({...formData, slug: e.target.value})}
                        className={inputClass}
                        placeholder="treasure"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Brand Slogan Tagline *</label>
                    <input
                      type="text"
                      required
                      value={formData.tagline}
                      onChange={e => setFormData({...formData, tagline: e.target.value})}
                      className={inputClass}
                      placeholder="e.g. Sleek Tailoring & Bespoke Suits"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Comprehensive B2B Overview Descriptor *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className={inputClass}
                      placeholder="e.g. Known for premium-cut 100% Egyptian cotton shirts representing the apex of B2B corporate wear..."
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Desktop Cover Banner URL *</label>
                      <input
                        type="text"
                        required
                        value={formData.logo_desktop}
                        onChange={e => setFormData({...formData, logo_desktop: e.target.value})}
                        className={inputClass}
                        placeholder="Desktop Banner Image URL..."
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Mobile Portrait Emblem URL *</label>
                      <input
                        type="text"
                        required
                        value={formData.logo_mobile}
                        onChange={e => setFormData({...formData, logo_mobile: e.target.value})}
                        className={inputClass}
                        placeholder="Mobile Emblem Image URL..."
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-white/5">
                    <div>
                      <label className={labelClass}>Display Ordering Sequence</label>
                      <input
                        type="number"
                        required
                        value={formData.display_order}
                        onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 1})}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex items-center gap-3 h-full pt-6">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={e => setFormData({...formData, featured: e.target.checked})}
                        className="h-4 w-4 accent-gold rounded border-white/20 bg-black"
                      />
                      <label htmlFor="featured" className="text-xs text-white/80 cursor-pointer select-none">Feature on Homepage Carousel</label>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-6 font-mono">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 flex h-12 items-center justify-center gap-2 bg-gold text-black text-xs font-bold uppercase tracking-wider hover:bg-gold-light disabled:opacity-50 transition-all rounded-none shadow-md"
                    >
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span>Save Brand Details</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="flex-1 flex h-12 items-center justify-center border border-white/10 text-white/60 text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-all rounded-none"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-mono text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-none border border-white/10 bg-[#0E0E0E] p-8 shadow-2xl text-center space-y-6"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-none bg-red-500/10 border border-red-500/20 mx-auto text-red-400">
                <Trash2 className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white uppercase">Decommission Brand Label</h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed font-sans">
                  Are you sure you want to permanently decommission this brand label node? This action removes mapping indexes. Default products will be disassociated.
                </p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => setIsDeleteModalOpen(null)}
                  className="flex-1 rounded-none border border-white/10 bg-white/5 py-3 text-xs font-semibold text-white/70 hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(isDeleteModalOpen)}
                  className="flex-1 rounded-none bg-red-500 py-3 text-xs font-bold text-black hover:bg-red-400 transition-all shadow-lg"
                >
                  Confirm Decommission
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
