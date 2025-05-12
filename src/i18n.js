// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import des fichiers JSON de traduction
import en from "./en.json";
import fr from "./fr.json";

// Création de l'objet resources
const resources = {
  en: { translation: en }, // Traduction pour l'anglais
  fr: { translation: fr }, // Traduction pour le français
};

// Liste des langues disponibles
export const listlanguages = [
  { id: "en", label: "English" },
  { id: "fr", label: "French" },
];

const defaultLanguage = "en"; // Langue par défaut
const storedLanguage = localStorage.getItem("language"); // Langue stockée dans le localStorage
const browserLanguage =
  navigator.language || navigator.userLanguage || defaultLanguage; // Langue du navigateur
const languageCode = (storedLanguage || browserLanguage).split("-")[0]; // Récupérer le code de langue (par exemple "en" ou "fr")

// Vérification si la langue existe dans la liste, sinon on utilise la langue par défaut (anglais)
const userLanguage = listlanguages.find((lang) => lang.id === languageCode)
  ? languageCode
  : defaultLanguage;

if (!storedLanguage) {
  localStorage.setItem("language", userLanguage); // Si aucune langue n'est définie, on la sauvegarde dans le localStorage
}

// Initialisation d'i18next avec les ressources de traduction
i18n.use(initReactI18next).init({
  resources, // Charger les ressources de traduction
  lng: userLanguage || defaultLanguage, // Langue actuelle
  fallbackLng: "en", // Langue de repli (si la langue demandée n'est pas trouvée)
  detection: {
    order: ["localStorage", "navigator"], // Priorité pour détecter la langue : localStorage puis navigateur
  },
  interpolation: {
    escapeValue: false, // Désactiver l'échappement de la valeur (utile pour React)
  },
});

export default i18n;
