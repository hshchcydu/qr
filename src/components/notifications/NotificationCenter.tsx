import { useState } from 'react';
import { useNotificationsStore } from '@/stores/notificationsStore';
import { Bell, X, Check, Settings, CheckCheck } from 'lucide-react';
import { formatRelativeTime } from '@/utils';
import { Link } from 'react-router-dom';

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearReadNotifications,
    clearNotifications,
  } = useNotificationsStore();

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'error':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-[600px] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Settings"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions Bar */}
            {notifications.length > 0 && (
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1"
                >
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearReadNotifications}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Clear read
                  </button>
                  <button
                    onClick={clearNotifications}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${getNotificationColor(
                            notification.type
                          )}`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h4>
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              title="Remove"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {formatRelativeTime(notification.createdAt)}
                            </span>

                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <button
                                  onClick={() => handleNotificationClick(notification.id)}
                                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1"
                                >
                                  <Check className="h-3 w-3" />
                                  Mark as read
                                </button>
                              )}

                              {notification.actionUrl && (
                                <Link
                                  to={notification.actionUrl}
                                  onClick={() => {
                                    handleNotificationClick(notification.id);
                                    setIsOpen(false);
                                  }}
                                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                                >
                                  {notification.actionLabel || 'View'}
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
