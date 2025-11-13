import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  NewsFilter,
  Alert,
  KeywordAlert,
  StockAlert,
  EconomicIndicatorAlert,
  ScheduleAlert,
  AlertHistoryItem
} from '@/types';

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

  // Alerts state (legacy)
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  removeAlert: (alertId: string) => void;
  updateAlert: (alertId: string, alert: Partial<Alert>) => void;

  // Keyword Alerts
  keywordAlerts: KeywordAlert[];
  addKeywordAlert: (alert: KeywordAlert) => void;
  removeKeywordAlert: (alertId: string) => void;
  updateKeywordAlert: (alertId: string, alert: Partial<KeywordAlert>) => void;
  toggleKeywordAlert: (alertId: string) => void;

  // Stock Alerts
  stockAlerts: StockAlert[];
  addStockAlert: (alert: StockAlert) => void;
  removeStockAlert: (alertId: string) => void;
  updateStockAlert: (alertId: string, alert: Partial<StockAlert>) => void;
  toggleStockAlert: (alertId: string) => void;

  // Economic Indicator Alerts
  economicAlerts: EconomicIndicatorAlert[];
  addEconomicAlert: (alert: EconomicIndicatorAlert) => void;
  removeEconomicAlert: (alertId: string) => void;
  updateEconomicAlert: (alertId: string, alert: Partial<EconomicIndicatorAlert>) => void;
  toggleEconomicAlert: (alertId: string) => void;

  // Schedule Alerts
  scheduleAlerts: ScheduleAlert[];
  addScheduleAlert: (alert: ScheduleAlert) => void;
  removeScheduleAlert: (alertId: string) => void;
  updateScheduleAlert: (alertId: string, alert: Partial<ScheduleAlert>) => void;
  toggleScheduleAlert: (alertId: string) => void;

  // Alert History
  alertHistory: AlertHistoryItem[];
  addAlertHistory: (item: AlertHistoryItem) => void;
  markAlertAsRead: (id: string) => void;
  markAlertAsUnread: (id: string) => void;
  archiveAlert: (id: string) => void;
  deleteAlertHistory: (id: string) => void;
  clearAlertHistory: () => void;

  // Toast notifications
  toast: { id: string; message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  hideToast: () => void;

  // Theme state
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
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

      // Alerts state (legacy)
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

      // Keyword Alerts
      keywordAlerts: [],
      addKeywordAlert: (alert) =>
        set((state) => ({ keywordAlerts: [...state.keywordAlerts, alert] })),
      removeKeywordAlert: (alertId) =>
        set((state) => ({
          keywordAlerts: state.keywordAlerts.filter((a) => a.id !== alertId),
        })),
      updateKeywordAlert: (alertId, updatedAlert) =>
        set((state) => ({
          keywordAlerts: state.keywordAlerts.map((a) =>
            a.id === alertId ? { ...a, ...updatedAlert } : a
          ),
        })),
      toggleKeywordAlert: (alertId) =>
        set((state) => ({
          keywordAlerts: state.keywordAlerts.map((a) =>
            a.id === alertId ? { ...a, isActive: !a.isActive } : a
          ),
        })),

      // Stock Alerts
      stockAlerts: [],
      addStockAlert: (alert) =>
        set((state) => ({ stockAlerts: [...state.stockAlerts, alert] })),
      removeStockAlert: (alertId) =>
        set((state) => ({
          stockAlerts: state.stockAlerts.filter((a) => a.id !== alertId),
        })),
      updateStockAlert: (alertId, updatedAlert) =>
        set((state) => ({
          stockAlerts: state.stockAlerts.map((a) =>
            a.id === alertId ? { ...a, ...updatedAlert } : a
          ),
        })),
      toggleStockAlert: (alertId) =>
        set((state) => ({
          stockAlerts: state.stockAlerts.map((a) =>
            a.id === alertId ? { ...a, isActive: !a.isActive } : a
          ),
        })),

      // Economic Indicator Alerts
      economicAlerts: [],
      addEconomicAlert: (alert) =>
        set((state) => ({ economicAlerts: [...state.economicAlerts, alert] })),
      removeEconomicAlert: (alertId) =>
        set((state) => ({
          economicAlerts: state.economicAlerts.filter((a) => a.id !== alertId),
        })),
      updateEconomicAlert: (alertId, updatedAlert) =>
        set((state) => ({
          economicAlerts: state.economicAlerts.map((a) =>
            a.id === alertId ? { ...a, ...updatedAlert } : a
          ),
        })),
      toggleEconomicAlert: (alertId) =>
        set((state) => ({
          economicAlerts: state.economicAlerts.map((a) =>
            a.id === alertId ? { ...a, isActive: !a.isActive } : a
          ),
        })),

      // Schedule Alerts
      scheduleAlerts: [],
      addScheduleAlert: (alert) =>
        set((state) => ({ scheduleAlerts: [...state.scheduleAlerts, alert] })),
      removeScheduleAlert: (alertId) =>
        set((state) => ({
          scheduleAlerts: state.scheduleAlerts.filter((a) => a.id !== alertId),
        })),
      updateScheduleAlert: (alertId, updatedAlert) =>
        set((state) => ({
          scheduleAlerts: state.scheduleAlerts.map((a) =>
            a.id === alertId ? { ...a, ...updatedAlert } : a
          ),
        })),
      toggleScheduleAlert: (alertId) =>
        set((state) => ({
          scheduleAlerts: state.scheduleAlerts.map((a) =>
            a.id === alertId ? { ...a, isActive: !a.isActive } : a
          ),
        })),

      // Alert History
      alertHistory: [],
      addAlertHistory: (item) =>
        set((state) => ({ alertHistory: [item, ...state.alertHistory] })),
      markAlertAsRead: (id) =>
        set((state) => ({
          alertHistory: state.alertHistory.map((item) =>
            item.id === id ? { ...item, isRead: true } : item
          ),
        })),
      markAlertAsUnread: (id) =>
        set((state) => ({
          alertHistory: state.alertHistory.map((item) =>
            item.id === id ? { ...item, isRead: false } : item
          ),
        })),
      archiveAlert: (id) =>
        set((state) => ({
          alertHistory: state.alertHistory.map((item) =>
            item.id === id ? { ...item, isArchived: true } : item
          ),
        })),
      deleteAlertHistory: (id) =>
        set((state) => ({
          alertHistory: state.alertHistory.filter((item) => item.id !== id),
        })),
      clearAlertHistory: () => set({ alertHistory: [] }),

      // Toast notifications
      toast: null,
      showToast: (message, type) =>
        set({ toast: { id: Date.now().toString(), message, type } }),
      hideToast: () => set({ toast: null }),

      // Theme state
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'investment-news-storage',
      partialize: (state) => ({
        keywordAlerts: state.keywordAlerts,
        stockAlerts: state.stockAlerts,
        economicAlerts: state.economicAlerts,
        scheduleAlerts: state.scheduleAlerts,
        alertHistory: state.alertHistory,
        theme: state.theme,
      }),
    }
  )
);
