import { vi } from 'vitest';
import { ReactNode } from 'react';

// Mock the theme hooks and provider
export const createThemeMock = (defaultTheme = 'light') => {
  let currentTheme = defaultTheme;
  
  const setThemeMock = vi.fn((theme: string) => {
    currentTheme = theme;
  });
  
  return {
    ThemeProvider: ({ children }: { children: ReactNode, defaultTheme: string, storageKey: string }) => children,
    useTheme: () => ({
      theme: currentTheme,
      setTheme: setThemeMock
    })
  };
};

// Default theme mock
const themeMock = createThemeMock();

export { themeMock };
export default themeMock; 