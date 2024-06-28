import { createContext, ReactNode, useState } from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};













const defaultState: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultState);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getDefaultTheme = () => {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDarkScheme ? "dark" : "light";
  };
  const [theme, setTheme] = useState<string>(getDefaultTheme());

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const providerValues: ThemeContextType = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={providerValues}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
