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

export const listlanguages = [
  { id: 'en', label: 'English' },
  { id: 'fr', label: 'French' },
  { id: 'es', label: 'Spanish' },
  { id: 'de', label: 'German' },
  { id: 'it', label: 'Italian' },
  { id: 'pt', label: 'Portuguese' },
  { id: 'ru', label: 'Russian' },
  { id: 'zh', label: 'Chinese' },
  { id: 'ja', label: 'Japanese' },
  { id: 'ko', label: 'Korean' },
  { id: 'ar', label: 'Arabic' },
  { id: 'hi', label: 'Hindi' },
  { id: 'tr', label: 'Turkish' },
  { id: 'nl', label: 'Dutch' },
  { id: 'pl', label: 'Polish' },
  { id: 'sv', label: 'Swedish' },
  { id: 'fi', label: 'Finnish' },
  { id: 'da', label: 'Danish' },
  { id: 'no', label: 'Norwegian' },
  { id: 'el', label: 'Greek' },
];

const defaultLanguage = 'en';
const storedLanguage = localStorage.getItem('language');
const browserLanguage = navigator.language || navigator.userLanguage || defaultLanguage;
const languageCode = (storedLanguage || browserLanguage).split('-')[0];

// Find the language in the available languages, or default to 'en'
const userLanguage = listlanguages.find(lang => lang.id === languageCode) ? languageCode : defaultLanguage;

if (!storedLanguage) {
  localStorage.setItem('language', userLanguage);
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: userLanguage || defaultLanguage,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
