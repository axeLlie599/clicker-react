import { create } from "zustand";

const THEME_KEY = "app-theme";

type Theme = "light" | "dark" | "system";

export enum Themes {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

interface ThemeState {
  theme: Theme;
  isGlobal: boolean;
  setTheme: (newTheme: Theme) => void;
  setIsGlobal: (isGlobal: boolean) => void;
}

const getSystemTheme = (): Theme => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? Themes.DARK
    : Themes.LIGHT;
};

const getStoredTheme = (): Theme => {
  return (localStorage.getItem(THEME_KEY) as Theme) || Themes.SYSTEM;
};

const applyTheme = (theme: Theme, isGlobal: boolean) => {
  if (isGlobal) {
    document.documentElement.classList.toggle("dark", theme === Themes.DARK);
  } else {
    // You can apply it to any specific element, or even skip this if you want no global application
    document.body.classList.toggle("dark", theme === Themes.DARK);
  }
};

const useThemeStore = create<ThemeState>((set) => {
  const initialTheme: Theme = getStoredTheme();
  const resolvedTheme: Theme =
    initialTheme === Themes.SYSTEM ? getSystemTheme() : initialTheme;
  const isGlobal = true; // Default to global, you can customize as needed
  applyTheme(resolvedTheme, isGlobal);

  return {
    theme: initialTheme,
    isGlobal,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(THEME_KEY, newTheme);
      const resolvedTheme =
        newTheme === Themes.SYSTEM ? getSystemTheme() : newTheme;
      applyTheme(resolvedTheme, isGlobal);
      set({ theme: newTheme });
    },
    setIsGlobal: (isGlobal: boolean) => {
      set({ isGlobal });
      const resolvedTheme =
        getStoredTheme() === Themes.SYSTEM
          ? getSystemTheme()
          : getStoredTheme();
      applyTheme(resolvedTheme, isGlobal);
    },
  };
});

// Listen for system theme changes
if (window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const theme = useThemeStore.getState().theme;
      const isGlobal = useThemeStore.getState().isGlobal;
      if (theme === Themes.SYSTEM) {
        applyTheme(getSystemTheme(), isGlobal);
      }
    });
}

export default useThemeStore;
