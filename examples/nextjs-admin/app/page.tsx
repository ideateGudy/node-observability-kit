"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  Cpu,
  ExternalLink,
  Gauge,
  GitBranch,
  Layers,
  Play,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { StacklenzzLogo } from "./components/StacklenzzLogo";
import { CURRENT_PROJECT_VERSION } from "./docs/version";

export default function LandingPage() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCommand = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#090d16",
        color: "#f1f5f9",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Top Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          backgroundColor: "rgba(9, 13, 22, 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <StacklenzzLogo size={36} />
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em", color: "#ffffff" }}>
              Stacklenzz
            </div>
            <div style={{ fontSize: "0.7rem", color: "#818cf8", fontWeight: 600 }}>
              {CURRENT_PROJECT_VERSION}
            </div>
          </div>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }} className="landing-nav">
          {/* Live Monitoring Pulse Status Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.25rem 0.65rem",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              fontSize: "0.74rem",
              color: "#6ee7b7",
              fontWeight: 500,
            }}
            title="Telemetry Engine Active & Polling"
          >
            <span style={{ position: "relative", display: "flex", width: "8px", height: "8px" }}>
              <span
                style={{
                  position: "absolute",
                  display: "inline-flex",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  opacity: 0.75,
                  animation: "livePulseRing 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  borderRadius: "50%",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#10b981",
                }}
              />
            </span>
            <span>Live Telemetry</span>
          </div>

          <Link
            href="/docs"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "0.88rem",
              fontWeight: 500,
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
          >
            Documentation
          </Link>
          <Link
            href="/docs/observability-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "0.88rem",
              fontWeight: 500,
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
          >
            Live Demo
          </Link>
          <a
            href="https://github.com/ideateGudy/stacklenzz"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "0.88rem",
              fontWeight: 500,
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
          >
            <GitBranch size={15} /> GitHub
          </a>
          <Link
            href="/docs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.45rem 1rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 0 16px rgba(79, 70, 229, 0.4)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            Get Started <ArrowRight size={14} />
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          padding: "5rem 1.5rem 4rem",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Glow backdrop decoration with subtle pulse */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "550px",
            height: "280px",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 80%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Hero Top Pill Badge with Real-time Pulse Heartbeat */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.4rem 0.95rem",
            borderRadius: "9999px",
            background: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(99, 102, 241, 0.35)",
            backdropFilter: "blur(12px)",
            color: "#c7d2fe",
            fontSize: "0.82rem",
            fontWeight: 600,
            marginBottom: "1.5rem",
            position: "relative",
            zIndex: 1,
            boxShadow: "0 0 20px -5px rgba(99, 102, 241, 0.25)",
          }}
        >
          {/* Animated radar/sonar ping dot */}
          <span style={{ position: "relative", display: "flex", width: "9px", height: "9px" }}>
            <span
              style={{
                position: "absolute",
                display: "inline-flex",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#38bdf8",
                opacity: 0.75,
                animation: "livePulseRing 2s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                borderRadius: "50%",
                width: "9px",
                height: "9px",
                backgroundColor: "#38bdf8",
              }}
            />
          </span>
          <span>Full-Stack Telemetry for Node.js Backends & React UIs</span>
          
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: "-0.04em",
            maxWidth: "920px",
            margin: "0 auto 1.25rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          Effortless Observability,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #818cf8 0%, #38bdf8 50%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Zero Boilerplate.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#94a3b8",
            maxWidth: "740px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.6,
            position: "relative",
            zIndex: 1,
          }}
        >
          A production-grade instrumentation toolkit providing Express and NestJS telemetry, Prometheus metrics, structured Winston JSON logs, and mountable React & Next.js admin dashboards.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            marginBottom: "2.5rem",
          }}
        >
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/docs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.8rem 1.6rem",
                borderRadius: "0.6rem",
                background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
                color: "#ffffff",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)",
              }}
            >
              Explore Documentation <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/docs/observability-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.8rem 1.6rem",
                borderRadius: "0.6rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#f8fafc",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
                backdropFilter: "blur(10px)",
              }}
            >
              <Play size={15} color="#38bdf8" /> Launch Demo Console
            </Link>
          </motion.div>
        </motion.div>

        {/* Live Observability Telemetry Radar Pulse Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "0.65rem 1.25rem",
            marginBottom: "2rem",
            borderRadius: "0.75rem",
            background: "rgba(15, 23, 42, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Pulse Metric 1: Ingestion Heartbeat */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <span style={{ position: "relative", display: "flex", width: "10px", height: "10px" }}>
              <span
                style={{
                  position: "absolute",
                  display: "inline-flex",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  opacity: 0.8,
                  animation: "livePulseRing 1.6s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#10b981",
                }}
              />
            </span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.68rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>
                Heartbeat
              </div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#10b981", fontFamily: "monospace" }}>
                Healthy • 99.99%
              </div>
            </div>
          </div>

          <div style={{ width: "1px", height: "24px", background: "rgba(255, 255, 255, 0.08)" }} className="metric-divider" />

          {/* Pulse Metric 2: Real-time Latency (p99) */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <span style={{ position: "relative", display: "flex", width: "10px", height: "10px" }}>
              <span
                style={{
                  position: "absolute",
                  display: "inline-flex",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#38bdf8",
                  opacity: 0.8,
                  animation: "livePulseRing 2.2s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#38bdf8",
                }}
              />
            </span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.68rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>
                Latency (p99)
              </div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#38bdf8", fontFamily: "monospace" }}>
                14.2 ms
              </div>
            </div>
          </div>

          <div style={{ width: "1px", height: "24px", background: "rgba(255, 255, 255, 0.08)" }} className="metric-divider" />

          {/* Pulse Metric 3: Active Stream Throughput */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <span style={{ position: "relative", display: "flex", width: "10px", height: "10px" }}>
              <span
                style={{
                  position: "absolute",
                  display: "inline-flex",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#a855f7",
                  opacity: 0.8,
                  animation: "livePulseRing 1.9s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#a855f7",
                }}
              />
            </span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.68rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>
                Throughput
              </div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#c084fc", fontFamily: "monospace" }}>
                1,420 req/s
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Install Banner with interactive copy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "600px",
            width: "100%",
            backgroundColor: "#030712",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "0.75rem",
            padding: "0.65rem 1rem",
            position: "relative",
            zIndex: 1,
            boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", overflow: "hidden" }}>
            <Terminal size={16} color="#818cf8" />
            <span style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#e2e8f0", whiteSpace: "nowrap" }}>
              npx stacklenzz dashboard -y
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => copyCommand("npx stacklenzz dashboard -y", "cli-hero")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "0.375rem",
              padding: "0.3rem 0.6rem",
              color: "#94a3b8",
              fontSize: "0.72rem",
              cursor: "pointer",
            }}
          >
            {copiedCmd === "cli-hero" ? (
              <>
                <Check size={13} color="#10b981" />
                <span style={{ color: "#10b981" }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </section>

      {/* 3 Core Architecture Pillars */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 0.5rem 0" }}>
            The 3 Pillars of Stacklenzz
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
            Everything you need for backend instrumentation, dashboard rendering, and tooling.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              borderRadius: "1rem",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "rgba(99, 102, 241, 0.15)",
                color: "#818cf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <Server size={22} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.6rem 0" }}>
              @stacklenzz/server
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 1.25rem 0", flex: 1 }}>
              Plug-and-play middleware for Express and NestJS. Exposes <code>/metrics</code> for Prometheus scrapers, Winston JSON logging, and error tracking with automatic request-response latency percentiles (p50, p95, p99).
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.82rem", color: "#cbd5e1" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#10b981" /> Express <code>setupObservability(app)</code>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#10b981" /> NestJS <code>ObservabilityModule.forRoot()</code>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#10b981" /> Breadcrumbs & Error Fingerprinting
              </li>
            </ul>
            <Link
              href="/docs#express"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "#818cf8",
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              SDK Documentation <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              borderRadius: "1rem",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "rgba(56, 189, 248, 0.15)",
                color: "#38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <BarChart3 size={22} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.6rem 0" }}>
              @stacklenzz/ui
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 1.25rem 0", flex: 1 }}>
              Embeddable observability dashboard package with 6 pre-built layout views, 6 runtime color themes (Tokyo Night, Nord, Dracula, etc.), and deep stack-trace inspection.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.82rem", color: "#cbd5e1" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#38bdf8" /> Native React component: <code>&lt;ObservabilityDashboard /&gt;</code>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#38bdf8" /> 6 Runtime Theme Switchers
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#38bdf8" /> Live Auto-polling & Mock Fallback Mode
              </li>
            </ul>
            <Link
              href="/docs#ui-dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "#38bdf8",
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              UI Component Docs <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.25 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              borderRadius: "1rem",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "rgba(52, 211, 153, 0.15)",
                color: "#34d399",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <Terminal size={22} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.6rem 0" }}>
              stacklenzz-cli
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 1.25rem 0", flex: 1 }}>
              Command-line companion for developer happiness. Auto-detects Next.js App or Pages router, scaffolds dashboard routes, and validates server health with <code>stacklenzz doctor</code>.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.82rem", color: "#cbd5e1" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#34d399" /> <code>stacklenzz dashboard</code> - Auto-scaffold
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#34d399" /> <code>stacklenzz doctor</code> - Health validation
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#34d399" /> <code>stacklenzz init</code> - Configuration generator
              </li>
            </ul>
            <Link
              href="/docs#cli-commands"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "#34d399",
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              CLI Reference <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Interactive Code Preview Section */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "2rem auto 4rem",
          padding: "0 1.5rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          style={{
            backgroundColor: "#030712",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1.25rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#eab308" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <span style={{ marginLeft: "0.5rem", fontSize: "0.78rem", color: "#64748b", fontFamily: "monospace" }}>
                server.ts (Backend Instrumentation)
              </span>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  marginLeft: "0.75rem",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "9999px",
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  fontSize: "0.7rem",
                  color: "#34d399",
                }}
              >
                <span style={{ position: "relative", display: "flex", width: "6px", height: "6px" }}>
                  <span
                    style={{
                      position: "absolute",
                      display: "inline-flex",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                      opacity: 0.75,
                      animation: "livePulseRing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
                    }}
                  />
                  <span
                    style={{
                      position: "relative",
                      display: "inline-flex",
                      borderRadius: "50%",
                      width: "6px",
                      height: "6px",
                      backgroundColor: "#10b981",
                    }}
                  />
                </span>
                <span>listening :5000</span>
              </div>
            </div>
            <Link
              href="/docs"
              style={{
                color: "#818cf8",
                fontSize: "0.78rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              View Full Docs <ArrowRight size={13} />
            </Link>
          </div>

          <pre
            style={{
              margin: 0,
              padding: "1.5rem",
              color: "#e2e8f0",
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: "0.85rem",
              lineHeight: 1.6,
              overflowX: "auto",
            }}
          >
{`import express from "express";
import { setupObservability, addBreadcrumb } from "@stacklenzz/server";

const app = express();

// 1. One line adds metrics, tracing, Winston logs & stats API
setupObservability(app, {
  serviceName: "payment-service",
  environment: "production",
});

// 2. Track custom business breadcrumbs on any route
app.post("/api/checkout", async (req, res) => {
  addBreadcrumb({ category: "billing", message: "Processing card payment" });
  res.json({ status: "confirmed" });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));`}
          </pre>
        </motion.div>
      </section>

      {/* Call to Action Footer Banner */}
      <section
        style={{
          marginTop: "auto",
          padding: "4rem 1.5rem 3rem",
          backgroundColor: "#030712",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 1rem 0" }}>
            Ready to monitor your application?
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1rem", margin: "0 0 2rem 0", lineHeight: 1.6 }}>
            Browse the interactive documentation for copy-paste examples, CLI commands, and complete SDK reference.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/docs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.8rem 1.75rem",
                  borderRadius: "0.5rem",
                  background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)",
                }}
              >
                Go to Documentation <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/docs/observability-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.8rem 1.75rem",
                  borderRadius: "0.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View Live Demo <ExternalLink size={14} />
              </Link>
            </motion.div>
          </div>
          <div style={{ marginTop: "3rem", fontSize: "0.78rem", color: "#64748b" }}>
            Stacklenzz • MIT Licensed • Built with Node.js & React
          </div>
        </motion.div>
      </section>

      {/* Global CSS for Landing page */}
      <style jsx global>{`
        @keyframes livePulseRing {
          0% {
            transform: scale(0.95);
            opacity: 0.85;
          }
          70% {
            transform: scale(2.4);
            opacity: 0;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
        @keyframes telemetryGlow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.15);
          }
          50% {
            box-shadow: 0 0 25px rgba(16, 185, 129, 0.35);
          }
        }
        @media (max-width: 768px) {
          .landing-nav {
            gap: 0.75rem !important;
          }
          .landing-nav a:not(:last-child) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
