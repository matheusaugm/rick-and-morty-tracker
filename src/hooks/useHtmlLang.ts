import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getHtmlLang, setHtmlLang, getBrowserLanguage, normalizeLanguage } from '../i18n/languageUtil';

/**
 * Hook for getting and setting the HTML lang attribute
 * Supports en, en-US and pt-BR, defaulting to pt-BR for any other language
 */
export function useHtmlLang() {
  const { i18n } = useTranslation();
  
  // When component mounts, ensure HTML lang attribute is set correctly
  useEffect(() => {
    // Get the browser language if no language set yet
    if (!i18n.language) {
      const browserLang = getBrowserLanguage();
      // Apply it immediately to HTML
      setHtmlLang(browserLang);
      
      // Map normalized language to specific locale for i18n
      const normalizedLang = normalizeLanguage(browserLang);
      const initialLanguage = normalizedLang === 'en' ? 'en-US' : 'pt-BR';
      
      i18n.changeLanguage(initialLanguage);
    }
  }, [i18n]);
  
  /**
   * Changes the application language and HTML lang attribute
   * @param lang The language code to set ('en-US', 'pt-BR', etc.)
   */
  const changeLang = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
    // setHtmlLang is called automatically via the languageChanged event listener
  }, [i18n]);
  
  /**
   * Gets the current HTML lang attribute
   */
  const getCurrentLang = useCallback((): string => {
    return getHtmlLang();
  }, []);
  
  /**
   * Gets the browser's language and applies it
   */
  const useBrowserLanguage = useCallback(() => {
    const browserLang = getBrowserLanguage();
    const normalizedLang = normalizeLanguage(browserLang);
    const mappedLanguage = normalizedLang === 'en' ? 'en-US' : 'pt-BR';
    
    changeLang(mappedLanguage);
  }, [changeLang]);
  
  return {
    currentLang: i18n.language,
    htmlLang: getCurrentLang(),
    changeLang,
    getCurrentLang,
    useBrowserLanguage
  };
} 