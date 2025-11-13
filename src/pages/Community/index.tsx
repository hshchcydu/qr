import { useState } from 'react';
import { usePosts, useLikePost } from '@/hooks/useCommunity';
import PostList from '@/components/community/PostList';
import type { PostCategory } from '@/types';

const categories: PostCategory[] = [
  'discussion',
  'analysis',
  'question',
  'news',
  'education',
];

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePosts(selectedCategory, page, 10);
  const likePost = useLikePost();

  const handleLike = (id: string) => {
    likePost.mutate(id);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-gray-600">
          Connect with fellow investors, share insights, and learn from the community
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory(undefined)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  !selectedCategory
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Posts
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Community Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Posts</span>
                <span className="font-semibold text-gray-900">
                  {data?.total || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Users</span>
                <span className="font-semibold text-gray-900">1,234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Posts Today</span>
                <span className="font-semibold text-gray-900">42</span>
              </div>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Trending Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['bitcoin', 'stocks', 'trading', 'analysis', 'crypto', 'market'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="badge bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200"
                  >
                    #{tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Create Post Button */}
          <div className="card mb-6">
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
              What's on your mind? Share your thoughts...
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">
                Latest
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium">
                Popular
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium">
                Trending
              </button>
            </div>

            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
              <option>Last 24 hours</option>
              <option>Last week</option>
              <option>Last month</option>
              <option>All time</option>
            </select>
          </div>

          {/* Posts List */}
          <PostList posts={data?.data || []} isLoading={isLoading} onLike={handleLike} />

          {/* Load More */}
          {data && data.hasMore && (
            <div className="mt-8 text-center">
              <button onClick={handleLoadMore} className="btn-primary">
                Load More Posts
              </button>
            </div>
          )}

          {/* Pagination Info */}
          {data && data.data.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-600">
              Showing {data.data.length} of {data.total} posts
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
