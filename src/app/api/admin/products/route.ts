import { NextResponse, NextRequest } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    let data: any[] = []
    try {
      const supabase = getSupabaseServerClient()
      const { data: dbData, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      data = dbData || []
    } catch (dbError) {
      console.warn('Admin Get Products DB error, returning empty list:', dbError)
      data = []
    }

    const formatted = data.map((p) => ({
      ...p,
      published: true,
    }))

    return NextResponse.json({ success: true, data: formatted })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = getSupabaseServerClient()
    
    const { data, error } = await supabase
      .from('products')
      .insert([body])
      .select()
      .single()
    
    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Product created',
      data,
    })
  } catch (error: any) {
    console.error('Admin Create Product error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}
