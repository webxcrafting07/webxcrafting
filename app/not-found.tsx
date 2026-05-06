'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'

export default function NotFound() {
  return (
    <>
      <DotBackground />
      <Navbar />
      <main style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '130px 32px 80px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            fontFamily: 'Syne',
            fontSize: 'clamp(80px, 15vw, 150px)',
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: 20,
            background: 'linear-gradient(135deg, #4f6fff, #a259ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            404
          </div>
          
          <h1 style={{ 
            fontFamily: 'Syne', 
            fontSize: 'clamp(24px, 4vw, 42px)', 
            fontWeight: 700, 
            marginBottom: 24,
            color: '#e8eaf6'
          }}>
            Page <span className="grad-text">Not Found</span>
          </h1>
          
          <p style={{ 
            color: '#7b82a8', 
            fontSize: 18, 
            maxWidth: 500, 
            margin: '0 auto 48px',
            lineHeight: 1.6
          }}>
            Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/services" className="btn-outline">
              Explore Services
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
