"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaShieldAlt, FaTachometerAlt, FaHeadset, FaCloud, FaLock, FaDatabase, FaCheckCircle } from 'react-icons/fa';
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

export default function WebHostingClient() {
  return (
    <div style={{ color: 'var(--text)', overflow: 'hidden' }}>
      <Navbar />
      <DotBackground />
      <WhatsAppButton />

      {/* ── HERO SECTION ── */}
      <section style={{ position: 'relative', padding: 'clamp(80px, 12vw, 100px) 20px clamp(40px, 8vw, 60px)', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '40px', alignItems: 'center' }}>
        <FadeUp>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(79,111,255,0.1)', border: '1px solid rgba(79,111,255,0.2)', borderRadius: '100px', color: '#4f6fff', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>
            <FaServer /> Managed Website Hosting
          </div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, fontStyle: 'italic', marginBottom: '20px', letterSpacing: '-1px' }}>
            Focus on Business. <br /><span className="grad-text">We Handle Servers.</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#7b82a8', lineHeight: 1.6, marginBottom: '32px', maxWidth: '500px' }}>
            We don't just sell servers. We provide fully managed, lightning-fast, and secure hosting specifically designed for the websites we build for our clients.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="#pricing" className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
              View Hosting Plan →
            </Link>
            <a href="https://wa.me/919102615343?text=Hi,%20I'm%20interested%20in%20your%20Managed%20Hosting%20services" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '14px 32px', fontSize: '15px', borderColor: 'rgba(37,211,102,.4)', color: '#25d366' }}>
              WhatsApp Us
            </a>
          </div>
        </FadeUp>
        
        <FadeUp delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '450px', aspectRatio: '1/1', borderRadius: '32px', background: 'linear-gradient(135deg, rgba(79,111,255,0.1), rgba(162,89,255,0.05))', border: '1px solid rgba(99,120,255,0.2)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop) center/cover', opacity: 0.3, mixBlendMode: 'luminosity' }} />
             
             {/* Abstract Server Graphic */}
             <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', gap: '12px', width: '70%' }}>
               {[1, 2, 3].map((item, i) => (
                 <motion.div 
                   key={item}
                   animate={{ x: [0, 5, 0], opacity: [0.8, 1, 0.8] }}
                   transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                   style={{ width: '100%', height: '50px', background: 'rgba(10,14,28,0.8)', border: '1px solid rgba(99,120,255,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '12px', backdropFilter: 'blur(10px)' }}
                 >
                   <div style={{ display: 'flex', gap: '6px' }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e676', boxShadow: '0 0 10px #00e676' }} />
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffb74d' }} />
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5252' }} />
                   </div>
                   <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', flex: 1, borderRadius: '2px', overflow: 'hidden' }}>
                     <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: `${60 + (i * 15)}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        style={{ height: '100%', background: 'linear-gradient(90deg, #4f6fff, #a259ff)' }}
                     />
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
        </FadeUp>
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, fontStyle: 'italic', marginBottom: '16px' }}>
              Why Choose Our <span className="grad-text">Hosting?</span>
            </h2>
            <p style={{ color: '#7b82a8', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
              We handle the complex server setup, security, and maintenance so you can focus entirely on growing your business.
            </p>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { icon: FaTachometerAlt, title: "Optimized Performance", desc: "Servers configured perfectly for the websites we build to ensure lightning-fast loading." },
            { icon: FaShieldAlt, title: "Fully Managed", desc: "We take care of all technical maintenance, backend updates, and server optimization." },
            { icon: FaLock, title: "Free SSL & Security", desc: "DDoS protection, malware scanning, and free SSL certificates automatically installed." },
            { icon: FaCloud, title: "99.9% Uptime", desc: "Reliable cloud infrastructure ensures your website is always online and accessible." },
            { icon: FaDatabase, title: "Automated Backups", desc: "Daily and weekly automated backups to ensure your business data is never lost." },
            { icon: FaHeadset, title: "Priority Support", desc: "Direct WhatsApp and call support for any website issues, updates, or maintenance." }
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
              SPECIAL OFFER
            </div>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, fontStyle: 'italic', marginBottom: '16px' }}>
              Managed <span className="grad-text">Hosting Plan</span>
            </h2>
            <p style={{ color: '#7b82a8', fontSize: '16px' }}>Simple, affordable, and fully managed by our experts.</p>
          </div>
        </FadeUp>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FadeUp delay={0.2} style={{ width: '100%', maxWidth: '450px' }}>
            <div className="glass" style={{ position: 'relative', padding: '40px 30px', borderRadius: '24px', border: '1px solid rgba(162, 89, 255, 0.4)', background: 'linear-gradient(180deg, rgba(10,14,28,0.9) 0%, rgba(162, 89, 255, 0.05) 100%)', boxShadow: '0 20px 80px rgba(162, 89, 255, 0.15)', overflow: 'hidden' }}>
              
              <div style={{ position: 'absolute', top: '24px', right: '-32px', background: 'linear-gradient(90deg, #4f6fff, #a259ff)', padding: '6px 40px', transform: 'rotate(45deg)', fontSize: '11px', fontWeight: 800, letterSpacing: '1px' }}>
                BEST VALUE
              </div>

              <h3 style={{ fontFamily: 'Syne', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Managed Website Hosting</h3>
              <p style={{ color: '#7b82a8', marginBottom: '24px', fontSize: '15px' }}>Exclusively for our web design clients.</p>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
                <span style={{ fontSize: '40px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>₹499</span>
                <span style={{ color: '#7b82a8', fontSize: '16px' }}>/ year</span>
                <span style={{ textDecoration: 'line-through', color: '#ff5252', marginLeft: '12px', fontSize: '16px' }}>₹1999</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  "Host 1 Website",
                  "Fully Managed by Our Team",
                  "Technical Maintenance Included",
                  "Free SSL Certificate",
                  "Business Email Accounts",
                  "Automated Regular Backups",
                  "99.9% Uptime Guarantee",
                  "Priority WhatsApp Support"
                ].map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaCheckCircle color="#00e676" size={18} />
                    <span style={{ color: '#e8eaf6', fontSize: '15px' }}>{feat}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px' }}>
                Get Started Now
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
              Need a website with reliable hosting?
            </h2>
            <p style={{ color: '#b0b8d8', fontSize: '16px', maxWidth: '600px', margin: '0 auto 30px' }}>
              We build your website and manage the hosting so you don't have to worry about the technical details. Let's start your project today.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://wa.me/919102615343?text=Hi,%20I%20want%20a%20website%20with%20managed%20hosting" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      <Footer />
    </div>
  );
}
