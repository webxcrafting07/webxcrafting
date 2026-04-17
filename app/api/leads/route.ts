import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Lead from '@/models/Lead'
import { isAdminAuthenticated } from '@/lib/auth'
import { sendLeadNotification, sendClientAutoReply } from '@/lib/email'

// POST /api/leads — public (contact form)
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const { name, email, budget, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const lead = await Lead.create({ name, email, budget, message })
    
    // Send email notifications (non-blocking)
    sendLeadNotification({ name, email, budget, message }).catch(err => 
      console.error('Failed to send admin notification:', err)
    )
    sendClientAutoReply(email, name).catch(err => 
      console.error('Failed to send client auto-reply:', err)
    )

    return NextResponse.json(
      { success: true, message: 'Message sent successfully! We will get back to you within 24 hours.', data: lead },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}

// GET /api/leads — admin only
export async function GET(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const query: any = {}
    if (status) query.status = status

    const leads = await Lead.find(query).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, data: leads, count: leads.length })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
