import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Service from '@/models/Service'
import { isAdminAuthenticated } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()
    const service = await Service.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!service) {
      return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: service })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectDB()
    const { id } = await params
    const service = await Service.findByIdAndDelete(id)
    if (!service) {
      return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: 'Service deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
