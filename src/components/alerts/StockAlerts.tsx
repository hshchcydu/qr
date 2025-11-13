import { useState } from 'react';
import { useAppStore } from '@/store';
import type { StockAlert, AlertChannel } from '@/types';
import ConfirmModal from '@/components/common/ConfirmModal';

// Mock stock data
const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
];

const StockAlerts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<{ symbol: string; name: string } | null>(null);
  const [alertType, setAlertType] = useState<'price' | 'percentage' | 'volume' | 'earnings' | 'news'>('price');
  const [operator, setOperator] = useState<'above' | 'below'>('above');
  const [value, setValue] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<AlertChannel[]>(['push']);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const stockAlerts = useAppStore((state) => state.stockAlerts);
  const addStockAlert = useAppStore((state) => state.addStockAlert);
  const removeStockAlert = useAppStore((state) => state.removeStockAlert);
  const toggleStockAlert = useAppStore((state) => state.toggleStockAlert);
  const showToast = useAppStore((state) => state.showToast);

  const filteredStocks = mockStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAlert = () => {
    if (!selectedStock) {
      showToast('Please select a stock', 'error');
      return;
    }

    if ((alertType === 'price' || alertType === 'percentage') && !value) {
      showToast('Please enter a value', 'error');
      return;
    }

    const newAlert: StockAlert = {
      id: Date.now().toString(),
      symbol: selectedStock.symbol,
      companyName: selectedStock.name,
      type: alertType,
      condition:
        alertType === 'price' || alertType === 'percentage'
          ? { operator, value: parseFloat(value) }
          : undefined,
      isActive: true,
      channels: [...selectedChannels],
      createdAt: new Date(),
    };

    addStockAlert(newAlert);
    setSelectedStock(null);
    setValue('');
    setSearchQuery('');
    showToast('Stock alert added successfully', 'success');
  };

  const handleToggleChannel = (channel: AlertChannel) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const handleDeleteAlert = () => {
    if (deleteConfirm) {
      removeStockAlert(deleteConfirm);
      setDeleteConfirm(null);
      showToast('Stock alert deleted', 'success');
    }
  };

  const getAlertDescription = (alert: StockAlert) => {
    switch (alert.type) {
      case 'price':
        return `Price ${alert.condition?.operator} $${alert.condition?.value}`;
      case 'percentage':
        return `${alert.condition?.operator === 'above' ? '+' : ''}${alert.condition?.value}% change`;
      case 'volume':
        return 'Volume spike detected';
      case 'earnings':
        return 'Earnings announcement';
      case 'news':
        return 'News mentions';
      default:
        return '';
    }
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
          Stock Alerts
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor price movements, volume spikes, and important company events
        </p>
      </div>

      {/* Add Stock Alert Form */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Add New Stock Alert
        </h3>

        <div className="space-y-4">
          {/* Stock Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Company
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedStock(null);
                }}
                placeholder="Search by symbol or name..."
                className="input pr-10"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Stock Dropdown */}
            {searchQuery && !selectedStock && (
              <div className="mt-2 max-h-60 overflow-y-auto bg-white dark:bg-secondary-800 border border-gray-200 dark:border-secondary-700 rounded-lg shadow-lg">
                {filteredStocks.length > 0 ? (
                  filteredStocks.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => {
                        setSelectedStock(stock);
                        setSearchQuery(stock.symbol);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors"
                    >
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {stock.symbol}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stock.name}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    No stocks found
                  </div>
                )}
              </div>
            )}

            {selectedStock && (
              <div className="mt-2 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-semibold text-primary-700 dark:text-primary-300">
                    {selectedStock.symbol}
                  </div>
                  <div className="text-sm text-primary-600 dark:text-primary-400">
                    {selectedStock.name}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedStock(null);
                    setSearchQuery('');
                  }}
                  className="p-1 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Alert Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Alert Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {(['price', 'percentage', 'volume', 'earnings', 'news'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setAlertType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    alertType === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Condition (for price and percentage) */}
          {(alertType === 'price' || alertType === 'percentage') && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Condition
                </label>
                <select
                  value={operator}
                  onChange={(e) => setOperator(e.target.value as 'above' | 'below')}
                  className="input"
                >
                  <option value="above">Above</option>
                  <option value="below">Below</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Value {alertType === 'price' ? '($)' : '(%)'}
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={alertType === 'price' ? '100.00' : '5'}
                  step={alertType === 'price' ? '0.01' : '0.1'}
                  className="input"
                />
              </div>
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

          <button onClick={handleAddAlert} className="btn-primary w-full">
            Add Stock Alert
          </button>
        </div>
      </div>

      {/* Stock Alerts List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Active Stock Alerts ({stockAlerts.length})
        </h3>

        {stockAlerts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-secondary-700 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No stock alerts yet
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Add your first stock alert to start monitoring
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {stockAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-900/50 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  {/* Toggle Switch */}
                  <button
                    onClick={() => toggleStockAlert(alert.id)}
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

                  {/* Stock Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary-600 dark:text-primary-400">
                        ${alert.symbol}
                      </span>
                      <span className="badge badge-info text-xs capitalize">{alert.type}</span>
                      {!alert.isActive && (
                        <span className="badge bg-gray-200 dark:bg-secondary-700 text-gray-600 dark:text-gray-400 text-xs">
                          Disabled
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {alert.companyName} • {getAlertDescription(alert)}
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
        title="Delete Stock Alert"
        message="Are you sure you want to delete this stock alert? You will no longer receive notifications for this stock."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDeleteAlert}
        onCancel={() => setDeleteConfirm(null)}
      />
    </div>
  );
};

export default StockAlerts;
