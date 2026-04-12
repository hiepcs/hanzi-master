import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import vi from './vi';
import en from './en';

const translations = { vi, en };
const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useLocalStorage('hanzi:lang', 'en');
  const t = useCallback((key) => translations[lang]?.[key] ?? key, [lang]);
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
