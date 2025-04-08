import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { render } from '../../test/test-utils';
import { PortalBackground } from './PortalBackground';

// Mock canvas API
beforeAll(() => {
  const mockContext = {
    save: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    arc: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    fillRect: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    fill: vi.fn(),
  };
  
  HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation(() => mockContext);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('PortalBackground Component', () => {
  it('renders a canvas element', () => {
    render(<PortalBackground />);
    
    // Should render a canvas element
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
  
  it('renders with the correct styles', () => {
    render(<PortalBackground />);
    
    // Check canvas styles
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveStyle({
      position: 'fixed',
      top: '0',
      left: '0',
    });
    
    // Verify the canvas has the zIndex property in its inline style
    expect(canvas?.style.zIndex).toBe('-10');
    
    // Check overlay div
    const overlay = document.querySelector('div[style*="backdrop-filter"]');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle({
      position: 'fixed',
      top: '0',
      left: '0',
    });
  });
}); 