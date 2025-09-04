import React, { createContext, useContext, useEffect, useState } from 'react';
import typographyService from '../services/typography';

export const TypographyContext = createContext();

export function TypographyProvider({ children }) {
  const [typography, setTypography] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDefaultTypography = async () => {
    setLoading(true);
    try {
      const themes = await typographyService.getThemes();
      const defaultTheme = themes.find(t => t.is_default) || themes[0] || null;
      setTypography(defaultTheme);
      if (defaultTheme) {
        // Set CSS variables for fonts
        if (defaultTheme.heading_font_family) {
          document.documentElement.style.setProperty('--heading-font', defaultTheme.heading_font_family);
        }
        if (defaultTheme.body_font_family) {
          document.documentElement.style.setProperty('--body-font', defaultTheme.body_font_family);
        }
      }
    } catch (e) {
      setTypography(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDefaultTypography();
  }, []);

  return (
    <TypographyContext.Provider value={{ typography, loading, reloadTypography: fetchDefaultTypography }}>
      {children}
    </TypographyContext.Provider>
  );
}

export function useTypography() {
  return useContext(TypographyContext);
}
