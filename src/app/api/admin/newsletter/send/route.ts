/**
 * POST /api/admin/newsletter/send
 * Sends a broadcast email to selected subscribers via Nodemailer + Gmail.
 *
 * Required .env.local variables:
 *   EMAIL_USER=youraddress@gmail.com
 *   EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   (16-char Gmail App Password)
 *
 * If env vars are not set, emails are logged to the console instead (safe fallback for dev).
 * TODO: replace nodemailer transport with Supabase Edge Function / Resend when scaling.
 */
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import path from 'path'
import { subscriberStore } from '@/lib/newsletter-store'

export async function POST(req: NextRequest) {
  try {
    const { subject, body, recipientIds } = await req.json() as {
      subject: string
      body: string
      recipientIds: string[] | 'all'
    }

    if (!subject?.trim() || !body?.trim()) {
      return NextResponse.json({ success: false, message: 'Subject and body are required.' }, { status: 400 })
    }

    // Resolve recipients
    const allSubscribers = subscriberStore.getAll().filter((s) => s.status === 'active')
    const targets =
      recipientIds === 'all'
        ? allSubscribers
        : allSubscribers.filter((s) => (recipientIds as string[]).includes(s.id))

    if (targets.length === 0) {
      return NextResponse.json({ success: false, message: 'No active subscribers selected.' }, { status: 400 })
    }

    const emails = targets.map((t) => t.email)

    // --- Nodemailer Transport ---
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_APP_PASSWORD

    if (!user || !pass) {
      // DEV FALLBACK: log instead of sending
      console.log('\n📧 [Newsletter Broadcast — DEV MODE, no credentials set]')
      console.log(`Subject: ${subject}`)
      console.log(`Recipients (${emails.length}): ${emails.join(', ')}`)
      console.log(`Body:\n${body}`)
      return NextResponse.json({
        success: true,
        message: `[DEV] Email logged to console. Set EMAIL_USER and EMAIL_APP_PASSWORD in .env.local to send real emails.`,
        sent: emails.length,
      })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    })

    const logoPath = path.join(process.cwd(), 'public', 'images', 'wcc-logo.png')

    // Send BCC batch (keeps recipient emails private from each other)
    await transporter.sendMail({
      from: `"WCC Fashions" <${user}>`,
      bcc: emails,
      subject,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111111; background-color: #ffffff; border: 1px solid #f0f0f0;">
          <!-- Premium Black Header -->
          <div style="background-color: #0A0A0A; padding: 32px; text-align: center; border-bottom: 3px solid #3B82F6;">
            <img src="cid:wcclogo" alt="WCC Fashions Logo" style="height: 56px; width: auto; display: block; margin: 0 auto 12px; filter: brightness(0) invert(1);" />
            <h1 style="font-size: 20px; font-weight: 300; letter-spacing: 0.15em; color: #ffffff; margin: 0; text-transform: uppercase;">
              WCC <span style="color: #3B82F6; font-weight: 600;">FASHIONS</span>
            </h1>
            <p style="font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: #a3a3a3; margin: 6px 0 0; font-family: monospace;">
              Western Clothing Co. — Est. 2001
            </p>
          </div>
          
          <!-- Content Body -->
          <div style="padding: 40px 32px; line-height: 1.8; font-size: 15px; background-color: #ffffff; white-space: pre-wrap; color: #262626;">${body}</div>
          
          <!-- B2B Blue CTA Divider -->
          <div style="padding: 0 32px 24px;">
            <div style="border-top: 1px solid #e5e5e5; padding-top: 24px; text-align: center;">
              <a href="mailto:${user}" style="display: inline-block; background-color: #3B82F6; color: #ffffff; font-weight: bold; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; padding: 14px 28px; text-decoration: none; border-radius: 0;">
                ✦ Reply to Sourcing Desk
              </a>
            </div>
          </div>

          <!-- Editorial Minimal Footer -->
          <div style="background-color: #fcfcfc; padding: 32px; border-top: 1px solid #f0f0f0; text-align: center; font-size: 11px; color: #737373;">
            <p style="margin: 0 0 8px 0; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; color: #171717;">
              MANUFACTURED AT INDUSTRIAL SCALE. DELIVERED WITH PRECISION.
            </p>
            <p style="margin: 0 0 16px 0; line-height: 1.6;">
              WCC Fashions LLC, Industrial Area, Dubai, United Arab Emirates.<br/>
              Leading wholesale manufacturer of uniforms, garments, and hospitality textiles.
            </p>
            <p style="margin: 0; font-size: 10px; color: #a3a3a3; border-top: 1px solid #f0f0f0; padding-top: 16px;">
              You received this because you are a registered sourcing partner. <br/>
              To opt-out, reply with "Unsubscribe" in the subject.
            </p>
          </div>
        </div>
      `,
      attachments: [{
        filename: 'wcc-logo.png',
        path: logoPath,
        cid: 'wcclogo'
      }]
    })

    console.log(`[Newsletter] Broadcast sent to ${emails.length} subscribers. Subject: "${subject}"`)

    return NextResponse.json({ success: true, message: `Email sent to ${emails.length} subscriber(s).`, sent: emails.length })
  } catch (err) {
    console.error('[Newsletter] Send error:', err)
    return NextResponse.json({ success: false, message: 'Failed to send email. Check server logs.' }, { status: 500 })
  }
}
