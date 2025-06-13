import i18next from "i18next";
import ko from "./locales/ko.json";

i18next.init({
  lng: "ko",
  fallbackLng: "ko",
  interpolation: { escapeValue: false },
  resources: {
    ko: { translation: ko },
  },
});

export default i18next;
export * as i18nextMiddleware from "i18next-http-middleware";
