/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const LOCAL_STORAGE_KEY = "appState";

const InitialState = {
  preferences: {
    features: {
      confetti_enabled: false,
    },
  },
  enableLocalStorage: true,
} as const;

type Preferences = typeof InitialState.preferences;

interface AppState {
  preferences: Preferences;
  enableLocalStorage: boolean;

  getPreference<T>(...path: string[]): T | undefined;
  newPreference<T>(...pathAndValue: [...string[], T]): void;
  updatePreference<T>(...pathAndValue: [...string[], T]): void;
  toggleLocalStorage: () => void;
}

const saveStateToLocalStorage = (state: AppState) => {
  if (state.enableLocalStorage) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }
};

const loadStateFromLocalStorage = (): Partial<AppState> => {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedState ? JSON.parse(storedState) : {};
};

const useAppStore = create<AppState>((set, get) => {
  const loadedState = loadStateFromLocalStorage();

  return {
    ...InitialState,
    ...loadedState,
    getPreference<T>(...path: string[]): T | undefined {
      let current: any = get().preferences;
      for (const key of path) {
        if (current && typeof current === "object" && key in current) {
          current = current[key];
        } else {
          return undefined;
        }
      }
      return current as T | undefined;
    },
    newPreference<T>(...pathAndValue: [...string[], T]): void {
      const value = pathAndValue.pop() as T;
      const path = pathAndValue as string[];

      set((state) => {
        let current: any = state.preferences;
        for (let i = 0; i < path.length - 1; i++) {
          const key = path[i];
          if (!current[key]) {
            current[key] = {};
          }
          current = current[key];
        }
        current[path[path.length - 1]] = value;

        const newState = {
          ...state,
          preferences: {
            ...state.preferences,
          },
        };
        saveStateToLocalStorage(newState);

        return newState;
      });
    },
    updatePreference<T>(...pathAndValue: [...string[], T]): void {
      const value = pathAndValue.pop() as T;
      const path = pathAndValue as string[];

      set((state) => {
        let current: any = state.preferences;
        for (let i = 0; i < path.length - 1; i++) {
          const key = path[i];
          if (current && typeof current === "object" && key in current) {
            current = current[key];
          } else {
            console.warn(`Path ${path.slice(0, i + 1).join(".")} not found.`);
            return state; // Path not found, return original state
          }
        }

        if (
          current &&
          typeof current === "object" &&
          path[path.length - 1] in current
        ) {
          current[path[path.length - 1]] = value;
        } else {
          console.warn(
            `Key ${path[path.length - 1]} not found in path ${path.slice(0, path.length - 1).join(".")}.`
          );
          return state;
        }

        const newState = {
          ...state,
          preferences: {
            ...state.preferences,
          },
        };
        saveStateToLocalStorage(newState);
        return newState;
      });
    },
    toggleLocalStorage: () => {
      set((state) => {
        const newState = {
          ...state,
          enableLocalStorage: !state.enableLocalStorage,
        };
        saveStateToLocalStorage(newState);
        return newState;
      });
    },
  };
});

// Initialize localStorage with initial state only if it's empty.
if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(InitialState));
}

// Observe localStorage changes
window.addEventListener("storage", (event) => {
  if (event.key === LOCAL_STORAGE_KEY) {
    try {
      const newState = JSON.parse(event.newValue || "{}");

      // Update Zustand store only if enableLocalStorage is true and if the new state is different from the current state
      useAppStore.setState((state) => {
        if (!newState.enableLocalStorage) {
          return state; // Do not update if enableLocalStorage is false
        }
        if (JSON.stringify(state) !== JSON.stringify(newState)) {
          return newState;
        }
        return state; // Return the current state if it's the same as the new state to avoid unnecessary updates.
      });
    } catch (error) {
      console.error("Error parsing localStorage value:", error);
    }
  }
});

export default useAppStore;
