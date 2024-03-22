import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import frTranslations from './fr.json';

const userLanguage = navigator.language || navigator.userLanguage;

const defaultLanguage = 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
  },
  lng: userLanguage || defaultLanguage, // Default language
  fallbackLng: 'en', // Fallback language if the specified language is not found
  detection: {
    order: ['navigator'], // Ordre de détection (priorité au navigateur)
  },
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
