import { NextResponse, NextRequest } from 'next/server'
import { MOCK_PRODUCTS } from '@/lib/constants'
import { getSupabaseServerClient } from '@/lib/supabase'
import { fetchWithFallback } from '@/lib/db-service'

export async function GET() {
  try {
    const data = await fetchWithFallback(
      async () => {
        const supabase = getSupabaseServerClient()
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        if (!data || data.length === 0) throw new Error('No products, falling back')
        
        return data.map((p) => ({
          ...p,
          published: true,
        }))
      },
      MOCK_PRODUCTS.map((p) => ({
        id: p.id, name: p.name, slug: p.slug, division: p.division,
        category: p.category, images: p.images, featured: p.featured,
        is_new: p.is_new, is_offer: p.is_offer, published: true,
        created_at: new Date().toISOString(),
      })),
      'Admin Get Products'
    )

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newProduct = await fetchWithFallback(
      async () => {
        const supabase = getSupabaseServerClient()
        const { data, error } = await supabase
          .from('products')
          .insert([body])
          .select()
          .single()
        
        if (error) throw error
        return data
      },
      { id: crypto.randomUUID(), ...body },
      'Admin Create Product'
    )

    return NextResponse.json({
      success: true,
      message: 'Product created',
      data: newProduct,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
