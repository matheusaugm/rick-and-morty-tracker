import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Button } from '../atoms/Button';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation('common');
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
    <div data-testid="language-switcher" className={clsx('flex items-center space-x-2', className)}>
      <span data-testid="language-label" className="text-sm text-gray-600">{t('changeLanguage')}:</span>
      <div className="flex space-x-1">
        <Button
          data-testid="lang-en"
          onClick={() => changeLanguage('en-US')}
          variant="secondary"
          className={clsx('py-1 px-2 text-sm', {
            'bg-blue-100 border border-blue-500': currentLanguage.startsWith('en'),
          })}
        >
          {t('en')}
        </Button>
        <Button
          data-testid="lang-pt"
          onClick={() => changeLanguage('pt-BR')}
          variant="secondary"
          className={clsx('py-1 px-2 text-sm', {
            'bg-blue-100 border border-blue-500': currentLanguage.startsWith('pt'),
          })}
        >
          {t('pt')}
        </Button>
      </div>
    </div>
  );
} 