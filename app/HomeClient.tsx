'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import WhatsAppButton from '@/components/WhatsAppButton'
import { FaShoppingCart, FaCog, FaBriefcase, FaGlobe, FaCheck, FaComments, FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa'
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
          color: popular ? '#fff' : '#4f6fff',
        }}
      >
        {typeof icon === 'function' ? icon() : getServiceIcon(icon, 24)}
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
  { icon: () => <FaGlobe size={24} />, title: 'Business Website', description: 'Professional multi-page website with SEO, contact forms, and responsive design.', price: 8000, originalPrice: 12000, popular: false },
  { icon: () => <FaShoppingCart size={24} />, title: 'E-commerce Website', description: 'Full-featured online store with payments, inventory, and order tracking.', price: 25000, originalPrice: 35000, popular: true },
  { icon: () => <FaBriefcase size={24} />, title: 'Job Portal', description: 'Complete hiring platform with employer/candidate dashboards and AI matching.', price: 45000, originalPrice: 60000, popular: false },
  { icon: () => <FaCog size={24} />, title: 'Custom Website', description: 'Tailored web apps, SaaS platforms, and dashboards built to your spec.', price: 60000, originalPrice: 80000, popular: false },
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
        <div className={services.length > 4 ? "scroll-container" : "services-grid"}>
          {services.map((s: any, i) => (
            <FadeUp key={i} delay={i * 0.08} className={services.length > 4 ? "service-scroll-item" : ""}>
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
