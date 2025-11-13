import { useState } from 'react';
import { useNews } from '@/hooks/useNews';
import NewsFilter from '@/components/news/NewsFilter';
import NewsFeed from '@/components/news/NewsFeed';
import type { NewsFilter as NewsFilterType } from '@/types';

const News = () => {
  const [filter, setFilter] = useState<NewsFilterType>({});
  const [page, setPage] = useState(1);
  const { data, isLoading } = useNews(filter, page, 12);

  const handleFilterChange = (newFilter: NewsFilterType) => {
    setFilter(newFilter);
    setPage(1); // Reset to first page when filter changes
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment News</h1>
        <p className="text-gray-600">
          Stay updated with the latest market news and financial insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <NewsFilter onFilterChange={handleFilterChange} />

          {/* Quick Stats */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Today's Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Articles</span>
                <span className="font-semibold text-gray-900">
                  {data?.total || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Positive</span>
                <span className="font-semibold text-green-600">45%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Negative</span>
                <span className="font-semibold text-red-600">30%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Neutral</span>
                <span className="font-semibold text-gray-600">25%</span>
              </div>
            </div>
          </div>
        </div>

        {/* News Feed */}
        <div className="lg:col-span-3">
          <NewsFeed articles={data?.data || []} isLoading={isLoading} />

          {/* Load More */}
          {data && data.hasMore && (
            <div className="mt-8 text-center">
              <button onClick={handleLoadMore} className="btn-primary">
                Load More Articles
              </button>
            </div>
          )}

          {/* Pagination Info */}
          {data && data.data.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-600">
              Showing {data.data.length} of {data.total} articles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
