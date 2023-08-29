import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import frTranslations from './fr.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language if the specified language is not found
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
