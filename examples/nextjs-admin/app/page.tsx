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
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
            }}
          >
            <Activity size={20} color="#ffffff" />
          </div>
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
            href="https://github.com/ideateGudy/node-observability-kit"
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
        {/* Glow backdrop decoration */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "550px",
            height: "280px",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.35rem 0.85rem",
            borderRadius: "9999px",
            background: "rgba(99, 102, 241, 0.12)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            color: "#a5b4fc",
            fontSize: "0.82rem",
            fontWeight: 600,
            marginBottom: "1.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Sparkles size={14} color="#818cf8" />
          <span>Full-Stack Telemetry for Node.js Backends & React UIs</span>
        </div>

        <h1
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
        </h1>

        <p
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
        </p>

        {/* CTA Button Group */}
        <div
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
              transition: "transform 0.15s ease",
            }}
          >
            Explore Documentation <ArrowRight size={16} />
          </Link>

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
              transition: "background 0.15s ease",
            }}
          >
            <Play size={15} color="#38bdf8" /> Launch Demo Console
          </Link>
        </div>

        {/* Quick Install Banner */}
        <div
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
          <button
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
          </button>
        </div>
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
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 0.5rem 0" }}>
            The 3 Pillars of Stacklenzz
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
            Everything you need for backend instrumentation, dashboard rendering, and tooling.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Pillar 1 */}
          <div
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
          </div>

          {/* Pillar 2 */}
          <div
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
          </div>

          {/* Pillar 3 */}
          <div
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
          </div>
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
        <div
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
        </div>
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
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 1rem 0" }}>
            Ready to monitor your application?
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1rem", margin: "0 0 2rem 0", lineHeight: 1.6 }}>
            Browse the interactive documentation for copy-paste examples, CLI commands, and complete SDK reference.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
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
          </div>
          <div style={{ marginTop: "3rem", fontSize: "0.78rem", color: "#64748b" }}>
            Stacklenzz • MIT Licensed • Built with Node.js & React
          </div>
        </div>
      </section>

      {/* Global CSS for Landing page */}
      <style jsx global>{`
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
