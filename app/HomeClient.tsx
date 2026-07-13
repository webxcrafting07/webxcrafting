'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import WhatsAppButton from '@/components/WhatsAppButton'
import { FaCheck, FaMoneyBillWave, FaClipboardList, FaInfoCircle, FaRocket, FaGlobe, FaShoppingCart, FaBriefcase, FaCog, FaCalendarAlt, FaClock, FaArrowRight, FaLaptopCode, FaStore, FaUserTie, FaDatabase, FaAws } from 'react-icons/fa'
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiDocker, SiTailwindcss, SiFramer, SiPostgresql, SiRedis } from 'react-icons/si'
import { getServiceIcon } from '@/lib/icons'

/* ── tiny fade-up wrapper ── */
const FadeUp = ({ children, delay = 0, className = '', style }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
)

/* ── stat counter ── */
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(79,111,255,0.2)' }}
      style={{ 
        textAlign: 'center', 
        padding: '24px clamp(16px, 4vw, 32px)', 
        background: 'rgba(10,14,28,0.7)', 
        backdropFilter: 'blur(10px)',
        borderRadius: 20,
        border: '1px solid rgba(79,111,255,0.15)',
        minWidth: 130,
        flex: '1 1 130px'
      }}
    >
      <div
        style={{
          fontFamily: 'Syne',
          fontSize: 44,
          fontWeight: 800,
          background: 'linear-gradient(135deg,#4f6fff,#a259ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {number}
      </div>
      <div style={{ color: '#7b82a8', fontSize: 14, marginTop: 4, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>{label}</div>
    </motion.div>
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
      whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(79,111,255,0.2)' }}
      transition={{ type: 'spring', stiffness: 280 }}
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        background: 'rgba(10,14,28,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(99,120,255,.2)',
        cursor: liveLink && liveLink !== "#" ? 'pointer' : 'default',
        position: 'relative'
      }}
    >
      <div
        style={{
          height: 220,
          background: image 
            ? `url(${image}) center/cover no-repeat`
            : `linear-gradient(135deg,${catColors[category] || '#4f6fff'}22,${catColors[category] || '#a259ff'}44)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 64,
          color: catColors[category] || '#4f6fff',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          transition: 'all 0.5s'
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

/* ── FAQ item ── */
function FAQItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div 
      className="glass"
      style={{ 
        padding: '24px 32px', 
        borderRadius: 16, 
        border: isOpen ? '1px solid rgba(79,111,255,0.4)' : '1px solid rgba(99,120,255,0.1)',
        boxShadow: isOpen ? '0 12px 32px rgba(79,111,255,0.15)' : 'none',
        cursor: 'pointer',
        overflow: 'hidden'
      }}
      onClick={() => setIsOpen(!isOpen)}
      whileHover={{ scale: 0.99 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, margin: 0, color: isOpen ? '#4f6fff' : '#e8eaf6' }}>{q}</h4>
        <div style={{ fontSize: 20, color: isOpen ? '#4f6fff' : '#7b82a8', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'all 0.3s' }}>
          ▼
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
          >
            <p style={{ color: '#7b82a8', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── testimonial card ── */
function TestimonialCard({ name, role, text, initials }: any) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 24px 64px rgba(79,111,255,0.15)' }}
      transition={{ type: 'spring', stiffness: 280 }}
      className="glass"
      style={{ padding: 32, borderRadius: 24, border: '1px solid rgba(99,120,255,.2)' }}
    >
      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {[1,2,3,4,5].map(i => <div key={i} style={{ color: '#f59e0b', fontSize: 18 }}>★</div>)}
      </div>
      <p style={{ color: '#b0b8d8', lineHeight: 1.8, marginBottom: 28, fontSize: 15, fontStyle: 'italic' }}>"{text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#4f6fff,#a259ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 16,
            color: '#fff',
            flexShrink: 0,
            boxShadow: '0 8px 24px rgba(79,111,255,0.3)'
          }}
        >
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, fontFamily: 'Syne' }}>{name}</div>
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

export default function HomeClient({ initialBlogs = [] }: { initialBlogs?: any[] }) {
  const [services, setServices] = useState(defaultServices)
  const [projects, setProjects] = useState(defaultProjects)
  const [blogs, setBlogs] = useState<any[]>(initialBlogs)
  const [selectedService, setSelectedService] = useState<any>(null)
  const blogScrollRef = useRef<HTMLDivElement>(null)
  const projectScrollRef = useRef<HTMLDivElement>(null)

  const scrollBlogs = (direction: 'left' | 'right') => {
    if (blogScrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      blogScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  const scrollProjects = (direction: 'left' | 'right') => {
    if (projectScrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      projectScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  // Free SEO & Performance Audit lead capture states
  const [auditName, setAuditName] = useState('')
  const [auditUrl, setAuditUrl] = useState('')
  const [auditEmail, setAuditEmail] = useState('')
  const [auditPhone, setAuditPhone] = useState('')
  const [auditLoading, setAuditLoading] = useState(false)
  const [auditSuccess, setAuditSuccess] = useState(false)
  const [auditError, setAuditError] = useState('')

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuditLoading(true)
    setAuditError('')
    setAuditSuccess(false)

    if (!auditName || !auditUrl || !auditEmail || !auditPhone) {
      setAuditError('Please fill out all fields so we can deliver the audit!')
      setAuditLoading(false)
      return
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${auditName} (Audit Request)`,
          email: auditEmail,
          budget: 'Free Audit Program',
          message: `Requesting a FREE Technical SEO & PageSpeed Audit for: ${auditUrl}.\nContact WhatsApp / Mobile: ${auditPhone}.\nPlease perform Lighthouse score diagnostics, metadata headers checks, and mobile-responsiveness evaluation.`
        })
      })

      const data = await res.json()
      if (data.success) {
        setAuditSuccess(true)
        setAuditName('')
        setAuditUrl('')
        setAuditEmail('')
        setAuditPhone('')
      } else {
        setAuditError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setAuditError('Failed to connect to the server. Please check your internet connection.')
    } finally {
      setAuditLoading(false)
    }
  }

  useEffect(() => {
    // Fetch live data from MongoDB
    fetch('/api/services')
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data.length) setServices(d.data) })
      .catch(() => { })

    fetch('/api/projects?limit=3')
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data.length) setProjects(d.data.slice(0, 3)) })
      .catch(() => { })

    if (initialBlogs.length === 0) {
      fetch('/api/blogs?limit=8')
        .then((r) => r.json())
        .then((d) => { if (d.success && d.data.length) setBlogs(d.data) })
        .catch(() => { })
    }
  }, [initialBlogs])

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
          padding: 'clamp(100px, 15vw, 130px) clamp(16px, 5vw, 32px) clamp(40px, 10vw, 80px)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 960 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div 
              style={{ 
                margin: '0 auto 24px', 
                background: 'rgba(79,111,255,0.1)', 
                border: '1px solid rgba(79,111,255,0.3)', 
                padding: '6px 16px', 
                borderRadius: 30, 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: '#4f6fff',
                boxShadow: '0 4px 16px rgba(79,111,255,0.2)'
              }}
            >
              <div style={{ display: 'flex' }}>
                {[1,2,3,4,5].map(i => <div key={i} style={{ color: '#f59e0b', fontSize: 12 }}>★</div>)}
              </div>
              Trusted by 50+ Modern Businesses
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Syne',
              fontSize: 'clamp(32px, 7vw, 76px)',
              fontWeight: 800,
              fontStyle: 'italic',
              lineHeight: 1.05,
              marginBottom: 32,
              letterSpacing: '-1.5px'
            }}
          >
            Engineering <span className="shimmer-text">Premium</span>
            <br />
            Digital Experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              color: '#7b82a8',
              fontSize: 'clamp(16px, 2vw, 20px)',
              lineHeight: 1.7,
              maxWidth: 720,
              margin: '0 auto 48px',
            }}
          >
            We are an elite digital agency crafting lightning-fast, conversion-optimized e-commerce stores, SaaS platforms, and enterprise web applications. 
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/contact" className="btn-primary" style={{ height: 56, fontSize: 16, padding: '0 40px' }}>Start Your Project →</Link>
            <Link href="/portfolio" className="btn-outline" style={{ height: 56, fontSize: 16, padding: '0 40px' }}>View Portfolio</Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 80, flexWrap: 'wrap' }}
          >
            <StatCard number="50+" label="Projects Done" />
            <StatCard number="99%" label="Satisfaction" />
            <StatCard number="3yr+" label="Experience" />
            <StatCard number="<1s" label="Load Speed" />
          </motion.div>
        </div>
      </section>

      {/* ─── TECH STACK MARQUEE ──────────────────── */}
      <section style={{ padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(79,111,255,0.03)', position: 'relative', zIndex: 10, overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#7b82a8', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>Powered By Enterprise Tech Stack</div>
        <div className="marquee-container" style={{ width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}>
          <div className="marquee-content" style={{ gap: 60, opacity: 0.6 }}>
            {[
              { name: 'React.js', icon: <SiReact /> },
              { name: 'Next.js', icon: <SiNextdotjs /> },
              { name: 'Node.js', icon: <SiNodedotjs /> },
              { name: 'MongoDB', icon: <SiMongodb /> },
              { name: 'AWS', icon: <FaAws /> },
              { name: 'Docker', icon: <SiDocker /> },
              { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
              { name: 'Framer Motion', icon: <SiFramer /> },
              { name: 'PostgreSQL', icon: <SiPostgresql /> },
              { name: 'Redis', icon: <SiRedis /> },
            ].map((tech, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 800, fontFamily: 'Syne', color: '#b0b8d8', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 28, color: '#4f6fff' }}>{tech.icon}</span> {tech.name}
              </div>
            ))}
            {[
              { name: 'React.js', icon: <SiReact /> },
              { name: 'Next.js', icon: <SiNextdotjs /> },
              { name: 'Node.js', icon: <SiNodedotjs /> },
              { name: 'MongoDB', icon: <SiMongodb /> },
              { name: 'AWS', icon: <FaAws /> },
              { name: 'Docker', icon: <SiDocker /> },
              { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
              { name: 'Framer Motion', icon: <SiFramer /> },
              { name: 'PostgreSQL', icon: <SiPostgresql /> },
              { name: 'Redis', icon: <SiRedis /> },
            ].map((tech, i) => (
              <div key={i + 10} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 800, fontFamily: 'Syne', color: '#b0b8d8', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 28, color: '#4f6fff' }}>{tech.icon}</span> {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIGHTHOUSE SHOWCASE ─────────────────── */}
      <section style={{ padding: 'clamp(40px, 10vw, 100px) clamp(16px, 5vw, 32px)', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: 'clamp(32px, 8vw, 60px)', alignItems: 'center' }}>
          <div>
            <FadeUp>
              <div className="section-label" style={{ marginBottom: 20 }}>Core Web Vitals</div>
              <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, fontStyle: 'italic', marginBottom: 24, lineHeight: 1.1 }}>
                Lightning Fast.<br />
                <span className="grad-text">Zero Compromise.</span>
              </h2>
              <p style={{ color: '#7b82a8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                Did you know that 53% of mobile users abandon a site that takes longer than 3 seconds to load? We engineer our websites using Next.js and advanced caching to achieve perfect Lighthouse scores. Fast websites mean higher Google rankings and better conversion rates.
              </p>
              <ul style={{ display: 'grid', gap: 16, marginBottom: 40, listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#e8eaf6', fontWeight: 600 }}><div style={{ color: '#00e676' }}><FaCheck /></div> Sub-Second Page Loads</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#e8eaf6', fontWeight: 600 }}><div style={{ color: '#00e676' }}><FaCheck /></div> Next-Gen Image Optimization</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#e8eaf6', fontWeight: 600 }}><div style={{ color: '#00e676' }}><FaCheck /></div> Zero Cumulative Layout Shift (CLS)</li>
              </ul>
              <Link href="/services" className="btn-primary">Explore Our Tech →</Link>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(10,14,28,0.8) 0%, rgba(20,25,45,0.8) 100%)', 
              borderRadius: 32, 
              padding: '48px 32px', 
              border: '1px solid rgba(0,230,118,0.2)', 
              boxShadow: '0 20px 80px rgba(0,230,118,0.1), inset 0 0 40px rgba(0,230,118,0.05)',
              position: 'relative',
              backdropFilter: 'blur(20px)',
              width: '100%',
              maxWidth: '500px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px 24px', justifyItems: 'center' }}>
                {[
                  { label: 'Performance', score: 100 },
                  { label: 'Accessibility', score: 100 },
                  { label: 'Best Practices', score: 100 },
                  { label: 'SEO', score: 100 }
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                    <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 16 }}>
                      <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 12px rgba(0,230,118,0.4))' }}>
                        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,230,118,0.1)" strokeWidth="6" />
                        <motion.circle 
                          cx="60" cy="60" r="54" fill="none" stroke="#00e676" strokeWidth="6" 
                          strokeDasharray="339.29"
                          initial={{ strokeDashoffset: 339.29 }}
                          whileInView={{ strokeDashoffset: 0 }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div style={{ 
                        position: 'absolute', inset: 0, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 32, fontWeight: 900, color: '#00e676', fontFamily: 'Syne'
                      }}>
                        {stat.score}
                      </div>
                    </div>
                    <div style={{ color: '#e8eaf6', fontSize: 14, fontWeight: 700, fontFamily: 'Syne', letterSpacing: '0.5px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── HOW WE WORK ─────────────────────────── */}
      <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>Our Process</div>
          <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, fontStyle: 'italic' }}>
            How We <span className="grad-text">Build Success</span>
          </h2>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
          {[
            { step: '01', title: 'Discovery', desc: 'We analyze your business goals, target audience, and competition to create a winning strategy.' },
            { step: '02', title: 'Design', desc: 'Our UI/UX experts craft stunning, conversion-optimized wireframes and high-fidelity mockups.' },
            { step: '03', title: 'Development', desc: 'We engineer your platform using scalable, enterprise-grade tech for maximum performance.' },
            { step: '04', title: 'Launch & Scale', desc: 'Rigorous QA testing, deployment, and ongoing SEO/support to ensure massive growth.' }
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div 
                className="glass" 
                style={{ 
                  padding: 32, 
                  borderRadius: 24, 
                  height: '100%',
                  position: 'relative',
                  borderTop: '2px solid rgba(79,111,255,0.3)',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ fontSize: 48, fontWeight: 800, fontFamily: 'Syne', color: 'rgba(79,111,255,0.2)', marginBottom: 16, lineHeight: 1 }}>{item.step}</div>
                <h4 style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700, color: '#e8eaf6', marginBottom: 12 }}>{item.title}</h4>
                <p style={{ color: '#7b82a8', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </FadeUp>
          ))}
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
          <div 
            className="marquee-container"
            style={{
              width: "100vw",
              position: "relative",
              left: "50%",
              right: "50%",
              marginLeft: "-50vw",
              marginRight: "-50vw"
            }}
          >
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
        <FadeUp style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>Portfolio</div>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, fontStyle: 'italic', margin: 0 }}>
              Featured <span className="grad-text">Projects</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 12, marginLeft: 'auto' }}>
            <button 
              onClick={() => scrollProjects('left')}
              style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(10,14,28,0.7)', border: '1px solid rgba(99,120,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(79,111,255,0.2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(10,14,28,0.7)'}
            >
              ←
            </button>
            <button 
              onClick={() => scrollProjects('right')}
              style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(10,14,28,0.7)', border: '1px solid rgba(99,120,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(79,111,255,0.2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(10,14,28,0.7)'}
            >
              →
            </button>
          </div>
        </FadeUp>

        <div className="scroll-container" ref={projectScrollRef} style={{ scrollBehavior: 'smooth' }}>
          {projects.map((p: any, i) => (
            <FadeUp key={i} delay={i * 0.1} className="blog-scroll-item">
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
          <FadeUp style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="section-label" style={{ marginBottom: 20 }}>Insights</div>
              <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, fontStyle: 'italic', margin: 0 }}>
                Latest <span className="grad-text">Articles</span>
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 12, marginLeft: 'auto' }}>
              <button 
                onClick={() => scrollBlogs('left')}
                style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(10,14,28,0.7)', border: '1px solid rgba(99,120,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(79,111,255,0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(10,14,28,0.7)'}
              >
                ←
              </button>
              <button 
                onClick={() => scrollBlogs('right')}
                style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(10,14,28,0.7)', border: '1px solid rgba(99,120,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(79,111,255,0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(10,14,28,0.7)'}
              >
                →
              </button>
            </div>
          </FadeUp>

          <div className="scroll-container" ref={blogScrollRef} style={{ scrollBehavior: 'smooth' }}>
            {blogs.map((blog: any, i: number) => (
              <FadeUp key={blog._id} delay={i * 0.05} className="blog-scroll-item">
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(0,0,0,0.45)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    borderRadius: 24,
                    overflow: 'hidden',
                    background: 'rgba(10,14,28,0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(99,120,255,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ 
                      height: 220, 
                      background: blog.coverImage ? `url(${blog.coverImage}) center/cover no-repeat` : 'linear-gradient(135deg,rgba(79,111,255,0.1),rgba(162,89,255,0.15))',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.05)'
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

      {/* ─── FREE SEO & PERFORMANCE WEBSITE AUDIT SECTION (LEAD MAGNET) ─── */}
      <section 
        className="mobile-p-6"
        style={{ 
          padding: '80px 24px', 
          maxWidth: 1200, 
          margin: '0 auto', 
          position: 'relative', 
          zIndex: 10,
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div 
          className="glass-strong"
          style={{
            background: "linear-gradient(135deg, rgba(79,111,255,0.08), rgba(162,89,255,0.04))",
            border: "1px solid rgba(79,111,255,0.22)",
            borderRadius: 28,
            padding: "clamp(24px, 6vw, 56px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: 40,
            alignItems: "center"
          }}
        >
          {/* Left Column: Form / Success Card */}
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Lead Magnet Program</div>
            <h2 style={{ fontFamily: "Syne", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 800, fontStyle: "italic", lineHeight: 1.15, marginBottom: 16 }}>
              Is Your Competitor Outranking You? <span className="grad-text">Get a Free 5-Min Audit!</span>
            </h2>
            <p style={{ color: "#7b82a8", fontSize: 14.5, lineHeight: 1.65, marginBottom: 28 }}>
              Slow load times and bad mobile SEO kill over 80% of sales opportunities in India. Enter your URL and WhatsApp details—our core engineering team will manually run a comprehensive Lighthouse audit and send you a detailed diagnostic report on WhatsApp absolutely FREE!
            </p>

            <AnimatePresence mode="wait">
              {auditSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{
                    background: "rgba(0, 230, 118, 0.08)",
                    border: "1px solid rgba(0, 230, 118, 0.3)",
                    borderRadius: 20,
                    padding: 28,
                    textAlign: "center"
                  }}
                >
                  <div style={{ fontSize: 44, color: "#00e676", marginBottom: 16 }}>🚀</div>
                  <h4 style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e8eaf6", marginBottom: 10 }}>
                    Audit Request Logged Successfully!
                  </h4>
                  <p style={{ color: "#b0b8d8", fontSize: 13.5, lineHeight: 1.6 }}>
                    Our developers are running Lighthouse and Core Web Vitals diagnostics on your website right now. We will compile the results and WhatsApp your comprehensive PDF report to your phone within 2 hours!
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleAuditSubmit}
                  style={{ display: "grid", gap: 16 }}
                >
                  {auditError && (
                    <div style={{ color: "#ff1744", fontSize: 13, background: "rgba(255,23,68,0.08)", padding: "10px 16px", borderRadius: 10, border: "1px solid rgba(255,23,68,0.2)" }}>
                      ⚠️ {auditError}
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 16 }} className="mobile-grid-1">
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 12, color: "#7b82a8", fontWeight: 600 }}>Your Name *</label>
                      <input 
                        type="text" 
                        value={auditName}
                        onChange={(e) => setAuditName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="form-input" 
                        required
                        style={{ height: 48, background: "rgba(10,14,28,0.6)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", padding: "0 16px", color: "#fff", outline: "none" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 12, color: "#7b82a8", fontWeight: 600 }}>Business Email *</label>
                      <input 
                        type="email" 
                        value={auditEmail}
                        onChange={(e) => setAuditEmail(e.target.value)}
                        placeholder="e.g. contact@company.in"
                        className="form-input" 
                        required
                        style={{ height: 48, background: "rgba(10,14,28,0.6)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", padding: "0 16px", color: "#fff", outline: "none" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 16 }} className="mobile-grid-1">
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 12, color: "#7b82a8", fontWeight: 600 }}>Current Website URL *</label>
                      <input 
                        type="url" 
                        value={auditUrl}
                        onChange={(e) => setAuditUrl(e.target.value)}
                        placeholder="e.g. https://mycompany.com"
                        className="form-input" 
                        required
                        style={{ height: 48, background: "rgba(10,14,28,0.6)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", padding: "0 16px", color: "#fff", outline: "none" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 12, color: "#7b82a8", fontWeight: 600 }}>WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        value={auditPhone}
                        onChange={(e) => setAuditPhone(e.target.value)}
                        placeholder="e.g. +91 9999999999"
                        className="form-input" 
                        required
                        style={{ height: 48, background: "rgba(10,14,28,0.6)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", padding: "0 16px", color: "#fff", outline: "none" }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={auditLoading}
                    className="btn-primary"
                    style={{
                      height: 52,
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      cursor: auditLoading ? "not-allowed" : "pointer",
                      opacity: auditLoading ? 0.7 : 1
                    }}
                  >
                    {auditLoading ? (
                      <>Analyzing Domain...</>
                    ) : (
                      <>Get My Free SEO & Speed Report <FaArrowRight size={11} /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Diagnostic Features checklist */}
          <div
            style={{
              background: "rgba(10,14,28,0.75)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 22,
              padding: 30,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
          >
            <h4 style={{ fontFamily: "Syne", fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#e8eaf6" }}>
              What Your Report Includes:
            </h4>
            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ color: "#4f6fff", fontSize: 18, marginTop: 2 }}>✓</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#e8eaf6", fontSize: 14 }}>Core Web Vitals & Loading Diagnostics</div>
                  <div style={{ color: "#7b82a8", fontSize: 12, marginTop: 2 }}>Breakdown of Largest Contentful Paint (LCP) and visual shift (CLS) performance metrics.</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ color: "#a259ff", fontSize: 18, marginTop: 2 }}>✓</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#e8eaf6", fontSize: 14 }}>On-Page SEO & Hierarchy Verification</div>
                  <div style={{ color: "#7b82a8", fontSize: 12, marginTop: 2 }}>Verification of missing h1 elements, broken links, and metadata keyword efficiency.</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ color: "#00e5ff", fontSize: 18, marginTop: 2 }}>✓</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#e8eaf6", fontSize: 14 }}>Mobile UI Scaling & Viewport Check</div>
                  <div style={{ color: "#7b82a8", fontSize: 12, marginTop: 2 }}>Scanning responsive tap targets and layouts for seamless usability on Indian smartphones.</div>
                </div>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 12, fontSize: 11, color: "#7b82a8", marginTop: 24, textAlign: "center", border: "1px solid rgba(255,255,255,0.04)" }}>
              🔒 Your data is fully encrypted and never shared with third parties.
            </div>
          </div>
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
              <FAQItem q={item.q} a={item.a} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────── */}
      <section style={{ padding: '100px 32px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <FadeUp>
          <motion.div
            whileHover={{ y: -8, boxShadow: '0 32px 80px rgba(79,111,255,0.25)' }}
            style={{
              borderRadius: 32,
              background: 'linear-gradient(135deg, rgba(79,111,255,0.25), rgba(162,89,255,0.2))',
              border: '1px solid rgba(162,89,255,0.4)',
              padding: 'clamp(40px, 10vw, 80px) clamp(20px, 5vw, 48px)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4)'
            }}
          >
            <div style={{ position: 'absolute', top: -100, right: -50, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(79,111,255,.3),transparent 70%)', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', bottom: -100, left: -50, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(162,89,255,.3),transparent 70%)', filter: 'blur(40px)' }} />
            
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, fontStyle: 'italic', marginBottom: 20, position: 'relative', lineHeight: 1.1, color: '#fff' }}>
              Ready to Dominate <br />
              <span style={{ background: 'linear-gradient(135deg, #fff, #a259ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your Market?</span>
            </h2>
            <p style={{ color: '#e8eaf6', fontSize: 'clamp(15px, 4vw, 18px)', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', position: 'relative', lineHeight: 1.6 }}>
              Stop losing customers to slow, outdated websites. Let's engineer a high-performance digital experience that scales your business.
            </p>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 'clamp(48px, 6vw, 60px)', fontSize: 'clamp(14px, 4vw, 18px)', padding: '0 clamp(24px, 6vw, 48px)', boxShadow: '0 12px 32px rgba(79,111,255,0.4)', whiteSpace: 'nowrap' }}>
                Start Your Project Today <FaArrowRight size={14} style={{ marginLeft: 8 }} />
              </Link>
            </div>
          </motion.div>
        </FadeUp>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
