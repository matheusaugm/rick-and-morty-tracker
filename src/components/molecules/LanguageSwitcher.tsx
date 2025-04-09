import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { Button } from '../atoms/Button';
import { useHtmlLang } from '../../hooks/useHtmlLang';

interface LanguageSwitcherProps {
  className?: string;
}

function normalizeLanguageCode(lang: string): string {
  return lang.toLowerCase().split('-')[0];
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation('common');
  const { changeLang, applyBrowserLanguage } = useHtmlLang();
  const currentLanguage = i18n.language || 'pt-BR';

  const handleLanguageChange = useCallback((lng: string) => {
    const currentBase = normalizeLanguageCode(currentLanguage);
    const newBase = normalizeLanguageCode(lng);

    if (currentBase === newBase) return;

    changeLang(lng);
    localStorage.setItem('i18nextLng', lng);
  }, [currentLanguage, changeLang]);
  
  const handleBrowserLanguage = useCallback(() => {
    applyBrowserLanguage();
  }, [applyBrowserLanguage]);

  useEffect(() => {
    const hasStoredLanguage = localStorage.getItem('i18nextLng');
    if (!hasStoredLanguage) {
      
      handleBrowserLanguage();
    }
  }, [handleBrowserLanguage]); 

  const isEnglish = currentLanguage.startsWith('en');
  const isPortuguese = currentLanguage.startsWith('pt');

  return (
    <div data-testid="language-switcher" className={cn('flex items-center gap-1', className)}>
      <Button
        data-testid="lang-en"
        onClick={() => handleLanguageChange('en-US')}
        variant={isEnglish ? "primary" : "ghost"}
        className={cn('py-1 px-2 text-xs font-medium min-w-8',
          isEnglish
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
        )}
      >
        EN
      </Button>
      <Button
        data-testid="lang-pt"
        onClick={() => handleLanguageChange('pt-BR')}
        variant={isPortuguese ? "primary" : "ghost"}
        className={cn('py-1 px-2 text-xs font-medium min-w-8',
          isPortuguese
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
        )}
      >
        PT
      </Button>
      <Button
        title={t('useBrowserLanguage', 'Use browser language')}
        data-testid="lang-browser"
        onClick={handleBrowserLanguage}
        variant="ghost"
        className="py-1 px-2 text-xs font-medium min-w-8 text-gray-300 hover:text-white hover:bg-gray-800/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </Button>
    </div>
  );
}