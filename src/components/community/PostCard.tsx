import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '@/types';
import { formatRelativeTime } from '@/utils';

interface PostCardProps {
  post: Post;
  onUpvote?: (postId: string) => void;
  onDownvote?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
}

const PostCard = ({ post, onUpvote, onDownvote, onBookmark }: PostCardProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'discussion':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'question':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'analysis':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'news':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  const handleShare = (method: 'twitter' | 'copy' | 'reddit') => {
    const url = `${window.location.origin}/community/${post.id}`;
    switch (method) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'reddit':
        window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
    setShowShareMenu(false);
  };

  const totalScore = post.upvotes - post.downvotes;

  return (
    <div className="card hover:shadow-strong transition-all">
      <div className="flex gap-4">
        {/* Vote Column */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onUpvote?.(post.id)}
            className={`p-2 rounded transition-colors ${
              post.isUpvoted
                ? 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30'
                : 'text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-secondary-700'
            }`}
          >
            <svg className="w-5 h-5" fill={post.isUpvoted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>

          <span className={`text-sm font-bold ${
            post.isUpvoted ? 'text-primary-600 dark:text-primary-400' :
            post.isDownvoted ? 'text-negative-600 dark:text-negative-400' :
            'text-gray-700 dark:text-gray-300'
          }`}>
            {totalScore >= 1000 ? `${(totalScore / 1000).toFixed(1)}k` : totalScore}
          </span>

          <button
            onClick={() => onDownvote?.(post.id)}
            className={`p-2 rounded transition-colors ${
              post.isDownvoted
                ? 'text-negative-600 dark:text-negative-400 bg-negative-100 dark:bg-negative-900/30'
                : 'text-gray-400 hover:text-negative-600 dark:hover:text-negative-400 hover:bg-gray-100 dark:hover:bg-secondary-700'
            }`}
          >
            <svg className="w-5 h-5" fill={post.isDownvoted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <img
              src={post.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId}`}
              alt={post.username}
              className="w-6 h-6 rounded-full"
            />
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
              {post.username}
            </span>
            {post.userReputation !== undefined && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • {post.userReputation.toLocaleString()} rep
              </span>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              • {formatRelativeTime(post.createdAt)}
            </span>
            <span className={`badge ${getCategoryColor(post.category)} text-xs`}>
              {post.category}
            </span>
          </div>

          {/* Title */}
          <Link to={`/community/${post.id}`} className="block mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {post.title}
            </h3>
          </Link>

          {/* Content Preview */}
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
            {post.content}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium hover:bg-gray-200 dark:hover:bg-secondary-600 cursor-pointer transition-colors"
                >
                  {tag.startsWith('$') || tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <Link
              to={`/community/${post.id}`}
              className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{post.comments} comments</span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share</span>
              </button>

              {showShareMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(false)} />
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-secondary-800 border border-gray-200 dark:border-secondary-700 rounded-lg shadow-lg py-1 z-20">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      Share on Twitter
                    </button>
                    <button
                      onClick={() => handleShare('reddit')}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      Share on Reddit
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      Copy Link
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => onBookmark?.(post.id)}
              className={`flex items-center gap-1 transition-colors ${
                post.isBookmarked
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <svg className="w-5 h-5" fill={post.isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="hidden sm:inline">{post.isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <span className="flex items-center gap-1 ml-auto text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
