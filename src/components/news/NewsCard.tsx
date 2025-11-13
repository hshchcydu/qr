import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { NewsArticle } from '@/types';
import { formatRelativeTime } from '@/utils';

interface NewsCardProps {
  article: NewsArticle;
  onBookmark?: (id: string) => void;
  onShare?: (article: NewsArticle) => void;
  isBookmarked?: boolean;
}

const NewsCard = ({ article, onBookmark, onShare, isBookmarked = false }: NewsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const getImportanceIndicator = () => {
    // Determine importance based on category and sentiment
    if (article.category === 'earnings' || article.category === 'economy') {
      return { color: '🔴', text: 'High', class: 'text-negative-600 dark:text-negative-400' };
    } else if (article.category === 'stocks' || article.category === 'market-analysis') {
      return { color: '🟡', text: 'Medium', class: 'text-yellow-600 dark:text-yellow-400' };
    }
    return { color: '⚪', text: 'Low', class: 'text-gray-500 dark:text-gray-400' };
  };

  const importance = getImportanceIndicator();

  return (
    <article className="card group cursor-pointer hover:shadow-strong animate-fade-in">
      <div onClick={() => setIsExpanded(!isExpanded)}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Timestamp */}
            <time className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {formatRelativeTime(article.publishedAt)}
            </time>

            {/* Importance Indicator */}
            <div className={`flex items-center gap-1.5 text-xs font-medium ${importance.class}`}>
              <span className="text-base">{importance.color}</span>
              <span className="hidden sm:inline">{importance.text}</span>
            </div>

            {/* Source Tag */}
            <span className="badge badge-info text-xs">
              {article.source}
            </span>
          </div>

          {/* Bookmark */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark?.(article.id);
            }}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
            aria-label="Bookmark article"
          >
            <svg
              className={`w-5 h-5 transition-colors ${
                isBookmarked
                  ? 'fill-primary-600 text-primary-600 dark:fill-primary-400 dark:text-primary-400'
                  : 'text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              fill={isBookmarked ? 'currentColor' : 'none'}
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

        {/* Headline */}
        <Link to={`/news/${article.id}`} onClick={(e) => e.stopPropagation()}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
            {article.title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {article.summary}
        </p>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-secondary-700 animate-slide-down">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {article.content}
            </p>
          </div>
        )}

        {/* Related Tickers */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((ticker) => (
              <button
                key={ticker}
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle ticker click
                }}
                className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-md text-xs font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              >
                ${ticker}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-secondary-700">
        <div className="flex items-center gap-4">
          {/* Comment Count */}
          <button
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>{Math.floor(Math.random() * 100)}</span>
          </button>

          {/* Views Count */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <span>{(Math.floor(Math.random() * 50) + 10) * 100}</span>
          </div>
        </div>

        {/* Share Button */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowShareMenu(!showShareMenu);
            }}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span>Share</span>
          </button>

          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-secondary-800 rounded-xl shadow-strong border border-gray-200 dark:border-secondary-700 p-2 animate-slide-down z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare?.(article);
                  setShowShareMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                Twitter
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowShareMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(article.url);
                  setShowShareMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Link
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
