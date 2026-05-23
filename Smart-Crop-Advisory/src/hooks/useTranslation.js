import { useTranslation as useCtxTranslation, useLanguage as useCtxLanguage } from '../context/LanguageContext';

export const useTranslation = () => {
  return useCtxTranslation();
};

export const useLanguage = () => {
  return useCtxLanguage();
};
