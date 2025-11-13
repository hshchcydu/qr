import { useState } from 'react';
import type { Comment } from '@/types';
import { formatRelativeTime } from '@/utils';

interface CommentItemProps {
  comment: Comment;
  onUpvote: (commentId: string) => void;
  onDownvote: (commentId: string) => void;
  onReply: (commentId: string, content: string) => void;
  depth?: number;
}

const CommentItem = ({ comment, onUpvote, onDownvote, onReply, depth = 0 }: CommentItemProps) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const totalScore = comment.upvotes - comment.downvotes;
  const maxDepth = 5;

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent('');
      setShowReplyBox(false);
    }
  };

  const formatScore = (score: number): string => {
    if (Math.abs(score) >= 1000) {
      return `${(score / 1000).toFixed(1)}k`;
    }
    return score.toString();
  };

  return (
    <div className={`${depth > 0 ? 'ml-4 md:ml-8 border-l-2 border-gray-200 dark:border-secondary-700 pl-3 md:pl-4' : ''}`}>
      <div className="py-3">
        {/* Comment Header */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={comment.userAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
            alt={comment.username}
            className="w-6 h-6 rounded-full"
          />
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            {comment.username}
          </span>
          {comment.userReputation && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {comment.userReputation.toLocaleString()} rep
            </span>
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatRelativeTime(comment.createdAt)}
          </span>
          {collapsed && comment.replies && comment.replies.length > 0 && (
            <span className="text-xs text-primary-600 dark:text-primary-400">
              ({comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'} hidden)
            </span>
          )}
        </div>

        {/* Comment Content */}
        {!collapsed && (
          <>
            <div className="text-gray-800 dark:text-gray-200 text-sm mb-3 whitespace-pre-wrap">
              {comment.content}
            </div>

            {/* Comment Actions */}
            <div className="flex items-center gap-4 text-xs">
              {/* Upvote/Downvote */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onUpvote(comment.id)}
                  className={`p-1 rounded transition-colors ${
                    comment.isUpvoted
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  title="Upvote"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                </button>
                <span
                  className={`font-semibold min-w-[2rem] text-center ${
                    totalScore > 0
                      ? 'text-primary-600 dark:text-primary-400'
                      : totalScore < 0
                      ? 'text-negative-600 dark:text-negative-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {formatScore(totalScore)}
                </span>
                <button
                  onClick={() => onDownvote(comment.id)}
                  className={`p-1 rounded transition-colors ${
                    comment.isDownvoted
                      ? 'text-negative-600 dark:text-negative-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-negative-600 dark:hover:text-negative-400'
                  }`}
                  title="Downvote"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                </button>
              </div>

              {/* Reply Button */}
              {depth < maxDepth && (
                <button
                  onClick={() => setShowReplyBox(!showReplyBox)}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                >
                  Reply
                </button>
              )}

              {/* Collapse Button */}
              {comment.replies && comment.replies.length > 0 && (
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                >
                  {collapsed ? 'Expand' : 'Collapse'}
                </button>
              )}

              {/* Share */}
              <button
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                title="Share"
              >
                Share
              </button>

              {/* Report */}
              <button
                className="text-gray-600 dark:text-gray-400 hover:text-negative-600 dark:hover:text-negative-400 transition-colors"
                title="Report"
              >
                Report
              </button>
            </div>

            {/* Reply Box */}
            {showReplyBox && (
              <div className="mt-3 space-y-2">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="input w-full text-sm resize-none"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSubmitReply}
                    disabled={!replyContent.trim()}
                    className="btn-primary text-sm py-1.5 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => {
                      setShowReplyBox(false);
                      setReplyContent('');
                    }}
                    className="btn-secondary text-sm py-1.5 px-4"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Nested Replies */}
            {!collapsed && comment.replies && comment.replies.length > 0 && (
              <div className="mt-2">
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    onUpvote={onUpvote}
                    onDownvote={onDownvote}
                    onReply={onReply}
                    depth={depth + 1}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Collapsed View */}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
          >
            Show thread
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
