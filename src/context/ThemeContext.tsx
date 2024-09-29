import { DARK_THEME_CLASS } from '@/constants';
import { LocalStorage } from '@/types/LocalStorage';
import { Theme } from '@/types/Theme';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

type ThemeMethods = {
  toggleTheme: () => void;
  isDarkTheme: boolean;
};

export const ThemeContext = createContext<Theme>(Theme.light);
export const ThemeMethodsContext = createContext<ThemeMethods>({
  toggleTheme: () => {},
  isDarkTheme: false,
});

type Props = {
  children: ReactNode;
};

const getInitialThemeState = (): Theme => {
  let currentTheme = localStorage.getItem(LocalStorage.theme) as
    | Theme
    | undefined;
  if (!currentTheme) {
    const prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    currentTheme = prefersDarkScheme ? Theme.dark : Theme.light;
  }
  return currentTheme;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(getInitialThemeState);
  const isDarkTheme = theme === Theme.dark;
  const toggleTheme = () => {
    setTheme(theme => {
      if (theme === Theme.dark) {
        return Theme.light;
      } else {
        return Theme.dark;
      }
    });
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add(DARK_THEME_CLASS);
    } else {
      document.body.classList.remove(DARK_THEME_CLASS);
    }

    localStorage.setItem(LocalStorage.theme, theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeMethodsContext.Provider value={{ toggleTheme, isDarkTheme }}>
        {children}
      </ThemeMethodsContext.Provider>
    </ThemeContext.Provider>
  );
};
