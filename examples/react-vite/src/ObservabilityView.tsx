import React, { useState, useEffect } from "react";
import { ObservabilityDashboard } from "@stacklenzz/ui";

/**
 * ObservabilityView with Universal Dashboard Switcher
 *
 * Allows instant live toggling between all 6 dashboard templates:
 * 1. Full Suite
 * 2. API Overview
 * 3. Performance
 * 4. Errors & Failures
 * 5. Node Runtime
 * 6. Minimal Widget
 */
export function ObservabilityView() {
  const config = {
    endpoint:
      import.meta.env.VITE_OBSERVABILITY_URL ||
      "http://localhost:5000/api/observability/stats",
    refreshIntervalMs: 5000,
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#090d16" }}>
      <ObservabilityDashboard
        config={config}
        defaultDashboard="full"
        showSwitcher={true}
      />
    </div>
  );
}
