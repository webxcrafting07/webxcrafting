"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaChartLine, FaPlay, FaPalette, FaCheckCircle, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DotBackground from '@/components/DotBackground';
import WhatsAppButton from '@/components/WhatsAppButton';

const FadeUp = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function VideoAdsClient() {
  return (
    <div style={{ color: 'var(--text)', overflow: 'hidden' }}>
      <Navbar />
      <DotBackground />
      <WhatsAppButton />

      {/* ── HERO SECTION ── */}
      <section style={{ position: 'relative', padding: 'clamp(80px, 12vw, 100px) 20px clamp(40px, 8vw, 60px)', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '40px', alignItems: 'center' }}>
        <FadeUp>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(79,111,255,0.1)', border: '1px solid rgba(79,111,255,0.2)', borderRadius: '100px', color: '#4f6fff', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>
            <FaVideo /> High-Converting Video Ads
          </div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, fontStyle: 'italic', marginBottom: '20px', letterSpacing: '-1px' }}>
            Scroll-Stopping <br /><span className="grad-text">Video Ads.</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#7b82a8', lineHeight: 1.6, marginBottom: '32px', maxWidth: '500px' }}>
            We craft scroll-stopping, highly engaging video ads for Instagram Reels, Facebook, and YouTube that turn viewers into paying customers at unbeatable prices.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="#pricing" className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
              View Pricing →
            </Link>
            <a href="https://wa.me/919102615343?text=Hi,%20I'm%20interested%20in%20your%20Video%20Ads%20service" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '14px 32px', fontSize: '15px', borderColor: 'rgba(37,211,102,.4)', color: '#25d366' }}>
              WhatsApp Us
            </a>
          </div>
        </FadeUp>
        
        <FadeUp delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', aspectRatio: '4/5', borderRadius: '32px', background: 'linear-gradient(135deg, rgba(79,111,255,0.1), rgba(162,89,255,0.05))', border: '1px solid rgba(99,120,255,0.2)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop) center/cover', opacity: 0.3, mixBlendMode: 'luminosity' }} />
             
             {/* Abstract Play Button / Reel UI */}
             <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(79,111,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(79,111,255,0.5)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.2)' }}
                >
                  <FaPlay color="#fff" size={32} style={{ marginLeft: '6px' }} />
                </motion.div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <FaInstagram size={28} color="rgba(255,255,255,0.8)" />
                  <FaFacebook size={28} color="rgba(255,255,255,0.8)" />
                  <FaYoutube size={28} color="rgba(255,255,255,0.8)" />
                </div>
             </div>
          </div>
        </FadeUp>
      </section>

      {/* ── PROCESS/FEATURES GRID ── */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, fontStyle: 'italic', marginBottom: '16px' }}>
              Why You Need <span className="grad-text">Video Ads</span>
            </h2>
          </div>
        </FadeUp>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { icon: FaChartLine, title: 'Higher Conversions', desc: 'Video ads generate up to 80% higher conversion rates compared to static image ads.' },
            { icon: FaPlay, title: 'Instant Attention', desc: 'Dynamic motion and engaging hooks grab the viewer\'s attention within the first 3 seconds.' },
            { icon: FaPalette, title: 'Better Brand Recall', desc: 'Professionally crafted videos make your brand memorable and build instant trust.' }
          ].map((feat, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="glass card-hover" style={{ padding: '30px 24px', height: '100%' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(79,111,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#4f6fff', fontSize: '24px' }}>
                  <feat.icon />
                </div>
                <h3 style={{ fontFamily: 'Syne', fontSize: '20px', fontWeight: 700, marginBottom: '10px', color: '#e8eaf6' }}>
                  {feat.title}
                </h3>
                <p style={{ color: '#7b82a8', lineHeight: 1.5, fontSize: '15px' }}>
                  {feat.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section id="pricing" style={{ padding: '60px 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(0, 230, 118, 0.1)', border: '1px solid rgba(0, 230, 118, 0.3)', color: '#00e676', borderRadius: '20px', fontWeight: 600, fontSize: '12px', marginBottom: '16px' }}>
              MOST POPULAR
            </div>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, fontStyle: 'italic', marginBottom: '16px' }}>
              Affordable <span className="grad-text">Pricing</span>
            </h2>
            <p style={{ color: '#7b82a8', fontSize: '16px' }}>Professional video ads that fit your budget.</p>
          </div>
        </FadeUp>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FadeUp delay={0.2} style={{ width: '100%', maxWidth: '450px' }}>
            <div className="glass" style={{ position: 'relative', padding: '40px 30px', borderRadius: '24px', border: '1px solid rgba(162, 89, 255, 0.4)', background: 'linear-gradient(180deg, rgba(10,14,28,0.9) 0%, rgba(162, 89, 255, 0.05) 100%)', boxShadow: '0 20px 80px rgba(162, 89, 255, 0.15)', overflow: 'hidden' }}>
              
              <div style={{ position: 'absolute', top: '24px', right: '-32px', background: 'linear-gradient(90deg, #4f6fff, #a259ff)', padding: '6px 40px', transform: 'rotate(45deg)', fontSize: '11px', fontWeight: 800, letterSpacing: '1px' }}>
                HOT DEAL
              </div>

              <h3 style={{ fontFamily: 'Syne', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Social Media Ad Video</h3>
              <p style={{ color: '#7b82a8', marginBottom: '24px', fontSize: '15px' }}>Perfect for Instagram Reels, Facebook & YouTube Shorts.</p>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
                <span style={{ fontSize: '40px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>₹5,000</span>
                <span style={{ color: '#7b82a8', fontSize: '16px' }}>/ video</span>
                <span style={{ textDecoration: 'line-through', color: '#ff5252', marginLeft: '12px', fontSize: '16px' }}>₹8,000</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  "15-30 Second High Quality Video",
                  "Professional Scriptwriting",
                  "Engaging Subtitles & Captions",
                  "Premium Stock Footage & Music",
                  "AI Voiceover Included",
                  "2 Rounds of Revisions",
                  "Optimized for Ads Manager",
                ].map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaCheckCircle color="#00e676" size={18} />
                    <span style={{ color: '#e8eaf6', fontSize: '15px' }}>{feat}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px' }}>
                Order Your Video Now
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{ padding: '0 20px 80px' }}>
        <FadeUp>
          <div className="glass-strong" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 30px', borderRadius: '24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(79,111,255,0.1) 0%, rgba(10,14,28,0.8) 100%)', border: '1px solid rgba(79,111,255,0.3)' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, marginBottom: '16px' }}>
              Want to scale your business with Video Ads?
            </h2>
            <p style={{ color: '#b0b8d8', fontSize: '16px', maxWidth: '600px', margin: '0 auto 30px' }}>
              Stop wasting money on ads that don't convert. Let us create a scroll-stopping video ad for you today.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://wa.me/919102615343?text=Hi,%20I%20need%20a%20Video%20Ad" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
                Consult Our Experts
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      <Footer />
    </div>
  );
}
