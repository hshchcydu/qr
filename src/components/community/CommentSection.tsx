import { useState } from 'react';
import type { Comment } from '@/types';
import { formatRelativeTime, getInitials } from '@/utils';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  isLoading?: boolean;
}

const CommentSection = ({ comments, onAddComment, isLoading }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
          className="input resize-none"
        />
        <div className="flex justify-end mt-2">
          <button type="submit" className="btn-primary" disabled={!newComment.trim()}>
            Post Comment
          </button>
        </div>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="bg-gray-200 h-4 w-24 rounded mb-2" />
                  <div className="bg-gray-200 h-3 w-full rounded mb-1" />
                  <div className="bg-gray-200 h-3 w-3/4 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentItem = ({ comment }: { comment: Comment }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="flex items-start gap-3">
      {comment.userAvatar ? (
        <img
          src={comment.userAvatar}
          alt={comment.username}
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
          {getInitials(comment.username)}
        </div>
      )}

      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-gray-900">{comment.username}</span>
            <span className="text-sm text-gray-500">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>

        {/* Comment Actions */}
        <div className="flex items-center gap-4 mt-2 text-sm">
          <button
            className={`flex items-center gap-1 hover:text-primary-600 transition-colors ${
              comment.isLiked ? 'text-primary-600' : 'text-gray-500'
            }`}
          >
            <svg
              className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <span>{comment.likes}</span>
          </button>

          <button className="text-gray-500 hover:text-primary-600 transition-colors">
            Reply
          </button>

          {comment.replies && comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              {showReplies ? 'Hide' : 'Show'} {comment.replies.length} replies
            </button>
          )}
        </div>

        {/* Replies */}
        {showReplies && comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-200">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
