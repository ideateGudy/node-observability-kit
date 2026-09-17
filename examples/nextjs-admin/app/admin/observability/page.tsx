"use client";

import { useState, useEffect } from "react";
import { ObservabilityDashboard } from "@stacklenzz/ui";

/**
 * Next.js Admin Observability Page
 * Location: app/admin/observability/page.tsx
 *
 * Uses the built-in ObservabilityDashboard component from @stacklenzz/ui
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
      <main className="min-h-screen bg-background">
        <div className="p-8 text-slate-500 font-sans">
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
    <main className="min-h-screen bg-transparent">
      <div className="flex justify-between items-center px-6 py-2 bg-slate-900/80 border-b border-white/10 text-sm">
        <div className="text-slate-400 flex items-center gap-2">
          <span>Live Demo Console</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-500 font-semibold">Connected</span>
        </div>
        <a
          href="/docs"
          className="text-indigo-400 no-underline font-semibold flex items-center gap-1"
        >
          ← Back to Documentation
        </a>
      </div>
      <ObservabilityDashboard
        config={config}
        defaultDashboard="full"
        showSwitcher={true}
      />
    </main>
  );
}
