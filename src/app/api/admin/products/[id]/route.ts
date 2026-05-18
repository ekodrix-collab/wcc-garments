import { NextResponse } from 'next/server'

export async function PUT() {
  return NextResponse.json({ success: true, message: 'Product updated (mock mode)' })
}

export async function DELETE() {
  return NextResponse.json({ success: true, message: 'Product deleted (mock mode)' })
}
