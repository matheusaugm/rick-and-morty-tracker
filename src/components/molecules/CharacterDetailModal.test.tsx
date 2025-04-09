import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../test/test-utils';
import { CharacterDetailModal } from './CharacterDetailModal';
import { mockCharacter, mockEpisodes } from '../../test/mocks/characterMock';
import * as PortalContext from '../../contexts/PortalContext';
import * as FontContext from '../../contexts/FontContext';

// Mock fetch for episode data
global.fetch = vi.fn();

// Mock the usePortal hook
vi.mock('../../contexts/PortalContext', async () => {
  const actual = await vi.importActual('../../contexts/PortalContext');
  return {
    ...actual,
    usePortal: vi.fn().mockReturnValue({ showPortal: true })
  };
});

// Mock the useFontPreference hook
vi.mock('../../contexts/FontContext', async () => {
  const actual = await vi.importActual('../../contexts/FontContext');
  return {
    ...actual,
    useFontPreference: vi.fn().mockReturnValue({ isRickMode: false })
  };
});

describe('CharacterDetailModal Component', () => {
  const mockOnClose = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock successful fetch response with episodes
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockEpisodes,
    } as Response);

    // Set default mocks for contexts
    vi.mocked(PortalContext.usePortal).mockReturnValue({ 
      showPortal: true, 
      togglePortal: vi.fn() 
    });
    vi.mocked(FontContext.useFontPreference).mockReturnValue({ 
      isRickMode: false, 
      toggleFontMode: vi.fn() 
    });
  });
  
  it('renders nothing when not open', () => {
    render(
      <CharacterDetailModal 
        character={mockCharacter} 
        isOpen={false} 
        onClose={mockOnClose} 
      />
    );
    
    // Modal title should not be visible
    expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
  });
  
  it('renders character details when open', async () => {
    render(
      <CharacterDetailModal 
        character={mockCharacter} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    
    // Character name should be visible
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    
    // Character details should be visible
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Genius Scientist')).toBeInTheDocument();
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    
    // Wait for episodes to load
    await waitFor(() => {
      expect(screen.getByText('Pilot')).toBeInTheDocument();
    });
    
    // Episode details should be visible
    expect(screen.getByText('S01E01')).toBeInTheDocument();
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument();
    expect(screen.getByText('December 2, 2013')).toBeInTheDocument();
  });
  
  it('calls onClose when backdrop is clicked', () => {
    const { container } = render(
      <CharacterDetailModal 
        character={mockCharacter} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    
    // The first div inside the main container is always the backdrop
    // We need to access it through the container because it uses inline styles
    const modal = container.firstChild as HTMLElement;
    const backdrop = modal.children[0] as HTMLElement;
    
    // Click the backdrop
    fireEvent.click(backdrop);
    
    // onClose should be called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  it('calls onClose when close button is clicked', () => {
    render(
      <CharacterDetailModal 
        character={mockCharacter} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    
    // Find and click the close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // onClose should be called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  it('applies different styles based on portal visibility', () => {
    // Mock portal visible
    vi.mocked(PortalContext.usePortal).mockReturnValue({ 
      showPortal: true, 
      togglePortal: vi.fn() 
    });
    
    const { rerender } = render(
      <CharacterDetailModal 
        character={mockCharacter} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    
    // Get the modal content
    const modalContent = screen.getByTestId('character-modal');
    expect(modalContent).toHaveClass('backdrop-blur-md');
    expect(modalContent).toHaveClass('bg-black/40');
    
    // Mock portal hidden
    vi.mocked(PortalContext.usePortal).mockReturnValue({ 
      showPortal: false, 
      togglePortal: vi.fn() 
    });
    
    // Re-render with portal hidden
    rerender(
      <CharacterDetailModal 
        character={mockCharacter} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    
    // Check that different classes are applied
    expect(modalContent).not.toHaveClass('backdrop-blur-md');
    expect(modalContent).toHaveClass('bg-white');
  });
  
  it('applies Rick mode styling when isRickMode is true and portal is visible', () => {
    // Mock both portal visible and Rick mode active
    vi.mocked(PortalContext.usePortal).mockReturnValue({ 
      showPortal: true, 
      togglePortal: vi.fn() 
    });
    vi.mocked(FontContext.useFontPreference).mockReturnValue({ 
      isRickMode: true, 
      toggleFontMode: vi.fn() 
    });
    
    render(
      <CharacterDetailModal 
        character={mockCharacter} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    
    // Get the modal content
    const modalContent = screen.getByTestId('character-modal');
    expect(modalContent).toHaveClass('text-green-400');
    expect(modalContent).toHaveClass('font-wubba');
  });
}); 