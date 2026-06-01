/**
 * POST /api/newsletter/subscribe
 * Accepts { email } and stores it in the in-memory subscriber store.
 * TODO: swap subscriberStore calls for Supabase inserts later.
 */
import { NextRequest, NextResponse } from 'next/server'
import { subscriberStore } from '@/lib/newsletter-store'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 })
    }

    // Check for duplicates
    if (subscriberStore.find(email)) {
      return NextResponse.json(
        { success: false, message: 'This email is already subscribed.' },
        { status: 409 }
      )
    }

    const subscriber = subscriberStore.add(email)
    console.log(`[Newsletter] New subscriber: ${subscriber.email} (Total: ${subscriberStore.count()})`)

    return NextResponse.json({ success: true, message: "You're on the list!" }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 })
  }
}
