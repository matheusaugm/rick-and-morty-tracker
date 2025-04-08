import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { Skeleton } from './Skeleton';

describe('Skeleton Component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Skeleton />);
    
    const skeleton = container.firstChild;
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('rounded-md');
    expect(skeleton).toHaveClass('bg-gray-200');
    expect(skeleton).toHaveClass('dark:bg-gray-700');
  });
  
  it('applies custom className correctly', () => {
    const { container } = render(<Skeleton className="h-10 w-20" />);
    
    const skeleton = container.firstChild;
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('h-10');
    expect(skeleton).toHaveClass('w-20');
  });
}); 