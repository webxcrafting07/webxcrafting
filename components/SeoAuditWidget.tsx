"use client";

import React, { useState, useEffect } from "react";
import { FaSearchDollar, FaTimes, FaCheckCircle, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SeoAuditWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Trigger widget visibility after a bit of scrolling to not overwhelm user on immediate load
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `SEO Audit Request for: ${website}`,
          budget: "Not specified (SEO Audit)",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      setSuccess(true);
      toast.success("Audit request received! We'll email you soon.");
      
      // Auto close after success
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setName("");
        setEmail("");
        setWebsite("");
      }, 3000);
      
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hasScrolled) return null;

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="glass"
        style={{
          position: "fixed",
          bottom: "100px",
          right: "30px",
          zIndex: 999,
          padding: "16px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(79, 111, 255, 0.2) 0%, rgba(130, 80, 255, 0.2) 100%)",
          border: "1px solid rgba(79, 111, 255, 0.4)",
          color: "#fff",
          cursor: "pointer",
          display: isOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        aria-label="Request Free SEO Audit"
      >
        <FaSearchDollar size={24} style={{ color: "#4f6fff" }} />
      </button>

      {/* Glassmorphism Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "30px",
            zIndex: 1000,
            width: "320px",
            background: "rgba(10, 14, 28, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(79, 111, 255, 0.3)",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            animation: "slideUp 0.4s ease-out forwards",
            transformOrigin: "bottom right"
          }}
        >
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .audit-input {
              width: 100%;
              padding: 12px 16px;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 8px;
              color: #fff;
              font-size: 14px;
              margin-bottom: 12px;
              outline: none;
              transition: all 0.2s;
              box-sizing: border-box;
            }
            .audit-input:focus {
              border-color: #4f6fff;
              background: rgba(79, 111, 255, 0.05);
            }
            .audit-btn {
              width: 100%;
              padding: 12px;
              background: #4f6fff;
              color: white;
              border: none;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              transition: background 0.2s;
              display: flex;
              align-items: center;
              justifyContent: center;
              gap: 8px;
            }
            .audit-btn:hover {
              background: #3b5bdb;
            }
          `}</style>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
          >
            <FaTimes size={18} />
          </button>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
              <FaSearchDollar style={{ color: "#4f6fff" }} />
              Free SEO Audit
            </h3>
            <p style={{ margin: 0, fontSize: "13px", color: "#7b82a8", lineHeight: 1.5 }}>
              Find out exactly why your website isn't ranking #1. Get a comprehensive technical report sent to your email.
            </p>
          </div>

          {success ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <FaCheckCircle size={40} style={{ color: "#00e676", marginBottom: "12px" }} />
              <h4 style={{ margin: "0 0 8px 0", color: "#fff" }}>Audit Requested!</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#7b82a8" }}>Our team will analyze your site and email you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="audit-input"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="audit-input"
              />
              <input
                type="url"
                placeholder="https://yourwebsite.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
                className="audit-input"
              />
              
              <button type="submit" disabled={loading} className="audit-btn">
                {loading ? <FaSpinner className="spin" /> : "Get Free Report"}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
