import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { GlowButton } from './GlowButton';

describe('GlowButton Component', () => {
  it('renders correctly with default props', () => {
    render(<GlowButton>Test Button</GlowButton>);
    
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('glowing-button');
  });
  
  it('applies custom className correctly', () => {
    render(<GlowButton className="custom-class">Custom Class</GlowButton>);
    
    const button = screen.getByRole('button', { name: 'Custom Class' });
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('glowing-button'); // Still has the base class
  });
  
  it('handles onClick events', () => {
    const handleClick = vi.fn();
    render(<GlowButton onClick={handleClick}>Click Me</GlowButton>);
    
    const button = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('forwards additional HTML button attributes', () => {
    render(
      <GlowButton 
        type="submit"
        aria-label="Submit Form"
        data-testid="submit-button"
      >
        Submit
      </GlowButton>
    );
    
    const button = screen.getByTestId('submit-button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-label', 'Submit Form');
    expect(button.textContent).toBe('Submit');
  });
  
  it('renders as disabled when disabled prop is true', () => {
    render(<GlowButton disabled>Disabled Button</GlowButton>);
    
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });
  
  it('injects styles correctly', () => {
    render(<GlowButton>Styled Button</GlowButton>);
    
    // Check if style tag was injected
    const styleTag = document.querySelector('style');
    expect(styleTag).toBeInTheDocument();
    
    // Verify style content includes key CSS rules
    const styleContent = styleTag?.innerHTML || '';
    expect(styleContent).toContain('.glowing-button');
    expect(styleContent).toContain('animation: glowing');
    expect(styleContent).toContain('transition:');
  });
});