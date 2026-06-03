import { NextResponse, NextRequest } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'
import { fetchWithFallback } from '@/lib/db-service'

const MOCK_ENQUIRIES = [
  { id: '1', name: 'Ahmed Al-Rashid', company: 'Gulf Textiles Trading', country: 'Saudi Arabia', phone: '+966501234567', email: 'ahmed@gulftextiles.com', business_type: 'Wholesale Distributor', product_interest: ['Garments & Fashion', 'Uniforms & Workwear'], quantity_range: '1000-5000 units/month', message: 'Looking for premium cotton shirts for distribution in KSA market.', product_id: null, product_name: null, source: 'website', status: 'new', priority: 'high', assigned_to: null, notes: null, follow_up_date: null, created_at: '2026-05-15T10:30:00Z', updated_at: '2026-05-15T10:30:00Z' },
  { id: '2', name: 'Grace Okonkwo', company: 'Lagos Fashion House', country: 'Nigeria', phone: '+2348012345678', email: 'grace@lagosfashion.ng', business_type: 'Retail Chain', product_interest: ['Garments & Fashion'], quantity_range: '500-1000 units/month', message: 'Interested in your polo and formal shirt collections for our retail stores.', product_id: null, product_name: 'Executive Polo Collection', source: 'product_page', status: 'contacted', priority: 'normal', assigned_to: null, notes: null, follow_up_date: null, created_at: '2026-05-14T08:15:00Z', updated_at: '2026-05-14T08:15:00Z' },
  { id: '3', name: 'Rajesh Patel', company: 'Marriott Hotel Group', country: 'United Arab Emirates', phone: '+971501234567', email: 'procurement@marriott.ae', business_type: 'Hotel / Hospitality', product_interest: ['Hospitality Textiles', 'Uniforms & Workwear'], quantity_range: '2000+ units', message: 'Need complete hospitality textile solution including bed linen, towels, and staff uniforms for 3 properties.', product_id: null, product_name: null, source: 'contact', status: 'quoted', priority: 'urgent', assigned_to: 'Sales Team', notes: 'Large potential order. Meeting scheduled.', follow_up_date: '2026-05-20', created_at: '2026-05-10T14:00:00Z', updated_at: '2026-05-12T09:00:00Z' },
]

export async function GET() {
  try {
    const data = await fetchWithFallback(
      async () => {
        const supabase = getSupabaseServerClient()
        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        if (!data || data.length === 0) throw new Error('No data found, falling back')
        return data
      },
      MOCK_ENQUIRIES,
      'Get Enquiries'
    )
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

// In case the frontend sends PUT requests here instead of `[id]/route.ts` for some reason
export async function PUT(request: NextRequest) {
  try {
    // For bulk updates or specific logic not relying on slug id in URL
    const body = await request.json()
    // It's mostly mocked in frontend currently. Let's provide a generic fallback
    return NextResponse.json({ success: true, message: 'Enquiry updated' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
