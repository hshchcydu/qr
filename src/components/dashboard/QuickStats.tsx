import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateQuickStats } from '@/utils/mockDashboardData';
import type { QuickStat } from '@/utils/mockDashboardData';

const QuickStats = () => {
  const [stats, setStats] = useState<QuickStat[]>([]);

  useEffect(() => {
    setStats(generateQuickStats());

    // Refresh stats every 30 seconds
    const interval = setInterval(() => {
      setStats(generateQuickStats());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getLink = (label: string): string => {
    switch (label) {
      case 'News Today':
        return '/news';
      case 'Active Alerts':
        return '/alerts';
      case 'Community Posts':
        return '/community';
      case 'Saved Articles':
        return '/news';
      default:
        return '/';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Link
          key={stat.label}
          to={getLink(stat.label)}
          className="card group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              {stat.change !== undefined && (
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change >= 0 ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{stat.change >= 0 ? '+' : ''}{stat.change}%</span>
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:scale-105 transition-transform inline-block">
                {stat.value.toLocaleString()}
              </p>
            </div>

            {/* Hover Arrow */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickStats;
