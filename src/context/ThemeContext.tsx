import { Theme } from '@/types/Theme';
import React, { createContext, ReactNode, useMemo, useState } from 'react';

export const ThemeContext = createContext({
  theme: Theme.light,
  setTheme: (theme: Theme) => {},
});

type Props = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(Theme.light);
  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
