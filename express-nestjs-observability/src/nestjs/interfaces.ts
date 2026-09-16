import { ObservabilityConfig } from "../core/config.js";
import type { ModuleMetadata, Type } from "@nestjs/common";
import type { Logger } from "winston";

export const OBSERVABILITY_OPTIONS = "OBSERVABILITY_OPTIONS";

export interface NestObservabilityOptions extends Partial<ObservabilityConfig> {
  /**
   * Path where Prometheus metrics will be exposed. Defaults to 'metrics'.
   */
  metricsPath?: string;

  /**
   * Path where JSON telemetry snapshots for dashboard UI will be exposed.
   * Defaults to 'api/observability/stats'. Set to false to disable.
   */
  statsPath?: string | false;

  /**
   * Whether to auto-initialize OpenTelemetry tracing SDK. Defaults to true.
   */
  autoInitTracing?: boolean;

  /**
   * Custom Winston logger instance.
   */
  customLogger?: Logger;

  /**
   * Custom predicate to determine whether a given request should be ignored.
   */
  shouldIgnoreRoute?: (req: any) => boolean;
}

export interface ObservabilityOptionsFactory {
  createObservabilityOptions(): Promise<NestObservabilityOptions> | NestObservabilityOptions;
}

export interface ObservabilityAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<ObservabilityOptionsFactory>;
  useClass?: Type<ObservabilityOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<NestObservabilityOptions> | NestObservabilityOptions;
  inject?: any[];
}
