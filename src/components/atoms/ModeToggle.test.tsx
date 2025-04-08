import { vi } from 'vitest';
// Mock theme provider directly
vi.mock('../theme-provider', () => {
  // Create the setTheme mock function that we can access in tests
  const setThemeMock = vi.fn();
  
  // Create the useTheme mock function that returns our mock theme state
  const useThemeMock = vi.fn().mockReturnValue({
    theme: 'light',
    setTheme: setThemeMock
  });
  
  return {
    useTheme: useThemeMock,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children
  };
});

import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '../../test/test-utils-mocked';
import { ModeToggle } from './ModeToggle';
import { useTheme } from '../theme-provider';

// Get direct access to the mocked functions
const useThemeMock = vi.mocked(useTheme);

// Ensure cleanup after each test
afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('ModeToggle Component', () => {
  it('renders correctly with light theme', () => {
    // Set up mock with light theme
    const setThemeMock = vi.fn();
    useThemeMock.mockReturnValue({
      theme: 'light', 
      setTheme: setThemeMock
    });
    
    render(<ModeToggle />);
    
    // Button should be visible
    const button = screen.getByRole('button', { name: 'Toggle theme' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('rounded-full');
    
    // Both icons should be present (one visible, one hidden)
    const sunIcon = document.querySelector('.scale-100');
    const moonIcon = document.querySelector('.scale-0');
    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();
  });
  
  it('renders correctly with dark theme', () => {
    // Set up mock with dark theme
    const setThemeMock = vi.fn();
    useThemeMock.mockReturnValue({
      theme: 'dark',
      setTheme: setThemeMock
    });
    
    render(<ModeToggle />);
    
    // Button should be visible
    const button = screen.getByRole('button', { name: 'Toggle theme' });
    expect(button).toBeInTheDocument();
    
    // Both icons should be present but with different classes
    // In dark mode, moon should be visible (scale-100) and sun hidden (scale-0)
    const moonIcon = document.querySelector('.dark\\:scale-100');
    const sunIcon = document.querySelector('.dark\\:scale-0');
    expect(moonIcon).toBeInTheDocument();
    expect(sunIcon).toBeInTheDocument();
  });
  
  it('toggles theme when clicked in light mode', () => {
    const setThemeMock = vi.fn();
    
    // Set up mock with light theme
    useThemeMock.mockReturnValue({
      theme: 'light',
      setTheme: setThemeMock
    });
    
    render(<ModeToggle />);
    
    // Click the toggle button
    const button = screen.getByRole('button', { name: 'Toggle theme' });
    fireEvent.click(button);
    
    // Should call setTheme with 'dark'
    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });
  
  it('toggles theme when clicked in dark mode', () => {
    const setThemeMock = vi.fn();
    
    // Set up mock with dark theme
    useThemeMock.mockReturnValue({
      theme: 'dark',
      setTheme: setThemeMock
    });
    
    render(<ModeToggle />);
    
    // Click the toggle button
    const button = screen.getByRole('button', { name: 'Toggle theme' });
    fireEvent.click(button);
    
    // Should call setTheme with 'light'
    expect(setThemeMock).toHaveBeenCalledWith('light');
  });
}); 