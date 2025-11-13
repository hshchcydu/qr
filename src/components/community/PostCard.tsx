import { Link } from 'react-router-dom';
import type { Post } from '@/types';
import { formatRelativeTime, formatNumber, getInitials } from '@/utils';

interface PostCardProps {
  post: Post;
  onLike?: (id: string) => void;
}

const PostCard = ({ post, onLike }: PostCardProps) => {
  return (
    <article className="card hover:shadow-lg transition-shadow">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        {post.userAvatar ? (
          <img
            src={post.userAvatar}
            alt={post.username}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">
            {getInitials(post.username)}
          </div>
        )}
        <div className="flex-1">
          <div className="font-medium text-gray-900">{post.username}</div>
          <div className="text-sm text-gray-500">
            {formatRelativeTime(post.createdAt)}
          </div>
        </div>
        <span className="badge badge-primary">{post.category}</span>
      </div>

      {/* Post Content */}
      <Link to={`/community/posts/${post.id}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
          {post.title}
        </h3>
      </Link>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge bg-gray-100 text-gray-700">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-gray-200 pt-4">
        <button
          onClick={() => onLike?.(post.id)}
          className={`flex items-center gap-2 hover:text-primary-600 transition-colors ${
            post.isLiked ? 'text-primary-600' : ''
          }`}
        >
          <svg
            className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{formatNumber(post.likes)}</span>
        </button>

        <Link
          to={`/community/posts/${post.id}`}
          className="flex items-center gap-2 hover:text-primary-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>{formatNumber(post.comments)}</span>
        </Link>

        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>{formatNumber(post.views)}</span>
        </div>

        <button
          className={`ml-auto hover:text-primary-600 transition-colors ${
            post.isBookmarked ? 'text-primary-600' : ''
          }`}
        >
          <svg
            className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default PostCard;
