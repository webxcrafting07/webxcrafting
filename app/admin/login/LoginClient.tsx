'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import DotBackground from '@/components/DotBackground'
import Link from 'next/link'

export default function LoginClient() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) { toast.error('Enter email and password'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.success) {
        // Store token in localStorage for client-side API calls
        localStorage.setItem('admin_token', data.token)
        toast.success('Welcome back, Admin! 👋')
        router.push('/admin/dashboard')
      } else {
        toast.error(data.message || 'Invalid credentials')
      }
    } catch {
      toast.error('Network error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DotBackground />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass"
          style={{ width: '100%', maxWidth: 440, padding: 48, borderRadius: 24, textAlign: 'center' }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32, justifyContent: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#4f6fff,#a259ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', fontWeight: 800, fontSize: 22, color: '#fff' }}>X</div>
            <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20, color: '#e8eaf6' }}>WebX<span className="grad-text">Crafting</span></span>
          </Link>

          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg,rgba(79,111,255,.2),rgba(162,89,255,.2))', border: '1px solid rgba(79,111,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, margin: '0 auto 20px' }}>🔐</div>

          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 28, marginBottom: 6 }}>Admin Login</h2>
          <p style={{ color: '#7b82a8', fontSize: 14, marginBottom: 36 }}>Access your WebXCrafting dashboard</p>

          <div style={{ textAlign: 'left', marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#7b82a8', marginBottom: 7, fontWeight: 500 }}>Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="webxcrafting@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div style={{ textAlign: 'left', marginBottom: 32, position: 'relative' }}>
            <label style={{ display: 'block', fontSize: 13, color: '#7b82a8', marginBottom: 7, fontWeight: 500 }}>Password</label>
            <input
              className="form-input"
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              style={{ paddingRight: 44 }}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: 14, top: 38, background: 'none', border: 'none', color: '#7b82a8', cursor: 'pointer', fontSize: 16 }}
            >
              {showPass ? '🙈' : '👁'}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: 16, marginBottom: 20 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <><div className="spinner" />Logging in…</> : 'Login to Dashboard →'}
          </motion.button>

          <Link href="/" style={{ color: '#7b82a8', textDecoration: 'none', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'color .2s' }}
            onMouseEnter={(e: any) => e.currentTarget.style.color = '#e8eaf6'}
            onMouseLeave={(e: any) => e.currentTarget.style.color = '#7b82a8'}
          >
            ← Back to Website
          </Link>
        </motion.div>
      </div>
    </>
  )
}
