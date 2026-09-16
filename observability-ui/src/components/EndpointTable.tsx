import React, { useState } from "react";
import { EndpointMetricSummary } from "../types.js";
import { Search } from "lucide-react";

export interface EndpointTableProps {
  endpoints: EndpointMetricSummary[];
}

export function EndpointTable({ endpoints }: EndpointTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const getMethodBadgeStyle = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return { bg: "rgba(16, 185, 129, 0.15)", text: "#34d399", border: "rgba(16, 185, 129, 0.3)" };
      case "POST":
        return { bg: "rgba(59, 130, 246, 0.15)", text: "#60a5fa", border: "rgba(59, 130, 246, 0.3)" };
      case "PUT":
      case "PATCH":
        return { bg: "rgba(245, 158, 11, 0.15)", text: "#fbbf24", border: "rgba(245, 158, 11, 0.3)" };
      case "DELETE":
        return { bg: "rgba(239, 68, 68, 0.15)", text: "#f87171", border: "rgba(239, 68, 68, 0.3)" };
      default:
        return { bg: "rgba(148, 163, 184, 0.15)", text: "#cbd5e1", border: "rgba(148, 163, 184, 0.3)" };
    }
  };

  const filteredEndpoints = endpoints.filter((ep) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return ep.route.toLowerCase().includes(term) || ep.method.toLowerCase().includes(term);
  });

  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "0.875rem",
        padding: "1.25rem",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#f8fafc", margin: 0 }}>
            Top Endpoints & Performance
          </h3>
          <span style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
            {filteredEndpoints.length} of {endpoints.length} routes
          </span>
        </div>

        {/* Live Filter / Search input */}
        <div style={{ position: "relative", minWidth: "220px" }}>
          <Search size={14} color="#64748b" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Filter endpoint or method..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(30, 41, 59, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "0.5rem",
              padding: "0.4rem 0.75rem 0.4rem 2.2rem",
              fontSize: "0.8125rem",
              color: "#f8fafc",
              outline: "none",
            }}
          />
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8125rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#94a3b8" }}>
              <th style={{ padding: "0.75rem 0.5rem", fontWeight: 500 }}>METHOD</th>
              <th style={{ padding: "0.75rem 0.5rem", fontWeight: 500 }}>ROUTE</th>
              <th style={{ padding: "0.75rem 0.5rem", fontWeight: 500, textAlign: "right" }}>REQUESTS</th>
              <th style={{ padding: "0.75rem 0.5rem", fontWeight: 500, textAlign: "right" }}>AVG DURATION</th>
              <th style={{ padding: "0.75rem 0.5rem", fontWeight: 500, textAlign: "right" }}>P95 DURATION</th>
              <th style={{ padding: "0.75rem 0.5rem", fontWeight: 500, textAlign: "right" }}>ERRORS</th>
            </tr>
          </thead>
          <tbody>
            {filteredEndpoints.map((ep, i) => {
              const badge = getMethodBadgeStyle(ep.method);
              return (
                <tr
                  key={`${ep.method}-${ep.route}-${i}`}
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                    color: "#f1f5f9",
                    transition: "background 0.15s ease",
                  }}
                >
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <span
                      style={{
                        padding: "0.2rem 0.5rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        background: badge.bg,
                        color: badge.text,
                        border: `1px solid ${badge.border}`,
                      }}
                    >
                      {ep.method}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", fontFamily: "monospace", color: "#e2e8f0" }}>
                    {ep.route}
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", textAlign: "right", fontWeight: 600 }}>
                    {ep.requests.toLocaleString()}
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", textAlign: "right", color: ep.avgDurationMs > 200 ? "#fbbf24" : "#cbd5e1" }}>
                    {ep.avgDurationMs} ms
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", textAlign: "right", color: ep.p95DurationMs > 300 ? "#f87171" : "#cbd5e1" }}>
                    {ep.p95DurationMs} ms
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", textAlign: "right" }}>
                    {ep.errorCount > 0 ? (
                      <span style={{ color: "#ef4444", fontWeight: 600 }}>
                        {ep.errorCount.toLocaleString()}
                      </span>
                    ) : (
                      <span style={{ color: "#64748b" }}>0</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {endpoints.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                  No endpoint requests recorded yet. Make some requests to your backend to see activity!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
