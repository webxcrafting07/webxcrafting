'use client'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import WhatsAppButton from '@/components/WhatsAppButton'
import { FaBolt, FaPalette, FaDollarSign, FaLock, FaPhone, FaRocket } from 'react-icons/fa'

const FadeUp = ({ children, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

const skills = [
  'React.js', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS',
  'Framer Motion', 'PostgreSQL', 'AWS', 'Docker', 'TypeScript',
  'GraphQL', 'Redis', 'Prisma', 'Stripe', 'REST APIs',
]

const timeline = [
  { year: '2021', title: 'Started Freelancing', desc: 'Began building websites for local businesses, mastering the full stack from React to Node.js.' },
  { year: '2022', title: 'First 20 Clients', desc: 'Expanded to e-commerce and custom portals. Built a solid reputation for quality and speed.' },
  { year: '2023', title: 'Agency Formation', desc: 'Formed WebXCrafting to serve clients at scale with a professional, dedicated team.' },
  { year: '2024', title: '50+ Projects Delivered', desc: 'Delivered 50+ projects across industries with 98% client satisfaction.' },
]

const whyUs = [
  { icon: FaBolt, title: 'Lightning Fast', desc: 'Optimized for Core Web Vitals and sub-2s load times on every project.' },
  { icon: FaPalette, title: 'Premium Design', desc: 'Custom designs tailored to your brand, no templates, no shortcuts.' },
  { icon: FaDollarSign, title: 'Affordable Pricing', desc: 'Transparent pricing with no hidden costs or surprise invoices.' },
  { icon: FaLock, title: 'Secure & Reliable', desc: 'Enterprise-grade security with 99.9% uptime guaranteed.' },
  { icon: FaPhone, title: '24/7 Support', desc: 'Always reachable via WhatsApp, email, or phone call.' },
  { icon: FaRocket, title: 'On-Time Delivery', desc: 'We respect deadlines and deliver what we promise, when we promise.' },
]

export default function AboutClient() {
  return (
    <>
      <DotBackground />
      <Navbar />

      <div className="mobile-p-6" style={{ position: 'relative', zIndex: 10, padding: '130px 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <FadeUp>
          <div className="section-label" style={{ marginBottom: 20 }}>About Us</div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px,5vw,64px)', fontWeight: 800, fontStyle: 'italic', marginBottom: 20, maxWidth: 720, lineHeight: 1.1 }}>
            Passionate About{' '}
            <span className="grad-text">Digital Craftsmanship</span>
          </h1>
          <p style={{ color: '#7b82a8', fontSize: 18, lineHeight: 1.8, maxWidth: 640, marginBottom: 60 }}>
            WebXCrafting is a boutique agency focused on delivering premium,
            high-performance websites at prices that make sense for any business.
          </p>
        </FadeUp>

        <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
          <div>
            <FadeUp delay={0.1}>
              <p style={{ color: '#b0b8d8', lineHeight: 1.85, fontSize: 16, marginBottom: 20 }}>
                We believe every business deserves a stunning online presence.
                Our team combines deep technical expertise with a sharp eye for design
                to build websites that look incredible, load fast, and convert
                visitors into customers.
              </p>
              <p style={{ color: '#b0b8d8', lineHeight: 1.85, fontSize: 16, marginBottom: 44 }}>
                From a simple landing page to a complex SaaS platform, we approach
                every project with the same dedication and attention to detail.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontStyle: 'italic', marginBottom: 24, fontSize: 22 }}>Why Choose Us?</h3>
              <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {whyUs.map(({ icon: Icon, title, desc }) => (
                  <motion.div key={title} whileHover={{ y: -4 }} className="glass" style={{ padding: 20, borderRadius: 14 }}>
                    <div style={{ fontSize: 26, marginBottom: 10, color: '#4f6fff' }}><Icon size={26} /></div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{title}</div>
                    <div style={{ color: '#7b82a8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>

          <div>
            <FadeUp delay={0.2}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontStyle: 'italic', marginBottom: 20, fontSize: 22 }}>Our Tech Stack</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 52 }}>
                {skills.map((s) => (
                  <motion.span key={s} whileHover={{ scale: 1.08 }} className="tag" style={{ fontSize: 13, padding: '7px 14px', cursor: 'default' }}>
                    {s}
                  </motion.span>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.25}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontStyle: 'italic', marginBottom: 24, fontSize: 22 }}>Our Journey</h3>
              {timeline.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.div whileHover={{ scale: 1.1 }} style={{
                      width: 48, height: 48, borderRadius: '50%', minWidth: 48,
                      background: 'linear-gradient(135deg,#4f6fff,#a259ff)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, fontFamily: 'Syne',
                    }}>
                      {t.year}
                    </motion.div>
                    {i < timeline.length - 1 && (
                      <div style={{ width: 2, height: 36, background: 'linear-gradient(#4f6fff,rgba(79,111,255,0))', margin: '8px 0' }} />
                    )}
                  </div>
                  <div style={{ paddingTop: 10 }}>
                    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{t.title}</div>
                    <div style={{ color: '#7b82a8', fontSize: 14, lineHeight: 1.65 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </FadeUp>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
