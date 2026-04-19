'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import WhatsAppButton from '@/components/WhatsAppButton'
import { FaEnvelope, FaPhone, FaClock, FaGlobe } from 'react-icons/fa'

const WA_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919000000000'
const WA_MSG = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hello%20I%20want%20a%20website'
const WA = `https://wa.me/${WA_NUM}?text=${WA_MSG}`

const infoItems = [
  { icon: FaEnvelope, label: 'Email Us', value: 'webxcrafting@gmail.com' },
  { icon: FaPhone, label: 'Call / WhatsApp', value: '+91 9102615343' },
  { icon: FaClock, label: 'Response Time', value: 'Within 24 hours' },
  { icon: FaGlobe, label: 'Working Hours', value: 'Mon to Sat, 9AM to 7PM IST' },
]

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })
  const [loading, setLoading] = useState(false)

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error('Please enter a valid email address.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Message sent! We will get back to you within 24 hours.')
        setForm({ name: '', email: '', budget: '', message: '' })
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DotBackground />
      <Navbar />

      <div className="mobile-p-6" style={{ position: 'relative', zIndex: 10, padding: '130px 32px 80px', maxWidth: 1100, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>Contact Us</div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px,5vw,60px)', fontWeight: 800, fontStyle: 'italic', marginBottom: 16 }}>
            Build Something <span className="grad-text">Amazing</span>
          </h1>
          <p style={{ color: '#7b82a8', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
            Tell us about your project and we will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 40, alignItems: 'start' }}>
          {/* Left: contact info */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            {infoItems.map(({ icon: Icon, label, value }) => (
              <motion.div key={label} whileHover={{ y: -4 }} className="glass" style={{ padding: 20, marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center', borderRadius: 14 }}>
                <div style={{ fontSize: 28, minWidth: 36, textAlign: 'center', color: '#4f6fff' }}><Icon size={24} /></div>
                <div>
                  <div style={{ color: '#7b82a8', fontSize: 12, marginBottom: 3, fontWeight: 500 }}>{label}</div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{value}</div>
                </div>
              </motion.div>
            ))}

            <a href={WA} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', marginTop: 8 }}>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%', padding: '15px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg,#25d366,#128c7e)', color: '#fff',
                  fontFamily: 'DM Sans', fontWeight: 600, fontSize: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: '0 4px 24px rgba(37,211,102,.35)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13.12 13.12 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </motion.button>
            </a>
          </motion.div>

          {/* Right: form */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="glass mobile-p-6" style={{ padding: 40, borderRadius: 22 }}>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 22, fontStyle: 'italic', marginBottom: 28 }}>Send Us a Message</h3>

            <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#7b82a8', marginBottom: 7, fontWeight: 500 }}>Full Name *</label>
                <input className="form-input" placeholder="John Doe" value={form.name} onChange={(e) => set('name', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#7b82a8', marginBottom: 7, fontWeight: 500 }}>Email Address *</label>
                <input className="form-input" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#7b82a8', marginBottom: 7, fontWeight: 500 }}>Budget Range</label>
              <select className="form-input" value={form.budget} onChange={(e) => set('budget', e.target.value)}>
                <option value="">Select your budget</option>
                <option>Rs. 5,000 to Rs. 15,000</option>
                <option>Rs. 15,000 to Rs. 40,000</option>
                <option>Rs. 40,000 to Rs. 1,00,000</option>
                <option>Rs. 1,00,000+</option>
                <option>Open to discussion</option>
              </select>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#7b82a8', marginBottom: 7, fontWeight: 500 }}>Message *</label>
              <textarea
                className="form-input"
                rows={5}
                placeholder="Tell us about your project — what you need, your timeline, and any other details..."
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="btn-primary"
              style={{ width: '100%', padding: '15px', fontSize: 16 }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <><div className="spinner" />Sending...</>
              ) : (
                <>Send Message &rarr;</>
              )}
            </motion.button>

            <p style={{ color: '#7b82a8', fontSize: 12, textAlign: 'center', marginTop: 16 }}>
              Your info is safe. We never share your data.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
