// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { languages } from './languages';

// Dynamically load translations
const resources = Object.keys(languages).reduce((acc, lang) => {
  acc[lang] = {
    translation: require(`./${lang}.json`),
  };
  return acc;
}, {});

const userLanguage = navigator.language || navigator.userLanguage;
const defaultLanguage = 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: userLanguage || defaultLanguage,
    fallbackLng: 'en',
    detection: {
      order: ['navigator'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
