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
    deleteConfirm: 'Are you sure you want to delete this event?',
    errorTitle: 'Oops! Something went wrong.',
    goHome: 'Go to Home',
    user: 'User',
    light: 'Light',
    dark: 'Dark',
    arabic: 'Ar',
    english: 'En',
    eventsTitle: 'EventHub',
    searchEvents: 'Search events...',
    allTypes: 'All Types',
    upcomingEvents: 'Upcoming Events',
    pastEvents: 'Past Events',
    loadingEvents: 'Loading events...',
    noEvents: 'No events found for this view.',
    pageLabel: 'Page',
    ofLabel: 'of',
    prev: 'Prev',
    next: 'Next',
    viewDetails: 'View Details',
    hideDetails: 'Hide Details',
    registeredAt: 'Registered at',
    educationLevel: 'Education level',
    motivation: 'Motivation',
    linkedinProfile: 'LinkedIn profile',
    noSubmissions: 'No submissions yet.',
    updating: 'Updating...',
    accept: 'Accept',
    registerForEvent: 'Register for Event',
    shareLinkedin: 'Share your LinkedIn URL so the organizers can reach you.',
    linkedinPlaceholder: 'https://linkedin.com/in/yourname',
    linkedinRequired: 'LinkedIn URL is required.',
    motivationRequired: 'Motivation is required.',
    motivationPlaceholder: 'Why do you want to join this event?',
    bachelors: 'Bachelors',
    masters: 'Masters',
    phd: 'PhD',
    other: 'Other',
    cancel: 'Cancel',
    submit: 'Submit',
    submitting: 'Submitting...',
    eventTitle: 'Event title',
    eventDescription: 'Short description',
    creating: 'Creating...',
    createEvent: 'Create Event',
    back: 'Back',
    deleteEvent: 'Delete Event',
    capacity: 'Capacity',
    applicants: 'Applicants',
    dateLabel: 'Date',
    timeLabel: 'Time',
    capacityLabel: 'Capacity',
    typeLabel: 'Type',
    dateUnavailable: 'Date unavailable',
    submissions: 'Submissions',
    loadingEvent: 'Loading event...',
    eventNotFound: 'Event not found.',
    missingEventId: 'Missing event id.',
    noPermissionCreate: 'You do not have permission to create events.',
    backToEvents: 'Back to Events',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    logsTitle: 'Logs',
    logsAction: 'Action',
    logsEntity: 'Entity',
    logsEntityId: 'Entity ID',
    logsAdminId: 'Admin ID',
    logsCreatedAt: 'Created At',
    noLogs: 'No logs found.',
    noPermissionLogs: 'You do not have permission to view logs.',
  },
  ar: {
    welcome: 'أهلاً،',
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
    deleteConfirm: 'هل أنت متأكد من حذف هذه الفعالية؟',
    errorTitle: 'عذراً! حدث خطأ',
    goHome: 'العودة إلى الرئيسية',
    user: 'مستخدم',
    light: 'فاتح',
    dark: 'غامق',
    arabic: 'عربي',
    english: 'English',
    eventsTitle: 'مركز الفعاليات',
    searchEvents: 'ابحث عن الفعاليات...',
    allTypes: 'كل الأنواع',
    upcomingEvents: 'الفعاليات القادمة',
    pastEvents: 'الفعاليات السابقة',
    loadingEvents: 'جاري تحميل الفعاليات...',
    noEvents: 'لا توجد فعاليات في هذا العرض.',
    pageLabel: 'صفحة',
    ofLabel: 'من',
    prev: 'السابق',
    next: 'التالي',
    viewDetails: 'عرض التفاصيل',
    hideDetails: 'إخفاء التفاصيل',
    registeredAt: 'تاريخ التقديم',
    educationLevel: 'المستوى الدراسي',
    motivation: 'سبب الانضمام',
    linkedinProfile: 'رابط لينكدان',
    noSubmissions: 'لا توجد مشاركات حتى الآن.',
    updating: 'جاري التحديث...',
    accept: 'قبول',
    registerForEvent: 'التسجيل للفعالية',
    shareLinkedin: 'اضف رابط لينكدان ليتم التواصل معك.',
    linkedinPlaceholder: 'https://linkedin.com/in/yourname',
    linkedinRequired: 'رابط لينكدان مطلوب.',
    motivationRequired: 'سبب الانضمام مطلوب.',
    motivationPlaceholder: 'لماذا تريد الانضمام لهذه الفعالية؟',
    bachelors: 'بكالوريوس',
    masters: 'ماجستير',
    phd: 'دكتوراه',
    other: 'أخرى',
    cancel: 'إلغاء',
    submit: 'إرسال',
    submitting: 'جاري الإرسال...',
    eventTitle: 'عنوان الفعالية',
    eventDescription: 'وصف قصير',
    creating: 'جاري الإنشاء...',
    createEvent: 'إنشاء فعالية',
    back: 'رجوع',
    deleteEvent: 'حذف الفعالية',
    capacity: 'السعة',
    applicants: 'عدد المتقدمين',
    dateLabel: 'التاريخ',
    timeLabel: 'الوقت',
    capacityLabel: 'السعة',
    typeLabel: 'النوع',
    dateUnavailable: 'التاريخ غير متوفر',
    submissions: 'المشاركات',
    loadingEvent: 'جاري تحميل الفعالية...',
    eventNotFound: 'لم يتم العثور على الفعالية.',
    missingEventId: 'معرف الفعالية مفقود.',
    noPermissionCreate: 'لا تملك صلاحية إنشاء فعاليات.',
    backToEvents: 'العودة إلى الفعاليات',
    pending: 'قيد الانتظار',
    approved: 'معتمد',
    rejected: 'مرفوض',
    logsTitle: 'السجلات',
    logsAction: 'الإجراء',
    logsEntity: 'الكيان',
    logsEntityId: 'معرّف الكيان',
    logsAdminId: 'معرّف المشرف',
    logsCreatedAt: 'تاريخ الإنشاء',
    noLogs: 'لا توجد سجلات.',
    noPermissionLogs: 'لا تملك صلاحية عرض السجلات.',
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
