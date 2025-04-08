import '@testing-library/jest-dom';

declare module 'vitest' {
  export interface Assertion<T = unknown> extends jest.Matchers<void, T> {
    toBeInTheDocument(): T;
    toHaveClass(...classNames: string[]): T;
  }
} 