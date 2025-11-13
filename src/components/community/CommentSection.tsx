import { useState, useMemo } from 'react';
import type { Comment } from '@/types';
import CommentItem from './CommentItem';
import { useAppStore } from '@/store';
import { generateMockComments } from '@/utils/mockCommentData';

type SortType = 'best' | 'latest' | 'oldest';

interface CommentSectionProps {
  postId: string;
  commentCount?: number;
}

const CommentSection = ({ postId, commentCount = 0 }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(() =>
    commentCount > 0 ? generateMockComments(postId, Math.min(commentCount, 15)) : []
  );
  const [sortBy, setSortBy] = useState<SortType>('best');
  const [newComment, setNewComment] = useState('');
  const showToast = useAppStore((state) => state.showToast);

  // Recursively update comment in nested structure
  const updateCommentRecursive = (
    comments: Comment[],
    commentId: string,
    updater: (comment: Comment) => Comment
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return updater(comment);
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentRecursive(comment.replies, commentId, updater),
        };
      }
      return comment;
    });
  };

  // Add reply to a comment
  const addReplyRecursive = (
    comments: Comment[],
    parentId: string,
    newReply: Comment
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyRecursive(comment.replies, parentId, newReply),
        };
      }
      return comment;
    });
  };

  // Sort comments
  const sortedComments = useMemo(() => {
    let sorted = [...comments];

    switch (sortBy) {
      case 'best':
        sorted.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
      case 'latest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
    }

    return sorted;
  }, [comments, sortBy]);

  const handleUpvote = (commentId: string) => {
    setComments((prev) =>
      updateCommentRecursive(prev, commentId, (comment) => {
        if (comment.isUpvoted) {
          return { ...comment, upvotes: comment.upvotes - 1, isUpvoted: false };
        } else {
          return {
            ...comment,
            upvotes: comment.upvotes + 1,
            downvotes: comment.isDownvoted ? comment.downvotes - 1 : comment.downvotes,
            isUpvoted: true,
            isDownvoted: false,
          };
        }
      })
    );
  };

  const handleDownvote = (commentId: string) => {
    setComments((prev) =>
      updateCommentRecursive(prev, commentId, (comment) => {
        if (comment.isDownvoted) {
          return { ...comment, downvotes: comment.downvotes - 1, isDownvoted: false };
        } else {
          return {
            ...comment,
            downvotes: comment.downvotes + 1,
            upvotes: comment.isUpvoted ? comment.upvotes - 1 : comment.upvotes,
            isDownvoted: true,
            isUpvoted: false,
          };
        }
      })
    );
  };

  const handleReply = (parentCommentId: string, content: string) => {
    const newReply: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      userId: 'current-user',
      username: 'You',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      userReputation: 150,
      content,
      upvotes: 0,
      downvotes: 0,
      isUpvoted: false,
      isDownvoted: false,
      createdAt: new Date(),
      replies: [],
    };

    setComments((prev) => addReplyRecursive(prev, parentCommentId, newReply));
    showToast('Reply posted successfully', 'success');
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      showToast('Please write a comment', 'error');
      return;
    }

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      userId: 'current-user',
      username: 'You',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      userReputation: 150,
      content: newComment,
      upvotes: 0,
      downvotes: 0,
      isUpvoted: false,
      isDownvoted: false,
      createdAt: new Date(),
      replies: [],
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment('');
    showToast('Comment posted successfully', 'success');
  };

  const totalComments = useMemo(() => {
    const countComments = (comments: Comment[]): number => {
      return comments.reduce((total, comment) => {
        return total + 1 + (comment.replies ? countComments(comment.replies) : 0);
      }, 0);
    };
    return countComments(comments);
  }, [comments]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Comments ({totalComments})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('best')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'best'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
            }`}
          >
            Best
          </button>
          <button
            onClick={() => setSortBy('latest')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'latest'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setSortBy('oldest')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'oldest'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
            }`}
          >
            Oldest
          </button>
        </div>
      </div>

      {/* Add Comment */}
      <div className="card">
        <div className="flex gap-3">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=current"
            alt="Your avatar"
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1 space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="input w-full resize-none"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setNewComment('')}
                className="btn-secondary text-sm"
                disabled={!newComment.trim()}
              >
                Cancel
              </button>
              <button
                onClick={handleAddComment}
                className="btn-primary text-sm"
                disabled={!newComment.trim()}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-2">
        {sortedComments.length === 0 ? (
          <div className="card text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-secondary-700 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No comments yet
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="card divide-y divide-gray-200 dark:divide-secondary-700">
            {sortedComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onUpvote={handleUpvote}
                onDownvote={handleDownvote}
                onReply={handleReply}
                depth={0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
