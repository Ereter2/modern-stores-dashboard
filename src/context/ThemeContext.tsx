
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
    
    // Update colors based on theme
    if (theme === "light") {
      document.documentElement.style.setProperty('--foreground', '224 47% 11%');
      document.documentElement.style.setProperty('--muted-foreground', '224 30% 25%');
    } else {
      document.documentElement.style.setProperty('--foreground', '210 20% 98%');
      document.documentElement.style.setProperty('--muted-foreground', '224 40% 80%');
    }
    
    console.log(`Theme switched to: ${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
