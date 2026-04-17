import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Project from '@/models/Project'
import { isAdminAuthenticated } from '@/lib/auth'

// GET /api/projects — public
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '100')

    const query: any = {}
    if (category && category !== 'All') query.category = category
    if (status) query.status = status
    if (featured === 'true') query.featured = true

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()

    return NextResponse.json({ success: true, data: projects, count: projects.length })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// POST /api/projects — admin only
export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const body = await req.json()
    const project = await Project.create(body)
    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}
