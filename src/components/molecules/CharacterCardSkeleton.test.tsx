import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { CharacterCardSkeleton } from './CharacterCardSkeleton';

// Mock the Skeleton component to make testing easier
vi.mock('../atoms/Skeleton', () => ({
  Skeleton: ({ className }: { className: string }) => (
    <div data-testid="skeleton" className={className} />
  )
}));

describe('CharacterCardSkeleton Component', () => {
  it('renders correctly with all skeleton parts', () => {
    render(<CharacterCardSkeleton />);
    
    // Get all skeleton elements
    const skeletons = screen.getAllByTestId('skeleton');
    
    // Should have 8 skeleton elements
    expect(skeletons.length).toBe(8);
    
    // Main container should be visible
    const container = skeletons[0].closest('div[class*="rounded-lg"]');
    expect(container).toHaveClass('border');
    expect(container).toHaveClass('rounded-lg');
    expect(container).toHaveClass('bg-white');
    expect(container).toHaveClass('dark:bg-gray-800');
  });
  
  it('applies custom className correctly', () => {
    render(<CharacterCardSkeleton className="custom-class" />);
    
    // Get all skeleton elements
    const skeletons = screen.getAllByTestId('skeleton');
    
    // Main container should have the custom class
    const container = skeletons[0].closest('div[class*="rounded-lg"]');
    expect(container).toHaveClass('custom-class');
  });
  
  it('renders skeletons with the correct dimensions', () => {
    render(<CharacterCardSkeleton />);
    
    // Get all skeleton elements
    const skeletons = screen.getAllByTestId('skeleton');
    
    // Image skeleton
    expect(skeletons[0]).toHaveClass('h-48');
    expect(skeletons[0]).toHaveClass('w-full');
    
    // Name skeleton
    expect(skeletons[1]).toHaveClass('h-6');
    expect(skeletons[1]).toHaveClass('w-3/4');
    
    // Status skeleton - header
    expect(skeletons[2]).toHaveClass('h-4');
    expect(skeletons[2]).toHaveClass('w-full');
    
    // Status skeleton - content
    expect(skeletons[3]).toHaveClass('h-4');
    expect(skeletons[3]).toHaveClass('w-5/6');
  });
}); 