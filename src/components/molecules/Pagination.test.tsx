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
import { render, screen, fireEvent } from '../../test/test-utils-mocked';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  it('renders correctly with basic pagination', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination 
        currentPage={3} 
        totalPages={10} 
        onPageChange={handlePageChange} 
      />
    );
    
    // Check if current page info is displayed
    expect(screen.getByText('page 3 of 10')).toBeInTheDocument();
    
    // Check if navigation buttons are present
    expect(screen.getByText('<')).toBeInTheDocument(); // Previous
    expect(screen.getByText('>')).toBeInTheDocument(); // Next
    
    // Current page should be highlighted
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('bg-green-500');
  });
  
  it('disables previous button on first page', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination 
        currentPage={1} 
        totalPages={10} 
        onPageChange={handlePageChange} 
      />
    );
    
    // Previous button should be disabled
    const prevButton = screen.getByText('<');
    expect(prevButton).toBeDisabled();
    
    // Next button should be enabled
    const nextButton = screen.getByText('>');
    expect(nextButton).not.toBeDisabled();
  });
  
  it('disables next button on last page', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination 
        currentPage={10} 
        totalPages={10} 
        onPageChange={handlePageChange} 
      />
    );
    
    // Previous button should be enabled
    const prevButton = screen.getByText('<');
    expect(prevButton).not.toBeDisabled();
    
    // Next button should be disabled
    const nextButton = screen.getByText('>');
    expect(nextButton).toBeDisabled();
  });
  
  it('calls onPageChange with correct page number when a page button is clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination 
        currentPage={3} 
        totalPages={10} 
        onPageChange={handlePageChange} 
      />
    );
    
    // Click on page 5
    fireEvent.click(screen.getByText('5'));
    
    // onPageChange should be called with 5
    expect(handlePageChange).toHaveBeenCalledWith(5);
  });
  
  it('calls onPageChange with previous page when previous button is clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination 
        currentPage={3} 
        totalPages={10} 
        onPageChange={handlePageChange} 
      />
    );
    
    // Click on previous button
    fireEvent.click(screen.getByText('<'));
    
    // onPageChange should be called with 2
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
  
  it('calls onPageChange with next page when next button is clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination 
        currentPage={3} 
        totalPages={10} 
        onPageChange={handlePageChange} 
      />
    );
    
    // Click on next button
    fireEvent.click(screen.getByText('>'));
    
    // onPageChange should be called with 4
    expect(handlePageChange).toHaveBeenCalledWith(4);
  });
  
  it('shows ellipsis when needed', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination 
        currentPage={7} 
        totalPages={20} 
        onPageChange={handlePageChange} 
      />
    );
    
    // Should show ellipsis at the beginning and end
    const ellipses = screen.getAllByText('...');
    expect(ellipses.length).toBe(2);
    
    // Should show first page
    expect(screen.getByText('1')).toBeInTheDocument();
    
    // Should show last page
    expect(screen.getByText('20')).toBeInTheDocument();
  });
  
  it('applies custom className correctly', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination 
        currentPage={3} 
        totalPages={10} 
        onPageChange={handlePageChange}
        className="custom-class"
      />
    );
    
    // The container should have the custom class
    const container = screen.getByText('page 3 of 10').closest('div');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveClass('flex');
  });
}); 