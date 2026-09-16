import { Controller, Get, Res, Inject, Optional } from "@nestjs/common";
import { register } from "../core/metrics.js";
import { logger as defaultLogger } from "../core/logger.js";
import { getObservabilitySnapshot } from "../core/snapshot.js";
import { OBSERVABILITY_OPTIONS } from "./interfaces.js";
import type { NestObservabilityOptions } from "./interfaces.js";
import type { Logger } from "winston";

@Controller()
export class ObservabilityController {
  private readonly loggerInstance: Logger;

  constructor(
    @Optional()
    @Inject(OBSERVABILITY_OPTIONS)
    private readonly options: NestObservabilityOptions = {}
  ) {
    this.loggerInstance = options.customLogger || defaultLogger;
  }

  @Get("metrics")
  async getMetrics(@Res() res: any): Promise<void> {
    try {
      res.setHeader("Content-Type", register.contentType);
      const metricsData = await register.metrics();
      res.end(metricsData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.loggerInstance.error("Error generating metrics:", { error: errorMessage });
      res.status(500).end(errorMessage);
    }
  }

  @Get("api/observability/stats")
  async getStats(@Res() res: any): Promise<void> {
    try {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

      const snapshot = await getObservabilitySnapshot(this.options);
      if (typeof res.json === "function") {
        res.json(snapshot);
      } else {
        res.end(JSON.stringify(snapshot));
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.loggerInstance.error("Error generating stats snapshot:", { error: errorMessage });
      res.status(500).end(JSON.stringify({ error: errorMessage }));
    }
  }
}
