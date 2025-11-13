import { Link } from 'react-router-dom';
import { formatRelativeTime } from '@/utils';
import type { NewsArticle } from '@/types';

const PersonalFeed = () => {
  // Mock personalized feed based on user interests
  const personalizedNews: NewsArticle[] = [
    {
      id: '1',
      title: 'NVIDIA Unveils Next-Gen AI Accelerators',
      summary: 'Based on your interest in AI and semiconductors',
      content: '',
      author: 'Tech Insider',
      source: 'TechCrunch',
      category: 'stocks',
      tags: ['NVDA', 'AI', 'Technology'],
      publishedAt: new Date(Date.now() - 1000 * 60 * 30),
      url: '#',
      sentiment: 'positive',
    },
    {
      id: '2',
      title: 'Fed Minutes Reveal Concerns About Inflation Persistence',
      summary: 'Based on your alert: Federal Reserve',
      content: '',
      author: 'Economic Analysis',
      source: 'Reuters',
      category: 'economy',
      tags: ['Fed', 'Inflation', 'Interest Rates'],
      publishedAt: new Date(Date.now() - 1000 * 60 * 60),
      url: '#',
      sentiment: 'negative',
    },
    {
      id: '3',
      title: 'Tesla Cybertruck Production Ramps Up Ahead of Schedule',
      summary: 'Based on your watchlist: TSLA',
      content: '',
      author: 'Auto News',
      source: 'Electrek',
      category: 'stocks',
      tags: ['TSLA', 'EV', 'Manufacturing'],
      publishedAt: new Date(Date.now() - 1000 * 60 * 90),
      url: '#',
      sentiment: 'positive',
    },
    {
      id: '4',
      title: 'S&P 500 Nears All-Time High as Tech Rally Continues',
      summary: 'Based on your interest in Market Analysis',
      content: '',
      author: 'Market Watch',
      source: 'Bloomberg',
      category: 'market-analysis',
      tags: ['SPY', 'Markets', 'Tech'],
      publishedAt: new Date(Date.now() - 1000 * 60 * 120),
      url: '#',
      sentiment: 'positive',
    },
  ];

  const getSentimentBadge = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'negative':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">For You</h2>
          <span className="badge bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs">
            Personalized
          </span>
        </div>
        <Link
          to="/news"
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
        >
          View All →
        </Link>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Curated news based on your alerts, watchlist, and interests
      </p>

      <div className="space-y-3">
        {personalizedNews.map((article) => (
          <Link
            key={article.id}
            to={`/news`}
            className="block p-4 bg-gradient-to-r from-gray-50 to-transparent dark:from-secondary-900/50 dark:to-transparent rounded-lg border border-gray-200 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform">
                {article.category === 'stocks' ? '📈' : article.category === 'economy' ? '💼' : '📊'}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`badge ${getSentimentBadge(article.sentiment)} text-xs`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(article.publishedAt)}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 italic">
                  {article.summary}
                </p>

                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Customize Button */}
      <Link
        to="/settings"
        className="mt-4 w-full btn-secondary flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Customize Your Feed
      </Link>
    </div>
  );
};

export default PersonalFeed;
