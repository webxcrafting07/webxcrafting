"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotBackground from "@/components/DotBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FaGlobe, FaShoppingCart, FaCog, FaBriefcase } from "react-icons/fa";

const categories = ["All", "Business", "E-commerce", "Job Portal", "Custom"];
const catColors: Record<string, string> = {
  Business: "#4f6fff",
  "E-commerce": "#a259ff",
  Custom: "#00e5ff",
  "Job Portal": "#00e676",
};
const catIcons: Record<string, any> = {
  Business: FaGlobe,
  "E-commerce": FaShoppingCart,
  Custom: FaCog,
  "Job Portal": FaBriefcase,
};

const defaultProjects = [
  {
    _id: "1",
    title: "TechStart Landing",
    description:
      "Animated landing page with lead capture, blog, and SEO optimization.",
    category: "Business",
    status: "completed",
    liveLink: "#",
  },
  {
    _id: "2",
    title: "FashionHub Store",
    description:
      "E-commerce with 500+ products, Razorpay integration, and inventory management.",
    category: "E-commerce",
    status: "completed",
    liveLink: "#",
  },
  {
    _id: "3",
    title: "JobsIndia Portal",
    description:
      "Job listing platform with employer/candidate dashboards and notifications.",
    category: "Job Portal",
    status: "ongoing",
    liveLink: "",
  },
  {
    _id: "4",
    title: "HealthCare Pro",
    description:
      "Healthcare clinic website with appointment booking, doctor profiles, and patient portal.",
    category: "Business",
    status: "completed",
    liveLink: "#",
  },
  {
    _id: "5",
    title: "CryptoTrack",
    description:
      "Real-time crypto portfolio tracker with charts, alerts, and multi-wallet support.",
    category: "Custom",
    status: "ongoing",
    liveLink: "",
  },
  {
    _id: "6",
    title: "EduLearn Platform",
    description:
      "Online learning platform with video courses, quizzes, progress tracking, and certificates.",
    category: "Custom",
    status: "completed",
    liveLink: "#",
  },
];

function ProjectCard({ project }: { project: any }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: "rgba(10,14,28,0.65)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(99,120,255,.15)",
      }}
    >
      <div
        style={{
          height: 200,
          background: project.image 
            ? `url(${project.image}) center/cover no-repeat` 
            : `linear-gradient(135deg,${catColors[project.category] || "#4f6fff"}22,${catColors[project.category] || "#a259ff"}44)`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          color: catColors[project.category] || "#4f6fff",
        }}
      >
        {!project.image && (() => {
          const Icon = catIcons[project.category] || FaGlobe;
          return <Icon size={60} />;
        })()}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(3,5,10,0.88)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
                padding: 16,
              }}
            >
              {project.liveLink && project.liveLink !== "#" ? (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: 13, padding: "9px 20px" }}
                >
                  View Live ↗
                </a>
              ) : (
                <span style={{ color: "#7b82a8", fontSize: 14 }}>
                  {project.status === "ongoing"
                    ? "In Development"
                    : "No Live Link"}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div style={{ padding: 24 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            className={`tag ${project.status === "completed" ? "tag-green" : "tag-orange"}`}
            style={{ fontSize: 11, padding: "3px 10px" }}
          >
            {project.status === "completed" ? "✓ Completed" : "⟳ Ongoing"}
          </span>
          <span
            className="tag"
            style={{
              fontSize: 11,
              padding: "3px 10px",
              background: `${catColors[project.category] || "#4f6fff"}18`,
              color: catColors[project.category] || "#4f6fff",
              borderColor: `${catColors[project.category] || "#4f6fff"}35`,
            }}
          >
            {project.category}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: 18,
            fontStyle: "italic",
            marginBottom: 8,
          }}
        >
          {project.title}
        </h3>
        <p style={{ color: "#7b82a8", fontSize: 14, lineHeight: 1.65 }}>
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function PortfolioClient() {
  const [projects, setProjects] = useState(defaultProjects);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data.length) setProjects(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p: any) => p.category === filter);

  return (
    <>
      <DotBackground />
      <Navbar />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "130px 32px 80px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div className="section-label" style={{ margin: "0 auto 20px" }}>
            Portfolio
          </div>
          <h1
            style={{
              fontFamily: "Syne",
              fontSize: "clamp(32px,5vw,64px)",
              fontWeight: 800,
              fontStyle: "italic",
              marginBottom: 16,
            }}
          >
            Our <span className="grad-text">Project Showcase</span>
          </h1>
          <p
            style={{
              color: "#7b82a8",
              fontSize: 17,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Real projects, real results. See what we have built.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          {categories.map((c) => (
            <motion.button
              key={c}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilter(c)}
              style={{
                padding: "8px 22px",
                borderRadius: 22,
                border: "none",
                cursor: "pointer",
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 14,
                transition: "all 0.2s",
                background:
                  filter === c
                    ? "linear-gradient(135deg,#4f6fff,#a259ff)"
                    : "rgba(10,14,28,0.65)",
                color: filter === c ? "#fff" : "#7b82a8",
                boxShadow:
                  filter === c ? "0 4px 20px rgba(79,111,255,.4)" : "none",
                outline:
                  filter === c ? "none" : "1px solid rgba(99,120,255,.15)",
              }}
            >
              {c}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#7b82a8" }}>
            <div className="spinner" style={{ margin: "0 auto 16px" }} />
            Loading projects...
          </div>
        ) : (
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p: any) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 80, color: "#7b82a8" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p>No projects in this category yet.</p>
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
