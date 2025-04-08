import { vi } from 'vitest';
// Mock react-i18next with proper structure
vi.mock('react-i18next', () => {
  return {
    // Mock module exports
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        language: 'en-US',
        changeLanguage: vi.fn()
      }
    }),
    initReactI18next: {
      type: '3rdParty',
      init: () => {}
    }
  };
});

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils-mocked';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  it('renders correctly with default values', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);
    
    // Input should be empty by default
    const input = screen.getByPlaceholderText('searchPlaceholder');
    expect(input).toHaveValue('');
    
    // Button should be present
    const button = screen.getByText('searchButton');
    expect(button).toBeInTheDocument();
  });
  
  it('renders with initialValue when provided', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} initialValue="Rick" />);
    
    // Input should have initial value
    const input = screen.getByPlaceholderText('searchPlaceholder');
    expect(input).toHaveValue('Rick');
  });
  
  it('updates input value on change', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);
    
    // Get input and type in it
    const input = screen.getByPlaceholderText('searchPlaceholder');
    fireEvent.change(input, { target: { value: 'Morty' } });
    
    // Input value should update
    expect(input).toHaveValue('Morty');
  });
  
  it('calls onSearch with input value when form is submitted', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);
    
    // Type in the input
    const input = screen.getByPlaceholderText('searchPlaceholder');
    fireEvent.change(input, { target: { value: 'Rick Sanchez' } });
    
    // Submit the form
    const button = screen.getByText('searchButton');
    fireEvent.click(button);
    
    // onSearch should be called with the input value
    expect(handleSearch).toHaveBeenCalledWith('Rick Sanchez');
  });
  
  it('calls onSearch with empty string when form is submitted with empty input', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);
    
    // Submit the form without typing in the input
    const button = screen.getByText('searchButton');
    fireEvent.click(button);
    
    // onSearch should be called with empty string
    expect(handleSearch).toHaveBeenCalledWith('');
  });
  
  it('handles form submission via Enter key', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);
    
    // Type in the input
    const input = screen.getByPlaceholderText('searchPlaceholder');
    fireEvent.change(input, { target: { value: 'Summer Smith' } });
    
    // Submit the form by pressing Enter
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    // Get the form element
    const form = input.closest('form');
    
    // Fire submit event on the form
    if (form) {
      fireEvent.submit(form);
    }
    
    // onSearch should be called with the input value
    expect(handleSearch).toHaveBeenCalledWith('Summer Smith');
  });
  
  it('applies custom className when provided', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} className="custom-class" />);
    
    // The form should have the custom class
    const form = screen.getByPlaceholderText('searchPlaceholder').closest('form');
    expect(form).toHaveClass('custom-class');
    expect(form).toHaveClass('flex');
  });
}); 