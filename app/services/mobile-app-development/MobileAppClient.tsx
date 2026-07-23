"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaApple, FaAndroid, FaRocket, FaCode, FaPaintBrush } from 'react-icons/fa';
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

export default function MobileAppClient() {
  return (
    <div style={{ color: 'var(--text)', paddingBottom: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(99,120,255,0.1)', borderRadius: '100px', color: 'var(--a1)', fontWeight: 600, fontSize: '14px', marginBottom: '24px' }}>
            <FaMobileAlt /> Mobile App Development
          </div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
            Transform Your Ideas Into <span style={{ color: 'var(--a1)' }}>Powerful Mobile Apps</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '40px' }}>
            We build native and cross-platform applications for iOS and Android that deliver exceptional user experiences and drive business growth.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: 'linear-gradient(90deg, var(--a1), var(--a2))', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.3s' }}>
              Start Your Project
            </Link>
            <Link href="#technologies" style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.3s' }}>
              Our Tech Stack
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeUp delay={0.2}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { icon: <FaApple size={32} />, title: "iOS App Development", desc: "Sleek, high-performance applications built natively for Apple devices ensuring a premium user experience." },
              { icon: <FaAndroid size={32} />, title: "Android App Development", desc: "Scalable and robust apps tailored for the vast Android ecosystem to reach millions of users globally." },
              { icon: <FaCode size={32} />, title: "Cross-Platform (React Native / Flutter)", desc: "Cost-effective, single-codebase solutions that run flawlessly on both iOS and Android platforms." },
              { icon: <FaPaintBrush size={32} />, title: "UI/UX Design for Mobile", desc: "Intuitive, engaging, and modern interface designs that keep your users coming back." },
              { icon: <FaRocket size={32} />, title: "App Store Optimization & Launch", desc: "We don't just build; we help you launch successfully on the App Store and Google Play Store." }
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
      <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', color: 'var(--muted)' }} id="technologies">
        <FadeUp delay={0.3}>
          <div style={{ background: 'var(--card)', borderRadius: '24px', padding: 'clamp(24px, 5vw, 48px)', border: '1px solid var(--border)', backdropFilter: 'blur(20px)' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', marginBottom: '24px', fontStyle: 'italic', fontWeight: 800 }}>
              Why Choose Us for <span style={{ color: 'var(--a1)' }}>Mobile App Development?</span>
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              In today's digital era, having a mobile application is crucial for business expansion. As a leading mobile app development agency, we specialize in delivering secure, scalable, and intuitive applications. Whether you need a simple utility app, an e-commerce platform, or a complex enterprise solution, our team of expert developers and designers have you covered.
            </p>
            <h3 style={{ fontSize: '20px', color: '#e8eaf6', marginTop: '32px', marginBottom: '16px', fontWeight: 700 }}>Our Development Process</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <li><strong>Discovery & Planning:</strong> Understanding your business goals, target audience, and feature requirements.</li>
              <li><strong>UI/UX Prototyping:</strong> Designing wireframes and interactive prototypes to visualize the app flow.</li>
              <li><strong>Agile Development:</strong> Writing clean, maintainable code using modern frameworks like React Native, Flutter, Swift, and Kotlin.</li>
              <li><strong>Quality Assurance:</strong> Rigorous testing across multiple devices to ensure a bug-free experience.</li>
              <li><strong>Deployment & Maintenance:</strong> Launching on app stores and providing ongoing support and updates.</li>
            </ul>
          </div>
        </FadeUp>
      </section>
      
    </div>
  );
}
