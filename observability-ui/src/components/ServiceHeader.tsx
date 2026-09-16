import React from "react";
import { RefreshCw, Server, ShieldCheck, Clock } from "lucide-react";
import { ObservabilitySnapshot } from "../types.js";
import { useObservability } from "../context.js";

export interface ServiceHeaderProps {
  snapshot: ObservabilitySnapshot | null;
  onRefresh: () => void;
  isRefreshing?: boolean;
  isMock?: boolean;
}

export function ServiceHeader({
  snapshot,
  onRefresh,
  isRefreshing = false,
  isMock = false,
}: ServiceHeaderProps) {
  const { themeColors } = useObservability();
  const serviceName = snapshot?.service.name || "backend-service";
  const env = snapshot?.service.environment || "development";
  const uptime = snapshot?.service.uptimeSeconds
    ? formatUptime(snapshot.service.uptimeSeconds)
    : "0s";
  const timestamp = snapshot?.service.timestamp
    ? new Date(snapshot.service.timestamp).toLocaleTimeString()
    : "--:--:--";

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1.25rem 1.5rem",
        background: themeColors?.headerBg || "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%)",
        border: `1px solid ${themeColors?.cardBorder || "rgba(255, 255, 255, 0.08)"}`,
        borderRadius: "1rem",
        marginBottom: "1.5rem",
        backdropFilter: "blur(16px)",
        boxShadow: `0 4px 20px -5px rgba(0, 0, 0, 0.4)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          style={{
            width: "2.75rem",
            height: "2.75rem",
            borderRadius: "0.75rem",
            background: `linear-gradient(135deg, ${themeColors?.accent || "#3b82f6"} 0%, ${themeColors?.accentSecondary || "#06b6d4"} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: `0 0 20px -4px ${themeColors?.glow || "rgba(59, 130, 246, 0.5)"}`,
          }}
        >
          <Server size={22} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
              {serviceName}
            </h1>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "0.15rem 0.6rem",
                borderRadius: "9999px",
                background: "rgba(16, 185, 129, 0.15)",
                color: "#34d399",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span
                style={{
                  width: "0.375rem",
                  height: "0.375rem",
                  borderRadius: "9999px",
                  backgroundColor: "#10b981",
                  display: "inline-block",
                }}
              />
              HEALTHY
            </span>
            {isMock && (
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "0.15rem 0.6rem",
                  borderRadius: "9999px",
                  background: "rgba(245, 158, 11, 0.15)",
                  color: "#fbbf24",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                }}
              >
                DEMO / MOCK MODE
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.25rem", fontSize: "0.8125rem", color: "#94a3b8" }}>
            <span>Env: <strong style={{ color: "#cbd5e1" }}>{env}</strong></span>
            <span>•</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              <Clock size={13} /> Uptime: {uptime}
            </span>
            <span>•</span>
            <span>Node {snapshot?.runtime.nodeVersion || "v20"}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>
          Synced at {timestamp}
        </span>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 0.875rem",
            borderRadius: "0.5rem",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#f1f5f9",
            fontSize: "0.8125rem",
            fontWeight: 500,
            cursor: isRefreshing ? "not-allowed" : "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>
    </div>
  );
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m ${seconds % 60}s`;
}
