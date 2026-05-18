import { NextRequest, NextResponse } from 'next/server'
import { EnquirySchema } from '@/lib/validations'
import { ZodError } from 'zod'

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

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully. Our team will contact you within 24 hours.',
      id: enquiryId,
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
