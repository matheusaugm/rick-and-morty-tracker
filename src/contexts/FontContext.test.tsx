import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import { render, screen, fireEvent } from '../test/test-utils';
import { FontProvider, useFontPreference } from './FontContext';
import { renderHook, act } from '@testing-library/react';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  key: vi.fn(),
  length: 0
};
global.localStorage = localStorageMock as unknown as Storage;

// Mock document methods
const originalClassList = document.documentElement.classList;
const mockClassList = {
  add: vi.fn(),
  remove: vi.fn(),
};
// Use Object.defineProperty to properly mock classList
Object.defineProperty(document.documentElement, 'classList', {
  configurable: true,
  get: () => mockClassList
});
document.documentElement.style.setProperty = vi.fn();

// Restore original classList after tests
afterAll(() => {
  Object.defineProperty(document.documentElement, 'classList', {
    configurable: true,
    get: () => originalClassList
  });
});

// Test component that uses the useFontPreference hook
function TestComponent() {
  const { isRickMode, toggleFontMode } = useFontPreference();
  return (
    <div>
      <div data-testid="font-status">{isRickMode ? 'rick-mode' : 'sans-serif'}</div>
      <button onClick={toggleFontMode} data-testid="toggle-button">Toggle Font</button>
    </div>
  );
}

describe('FontContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('provides default value with Rick Mode as true when localStorage is empty', () => {
    // Mock localStorage to return null (no saved preference)
    localStorageMock.getItem.mockReturnValue(null);
    
    render(
      <FontProvider>
        <TestComponent />
      </FontProvider>
    );
    
    // Default state should be rick-mode
    expect(screen.getByTestId('font-status')).toHaveTextContent('rick-mode');
  });
  
  it('uses saved preference from localStorage', () => {
    // Mock localStorage to return a saved preference (false = sans-serif)
    localStorageMock.getItem.mockReturnValue('false');
    
    render(
      <FontProvider>
        <TestComponent />
      </FontProvider>
    );
    
    // State should be sans-serif based on localStorage
    expect(screen.getByTestId('font-status')).toHaveTextContent('sans-serif');
  });
  
  it('toggles font mode when toggleFontMode is called', () => {
    // Start with rick-mode
    localStorageMock.getItem.mockReturnValue('true');
    
    render(
      <FontProvider>
        <TestComponent />
      </FontProvider>
    );
    
    // Initial state should be rick-mode
    expect(screen.getByTestId('font-status')).toHaveTextContent('rick-mode');
    
    // Click toggle button
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // State should now be sans-serif
    expect(screen.getByTestId('font-status')).toHaveTextContent('sans-serif');
    
    // localStorage should be updated
    expect(localStorageMock.setItem).toHaveBeenCalledWith('isRickMode', 'false');
  });
  
  it('applies proper class to document root when in Rick Mode', () => {
    // Start with rick-mode
    localStorageMock.getItem.mockReturnValue('true');
    
    render(
      <FontProvider>
        <TestComponent />
      </FontProvider>
    );
    
    // Should apply rick-mode classes and styles
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--font-sans', 'WubbaLubbaDubDub, system-ui, sans-serif');
    expect(mockClassList.remove).toHaveBeenCalledWith('font-sans');
    expect(mockClassList.add).toHaveBeenCalledWith('font-wubba');
  });
  
  it('applies proper class to document root when in Sans Serif mode', () => {
    // Start with sans-serif
    localStorageMock.getItem.mockReturnValue('false');
    
    render(
      <FontProvider>
        <TestComponent />
      </FontProvider>
    );
    
    // Should apply sans-serif classes and styles
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--font-sans', 'sans-serif');
    expect(mockClassList.remove).toHaveBeenCalledWith('font-wubba');
    expect(mockClassList.add).toHaveBeenCalledWith('font-sans');
  });
  
  it('throws error when useFontPreference is used outside of FontProvider', () => {
    // Suppress console.error for this test to avoid noise
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Use renderHook to test the hook outside provider
    expect(() => {
      renderHook(() => useFontPreference());
    }).toThrow('useFontPreference must be used within a FontProvider');
    
    // Restore console.error
    consoleSpy.mockRestore();
  });
  
  it('works correctly when used with renderHook', () => {
    // Mock localStorage
    localStorageMock.getItem.mockReturnValue('true');
    
    // Wrap the hook in FontProvider
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FontProvider>
        {children}
      </FontProvider>
    );
    
    // Use renderHook to test the useFontPreference hook
    const { result } = renderHook(() => useFontPreference(), { wrapper });
    
    // Initial state should be rick-mode
    expect(result.current.isRickMode).toBe(true);
    
    // Toggle font mode
    act(() => {
      result.current.toggleFontMode();
    });
    
    // State should now be sans-serif
    expect(result.current.isRickMode).toBe(false);
  });
}); 