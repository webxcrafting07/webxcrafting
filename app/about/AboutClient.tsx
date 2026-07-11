'use client'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import WhatsAppButton from '@/components/WhatsAppButton'
import { FaBolt, FaPalette, FaDollarSign, FaLock, FaPhone, FaRocket, FaLinkedin, FaGraduationCap, FaLaptopCode, FaBriefcase } from 'react-icons/fa'

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

const team = [
  {
    name: 'Riyal Chandrakar',
    role: 'Co-Founder & Technical Lead',
    education: 'MCA Graduate',
    experience: '2+ Years Experience',
    projects: '30+ Projects Delivered',
    linkedin: 'https://www.linkedin.com/in/riyalchandrakar/',
    initials: 'RC',
    quote: '"Code is art, and scalability is the canvas. We build systems designed to last."',
    vision: 'With a deep passion for complex system architecture and performance optimization, Riyal focuses on building high-speed, secure infrastructures. His future roadmap includes integrating advanced AI automation tools directly into client web apps.'
  },
  {
    name: 'Nitesh Kumar',
    role: 'Co-Founder & Product Lead',
    education: 'MCA Graduate',
    experience: '2+ Years Experience',
    projects: '25+ Projects Delivered',
    linkedin: 'https://www.linkedin.com/in/nitesh-kumar654/',
    initials: 'NK',
    quote: '"Design is not just what it looks like; it\'s how deeply it connects with the user."',
    vision: 'Nitesh bridges the gap between powerful engineering and intuitive user experiences. He believes every website should tell a compelling brand story. Looking ahead, he aims to expand WebXCrafting into a full-scale digital product lab.'
  }
]

export default function AboutClient() {
  return (
    <>
      <DotBackground />
      <Navbar />

      <div className="mobile-p-6" style={{ position: 'relative', zIndex: 10, padding: '130px 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <FadeUp>
            <div className="section-label" style={{ margin: '0 auto 20px' }}>About Us</div>
            <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(36px,6vw,72px)', fontWeight: 800, fontStyle: 'italic', marginBottom: 24, lineHeight: 1.1, letterSpacing: '-1px' }}>
              Passionate About <br />
              <span className="grad-text">Digital Craftsmanship</span>
            </h1>
            <p style={{ color: '#7b82a8', fontSize: 'clamp(16px, 2vw, 18px)', maxWidth: 650, margin: '0 auto 40px', lineHeight: 1.6 }}>
              WebXCrafting is a premium digital agency focused on engineering high-performance, conversion-optimized websites that help businesses dominate their market.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 40, 
              justifyContent: 'center', 
              padding: '30px 40px', 
              background: 'rgba(79,111,255,0.05)', 
              borderRadius: 24, 
              border: '1px solid rgba(79,111,255,0.1)',
              maxWidth: 900,
              margin: '0 auto'
            }}>
              <div style={{ textAlign: 'center', flex: 1, minWidth: 150 }}>
                <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#e8eaf6', fontFamily: 'Syne' }}>50+</div>
                <div style={{ color: '#4f6fff', fontWeight: 600, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase' }}>Projects Delivered</div>
              </div>
              <div style={{ width: 1, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
              <div style={{ textAlign: 'center', flex: 1, minWidth: 150 }}>
                <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#e8eaf6', fontFamily: 'Syne' }}>15+</div>
                <div style={{ color: '#a259ff', fontWeight: 600, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase' }}>Cities Covered</div>
              </div>
              <div style={{ width: 1, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
              <div style={{ textAlign: 'center', flex: 1, minWidth: 150 }}>
                <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#e8eaf6', fontFamily: 'Syne' }}>99%</div>
                <div style={{ color: '#00e676', fontWeight: 600, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase' }}>Client Satisfaction</div>
              </div>
            </div>
          </FadeUp>
        </div>

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
                  <motion.div 
                    key={title} 
                    whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(79,111,255,0.2)" }} 
                    className="glass" 
                    style={{ 
                      padding: 24, 
                      borderRadius: 16, 
                      border: '1px solid rgba(79,111,255,0.1)',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{ 
                      width: 48, height: 48, borderRadius: 12, background: 'rgba(79,111,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, marginBottom: 16, color: '#4f6fff' 
                    }}>
                      <Icon />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, fontFamily: 'Syne' }}>{title}</div>
                    <div style={{ color: '#7b82a8', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
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
              <div style={{ padding: '32px', background: 'rgba(162,89,255,0.05)', borderRadius: 24, border: '1px solid rgba(162,89,255,0.1)', marginBottom: 52 }}>
                <h4 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, color: '#a259ff', marginBottom: 12 }}>Our Mission</h4>
                <p style={{ color: '#e8eaf6', fontSize: 15, lineHeight: 1.7, fontStyle: 'italic' }}>
                  "To democratize premium digital experiences by providing enterprise-level software engineering and stunning designs to businesses of all sizes."
                </p>
              </div>

              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontStyle: 'italic', marginBottom: 24, fontSize: 22 }}>Our Journey</h3>
              {timeline.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.div whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(79,111,255,0.5)' }} style={{
                      width: 54, height: 54, borderRadius: '50%', minWidth: 54,
                      background: 'linear-gradient(135deg,#4f6fff,#a259ff)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 800, fontFamily: 'Syne', color: '#fff',
                      boxShadow: '0 8px 24px rgba(79,111,255,0.3)',
                      border: '2px solid rgba(255,255,255,0.1)'
                    }}>
                      {t.year}
                    </motion.div>
                    {i < timeline.length - 1 && (
                      <div style={{ width: 2, height: 48, background: 'linear-gradient(to bottom, #a259ff, rgba(79,111,255,0.1))', margin: '12px 0' }} />
                    )}
                  </div>
                  <div style={{ paddingTop: 14 }}>
                    <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, fontFamily: 'Syne' }}>{t.title}</div>
                    <div style={{ color: '#7b82a8', fontSize: 15, lineHeight: 1.6 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </FadeUp>
          </div>
        </div>

        {/* Meet the Founders */}
        <div style={{ marginTop: 120, marginBottom: 40 }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-label" style={{ margin: '0 auto 20px' }}>The Brains Behind WebXCrafting</div>
              <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, fontStyle: 'italic', marginBottom: 16 }}>
                Meet Our <span className="grad-text">Founders</span>
              </h2>
              <p style={{ color: '#7b82a8', fontSize: 16, maxWidth: 640, margin: '0 auto', lineHeight: 1.75 }}>
                Driven by passion and expertise, our MCA-graduate founders bring years of experience and dozens of successful projects to the table, ensuring every client receives top-tier digital solutions.
              </p>
            </div>
          </FadeUp>
          
          <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, maxWidth: 860, margin: '0 auto' }}>
            {team.map((member, i) => (
              <FadeUp key={member.name} delay={i * 0.15}>
                <motion.div 
                  whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(79,111,255,0.2)' }}
                  className="glass" 
                  style={{ 
                    padding: '48px 32px', 
                    borderRadius: 24, 
                    textAlign: 'center', 
                    position: 'relative', 
                    overflow: 'hidden',
                    border: '1px solid rgba(99,120,255,.2)',
                    background: 'rgba(10,14,28,0.7)',
                    backdropFilter: 'blur(30px)'
                  }}
                >
                  {/* Glowing background blob */}
                  <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, background: 'radial-gradient(circle, rgba(79,111,255,0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
                  
                  <div style={{ 
                    width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg,#4f6fff,#a259ff)', 
                    margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 32, fontWeight: 800, color: '#fff', fontFamily: 'Syne',
                    boxShadow: '0 12px 32px rgba(79,111,255,0.4)',
                    position: 'relative', zIndex: 2
                  }}>
                    {member.initials}
                  </div>
                  <h3 style={{ fontFamily: 'Syne', fontSize: 24, fontWeight: 700, fontStyle: 'italic', marginBottom: 8 }}>{member.name}</h3>
                  <div style={{ color: '#4f6fff', fontWeight: 600, fontSize: 14, marginBottom: 24 }}>{member.role}</div>
                  
                  <div style={{ marginBottom: 32, padding: '0 8px' }}>
                    <div style={{ color: '#e8eaf6', fontStyle: 'italic', fontSize: 15, marginBottom: 16, lineHeight: 1.6 }}>
                      {member.quote}
                    </div>
                    <div style={{ color: '#7b82a8', fontSize: 14, lineHeight: 1.75 }}>
                      {member.vision}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36, alignItems: 'center' }}>
                    <span className="tag" style={{ fontSize: 13, padding: '6px 14px', width: 'fit-content', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FaGraduationCap size={15} /> {member.education}
                    </span>
                    <span className="tag" style={{ fontSize: 13, padding: '6px 14px', width: 'fit-content', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FaLaptopCode size={15} /> {member.projects}
                    </span>
                    <span className="tag" style={{ fontSize: 13, padding: '6px 14px', width: 'fit-content', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FaBriefcase size={15} /> {member.experience}
                    </span>
                  </div>

                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ padding: '10px 24px', display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 14 }}
                  >
                    <FaLinkedin size={18} /> Connect
                  </a>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
