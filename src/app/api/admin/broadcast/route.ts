import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Broadcast sent (mock mode)',
    data: { id: crypto.randomUUID(), recipient_count: 0 },
  })
}
