"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotBackground from "@/components/DotBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FaEnvelope, FaPhone, FaClock, FaGlobe } from "react-icons/fa";
import { defaultServices } from "@/app/services/ServicesClient";

const WA_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919102615343";
const WA_MSG =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Hello%20I%20want%20a%20website";
const WA = `https://wa.me/${WA_NUM}?text=${WA_MSG}`;

const infoItems = [
  { icon: FaEnvelope, label: "Email Us", value: "webxcrafting@gmail.com", href: "mailto:webxcrafting@gmail.com" },
  { icon: FaPhone, label: "Call / WhatsApp", value: "+91 9102615343\n+91 7974579107", href: "tel:+919102615343" },
  { icon: FaClock, label: "Response Time", value: "Within 24 hours" },
  {
    icon: FaGlobe,
    label: "Working Hours",
    value: "Mon to Sat, 9AM to 7PM IST",
  },
];

export default function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    url: "",
    service: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        let loadedServices = defaultServices;
        if (data.success && data.data && data.data.length > 0) {
          const apiServices = data.data;
          const customLinkServices = defaultServices.filter(
            (ds: any) => ds.customLink && !apiServices.some((api: any) => api.title === ds.title)
          );
          loadedServices = [...apiServices, ...customLinkServices];
        }
        setServices(loadedServices);
      })
      .catch(err => {
        console.error(err);
        setServices(defaultServices);
      });
  }, []);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setUserName(form.name);
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", company: "", url: "", service: "", budget: "", message: "" });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DotBackground />
      <Navbar />

      <div
        className="mobile-p-6"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "130px 32px 80px",
          maxWidth: 1100,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div className="section-label" style={{ margin: "0 auto 20px" }}>
            Contact Us
          </div>
          <h1
            style={{
              fontFamily: "Syne",
              fontSize: "clamp(32px,5vw,60px)",
              fontWeight: 800,
              fontStyle: "italic",
              marginBottom: 16,
            }}
          >
            Build Something <span className="grad-text">Amazing</span>
          </h1>
          <p
            style={{
              color: "#7b82a8",
              fontSize: 17,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Tell us about your project and we will get back to you within 24
            hours.
          </p>
        </motion.div>

        <div
          className="mobile-grid-1"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {infoItems.map(({ icon: Icon, label, value, href }, index) => {
              const Tag = href ? motion.a : motion.div;
              return (
                <Tag
                  key={label}
                  href={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 30px -10px rgba(79, 111, 255, 0.3)",
                    borderColor: "rgba(79, 111, 255, 0.4)"
                  }}
                  className="glass"
                  style={{
                    padding: "24px 28px",
                    marginBottom: 20,
                    display: "flex",
                    gap: 20,
                    alignItems: "center",
                    borderRadius: 20,
                    textDecoration: "none",
                    cursor: href ? "pointer" : "default",
                    color: "inherit",
                    border: "1px solid rgba(255,255,255,0.05)",
                    background: "linear-gradient(145deg, rgba(25,25,35,0.4) 0%, rgba(15,15,20,0.6) 100%)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, rgba(79, 111, 255, 0.15) 0%, rgba(79, 111, 255, 0.05) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4f6fff",
                      boxShadow: "inset 0 0 20px rgba(79, 111, 255, 0.1)",
                      border: "1px solid rgba(79, 111, 255, 0.2)"
                    }}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <div>
                    <div
                      style={{
                        color: "#8a94b5",
                        fontSize: 13,
                        marginBottom: 6,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ 
                      fontWeight: 700, 
                      fontSize: 16, 
                      color: "#ffffff", 
                      whiteSpace: "pre-line",
                      lineHeight: 1.5
                    }}>
                      {value}
                    </div>
                  </div>
                </Tag>
              );
            })}

            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block", marginTop: 12 }}
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 8px 32px rgba(37,211,102,.4)" }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "18px 24px",
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
                  color: "#fff",
                  fontFamily: "Inter, Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  boxShadow: "0 4px 24px rgba(37,211,102,.25)",
                  transition: "all 0.3s ease"
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13.12 13.12 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </motion.button>
            </a>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass mobile-p-6"
            style={{ padding: 40, borderRadius: 22 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '20px 0' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(0, 230, 118, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    color: '#00e676',
                    border: '2px solid rgba(0, 230, 118, 0.3)'
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </motion.div>
                <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 28, marginBottom: 16, fontStyle: 'italic' }}>
                  Message <span className="grad-text">Received!</span>
                </h3>
                <p style={{ color: '#7b82a8', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
                  Thank you, <strong>{userName}</strong>. Your inquiry has been successfully sent. 
                  Our team will review your requirements and reach out to you via email within 24 hours.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link href="/" className="btn-primary" style={{ width: '100%', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
                    Return to Homepage
                  </Link>
                  <Link href="/services" className="btn-outline" style={{ width: '100%', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
                    Browse Our Services
                  </Link>
                </div>
                <p style={{ marginTop: 24, fontSize: 13, color: '#4f6fff', fontWeight: 500, cursor: 'pointer' }} onClick={() => setSubmitted(false)}>
                  ← Send another message
                </p>
              </motion.div>
            ) : (
              <>
                <h3
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: 22,
                    fontStyle: "italic",
                    marginBottom: 28,
                  }}
                >
                  Send Us a Message
                </h3>

                <div
                  className="mobile-grid-1"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: "#7b82a8",
                        marginBottom: 7,
                        fontWeight: 500,
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      className="form-input"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: "#7b82a8",
                        marginBottom: 7,
                        fontWeight: 500,
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </div>
                </div>

                <div
                  className="mobile-grid-1"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: "#7b82a8",
                        marginBottom: 7,
                        fontWeight: 500,
                      }}
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      className="form-input"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: "#7b82a8",
                        marginBottom: 7,
                        fontWeight: 500,
                      }}
                    >
                      Company Name
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Your Business Name"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                    />
                  </div>
                </div>

                <div
                  className="mobile-grid-1"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: "#7b82a8",
                        marginBottom: 7,
                        fontWeight: 500,
                      }}
                    >
                      Current Website (Optional)
                    </label>
                    <input
                      className="form-input"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={form.url}
                      onChange={(e) => set("url", e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: "#7b82a8",
                        marginBottom: 7,
                        fontWeight: 500,
                      }}
                    >
                      Services Required
                    </label>
                    <select
                      className="form-input"
                      value={form.service}
                      onChange={(e) => set("service", e.target.value)}
                    >
                      <option value="">Select a service</option>
                      {services.map((s: any, i: number) => (
                        <option key={i} value={s.title}>{s.title}</option>
                      ))}
                      <option>Other / Not Sure</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      color: "#7b82a8",
                      marginBottom: 7,
                      fontWeight: 500,
                    }}
                  >
                    Budget Range
                  </label>
                  <select
                    className="form-input"
                    value={form.budget}
                    onChange={(e) => set("budget", e.target.value)}
                  >
                    <option value="">Select your budget</option>
                    <option>Rs. 1,000 to Rs. 5,000</option>
                    <option>Rs. 5,000 to Rs. 15,000</option>
                    <option>Rs. 15,000 to Rs. 40,000</option>
                    <option>Rs. 40,000 to Rs. 1,00,000</option>
                    <option>Rs. 1,00,000+</option>
                    <option>Open to discussion</option>
                  </select>
                </div>

                <div style={{ marginBottom: 32 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      color: "#7b82a8",
                      marginBottom: 7,
                      fontWeight: 500,
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    className="form-input"
                    rows={5}
                    placeholder="Tell us about your project — what you need, your timeline, and any other details..."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="btn-primary"
                  style={{ width: "100%", padding: "15px", fontSize: 16 }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>Send Message &rarr;</>
                  )}
                </motion.button>

                <p
                  style={{
                    color: "#7b82a8",
                    fontSize: 12,
                    textAlign: "center",
                    marginTop: 16,
                  }}
                >
                  Your info is safe. We never share your data.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
