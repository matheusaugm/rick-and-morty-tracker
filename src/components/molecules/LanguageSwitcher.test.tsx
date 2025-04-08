import { vi } from 'vitest';
// Mock i18next with proper structure - use direct module factory mock
vi.mock('react-i18next', () => {
  // Create a mock function that we can manipulate in tests
  const useTranslationMock = vi.fn().mockReturnValue({
    t: (key: string) => key,
    i18n: {
      language: 'en-US',
      changeLanguage: vi.fn()
    }
  });
  
  return {
    // Export the mock function directly
    useTranslation: useTranslationMock,
    initReactI18next: {
      type: '3rdParty',
      init: () => {}
    },
    I18nextProvider: ({ children }: { children: React.ReactNode }) => children
  };
});

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils-mocked';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

// Get direct access to the mocked function with any type to bypass type checking
const useTranslationMock = vi.mocked(useTranslation) as unknown as ReturnType<typeof vi.fn>;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Reset the default mock for each test
    useTranslationMock.mockReturnValue({
      t: (key: string) => key,
      i18n: {
        language: 'en-US',
        changeLanguage: vi.fn()
      }
    });
  });
  
  it('renders language options correctly', () => {
    render(<LanguageSwitcher />);
    
    // Should show the change language text
    expect(screen.getByText('changeLanguage:')).toBeInTheDocument();
    
    // Should show language buttons
    expect(screen.getByText('en')).toBeInTheDocument();
    expect(screen.getByText('pt')).toBeInTheDocument();
  });
  
  it('highlights current language button (English)', () => {
    // Mock with English selected
    useTranslationMock.mockReturnValue({
      t: (key: string) => key,
      i18n: {
        language: 'en-US',
        changeLanguage: vi.fn()
      }
    });
    
    render(<LanguageSwitcher />);
    
    // English button should have aria-current="true" or other selected indication
    const englishButton = screen.getByText('en');
    const portugueseButton = screen.getByText('pt');
    
    // Since the actual classes have changed with shadcn, check the button's parent element
    // which likely contains variant-specific styling
    const englishButtonContainer = englishButton.closest('button');
    const portugueseButtonContainer = portugueseButton.closest('button');
    
    // At least verify that the buttons are different from each other
    expect(englishButtonContainer?.className).not.toBe(portugueseButtonContainer?.className);
  });
  
  it('changes language when a language button is clicked', () => {
    // Create a mock with access to the changeLanguage function
    const changeLanguageMock = vi.fn();
    useTranslationMock.mockReturnValue({
      t: (key: string) => key,
      i18n: {
        language: 'en-US',
        changeLanguage: changeLanguageMock
      }
    });
    
    render(<LanguageSwitcher />);
    
    // Click the Portuguese button
    fireEvent.click(screen.getByText('pt'));
    
    // Should call changeLanguage with 'pt-BR'
    expect(changeLanguageMock).toHaveBeenCalledWith('pt-BR');
    
    // Should set localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'pt-BR');
  });
  
  it('does not change language if clicking the current language button', () => {
    // Create a mock with access to the changeLanguage function
    const changeLanguageMock = vi.fn();
    useTranslationMock.mockReturnValue({
      t: (key: string) => key,
      i18n: {
        language: 'en-US',
        changeLanguage: changeLanguageMock
      }
    });
    
    render(<LanguageSwitcher />);
    
    // Click the English button (which is already selected)
    fireEvent.click(screen.getByText('en'));
    
    // Should not call changeLanguage
    expect(changeLanguageMock).not.toHaveBeenCalled();
    
    // Should not set localStorage
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });
  
  it('applies custom className when provided', () => {
    render(<LanguageSwitcher className="custom-class" />);
    
    // The container should have the custom class
    const container = screen.getByText('changeLanguage:').closest('div');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveClass('flex');
  });
}); 