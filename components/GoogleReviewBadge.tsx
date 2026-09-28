"use client";
import React from "react";
import { FaGoogle, FaStar } from "react-icons/fa";

export default function GoogleReviewBadge() {
  return (
    <a
      href="https://share.google/3PHsoNPOUsACUGdHH"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 24px",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 20,
        textDecoration: "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
        e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.15)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
        e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.08)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <FaGoogle size={24} color="#4285F4" />
      </div>
      <div>
        <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "Syne, sans-serif", marginBottom: 4 }}>
          Review us on Google
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#a0a8cc", fontSize: 13 }}>
          <div style={{ display: "flex", gap: 2, color: "#FFB900" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
          <span>Share your experience!</span>
        </div>
      </div>
    </a>
  );
}
