import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatRelativeTime } from '@/utils';
import { generateMockPosts } from '@/utils/mockCommunityData';
import CommentSection from '@/components/community/CommentSection';
import type { Post } from '@/types';
import { useAppStore } from '@/store';

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const showToast = useAppStore((state) => state.showToast);

  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    // In a real app, fetch post by ID from API
    const allPosts = generateMockPosts();
    const foundPost = allPosts.find((p) => p.id === postId);

    if (foundPost) {
      setPost(foundPost);

      // Find related posts (same category or tags)
      const related = allPosts
        .filter((p) => p.id !== postId && (
          p.category === foundPost.category ||
          p.tags.some((tag) => foundPost.tags.includes(tag))
        ))
        .slice(0, 5);
      setRelatedPosts(related);
    }
  }, [postId]);

  if (!post) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-secondary-700 rounded-full mb-4">
            <svg className="w-8 h-8 text-gray-400 dark:text-gray-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Loading post...
          </h3>
        </div>
      </div>
    );
  }

  const totalScore = post.upvotes - post.downvotes;

  const handleUpvote = () => {
    setPost((prev) => {
      if (!prev) return prev;
      if (prev.isUpvoted) {
        return { ...prev, upvotes: prev.upvotes - 1, isUpvoted: false };
      } else {
        return {
          ...prev,
          upvotes: prev.upvotes + 1,
          downvotes: prev.isDownvoted ? prev.downvotes - 1 : prev.downvotes,
          isUpvoted: true,
          isDownvoted: false,
        };
      }
    });
  };

  const handleDownvote = () => {
    setPost((prev) => {
      if (!prev) return prev;
      if (prev.isDownvoted) {
        return { ...prev, downvotes: prev.downvotes - 1, isDownvoted: false };
      } else {
        return {
          ...prev,
          downvotes: prev.downvotes + 1,
          upvotes: prev.isUpvoted ? prev.upvotes - 1 : prev.upvotes,
          isDownvoted: true,
          isUpvoted: false,
        };
      }
    });
  };

  const handleBookmark = () => {
    setPost((prev) => {
      if (!prev) return prev;
      const newBookmarked = !prev.isBookmarked;
      showToast(
        newBookmarked ? 'Post saved successfully' : 'Removed from saved posts',
        'success'
      );
      return { ...prev, isBookmarked: newBookmarked };
    });
  };

  const handleShare = (method: 'twitter' | 'copy' | 'reddit') => {
    const url = window.location.href;
    switch (method) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'reddit':
        window.open(
          `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        showToast('Link copied to clipboard', 'success');
        break;
    }
    setShowShareMenu(false);
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'discussion':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'question':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'analysis':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'news':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate('/community')}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Community
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Card */}
          <div className="card">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src={post.userAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                alt={post.username}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {post.username}
                  </span>
                  {post.userReputation && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.userReputation.toLocaleString()} rep
                    </span>
                  )}
                  <span className={`badge capitalize ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatRelativeTime(post.createdAt)}
                </p>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {post.title}
            </h1>

            {/* Image */}
            {post.imageUrl && (
              <div className="mb-4">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {/* Content */}
            <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap mb-6">
              {post.content}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-secondary-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-secondary-700">
              {/* Vote Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUpvote}
                  className={`p-2 rounded-lg transition-all ${
                    post.isUpvoted
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-gray-100 dark:hover:bg-secondary-700 text-gray-600 dark:text-gray-400'
                  }`}
                  title="Upvote"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                </button>
                <span className="font-bold text-gray-900 dark:text-gray-100 min-w-[3rem] text-center">
                  {totalScore >= 1000 ? `${(totalScore / 1000).toFixed(1)}k` : totalScore}
                </span>
                <button
                  onClick={handleDownvote}
                  className={`p-2 rounded-lg transition-all ${
                    post.isDownvoted
                      ? 'bg-negative-100 dark:bg-negative-900/30 text-negative-600 dark:text-negative-400'
                      : 'hover:bg-gray-100 dark:hover:bg-secondary-700 text-gray-600 dark:text-gray-400'
                  }`}
                  title="Downvote"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                </button>
              </div>

              {/* Comment Count */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm font-medium">{post.comments}</span>
              </div>

              {/* Share Button */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700 text-gray-600 dark:text-gray-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="text-sm font-medium">Share</span>
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-lg shadow-strong border border-gray-200 dark:border-secondary-700 py-2 z-10">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
                    >
                      Share on Twitter
                    </button>
                    <button
                      onClick={() => handleShare('reddit')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
                    >
                      Share on Reddit
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
                    >
                      Copy Link
                    </button>
                  </div>
                )}
              </div>

              {/* Bookmark Button */}
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-lg transition-all ${
                  post.isBookmarked
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-secondary-700 text-gray-600 dark:text-gray-400'
                }`}
                title={post.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                <svg
                  className="w-5 h-5"
                  fill={post.isBookmarked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection postId={post.id} commentCount={post.comments} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Author Profile */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              About Author
            </h3>
            <div className="flex items-start gap-3">
              <img
                src={post.userAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                alt={post.username}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  {post.username}
                </h4>
                {post.userReputation && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {post.userReputation.toLocaleString()} reputation
                  </p>
                )}
              </div>
            </div>
            <button className="btn-primary w-full mt-4">
              View Profile
            </button>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Related Posts
              </h3>
              <div className="space-y-3">
                {relatedPosts.map((relatedPost) => (
                  <button
                    key={relatedPost.id}
                    onClick={() => navigate(`/community/${relatedPost.id}`)}
                    className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-secondary-900/50 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{relatedPost.upvotes - relatedPost.downvotes} votes</span>
                      <span>•</span>
                      <span>{relatedPost.comments} comments</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
