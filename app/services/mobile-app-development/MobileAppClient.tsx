"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaApple, FaAndroid, FaRocket, FaCode, FaPaintBrush, FaCheckCircle, FaStore } from 'react-icons/fa';
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

export default function MobileAppClient() {
  return (
    <div style={{ color: 'var(--text)', overflow: 'hidden' }}>
      <Navbar />
      <DotBackground />
      <WhatsAppButton />

      {/* ── HERO SECTION ── */}
      <section style={{ position: 'relative', padding: 'clamp(100px, 15vw, 160px) 20px clamp(60px, 10vw, 100px)', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '60px', alignItems: 'center' }}>
        <FadeUp>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', background: 'rgba(79,111,255,0.1)', border: '1px solid rgba(79,111,255,0.2)', borderRadius: '100px', color: '#4f6fff', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '32px' }}>
            <FaMobileAlt /> Native & Cross-Platform
          </div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1, fontStyle: 'italic', marginBottom: '24px', letterSpacing: '-1px' }}>
            Your Vision. <br /><span className="grad-text">In Every Pocket.</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#7b82a8', lineHeight: 1.6, marginBottom: '40px', maxWidth: '500px' }}>
            We design and develop high-performance iOS and Android applications that deliver exceptional user experiences and drive business growth.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="#pricing" className="btn-primary" style={{ padding: '16px 40px', fontSize: '16px' }}>
              View Pricing →
            </Link>
            <a href="https://wa.me/919102615343?text=Hi,%20I%20have%20an%20idea%20for%20a%20Mobile%20App" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '16px 40px', fontSize: '16px', borderColor: 'rgba(37,211,102,.4)', color: '#25d366' }}>
              Discuss Your Idea
            </a>
          </div>
        </FadeUp>
        
        <FadeUp delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', aspectRatio: '9/16', borderRadius: '40px', background: 'linear-gradient(135deg, rgba(79,111,255,0.1), rgba(162,89,255,0.05))', border: '8px solid rgba(10,14,28,0.9)', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 2px rgba(99,120,255,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
             
             {/* Notch */}
             <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: 'rgba(10,14,28,0.9)', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }} />

             <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop) center/cover', opacity: 0.2, mixBlendMode: 'luminosity' }} />
             
             {/* Mock App Interface */}
             <div style={{ zIndex: 10, padding: '50px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #4f6fff, #a259ff)' }} />
                  </div>
                  <div style={{ width: '100px', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  {[1, 2, 3].map((item, i) => (
                    <motion.div 
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + (i * 0.2) }}
                      style={{ width: '100%', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '12px' }}
                    >
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)' }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '60%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.2)' }} />
                        <div style={{ width: '40%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
             </div>
          </div>
        </FadeUp>
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, fontStyle: 'italic', marginBottom: '16px' }}>
              Built For <span className="grad-text">Performance</span>
            </h2>
            <p style={{ color: '#7b82a8', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
              We leverage modern frameworks and best practices to deliver mobile applications that users love.
            </p>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            { icon: FaApple, title: "iOS Native Apps", desc: "Sleek, high-performance applications built specifically for the Apple ecosystem using Swift." },
            { icon: FaAndroid, title: "Android Native Apps", desc: "Scalable and robust apps tailored for the vast Android market using Kotlin and Java." },
            { icon: FaCode, title: "React Native & Flutter", desc: "Cost-effective, cross-platform solutions that run flawlessly on both iOS and Android." },
            { icon: FaPaintBrush, title: "UI/UX Design", desc: "Stunning, intuitive, and engaging interface designs that keep your users coming back." },
            { icon: FaRocket, title: "App Store Launch", desc: "We handle the entire App Store and Google Play Store submission and optimization process." },
            { icon: FaStore, title: "E-commerce Apps", desc: "Powerful mobile commerce applications integrated with secure payment gateways." }
          ].map((feat, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="glass card-hover" style={{ padding: '40px 30px', height: '100%' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(79,111,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: '#4f6fff', fontSize: '28px' }}>
                  <feat.icon />
                </div>
                <h3 style={{ fontFamily: 'Syne', fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: '#e8eaf6' }}>
                  {feat.title}
                </h3>
                <p style={{ color: '#7b82a8', lineHeight: 1.6 }}>
                  {feat.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section id="pricing" style={{ padding: '80px 20px 120px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, fontStyle: 'italic', marginBottom: '16px' }}>
              Transparent <span className="grad-text">Pricing</span>
            </h2>
            <p style={{ color: '#7b82a8', fontSize: '18px' }}>Premium mobile app development at competitive rates.</p>
          </div>
        </FadeUp>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FadeUp delay={0.2} style={{ width: '100%', maxWidth: '500px' }}>
            <div className="glass" style={{ position: 'relative', padding: '50px 40px', borderRadius: '32px', border: '1px solid rgba(162, 89, 255, 0.4)', background: 'linear-gradient(180deg, rgba(10,14,28,0.9) 0%, rgba(162, 89, 255, 0.05) 100%)', boxShadow: '0 20px 80px rgba(162, 89, 255, 0.15)', overflow: 'hidden' }}>
              
              {/* Popular Badge */}
              <div style={{ position: 'absolute', top: '24px', right: '-32px', background: 'linear-gradient(90deg, #4f6fff, #a259ff)', padding: '6px 40px', transform: 'rotate(45deg)', fontSize: '12px', fontWeight: 800, letterSpacing: '1px' }}>
                MOST POPULAR
              </div>

              <h3 style={{ fontFamily: 'Syne', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Cross-Platform App</h3>
              <p style={{ color: '#7b82a8', marginBottom: '32px' }}>Fully functional app for both iOS & Android.</p>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '40px' }}>
                <span style={{ fontSize: '48px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>₹30,000</span>
                <span style={{ textDecoration: 'line-through', color: '#ff5252', marginLeft: '12px', fontSize: '18px' }}>₹45,000</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                {[
                  "iOS & Android App (React Native/Flutter)",
                  "Custom UI/UX Design",
                  "Admin Panel / Dashboard",
                  "API Integration",
                  "Push Notifications",
                  "Play Store & App Store Submission",
                  "3 Months Free Support",
                  "Source Code Handover"
                ].map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FaCheckCircle color="#00e676" size={20} />
                    <span style={{ color: '#e8eaf6', fontSize: '16px' }}>{feat}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="btn-primary" style={{ width: '100%', padding: '18px', fontSize: '18px' }}>
                Start Your Project
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{ padding: '0 20px 100px' }}>
        <FadeUp>
          <div className="glass-strong" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 40px', borderRadius: '32px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(79,111,255,0.1) 0%, rgba(10,14,28,0.8) 100%)', border: '1px solid rgba(79,111,255,0.3)' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: '24px' }}>
              Have a custom app requirement?
            </h2>
            <p style={{ color: '#b0b8d8', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px' }}>
              From simple utility apps to complex enterprise solutions, our experts can bring your unique ideas to life. Let's discuss your specific needs.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://wa.me/919102615343?text=Hi,%20I%20have%20a%20custom%20Mobile%20App%20requirement" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '16px 40px' }}>
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
