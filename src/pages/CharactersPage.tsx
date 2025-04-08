import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CharacterTemplate } from '../components/templates/CharacterTemplate';
import { CharacterSearchSection } from '../components/organisms/CharacterSearchSection';
import { CharacterGrid } from '../components/organisms/CharacterGrid';
import { CharacterGridSkeleton } from '../components/organisms/CharacterGridSkeleton';
import { Pagination } from '../components/molecules/Pagination';
import { useCharacters } from '../hooks/useCharacters';
import { FontToggle } from '../components/atoms/FontToggle';
import { useFontPreference } from '../contexts/FontContext';

export function CharactersPage() {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { isRickMode, toggleFontMode } = useFontPreference();
  
  const { 
    data, 
    isLoading, 
    isError, 
    error,
    isFetching,
  } = useCharacters({ 
    page: currentPage, 
    name: searchQuery 
  });

  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const renderContent = () => {

    if (isLoading || isFetching) {
      return <CharacterGridSkeleton className="mt-8" />;
    }
    
    if (isError) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : t('errorLoading');
      
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500 dark:text-red-400 text-lg">{errorMessage}</p>
        </div>
      );
    }
    
    if (!data || data.results.length === 0) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400 text-lg">{t('noCharactersFound')}</p>
        </div>
      );
    }
    
    return (
      <>
        <CharacterGrid characters={data.results} className="mt-8" />
        
        {data.info.pages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.info.pages}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        )}
      </>
    );
  };
  
  return (
    <CharacterTemplate
      header={
        <>
          <div className="flex justify-end mb-4">
            <FontToggle 
              isRickMode={isRickMode} 
              onToggle={toggleFontMode} 
            />
          </div>
          <CharacterSearchSection 
            onSearch={handleSearch}
            initialQuery={searchQuery}
          />
        </>
      }
      content={renderContent()}
    />
  );
} 