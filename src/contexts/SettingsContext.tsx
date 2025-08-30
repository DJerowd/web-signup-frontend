import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";

type Theme = "light" | "dark" | "system";
type FontSize = "small" | "medium" | "large";
type Motion = "normal" | "reduced";

interface SettingsContextType {
  theme: Theme;
  fontSize: FontSize;
  highContrast: boolean;
  motion: Motion;
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
  setHighContrast: (enabled: boolean) => void;
  setMotion: (motion: Motion) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

const fontSizeMap: Record<FontSize, string> = {
  small: "0.875rem",
  medium: "1rem",
  large: "1.125rem",
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "system"
  );
  const [fontSize, setFontSizeState] = useState<FontSize>(
    () => (localStorage.getItem("fontSize") as FontSize) || "medium"
  );
  const [highContrast, setHighContrastState] = useState<boolean>(
    () => localStorage.getItem('highContrast') === 'true'
  );
  const [motion, setMotionState] = useState<Motion>(
    () => (localStorage.getItem('motion') as Motion) || 'normal'
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }

    root.style.setProperty("--font-size-base", fontSizeMap[fontSize]);

    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (motion === 'reduced') {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

  }, [theme, fontSize, highContrast, motion]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
  };

  const setFontSize = (newSize: FontSize) => {
    localStorage.setItem("fontSize", newSize);
    setFontSizeState(newSize);
  };

  const setHighContrast = (enabled: boolean) => {
    localStorage.setItem('highContrast', String(enabled));
    setHighContrastState(enabled);
  };

  const setMotion = (newMotion: Motion) => {
    localStorage.setItem('motion', newMotion);
    setMotionState(newMotion);
  };

  const value = useMemo(
    () => ({ theme, fontSize, highContrast, motion, setTheme, setFontSize, setHighContrast, setMotion }),
    [theme, fontSize, highContrast, motion]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings deve ser usado dentro de um SettingsProvider");
  }
  return context;
};
