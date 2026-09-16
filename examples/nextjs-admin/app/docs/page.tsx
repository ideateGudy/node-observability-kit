"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Layers,
  Terminal,
  Cpu,
  Server,
  Code,
  Shield,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Search,
  Sparkles,
  Zap,
  Gauge,
  AlertTriangle,
  Play,
  GitBranch
} from "lucide-react";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState<string>("quickstart");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navItems = [
    {
      group: "Getting Started",
      items: [
        { id: "overview", label: "Overview & Architecture", icon: <Layers size={16} /> },
        { id: "quickstart", label: "Quick Start Guide", icon: <Zap size={16} /> },
        { id: "installation", label: "Installation & Setup", icon: <Terminal size={16} /> },
      ],
    },
    {
      group: "Backend SDK",
      items: [
        { id: "express", label: "Express Instrumentation", icon: <Server size={16} /> },
        { id: "nestjs", label: "NestJS Module Setup", icon: <Cpu size={16} /> },
        { id: "metrics-tracing", label: "Metrics & OpenTelemetry", icon: <Gauge size={16} /> },
        { id: "error-intel", label: "Error Intelligence & Breadcrumbs", icon: <AlertTriangle size={16} /> },
      ],
    },
    {
      group: "Frontend & Dashboards",
      items: [
        { id: "ui-dashboard", label: "React & Next.js UI", icon: <Activity size={16} /> },
        { id: "dashboard-themes", label: "Themes & Layouts", icon: <Sparkles size={16} /> },
        { id: "cli-tool", label: "Observability CLI", icon: <Code size={16} /> },
      ],
    },
    {
      group: "Production Readiness",
      items: [
        { id: "security", label: "Auth & Security", icon: <Shield size={16} /> },
        { id: "deployment", label: "NPM & Live Hosting", icon: <ExternalLink size={16} /> },
      ],
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#090d16", color: "#f1f5f9", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Top Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.85rem 2rem",
          backgroundColor: "rgba(9, 13, 22, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(99, 102, 241, 0.4)",
              }}
            >
              <Activity size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em", color: "#ffffff" }}>
                Observability Kit
              </div>
              <div style={{ fontSize: "0.75rem", color: "#818cf8", fontWeight: 600 }}>v0.1.0 Documentation</div>
            </div>
          </div>
          <span
            style={{
              padding: "0.2rem 0.6rem",
              fontSize: "0.7rem",
              borderRadius: "9999px",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#a5b4fc",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              fontWeight: 600,
            }}
          >
            Developer-First
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/admin/observability"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.9rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 2px 10px rgba(79, 70, 229, 0.3)",
              transition: "all 0.2s",
            }}
          >
            <Play size={14} /> Live Demo Dashboard
          </Link>
          <a
            href="https://github.com/ideateGudy/ideategudy-observability-toolkit"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.9rem",
              borderRadius: "0.5rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#cbd5e1",
              fontSize: "0.85rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <GitBranch size={15} /> GitHub
          </a>
        </div>
      </header>

      {/* Main Documentation Layout */}
      <div style={{ display: "flex", maxWidth: "1600px", margin: "0 auto" }}>
        {/* Left Sticky Sidebar */}
        <aside
          style={{
            width: "280px",
            flexShrink: 0,
            height: "calc(100vh - 65px)",
            position: "sticky",
            top: "65px",
            overflowY: "auto",
            padding: "1.5rem 1rem",
            borderRight: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {navItems.map((group, idx) => (
              <div key={idx}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#64748b",
                    marginBottom: "0.6rem",
                    paddingLeft: "0.5rem",
                  }}
                >
                  {group.group}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  {group.items.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.65rem",
                          padding: "0.55rem 0.75rem",
                          borderRadius: "0.5rem",
                          border: "none",
                          fontSize: "0.85rem",
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? "#ffffff" : "#94a3b8",
                          backgroundColor: isActive ? "rgba(99, 102, 241, 0.15)" : "transparent",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <span style={{ color: isActive ? "#818cf8" : "#64748b" }}>{item.icon}</span>
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Content Area */}
        <main style={{ flex: 1, minWidth: 0, padding: "2.5rem 3.5rem", lineHeight: "1.6" }}>
          {/* Section: Overview */}
          <section id="overview" style={{ marginBottom: "4rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "9999px",
                background: "rgba(59, 130, 246, 0.12)",
                color: "#60a5fa",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: "1rem",
                border: "1px solid rgba(59, 130, 246, 0.25)",
              }}
            >
              <Sparkles size={14} /> Full-Stack Telemetry System
            </div>
            <h1 style={{ fontSize: "2.75rem", fontWeight: 800, margin: "0 0 1rem 0", letterSpacing: "-0.03em" }}>
              Modern Observability & Live Dashboards
            </h1>
            <p style={{ fontSize: "1.15rem", color: "#94a3b8", maxWidth: "800px", margin: "0 0 2rem 0" }}>
              A developer-first monitoring system for Express and NestJS backends, paired with ready-to-mount React & Next.js admin dashboards. Collect Prometheus metrics, OpenTelemetry distributed traces, and intelligent error fingerprints with zero configuration.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", margin: "2rem 0" }}>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                }}
              >
                <div style={{ color: "#818cf8", marginBottom: "0.75rem" }}><Server size={24} /></div>
                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Backend Core SDK</h3>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "#94a3b8" }}>
                  One-line middleware setup for Express and NestJS. Exposes <code>/metrics</code> for Prometheus and <code>/api/observability/stats</code>.
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                }}
              >
                <div style={{ color: "#38bdf8", marginBottom: "0.75rem" }}><Activity size={24} /></div>
                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>React Dashboard UI</h3>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "#94a3b8" }}>
                  6 pre-built dashboard layouts, 6 runtime color themes, deep error inspector with stack traces and breadcrumb timelines.
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                }}
              >
                <div style={{ color: "#34d399", marginBottom: "0.75rem" }}><Terminal size={24} /></div>
                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Zero-Config CLI</h3>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "#94a3b8" }}>
                  Detects Next.js App/Pages Router and Vite. Installs UI routes and validates backend connectivity with <code>observability doctor</code>.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Quick Start */}
          <section id="quickstart" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>⚡️ Quick Start in 3 Steps</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Step 1 */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "1rem" }}>
                    <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>1</span>
                    Instrument Your Backend
                  </div>
                  <button
                    onClick={() => copyToClipboard("npm install @ideategudy/express-nestjs-observability", "code-step1")}
                    style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem" }}
                  >
                    {copiedCode === "code-step1" ? <Check size={14} color="#10b981" /> : <Copy size={14} />} Copy
                  </button>
                </div>
                <pre style={{ margin: 0, padding: "0.85rem 1rem", backgroundColor: "#020617", borderRadius: "0.5rem", color: "#e2e8f0", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto" }}>
                  npm install @ideategudy/express-nestjs-observability
                </pre>
              </div>

              {/* Step 2 */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "1rem" }}>
                    <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>2</span>
                    Scaffold Frontend Dashboard
                  </div>
                  <button
                    onClick={() => copyToClipboard("npx @ideategudy/observability-cli dashboard", "code-step2")}
                    style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem" }}
                  >
                    {copiedCode === "code-step2" ? <Check size={14} color="#10b981" /> : <Copy size={14} />} Copy
                  </button>
                </div>
                <pre style={{ margin: 0, padding: "0.85rem 1rem", backgroundColor: "#020617", borderRadius: "0.5rem", color: "#e2e8f0", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto" }}>
                  npx @ideategudy/observability-cli dashboard
                </pre>
              </div>

              {/* Step 3 */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>3</span>
                  View Live Protected Route
                </div>
                <p style={{ margin: "0 0 0.75rem 0", color: "#94a3b8", fontSize: "0.9rem" }}>
                  Navigate to your frontend application to inspect live traffic, latencies, and errors in real-time:
                </p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Link
                    href="/admin/observability"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.6rem 1.2rem",
                      borderRadius: "0.5rem",
                      backgroundColor: "#4f46e5",
                      color: "#ffffff",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Open Live /admin/observability <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Express */}
          <section id="express" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>Express Instrumentation</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1.25rem 0" }}>
              Call <code>setupObservability(app)</code> before declaring your routes. This hooks incoming requests, tracks response status codes, formats JSON logs via Winston, and registers endpoints:
            </p>
            <div style={{ position: "relative" }}>
              <pre style={{ margin: 0, padding: "1.25rem", backgroundColor: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", color: "#f8fafc", fontFamily: "monospace", fontSize: "0.875rem", lineHeight: "1.6", overflowX: "auto" }}>
{`import express from "express";
import { setupObservability } from "@ideategudy/express-nestjs-observability/express";
import { addBreadcrumb } from "@ideategudy/express-nestjs-observability";

const app = express();

// Single call enables /metrics, Winston JSON logging & /api/observability/stats
setupObservability(app, {
  serviceName: "billing-service",
  environment: "production",
});

app.get("/api/checkout", (req, res) => {
  addBreadcrumb({ category: "cart", message: "Processing card payment", level: "info" });
  res.json({ status: "success" });
});

// Fallback for non-existent routes (captured as 404 in dashboard)
app.use((req, res) => {
  res.status(404).json({ statusCode: 404, error: "Not Found", message: \`Cannot \${req.method} \${req.url}\` });
});

app.listen(5000, () => console.log("Server listening on port 5000"));`}
              </pre>
            </div>
          </section>

          {/* Section: NestJS */}
          <section id="nestjs" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>NestJS Module Setup</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1.25rem 0" }}>
              Import <code>ObservabilityModule.forRoot()</code> in your root <code>AppModule</code>:
            </p>
            <pre style={{ margin: 0, padding: "1.25rem", backgroundColor: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", color: "#f8fafc", fontFamily: "monospace", fontSize: "0.875rem", lineHeight: "1.6", overflowX: "auto" }}>
{`import { Module } from "@nestjs/common";
import { ObservabilityModule } from "@ideategudy/express-nestjs-observability/nestjs";

@Module({
  imports: [
    ObservabilityModule.forRoot({
      serviceName: "auth-service",
      environment: process.env.NODE_ENV || "production",
    }),
  ],
})
export class AppModule {}`}
            </pre>
          </section>

          {/* Section: UI Dashboard */}
          <section id="ui-dashboard" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>React & Next.js UI Dashboard</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1.25rem 0" }}>
              Render the unified <code>&lt;ObservabilityDashboard /&gt;</code> inside any client component:
            </p>
            <pre style={{ margin: 0, padding: "1.25rem", backgroundColor: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", color: "#f8fafc", fontFamily: "monospace", fontSize: "0.875rem", lineHeight: "1.6", overflowX: "auto" }}>
{`"use client";

import { ObservabilityDashboard } from "@ideategudy/observability-ui";

export default function AdminObservabilityPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#090d16" }}>
      <ObservabilityDashboard
        config={{
          endpoint: "http://localhost:5000/api/observability/stats",
          refreshIntervalMs: 5000,
        }}
        defaultDashboard="full"
        showSwitcher={true}
      />
    </main>
  );
}`}
            </pre>
          </section>

          {/* Section: CLI Tool */}
          <section id="cli-tool" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>Observability CLI Commands</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <h4 style={{ margin: "0 0 0.5rem 0", color: "#38bdf8" }}>Scaffold Dashboard</h4>
                <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.85rem", color: "#94a3b8" }}>
                  Detects project framework and creates an admin observability page.
                </p>
                <code style={{ display: "block", padding: "0.5rem", background: "#020617", borderRadius: "0.375rem", color: "#a5b4fc", fontSize: "0.8rem" }}>
                  npx @ideategudy/observability-cli dashboard
                </code>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <h4 style={{ margin: "0 0 0.5rem 0", color: "#34d399" }}>Environment Doctor</h4>
                <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.85rem", color: "#94a3b8" }}>
                  Verifies dependencies and validates live telemetry endpoint connectivity.
                </p>
                <code style={{ display: "block", padding: "0.5rem", background: "#020617", borderRadius: "0.375rem", color: "#a5b4fc", fontSize: "0.8rem" }}>
                  npx @ideategudy/observability-cli doctor
                </code>
              </div>
            </div>
          </section>

          {/* Section: Security */}
          <section id="security" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>🔒 Production Security & Auth</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1.25rem 0" }}>
              Because live traces and error payloads contain runtime diagnostic context, always protect your dashboard route behind authentication middleware:
            </p>
            <pre style={{ margin: 0, padding: "1.25rem", backgroundColor: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", color: "#f8fafc", fontFamily: "monospace", fontSize: "0.875rem", lineHeight: "1.6", overflowX: "auto" }}>
{`// middleware.ts (Next.js)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/observability")) {
    const adminToken = req.cookies.get("admin_session");
    if (!adminToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}`}
            </pre>
          </section>
        </main>
      </div>
    </div>
  );
}
