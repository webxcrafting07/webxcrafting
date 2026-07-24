"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaInstagram, FaFacebookSquare, FaYoutube, FaCheckCircle, FaRocket, FaPalette, FaChartLine, FaPlay } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

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
    <div style={{ color: 'var(--text)', paddingBottom: '100px', overflow: 'hidden' }}>
      
      {/* ── HERO SECTION ── */}
      <section style={{ position: 'relative', padding: 'clamp(60px, 10vw, 120px) 20px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '60px', alignItems: 'center' }}>
        <FadeUp>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', background: 'rgba(79,111,255,0.1)', border: '1px solid rgba(79,111,255,0.2)', borderRadius: '100px', color: '#4f6fff', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '32px' }}>
            <FaVideo /> High-Converting Video Ads
          </div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1, fontStyle: 'italic', marginBottom: '24px', letterSpacing: '-1px' }}>
            Stop Scrolling. <br /><span className="grad-text">Start Selling.</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#7b82a8', lineHeight: 1.6, marginBottom: '40px', maxWidth: '500px' }}>
            We craft scroll-stopping, highly engaging video ads for Instagram Reels, Facebook, and YouTube that turn viewers into paying customers at unbeatable prices.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="#pricing" className="btn-primary" style={{ padding: '16px 40px', fontSize: '16px' }}>
              View Pricing →
            </Link>
            <a href="https://wa.me/919102615343?text=Hi,%20I'm%20interested%20in%20the%20Video%20Ads%20service" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '16px 40px', fontSize: '16px', borderColor: 'rgba(37,211,102,.4)', color: '#25d366' }}>
              WhatsApp Us
            </a>
          </div>
        </FadeUp>
        
        <FadeUp delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', aspectRatio: '9/16', borderRadius: '32px', background: 'linear-gradient(135deg, rgba(79,111,255,0.2), rgba(162,89,255,0.1))', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {/* Mock Video Placeholder */}
             <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop) center/cover', opacity: 0.5, filter: 'blur(4px) brightness(0.7)' }} />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,14,28,0.9))' }} />
             
             <motion.div whileHover={{ scale: 1.1 }} style={{ zIndex: 10, width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                <FaPlay size={24} style={{ marginLeft: '4px' }} />
             </motion.div>
             
             <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px', zIndex: 10 }}>
                <div style={{ background: 'linear-gradient(90deg, #4f6fff, #a259ff)', height: '4px', width: '100%', borderRadius: '4px', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '24px', color: '#fff', fontStyle: 'italic' }}>Premium Ad Creatives</h3>
                <p style={{ color: '#b0b8d8', fontSize: '14px' }}>Optimized for 9:16 mobile viewing</p>
             </div>
          </div>
        </FadeUp>
      </section>

      {/* ── WHY VIDEO ADS ── */}
      <section style={{ padding: '80px 20px', background: 'rgba(79,111,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, fontStyle: 'italic' }}>Why You Need <span className="grad-text">Video Ads</span></h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { icon: <FaChartLine size={28} />, title: 'Higher Conversions', desc: 'Video ads generate up to 80% higher conversion rates compared to static image ads.' },
              { icon: <FaPlay size={28} />, title: 'Instant Attention', desc: 'Dynamic motion and engaging hooks grab the viewer\'s attention within the first 3 seconds.' },
              { icon: <FaPalette size={28} />, title: 'Better Brand Recall', desc: 'Professionally crafted videos make your brand memorable and build instant trust.' }
            ].map((f, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="glass" style={{ padding: '40px', borderRadius: '24px', height: '100%', border: '1px solid rgba(99,120,255,0.15)' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(79,111,255,0.1)', color: '#4f6fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontFamily: 'Syne', fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: '#e8eaf6' }}>{f.title}</h3>
                  <p style={{ color: '#7b82a8', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-label" style={{ margin: '0 auto 16px' }}>Cross-Platform Delivery</div>
          <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, fontStyle: 'italic' }}>Optimized For <span className="grad-text">Every Platform</span></h2>
        </FadeUp>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
          {[
            { icon: <FaInstagram size={48} color="#E1306C" />, title: "Instagram Reels", format: "9:16 Vertical format" },
            { icon: <FaFacebookSquare size={48} color="#1877F2" />, title: "Facebook Feed", format: "1:1 / 4:5 format" },
            { icon: <FaYoutube size={48} color="#FF0000" />, title: "YouTube Shorts", format: "9:16 / 16:9 format" }
          ].map((platform, i) => (
            <FadeUp key={i} delay={i * 0.1} style={{ flex: '1 1 300px', maxWidth: '350px' }}>
              <motion.div whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} className="glass" style={{ padding: '40px 30px', borderRadius: '24px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px' }}>{platform.icon}</div>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', color: '#e8eaf6' }}>{platform.title}</h3>
                <p style={{ color: '#7b82a8', fontSize: '14px' }}>{platform.format}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>
      
      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <FadeUp delay={0.2}>
          <div style={{ background: 'linear-gradient(135deg, rgba(79,111,255,0.1), rgba(162,89,255,0.1))', borderRadius: '32px', padding: 'clamp(40px, 6vw, 60px)', border: '1px solid rgba(99,120,255,0.3)', backdropFilter: 'blur(20px)', textAlign: 'center', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'inline-block', background: '#00e676', color: '#000', padding: '6px 16px', borderRadius: '30px', fontWeight: 800, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>Best Value Offer</div>
            
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px, 5vw, 48px)', color: '#fff', marginBottom: '16px', fontWeight: 800, fontStyle: 'italic' }}>
              Premium Quality.<br /><span className="grad-text">Low Budget.</span>
            </h2>
            <p style={{ color: '#b0b8d8', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
              Get a professionally edited, high-converting video ad complete with scripting, captions, and effects.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '12px', marginBottom: '40px' }}>
               <span style={{ fontSize: '24px', color: '#7b82a8', textDecoration: 'line-through' }}>₹8,000</span>
               <span style={{ fontSize: '64px', fontWeight: 800, color: '#fff', fontFamily: 'Syne', lineHeight: 1 }}>₹5,000</span>
               <span style={{ fontSize: '16px', color: '#7b82a8', fontWeight: 400 }}>/ video</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', textAlign: 'left', marginBottom: '48px', padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '20px' }}>
              {[
                "15-30 Second High-Impact Video",
                "Professional Scriptwriting & Hooks",
                "Engaging Captions & Subtitles",
                "Premium Stock Footage & Music",
                "Optimized for Social Media",
                "2 Rounds of Revisions"
              ].map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#e8eaf6', fontSize: '15px' }}>
                  <FaCheckCircle color="#00e5ff" size={18} /> {feature}
                </div>
              ))}
            </div>

            <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex', padding: '20px 48px', fontSize: '18px', width: '100%', maxWidth: '350px', justifyContent: 'center' }}>
              Claim This Offer Now →
            </Link>
          </div>
        </FadeUp>
      </section>
      
    </div>
  );
}

