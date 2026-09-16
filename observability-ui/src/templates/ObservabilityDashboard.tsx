import React, { useState } from "react";
import { ObservabilityConfig } from "../types.js";
import { ObservabilityProvider, useObservability } from "../context.js";
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

function ObservabilityDashboardInner({
  config,
  defaultDashboard = "full",
  showSwitcher = true,
}: ObservabilityDashboardProps) {
  const [currentDashboard, setCurrentDashboard] =
    useState<DashboardTemplateType>(defaultDashboard);
  const { themeColors } = useObservability();

  const endpoint = config?.endpoint || "http://localhost:5000/api/observability/stats";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: themeColors.background,
        color: themeColors.text,
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        transition: "background-color 0.25s ease, color 0.25s ease",
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

/**
 * Universal Observability Dashboard with an interactive Template Switcher
 * and dynamic 6 Built-in Runtime Theme Switcher (Tokyo Night, Nord, Dracula, Catppuccin, Emerald, Cyberpunk).
 */
export function ObservabilityDashboard(props: ObservabilityDashboardProps) {
  return (
    <ObservabilityProvider config={props.config}>
      <ObservabilityDashboardInner {...props} />
    </ObservabilityProvider>
  );
}

