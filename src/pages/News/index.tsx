import { useState, useEffect, useCallback } from 'react';
import NewsFeed from '@/components/news/NewsFeed';
import { generateMockNews } from '@/utils/mockNews';
import type { NewsArticle } from '@/types';

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Initialize with mock data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const mockArticles = generateMockNews();
      setArticles(mockArticles);
      setIsLoading(false);
    }, 500);
  }, []);

  // Load more articles
  const handleLoadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setPage(prev => prev + 1);

    // Simulate API call
    setTimeout(() => {
      const moreArticles = generateMockNews();
      setArticles(prev => [...prev, ...moreArticles]);
      setIsLoading(false);

      // Simulate reaching end after 3 pages
      if (page >= 2) {
        setHasMore(false);
      }
    }, 1000);
  }, [isLoading, hasMore, page]);

  const handleBookmark = useCallback((id: string) => {
    console.log('Bookmarked article:', id);
  }, []);

  const handleShare = useCallback((article: NewsArticle) => {
    console.log('Shared article:', article.title);
    // You could implement actual share functionality here
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: article.url,
      }).catch(() => {
        // Fallback if share fails
      });
    }
  }, []);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Investment News
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time updates on markets, earnings, and economic data
            </p>
          </div>

          {/* Real-time Status */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-positive-50 dark:bg-positive-900/20 border border-positive-200 dark:border-positive-900/30 rounded-lg">
            <div className="w-2 h-2 bg-positive-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-positive-700 dark:text-positive-300">
              Live
            </span>
          </div>
        </div>
      </div>

      <NewsFeed
        articles={articles}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        onBookmark={handleBookmark}
        onShare={handleShare}
      />
    </div>
  );
};

export default News;
