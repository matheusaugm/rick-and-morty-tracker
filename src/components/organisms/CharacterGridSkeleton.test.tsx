import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { CharacterGridSkeleton } from './CharacterGridSkeleton';

// Mock the CharacterCardSkeleton component
vi.mock('../molecules/CharacterCardSkeleton', () => ({
  CharacterCardSkeleton: () => <div data-testid="skeleton-card" />
}));

describe('CharacterGridSkeleton Component', () => {
  it('renders the correct number of skeleton cards with default count', () => {
    render(<CharacterGridSkeleton />);
    
    // Should render 8 skeleton cards by default
    const skeletonCards = screen.getAllByTestId('skeleton-card');
    expect(skeletonCards.length).toBe(8);
  });
  
  it('renders the specified number of skeleton cards', () => {
    render(<CharacterGridSkeleton count={4} />);
    
    // Should render 4 skeleton cards
    const skeletonCards = screen.getAllByTestId('skeleton-card');
    expect(skeletonCards.length).toBe(4);
  });
  
  it('applies custom className when provided', () => {
    const { container } = render(<CharacterGridSkeleton className="custom-class" />);
    
    // The grid element should have the custom class
    const gridElement = container.firstChild;
    expect(gridElement).toHaveClass('custom-class');
    
    // Should also have the default grid classes
    expect(gridElement).toHaveClass('grid');
    expect(gridElement).toHaveClass('grid-cols-1');
  });
}); 