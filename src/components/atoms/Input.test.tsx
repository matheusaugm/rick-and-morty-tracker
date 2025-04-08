import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    const handleChange = vi.fn();
    render(<Input value="test value" onChange={handleChange} />);
    
    const input = screen.getByDisplayValue('test value');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveClass('border-input');
  });
  
  it('handles onChange events', () => {
    const handleChange = vi.fn((e) => {
      // This simulates what the real handler would do with the event
      expect(e.target.value).toBe('new value');
    });
    
    render(<Input value="initial value" onChange={handleChange} />);
    
    const input = screen.getByDisplayValue('initial value');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  
  it('applies custom className correctly', () => {
    const handleChange = vi.fn();
    render(<Input value="test" onChange={handleChange} className="custom-class" />);
    
    const input = screen.getByDisplayValue('test');
    expect(input).toHaveClass('custom-class');
  });
  
  it('sets different input types correctly', () => {
    const handleChange = vi.fn();
    const { rerender } = render(<Input value="test" onChange={handleChange} type="password" />);
    
    let input = screen.getByDisplayValue('test');
    expect(input).toHaveAttribute('type', 'password');
    
    rerender(<Input value="test" onChange={handleChange} type="email" />);
    input = screen.getByDisplayValue('test');
    expect(input).toHaveAttribute('type', 'email');
    
    rerender(<Input value="5" onChange={handleChange} type="number" />);
    input = screen.getByDisplayValue('5');
    expect(input).toHaveAttribute('type', 'number');
  });
  
  it('passes through additional HTML attributes', () => {
    const handleChange = vi.fn();
    render(
      <Input 
        value="test" 
        onChange={handleChange} 
        placeholder="Enter value"
        disabled
        maxLength={10}
        aria-label="Test input"
      />
    );
    
    const input = screen.getByDisplayValue('test');
    expect(input).toHaveAttribute('placeholder', 'Enter value');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('maxLength', '10');
    expect(input).toHaveAttribute('aria-label', 'Test input');
  });
}); 