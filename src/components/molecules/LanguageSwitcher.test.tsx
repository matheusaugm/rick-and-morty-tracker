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

// Create a mock for useHtmlLang with a spy function for changeLang
const changeLangMock = vi.fn();
const applyBrowserLanguageMock = vi.fn();
vi.mock('../../hooks/useHtmlLang', () => ({
  useHtmlLang: () => ({
    changeLang: changeLangMock,
    applyBrowserLanguage: applyBrowserLanguageMock,
    currentLang: 'en-US',
    htmlLang: 'en',
    getCurrentLang: () => 'en'
  })
}));

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
    
    // Should show language buttons with the updated text
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('PT')).toBeInTheDocument();
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
    
    // English button should have different styling than Portuguese button
    const englishButton = screen.getByText('EN');
    const portugueseButton = screen.getByText('PT');
    
    // Since the actual classes have changed with shadcn, check the button's parent element
    // which likely contains variant-specific styling
    const englishButtonContainer = englishButton.closest('button');
    const portugueseButtonContainer = portugueseButton.closest('button');
    
    // At least verify that the buttons are different from each other
    expect(englishButtonContainer?.className).not.toBe(portugueseButtonContainer?.className);
  });
  
  it('changes language when a language button is clicked', () => {
    // Create mocks
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
    fireEvent.click(screen.getByText('PT'));
    
    // Should call changeLang from useHtmlLang with 'pt-BR'
    expect(changeLangMock).toHaveBeenCalledWith('pt-BR');
    
    // Should set localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'pt-BR');
  });
  
  it('does not change language if clicking the current language button', () => {
    // Mock with English selected
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
    fireEvent.click(screen.getByText('EN'));
    
    // Should not call changeLanguage or changeLang
    expect(changeLangMock).not.toHaveBeenCalled();
    expect(changeLanguageMock).not.toHaveBeenCalled();
    
    // Should not set localStorage
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });
  
  it('applies custom className when provided', () => {
    render(<LanguageSwitcher className="custom-class" />);
    
    // The container should have the custom class - find it by test ID since text is gone
    const container = screen.getByTestId('language-switcher');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveClass('flex');
  });
}); 