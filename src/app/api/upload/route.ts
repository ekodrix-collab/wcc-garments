import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Upload not configured. Please set up Supabase Storage.' },
    { status: 501 }
  )
}
