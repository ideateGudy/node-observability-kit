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
    expect(snapshot.windows?.last5m.totalRequests).toBeGreaterThan(0);
    expect(snapshot.http.statusBreakdown.status2xx).toBeGreaterThan(0);
    expect(snapshot.http.topEndpoints.length).toBeGreaterThan(0);
    expect(snapshot.recentErrors?.length).toBeGreaterThan(0);
    expect(snapshot.breadcrumbs?.length).toBeGreaterThan(0);
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

  it("should export all 6 built-in runtime themes with complete color schemes", () => {
    expect(UI.RUNTIME_THEMES).toBeDefined();
    const themeKeys = Object.keys(UI.RUNTIME_THEMES);
    expect(themeKeys).toHaveLength(6);
    expect(themeKeys).toEqual([
      "tokyo-night",
      "nord",
      "dracula",
      "catppuccin",
      "emerald-terminal",
      "cyberpunk",
    ]);

    themeKeys.forEach((key) => {
      const theme = UI.RUNTIME_THEMES[key as UI.RuntimeTheme];
      expect(theme.id).toBe(key);
      expect(theme.name).toBeTruthy();
      expect(theme.description).toBeTruthy();
      expect(theme.accent).toBeTruthy();
      expect(theme.accentSecondary).toBeTruthy();
      expect(theme.background).toBeTruthy();
      expect(theme.cardBg).toBeTruthy();
      expect(theme.cardBorder).toBeTruthy();
      expect(theme.headerBg).toBeTruthy();
      expect(theme.text).toBeTruthy();
      expect(theme.textMuted).toBeTruthy();
      expect(theme.switcherBg).toBeTruthy();
      expect(theme.badgeBg).toBeTruthy();
      expect(theme.badgeBorder).toBeTruthy();
      expect(theme.glow).toBeTruthy();
    });
  });

  it("should have correct curated aesthetics for each of the 6 themes", () => {
    // Tokyo Night
    expect(UI.RUNTIME_THEMES["tokyo-night"].name).toBe("Tokyo Night");
    expect(UI.RUNTIME_THEMES["tokyo-night"].accent).toBe("#7aa2f7");
    expect(UI.RUNTIME_THEMES["tokyo-night"].background).toBe("#1a1b26");

    // Nord
    expect(UI.RUNTIME_THEMES["nord"].name).toBe("Nord");
    expect(UI.RUNTIME_THEMES["nord"].accent).toBe("#88c0d0");
    expect(UI.RUNTIME_THEMES["nord"].background).toBe("#2e3440");

    // Dracula
    expect(UI.RUNTIME_THEMES["dracula"].name).toBe("Dracula");
    expect(UI.RUNTIME_THEMES["dracula"].accent).toBe("#bd93f9");
    expect(UI.RUNTIME_THEMES["dracula"].background).toBe("#282a36");

    // Catppuccin Mocha
    expect(UI.RUNTIME_THEMES["catppuccin"].name).toBe("Catppuccin Mocha");
    expect(UI.RUNTIME_THEMES["catppuccin"].accent).toBe("#cba6f7");
    expect(UI.RUNTIME_THEMES["catppuccin"].background).toBe("#1e1e2e");

    // Emerald Terminal
    expect(UI.RUNTIME_THEMES["emerald-terminal"].name).toBe("Emerald Terminal");
    expect(UI.RUNTIME_THEMES["emerald-terminal"].accent).toBe("#10b981");
    expect(UI.RUNTIME_THEMES["emerald-terminal"].background).toBe("#021d12");

    // Cyberpunk
    expect(UI.RUNTIME_THEMES["cyberpunk"].name).toBe("Cyberpunk");
    expect(UI.RUNTIME_THEMES["cyberpunk"].accent).toBe("#ff007f");
    expect(UI.RUNTIME_THEMES["cyberpunk"].background).toBe("#0d0221");
  });

  it("should provide consistent contrast: background and cardBg are distinct from text", () => {
    Object.values(UI.RUNTIME_THEMES).forEach((t) => {
      // background and text must not be identical
      expect(t.background).not.toBe(t.text);
      expect(t.cardBg).not.toBe(t.text);
      // textMuted must be defined
      expect(t.textMuted).toBeTruthy();
    });
  });

  describe("Redux State Management & LocalStorage Persistence", () => {
    it("should export Redux store primitives and action creators", () => {
      expect(UI.createObservabilityStore).toBeDefined();
      expect(UI.observabilityReducer).toBeDefined();
      expect(UI.setThemeAction).toBeDefined();
      expect(UI.LOCAL_STORAGE_THEME_KEY).toBe("stacklenzz_theme");
      expect(UI.SET_THEME).toBe("stacklenzz/SET_THEME");
    });

    it("should create store with initial theme and process SET_THEME actions correctly", () => {
      const store = UI.createObservabilityStore("nord");
      expect(store.getState().theme).toBe("nord");

      const action = UI.setThemeAction("dracula");
      expect(action).toEqual({
        type: "stacklenzz/SET_THEME",
        payload: "dracula",
      });

      store.dispatch(action);
      expect(store.getState().theme).toBe("dracula");
    });

    it("should notify subscribers when Redux state changes", () => {
      const store = UI.createObservabilityStore("tokyo-night");
      let notifiedTheme = "";

      const unsubscribe = store.subscribe(() => {
        notifiedTheme = store.getState().theme;
      });

      store.dispatch(UI.setThemeAction("cyberpunk"));
      expect(notifiedTheme).toBe("cyberpunk");

      unsubscribe();
      store.dispatch(UI.setThemeAction("emerald-terminal"));
      // Should not notify after unsubscribing
      expect(notifiedTheme).toBe("cyberpunk");
      expect(store.getState().theme).toBe("emerald-terminal");
    });

    it("should persist selected theme to localStorage and retrieve it", () => {
      // Mock window.localStorage
      const mockStorage: Record<string, string> = {};
      const originalWindow = globalThis.window;

      const fakeLocalStorage = {
        getItem: (key: string) => mockStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockStorage[key];
        },
        clear: () => {
          Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
        },
      };

      // Assign to global window
      (globalThis as any).window = {
        localStorage: fakeLocalStorage,
      };

      try {
        // Initial store dispatch
        const store = UI.createObservabilityStore("tokyo-night");
        store.dispatch(UI.setThemeAction("catppuccin"));

        // Verify it was stored in localStorage under stacklenzz_theme
        expect(fakeLocalStorage.getItem("stacklenzz_theme")).toBe("catppuccin");

        // Verify getSavedTheme restores it
        const saved = UI.getSavedTheme();
        expect(saved).toBe("catppuccin");

        // New store initialized without explicit theme should load from localStorage
        const newStore = UI.createObservabilityStore();
        expect(newStore.getState().theme).toBe("catppuccin");
      } finally {
        (globalThis as any).window = originalWindow;
      }
    });

    it("should handle unknown or corrupt localStorage theme values gracefully with fallback", () => {
      const originalWindow = globalThis.window;
      (globalThis as any).window = {
        localStorage: {
          getItem: () => "invalid-corrupted-theme-name",
          setItem: () => {},
        },
      };

      try {
        const saved = UI.getSavedTheme("tokyo-night");
        expect(saved).toBe("tokyo-night");
      } finally {
        (globalThis as any).window = originalWindow;
      }
    });

    it("should propagate theme color schemes dynamically across all 6 themes", () => {
      const themeKeys: UI.RuntimeTheme[] = [
        "tokyo-night",
        "nord",
        "dracula",
        "catppuccin",
        "emerald-terminal",
        "cyberpunk",
      ];

      themeKeys.forEach((themeKey) => {
        const store = UI.createObservabilityStore("tokyo-night");
        store.dispatch(UI.setThemeAction(themeKey));

        const activeTheme = store.getState().theme;
        expect(activeTheme).toBe(themeKey);

        const colors = UI.RUNTIME_THEMES[activeTheme];
        expect(colors.background).toBeTruthy();
        expect(colors.cardBg).toBeTruthy();
        expect(colors.accent).toBeTruthy();
        expect(colors.text).toBeTruthy();
        expect(colors.cardBorder).toBeTruthy();
        expect(colors.textMuted).toBeTruthy();
        expect(colors.switcherBg).toBeTruthy();
      });
    });
  });
});


