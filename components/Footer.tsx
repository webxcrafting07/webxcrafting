'use client'
import Link from 'next/link'
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'

const services = ['Business Website', 'E-commerce', 'Job Portal', 'Custom Website']
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
]
const socials = [
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/webx-crafting-a1a875402/', label: 'LinkedIn' },
  { icon: FaGithub, href: '#', label: 'GitHub' },
  { icon: FaInstagram, href: 'https://www.instagram.com/webxcrafting', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer
      className="mobile-p-6"
      style={{
        borderTop: '1px solid rgba(99,120,255,0.1)',
        padding: '60px 32px 32px',
        position: 'relative',
        zIndex: 10,
        marginTop: 40,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div className="mobile-center" style={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="/" className="mobile-center" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg,#4f6fff,#a259ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Syne',
                  fontWeight: 800,
                  fontSize: 18,
                  color: '#fff',
                }}
              >
                X
              </div>
              <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 18, color: '#e8eaf6' }}>
                WebX<span className="grad-text">Crafting</span>
              </span>
            </Link>
            <p style={{ color: '#7b82a8', fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>
              Building premium websites at affordable prices. Your digital success is our mission.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    border: '1px solid rgba(99,120,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#7b82a8',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(79,111,255,0.6)'
                    e.currentTarget.style.color = '#4f6fff'
                    e.currentTarget.style.background = 'rgba(79,111,255,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(99,120,255,0.2)'
                    e.currentTarget.style.color = '#7b82a8'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mobile-center">
            <h4 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 20, fontSize: 16, fontStyle: 'italic' }}>Quick Links</h4>
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: 'block',
                  color: '#7b82a8',
                  textDecoration: 'none',
                  fontSize: 14,
                  marginBottom: 10,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e8eaf6')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7b82a8')}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div className="mobile-center">
            <h4 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 20, fontSize: 16, fontStyle: 'italic' }}>Services</h4>
            {services.map((s) => (
              <Link
                key={s}
                href="/services"
                style={{
                  display: 'block',
                  color: '#7b82a8',
                  textDecoration: 'none',
                  fontSize: 14,
                  marginBottom: 10,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e8eaf6')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7b82a8')}
              >
                {s}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="mobile-center">
            <h4 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 20, fontSize: 16, fontStyle: 'italic' }}>Contact</h4>
            {[
              { icon: '📧', text: 'webxcrafting@gmail.com' },
              { icon: '📞', text: '+91 9102615343' },
              { icon: '⏱', text: 'Mon–Sat, 9AM–7PM IST' },
              { icon: '📍', text: 'India (Remote Worldwide)' },
            ].map(({ icon, text }) => (
              <div key={text} className="mobile-center" style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 14, minWidth: 20 }}>{icon}</span>
                <span style={{ color: '#7b82a8', fontSize: 14 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mobile-stack"
          style={{
            borderTop: '1px solid rgba(99,120,255,0.08)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            textAlign: 'center'
          }}
        >
          <p style={{ color: '#7b82a8', fontSize: 13, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>© {new Date().getFullYear()} WebXCrafting. All rights reserved.</span>
            <span className="hide-mobile">·</span>
            <Link 
              href="/admin/login" 
              style={{ color: '#7b82a8', textDecoration: 'none', transition: 'opacity 0.2s', cursor: 'default' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#e8eaf6')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#7b82a8')}
            >
              .
            </Link>
          </p>
          <p style={{ color: '#7b82a8', fontSize: 13, width: '100%', maxWidth: '100%' }}>
            Built with ❤️ using Next.js · MongoDB · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
