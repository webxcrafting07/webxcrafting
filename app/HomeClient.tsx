'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import WhatsAppButton from '@/components/WhatsAppButton'

/* ── tiny fade-up wrapper ── */
const FadeUp = ({ children, delay = 0, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

/* ── stat counter ── */
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'Syne',
          fontSize: 40,
          fontWeight: 800,
          background: 'linear-gradient(135deg,#4f6fff,#a259ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {number}
      </div>
      <div style={{ color: '#7b82a8', fontSize: 13, marginTop: 4 }}>{label}</div>
    </div>
  )
}

/* ── service card ── */
function ServiceCard({ icon, title, description, price, originalPrice, popular }: any) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(0,0,0,0.45)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        borderRadius: 20,
        padding: 32,
        background: popular
          ? 'linear-gradient(135deg,rgba(79,111,255,.18),rgba(162,89,255,.14))'
          : 'rgba(10,14,28,0.65)',
        backdropFilter: 'blur(20px)',
        border: popular ? '1px solid rgba(79,111,255,.4)' : '1px solid rgba(99,120,255,.15)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {popular && (
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'linear-gradient(135deg,#4f6fff,#a259ff)',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          POPULAR
        </div>
      )}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: popular ? 'linear-gradient(135deg,#4f6fff,#a259ff)' : 'rgba(79,111,255,.12)',
          border: popular ? 'none' : '1px solid rgba(79,111,255,.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, marginBottom: 10, fontStyle: 'italic' }}>{title}</h3>
      <p style={{ color: '#7b82a8', fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>{description}</p>
      <div
        style={{
          fontFamily: 'Syne',
          display: 'flex',
          alignItems: 'baseline',
          gap: 10,
          flexWrap: 'wrap',
          marginBottom: 10,
        }}
      >
        {originalPrice && originalPrice > price && (
          <span style={{ fontSize: 16, fontWeight: 400, color: '#7b82a8', textDecoration: 'line-through' }}>
            ₹{Number(originalPrice).toLocaleString('en-IN')}
          </span>
        )}
        <div
          style={{
            fontSize: 30,
            fontWeight: 800,
            ...(popular
              ? {
                  background: 'linear-gradient(135deg,#4f6fff,#a259ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
              : { color: '#e8eaf6' }),
          }}
        >
          ₹{Number(price).toLocaleString('en-IN')}
        </div>
      </div>
    </motion.div>
  )
}

/* ── project card ── */
function ProjectCard({ title, description, category, status }: any) {
  const catColors: Record<string, string> = {
    Business: '#4f6fff',
    'E-commerce': '#a259ff',
    Custom: '#00e5ff',
    'Job Portal': '#00e676',
  }
  const catIcons: Record<string, string> = {
    Business: '🌐',
    'E-commerce': '🛒',
    Custom: '⚙️',
    'Job Portal': '💼',
  }
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280 }}
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        background: 'rgba(10,14,28,0.65)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(99,120,255,.15)',
      }}
    >
      <div
        style={{
          height: 180,
          background: `linear-gradient(135deg,${catColors[category] || '#4f6fff'}22,${catColors[category] || '#a259ff'}44)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 56,
        }}
      >
        {catIcons[category] || '🌐'}
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <span className={`tag ${status === 'completed' ? 'tag-green' : 'tag-orange'}`} style={{ fontSize: 11, padding: '3px 10px' }}>
            {status === 'completed' ? '✓ Completed' : '⟳ Ongoing'}
          </span>
          <span
            className="tag"
            style={{
              fontSize: 11,
              padding: '3px 10px',
              background: `${catColors[category] || '#4f6fff'}18`,
              color: catColors[category] || '#4f6fff',
              borderColor: `${catColors[category] || '#4f6fff'}35`,
            }}
          >
            {category}
          </span>
        </div>
        <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 17, marginBottom: 8, fontStyle: 'italic' }}>{title}</h3>
        <p style={{ color: '#7b82a8', fontSize: 14, lineHeight: 1.65 }}>{description}</p>
      </div>
    </motion.div>
  )
}

/* ── testimonial card ── */
function TestimonialCard({ name, role, text, initials }: any) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280 }}
      className="glass"
      style={{ padding: 28, borderRadius: 20 }}
    >
      <div style={{ fontSize: 36, color: '#4f6fff', marginBottom: 16, lineHeight: 1 }}>❝</div>
      <p style={{ color: '#b0b8d8', lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>{text}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#4f6fff,#a259ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{name}</div>
          <div style={{ color: '#7b82a8', fontSize: 13 }}>{role}</div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────── */

const defaultServices = [
  { icon: '🌐', title: 'Business Website', description: 'Professional multi-page website with SEO, contact forms, and responsive design.', price: 8000, originalPrice: 12000, popular: false },
  { icon: '🛒', title: 'E-commerce Website', description: 'Full-featured online store with payments, inventory, and order tracking.', price: 25000, originalPrice: 35000, popular: true },
  { icon: '💼', title: 'Job Portal', description: 'Complete hiring platform with employer/candidate dashboards and AI matching.', price: 45000, originalPrice: 60000, popular: false },
  { icon: '⚙️', title: 'Custom Website', description: 'Tailored web apps, SaaS platforms, and dashboards built to your spec.', price: 60000, originalPrice: 80000, popular: false },
]

const defaultProjects = [
  { title: 'TechStart Landing', description: 'Animated landing page with lead capture & blog for a tech startup.', category: 'Business', status: 'completed' },
  { title: 'FashionHub Store', description: 'E-commerce with 500+ products, Razorpay integration, and inventory mgmt.', category: 'E-commerce', status: 'completed' },
  { title: 'JobsIndia Portal', description: 'Job listing platform with employer/candidate dashboards and notifications.', category: 'Job Portal', status: 'ongoing' },
]

const testimonials = [
  { name: 'Arjun Mehta', role: 'Founder, TechStart', text: 'WebXCrafting delivered a stunning e-commerce site in just 2 weeks. Sales went up 40% in the first month!', initials: 'AM' },
  { name: 'Priya Sharma', role: 'CEO, FashionHub', text: 'Incredible work! The design is exactly what I wanted — modern, fast, and converts like crazy.', initials: 'PS' },
  { name: 'Rahul Verma', role: 'Director, JobsIndia', text: 'Our job portal handles thousands of users daily. Zero downtime, blazing fast. Absolutely recommend!', initials: 'RV' },
]

export default function HomeClient() {
  const [services, setServices] = useState(defaultServices)
  const [projects, setProjects] = useState(defaultProjects)

  useEffect(() => {
    // Fetch live data from MongoDB
    fetch('/api/services')
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data.length) setServices(d.data) })
      .catch(() => {})

    fetch('/api/projects?limit=3&featured=true')
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data.length) setProjects(d.data.slice(0, 3)) })
      .catch(() => {})
  }, [])

  return (
    <>
      <DotBackground />
      <Navbar />

      {/* ─── HERO ────────────────────────────────── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '130px 32px 80px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 860 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label" style={{ margin: '0 auto 24px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4f6fff', display: 'inline-block' }} />
              Welcome to WebXCrafting
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Syne',
              fontSize: 'clamp(38px, 6.5vw, 76px)',
              fontWeight: 800,
              fontStyle: 'italic',
              lineHeight: 1.08,
              marginBottom: 28,
            }}
          >
            We Build{' '}
            <span className="shimmer-text">Premium Websites</span>
            <br />
            at Affordable Prices
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              color: '#7b82a8',
              fontSize: 'clamp(16px, 2vw, 19px)',
              lineHeight: 1.75,
              maxWidth: 620,
              margin: '0 auto 48px',
            }}
          >
            From business sites to full-scale e-commerce platforms — we craft fast, beautiful, and conversion-optimized web experiences that grow your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/contact" className="btn-primary">Get Started →</Link>
            <Link href="/portfolio" className="btn-outline">View Portfolio</Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{ display: 'flex', gap: 56, justifyContent: 'center', marginTop: 72, flexWrap: 'wrap' }}
          >
            <StatCard number="50+" label="Projects Done" />
            <StatCard number="98%" label="Client Satisfaction" />
            <StatCard number="3yr" label="Experience" />
            <StatCard number="24/7" label="Support" />
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────────── */}
      <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>Our Services</div>
          <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, fontStyle: 'italic' }}>
            Everything You Need to <span className="grad-text">Succeed Online</span>
          </h2>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {services.map((s: any, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <ServiceCard {...s} />
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/services" className="btn-outline">View All Services →</Link>
          </div>
        </FadeUp>
      </section>

      {/* ─── PORTFOLIO ───────────────────────────── */}
      <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>Portfolio</div>
          <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, fontStyle: 'italic' }}>
            Featured <span className="grad-text">Projects</span>
          </h2>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {projects.map((p: any, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <ProjectCard {...p} />
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/portfolio" className="btn-outline">View All Projects →</Link>
          </div>
        </FadeUp>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────── */}
      <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>Testimonials</div>
          <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, fontStyle: 'italic' }}>
            What Clients <span className="grad-text">Say</span>
          </h2>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <TestimonialCard {...t} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────── */}
      <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <FadeUp>
          <div
            style={{
              borderRadius: 24,
              background: 'linear-gradient(135deg,rgba(79,111,255,.18),rgba(162,89,255,.14))',
              border: '1px solid rgba(99,120,255,.25)',
              padding: '72px 48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(79,111,255,.18),transparent 70%)' }} />
            <div style={{ position: 'absolute', bottom: -80, left: -80, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(162,89,255,.18),transparent 70%)' }} />
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(26px,4vw,48px)', fontWeight: 800, fontStyle: 'italic', marginBottom: 16, position: 'relative' }}>
              Ready to Build Your Dream Website?
            </h2>
            <p style={{ color: '#7b82a8', fontSize: 17, marginBottom: 40, maxWidth: 540, margin: '0 auto 40px', position: 'relative' }}>
              Turn your vision into reality. Get a free consultation and custom quote today.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link href="/contact" className="btn-primary">Start Your Project</Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919000000000'}?text=${process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hello%20I%20want%20a%20website'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ borderColor: 'rgba(37,211,102,.4)', color: '#25d366' }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
