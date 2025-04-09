import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {setHtmlLang, getBrowserLanguage, normalizeLanguage} from './languageUtil';

import enUS from './locales/en-US';
import ptBR from './locales/pt-BR';

const browserLang = getBrowserLanguage();
const normalizedLang = normalizeLanguage(browserLang);

const initialLanguage = normalizedLang === 'en' ? 'en-US' : 'pt-BR';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            'en-US': enUS,
            'pt-BR': ptBR
        },
        fallbackLng: 'pt-BR',
        lng: initialLanguage,
        debug: import.meta.env.DEV,
        defaultNS: 'common',
        ns: ['common'],
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['navigator', 'localStorage'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },
        react: {
            useSuspense: false
        }
    });

setHtmlLang(browserLang);

i18n.on('languageChanged', (lng) => {
    setHtmlLang(lng);
});

export default i18n; 