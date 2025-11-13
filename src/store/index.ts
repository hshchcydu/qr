import { create } from 'zustand';
import { User, NewsFilter, Alert } from '@/types';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;

  // News filter state
  newsFilter: NewsFilter;
  setNewsFilter: (filter: NewsFilter) => void;
  resetNewsFilter: () => void;

  // Sidebar state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;

  // Alerts state
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  removeAlert: (alertId: string) => void;
  updateAlert: (alertId: string, alert: Partial<Alert>) => void;

  // Theme state
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // User state
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),

  // News filter state
  newsFilter: {},
  setNewsFilter: (filter) => set({ newsFilter: filter }),
  resetNewsFilter: () => set({ newsFilter: {} }),

  // Sidebar state
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  // Alerts state
  alerts: [],
  addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
  removeAlert: (alertId) =>
    set((state) => ({ alerts: state.alerts.filter((a) => a.id !== alertId) })),
  updateAlert: (alertId, updatedAlert) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId ? { ...a, ...updatedAlert } : a
      ),
    })),

  // Theme state
  theme: 'light',
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
