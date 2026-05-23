import { create } from 'zustand';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return savedTheme;
    }
  }
  return 'light';
};

export const useStore = create((set) => ({
  user: null,
  theme: getInitialTheme(),
  lang: 'en',
  fontSize: 'normal', // normal, large, x-large
  highContrast: false,
  sidebarOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),

  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),

  setLang: (newLang) => set({ lang: newLang }),

  setFontSize: (size) => set(() => {
    document.documentElement.classList.remove('text-normal', 'text-large', 'text-xlarge');
    if(size === 'large') document.documentElement.classList.add('text-large');
    if(size === 'x-large') document.documentElement.classList.add('text-xlarge');
    return { fontSize: size };
  }),

  toggleHighContrast: () => set((state) => {
    const newHasHighContrast = !state.highContrast;
    if(newHasHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    return { highContrast: newHasHighContrast };
  }),

  setUser: (userData) => set({ user: userData }),
}));
