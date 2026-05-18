'use client'

import { useState, useEffect, useCallback } from 'react'
import { MOCK_PRODUCTS } from '@/lib/constants'
import type { Product } from '@/types'

interface UseProductsOptions {
  division?: string
  category?: string
  featured?: boolean
  is_new?: boolean
  is_offer?: boolean
  limit?: number
  search?: string
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (options.division) params.set('division', options.division)
      if (options.category) params.set('category', options.category)
      if (options.featured) params.set('featured', 'true')
      if (options.is_new) params.set('is_new', 'true')
      if (options.is_offer) params.set('is_offer', 'true')
      if (options.limit) params.set('limit', String(options.limit))
      if (options.search) params.set('search', options.search)

      const qs = params.toString()
      const res = await fetch(`/api/products${qs ? `?${qs}` : ''}`)
      const json = await res.json()

      if (json.success) {
        setProducts(json.data || [])
        setTotal(json.total || 0)
      } else {
        throw new Error(json.error || 'Failed to fetch products')
      }
    } catch (err) {
      console.error('useProducts error:', err)
      const mockFiltered = MOCK_PRODUCTS.filter((p) => {
        if (options.division && p.division_slug !== options.division) return false
        if (options.featured && !p.featured) return false
        if (options.is_new && !p.is_new) return false
        if (options.is_offer && !p.is_offer) return false
        if (options.search && !p.name.toLowerCase().includes(options.search.toLowerCase())) return false
        return true
      })

      const mapped = mockFiltered.map((p) => ({
        ...p,
        division_id: '',
        category_id: null,
        description: p.short_description,
        custom_branding: false,
        video_url: null,
        published: true,
        view_count: 0,
        enquiry_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })) as unknown as Product[]

      setProducts(mapped)
      setTotal(mapped.length)
      setError(null)
    } finally {
      setLoading(false)
    }
  }, [options.division, options.category, options.featured, options.is_new, options.is_offer, options.limit, options.search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, total, refetch: fetchProducts }
}
