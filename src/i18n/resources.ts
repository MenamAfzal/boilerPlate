import ar from "@/translations/translations/ar.json";
import en from "@/translations/translations/en.json";

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export type Language = keyof typeof resources;
