import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Blog from '@/models/Blog'
import { isAdminAuthenticated } from '@/lib/auth'

// GET /api/blogs — public (returns published only unless admin)
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const showAll = searchParams.get('all') === 'true'
    const isAdmin = isAdminAuthenticated(req)

    const filter: any = {}

    // Admin with ?all=true sees everything (for dashboard)
    if (isAdmin && showAll) {
      if (status) filter.status = status
    } else {
      // Public visitors & admin without ?all=true → only published + date passed
      filter.status = 'published'
      filter.publishDate = { $lte: new Date() }
    }

    if (category) filter.category = category
    if (featured === 'true') filter.featured = true

    const blogs = await Blog.find(filter).sort({ publishDate: -1, createdAt: -1 }).lean()
    return NextResponse.json({ success: true, data: blogs, count: blogs.length })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// POST /api/blogs — admin only
export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectDB()
    const body = await req.json()
    // Process tags from comma-separated string
    if (typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    }
    const blog = await Blog.create(body)
    return NextResponse.json({ success: true, data: blog }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}
