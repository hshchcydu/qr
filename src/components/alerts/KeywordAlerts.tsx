import { useState } from 'react';
import { useAppStore } from '@/store';
import type { KeywordAlert, AlertChannel } from '@/types';
import ConfirmModal from '@/components/common/ConfirmModal';

const KeywordAlerts = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<AlertChannel[]>(['push']);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const keywordAlerts = useAppStore((state) => state.keywordAlerts);
  const addKeywordAlert = useAppStore((state) => state.addKeywordAlert);
  const removeKeywordAlert = useAppStore((state) => state.removeKeywordAlert);
  const toggleKeywordAlert = useAppStore((state) => state.toggleKeywordAlert);
  const showToast = useAppStore((state) => state.showToast);

  const handleAddKeyword = () => {
    if (!keyword.trim()) {
      showToast('Please enter a keyword', 'error');
      return;
    }

    // Check for duplicates
    if (keywordAlerts.some((alert) => alert.keyword.toLowerCase() === keyword.toLowerCase())) {
      showToast('This keyword already exists', 'error');
      return;
    }

    const newAlert: KeywordAlert = {
      id: Date.now().toString(),
      keyword: keyword.trim(),
      isActive: true,
      channels: [...selectedChannels],
      createdAt: new Date(),
    };

    addKeywordAlert(newAlert);
    setKeyword('');
    showToast('Keyword alert added successfully', 'success');
  };

  const handleToggleChannel = (channel: AlertChannel) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const handleDeleteKeyword = () => {
    if (deleteConfirm) {
      removeKeywordAlert(deleteConfirm);
      setDeleteConfirm(null);
      showToast('Keyword alert deleted', 'success');
    }
  };

  const channels: { id: AlertChannel; label: string; icon: React.ReactNode }[] = [
    {
      id: 'push',
      label: 'Push',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      id: 'email',
      label: 'Email',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'sms',
      label: 'SMS',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Keyword Alerts
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Get notified when specific keywords appear in news articles
        </p>
      </div>

      {/* Add Keyword Form */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Add New Keyword
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Keyword
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                placeholder="e.g., NVIDIA, interest rate, inflation"
                className="input flex-1"
              />
              <button onClick={handleAddKeyword} className="btn-primary">
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Notification Methods
            </label>
            <div className="flex flex-wrap gap-2">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => handleToggleChannel(channel.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedChannels.includes(channel.id)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                  }`}
                >
                  {channel.icon}
                  <span>{channel.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyword List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Active Keywords ({keywordAlerts.length})
        </h3>

        {keywordAlerts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-secondary-700 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No keywords yet
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Add your first keyword to start receiving alerts
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {keywordAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-900/50 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  {/* Toggle Switch */}
                  <button
                    onClick={() => toggleKeywordAlert(alert.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      alert.isActive ? 'bg-positive-600' : 'bg-gray-300 dark:bg-secondary-700'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        alert.isActive ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>

                  {/* Keyword */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {alert.keyword}
                      </span>
                      {!alert.isActive && (
                        <span className="badge bg-gray-200 dark:bg-secondary-700 text-gray-600 dark:text-gray-400 text-xs">
                          Disabled
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {alert.channels.map((channel) => {
                        const channelInfo = channels.find((c) => c.id === channel);
                        return (
                          <span
                            key={channel}
                            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
                          >
                            {channelInfo?.icon}
                            {channelInfo?.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={() => setDeleteConfirm(alert.id)}
                  className="p-2 text-gray-400 hover:text-negative-600 dark:hover:text-negative-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm !== null}
        title="Delete Keyword Alert"
        message="Are you sure you want to delete this keyword alert? You will no longer receive notifications for this keyword."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDeleteKeyword}
        onCancel={() => setDeleteConfirm(null)}
      />
    </div>
  );
};

export default KeywordAlerts;
