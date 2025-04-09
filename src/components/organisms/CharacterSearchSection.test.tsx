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

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils-mocked';
import { CharacterSearchSection } from './CharacterSearchSection';
import React from 'react';

// Mock the SearchBar component with a functional component that tracks state
vi.mock('../molecules/SearchBar', () => ({
  SearchBar: ({ onSearch, initialValue = '' }: { onSearch: (query: string) => void, initialValue?: string }) => {
    const [value, setValue] = React.useState(initialValue);
    
    return (
      <div data-testid="mock-search-bar">
        <input 
          data-testid="search-input" 
          value={value}
          onChange={(e) => setValue(e.target.value)} 
        />
        <button 
          data-testid="search-button"
          onClick={() => onSearch(value)}
        >
          Search
        </button>
      </div>
    );
  }
}));

// Mock the other components to simplify tests
vi.mock('../atoms/Text', () => ({
  Text: ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>
}));

// LanguageSwitcher is no longer used in this component, so we don't need to mock it
// But keeping the mock for backward compatibility
vi.mock('../molecules/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />
}));

vi.mock('../atoms/ModeToggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle" />
}));

describe('CharacterSearchSection Component', () => {
  const mockOnSearch = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders correctly with all components', () => {
    render(<CharacterSearchSection onSearch={mockOnSearch} />);
    
    // Title should be visible
    expect(screen.getByText('title')).toBeInTheDocument();
    
    // Mode toggle should be rendered
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
    
    // Language switcher has been moved to App.tsx, so it should not be present
    expect(screen.queryByTestId('language-switcher')).not.toBeInTheDocument();
    
    // Search bar should be rendered
    expect(screen.getByTestId('mock-search-bar')).toBeInTheDocument();
  });
  
  it('calls onSearch when search is submitted with valid query', () => {
    render(<CharacterSearchSection onSearch={mockOnSearch} />);
    
    // Set search input value
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Rick' } });
    
    // Click search button
    fireEvent.click(screen.getByTestId('search-button'));
    
    // onSearch should be called with the input value
    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
    
    // No error message should be displayed
    expect(screen.queryByText('enterSearchTerm')).not.toBeInTheDocument();
  });
  
  it('allows empty search to fetch all characters', () => {
    render(<CharacterSearchSection onSearch={mockOnSearch} />);
    
    // Set search input value to empty
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: '' } });
    
    // Click search button
    fireEvent.click(screen.getByTestId('search-button'));
    
    // onSearch should be called with empty string (changed behavior)
    expect(mockOnSearch).toHaveBeenCalledWith('');
    
    // No error message should be displayed anymore
    expect(screen.queryByText('enterSearchTerm')).not.toBeInTheDocument();
  });
  
  it('uses initialQuery when provided', () => {
    render(<CharacterSearchSection onSearch={mockOnSearch} initialQuery="Morty" />);
    
    // Input should have the initial value
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('Morty');
  });
}); 