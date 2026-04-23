'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import WhatsAppButton from '@/components/WhatsAppButton'
import { FaClock, FaCalendarAlt, FaArrowRight, FaSearch } from 'react-icons/fa'

const categories = ['All', 'Web Development', 'SEO', 'E-Commerce', 'Business Tips', 'Technology']

const catColors: Record<string, string> = {
  'Web Development': '#4f6fff',
  'SEO': '#00e676',
  'E-Commerce': '#a259ff',
  'Business Tips': '#ffb74d',
  'Technology': '#00e5ff',
}

const FadeUp = ({ children, delay = 0, style = {} }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    style={style}
  >
    {children}
  </motion.div>
)

export default function BlogClient() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/blogs?status=published')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setBlogs(d.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = blogs.filter((b) => {
    const matchesCat = activeCategory === 'All' || b.category === activeCategory
    const matchesSearch =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCat && matchesSearch
  })

  return (
    <>
      <DotBackground />
      <Navbar />

      {/* ─── HERO ────────────────────────────────── */}
      <section
        style={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '140px 32px 60px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label" style={{ margin: '0 auto 24px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4f6fff', display: 'inline-block' }} />
              Our Blog
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Syne',
              fontSize: 'clamp(32px, 5.5vw, 62px)',
              fontWeight: 800,
              fontStyle: 'italic',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Insights & <span className="shimmer-text">Expert Tips</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              color: '#7b82a8',
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              lineHeight: 1.75,
              maxWidth: 560,
              margin: '0 auto 36px',
            }}
          >
            Web development guides, SEO strategies, and business growth tips to help you succeed online.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ maxWidth: 480, margin: '0 auto' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(10, 14, 28, 0.65)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(99, 120, 255, 0.15)',
                borderRadius: 14,
                padding: '12px 20px',
                transition: 'border-color 0.3s',
              }}
            >
              <FaSearch size={16} style={{ color: '#7b82a8', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#e8eaf6',
                  fontFamily: 'Inter',
                  fontSize: 15,
                  width: '100%',
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────── */}
      <section style={{ padding: '0 32px 40px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <FadeUp>
          <div
            style={{
              display: 'flex',
              gap: 10,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 20,
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'rgba(79,111,255,0.5)' : 'rgba(99,120,255,0.15)',
                  background: activeCategory === cat ? 'rgba(79,111,255,0.15)' : 'transparent',
                  color: activeCategory === cat ? '#e8eaf6' : '#7b82a8',
                  transition: 'all 0.25s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ─── BLOG GRID ────────────────────────────── */}
      <section style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, gap: 16, color: '#7b82a8' }}>
            <div className="spinner" /> Loading articles…
          </div>
        ) : filtered.length === 0 ? (
          <FadeUp>
            <div style={{ textAlign: 'center', padding: 80, color: '#7b82a8' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
              <p style={{ fontSize: 16 }}>
                {searchQuery || activeCategory !== 'All'
                  ? 'No articles found matching your criteria.'
                  : 'No blog posts yet. Check back soon!'}
              </p>
            </div>
          </FadeUp>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 28,
            }}
          >
            {filtered.map((blog: any, i: number) => (
              <FadeUp key={blog._id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(0,0,0,0.45)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    background: 'rgba(10,14,28,0.65)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(99,120,255,0.15)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Cover Image */}
                  <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
                    <div
                      style={{
                        height: 200,
                        background: blog.coverImage
                          ? `url(${blog.coverImage}) center/cover no-repeat`
                          : `linear-gradient(135deg, ${catColors[blog.category] || '#4f6fff'}22, ${catColors[blog.category] || '#a259ff'}44)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {!blog.coverImage && (
                        <div style={{ fontSize: 56, opacity: 0.3 }}>📝</div>
                      )}
                      {/* Category Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          padding: '4px 14px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 700,
                          background: 'rgba(3,5,10,0.75)',
                          backdropFilter: 'blur(10px)',
                          color: catColors[blog.category] || '#4f6fff',
                          border: `1px solid ${catColors[blog.category] || '#4f6fff'}40`,
                        }}
                      >
                        {blog.category}
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7b82a8', fontSize: 12 }}>
                        <FaCalendarAlt size={11} />
                        {new Date(blog.publishDate || blog.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7b82a8', fontSize: 12 }}>
                        <FaClock size={11} />
                        {blog.readTime} min read
                      </div>
                    </div>

                    {/* Title */}
                    <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
                      <h3
                        style={{
                          fontFamily: 'Syne',
                          fontWeight: 700,
                          fontSize: 19,
                          fontStyle: 'italic',
                          color: '#e8eaf6',
                          marginBottom: 10,
                          lineHeight: 1.35,
                          transition: 'color 0.2s',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#4f6fff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#e8eaf6')}
                      >
                        {blog.title}
                      </h3>
                    </Link>

                    {/* Excerpt */}
                    <p
                      style={{
                        color: '#7b82a8',
                        fontSize: 14,
                        lineHeight: 1.7,
                        marginBottom: 20,
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    {blog.tags?.length > 0 && (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                        {blog.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            style={{
                              padding: '3px 10px',
                              borderRadius: 12,
                              fontSize: 11,
                              fontWeight: 500,
                              background: 'rgba(79,111,255,0.08)',
                              color: '#7b82a8',
                              border: '1px solid rgba(99,120,255,0.1)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More */}
                    <Link
                      href={`/blog/${blog.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        color: '#4f6fff',
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: 'none',
                        transition: 'gap 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.gap = '12px')}
                      onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
                    >
                      Read More <FaArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        )}
      </section>

      {/* ─── CTA ─────────────────────────────────── */}
      <section style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <FadeUp>
          <div
            style={{
              borderRadius: 24,
              background: 'linear-gradient(135deg,rgba(79,111,255,.18),rgba(162,89,255,.14))',
              border: '1px solid rgba(99,120,255,.25)',
              padding: '60px 48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(79,111,255,.18),transparent 70%)' }} />
            <div style={{ position: 'absolute', bottom: -80, left: -80, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(162,89,255,.18),transparent 70%)' }} />
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 800, fontStyle: 'italic', marginBottom: 16, position: 'relative' }}>
              Need a Website for Your Business?
            </h2>
            <p style={{ color: '#7b82a8', fontSize: 16, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px', position: 'relative' }}>
              We build premium, SEO-optimized websites that convert visitors into customers.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link href="/contact" className="btn-primary">Get Free Quote →</Link>
              <Link href="/services" className="btn-outline">View Services</Link>
            </div>
          </div>
        </FadeUp>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
