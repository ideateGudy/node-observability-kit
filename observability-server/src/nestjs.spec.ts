import "reflect-metadata";
import { describe, it, expect } from "vitest";
import {
  ObservabilityModule,
  ObservabilityController,
  ObservabilityInterceptor,
} from "./nestjs/index.js";

describe("NestJS Observability Module", () => {
  it("should create dynamic module via forRoot", () => {
    const dynamicModule = ObservabilityModule.forRoot({
      autoInitTracing: false,
      serviceName: "test-nest",
    });

    expect(dynamicModule).toBeDefined();
    expect(dynamicModule.controllers).toContain(ObservabilityController);
    expect(dynamicModule.providers).toBeDefined();
  });

  it("should create dynamic module via forRootAsync", () => {
    const asyncModule = ObservabilityModule.forRootAsync({
      useFactory: () => ({
        autoInitTracing: false,
        serviceName: "test-nest-async",
      }),
    });

    expect(asyncModule).toBeDefined();
    expect(asyncModule.controllers).toContain(ObservabilityController);
  });

  it("should register ObservabilityExceptionFilter and ObservabilityInterceptor in providers", async () => {
    const { ObservabilityExceptionFilter } = await import("./nestjs/index.js");
    const module = ObservabilityModule.forRoot({
      serviceName: "filter-test",
      autoInitTracing: false,
    });

    expect(module.providers).toBeDefined();
    expect(module.exports).toContain(ObservabilityInterceptor);
    expect(module.exports).toContain(ObservabilityExceptionFilter);
  });
});
