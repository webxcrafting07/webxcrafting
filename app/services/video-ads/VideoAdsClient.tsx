"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaInstagram, FaFacebookSquare, FaYoutube, FaPlayCircle, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

const FadeUp = ({ children, delay = 0 }: any) => (
  <motion.div
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
    <div style={{ color: 'var(--text)', paddingBottom: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(99,120,255,0.1)', borderRadius: '100px', color: 'var(--a1)', fontWeight: 600, fontSize: '14px', marginBottom: '24px' }}>
            <FaVideo /> New Service Added!
          </div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
            Scroll-Stopping <span style={{ color: 'var(--a1)' }}>Video Ads</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '40px' }}>
            High quality. Affordable prices. Fast delivery. We create engaging video ads for Instagram, Facebook, and YouTube that actually convert viewers into paying customers.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: 'linear-gradient(90deg, var(--a1), var(--a2))', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.3s' }}>
              Request a Video Ad
            </Link>
            <Link href="#pricing" style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.3s' }}>
              View Pricing
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* Platforms Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeUp delay={0.2}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: '32px', fontWeight: 700 }}>Optimized For Every Platform</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
            {[
              { icon: <FaInstagram size={40} color="#E1306C" />, title: "Instagram Reels & Stories" },
              { icon: <FaFacebookSquare size={40} color="#1877F2" />, title: "Facebook Feed Ads" },
              { icon: <FaYoutube size={40} color="#FF0000" />, title: "YouTube Pre-Roll & Shorts" }
            ].map((platform, i) => (
              <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '30px', borderRadius: '20px', textAlign: 'center', flex: '1 1 250px', maxWidth: '350px' }}>
                <div style={{ marginBottom: '16px' }}>{platform.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 600 }}>{platform.title}</h3>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
      
      {/* Pricing / Offer Section */}
      <section style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto', color: 'var(--muted)' }} id="pricing">
        <FadeUp delay={0.3}>
          <div style={{ background: 'linear-gradient(135deg, rgba(79,111,255,0.1), rgba(162,89,255,0.1))', borderRadius: '24px', padding: 'clamp(30px, 5vw, 60px)', border: '1px solid rgba(99,120,255,0.3)', backdropFilter: 'blur(20px)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px, 4vw, 40px)', color: '#fff', marginBottom: '16px', fontWeight: 800 }}>
              Premium Quality, <span style={{ color: 'var(--a1)' }}>Low Budget</span>
            </h2>
            <p style={{ fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
              We believe powerful marketing shouldn't break the bank. Get a professionally edited, high-converting video ad starting at just:
            </p>
            
            <div style={{ fontSize: '56px', fontWeight: 800, color: '#fff', marginBottom: '8px', fontFamily: 'Syne' }}>
              ₹5,000 <span style={{ fontSize: '16px', color: 'var(--muted)', fontWeight: 400 }}>/ per video</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', marginTop: '30px', marginBottom: '40px' }}>
              {[
                "15-30 Second High-Impact Video",
                "Professional Scriptwriting & Hooks",
                "Engaging Captions & Subtitles",
                "Premium Stock Footage & Music (if needed)",
                "2 Rounds of Revisions"
              ].map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#e8eaf6', fontSize: '16px' }}>
                  <FaCheckCircle color="#00e676" /> {feature}
                </div>
              ))}
            </div>

            <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(90deg, var(--a1), var(--a2))', color: '#fff', padding: '16px 40px', borderRadius: '12px', fontWeight: 700, fontSize: '18px', textDecoration: 'none' }}>
              Claim This Offer Now
            </Link>
          </div>
        </FadeUp>
      </section>
      
    </div>
  );
}
