import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ObservabilitySnapshot, ObservabilityConfig } from "./types.js";
import { generateMockSnapshot } from "./mock.js";

interface ObservabilityContextValue {
  snapshot: ObservabilitySnapshot | null;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
  isMock: boolean;
}

const ObservabilityContext = createContext<ObservabilityContextValue | null>(null);

export interface ObservabilityProviderProps {
  children: React.ReactNode;
  config?: ObservabilityConfig;
  initialSnapshot?: ObservabilitySnapshot;
}

export function ObservabilityProvider({
  children,
  config = {},
  initialSnapshot,
}: ObservabilityProviderProps) {
  const [snapshot, setSnapshot] = useState<ObservabilitySnapshot | null>(
    initialSnapshot || null
  );
  const [isLoading, setIsLoading] = useState<boolean>(!initialSnapshot);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(
    initialSnapshot ? new Date() : null
  );

  const endpoint = config.endpoint || "/api/observability/stats";
  const refreshIntervalMs = config.refreshIntervalMs ?? 5000;
  const isMock = config.mockMode ?? false;

  const fetchTelemetry = useCallback(async () => {
    if (isMock) {
      setSnapshot(generateMockSnapshot());
      setLastUpdated(new Date());
      setIsLoading(false);
      setError(null);
      return;
    }

    try {
      const headers: Record<string, string> = {
        Accept: "application/json",
      };
      if (config.token) {
        headers["Authorization"] = `Bearer ${config.token}`;
      }

      const res = await fetch(endpoint, { headers });
      if (!res.ok) {
        throw new Error(`Failed to fetch backend telemetry: HTTP ${res.status}`);
      }

      const data: ObservabilitySnapshot = await res.json();
      setSnapshot(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, isMock, config.token]);

  useEffect(() => {
    fetchTelemetry();

    if (refreshIntervalMs > 0) {
      const interval = setInterval(fetchTelemetry, refreshIntervalMs);
      return () => clearInterval(interval);
    }
  }, [fetchTelemetry, refreshIntervalMs]);

  return (
    <ObservabilityContext.Provider
      value={{
        snapshot,
        isLoading,
        error,
        lastUpdated,
        refresh: fetchTelemetry,
        isMock,
      }}
    >
      {children}
    </ObservabilityContext.Provider>
  );
}

export function useObservability(): ObservabilityContextValue {
  const context = useContext(ObservabilityContext);
  if (!context) {
    throw new Error(
      "useObservability must be used within an <ObservabilityProvider>"
    );
  }
  return context;
}
