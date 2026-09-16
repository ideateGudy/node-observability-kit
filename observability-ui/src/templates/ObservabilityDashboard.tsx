import React, { useState } from "react";
import { ObservabilityConfig } from "../types.js";
import {
  DashboardSwitcher,
  DashboardTemplateType,
} from "../components/DashboardSwitcher.js";
import { FullBackendDashboard } from "./FullBackendDashboard.js";
import { ApiOverviewDashboard } from "./ApiOverviewDashboard.js";
import { BackendPerformanceDashboard } from "./BackendPerformanceDashboard.js";
import { ErrorMonitoringDashboard } from "./ErrorMonitoringDashboard.js";
import { NodeRuntimeDashboard } from "./NodeRuntimeDashboard.js";
import { MinimalDashboard } from "./MinimalDashboard.js";

export interface ObservabilityDashboardProps {
  config?: ObservabilityConfig;
  defaultDashboard?: DashboardTemplateType;
  showSwitcher?: boolean;
}

/**
 * Universal Observability Dashboard with an interactive Template Switcher.
 * Allows users to toggle seamlessly between:
 * - Full Suite
 * - API Overview
 * - Performance
 * - Errors & Failures
 * - Node Runtime
 * - Minimal Widget
 */
export function ObservabilityDashboard({
  config,
  defaultDashboard = "full",
  showSwitcher = true,
}: ObservabilityDashboardProps) {
  const [currentDashboard, setCurrentDashboard] =
    useState<DashboardTemplateType>(defaultDashboard);

  const endpoint = config?.endpoint || "http://localhost:5000/api/observability/stats";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#090d16",
        color: "#f8fafc",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      {showSwitcher && (
        <div style={{ padding: "1.25rem 1.5rem 0 1.5rem" }}>
          <DashboardSwitcher
            currentDashboard={currentDashboard}
            onChangeDashboard={setCurrentDashboard}
            endpoint={endpoint}
          />
        </div>
      )}

      {currentDashboard === "full" && <FullBackendDashboard config={config} />}
      {currentDashboard === "api" && <ApiOverviewDashboard config={config} />}
      {currentDashboard === "performance" && (
        <BackendPerformanceDashboard config={config} />
      )}
      {currentDashboard === "errors" && (
        <ErrorMonitoringDashboard config={config} />
      )}
      {currentDashboard === "runtime" && (
        <NodeRuntimeDashboard config={config} />
      )}
      {currentDashboard === "minimal" && (
        <div style={{ padding: "1.5rem", maxWidth: "520px" }}>
          <MinimalDashboard config={config} />
        </div>
      )}
    </div>
  );
}
