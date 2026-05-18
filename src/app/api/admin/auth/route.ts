import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (email === 'admin@wccgarments.com' && password === 'wcc2026admin') {
      const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'fallback_secret_key_for_development_only_must_be_replaced')

      const token = await new SignJWT({ email, role: 'super_admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret)

      return NextResponse.json({
        success: true,
        data: { token, user: { email, name: 'WCC Admin', role: 'super_admin' } },
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
