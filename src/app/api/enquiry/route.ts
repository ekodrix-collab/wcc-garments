import { NextRequest, NextResponse } from 'next/server'
import { EnquirySchema } from '@/lib/validations'
import { ZodError } from 'zod'
import { getSupabaseServerClient } from '@/lib/supabase'
import { fetchWithFallback } from '@/lib/db-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = EnquirySchema.parse(body)

    const enquiryId = crypto.randomUUID()

    console.log('New enquiry received:', {
      id: enquiryId,
      company: validated.company,
      country: validated.country,
      email: validated.email,
      source: validated.source || 'website',
    })

    const finalId = await fetchWithFallback(
      async () => {
        const supabase = getSupabaseServerClient()
        const { data, error } = await supabase
          .from('enquiries')
          .insert([
            {
              id: enquiryId,
              name: validated.name,
              company: validated.company,
              country: validated.country,
              phone: validated.phone,
              email: validated.email,
              business_type: validated.business_type,
              product_interest: validated.product_interest,
              quantity_range: validated.quantity_range,
              message: validated.message,
              product_id: validated.product_id || null,
              product_name: validated.product_name || null,
              source: validated.source || 'website',
            },
          ])
          .select('id')
          .single()

        if (error) {
          throw error
        }
        return data?.id || enquiryId
      },
      enquiryId,
      'Insert Enquiry'
    )

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully. Our team will contact you within 24 hours.',
      id: finalId,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Enquiry error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit enquiry' },
      { status: 500 }
    )
  }
}
