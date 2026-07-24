import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Service from '@/models/Service'
import { isAdminAuthenticated } from '@/lib/auth'

export const revalidate = 3600; // Cache for 1 hour to save Vercel CPU

// GET /api/services — public
export async function GET() {
  try {
    await connectDB()
    const services = await Service.find().sort({ order: 1, createdAt: 1 }).lean()
    return NextResponse.json({ success: true, data: services, count: services.length })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// POST /api/services — admin only
export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectDB()
    const body = await req.json()
    const service = await Service.create(body)
    return NextResponse.json({ success: true, data: service }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}
