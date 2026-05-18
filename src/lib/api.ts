const BASE = typeof window !== 'undefined' ? '' : (process.env.NEXT_PUBLIC_SITE_URL || '')

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'API request failed' }))
    throw new Error(error.message || 'API request failed')
  }

  return response.json()
}

export const api = {
  getDivisions: () =>
    fetcher('/api/divisions'),

  getProducts: (params?: {
    division?: string
    category?: string
    featured?: boolean
    is_new?: boolean
    is_offer?: boolean
    limit?: number
    offset?: number
    search?: string
  }) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          searchParams.set(k, String(v))
        }
      })
    }
    const qs = searchParams.toString()
    return fetcher(`/api/products${qs ? `?${qs}` : ''}`)
  },

  getProduct: (slug: string) =>
    fetcher(`/api/products/${slug}`),

  getCategories: (divisionSlug?: string) => {
    const url = divisionSlug
      ? `/api/categories?division=${divisionSlug}`
      : '/api/categories'
    return fetcher(url)
  },

  getMedia: (type?: string) => {
    const url = type ? `/api/media?type=${type}` : '/api/media'
    return fetcher(url)
  },

  submitEnquiry: (data: Record<string, unknown>) =>
    fetcher('/api/enquiry', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  admin: {
    login: (credentials: { email: string; password: string }) =>
      fetcher('/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),

    getProducts: (token: string) =>
      fetcher('/api/admin/products', {
        headers: { Authorization: `Bearer ${token}` },
      }),

    createProduct: (token: string, data: Record<string, unknown>) =>
      fetcher('/api/admin/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    updateProduct: (token: string, id: string, data: Record<string, unknown>) =>
      fetcher(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    deleteProduct: (token: string, id: string) =>
      fetcher(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }),

    getEnquiries: (token: string) =>
      fetcher('/api/admin/enquiries', {
        headers: { Authorization: `Bearer ${token}` },
      }),

    updateEnquiry: (token: string, id: string, data: Record<string, unknown>) =>
      fetcher(`/api/admin/enquiries/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    getMedia: (token: string) =>
      fetcher('/api/admin/media', {
        headers: { Authorization: `Bearer ${token}` },
      }),

    createMedia: (token: string, data: Record<string, unknown>) =>
      fetcher('/api/admin/media', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    broadcast: (token: string, data: Record<string, unknown>) =>
      fetcher('/api/admin/broadcast', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),
  },
}
