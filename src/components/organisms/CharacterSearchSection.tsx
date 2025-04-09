import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { SearchBar } from '../molecules/SearchBar';
import { Text } from '../atoms/Text';
import { ModeToggle } from '../atoms/ModeToggle';

interface CharacterSearchSectionProps {
  onSearch: (query: string) => void;
  className?: string;
  initialQuery?: string;
}

export function CharacterSearchSection({ 
  onSearch, 
  className = '',
  initialQuery = ''
}: CharacterSearchSectionProps) {
  const { t } = useTranslation('common');
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    if (query.trim().length === 0) {
      setSearchError(t('enterSearchTerm'));
      return;
    }
    
    setSearchError(null);
    onSearch(query);
  };

  return (
    <div data-testid="search-section" className={clsx('w-full max-w-4xl mx-auto', className)}>
      <div className="flex justify-between items-center mb-6">
        <Text variant="title" className="text-center text-green-500 dark:text-green-400">
          {t('title')}
        </Text>
        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </div>
      
      <SearchBar onSearch={handleSearch} initialValue={initialQuery} />
      
      {searchError && (
        <div data-testid="search-error" className="mt-2 text-red-500 dark:text-red-400 text-sm">
          {searchError}
        </div>
      )}
    </div>
  );
} 