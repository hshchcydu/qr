import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { generateTrendingTickers } from '@/utils/mockDashboardData';
import type { TrendingTicker } from '@/utils/mockDashboardData';

const TrendingTickers = () => {
  const [tickers, setTickers] = useState<TrendingTicker[]>([]);
  const [selectedView, setSelectedView] = useState<'chart' | 'list'>('chart');

  useEffect(() => {
    setTickers(generateTrendingTickers());

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      setTickers(generateTrendingTickers());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '#10b981'; // green-500
      case 'negative':
        return '#ef4444'; // red-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-secondary-800 p-3 rounded-lg shadow-strong border border-gray-200 dark:border-secondary-700">
          <p className="font-bold text-gray-900 dark:text-gray-100">${data.symbol}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.name}</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1">
            {data.mentions.toLocaleString()} mentions
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-sm font-medium ${
              data.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {data.change >= 0 ? '+' : ''}{data.change}%
            </span>
            <span className={`badge text-xs ${
              data.sentiment === 'positive'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : data.sentiment === 'negative'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}>
              {data.sentiment}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📈</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Trending Tickers</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedView('chart')}
            className={`p-2 rounded-lg transition-colors ${
              selectedView === 'chart'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-secondary-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-secondary-600'
            }`}
            title="Chart View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
          <button
            onClick={() => setSelectedView('list')}
            className={`p-2 rounded-lg transition-colors ${
              selectedView === 'list'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-secondary-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-secondary-600'
            }`}
            title="List View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {selectedView === 'chart' ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tickers} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
              <XAxis
                dataKey="symbol"
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fill: 'currentColor', fontSize: 12 }}
                stroke="currentColor"
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis
                tick={{ fill: 'currentColor', fontSize: 12 }}
                stroke="currentColor"
                className="text-gray-600 dark:text-gray-400"
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
              <Bar dataKey="mentions" radius={[8, 8, 0, 0]}>
                {tickers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getSentimentColor(entry.sentiment)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {tickers.map((ticker, index) => (
            <div
              key={ticker.symbol}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-secondary-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-200 dark:bg-secondary-700 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">${ticker.symbol}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{ticker.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {ticker.mentions.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">mentions</p>
                </div>

                <div className={`flex items-center gap-1 text-sm font-medium min-w-[60px] justify-end ${
                  ticker.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {ticker.change >= 0 ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{ticker.change >= 0 ? '+' : ''}{ticker.change}%</span>
                </div>

                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getSentimentColor(ticker.sentiment) }}
                  title={ticker.sentiment}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-600 dark:text-gray-400">Positive</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-gray-500" />
          <span className="text-gray-600 dark:text-gray-400">Neutral</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-gray-600 dark:text-gray-400">Negative</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingTickers;
