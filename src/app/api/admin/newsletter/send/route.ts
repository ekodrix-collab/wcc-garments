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

    // Send BCC batch (keeps recipient emails private from each other)
    await transporter.sendMail({
      from: `"WCC Fashions" <${user}>`,
      bcc: emails,
      subject,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="border-bottom: 2px solid #C9A84C; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-size: 22px; font-weight: bold; letter-spacing: 0.05em; margin: 0;">
              WCC <span style="color: #C9A84C;">Fashions</span>
            </h1>
            <p style="font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #888; margin: 4px 0 0;">
              Western Clothing Co. — Est. 2001
            </p>
          </div>
          <div style="line-height: 1.8; font-size: 15px; white-space: pre-wrap;">${body}</div>
          <div style="margin-top: 40px; border-top: 1px solid #e5e5e5; padding-top: 16px; font-size: 11px; color: #999; letter-spacing: 0.15em; text-transform: uppercase;">
            You received this because you subscribed to WCC Fashions updates.<br/>
            To unsubscribe, reply with "Unsubscribe" in the subject.
          </div>
        </div>
      `,
    })

    console.log(`[Newsletter] Broadcast sent to ${emails.length} subscribers. Subject: "${subject}"`)

    return NextResponse.json({ success: true, message: `Email sent to ${emails.length} subscriber(s).`, sent: emails.length })
  } catch (err) {
    console.error('[Newsletter] Send error:', err)
    return NextResponse.json({ success: false, message: 'Failed to send email. Check server logs.' }, { status: 500 })
  }
}
