"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaShieldAlt, FaTachometerAlt, FaHeadset, FaCloud, FaLock } from 'react-icons/fa';
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

export default function WebHostingClient() {
  return (
    <div style={{ color: 'var(--text)', paddingBottom: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(99,120,255,0.1)', borderRadius: '100px', color: 'var(--a1)', fontWeight: 600, fontSize: '14px', marginBottom: '24px' }}>
            <FaServer /> Premium Web Hosting
          </div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
            Blazing Fast, <span style={{ color: 'var(--a1)' }}>Rock-Solid Hosting</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '40px' }}>
            Experience 99.9% uptime, enterprise-grade security, and lightning-fast loading speeds for your business or e-commerce website.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: 'linear-gradient(90deg, var(--a1), var(--a2))', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.3s' }}>
              View Hosting Plans
            </Link>
            <Link href="#features" style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.3s' }}>
              Explore Features
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }} id="features">
        <FadeUp delay={0.2}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { icon: <FaTachometerAlt size={32} />, title: "Lightning Fast Speeds", desc: "Our servers are optimized for speed, utilizing NVMe SSDs and advanced caching for instant load times." },
              { icon: <FaShieldAlt size={32} />, title: "Enterprise Security", desc: "Built-in DDoS protection, malware scanning, and automated daily backups keep your data safe." },
              { icon: <FaLock size={32} />, title: "Free SSL Certificates", desc: "Secure your visitors' data and boost your SEO rankings with free Let's Encrypt SSL certificates." },
              { icon: <FaCloud size={32} />, title: "Scalable Cloud Infra", desc: "Easily scale your resources up or down based on your traffic demands without any downtime." },
              { icon: <FaHeadset size={32} />, title: "24/7 Expert Support", desc: "Our technical team is available around the clock to assist you with any hosting-related issues." }
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
              The Foundation of a <span style={{ color: 'var(--a1)' }}>Successful Website</span>
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Your web hosting provider is the backbone of your online presence. Slow load times can kill your SEO rankings and drive customers away. At WebXCrafting, we provide premium web hosting solutions that ensure your site is always accessible, incredibly fast, and impenetrable to cyber threats.
            </p>
            <h3 style={{ fontSize: '20px', color: '#e8eaf6', marginTop: '32px', marginBottom: '16px', fontWeight: 700 }}>Our Hosting Solutions Include:</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <li><strong>Shared Hosting:</strong> Perfect for personal blogs, portfolios, and small business websites looking for an affordable yet reliable solution.</li>
              <li><strong>VPS Hosting:</strong> Virtual Private Servers offering dedicated resources for high-traffic websites and complex web applications.</li>
              <li><strong>E-commerce Hosting:</strong> Specialized environments optimized for WooCommerce, Magento, and custom e-commerce stores.</li>
              <li><strong>Managed Cloud Hosting:</strong> Fully managed AWS or DigitalOcean droplets where we handle all server maintenance and optimization.</li>
            </ul>
          </div>
        </FadeUp>
      </section>
      
    </div>
  );
}
