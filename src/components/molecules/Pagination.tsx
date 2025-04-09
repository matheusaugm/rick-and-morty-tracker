import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = '' 
}: PaginationProps) {
  const { t } = useTranslation('common');

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const maxVisibleButtons = 5;
    

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => onPageChange(i)}
            variant="pagination"
            data-testid={`page-button-${i}`}
            className={clsx({
              'bg-green-500 text-white dark:bg-green-600 dark:text-white': currentPage === i
            })}
          >
            {i}
          </Button>
        );
      }
      return pageNumbers;
    }
    



    

    pageNumbers.push(
      <Button
        key={1}
        onClick={() => onPageChange(1)}
        variant="pagination"
        data-testid="page-button-1"
        className={clsx({
          'bg-green-500 text-white dark:bg-green-600 dark:text-white': currentPage === 1
        })}
      >
        1
      </Button>
    );
    

    let middleStart, middleEnd;
    
    if (currentPage <= 3) {

      middleStart = 2;
      middleEnd = 3;
    } else if (currentPage >= totalPages - 2) {

      middleStart = totalPages - 2;
      middleEnd = totalPages - 1;
    } else {

      middleStart = currentPage - 1;
      middleEnd = currentPage + 1;
    }
    

    if (middleStart > 2) {
      pageNumbers.push(
        <span key="ellipsis-start" className="px-2 text-gray-600 dark:text-gray-400">
          ...
        </span>
      );
    }
    

    for (let i = middleStart; i <= middleEnd; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => onPageChange(i)}
            variant="pagination"
            data-testid={`page-button-${i}`}
            className={clsx({
              'bg-green-500 text-white dark:bg-green-600 dark:text-white': currentPage === i
            })}
          >
            {i}
          </Button>
        );
      }
    }
    

    if (middleEnd < totalPages - 1) {
      pageNumbers.push(
        <span key="ellipsis-end" className="px-2 text-gray-600 dark:text-gray-400">
          ...
        </span>
      );
    }
    

    pageNumbers.push(
      <Button
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
        variant="pagination"
        data-testid={`page-button-${totalPages}`}
        className={clsx({
          'bg-green-500 text-white dark:bg-green-600 dark:text-white': currentPage === totalPages
        })}
      >
        {totalPages}
      </Button>
    );
    
    return pageNumbers;
  };
  
  return (
    <div data-testid="pagination" className={clsx('flex flex-col items-center my-6', className)}>
      <div className="flex items-center">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="pagination"
          data-testid="pagination-prev"
        >
          &lt;
        </Button>
        
        {renderPageNumbers()}
        
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="pagination"
          data-testid="pagination-next"
        >
          &gt;
        </Button>
      </div>
      
      <Text className="mt-2 text-gray-500 dark:text-gray-400" data-testid="pagination-info">
        {t('page')} {currentPage} {t('of')} {totalPages}
      </Text>
    </div>
  );
} 