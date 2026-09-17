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
        background: themeColors?.headerBg || "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)",
        borderColor: themeColors?.cardBorder || "rgba(255, 255, 255, 0.1)",
      }}
      className="flex flex-col gap-4 p-5 sm:p-6 rounded-3xl border backdrop-blur-xl shadow-2xl mb-6 w-full transition-all duration-300 hover:border-white/20"
    >
      {/* Top Hero Section: Server Icon, Title, Env & Refresh Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-white/10 w-full">
        <div className="flex items-center gap-3 min-w-0">
          <div
            style={{
              background: `linear-gradient(135deg, ${themeColors?.accent || "#3b82f6"} 0%, ${themeColors?.accentSecondary || "#06b6d4"} 100%)`,
              boxShadow: `0 0 24px -2px ${themeColors?.glow || "rgba(59, 130, 246, 0.6)"}`,
            }}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg"
          >
            <Server size={24} />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1
                style={{ color: themeColors?.text || "#f8fafc" }}
                className="text-lg sm:text-2xl font-black tracking-tight m-0 truncate"
              >
                {serviceName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 shrink-0">
                Env: <strong className="text-white capitalize">{env}</strong>
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono mt-0.5">
              Synced at <strong className="text-slate-200">{timestamp}</strong>
            </span>
          </div>
        </div>

        {/* Refresh Action */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/35 border border-indigo-500/35 text-indigo-200 text-xs font-bold cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/10 active:scale-95 disabled:opacity-50 w-full sm:w-auto shrink-0"
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin text-indigo-400" : "text-indigo-400"} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Bottom Compact Toolbar: Status Badges, Uptime & Node Version */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-medium w-full">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            HEALTHY
          </span>

          {isMock && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider shadow-sm">
              DEMO / MOCK MODE
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
            <Clock size={14} className="text-emerald-400" />
            <span>Uptime: <strong className="text-emerald-400 font-mono">{uptime}</strong></span>
          </span>
          <span className="bg-white/5 px-3 py-1 rounded-lg border border-white/5">
            Node <strong className="text-indigo-300 font-mono">{snapshot?.runtime.nodeVersion || "v20"}</strong>
          </span>
        </div>
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
