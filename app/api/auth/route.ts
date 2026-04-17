import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Admin from '@/models/Admin'
import { signToken } from '@/lib/auth'

// POST /api/auth — login
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    let admin = await Admin.findOne({ email: email.toLowerCase() })
    if (!admin) {
      // Auto-create admin if not exists (for development)
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        admin = new Admin({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        })
        await admin.save()
      } else {
        return NextResponse.json(
          { success: false, message: 'Invalid credentials' },
          { status: 401 }
        )
      }
    }

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = signToken({ id: admin._id, email: admin.email, role: 'admin' })

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      admin: { email: admin.email },
    })

    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

// DELETE /api/auth — logout
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' })
  response.cookies.delete('admin_token')
  return response
}

// GET /api/auth — verify token
export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const { verifyToken } = await import('@/lib/auth')
  const decoded = verifyToken(token)

  if (!decoded) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, admin: { email: decoded.email } })
}
