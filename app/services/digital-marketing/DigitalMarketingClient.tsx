"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaChartLine, FaShareAlt, FaEnvelopeOpenText, FaBullseye, FaMapMarkerAlt } from 'react-icons/fa';
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

export default function DigitalMarketingClient() {
  return (
    <div style={{ color: 'var(--text)', paddingBottom: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(99,120,255,0.1)', borderRadius: '100px', color: 'var(--a1)', fontWeight: 600, fontSize: '14px', marginBottom: '24px' }}>
            <FaChartLine /> Transparent & Affordable Marketing
          </div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
            Grow Your Business With <span style={{ color: 'var(--a1)' }}>Real Results</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '40px' }}>
            We treat your marketing budget like it's our own. Get premium SEO, social media, and ad campaigns at prices that make sense for small and growing businesses.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: 'linear-gradient(90deg, var(--a1), var(--a2))', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.3s' }}>
              Get a Free SEO Audit
            </Link>
            <Link href="#features" style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.3s' }}>
              Explore Services
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }} id="features">
        <FadeUp delay={0.2}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { icon: <FaSearch size={32} />, title: "Search Engine Optimization", desc: "Rank higher on Google organically. We optimize your website code, content, and backlinks." },
              { icon: <FaMapMarkerAlt size={32} />, title: "Local SEO & GMB", desc: "Dominate your local market. We completely optimize your Google My Business profile so locals find you first." },
              { icon: <FaShareAlt size={32} />, title: "Social Media Management", desc: "Build a loyal audience on Instagram, Facebook, and LinkedIn with engaging daily content." },
              { icon: <FaBullseye size={32} />, title: "Targeted Ad Campaigns", desc: "High-converting Google Ads and Meta Ads that ensure every rupee spent brings in actual leads." },
              { icon: <FaEnvelopeOpenText size={32} />, title: "Content Strategy", desc: "We write compelling blog posts and website copy that turn casual visitors into paying customers." }
            ].map((feature, i) => (
              <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '40px', borderRadius: '24px', transition: 'transform 0.3s' }}>
                <div style={{ color: 'var(--a1)', marginBottom: '20px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
      
      {/* SEO Content Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', color: 'var(--muted)' }}>
        <FadeUp delay={0.3}>
          <div style={{ background: 'var(--card)', borderRadius: '24px', padding: 'clamp(24px, 5vw, 48px)', border: '1px solid var(--border)', backdropFilter: 'blur(20px)' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', marginBottom: '24px', fontStyle: 'italic', fontWeight: 800 }}>
              Why Choose Our <span style={{ color: 'var(--a1)' }}>Marketing Services?</span>
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Most marketing agencies charge massive retainer fees and fail to deliver transparent results. At WebXCrafting, we believe in extreme transparency and low-budget friendly solutions. We don't just want your money; we want your business to succeed because your success becomes our success story.
            </p>
            <h3 style={{ fontSize: '20px', color: '#e8eaf6', marginTop: '32px', marginBottom: '16px', fontWeight: 700 }}>Our Promise to You:</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <li><strong>Zero Hidden Fees:</strong> You know exactly where every rupee goes, from ad spend to our service charges.</li>
              <li><strong>Friendly Support:</strong> We explain complex marketing metrics in plain, easy-to-understand language.</li>
              <li><strong>Custom Strategies:</strong> No copy-paste campaigns. We design strategies based strictly on your unique business goals.</li>
              <li><strong>Monthly Reporting:</strong> Detailed reports showing exact traffic growth, lead acquisition, and ROI.</li>
            </ul>
          </div>
        </FadeUp>
      </section>
      
    </div>
  );
}
