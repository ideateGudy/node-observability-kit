import React from "react";
import { ObservabilityProvider, useObservability } from "../context.js";
import { MetricCard, MetricGrid } from "../components/MetricCard.js";
import { ObservabilityConfig } from "../types.js";
import { Activity, AlertTriangle, Clock, Zap } from "lucide-react";

export interface MinimalDashboardProps {
  config?: ObservabilityConfig;
}

function MinimalContent() {
  const { snapshot, themeColors } = useObservability();
  if (!snapshot) return null;
  const s = snapshot;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        background: "transparent",
        color: themeColors ? themeColors.text : "#f8fafc",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      <MetricGrid>
        <MetricCard
          title="Requests"
          value={s.summary.totalRequests.toLocaleString()}
          subtitle={`${s.summary.activeRequests} in-flight`}
          icon={<Activity size={16} color="#38bdf8" />}
          statusColor="blue"
        />
        <MetricCard
          title="Error Rate"
          value={`${s.summary.errorRate}%`}
          subtitle="Failures"
          icon={<AlertTriangle size={16} color={s.summary.errorRate > 1 ? "#ef4444" : "#10b981"} />}
          statusColor={s.summary.errorRate > 1 ? "rose" : "emerald"}
        />
        <MetricCard
          title="P95 Latency"
          value={`${s.summary.p95LatencyMs} ms`}
          subtitle={`Avg: ${s.summary.avgLatencyMs}ms`}
          icon={<Clock size={16} color="#a855f7" />}
          statusColor="indigo"
        />
        <MetricCard
          title="CPU"
          value={`${s.runtime.cpuPercent}%`}
          subtitle={`RAM: ${s.runtime.memoryRssMb}MB`}
          icon={<Zap size={16} color="#f59e0b" />}
          statusColor="amber"
        />
      </MetricGrid>
    </div>
  );
}

export function MinimalDashboard({ config }: MinimalDashboardProps) {
  return (
    <ObservabilityProvider config={config}>
      <MinimalContent />
    </ObservabilityProvider>
  );
}
