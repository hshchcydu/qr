import { useState, useMemo } from 'react';
import { useAppStore } from '@/store';
import { formatRelativeTime } from '@/utils';
import ConfirmModal from '@/components/common/ConfirmModal';

type FilterType = 'all' | 'unread' | 'read' | 'archived';

const AlertHistory = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [clearConfirm, setClearConfirm] = useState(false);

  const alertHistory = useAppStore((state) => state.alertHistory);
  const markAlertAsRead = useAppStore((state) => state.markAlertAsRead);
  const markAlertAsUnread = useAppStore((state) => state.markAlertAsUnread);
  const archiveAlert = useAppStore((state) => state.archiveAlert);
  const deleteAlertHistory = useAppStore((state) => state.deleteAlertHistory);
  const clearAlertHistory = useAppStore((state) => state.clearAlertHistory);
  const showToast = useAppStore((state) => state.showToast);

  const filteredAlerts = useMemo(() => {
    let filtered = alertHistory;

    // Apply filter
    if (filter === 'unread') {
      filtered = filtered.filter((alert) => !alert.isRead && !alert.isArchived);
    } else if (filter === 'read') {
      filtered = filtered.filter((alert) => alert.isRead && !alert.isArchived);
    } else if (filter === 'archived') {
      filtered = filtered.filter((alert) => alert.isArchived);
    } else {
      filtered = filtered.filter((alert) => !alert.isArchived);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [alertHistory, filter, searchQuery]);

  const handleDelete = () => {
    if (deleteConfirm) {
      deleteAlertHistory(deleteConfirm);
      setDeleteConfirm(null);
      showToast('Alert deleted', 'success');
    }
  };

  const handleClearAll = () => {
    clearAlertHistory();
    setClearConfirm(false);
    showToast('Alert history cleared', 'success');
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'keyword':
        return '🏷️';
      case 'stock':
        return '📈';
      case 'economic':
        return '📊';
      case 'schedule':
        return '📅';
      default:
        return '🔔';
    }
  };

  const unreadCount = alertHistory.filter((a) => !a.isRead && !a.isArchived).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Alert History
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your past alert notifications
          </p>
        </div>
        {alertHistory.length > 0 && (
          <button
            onClick={() => setClearConfirm(true)}
            className="btn-secondary text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alerts..."
                className="input pr-10"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'unread'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-negative-500 text-white rounded-full text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'read'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
              }`}
            >
              Read
            </button>
            <button
              onClick={() => setFilter('archived')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'archived'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
              }`}
            >
              Archived
            </button>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="card text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-secondary-700 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {searchQuery ? 'No alerts found' : 'No alert history yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try adjusting your search query' : 'Your alert notifications will appear here'}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`card transition-all ${
                !alert.isRead && !alert.isArchived
                  ? 'border-l-4 border-primary-600 dark:border-primary-400'
                  : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <span className="text-3xl flex-shrink-0 mt-1">{getAlertIcon(alert.alertType)}</span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          {alert.title}
                        </h4>
                        {!alert.isRead && !alert.isArchived && (
                          <span className="badge bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs">
                            New
                          </span>
                        )}
                        {alert.isArchived && (
                          <span className="badge bg-gray-200 dark:bg-secondary-700 text-gray-600 dark:text-gray-400 text-xs">
                            Archived
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{alert.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {formatRelativeTime(alert.triggeredAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!alert.isArchived && (
                    <>
                      {alert.isRead ? (
                        <button
                          onClick={() => markAlertAsUnread(alert.id)}
                          className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          title="Mark as unread"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() => markAlertAsRead(alert.id)}
                          className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          title="Mark as read"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => archiveAlert(alert.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        title="Archive"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setDeleteConfirm(alert.id)}
                    className="p-2 text-gray-400 hover:text-negative-600 dark:hover:text-negative-400 transition-colors"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteConfirm !== null}
        title="Delete Alert"
        message="Are you sure you want to delete this alert? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(null)}
      />

      {/* Clear All Confirmation */}
      <ConfirmModal
        isOpen={clearConfirm}
        title="Clear Alert History"
        message="Are you sure you want to clear all alert history? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleClearAll}
        onCancel={() => setClearConfirm(false)}
      />
    </div>
  );
};

export default AlertHistory;
