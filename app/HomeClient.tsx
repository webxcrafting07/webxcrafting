'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import WhatsAppButton from '@/components/WhatsAppButton'
import { FaCheck, FaMoneyBillWave, FaClipboardList, FaInfoCircle, FaRocket, FaGlobe, FaShoppingCart, FaBriefcase, FaCog, FaCalendarAlt, FaClock, FaArrowRight, FaLaptopCode, FaStore, FaUserTie, FaDatabase } from 'react-icons/fa'
import { getServiceIcon } from '@/lib/icons'

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
function ServiceCard({ icon, title, description, price, originalPrice, popular, onClick }: any) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(0,0,0,0.45)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        borderRadius: 20,
        padding: 32,
        cursor: 'pointer',
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
          width: 56,
          height: 56,
          borderRadius: 14,
          background: 'rgba(79,111,255,0.05)',
          border: '1px solid rgba(79,111,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          marginBottom: 20,
          color: '#4f6fff',
          boxShadow: 'inset 0 0 12px rgba(79,111,255,0.1)'
        }}
      >
        {getServiceIcon(icon, 24)}
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
function ProjectCard({ title, description, category, status, image, liveLink }: any) {
  const catColors: Record<string, string> = {
    Business: '#4f6fff',
    'E-commerce': '#a259ff',
    Custom: '#00e5ff',
    'Job Portal': '#00e676',
  }
  const getCatIcon = (category: string) => {
    const iconMap: Record<string, any> = {
      Business: FaGlobe,
      'E-commerce': FaShoppingCart,
      Custom: FaCog,
      'Job Portal': FaBriefcase,
    }
    const Icon = iconMap[category] || FaGlobe
    return <Icon size={56} />
  }
  return (
    <motion.div
      onClick={() => liveLink && liveLink !== "#" && window.open(liveLink, "_blank")}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280 }}
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        background: 'rgba(10,14,28,0.65)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(99,120,255,.15)',
        cursor: liveLink && liveLink !== "#" ? 'pointer' : 'default',
      }}
    >
      <div
        style={{
          height: 180,
          background: image 
            ? `url(${image}) center/cover no-repeat`
            : `linear-gradient(135deg,${catColors[category] || '#4f6fff'}22,${catColors[category] || '#a259ff'}44)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 56,
          color: catColors[category] || '#4f6fff',
        }}
      >
        {!image && getCatIcon(category)}
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <span className={`tag ${status === 'completed' ? 'tag-green' : 'tag-orange'}`} style={{ fontSize: 11, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
            {status === 'completed' ? <><FaCheck size={10} /> Completed</> : <>⟳ Ongoing</>}
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
      <div style={{ fontSize: 36, color: '#4f6fff', marginBottom: 16, lineHeight: 1 }}>"</div>
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
  {
    icon: 'FaLaptopCode',
    title: 'Business Website',
    description: 'Professional multi-page website with SEO, contact forms, and responsive design.',
    price: 8000,
    originalPrice: 12000,
    popular: false,
    features: ['5 Dynamic Pages', 'SEO Optimization', 'Mobile Responsive', 'Contact Forms', '1 Month Free Support'],
    paymentTerms: '50% Advance Payment',
    additionalCharges: 'Domain & Hosting are not included in this price',
    requirements: ['Company Logo', 'Business Content', 'Professional Images', 'Social Media Links'],
    detailedDescription: 'The Business Website package is designed for professionals and small businesses looking to establish a strong online presence. We include high-quality design, mobile-first responsiveness, and basic SEO to help you get found on Google.'
  },
  {
    icon: 'FaStore',
    title: 'E-commerce Website',
    description: 'Full-featured online store with payments, inventory, and order tracking.',
    price: 25000,
    originalPrice: 35000,
    popular: true,
    features: ['Unlimited Products', 'Payment Gateway', 'Order Management', 'Inventory System', '3 Month Support'],
    paymentTerms: '40% Advance, 30% after Design, 30% before Launch',
    additionalCharges: 'SMS/Email gateway charges & Hosting separate',
    requirements: ['Product Details', 'Pricing Strategy', 'Payment Gateway Credentials', 'Shipping Policy'],
    detailedDescription: 'Launch your online business with our robust E-commerce solution. We integrate secure payment gateways (Razorpay/Stripe), automated invoice generation, and a powerful admin panel.'
  },
  {
    icon: 'FaUserTie',
    title: 'Job Portal / Directory',
    description: 'Complete hiring platform with employer/candidate dashboards and AI matching.',
    price: 45000,
    originalPrice: 60000,
    popular: false,
    features: ['Employer Dashboard', 'Candidate Portal', 'Application Tracking', 'Search & Filters', '6 Month Support'],
    paymentTerms: '30% Advance, 40% after Development, 30% on Final Launch',
    additionalCharges: 'Cloud Server Hosting recommended (additional cost)',
    requirements: ['Portal Rules', 'Category List', 'Logo & Branding', 'Membership Tiers'],
    detailedDescription: 'A highly complex Job Portal or Business Directory with distinct user roles. Includes advanced search filters, notification systems, and an integrated blog for SEO growth.'
  },
  {
    icon: 'FaDatabase',
    title: 'Custom SaaS / Web App',
    description: 'Tailored web apps, SaaS platforms, and dashboards built to your spec.',
    price: 60000,
    originalPrice: 80000,
    popular: false,
    features: ['Custom UI/UX Design', 'API Integration', 'Advanced Admin Panel', 'Cloud Deployment', '1 Year Support'],
    paymentTerms: 'Milestone-based Payments (5-6 stages)',
    additionalCharges: 'Hosting and third-party API costs are separate',
    requirements: ['Detailed Feature List', 'Workflow/Flowchart', 'API Documentation (if any)', 'Reference Projects'],
    detailedDescription: 'For unique business ideas that don\'t fit into standard boxes. Whether you\'re building a SaaS platform, a custom CRM, or a unique marketplace.'
  },
  {
    icon: 'FaLaptopCode',
    title: 'School Management System',
    description: 'Complete digital solution for schools with student, fee, and exam management.',
    price: 35000,
    originalPrice: 50000,
    popular: false,
    features: ['Student & Staff Profiles', 'Attendance Tracking', 'Fee Management', 'Exam Result Portal', 'Parent-Teacher App'],
    paymentTerms: '40% Advance, 30% after Demo, 30% on Final Setup',
    additionalCharges: 'Server hosting & SMS gateway separate',
    requirements: ['School Logo', 'Student Data', 'Fee Structure', 'Staff Details'],
    detailedDescription: 'A comprehensive management system for educational institutions. Automate your school\'s daily operations, from attendance tracking to digital result generation and secure fee processing.'
  },
  {
    icon: 'FaStore',
    title: 'Inventory & POS System',
    description: 'Advanced stock tracking and point-of-sale system for retail shops and stores.',
    price: 15000,
    originalPrice: 22000,
    popular: false,
    features: ['Stock Tracking', 'Sales Reporting', 'Barcode Integration', 'Supplier Management', 'Low Stock Alerts'],
    paymentTerms: '50% Advance, 50% on Delivery',
    additionalCharges: 'POS Hardware & Hosting separate',
    requirements: ['Product List', 'Category Data', 'Supplier Info', 'Tax Configuration'],
    detailedDescription: 'Take control of your shop\'s inventory with our premium POS solution. Track every sale, monitor stock levels in real-time, and generate daily/monthly sales reports to grow your business efficiently.'
  },
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
  const [blogs, setBlogs] = useState<any[]>([])
  const [selectedService, setSelectedService] = useState<any>(null)

  useEffect(() => {
    // Fetch live data from MongoDB
    fetch('/api/services')
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data.length) setServices(d.data) })
      .catch(() => { })

    fetch('/api/projects?limit=3&featured=true')
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data.length) setProjects(d.data.slice(0, 3)) })
      .catch(() => { })

    fetch('/api/blogs?limit=8')
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data.length) setBlogs(d.data) })
      .catch(() => { })
  }, [])

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedService])

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
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Syne',
              fontSize: 'clamp(28px, 6.5vw, 64px)',
              fontWeight: 800,
              fontStyle: 'italic',
              lineHeight: 1.08,
              marginBottom: 28,
            }}
          >
            Best <span className="shimmer-text">Web Development Company</span>
            <br />
            in India for Premium Websites
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              color: '#7b82a8',
              fontSize: 'clamp(16px, 2vw, 19px)',
              lineHeight: 1.75,
              maxWidth: 700,
              margin: '0 auto 48px',
            }}
          >
            We are a leading digital agency crafting high-performance e-commerce stores, business websites, and custom web applications. Rank higher and convert better with our premium SEO-ready web solutions.
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

      <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>Premium Solutions</div>
          <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, fontStyle: 'italic' }}>
            Professional <span className="grad-text">Web Services</span> for Modern Businesses
          </h2>
        </FadeUp>
        {services.length > 4 ? (
          <div className="marquee-container">
            <div className="marquee-content" style={{ gap: 24 }}>
              {[...services, ...services].map((s: any, i) => (
                <div key={i} className="service-marquee-item">
                  <ServiceCard {...s} onClick={() => setSelectedService(s)} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="services-grid">
            {services.map((s: any, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <ServiceCard {...s} onClick={() => setSelectedService(s)} />
              </FadeUp>
            ))}
          </div>
        )}

        {selectedService && (
          <div
            className="animate-fade-in"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(3,5,10,0.9)",
              backdropFilter: "blur(20px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "100px 20px 40px",
              overflowY: "auto",
              textAlign: 'left'
            }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="glass-strong"
              style={{
                width: "100%",
                maxWidth: 800,
                maxHeight: "92vh",
                overflowY: "auto",
                padding: "0",
                position: "relative",
                borderRadius: 24,
                border: '1px solid rgba(79,111,255,0.3)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image/Background */}
              <div style={{ 
                height: 160, 
                background: 'linear-gradient(135deg, rgba(79,111,255,0.2), rgba(162,89,255,0.15))',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '0 40px',
                marginBottom: 60
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: -40,
                  width: 100,
                  height: 100,
                  borderRadius: 24,
                  background: 'rgba(79,111,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 44,
                  color: '#4f6fff',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                  border: '2px solid rgba(79,111,255,0.3)'
                }}>
                  {getServiceIcon(selectedService.icon, 44)}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.15)", rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedService(null)}
                  style={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    background: "rgba(0,0,0,0.3)",
                    backdropFilter: 'blur(10px)',
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    transition: "all 0.2s"
                  }}
                >
                  ✕
                </motion.button>
              </div>

              <div style={{ padding: 'clamp(20px, 5vw, 40px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
                  <div>
                    <h2 style={{ fontFamily: "Syne", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800, fontStyle: "italic", marginBottom: 8, letterSpacing: -1 }}>
                      {selectedService.title}
                    </h2>
                    <p style={{ color: '#7b82a8', fontSize: "clamp(14px, 2vw, 16px)", maxWidth: 500 }}>{selectedService.description}</p>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: "clamp(30px, 6vw, 40px)", fontWeight: 800, background: 'linear-gradient(135deg,#4f6fff,#a259ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
                      ₹{Number(selectedService.price).toLocaleString("en-IN")}
                    </div>
                    {selectedService.originalPrice && (
                      <div style={{ color: "#7b82a8", textDecoration: "line-through", fontSize: "clamp(14px, 3vw, 18px)", marginTop: 4 }}>
                        ₹{Number(selectedService.originalPrice).toLocaleString("en-IN")}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(20px, 5vw, 40px)" }}>
                  {/* Left Column */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                      <div style={{ color: '#4f6fff', background: 'rgba(79,111,255,0.1)', padding: 8, borderRadius: 10 }}><FaRocket size={18} /></div>
                      <h4 style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e8eaf6" }}>Package Includes</h4>
                    </div>
                    <ul style={{ listStyle: "none", display: "grid", gap: 14 }}>
                      {(selectedService.features || []).map((f: string, idx: number) => (
                        <li key={idx} style={{ display: "flex", alignItems: 'flex-start', gap: 12, color: "#b0b8d8", fontSize: 15, lineHeight: 1.4 }}>
                          <FaCheck size={14} style={{ color: "#00e676", marginTop: 4 }} /> {f}
                        </li>
                      ))}
                    </ul>

                    {selectedService.detailedDescription && (
                      <div style={{ marginTop: 40 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                          <div style={{ color: '#4f6fff', background: 'rgba(79,111,255,0.1)', padding: 8, borderRadius: 10 }}><FaInfoCircle size={18} /></div>
                          <h4 style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e8eaf6" }}>Detailed Breakdown</h4>
                        </div>
                        <p style={{ color: "#7b82a8", fontSize: 15, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                          {selectedService.detailedDescription}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                      <div style={{ color: '#4f6fff', background: 'rgba(79,111,255,0.1)', padding: 8, borderRadius: 10 }}><FaMoneyBillWave size={18} /></div>
                      <h4 style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e8eaf6" }}>Payment & Terms</h4>
                    </div>
                    <div style={{ padding: 24, borderRadius: 16, background: "rgba(79,111,255,0.06)", border: "1px solid rgba(79,111,255,0.12)", marginBottom: 32 }}>
                      <div style={{ marginBottom: 16 }}>
                        <p style={{ color: "#7b82a8", fontSize: 12, textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>Advance Payment</p>
                        <p style={{ color: "#e8eaf6", fontSize: 17, fontWeight: 600 }}>{selectedService.paymentTerms || "50% Advance"}</p>
                      </div>
                      <div>
                        <p style={{ color: "#7b82a8", fontSize: 12, textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>Notes</p>
                        <p style={{ color: "#e8eaf6", fontSize: 15 }}>{selectedService.additionalCharges || "Domain/Hosting charges are separate"}</p>
                      </div>
                    </div>

                    {selectedService.requirements?.length > 0 && (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                          <div style={{ color: '#4f6fff', background: 'rgba(79,111,255,0.1)', padding: 8, borderRadius: 10 }}><FaClipboardList size={18} /></div>
                          <h4 style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e8eaf6" }}>Requirements</h4>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                          {selectedService.requirements.map((r: string, idx: number) => (
                            <span key={idx} style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#b0b8d8', fontSize: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                              {r}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16, marginTop: 56, flexWrap: 'wrap' }}>
                  <Link href="/contact" className="btn-primary" style={{ flex: 2, minWidth: 200, height: 56 }}>
                    Book This Package →
                  </Link>
                  <a
                    href={`https://wa.me/919102615343?text=Hello%20I%20am%20interested%20in%20the%20${encodeURIComponent(selectedService.title)}%20package`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ flex: 1, minWidth: 200, height: 56, borderColor: "rgba(37,211,102,.4)", color: "#25d366" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#25d366" style={{ marginRight: 8 }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13.12 13.12 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg> WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
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
      
      {/* ─── LATEST BLOGS ────────────────────────── */}
      {blogs.length > 0 && (
        <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ margin: '0 auto 20px' }}>Insights</div>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, fontStyle: 'italic' }}>
              Latest <span className="grad-text">Articles</span>
            </h2>
          </FadeUp>

          <div className="scroll-container">
            {blogs.map((blog: any, i: number) => (
              <FadeUp key={blog._id} delay={i * 0.05} className="blog-scroll-item">
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(0,0,0,0.45)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    background: 'rgba(10,14,28,0.65)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(99,120,255,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ 
                      height: 180, 
                      background: blog.coverImage ? `url(${blog.coverImage}) center/cover no-repeat` : 'linear-gradient(135deg,rgba(79,111,255,0.1),rgba(162,89,255,0.15))',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {!blog.coverImage && <div style={{ fontSize: 40, opacity: 0.3 }}>📝</div>}
                      <div style={{
                        position: 'absolute', top: 14, left: 14, padding: '4px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                        background: 'rgba(3,5,10,0.75)', backdropFilter: 'blur(10px)', color: '#4f6fff', border: '1px solid rgba(79,111,255,0.3)'
                      }}>{blog.category}</div>
                    </div>
                  </Link>
                  <div style={{ padding: 22, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: 14, marginBottom: 10, color: '#7b82a8', fontSize: 12 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaCalendarAlt size={11} /> {new Date(blog.publishDate || blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaClock size={11} /> {blog.readTime} min</span>
                    </div>
                    <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ 
                        fontFamily: 'Syne', fontWeight: 700, fontSize: 18, marginBottom: 12, fontStyle: 'italic', color: '#e8eaf6',
                        lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                      }}>{blog.title}</h3>
                    </Link>
                    <p style={{ color: '#7b82a8', fontSize: 14, lineHeight: 1.6, marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.excerpt}</p>
                    <Link href={`/blog/${blog.slug}`} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#4f6fff', fontWeight: 600, textDecoration: 'none' }}>
                      Read More <FaArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/blog" className="btn-outline">View All Insights →</Link>
            </div>
          </FadeUp>
        </section>
      )}

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

      {/* ─── FAQ SECTION (SEO BOOST) ───────────────── */}
      <section style={{ padding: '80px 32px', maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>Questions</div>
          <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, fontStyle: 'italic' }}>
            Frequently Asked <span className="grad-text">Questions</span>
          </h2>
        </FadeUp>
        
        <div style={{ display: 'grid', gap: 20 }}>
          {[
            { q: "How much does a professional website cost in India?", a: "A basic professional business website starts from ₹8,000. For custom e-commerce or job portals, prices vary based on features, but we offer the most competitive premium pricing in India." },
            { q: "Do you provide SEO with website development?", a: "Yes, every website we build is SEO-optimized from the ground up, ensuring fast loading speeds, mobile responsiveness, and clean code structure to help you rank on Google." },
            { q: "Can you build custom e-commerce stores?", a: "Absolutely. We specialize in high-performance e-commerce solutions with custom dashboards, secure payment integrations, and advanced inventory management." },
            { q: "How long does it take to build a website?", a: "A standard business website typically takes 7-10 days, while complex platforms like job portals or SaaS web apps may take 3-6 weeks depending on the requirements." },
            { q: "Do you offer maintenance and support?", a: "Yes, we provide dedicated post-launch support and maintenance to ensure your website remains secure, updated, and performing at its best." }
          ].map((item, idx) => (
            <FadeUp key={idx} delay={idx * 0.05}>
              <div className="glass" style={{ padding: '24px 32px', borderRadius: 16, border: '1px solid rgba(99,120,255,0.1)' }}>
                <h4 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#e8eaf6' }}>{item.q}</h4>
                <p style={{ color: '#7b82a8', fontSize: 15, lineHeight: 1.6 }}>{item.a}</p>
              </div>
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25d366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13.12 13.12 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg> WhatsApp Us
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
