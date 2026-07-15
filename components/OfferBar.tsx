"use client";

import React, { useState, useEffect } from "react";
import { FaTimes, FaFire } from "react-icons/fa";

export default function OfferBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't dismissed it in this session
    const dismissed = sessionStorage.getItem("offerDismissed");
    if (!dismissed) {
      // Small delay for dramatic effect
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("offerDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div
      id="wxc-offer-bar"
      style={{
        position: "relative",
        zIndex: 100,
        background: "linear-gradient(90deg, #4f6fff 0%, #8250ff 100%)",
        color: "#ffffff",
        padding: "10px 40px",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: 500,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        boxShadow: "0 4px 15px rgba(79, 111, 255, 0.3)",
      }}
    >
      <FaFire style={{ color: "#ffb74d" }} />
      <span>
        <strong>Limited Offer:</strong> Get 20% Off on Custom Web Development & Local SEO Setup!
      </span>
      <a
        href="/contact"
        style={{
          background: "#ffffff",
          color: "#4f6fff",
          padding: "4px 12px",
          borderRadius: "20px",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "12px",
          marginLeft: "10px",
          transition: "transform 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Claim Now
      </a>

      <button
        onClick={handleDismiss}
        style={{
          position: "absolute",
          right: "15px",
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.7)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
        }}
        aria-label="Close offer"
      >
        <FaTimes size={14} />
      </button>
    </div>
  );
}
