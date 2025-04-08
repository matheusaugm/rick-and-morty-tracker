import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  initialValue?: string;
}

export function SearchBar({ onSearch, className = '', initialValue = '' }: SearchBarProps) {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form 
      data-testid="search-form"
      onSubmit={handleSubmit} 
      className={clsx('flex w-full items-center', className)}
    >
      <div className="flex-grow">
        <Input
          data-testid="search-input"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={t('searchPlaceholder')}
          className="rounded-r-none border-r-0"
        />
      </div>
      <Button 
        data-testid="search-button"
        variant="primary" 
        size="default"
        className="rounded-l-none bg-green-500 hover:bg-green-600"
      >
        {t('searchButton')}
      </Button>
    </form>
  );
} 