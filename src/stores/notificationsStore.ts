import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  actionLabel?: string;
  icon?: string;
}

export interface NotificationPreferences {
  enabled: boolean;
  doNotDisturb: boolean;
  dndSchedule?: {
    start: string; // "22:00"
    end: string; // "08:00"
  };
  categories: {
    newsAlerts: boolean;
    priceAlerts: boolean;
    eventReminders: boolean;
    communityUpdates: boolean;
  };
  browserPush: boolean;
}

interface NotificationsState {
  notifications: Notification[];
  preferences: NotificationPreferences;
  unreadCount: number;

  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  clearReadNotifications: () => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  isDoNotDisturb: () => boolean;
  requestBrowserPermission: () => Promise<boolean>;
  showBrowserNotification: (title: string, options?: NotificationOptions) => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      preferences: {
        enabled: true,
        doNotDisturb: false,
        categories: {
          newsAlerts: true,
          priceAlerts: true,
          eventReminders: true,
          communityUpdates: true,
        },
        browserPush: false,
      },
      unreadCount: 0,

      addNotification: (notification) => {
        // Check if DND is active
        if (get().isDoNotDisturb()) {
          return;
        }

        const newNotification: Notification = {
          ...notification,
          id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          read: false,
          createdAt: new Date(),
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 100), // Keep last 100
          unreadCount: state.unreadCount + 1,
        }));

        // Show browser notification if enabled
        if (get().preferences.browserPush) {
          get().showBrowserNotification(notification.title, {
            body: notification.message,
            icon: notification.icon || '/favicon.ico',
          });
        }
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        }));
      },

      removeNotification: (id) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: notification && !notification.read
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        });
      },

      clearNotifications: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      clearReadNotifications: () => {
        set((state) => ({
          notifications: state.notifications.filter((n) => !n.read),
        }));
      },

      updatePreferences: (preferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        }));
      },

      isDoNotDisturb: () => {
        const { doNotDisturb, dndSchedule } = get().preferences;

        if (!doNotDisturb || !dndSchedule) return false;

        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}`;

        const { start, end } = dndSchedule;

        // Handle overnight schedules (e.g., 22:00 - 08:00)
        if (start > end) {
          return currentTime >= start || currentTime < end;
        } else {
          return currentTime >= start && currentTime < end;
        }
      },

      requestBrowserPermission: async () => {
        if (!('Notification' in window)) {
          console.warn('Browser does not support notifications');
          return false;
        }

        if (Notification.permission === 'granted') {
          set((state) => ({
            preferences: { ...state.preferences, browserPush: true },
          }));
          return true;
        }

        if (Notification.permission !== 'denied') {
          const permission = await Notification.requestPermission();
          const granted = permission === 'granted';
          set((state) => ({
            preferences: { ...state.preferences, browserPush: granted },
          }));
          return granted;
        }

        return false;
      },

      showBrowserNotification: (title, options) => {
        if (!('Notification' in window) || Notification.permission !== 'granted') {
          return;
        }

        new Notification(title, options);
      },
    }),
    {
      name: 'notifications-storage',
      partialize: (state) => ({
        notifications: state.notifications,
        preferences: state.preferences,
        unreadCount: state.unreadCount,
      }),
    }
  )
);
