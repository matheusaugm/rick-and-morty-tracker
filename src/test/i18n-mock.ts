import { vi } from 'vitest';
import { ReactNode } from 'react';

// Create a reusable mock for i18n
const createI18nMock = (language = 'en-US') => {
  const tFn = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'en-US': {
        changeLanguage: 'Change Language',
        en: 'English',
        pt: 'Portuguese',
        page: 'Page',
        of: 'of',
        searchPlaceholder: 'Search for a character...',
        searchButton: 'Search',
        close: 'Close',
        title: 'Rick and Morty Tracker',
        alive: 'Alive',
        dead: 'Dead',
        unknown: 'Unknown',
        enterSearchTerm: 'Please enter a search term'
      },
      'pt-BR': {
        changeLanguage: 'Mudar Idioma',
        en: 'Inglês',
        pt: 'Português',
        page: 'Página',
        of: 'de',
        searchPlaceholder: 'Buscar por um personagem...',
        searchButton: 'Buscar',
        close: 'Fechar',
        title: 'Rick e Morty',
        alive: 'Vivo',
        dead: 'Morto',
        unknown: 'Desconhecido',
        enterSearchTerm: 'Digite um termo para buscar'
      }
    };
    
    return translations[language]?.[key] || key;
  };
  
  const changeLanguageFn = vi.fn();
  
  const I18nextProvider = ({ children }: { children: ReactNode; i18n: unknown }) => children;
  
  return {
    useTranslation: () => ({
      t: tFn,
      i18n: {
        language,
        changeLanguage: changeLanguageFn
      }
    }),
    initReactI18next: {
      type: '3rdParty',
      init: () => {}
    },
    I18nextProvider
  };
};

const i18nMock = createI18nMock();

export { i18nMock, createI18nMock };

export default i18nMock;