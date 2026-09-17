import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    "core/index": "src/core/index.ts",
    "config/index": "src/core/config.ts",
    "express/index": "src/express/index.ts",
    "nestjs/index": "src/nestjs/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  deps: {
    neverBundle: [
      "express",
      "@nestjs/common",
      "@nestjs/core",
      "rxjs",
      "reflect-metadata",
      "@prometheus-io/client",
      "winston",
      "@opentelemetry/api",
      "@opentelemetry/sdk-node",
      "@opentelemetry/resources",
      "@opentelemetry/semantic-conventions",
      "@opentelemetry/exporter-trace-otlp-http",
      "@opentelemetry/auto-instrumentations-node",
    ],
  },
});
