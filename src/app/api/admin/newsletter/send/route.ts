import { NextResponse, NextRequest } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'
import { fetchWithFallback } from '@/lib/db-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subject, body: emailBody, recipientIds } = body
    
    // Simulate sending email / recording broadcast
    const supabase = getSupabaseServerClient()
    
    const data = await fetchWithFallback(
      async () => {
        const { data: newBroadcast, error } = await supabase
          .from('broadcasts')
          .insert([{ subject, body: emailBody, sent_to: recipientIds }])
          .select()
          .single()
        if (error) throw error
        return newBroadcast
      },
      { id: `mock-${Date.now()}`, subject, body: emailBody, sent_to: recipientIds },
      'Create Broadcast'
    )
    
    // In a real scenario, this is where we would integrate SendGrid, AWS SES, or NodeMailer
    console.log(`[Mock Send] Broadcast: "${subject}" to ${recipientIds === 'all' ? 'All Subscribers' : recipientIds.length + ' Subscribers'}`)
    
    return NextResponse.json({ success: true, data, message: 'Broadcast queued successfully' })
  } catch (error) {
    console.error('Error queuing broadcast:', error)
    return NextResponse.json({ success: false, error: 'Failed to queue broadcast' }, { status: 500 })
  }
}
