import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSearchStore } from '@/stores/searchStore';
import { SearchBar } from '@/components/search/SearchBar';
import { FileText, Calendar, MessageSquare, TrendingUp, Filter } from 'lucide-react';
import { formatRelativeTime } from '@/utils';

const typeIcons = {
  news: FileText,
  event: Calendar,
  post: MessageSquare,
  ticker: TrendingUp,
};

const typeLabels = {
  news: 'News Article',
  event: 'Calendar Event',
  post: 'Community Post',
  ticker: 'Stock Ticker',
};

const typeColors = {
  news: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  event: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  post: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  ticker: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const { results, search, filters, setFilters, isSearching } = useSearchStore();
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for search (in real app, this would come from API)
  const mockData = [
    {
      id: '1',
      type: 'news',
      title: 'Fed Signals Rate Cuts in 2024',
      description: 'The Federal Reserve indicated three potential rate cuts this year...',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'event',
      title: 'NVDA Earnings Call',
      description: 'NVIDIA Q4 2024 earnings announcement',
      start: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      type: 'post',
      title: 'Why I\'m bullish on Tesla despite competition',
      content: 'Tesla has several competitive advantages that people overlook...',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: '4',
      type: 'ticker',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      description: 'Technology company specializing in consumer electronics',
    },
  ];

  useEffect(() => {
    if (queryParam) {
      search(queryParam, mockData);
    }
  }, [queryParam]);

  const handleTypeFilterToggle = (type: 'news' | 'event' | 'post' | 'ticker') => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];

    setFilters({ types: newTypes });

    // Re-run search with new filters
    if (queryParam) {
      search(queryParam, mockData);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar autoFocus />
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>

          {showFilters && (
            <div className="flex items-center gap-2">
              {Object.entries(typeLabels).map(([type, label]) => (
                <button
                  key={type}
                  onClick={() => handleTypeFilterToggle(type as any)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filters.types.includes(type as any)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {queryParam && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {isSearching ? (
              <span>Searching...</span>
            ) : (
              <span>
                {results.length} {results.length === 1 ? 'result' : 'results'} for "{queryParam}"
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {!queryParam ? (
        <div className="text-center py-16">
          <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Search for news, events, and more
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter a query to find relevant content across the platform
          </p>
        </div>
      ) : results.length === 0 && !isSearching ? (
        <div className="text-center py-16">
          <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No results found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search query or filters
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => {
            const Icon = typeIcons[result.type];
            return (
              <Link
                key={result.id}
                to={`/${result.type === 'ticker' ? 'news' : result.type}/${result.id}`}
                className="block bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${typeColors[result.type]}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${typeColors[result.type]}`}>
                        {typeLabels[result.type]}
                      </span>
                      {result.date && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatRelativeTime(result.date)}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {result.title}
                    </h3>

                    {result.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {result.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
