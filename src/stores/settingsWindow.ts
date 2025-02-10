import { create } from "zustand";

const InitialState = {
  isOpen: false,
  ignoreToggle: false,
} as const;

interface SettingsWindowState {
  isOpen: boolean;
  ignoreToggle: boolean;
  toggle: () => void;
  setIgnoreToggle: (value: boolean) => void;
}

export const useSettingsWindowStore = create<SettingsWindowState>(
  (set, get) => ({
    ...InitialState,
    toggle: () => {
      if (get().ignoreToggle) {
        return;
      }
      set((state) => ({ isOpen: !state.isOpen }));
    },
    setIgnoreToggle: (value: boolean) => {
      set({ ignoreToggle: value });
    },
  })
);
