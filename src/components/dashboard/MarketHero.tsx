import { useState, useEffect } from 'react';
import { generateMarketIndices, generateFearGreedIndex, getMarketTimeInfo } from '@/utils/mockDashboardData';
import type { MarketIndex } from '@/utils/mockDashboardData';

const MarketHero = () => {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [fearGreed, setFearGreed] = useState(50);
  const [marketInfo, setMarketInfo] = useState(getMarketTimeInfo());

  useEffect(() => {
    // Initial load
    setIndices(generateMarketIndices());
    setFearGreed(generateFearGreedIndex());

    // Update every 5 seconds
    const interval = setInterval(() => {
      setIndices(generateMarketIndices());
      setMarketInfo(getMarketTimeInfo());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getFearGreedLabel = (value: number): { label: string; color: string } => {
    if (value <= 20) return { label: 'Extreme Fear', color: 'text-red-600 dark:text-red-400' };
    if (value <= 40) return { label: 'Fear', color: 'text-orange-600 dark:text-orange-400' };
    if (value <= 60) return { label: 'Neutral', color: 'text-gray-600 dark:text-gray-400' };
    if (value <= 80) return { label: 'Greed', color: 'text-green-600 dark:text-green-400' };
    return { label: 'Extreme Greed', color: 'text-emerald-600 dark:text-emerald-400' };
  };

  const fearGreedInfo = getFearGreedLabel(fearGreed);

  return (
    <div className="card bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Market Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              marketInfo.status === 'Market Open' ? 'bg-green-400' : 'bg-red-400'
            }`} />
            <div>
              <h2 className="text-2xl font-bold">{marketInfo.status}</h2>
              <p className="text-white/80 text-sm">
                {marketInfo.nextEvent} in {marketInfo.timeUntil}
              </p>
            </div>
          </div>

          {/* Fear & Greed Gauge */}
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-white/80">Fear & Greed</span>
              <div className="relative w-16 h-16">
                <svg className="transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray={`${fearGreed}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{fearGreed}</span>
                </div>
              </div>
            </div>
            <span className={`text-sm font-medium ${fearGreedInfo.color.replace('text-', 'text-white/90')}`}>
              {fearGreedInfo.label}
            </span>
          </div>
        </div>

        {/* Market Indices */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {indices.map((index) => (
            <div
              key={index.symbol}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg">{index.symbol}</h3>
                  <p className="text-xs text-white/70">{index.name}</p>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  index.change >= 0 ? 'text-green-300' : 'text-red-300'
                }`}>
                  {index.change >= 0 ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {index.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className={index.change >= 0 ? 'text-green-300' : 'text-red-300'}>
                    {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                  </span>
                  <span className={`font-medium ${index.changePercent >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketHero;
