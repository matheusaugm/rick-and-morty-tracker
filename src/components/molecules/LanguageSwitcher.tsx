import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { Button } from '../atoms/Button';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation('common');
  const currentLanguage = i18n.language || 'en-US';

  const changeLanguage = useCallback((lng: string) => {
    if (lng === currentLanguage) return;
    
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  }, [currentLanguage, i18n]);

  useEffect(() => {
    const handleInitialLanguage = () => {
      if (!currentLanguage || (!currentLanguage.startsWith('en') && !currentLanguage.startsWith('pt'))) {
        changeLanguage('en-US');
        return;
      }
      
      if (currentLanguage.startsWith('en') && currentLanguage !== 'en-US') {
        changeLanguage('en-US');
        return;
      }
      
      if (currentLanguage.startsWith('pt') && currentLanguage !== 'pt-BR') {
        changeLanguage('pt-BR');
      }
    };

    handleInitialLanguage();
  }, [currentLanguage, changeLanguage]);

  return (
    <div data-testid="language-switcher" className={cn('flex items-center gap-1', className)}>
      <Button
        data-testid="lang-en"
        onClick={() => changeLanguage('en-US')}
        variant={currentLanguage.startsWith('en') ? "primary" : "ghost"}
        className={cn('py-1 px-2 text-xs font-medium min-w-8', 
          currentLanguage.startsWith('en') 
            ? 'bg-green-600 text-white hover:bg-green-700' 
            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
        )}
      >
        EN
      </Button>
      <Button
        data-testid="lang-pt"
        onClick={() => changeLanguage('pt-BR')}
        variant={currentLanguage.startsWith('pt') ? "primary" : "ghost"}
        className={cn('py-1 px-2 text-xs font-medium min-w-8', 
          currentLanguage.startsWith('pt') 
            ? 'bg-green-600 text-white hover:bg-green-700' 
            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
        )}
      >
        PT
      </Button>
    </div>
  );
} 