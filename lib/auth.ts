import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  const cookie = req.cookies.get('admin_token')?.value
  return cookie || null
}

export function isAdminAuthenticated(req: NextRequest): boolean {
  const token = getTokenFromRequest(req)
  if (!token) return false
  const decoded = verifyToken(token)
  return decoded?.role === 'admin'
}
