import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "core/index": "src/core/index.ts",
    "express/index": "src/express/index.ts",
    "nestjs/index": "src/nestjs/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "express",
    "@nestjs/common",
    "@nestjs/core",
    "rxjs",
    "reflect-metadata",
    "prom-client",
    "winston",
    "@opentelemetry/api",
    "@opentelemetry/sdk-node",
    "@opentelemetry/resources",
    "@opentelemetry/semantic-conventions",
    "@opentelemetry/exporter-trace-otlp-http",
    "@opentelemetry/auto-instrumentations-node",
  ],
});
