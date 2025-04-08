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
import { render, screen, fireEvent, within } from '../../test/test-utils-mocked';
import { CharacterCard } from './CharacterCard';
import { mockCharacter } from '../../test/mocks/characterMock';
import * as PortalContext from '../../contexts/PortalContext';

// Mock the usePortal hook
vi.mock('../../contexts/PortalContext', async () => {
  const actual = await vi.importActual('../../contexts/PortalContext');
  return {
    ...actual,
    usePortal: vi.fn().mockReturnValue({ showPortal: true })
  };
});

// Mock the CharacterDetailModal to avoid testing its implementation
vi.mock('./CharacterDetailModal', () => ({
  CharacterDetailModal: ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => 
    isOpen ? <div data-testid="mock-modal"><button onClick={onClose}>Close</button></div> : null
}));

describe('CharacterCard Component', () => {
  it('renders correctly with character data', () => {
    render(<CharacterCard character={mockCharacter} />);
    
    // Character name should be visible
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    
    // Status should be visible - use a more flexible approach for text split across elements
    // First find the status section
    const statusSection = Array.from(document.querySelectorAll('span')).find(
      span => span.textContent?.includes('status')
    )?.parentElement;
    
    expect(statusSection).toBeInTheDocument();
    
    // Then check for status text
    if (statusSection) {
      const statusValue = within(statusSection).getByText((content) => {
        return content.includes('alive') && content.includes('Human');
      });
      expect(statusValue).toBeInTheDocument();
    }
    
    // Location should be visible
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    
    // Origin should be visible
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
  });

  it('opens modal when clicked', () => {
    render(<CharacterCard character={mockCharacter} />);
    
    // Click on the character card
    fireEvent.click(screen.getByText('Rick Sanchez'));
    
    // Modal should be visible
    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    
    // Close the modal
    fireEvent.click(screen.getByText('Close'));
    
    // Modal should be closed
    expect(screen.queryByTestId('mock-modal')).not.toBeInTheDocument();
  });

  it('applies different styles based on portal visibility', () => {
    // Mock portal visible
    vi.mocked(PortalContext.usePortal).mockReturnValue({ 
      showPortal: true, 
      togglePortal: vi.fn() 
    });
    
    const { rerender } = render(<CharacterCard character={mockCharacter} />);
    
    // Get the card element - select the outer div with the backdrop-blur-md class
    const card = screen.getByText('Rick Sanchez').closest('.rounded-lg.overflow-hidden');
    expect(card).toHaveClass('backdrop-blur-md');
    
    // Mock portal hidden
    vi.mocked(PortalContext.usePortal).mockReturnValue({ 
      showPortal: false, 
      togglePortal: vi.fn() 
    });
    
    // Re-render with portal hidden
    rerender(<CharacterCard character={mockCharacter} />);
    
    // Check that different classes are applied
    expect(card).not.toHaveClass('backdrop-blur-md');
    expect(card).toHaveClass('bg-white');
  });
}); 