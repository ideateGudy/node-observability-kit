"use client";

import { useState, useEffect } from "react";
import { ObservabilityDashboard } from "@ideategudy/observability-ui";

/**
 * Next.js Admin Observability Page
 * Location: app/admin/observability/page.tsx
 *
 * Uses the built-in ObservabilityDashboard component from @ideategudy/observability-ui
 * which includes the interactive Template Switcher to toggle between:
 * - Full Suite
 * - API Overview
 * - Performance
 * - Errors & Failures
 * - Node Runtime
 * - Minimal Widget
 */
export default function AdminObservabilityPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#090d16" }}>
        <div style={{ padding: "2rem", color: "#64748b", fontFamily: "sans-serif" }}>
          Loading Observability Console...
        </div>
      </main>
    );
  }

  const config = {
    endpoint: process.env.NEXT_PUBLIC_OBSERVABILITY_URL || "http://localhost:5000/api/observability/stats",
    refreshIntervalMs: 5000,
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#090d16" }}>
      <ObservabilityDashboard
        config={config}
        defaultDashboard="full"
        showSwitcher={true}
      />
    </main>
  );
}
