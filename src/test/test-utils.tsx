import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '../components/theme-provider';
import { PortalProvider } from '../contexts/PortalContext';
import i18nMock from './i18n-mock';

// Create a custom render that wraps components with necessary providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <i18nMock.I18nextProvider i18n={{}}>
        <ThemeProvider defaultTheme="light" storageKey="test-theme">
          <PortalProvider>
            {children}
          </PortalProvider>
        </ThemeProvider>
      </i18nMock.I18nextProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything from testing library, but override render with our custom render
export * from '@testing-library/react';
export { customRender as render }; 