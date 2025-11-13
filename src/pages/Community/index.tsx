import { useState, useMemo } from 'react';
import PostCard from '@/components/community/PostCard';
import CreatePostModal from '@/components/community/CreatePostModal';
import { generateMockPosts } from '@/utils/mockCommunityData';
import { useAppStore } from '@/store';
import type { Post, PostCategory } from '@/types';

type SortType = 'latest' | 'trending' | 'mostCommented';

const categories: PostCategory[] = [
  'discussion',
  'analysis',
  'question',
  'news',
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(() => generateMockPosts());
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortType>('latest');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const showToast = useAppStore((state) => state.showToast);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Sort
    let sorted = [...filtered];
    switch (sortBy) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'trending':
        sorted.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
      case 'mostCommented':
        sorted.sort((a, b) => b.comments - a.comments);
        break;
    }

    return sorted;
  }, [posts, selectedCategory, sortBy]);

  const handleUpvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          if (post.isUpvoted) {
            return { ...post, upvotes: post.upvotes - 1, isUpvoted: false };
          } else {
            return {
              ...post,
              upvotes: post.upvotes + 1,
              downvotes: post.isDownvoted ? post.downvotes - 1 : post.downvotes,
              isUpvoted: true,
              isDownvoted: false,
            };
          }
        }
        return post;
      })
    );
  };

  const handleDownvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          if (post.isDownvoted) {
            return { ...post, downvotes: post.downvotes - 1, isDownvoted: false };
          } else {
            return {
              ...post,
              downvotes: post.downvotes + 1,
              upvotes: post.isUpvoted ? post.upvotes - 1 : post.upvotes,
              isDownvoted: true,
              isUpvoted: false,
            };
          }
        }
        return post;
      })
    );
  };

  const handleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
    const post = posts.find((p) => p.id === postId);
    if (post) {
      showToast(
        post.isBookmarked ? 'Removed from saved posts' : 'Post saved successfully',
        'success'
      );
    }
  };

  const handleCreatePost = (newPost: {
    title: string;
    content: string;
    category: PostCategory;
    tags: string[];
    imageUrl?: string;
  }) => {
    const post: Post = {
      id: `post-${Date.now()}`,
      userId: 'current-user',
      username: 'You',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      userReputation: 150,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      tags: newPost.tags,
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      views: 0,
      isUpvoted: false,
      isDownvoted: false,
      isBookmarked: false,
      imageUrl: newPost.imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setPosts((prev) => [post, ...prev]);
    setIsCreateModalOpen(false);
    showToast('Post created successfully', 'success');
  };

  const getCategoryIcon = (category: PostCategory | 'all') => {
    switch (category) {
      case 'discussion':
        return '💬';
      case 'question':
        return '❓';
      case 'analysis':
        return '📊';
      case 'news':
        return '📰';
      default:
        return '📋';
    }
  };

  const totalScore = posts.reduce((sum, post) => sum + (post.upvotes - post.downvotes), 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Community</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with fellow investors, share insights, and learn from the community
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="hidden lg:flex items-center gap-2 btn-primary"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700'
                }`}
              >
                <span>{getCategoryIcon('all')}</span>
                <span>All Posts</span>
                <span className="ml-auto text-xs">{posts.length}</span>
              </button>
              {categories.map((category) => {
                const count = posts.filter((p) => p.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors capitalize flex items-center gap-2 ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700'
                    }`}
                  >
                    <span>{getCategoryIcon(category)}</span>
                    <span>{category}</span>
                    <span className="ml-auto text-xs">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Community Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Community Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Posts</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {posts.length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Score</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {totalScore >= 1000 ? `${(totalScore / 1000).toFixed(1)}k` : totalScore}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Comments</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {posts.reduce((sum, post) => sum + post.comments, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Trending Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['NVDA', 'AI', 'Fed', 'earnings', 'TSLA', 'analysis', 'SPY', 'bullish'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="badge bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-secondary-600 text-xs"
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
          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('latest')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'latest'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                }`}
              >
                Latest
              </button>
              <button
                onClick={() => setSortBy('trending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'trending'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => setSortBy('mostCommented')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'mostCommented'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                }`}
              >
                Most Commented
              </button>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredAndSortedPosts.length} posts
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredAndSortedPosts.length === 0 ? (
              <div className="card text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-secondary-700 rounded-full mb-4">
                  <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try selecting a different category or check back later.
                </p>
              </div>
            ) : (
              filteredAndSortedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onUpvote={handleUpvote}
                  onDownvote={handleDownvote}
                  onBookmark={handleBookmark}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-primary-600 text-white rounded-full shadow-strong flex items-center justify-center hover:bg-primary-700 transition-colors z-10"
        title="Create Post"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};

export default Community;
