import { useState } from 'react';
import { useAppStore } from '@/store';
import type { EconomicIndicatorAlert, AlertChannel } from '@/types';

const economicIndicators = [
  { id: 'CPI', name: 'Consumer Price Index (CPI)', icon: '📊' },
  { id: 'PPI', name: 'Producer Price Index (PPI)', icon: '🏭' },
  { id: 'PCE', name: 'Personal Consumption Expenditures (PCE)', icon: '💰' },
  { id: 'UNEMPLOYMENT', name: 'Unemployment Rate', icon: '👥' },
  { id: 'GDP', name: 'Gross Domestic Product (GDP)', icon: '📈' },
  { id: 'RETAIL_SALES', name: 'Retail Sales', icon: '🛒' },
  { id: 'FED_RATE', name: 'Fed Interest Rate Decision', icon: '🏦' },
  { id: 'HOUSING_STARTS', name: 'Housing Starts', icon: '🏠' },
  { id: 'PMI', name: 'Purchasing Managers Index (PMI)', icon: '📋' },
  { id: 'DURABLE_GOODS', name: 'Durable Goods Orders', icon: '🔧' },
];

const EconomicIndicatorAlerts = () => {
  const [selectedIndicator, setSelectedIndicator] = useState('');
  const [timing, setTiming] = useState<'before' | 'at'>('at');
  const [minutesBefore, setMinutesBefore] = useState('15');
  const [selectedChannels, setSelectedChannels] = useState<AlertChannel[]>(['push']);

  const economicAlerts = useAppStore((state) => state.economicAlerts);
  const addEconomicAlert = useAppStore((state) => state.addEconomicAlert);
  const removeEconomicAlert = useAppStore((state) => state.removeEconomicAlert);
  const toggleEconomicAlert = useAppStore((state) => state.toggleEconomicAlert);
  const showToast = useAppStore((state) => state.showToast);

  const handleAddAlert = () => {
    if (!selectedIndicator) {
      showToast('Please select an economic indicator', 'error');
      return;
    }

    // Check for duplicates
    if (economicAlerts.some((alert) => alert.indicator === selectedIndicator)) {
      showToast('Alert for this indicator already exists', 'error');
      return;
    }

    const indicator = economicIndicators.find((i) => i.id === selectedIndicator);
    if (!indicator) return;

    const newAlert: EconomicIndicatorAlert = {
      id: Date.now().toString(),
      indicator: indicator.name,
      timing,
      minutesBefore: timing === 'before' ? parseInt(minutesBefore) : undefined,
      isActive: true,
      channels: [...selectedChannels],
      createdAt: new Date(),
    };

    addEconomicAlert(newAlert);
    setSelectedIndicator('');
    showToast('Economic indicator alert added successfully', 'success');
  };

  const handleToggleChannel = (channel: AlertChannel) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const handleRemoveAlert = (alertId: string) => {
    removeEconomicAlert(alertId);
    showToast('Alert removed successfully', 'success');
  };

  const channels: { id: AlertChannel; label: string }[] = [
    { id: 'push', label: 'Push' },
    { id: 'email', label: 'Email' },
    { id: 'sms', label: 'SMS' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Economic Indicator Alerts
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Get notified about major economic data releases
        </p>
      </div>

      {/* Add Indicator Form */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Add Economic Indicator
        </h3>

        <div className="space-y-4">
          {/* Indicator Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Indicator
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {economicIndicators.map((indicator) => {
                const isAlreadyAdded = economicAlerts.some((alert) => alert.indicator === indicator.name);
                return (
                  <button
                    key={indicator.id}
                    onClick={() => !isAlreadyAdded && setSelectedIndicator(indicator.id)}
                    disabled={isAlreadyAdded}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      selectedIndicator === indicator.id
                        ? 'bg-primary-600 text-white'
                        : isAlreadyAdded
                        ? 'bg-gray-100 dark:bg-secondary-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                    }`}
                  >
                    <span className="text-2xl">{indicator.icon}</span>
                    <span className="text-sm font-medium">{indicator.name}</span>
                    {isAlreadyAdded && (
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notification Timing
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTiming('at')}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  timing === 'at'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                }`}
              >
                At Release
              </button>
              <button
                onClick={() => setTiming('before')}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  timing === 'before'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                }`}
              >
                Before Release
              </button>
            </div>
          </div>

          {/* Minutes Before (if timing is 'before') */}
          {timing === 'before' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minutes Before Release
              </label>
              <select value={minutesBefore} onChange={(e) => setMinutesBefore(e.target.value)} className="input">
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>
          )}

          {/* Notification Methods */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Notification Methods
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

          <button onClick={handleAddAlert} disabled={!selectedIndicator} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
            Add Economic Indicator Alert
          </button>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Active Economic Alerts ({economicAlerts.length})
        </h3>

        {economicAlerts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-secondary-700 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No economic alerts yet
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Add your first economic indicator to start monitoring
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {economicAlerts.map((alert) => {
              const indicator = economicIndicators.find((i) => i.name === alert.indicator);
              return (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-900/50 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {/* Toggle Switch */}
                    <button
                      onClick={() => toggleEconomicAlert(alert.id)}
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

                    {/* Indicator Icon */}
                    {indicator && <span className="text-2xl">{indicator.icon}</span>}

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {alert.indicator}
                        </span>
                        {!alert.isActive && (
                          <span className="badge bg-gray-200 dark:bg-secondary-700 text-gray-600 dark:text-gray-400 text-xs">
                            Disabled
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {alert.timing === 'before'
                          ? `${alert.minutesBefore} min before release`
                          : 'At release time'}{' '}
                        • {alert.channels.join(', ')}
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

export default EconomicIndicatorAlerts;
