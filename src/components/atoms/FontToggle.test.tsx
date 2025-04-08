import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { FontToggle } from './FontToggle';

describe('FontToggle Component', () => {
  it('renders correctly in Rick mode', () => {
    const mockToggle = vi.fn();
    render(<FontToggle isRickMode={true} onToggle={mockToggle} />);
    
    // Text should indicate Rick Mode
    expect(screen.getByText('Rick Mode')).toBeInTheDocument();
    
    // Text should have the wubba font class
    const textElement = screen.getByText('Rick Mode');
    expect(textElement).toHaveClass('font-wubba');
    
    // Toggle button should be green
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-green-500');
    
    // Knob should be in the "on" position
    const knob = button.firstChild;
    expect(knob).toHaveClass('translate-x-5');
  });
  
  it('renders correctly in Sans Serif mode', () => {
    const mockToggle = vi.fn();
    render(<FontToggle isRickMode={false} onToggle={mockToggle} />);
    
    // Text should indicate Sans Serif
    expect(screen.getByText('Sans Serif')).toBeInTheDocument();
    
    // Text should have the sans font class
    const textElement = screen.getByText('Sans Serif');
    expect(textElement).toHaveClass('font-sans');
    
    // Toggle button should be gray
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-200');
    
    // Knob should be in the "off" position
    const knob = button.firstChild;
    expect(knob).toHaveClass('translate-x-1');
  });
  
  it('calls onToggle when button is clicked', () => {
    const mockToggle = vi.fn();
    render(<FontToggle isRickMode={true} onToggle={mockToggle} />);
    
    // Click the toggle button
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // onToggle should be called
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
  
  it('applies custom className correctly', () => {
    const mockToggle = vi.fn();
    render(<FontToggle isRickMode={true} onToggle={mockToggle} className="custom-class" />);
    
    // The container should have the custom class
    const container = screen.getByText('Rick Mode').closest('div');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveClass('flex');
  });
  
  it('renders with accessible focus outlines', () => {
    const mockToggle = vi.fn();
    render(<FontToggle isRickMode={true} onToggle={mockToggle} />);
    
    // Toggle button should have focus styles
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus-visible:outline-none');
    expect(button).toHaveClass('focus-visible:ring-2');
  });
  
  it('has a smooth transition effect', () => {
    const mockToggle = vi.fn();
    render(<FontToggle isRickMode={true} onToggle={mockToggle} />);
    
    // Button should have transition styles
    const button = screen.getByRole('button');
    expect(button).toHaveClass('transition-colors');
    
    // Knob should have transition styles
    const knob = button.firstChild;
    expect(knob).toHaveClass('transition-transform');
  });
}); 