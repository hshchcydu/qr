import { useState } from 'react';
import { useAppStore } from '@/store';
import type { ScheduleAlert, AlertChannel } from '@/types';

const scheduleTypes = [
  {
    id: 'daily-open' as const,
    name: 'Daily Market Open Summary',
    description: 'Get a summary of pre-market news and trends before market opens',
    icon: '🌅',
  },
  {
    id: 'daily-close' as const,
    name: 'Daily Market Close Summary',
    description: 'Review daily market performance and after-hours news',
    icon: '🌇',
  },
  {
    id: 'weekly-review' as const,
    name: 'Weekly Portfolio Review',
    description: 'Weekly recap of market movements and portfolio performance',
    icon: '📅',
  },
  {
    id: 'monthly-calendar' as const,
    name: 'Monthly Economic Calendar',
    description: 'Upcoming economic events and earnings for the month',
    icon: '📆',
  },
];

const ScheduleAlerts = () => {
  const [selectedType, setSelectedType] = useState<'daily-open' | 'daily-close' | 'weekly-review' | 'monthly-calendar' | null>(null);
  const [time, setTime] = useState('09:00');
  const [dayOfWeek, setDayOfWeek] = useState('1');
  const [dayOfMonth, setDayOfMonth] = useState('1');
  const [selectedChannels, setSelectedChannels] = useState<AlertChannel[]>(['email']);

  const scheduleAlerts = useAppStore((state) => state.scheduleAlerts);
  const addScheduleAlert = useAppStore((state) => state.addScheduleAlert);
  const removeScheduleAlert = useAppStore((state) => state.removeScheduleAlert);
  const toggleScheduleAlert = useAppStore((state) => state.toggleScheduleAlert);
  const showToast = useAppStore((state) => state.showToast);

  const handleAddAlert = () => {
    if (!selectedType) {
      showToast('Please select a schedule type', 'error');
      return;
    }

    // Check for duplicates
    if (scheduleAlerts.some((alert) => alert.type === selectedType)) {
      showToast('This schedule alert already exists', 'error');
      return;
    }

    const newAlert: ScheduleAlert = {
      id: Date.now().toString(),
      type: selectedType,
      time: selectedType === 'daily-open' || selectedType === 'daily-close' ? time : undefined,
      dayOfWeek: selectedType === 'weekly-review' ? parseInt(dayOfWeek) : undefined,
      dayOfMonth: selectedType === 'monthly-calendar' ? parseInt(dayOfMonth) : undefined,
      isActive: true,
      channels: [...selectedChannels],
      createdAt: new Date(),
    };

    addScheduleAlert(newAlert);
    setSelectedType(null);
    setTime('09:00');
    showToast('Schedule alert added successfully', 'success');
  };

  const handleToggleChannel = (channel: AlertChannel) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const handleRemoveAlert = (alertId: string) => {
    removeScheduleAlert(alertId);
    showToast('Schedule alert removed', 'success');
  };

  const getAlertSchedule = (alert: ScheduleAlert) => {
    switch (alert.type) {
      case 'daily-open':
      case 'daily-close':
        return `Every day at ${alert.time}`;
      case 'weekly-review':
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `Every ${days[alert.dayOfWeek || 1]}`;
      case 'monthly-calendar':
        return `On the ${alert.dayOfMonth}${getOrdinalSuffix(alert.dayOfMonth || 1)} of each month`;
      default:
        return '';
    }
  };

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const channels: { id: AlertChannel; label: string }[] = [
    { id: 'email', label: 'Email' },
    { id: 'push', label: 'Push' },
    { id: 'sms', label: 'SMS' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Scheduled Reports
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Receive regular market summaries and updates on your schedule
        </p>
      </div>

      {/* Schedule Type Selection */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Add Scheduled Report
        </h3>

        <div className="space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Report Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {scheduleTypes.map((type) => {
                const isAlreadyAdded = scheduleAlerts.some((alert) => alert.type === type.id);
                return (
                  <button
                    key={type.id}
                    onClick={() => !isAlreadyAdded && setSelectedType(type.id)}
                    disabled={isAlreadyAdded}
                    className={`flex items-start gap-3 px-4 py-4 rounded-lg text-left transition-all ${
                      selectedType === type.id
                        ? 'bg-primary-600 text-white'
                        : isAlreadyAdded
                        ? 'bg-gray-100 dark:bg-secondary-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                    }`}
                  >
                    <span className="text-3xl flex-shrink-0">{type.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{type.name}</div>
                      <div className={`text-xs ${selectedType === type.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {type.description}
                      </div>
                      {isAlreadyAdded && (
                        <div className="mt-2 flex items-center gap-1 text-xs">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Already added
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Schedule Settings */}
          {selectedType && (
            <>
              {(selectedType === 'daily-open' || selectedType === 'daily-close') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time
                  </label>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input max-w-xs" />
                </div>
              )}

              {selectedType === 'weekly-review' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Day of Week
                  </label>
                  <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} className="input max-w-xs">
                    <option value="0">Sunday</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                  </select>
                </div>
              )}

              {selectedType === 'monthly-calendar' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Day of Month
                  </label>
                  <select value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} className="input max-w-xs">
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Notification Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Delivery Method
                </label>
                <div className="flex flex-wrap gap-2">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => handleToggleChannel(channel.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedChannels.includes(channel.id)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                      }`}
                    >
                      {channel.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleAddAlert} className="btn-primary w-full">
                Add Scheduled Report
              </button>
            </>
          )}
        </div>
      </div>

      {/* Active Schedules */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Active Schedules ({scheduleAlerts.length})
        </h3>

        {scheduleAlerts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-secondary-700 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No scheduled reports yet
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Add your first scheduled report to stay informed
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {scheduleAlerts.map((alert) => {
              const scheduleType = scheduleTypes.find((t) => t.id === alert.type);
              return (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-900/50 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {/* Toggle Switch */}
                    <button
                      onClick={() => toggleScheduleAlert(alert.id)}
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

                    {/* Icon */}
                    {scheduleType && <span className="text-2xl">{scheduleType.icon}</span>}

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {scheduleType?.name}
                        </span>
                        {!alert.isActive && (
                          <span className="badge bg-gray-200 dark:bg-secondary-700 text-gray-600 dark:text-gray-400 text-xs">
                            Disabled
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {getAlertSchedule(alert)} • {alert.channels.join(', ')}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => handleRemoveAlert(alert.id)}
                    className="p-2 text-gray-400 hover:text-negative-600 dark:hover:text-negative-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleAlerts;
