import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { CharacterGrid } from './CharacterGrid';
import { mockCharacter } from '../../test/mocks/characterMock';
import * as PortalContext from '../../contexts/PortalContext';
import type { Character } from '../../services/api';

// Mock the usePortal hook
vi.mock('../../contexts/PortalContext', async () => {
  const actual = await vi.importActual('../../contexts/PortalContext');
  return {
    ...actual,
    usePortal: vi.fn().mockReturnValue({ showPortal: false })
  };
});

// Mock the CharacterCard component to avoid testing its implementation
vi.mock('../molecules/CharacterCard', () => ({
  CharacterCard: ({ character }: { character: Character }) => (
    <div data-testid={`character-card-${character.id}`}>{character.name}</div>
  )
}));

describe('CharacterGrid Component', () => {
  const mockCharacters = [
    { ...mockCharacter, id: 1 },
    { ...mockCharacter, id: 2, name: 'Morty Smith' },
    { ...mockCharacter, id: 3, name: 'Summer Smith' }
  ];
  
  it('renders character cards correctly', () => {
    render(<CharacterGrid characters={mockCharacters} />);
    
    // Should render all character cards
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('Summer Smith')).toBeInTheDocument();
    
    // Should render correct number of cards
    expect(screen.getAllByTestId(/character-card-\d+/).length).toBe(3);
  });
  
  it('shows empty state when no characters are provided', () => {
    render(<CharacterGrid characters={[]} />);
    
    // Should show empty state message
    expect(screen.getByText('No characters found')).toBeInTheDocument();
    
    // Should not render any character cards
    expect(screen.queryAllByTestId(/character-card-\d+/).length).toBe(0);
  });
  
  it('applies different styles based on portal visibility', () => {
    // Mock portal visible
    vi.mocked(PortalContext.usePortal).mockReturnValue({ 
      showPortal: true, 
      togglePortal: vi.fn() 
    });
    
    const { rerender, container } = render(<CharacterGrid characters={mockCharacters} />);
    
    // Get the grid element
    const grid = container.querySelector('div');
    expect(grid).toHaveClass('backdrop-blur-[2px]');
    expect(grid).toHaveClass('bg-transparent');
    
    // Mock portal hidden
    vi.mocked(PortalContext.usePortal).mockReturnValue({ 
      showPortal: false, 
      togglePortal: vi.fn() 
    });
    
    // Re-render with portal hidden
    rerender(<CharacterGrid characters={mockCharacters} />);
    
    // Check that different classes are applied
    expect(grid).not.toHaveClass('backdrop-blur-[2px]');
    expect(grid).toHaveClass('bg-white');
  });
}); 