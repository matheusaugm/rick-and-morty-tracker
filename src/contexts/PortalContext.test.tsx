import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../test/test-utils';
import { PortalProvider, usePortal } from './PortalContext';
import { renderHook, act } from '@testing-library/react';

// Test component that uses the usePortal hook
function TestComponent() {
  const { showPortal, togglePortal } = usePortal();
  return (
    <div>
      <div data-testid="portal-status">{showPortal ? 'visible' : 'hidden'}</div>
      <button onClick={togglePortal} data-testid="toggle-button">Toggle Portal</button>
    </div>
  );
}

describe('PortalContext', () => {
  it('provides initial value of showPortal as true', () => {
    render(
      <PortalProvider>
        <TestComponent />
      </PortalProvider>
    );
    
    // Initial state should be visible
    expect(screen.getByTestId('portal-status')).toHaveTextContent('visible');
  });
  
  it('toggles portal visibility when togglePortal is called', () => {
    render(
      <PortalProvider>
        <TestComponent />
      </PortalProvider>
    );
    
    // Initial state should be visible
    expect(screen.getByTestId('portal-status')).toHaveTextContent('visible');
    
    // Click toggle button
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // State should now be hidden
    expect(screen.getByTestId('portal-status')).toHaveTextContent('hidden');
    
    // Click toggle button again
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // State should be visible again
    expect(screen.getByTestId('portal-status')).toHaveTextContent('visible');
  });
  
  it('throws error when usePortal is used outside of PortalProvider', () => {
    // Suppress console.error for this test to avoid noise
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Use renderHook instead of render for better error handling
    expect(() => {
      renderHook(() => usePortal());
    }).toThrow('usePortal must be used within a PortalProvider');
    
    // Restore console.error
    consoleSpy.mockRestore();
  });
  
  it('works correctly when used with renderHook', () => {
    // Wrap the hook in PortalProvider
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PortalProvider>
        {children}
      </PortalProvider>
    );
    
    // Use renderHook to test the usePortal hook
    const { result } = renderHook(() => usePortal(), { wrapper });
    
    // Initial state should be visible
    expect(result.current.showPortal).toBe(true);
    
    // Toggle portal
    act(() => {
      result.current.togglePortal();
    });
    
    // State should now be hidden
    expect(result.current.showPortal).toBe(false);
  });
}); 