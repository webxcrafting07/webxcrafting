import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Lead from '@/models/Lead'
import { isAdminAuthenticated } from '@/lib/auth'

// PUT /api/leads/:id — update status (admin only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()
    const lead = await Lead.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!lead) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: lead })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}

// DELETE /api/leads/:id — admin only
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectDB()
    const { id } = await params
    const lead = await Lead.findByIdAndDelete(id)
    if (!lead) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: 'Lead deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
