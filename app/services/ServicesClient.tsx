'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import WhatsAppButton from '@/components/WhatsAppButton'
import { FaGlobe, FaShoppingCart, FaBriefcase, FaCog, FaCheck } from 'react-icons/fa'

const FadeUp = ({ children, delay = 0 }: any) => (
  <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
)

const defaultServices = [
  { _id: '1', icon: () => <FaGlobe size={26} />, title: 'Business Website', description: 'Professional multi-page website with SEO, contact forms, and responsive design.', price: 8000, originalPrice: 12000, popular: false, features: ['5 Pages', 'SEO Optimized', 'Mobile Responsive', 'Contact Form', '1 Month Support'] },
  { _id: '2', icon: () => <FaShoppingCart size={26} />, title: 'E-commerce Website', description: 'Full-featured online store with payments, inventory, and order tracking.', price: 25000, originalPrice: 35000, popular: true, features: ['Unlimited Products', 'Payment Gateway', 'Order Management', 'Inventory System', '3 Month Support'] },
  { _id: '3', icon: () => <FaBriefcase size={26} />, title: 'Job Portal', description: 'Complete hiring platform with employer/candidate dashboards and AI matching.', price: 45000, originalPrice: 60000, popular: false, features: ['Employer Dashboard', 'Candidate Portal', 'Application Tracking', 'Search & Filters', '6 Month Support'] },
  { _id: '4', icon: () => <FaCog size={26} />, title: 'Custom Website', description: 'Tailored web apps, SaaS platforms, and dashboards built to your spec.', price: 60000, originalPrice: 80000, popular: false, features: ['Custom Features', 'API Integration', 'Admin Dashboard', 'Cloud Deployment', '1 Year Support'] },
]

export default function ServicesClient() {
  const [services, setServices] = useState(defaultServices)

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data.length) setServices(d.data) })
      .catch(() => {})
  }, [])

  return (
    <>
      <DotBackground />
      <Navbar />
      <div className="mobile-p-6" style={{ position: 'relative', zIndex: 10, padding: '130px 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ margin: '0 auto 20px' }}>Pricing</div>
            <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px,5vw,64px)', fontWeight: 800, fontStyle: 'italic', marginBottom: 16 }}>
              Transparent <span className="grad-text">Pricing Plans</span>
            </h1>
            <p style={{ color: '#7b82a8', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>No hidden fees. No surprises. Just great work at fair prices.</p>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 64 }}>
          {services.map((s: any, i) => (
            <FadeUp key={s._id || i} delay={i * 0.09}>
              <motion.div
                whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{
                  borderRadius: 22,
                  padding: 32,
                  height: '100%',
                  background: s.popular ? 'linear-gradient(135deg,rgba(79,111,255,.18),rgba(162,89,255,.14))' : 'rgba(10,14,28,0.65)',
                  backdropFilter: 'blur(20px)',
                  border: s.popular ? '1px solid rgba(79,111,255,.42)' : '1px solid rgba(99,120,255,.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {s.popular && (
                  <div style={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(135deg,#4f6fff,#a259ff)', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700, color: '#fff' }}>POPULAR</div>
                )}
                <div style={{ width: 54, height: 54, borderRadius: 14, background: s.popular ? 'linear-gradient(135deg,#4f6fff,#a259ff)' : 'rgba(79,111,255,.12)', border: s.popular ? 'none' : '1px solid rgba(79,111,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 20, color: s.popular ? '#fff' : '#4f6fff' }}>
                  {typeof s.icon === 'function' ? s.icon() : s.icon}
                </div>
                <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 21, fontStyle: 'italic', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: '#7b82a8', fontSize: 14, lineHeight: 1.75, marginBottom: 24, flex: 1 }}>{s.description}</p>

                {s.features && s.features.length > 0 && (
                  <ul style={{ listStyle: 'none', marginBottom: 24 }}>
                    {s.features.map((f: string) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#b0b8d8', fontSize: 14, marginBottom: 8 }}>
                        <span style={{ color: '#00e676' }}><FaCheck size={13} /></span> {f}
                      </li>
                    ))}
                  </ul>
                )}

                <div style={{ fontFamily: 'Syne', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                    {s.originalPrice && s.originalPrice > s.price && (
                      <span style={{ fontSize: 18, fontWeight: 400, color: '#7b82a8', textDecoration: 'line-through', marginRight: 4 }}>
                        ₹{Number(s.originalPrice).toLocaleString('en-IN')}
                      </span>
                    )}
                    <span style={{ 
                      fontSize: 34, 
                      fontWeight: 800, 
                      ...(s.popular ? { background: 'linear-gradient(135deg,#4f6fff,#a259ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : { color: '#e8eaf6' }) 
                    }}>
                      ₹{Number(s.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <Link href="/contact" className={s.popular ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', display: 'flex' }}>
                  Get Started →
                </Link>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Custom CTA */}
        <FadeUp delay={0.3}>
          <div className="glass mobile-p-6" style={{ padding: '40px 48px', borderRadius: 20, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 24, fontStyle: 'italic', marginBottom: 12 }}>Need something custom?</h3>
            <p style={{ color: '#7b82a8', marginBottom: 28, fontSize: 15 }}>Every project is unique. Tell us about yours and we will craft a tailored quote.</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">Get Custom Quote</Link>
              <a href="https://wa.me/919000000000?text=Hello%20I%20need%20a%20custom%20website%20quote" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ borderColor: 'rgba(37,211,102,.4)', color: '#25d366' }}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
