import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RuntimeTheme, RUNTIME_THEMES } from "./themes.js";

export const LOCAL_STORAGE_THEME_KEY = "stacklenzz_theme";

export interface ObservabilityState {
  theme: RuntimeTheme;
}

/**
 * Safely retrieve initial theme from localStorage if in browser environment.
 */
export function getSavedTheme(fallback: RuntimeTheme = "tokyo-night"): RuntimeTheme {
  if (typeof window === "undefined" || !window.localStorage) {
    return fallback;
  }
  try {
    const saved = window.localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (saved && saved in RUNTIME_THEMES) {
      return saved as RuntimeTheme;
    }
  } catch {
    // Ignore localStorage access errors (e.g. sandboxed iframes)
  }
  return fallback;
}

/**
 * Safely save theme to localStorage if in browser environment.
 */
export function persistTheme(theme: RuntimeTheme): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  } catch {
    // Ignore localStorage write errors
  }
}

const initialState: ObservabilityState = {
  theme: getSavedTheme("tokyo-night"),
};

/**
 * Redux Toolkit Slice for Observability Theme State
 */
export const themeSlice = createSlice({
  name: "observability",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<RuntimeTheme>) => {
      if (action.payload in RUNTIME_THEMES) {
        state.theme = action.payload;
        persistTheme(action.payload);
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;

// Compatibility aliases
export const setThemeAction = (theme: RuntimeTheme) => setTheme(theme);
export const SET_THEME = themeSlice.actions.setTheme.type;

export function observabilityReducer(
  state: ObservabilityState | undefined,
  action: any
): ObservabilityState {
  return themeSlice.reducer(state, action);
}

/**
 * Create a Redux Toolkit Store configured with observability slice and localStorage persistence
 */
export function createObservabilityStore(initialTheme?: RuntimeTheme) {
  const resolvedInitialTheme =
    initialTheme && initialTheme in RUNTIME_THEMES
      ? initialTheme
      : getSavedTheme("tokyo-night");

  const store = configureStore({
    reducer: {
      observability: themeSlice.reducer,
    },
    preloadedState: {
      observability: {
        theme: resolvedInitialTheme,
      },
    },
  });

  store.subscribe(() => {
    const state = store.getState();
    persistTheme(state.observability.theme);
  });

  return store;
}

export type ObservabilityStore = ReturnType<typeof createObservabilityStore>;
export type RootState = ReturnType<ObservabilityStore["getState"]>;
export type AppDispatch = ObservabilityStore["dispatch"];

// Singleton default store
let defaultStore: ObservabilityStore | null = null;

export function getDefaultObservabilityStore(initialTheme?: RuntimeTheme): ObservabilityStore {
  if (!defaultStore) {
    defaultStore = createObservabilityStore(initialTheme);
  }
  return defaultStore;
}
