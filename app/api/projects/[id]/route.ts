import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Project from '@/models/Project'
import { isAdminAuthenticated } from '@/lib/auth'

// GET /api/projects/:id
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const project = await Project.findById(id).lean()
    if (!project) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: project })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// PUT /api/projects/:id — admin only
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()
    const project = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })
    if (!project) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: project })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}

// DELETE /api/projects/:id — admin only
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectDB()
    const { id } = await params
    const project = await Project.findByIdAndDelete(id)
    if (!project) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: 'Project deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
