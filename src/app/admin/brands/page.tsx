'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Search, Edit2, Trash2, Save, Loader2, Award, CheckCircle2, ShieldCheck, Upload } from 'lucide-react'
import { api } from '@/lib/api'
import { Brand } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [search, setSearch] = useState('')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  
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
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    setLoading(true)
    try {
      const res = await api.admin.getBrands()
      if (res.success && res.data) {
        setBrands(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    } finally {
      setLoading(false)
    }
  }

  const [uploadingField, setUploadingField] = useState<string | null>(null)

  const handleFileFieldUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'logo_desktop' | 'logo_mobile') => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadingField(fieldName)
      try {
        const url = await api.uploadFile(file)
        setFormData(prev => ({ ...prev, [fieldName]: url }))
      } catch (err) {
        console.error('Failed to upload image:', err)
        alert('Failed to upload image. Please check Supabase configuration.')
      } finally {
        setUploadingField(null)
      }
    }
  }

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
    
    try {
      if (formData.id) {
        await api.admin.updateBrand(undefined, formData.id, formData)
      } else {
        await api.admin.createBrand(undefined, formData)
      }
      
      await fetchBrands()
      setSuccess(true)
      
      setTimeout(() => {
        setIsEditModalOpen(false)
        setSuccess(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to save brand:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.admin.deleteBrand(undefined, id)
      await fetchBrands()
      setIsDeleteModalOpen(null)
    } catch (error) {
      console.error('Failed to delete brand:', error)
    }
  }

  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.tagline.toLowerCase().includes(search.toLowerCase())
  )

  const inputClass = "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-xs text-neutral-900 placeholder-neutral-400 dark:border-white/10 dark:bg-black/60 dark:text-white dark:placeholder-white/20 focus:border-gold focus:outline-none focus:bg-gray-50 dark:focus:bg-black transition-all font-mono"
  const labelClass = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-white/50 font-mono"

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto text-neutral-900 dark:text-white font-mono">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-white/10 pb-6 font-sans">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase">Brands Directory</h1>
            <span className="bg-gold/10 border border-gold/30 px-3 py-0.5 font-mono text-xs font-bold text-gold rounded-none">
              {filteredBrands.length} Active
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-neutral-500 dark:text-white/50">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50 dark:bg-white/5 p-4 border border-neutral-200 dark:border-white/10">
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 dark:text-white/60">
          <Award className="h-4 w-4 text-gold" />
          <span>WCC Enterprise Garments Catalog Labels</span>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands by name..."
            className="w-full rounded-none border border-neutral-200 bg-white py-2.5 pl-10 pr-4 font-mono text-xs text-neutral-900 placeholder-neutral-400 dark:border-white/10 dark:bg-black/50 dark:text-white dark:placeholder-white/30 focus:border-gold focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Brand Cards Grid */}
      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>
      ) : (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBrands.map((brand, index) => (
          <div
            key={brand.id}
            className="border border-neutral-200 bg-white dark:border-white/10 dark:bg-white/5 p-6 flex flex-col justify-between h-[320px] rounded-none group hover:border-gold/40 hover:bg-neutral-50/50 dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full border border-gold bg-gold/10 overflow-hidden relative flex-shrink-0">
                    <Image src={brand.logo_mobile} alt={brand.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white group-hover:text-gold transition-colors">{brand.name}</h3>
                    <span className="text-[9px] font-mono text-neutral-400 dark:text-white/40 uppercase">SLUG: {brand.slug}</span>
                  </div>
                </div>
                
                <span className="bg-neutral-50 border border-neutral-200 dark:bg-white/5 dark:border-white/10 px-2 py-0.5 font-mono text-[9px] text-neutral-600 dark:text-white/60 rounded-none">
                  Order: {brand.display_order}
                </span>
              </div>

              <p className="mt-4 text-xs font-bold text-neutral-800 dark:text-white/80 line-clamp-1">{brand.tagline}</p>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-white/50 line-clamp-4 font-light">{brand.description}</p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-neutral-200 dark:border-white/10 mt-4">
              <button
                onClick={() => handleOpenEdit(brand)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 dark:text-white/70 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-white transition-all rounded-none"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>Modify</span>
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(brand.id)}
                className="flex h-10 w-10 items-center justify-center text-red-500 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-none transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {filteredBrands.length === 0 && (
        <div className="border border-neutral-200 bg-white dark:border-white/10 dark:bg-white/5 p-16 text-center text-neutral-400 dark:text-white/50 space-y-3 font-mono">
          <Award className="h-8 w-8 text-neutral-300 dark:text-white/20 mx-auto" />
          <p>No brands currently indexed in local catalog telemetries.</p>
        </div>
      )}

      {/* Edit / Add Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/85 backdrop-blur-md font-mono text-neutral-900 dark:text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-none border border-neutral-200 bg-white dark:border-white/10 dark:bg-[#0E0E0E] p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-4 font-sans">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-gold" />
                  <h3 className="font-display text-xl font-bold uppercase text-neutral-900 dark:text-white">
                    {formData.id ? 'Modify Label Entry' : 'Create Label Node'}
                  </h3>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="text-neutral-400 hover:text-neutral-600 dark:text-white/40 dark:hover:text-white">✕</button>
              </div>

              {success ? (
                <div className="py-8 text-center space-y-4 font-sans">
                  <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mx-auto rounded-full">
                    <CheckCircle2 className="h-8 w-8 animate-bounce" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Save Success</h4>
                  <p className="text-xs text-neutral-500 dark:text-white/50 max-w-xs mx-auto leading-relaxed">
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
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[9px] text-neutral-400 dark:text-white/30 font-mono uppercase">or select from device</span>
                        <input
                          id="brand-logo-desktop-file"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileFieldUpload(e, 'logo_desktop')}
                        />
                        <button
                          type="button"
                          disabled={uploadingField === 'logo_desktop'}
                          onClick={() => document.getElementById('brand-logo-desktop-file')?.click()}
                          className="flex items-center gap-1 px-2.5 py-1 font-mono text-[9px] font-bold text-gold border border-gold/20 bg-gold/5 hover:bg-gold hover:text-black transition-all rounded-none disabled:opacity-50"
                        >
                          {uploadingField === 'logo_desktop' ? <Loader2 className="h-2.5 w-2.5 animate-spin" /> : <Upload className="h-2.5 w-2.5" />}
                          <span>{uploadingField === 'logo_desktop' ? 'Uploading...' : 'Upload Banner'}</span>
                        </button>
                      </div>
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
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[9px] text-neutral-400 dark:text-white/30 font-mono uppercase">or select from device</span>
                        <input
                          id="brand-logo-mobile-file"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileFieldUpload(e, 'logo_mobile')}
                        />
                        <button
                          type="button"
                          disabled={uploadingField === 'logo_mobile'}
                          onClick={() => document.getElementById('brand-logo-mobile-file')?.click()}
                          className="flex items-center gap-1 px-2.5 py-1 font-mono text-[9px] font-bold text-gold border border-gold/20 bg-gold/5 hover:bg-gold hover:text-black transition-all rounded-none disabled:opacity-50"
                        >
                          {uploadingField === 'logo_mobile' ? <Loader2 className="h-2.5 w-2.5 animate-spin" /> : <Upload className="h-2.5 w-2.5" />}
                          <span>{uploadingField === 'logo_mobile' ? 'Uploading...' : 'Upload Emblem'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-neutral-100 dark:border-white/5">
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
                        className="h-4 w-4 accent-gold rounded border-neutral-300 dark:border-white/20 bg-white dark:bg-black"
                      />
                      <label htmlFor="featured" className="text-xs text-neutral-700 dark:text-white/80 cursor-pointer select-none">Feature on Homepage Carousel</label>
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
                      className="flex-1 flex h-12 items-center justify-center border border-neutral-200 text-neutral-500 hover:bg-neutral-100 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5 transition-all rounded-none text-xs font-bold uppercase tracking-wider"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/85 backdrop-blur-md font-mono text-neutral-900 dark:text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-none border border-neutral-200 bg-white dark:border-white/10 dark:bg-[#0E0E0E] p-8 shadow-2xl text-center space-y-6"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-none bg-red-500/10 border border-red-500/20 mx-auto text-red-500">
                <Trash2 className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white uppercase">Decommission Brand Label</h3>
                <p className="mt-2 text-xs text-neutral-500 dark:text-white/60 leading-relaxed font-sans">
                  Are you sure you want to permanently decommission this brand label node? This action removes mapping indexes. Default products will be disassociated.
                </p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => setIsDeleteModalOpen(null)}
                  className="flex-1 rounded-none border border-neutral-200 bg-neutral-50 py-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 transition-all"
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
