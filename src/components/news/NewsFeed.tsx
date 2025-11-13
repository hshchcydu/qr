import { useState, useEffect, useRef, useCallback } from 'react';
import NewsCard from './NewsCard';
import type { NewsArticle } from '@/types';

interface NewsFeedProps {
  articles: NewsArticle[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onBookmark?: (id: string) => void;
  onShare?: (article: NewsArticle) => void;
}

type FilterType = 'all' | 'breaking' | 'earnings' | 'economic' | 'fed';
type SortType = 'latest' | 'important' | 'viewed';

const NewsFeed = ({
  articles: initialArticles,
  isLoading = false,
  hasMore = true,
  onLoadMore,
  onBookmark,
  onShare,
}: NewsFeedProps) => {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('latest');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Update articles when initialArticles change
  useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles]);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new article arriving
      if (Math.random() > 0.7 && articles.length > 0) {
        const randomArticle = articles[Math.floor(Math.random() * articles.length)];
        const newArticle = {
          ...randomArticle,
          id: `realtime-${Date.now()}`,
          publishedAt: new Date(),
        };
        setArticles(prev => [newArticle, ...prev]);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [articles]);

  // Infinite scroll observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || isLoading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && onLoadMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    if (filter === 'all') return true;
    if (filter === 'breaking') return article.category === 'economy' || article.category === 'stocks';
    if (filter === 'earnings') return article.category === 'earnings';
    if (filter === 'economic') return article.category === 'economy';
    if (filter === 'fed') return article.title.toLowerCase().includes('fed') || article.title.toLowerCase().includes('federal reserve');
    return true;
  });

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sort === 'latest') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
    if (sort === 'important') {
      const importanceScore = (article: NewsArticle) => {
        if (article.category === 'earnings' || article.category === 'economy') return 3;
        if (article.category === 'stocks') return 2;
        return 1;
      };
      return importanceScore(b) - importanceScore(a);
    }
    // Most viewed (simulated)
    return Math.random() - 0.5;
  });

  const handleBookmark = useCallback((id: string) => {
    setBookmarkedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    onBookmark?.(id);
  }, [onBookmark]);

  const filters: { id: FilterType; label: string; count?: number }[] = [
    { id: 'all', label: 'All', count: articles.length },
    { id: 'breaking', label: 'Breaking' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'economic', label: 'Economic Data' },
    { id: 'fed', label: 'Fed' },
  ];

  const sorts: { id: SortType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'latest',
      label: 'Latest',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'important',
      label: 'Most Important',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      id: 'viewed',
      label: 'Most Viewed',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
  ];

  if (sortedArticles.length === 0 && !isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-secondary-800 rounded-full mb-4">
          <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No news found</h3>
        <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-secondary-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-700'
              }`}
            >
              {f.label}
              {f.count !== undefined && filter === f.id && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {f.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Sort by:</span>
          <div className="flex gap-1">
            {sorts.map((s) => (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  sort === s.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-secondary-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-700'
                }`}
                title={s.label}
              >
                {s.icon}
                <span className="hidden md:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="flex items-center gap-2 px-4 py-2 bg-positive-50 dark:bg-positive-900/20 border border-positive-200 dark:border-positive-900/30 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-positive-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-positive-700 dark:text-positive-300">Live Updates Active</span>
        </div>
        <span className="text-xs text-positive-600 dark:text-positive-400">
          • {sortedArticles.length} articles
        </span>
      </div>

      {/* Articles Grid */}
      <div className="space-y-4">
        {sortedArticles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onBookmark={handleBookmark}
            onShare={onShare}
            isBookmarked={bookmarkedIds.has(article.id)}
          />
        ))}
      </div>

      {/* Loading More */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      {hasMore && !isLoading && <div ref={loadMoreRef} className="h-10" />}

      {/* No More Articles */}
      {!hasMore && sortedArticles.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            You've reached the end of the feed
          </p>
        </div>
      )}
    </div>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="card animate-pulse">
    <div className="flex items-center gap-3 mb-3">
      <div className="h-4 w-20 bg-gray-200 dark:bg-secondary-700 rounded"></div>
      <div className="h-4 w-16 bg-gray-200 dark:bg-secondary-700 rounded"></div>
      <div className="h-6 w-20 bg-gray-200 dark:bg-secondary-700 rounded-full"></div>
    </div>
    <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded mb-2"></div>
    <div className="h-6 w-3/4 bg-gray-200 dark:bg-secondary-700 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded mb-2"></div>
    <div className="h-4 w-5/6 bg-gray-200 dark:bg-secondary-700 rounded mb-4"></div>
    <div className="flex gap-2">
      <div className="h-6 w-16 bg-gray-200 dark:bg-secondary-700 rounded-md"></div>
      <div className="h-6 w-16 bg-gray-200 dark:bg-secondary-700 rounded-md"></div>
      <div className="h-6 w-16 bg-gray-200 dark:bg-secondary-700 rounded-md"></div>
    </div>
  </div>
);

export default NewsFeed;
