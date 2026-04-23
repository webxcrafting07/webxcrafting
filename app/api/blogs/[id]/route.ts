import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Blog from '@/models/Blog'
import { isAdminAuthenticated } from '@/lib/auth'

// GET /api/blogs/:id — public (by ID or slug)
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params

    // Try finding by slug first, then by ID
    let blog = await Blog.findOne({ slug: id }).lean()
    if (!blog) {
      blog = await Blog.findById(id).lean()
    }

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 })
    }

    // Hide if not published or if scheduled in the future (unless admin)
    const isAdmin = isAdminAuthenticated(req)
    if (!isAdmin) {
      if (blog.status !== 'published') {
        return NextResponse.json({ success: false, message: 'Blog not published' }, { status: 403 })
      }
      if (blog.publishDate && new Date(blog.publishDate) > new Date()) {
        return NextResponse.json({ success: false, message: 'Blog is scheduled for later' }, { status: 403 })
      }
    }

    return NextResponse.json({ success: true, data: blog })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// PUT /api/blogs/:id — admin only
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()
    // Process tags from comma-separated string
    if (typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    }
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: blog })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}

// DELETE /api/blogs/:id — admin only
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectDB()
    const { id } = await params
    const blog = await Blog.findByIdAndDelete(id)
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
