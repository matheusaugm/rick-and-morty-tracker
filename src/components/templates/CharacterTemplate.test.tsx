import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { CharacterTemplate } from './CharacterTemplate';

describe('CharacterTemplate Component', () => {
  it('renders header and content correctly', () => {
    render(
      <CharacterTemplate
        header={<div>Header Content</div>}
        content={<div>Main Content</div>}
      />
    );
    
    // Header should be visible
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    
    // Main content should be visible
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    
    // Footer should not be present
    const footerElement = screen.queryByRole('contentinfo');
    expect(footerElement).not.toBeInTheDocument();
  });
  
  it('renders footer when provided', () => {
    render(
      <CharacterTemplate
        header={<div>Header Content</div>}
        content={<div>Main Content</div>}
        footer={<div>Footer Content</div>}
      />
    );
    
    // Footer content should be visible
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
    
    // Footer should be in a footer element
    const footer = screen.getByText('Footer Content').closest('footer');
    expect(footer).toBeInTheDocument();
  });
  
  it('applies custom className when provided', () => {
    const { container } = render(
      <CharacterTemplate
        header={<div>Header Content</div>}
        content={<div>Main Content</div>}
        className="custom-class"
      />
    );
    
    // The outer div should have the custom class
    const rootElement = container.firstChild;
    expect(rootElement).toHaveClass('custom-class');
    
    // Should also have the default classes
    expect(rootElement).toHaveClass('min-h-screen');
    expect(rootElement).toHaveClass('bg-transparent');
  });
}); 