import { arTranslation } from "@app/_translations/ar";
import { enTranslation } from "@app/_translations/en";
import { esTranslation } from "@app/_translations/es";
import { frTranslation } from "@app/_translations/fr";
import { itTranslation } from "@app/_translations/it";
import { zhTranslation } from "@app/_translations/zh";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslation,
    },
    ar: {
      translation: arTranslation,
    },
    es: {
      translation: esTranslation,
    },
    fr: {
      translation: frTranslation,
    },
    it: {
      translation: itTranslation,
    },
    zh: {
      translation: zhTranslation,
    },
  },
});

export default i18n;
