import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Lead from '@/models/Lead'
import { sendCustomReply } from '@/lib/email'
import { isAdminAuthenticated } from '@/lib/auth'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await connectDB()
    const lead = await Lead.findById(id)

    if (!lead) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 })
    }

    const { message } = await req.json()
    if (!message) {
      return NextResponse.json({ success: false, message: 'Message is required' }, { status: 400 })
    }

    const emailSent = await sendCustomReply(lead.email, lead.name, message)

    if (emailSent) {
      lead.status = 'contacted'
      await lead.save()
      return NextResponse.json({ success: true, message: 'Reply sent successfully' })
    } else {
      return NextResponse.json({ success: false, message: 'Failed to send reply email' }, { status: 500 })
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
