import { describe, it, expect } from "vitest";
import { generateMockSnapshot } from "../src/mock.js";
import { DASHBOARD_TEMPLATES } from "../src/components/DashboardSwitcher.js";
import * as UI from "../src/index.js";

describe("Observability UI Components & Templates Test Suite", () => {
  it("should generate a complete and valid mock snapshot with all required fields", () => {
    const snapshot = generateMockSnapshot("mock-test-service");

    expect(snapshot.service.name).toBe("mock-test-service");
    expect(snapshot.service.environment).toBe("production");
    expect(snapshot.summary.totalRequests).toBeGreaterThan(0);
    expect(snapshot.summary.p95LatencyMs).toBeGreaterThan(0);
    expect(snapshot.windows).toBeDefined();
    expect(snapshot.windows.last5m.totalRequests).toBeGreaterThan(0);
    expect(snapshot.http.statusBreakdown.status2xx).toBeGreaterThan(0);
    expect(snapshot.http.topEndpoints.length).toBeGreaterThan(0);
    expect(snapshot.recentErrors.length).toBeGreaterThan(0);
    expect(snapshot.breadcrumbs.length).toBeGreaterThan(0);
  });

  it("should export all 6 dashboard templates and the universal template", () => {
    expect(UI.ObservabilityDashboard).toBeDefined();
    expect(UI.FullBackendDashboard).toBeDefined();
    expect(UI.ApiOverviewDashboard).toBeDefined();
    expect(UI.BackendPerformanceDashboard).toBeDefined();
    expect(UI.ErrorMonitoringDashboard).toBeDefined();
    expect(UI.NodeRuntimeDashboard).toBeDefined();
    expect(UI.MinimalDashboard).toBeDefined();
  });

  it("should export all core components", () => {
    expect(UI.MetricCard).toBeDefined();
    expect(UI.MetricGrid).toBeDefined();
    expect(UI.ServiceHeader).toBeDefined();
    expect(UI.HttpStatusChart).toBeDefined();
    expect(UI.LatencyGauge).toBeDefined();
    expect(UI.EndpointTable).toBeDefined();
    expect(UI.RuntimeMetrics).toBeDefined();
    expect(UI.ErrorInspector).toBeDefined();
    expect(UI.DashboardSwitcher).toBeDefined();
  });

  it("should include all 6 templates in DASHBOARD_TEMPLATES with valid metadata", () => {
    expect(DASHBOARD_TEMPLATES.length).toBe(6);
    const templateIds = DASHBOARD_TEMPLATES.map((t) => t.id);
    expect(templateIds).toContain("full");
    expect(templateIds).toContain("api");
    expect(templateIds).toContain("performance");
    expect(templateIds).toContain("errors");
    expect(templateIds).toContain("runtime");
    expect(templateIds).toContain("minimal");

    DASHBOARD_TEMPLATES.forEach((tmpl) => {
      expect(tmpl.label).toBeTruthy();
      expect(tmpl.shortDesc).toBeTruthy();
      expect(tmpl.icon).toBeTruthy();
    });
  });
});
