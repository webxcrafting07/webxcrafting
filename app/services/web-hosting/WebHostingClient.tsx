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
      <section style={{ position: 'relative', padding: 'clamp(100px, 15vw, 160px) 20px clamp(60px, 10vw, 100px)', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '60px', alignItems: 'center' }}>
        <FadeUp>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', background: 'rgba(79,111,255,0.1)', border: '1px solid rgba(79,111,255,0.2)', borderRadius: '100px', color: '#4f6fff', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '32px' }}>
            <FaServer /> Premium Cloud Hosting
          </div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1, fontStyle: 'italic', marginBottom: '24px', letterSpacing: '-1px' }}>
            Blazing Fast. <br /><span className="grad-text">Rock-Solid.</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#7b82a8', lineHeight: 1.6, marginBottom: '40px', maxWidth: '500px' }}>
            Experience 99.9% uptime, enterprise-grade security, and lightning-fast loading speeds for your business or e-commerce website at unbeatable prices.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="#pricing" className="btn-primary" style={{ padding: '16px 40px', fontSize: '16px' }}>
              View Hosting Plans →
            </Link>
            <a href="https://wa.me/919102615343?text=Hi,%20I'm%20interested%20in%20your%20Web%20Hosting%20services" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '16px 40px', fontSize: '16px', borderColor: 'rgba(37,211,102,.4)', color: '#25d366' }}>
              WhatsApp Us
            </a>
          </div>
        </FadeUp>
        
        <FadeUp delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px', aspectRatio: '1/1', borderRadius: '32px', background: 'linear-gradient(135deg, rgba(79,111,255,0.1), rgba(162,89,255,0.05))', border: '1px solid rgba(99,120,255,0.2)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop) center/cover', opacity: 0.3, mixBlendMode: 'luminosity' }} />
             
             {/* Abstract Server Graphic */}
             <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', gap: '16px', width: '70%' }}>
               {[1, 2, 3].map((item, i) => (
                 <motion.div 
                   key={item}
                   animate={{ x: [0, 5, 0], opacity: [0.8, 1, 0.8] }}
                   transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                   style={{ width: '100%', height: '60px', background: 'rgba(10,14,28,0.8)', border: '1px solid rgba(99,120,255,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '16px', backdropFilter: 'blur(10px)' }}
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
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, fontStyle: 'italic', marginBottom: '16px' }}>
              Why Choose Our <span className="grad-text">Hosting?</span>
            </h2>
            <p style={{ color: '#7b82a8', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
              We provide the best environment for your website to thrive, combining speed, security, and reliability.
            </p>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            { icon: FaTachometerAlt, title: "Lightning Fast NVMe", desc: "Our servers use latest NVMe SSDs and LiteSpeed caching for instant load times." },
            { icon: FaShieldAlt, title: "Enterprise Security", desc: "Built-in DDoS protection, malware scanning, and automated daily backups." },
            { icon: FaLock, title: "Free SSL Certificates", desc: "Secure your visitors' data with free Let's Encrypt SSL certificates automatically installed." },
            { icon: FaCloud, title: "99.9% Uptime Guarantee", desc: "Redundant cloud infrastructure ensures your website never goes offline." },
            { icon: FaDatabase, title: "Unlimited Bandwidth", desc: "No limits on traffic. Handle traffic spikes without worrying about overage charges." },
            { icon: FaHeadset, title: "24/7 Expert Support", desc: "Our technical team is available around the clock to assist you via WhatsApp & Call." }
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
            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(0, 230, 118, 0.1)', border: '1px solid rgba(0, 230, 118, 0.3)', color: '#00e676', borderRadius: '20px', fontWeight: 600, fontSize: '13px', marginBottom: '16px' }}>
              SPECIAL OFFER
            </div>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, fontStyle: 'italic', marginBottom: '16px' }}>
              Affordable <span className="grad-text">Pricing</span>
            </h2>
            <p style={{ color: '#7b82a8', fontSize: '18px' }}>Premium cloud hosting without the premium price tag.</p>
          </div>
        </FadeUp>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FadeUp delay={0.2} style={{ width: '100%', maxWidth: '500px' }}>
            <div className="glass" style={{ position: 'relative', padding: '50px 40px', borderRadius: '32px', border: '1px solid rgba(162, 89, 255, 0.4)', background: 'linear-gradient(180deg, rgba(10,14,28,0.9) 0%, rgba(162, 89, 255, 0.05) 100%)', boxShadow: '0 20px 80px rgba(162, 89, 255, 0.15)', overflow: 'hidden' }}>
              
              {/* Popular Badge */}
              <div style={{ position: 'absolute', top: '24px', right: '-32px', background: 'linear-gradient(90deg, #4f6fff, #a259ff)', padding: '6px 40px', transform: 'rotate(45deg)', fontSize: '12px', fontWeight: 800, letterSpacing: '1px' }}>
                BEST VALUE
              </div>

              <h3 style={{ fontFamily: 'Syne', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Starter Cloud Plan</h3>
              <p style={{ color: '#7b82a8', marginBottom: '32px' }}>Perfect for new businesses and personal sites.</p>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '40px' }}>
                <span style={{ fontSize: '48px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>₹499</span>
                <span style={{ color: '#7b82a8', fontSize: '18px' }}>/ year</span>
                <span style={{ textDecoration: 'line-through', color: '#ff5252', marginLeft: '12px', fontSize: '18px' }}>₹1999</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                {[
                  "Host 1 Website",
                  "10 GB NVMe SSD Storage",
                  "Unlimited Bandwidth",
                  "Free SSL Certificate",
                  "5 Business Email Accounts",
                  "LiteSpeed Web Server",
                  "Weekly Automated Backups",
                  "99.9% Uptime Guarantee"
                ].map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FaCheckCircle color="#00e676" size={20} />
                    <span style={{ color: '#e8eaf6', fontSize: '16px' }}>{feat}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="btn-primary" style={{ width: '100%', padding: '18px', fontSize: '18px' }}>
                Get Started Now
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
              Ready to migrate your website?
            </h2>
            <p style={{ color: '#b0b8d8', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px' }}>
              We offer free website migration from your old host to our premium servers with zero downtime.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://wa.me/919102615343?text=Hi,%20I%20want%20to%20migrate%20my%20website%20to%20your%20hosting" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '16px 40px' }}>
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
