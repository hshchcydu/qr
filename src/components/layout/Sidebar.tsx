import { useState } from 'react';
import { useAppStore } from '@/store';

const Sidebar = () => {
  const { isSidebarOpen } = useAppStore();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const marketIndices = [
    { name: 'S&P 500', value: '4,567.89', change: '+0.52', isPositive: true },
    { name: 'NASDAQ', value: '14,234.56', change: '+0.81', isPositive: true },
    { name: 'DOW', value: '35,678.12', change: '-0.23', isPositive: false },
    { name: 'VIX', value: '18.45', change: '-2.14', isPositive: false },
  ];

  const quickFilters = [
    { id: 'all', name: 'All News', count: 1234 },
    { id: 'stocks', name: 'Stocks', count: 456 },
    { id: 'crypto', name: 'Crypto', count: 234 },
    { id: 'earnings', name: 'Earnings', count: 123 },
    { id: 'economy', name: 'Economy', count: 321 },
  ];

  const trendingKeywords = [
    { keyword: 'Tesla', count: 234 },
    { keyword: 'Bitcoin', count: 189 },
    { keyword: 'Fed Meeting', count: 156 },
    { keyword: 'Tech Stocks', count: 142 },
    { keyword: 'Oil Prices', count: 128 },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-secondary-900 border-r border-gray-200 dark:border-secondary-700 transition-all duration-300 z-30 overflow-y-auto animate-slide-in ${
          isSidebarOpen ? 'w-72' : 'w-0 -translate-x-full'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Market Indices */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Market Indices
            </h3>
            <div className="space-y-2">
              {marketIndices.map((index) => (
                <div
                  key={index.name}
                  className="p-3 bg-gray-50 dark:bg-secondary-800 rounded-lg hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {index.name}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        index.isPositive
                          ? 'text-positive-600 dark:text-positive-400'
                          : 'text-negative-600 dark:text-negative-400'
                      }`}
                    >
                      {index.change}%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {index.value}
                    </span>
                    <svg
                      className={`w-4 h-4 ${
                        index.isPositive
                          ? 'text-positive-600 dark:text-positive-400 rotate-0'
                          : 'text-negative-600 dark:text-negative-400 rotate-180'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Quick Filters
            </h3>
            <div className="space-y-1">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedFilter === filter.id
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-800'
                  }`}
                >
                  <span>{filter.name}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedFilter === filter.id
                        ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                        : 'bg-gray-200 dark:bg-secondary-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Trending Keywords */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Trending Now
            </h3>
            <div className="space-y-2">
              {trendingKeywords.map((item, index) => (
                <div
                  key={item.keyword}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-secondary-800 transition-all cursor-pointer group"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {item.keyword}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.count} mentions
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Alert Settings */}
          <div className="p-4 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl border border-primary-100 dark:border-primary-900/30">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Quick Alerts
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Set up custom alerts
                </p>
              </div>
              <button className="p-1.5 bg-white dark:bg-secondary-800 rounded-lg shadow-sm hover:shadow-md transition-all">
                <svg
                  className="w-4 h-4 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-positive-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  3 Active alerts
                </span>
              </div>
              <button className="w-full py-2 px-3 bg-white dark:bg-secondary-800 hover:bg-gray-50 dark:hover:bg-secondary-700 border border-gray-200 dark:border-secondary-600 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg transition-all">
                Manage Alerts →
              </button>
            </div>
          </div>

          {/* Real-time Status */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-secondary-800 rounded-lg">
            <div className="w-2 h-2 bg-positive-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Live updates active
            </span>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden animate-fade-in"
          onClick={() => useAppStore.getState().toggleSidebar()}
        />
      )}
    </>
  );
};

export default Sidebar;
