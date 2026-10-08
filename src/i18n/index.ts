import { en } from './en';
import { ta } from './ta';
import { hi } from './hi';

export type SupportedLanguage = 'en' | 'ta' | 'hi';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

export const translations = {
  en,
  ta,
  hi,
};

export type Translations = typeof en;

export function getTranslation(lang: SupportedLanguage): Translations {
  return translations[lang] || translations.en;
}
