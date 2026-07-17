'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import WhatsAppButton from '@/components/WhatsAppButton'
import { FaClock, FaCalendarAlt, FaUser, FaChevronRight, FaArrowLeft, FaTag } from 'react-icons/fa'

const catColors: Record<string, string> = {
  'Web Development': '#4f6fff',
  'SEO': '#00e676',
  'E-Commerce': '#a259ff',
  'Business Tips': '#ffb74d',
  'Technology': '#00e5ff',
}

export default function BlogPostClient({ blog, relatedBlogs, fullUrl }: { blog: any, relatedBlogs: any[], fullUrl: string }) {
  const accentColor = catColors[blog.category] || '#4f6fff'

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage || '',
    author: {
      '@type': 'Organization',
      name: blog.author || 'WebXCrafting',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WebXCrafting',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.webxcrafting.in/logo-wxc.png',
      },
    },
    datePublished: blog.publishDate || blog.createdAt,
    dateModified: blog.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
  }

  return (
    <>
      <DotBackground />
      <Navbar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── HERO / COVER ────────────────────────── */}
      <section
        style={{
          padding: '120px 32px 0',
          maxWidth: 860,
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 32,
            fontSize: 13,
            color: '#7b82a8',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" style={{ color: '#7b82a8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e8eaf6')} onMouseLeave={(e) => (e.currentTarget.style.color = '#7b82a8')}>Home</Link>
          <FaChevronRight size={10} />
          <Link href="/blog" style={{ color: '#7b82a8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e8eaf6')} onMouseLeave={(e) => (e.currentTarget.style.color = '#7b82a8')}>Blog</Link>
          <FaChevronRight size={10} />
          <span style={{ color: '#e8eaf6' }}>{blog.title.length > 40 ? blog.title.slice(0, 40) + '…' : blog.title}</span>
        </motion.div>

        {/* Category */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          <span
            style={{
              display: 'inline-block',
              padding: '5px 16px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              background: `${accentColor}18`,
              color: accentColor,
              border: `1px solid ${accentColor}40`,
              marginBottom: 20,
            }}
          >
            {blog.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Syne',
            fontSize: 'clamp(28px, 5vw, 50px)',
            fontWeight: 800,
            fontStyle: 'italic',
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          {blog.title}
        </motion.h1>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
            marginBottom: 36,
            paddingBottom: 28,
            borderBottom: '1px solid rgba(99,120,255,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#7b82a8', fontSize: 14 }}>
            <FaUser size={13} style={{ color: '#4f6fff' }} />
            <span>{blog.author}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#7b82a8', fontSize: 14 }}>
            <FaCalendarAlt size={13} style={{ color: '#4f6fff' }} />
            <span>
              {new Date(blog.publishDate || blog.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#7b82a8', fontSize: 14 }}>
            <FaClock size={13} style={{ color: '#4f6fff' }} />
            <span>{blog.readTime} min read</span>
          </div>
        </motion.div>

        {/* Cover Image */}
        {blog.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: 48,
              border: '1px solid rgba(99,120,255,0.12)',
            }}
          >
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={1200}
              height={630}
              priority
              sizes="(max-width: 860px) 100vw, 860px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              unoptimized={blog.coverImage?.startsWith('/api/og')}
            />
          </motion.div>
        )}
      </section>

      {/* ─── ARTICLE CONTENT ─────────────────────── */}
      <section
        style={{
          padding: '0 32px 60px',
          maxWidth: 860,
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
              marginTop: 48,
              paddingTop: 28,
              borderTop: '1px solid rgba(99,120,255,0.1)',
            }}
          >
            <FaTag size={14} style={{ color: '#7b82a8' }} />
            {blog.tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  padding: '5px 14px',
                  borderRadius: 16,
                  fontSize: 13,
                  fontWeight: 500,
                  background: 'rgba(79,111,255,0.08)',
                  color: '#7b82a8',
                  border: '1px solid rgba(99,120,255,0.12)',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{ marginTop: 36 }}
        >
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#4f6fff',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              transition: 'gap 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = '12px')}
            onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
          >
            <FaArrowLeft size={13} /> Back to Blog
          </Link>
        </motion.div>
      </section>

      {/* ─── RELATED POSTS ────────────────────────── */}
      {relatedBlogs.length > 0 && (
        <section style={{ padding: '40px 32px 80px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 style={{
              fontFamily: 'Syne',
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 800,
              fontStyle: 'italic',
              textAlign: 'center',
              marginBottom: 40,
            }}>
              Related <span className="grad-text">Articles</span>
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              style={{
                gap: 24,
              }}
            >
              {relatedBlogs.map((rb: any) => (
                <motion.div
                  key={rb._id}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 280 }}
                >
                  <Link href={`/blog/${rb.slug}`} style={{ textDecoration: 'none' }}>
                    <div
                      className="glass"
                      style={{
                        borderRadius: 18,
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          height: 160,
                          background: !rb.coverImage ? `linear-gradient(135deg, ${catColors[rb.category] || '#4f6fff'}22, ${catColors[rb.category] || '#a259ff'}44)` : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}
                      >
                        {rb.coverImage && <Image src={rb.coverImage} alt={rb.title} fill sizes="(max-width: 768px) 100vw, 300px" style={{ objectFit: 'cover' }} unoptimized={rb.coverImage?.startsWith('/api/og')} />}
                        {!rb.coverImage && <div style={{ fontSize: 40, opacity: 0.3 }}>📝</div>}
                      </div>
                      <div style={{ padding: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <span style={{ fontSize: 12, color: '#7b82a8' }}>
                            {new Date(rb.publishDate || rb.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                          <span style={{ fontSize: 12, color: '#7b82a8' }}>·</span>
                          <span style={{ fontSize: 12, color: '#7b82a8' }}>{rb.readTime} min</span>
                        </div>
                        <h3 style={{
                          fontFamily: 'Syne',
                          fontWeight: 700,
                          fontSize: 16,
                          fontStyle: 'italic',
                          color: '#e8eaf6',
                          lineHeight: 1.35,
                        }}>
                          {rb.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── CTA ─────────────────────────────────── */}
      <section style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            style={{
              borderRadius: 24,
              background: 'linear-gradient(135deg,rgba(79,111,255,.18),rgba(162,89,255,.14))',
              border: '1px solid rgba(99,120,255,.25)',
              padding: '56px 40px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(79,111,255,.18),transparent 70%)' }} />
            <div style={{ position: 'absolute', bottom: -80, left: -80, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(162,89,255,.18),transparent 70%)' }} />
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 800, fontStyle: 'italic', marginBottom: 14, position: 'relative' }}>
              Ready to Build Your Dream Website?
            </h2>
            <p style={{ color: '#7b82a8', fontSize: 15, marginBottom: 28, maxWidth: 460, margin: '0 auto 28px', position: 'relative' }}>
              Let us turn your ideas into a stunning, high-performance website.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link href="/contact" className="btn-primary">Get Started →</Link>
              <Link href="/services" className="btn-outline">Our Services</Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
