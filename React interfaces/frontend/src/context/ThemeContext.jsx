import React, { createContext, useContext, useEffect, useState } from 'react';
import colorThemeService from '../services/colorTheme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDefaultTheme() {
      setLoading(true);
      try {
        const themes = await colorThemeService.getThemes();
        const defaultTheme = themes.find(t => t.is_default) || themes[0] || null;
        setTheme(defaultTheme);
        if (defaultTheme) {
          // Set CSS variables
          Object.entries(defaultTheme).forEach(([key, value]) => {
            if (key.endsWith('_color')) {
              document.documentElement.style.setProperty(`--${key.replace('_', '-')}`, value);
            }
          });
        }
      } catch (e) {
        setTheme(null);
      }
      setLoading(false);
    }
    fetchDefaultTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
