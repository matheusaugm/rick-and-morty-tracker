/**
 * Utility for handling language-related DOM operations
 */

/**
 * Gets the browser's preferred language
 * @returns The browser language code (e.g., 'en-US', 'pt-BR')
 */
export function getBrowserLanguage(): string {
  // Get browser language from navigator
  const browserLang = navigator.language || 
    // @ts-ignore - Some older browsers use languages array instead
    (navigator.languages && navigator.languages[0]) || 
    // @ts-ignore - For IE/older browsers
    navigator.userLanguage || 
    'pt-BR'; // Default fallback
    
  return browserLang;
}

/**
 * Normalize language code to supported options (en or pt-BR)
 * @param language The language code to normalize
 * @returns Normalized language code ('en' or 'pt-BR')
 */
export function normalizeLanguage(language: string): string {
  // Convert to lowercase for easier comparison
  const lowerLang = language.toLowerCase();
  
  // Check if it's an English variant
  if (lowerLang.startsWith('en')) {
    return 'en';
  }
  
  // Default to pt-BR for any other language
  return 'pt-BR';
}

/**
 * Sets the HTML lang attribute based on the current language
 * Supports en, en-US and pt-BR, defaulting to pt-BR for any other language
 */
export function setHtmlLang(language: string): void {
  const htmlElement = document.documentElement;
  const normalizedLang = normalizeLanguage(language);
  
  // Set the HTML lang attribute
  htmlElement.setAttribute('lang', normalizedLang);
}

/**
 * Gets the current HTML lang attribute
 */
export function getHtmlLang(): string {
  return document.documentElement.getAttribute('lang') || normalizeLanguage(getBrowserLanguage());
} 