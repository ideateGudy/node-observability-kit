import type { Request, Response, RequestHandler } from "express";
import { register } from "../core/metrics.js";
import { logger as defaultLogger } from "../core/logger.js";
import { getObservabilitySnapshot } from "../core/snapshot.js";
import type { ObservabilityConfig } from "../core/config.js";
import type { Logger } from "winston";

export interface MetricsHandlerOptions {
  customLogger?: Logger;
}

export interface StatsHandlerOptions {
  customLogger?: Logger;
  configOverrides?: Partial<ObservabilityConfig>;
}

/**
 * Creates an Express route handler that serves Prometheus metrics.
 */
export function createMetricsHandler(options: MetricsHandlerOptions = {}): RequestHandler {
  const loggerInstance = options.customLogger || defaultLogger;

  return async (_req: Request, res: Response): Promise<void> => {
    try {
      res.set("Content-Type", register.contentType);
      const metricsData = await register.metrics();
      res.end(metricsData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      loggerInstance.error("Error generating metrics:", { error: errorMessage });
      res.status(500).end(errorMessage);
    }
  };
}

/**
 * Creates an Express route handler that serves live JSON telemetry snapshots for the UI dashboard.
 */
export function createStatsHandler(options: StatsHandlerOptions = {}): RequestHandler {
  const loggerInstance = options.customLogger || defaultLogger;

  return async (_req: Request, res: Response): Promise<void> => {
    try {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      
      const snapshot = await getObservabilitySnapshot(options.configOverrides);
      res.json(snapshot);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      loggerInstance.error("Error generating observability snapshot:", { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  };
}
