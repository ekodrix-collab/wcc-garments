/**
 * GET  /api/admin/newsletter  — list all subscribers
 * DELETE /api/admin/newsletter?id=xxx — remove a subscriber
 * TODO: replace subscriberStore with Supabase queries later.
 */
import { NextRequest, NextResponse } from 'next/server'
import { subscriberStore } from '@/lib/newsletter-store'

export async function GET() {
  const subscribers = subscriberStore.getAll()
  return NextResponse.json({ success: true, data: subscribers, total: subscribers.length })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ success: false, message: 'ID is required.' }, { status: 400 })
  }
  subscriberStore.remove(id)
  return NextResponse.json({ success: true, message: 'Subscriber removed.' })
}
