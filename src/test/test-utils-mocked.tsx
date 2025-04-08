import { render, RenderOptions } from '@testing-library/react';

// Create a custom renderer that doesn't use any providers
// Instead, rely on the mocks we've created for each provider
const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions
) => render(ui, options);

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { customRender as render }; 