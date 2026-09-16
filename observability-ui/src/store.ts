import { RuntimeTheme, RUNTIME_THEMES } from "./themes.js";

export const LOCAL_STORAGE_THEME_KEY = "stacklenzz_theme";

export interface ObservabilityState {
  theme: RuntimeTheme;
}

// Action Types
export const SET_THEME = "stacklenzz/SET_THEME" as const;

export interface SetThemeAction {
  type: typeof SET_THEME;
  payload: RuntimeTheme;
}

export type ObservabilityAction = SetThemeAction;

// Action Creators
export function setThemeAction(theme: RuntimeTheme): SetThemeAction {
  return {
    type: SET_THEME,
    payload: theme,
  };
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

/**
 * Reducer for Observability state.
 */
export function observabilityReducer(
  state: ObservabilityState = { theme: "tokyo-night" },
  action: ObservabilityAction
): ObservabilityState {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}

export type Listener = () => void;
export type Unsubscribe = () => void;

export interface ObservabilityStore {
  getState: () => ObservabilityState;
  dispatch: (action: ObservabilityAction) => ObservabilityAction;
  subscribe: (listener: Listener) => Unsubscribe;
}

/**
 * Create a Redux-compliant store for Stacklenzz UI state
 * with automatic localStorage persistence.
 */
export function createObservabilityStore(
  initialTheme?: RuntimeTheme
): ObservabilityStore {
  const initialResolvedTheme =
    initialTheme && initialTheme in RUNTIME_THEMES
      ? initialTheme
      : getSavedTheme("tokyo-night");

  let currentState: ObservabilityState = {
    theme: initialResolvedTheme,
  };

  const listeners = new Set<Listener>();

  function getState(): ObservabilityState {
    return currentState;
  }

  function dispatch(action: ObservabilityAction): ObservabilityAction {
    const nextState = observabilityReducer(currentState, action);
    if (nextState !== currentState) {
      currentState = nextState;
      if (action.type === SET_THEME) {
        persistTheme(nextState.theme);
      }
      listeners.forEach((listener) => {
        try {
          listener();
        } catch (err) {
          console.error("Error in Redux store subscriber:", err);
        }
      });
    }
    return action;
  }

  function subscribe(listener: Listener): Unsubscribe {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

// Global default singleton store
let defaultStore: ObservabilityStore | null = null;

export function getDefaultObservabilityStore(initialTheme?: RuntimeTheme): ObservabilityStore {
  if (!defaultStore) {
    defaultStore = createObservabilityStore(initialTheme);
  }
  return defaultStore;
}
