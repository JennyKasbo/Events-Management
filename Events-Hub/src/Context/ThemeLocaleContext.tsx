import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type Language = 'en' | 'ar';
type ThemeMode = 'light' | 'dark';

interface ThemeLocaleContextType {
  language: Language;
  theme: ThemeMode;
  setLanguage: (lang: Language) => void;
  setTheme: (mode: ThemeMode) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    welcome: 'Welcome,',
    admin: 'Admin',
    signInManage: 'Sign in to manage your events',
    forgotPassword: 'Forgot password?',
    login: 'Sign In',
    noAccount: `Don't have an account?`,
    register: 'Register',
    createAccount: 'Create Account',
    joinEvents: 'Join us and discover amazing events',
    alreadyAccount: 'Already have an account?',
    signIn: 'Sign in',
    yes: 'Yes',
    no: 'No',
    logoutConfirm: 'Are you sure you want to logout?',
    errorTitle: 'Oops! Something went wrong.',
    goHome: 'Go to Home',
    user: 'User',
    light: 'Light',
    dark: 'Dark',
    arabic: 'Arabic',
    english: 'English',
  },
  ar: {
    welcome: 'أهلاً,',
    admin: 'اّدمن',
    signInManage: 'سجّل الدخول لإدارة فعالياتك',
    forgotPassword: 'نسيت كلمة المرور؟',
    login: 'تسجيل الدخول',
    noAccount: 'ليس لديك حساب؟',
    register: 'إنشاء حساب',
    createAccount: 'إنشاء حساب',
    joinEvents: 'انضم إلينا واكتشف الفعاليات الرائعة',
    alreadyAccount: 'هل لديك حساب بالفعل؟',
    signIn: 'تسجيل الدخول',
    yes: 'نعم',
    no: 'لا',
    logoutConfirm: 'هل أنت متأكد من تسجيل الخروج؟',
    errorTitle: 'عذراً! حدث خطأ',
    goHome: 'العودة إلى الرئيسية',
    user: 'مستخدم',
    light: 'فاتح',
    dark: 'غامق',
    arabic: 'عربي',
    english: 'English',
  },
};

const ThemeLocaleContext = createContext<ThemeLocaleContextType | undefined>(undefined);

export const ThemeLocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    const storedLang = localStorage.getItem('app_language') as Language | null;
    const storedTheme = localStorage.getItem('app_theme') as ThemeMode | null;
    if (storedLang) setLanguageState(storedLang);
    if (storedTheme) setThemeState(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('app_language', language);
    localStorage.setItem('app_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language, theme]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const setTheme = (mode: ThemeMode) => setThemeState(mode);

  const t = useMemo(() => (key: string) => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <ThemeLocaleContext.Provider value={{ language, theme, setLanguage, setTheme, t }}>
      {children}
    </ThemeLocaleContext.Provider>
  );
};

export const useThemeLocale = () => {
  const context = useContext(ThemeLocaleContext);
  if (!context) throw new Error('useThemeLocale must be used within ThemeLocaleProvider');
  return context;
};
