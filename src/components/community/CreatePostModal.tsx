import { useState } from 'react';
import type { PostCategory } from '@/types';
import { useAppStore } from '@/store';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: {
    title: string;
    content: string;
    category: PostCategory;
    tags: string[];
    imageUrl?: string;
  }) => void;
}

const CreatePostModal = ({ isOpen, onClose, onSubmit }: CreatePostModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>('discussion');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const showToast = useAppStore((state) => state.showToast);

  const categories: { id: PostCategory; label: string; icon: string }[] = [
    { id: 'discussion', label: 'Discussion', icon: '💬' },
    { id: 'question', label: 'Question', icon: '❓' },
    { id: 'analysis', label: 'Analysis', icon: '📊' },
    { id: 'news', label: 'News', icon: '📰' },
  ];

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      if (tags.length >= 5) {
        showToast('Maximum 5 tags allowed', 'error');
        return;
      }
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      showToast('Please enter a title', 'error');
      return;
    }

    if (!content.trim()) {
      showToast('Please enter content', 'error');
      return;
    }

    if (tags.length === 0) {
      showToast('Please add at least one tag', 'error');
      return;
    }

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      category,
      tags,
      imageUrl: imageUrl.trim() || undefined,
    });

    // Reset form
    setTitle('');
    setContent('');
    setCategory('discussion');
    setTags([]);
    setTagInput('');
    setImageUrl('');
    setPreviewMode(false);
  };

  const handleClose = () => {
    if (title || content || tags.length > 0) {
      if (confirm('Are you sure you want to discard this post?')) {
        setTitle('');
        setContent('');
        setCategory('discussion');
        setTags([]);
        setTagInput('');
        setImageUrl('');
        setPreviewMode(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white dark:bg-secondary-800 rounded-xl shadow-strong">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-secondary-700 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Create Post
            </h2>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        category === cat.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title..."
                  className="input"
                  maxLength={200}
                />
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                  {title.length}/200
                </div>
              </div>

              {/* Content Editor with Preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Content
                  </label>
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {previewMode ? 'Edit' : 'Preview'}
                  </button>
                </div>

                {previewMode ? (
                  <div className="min-h-[300px] p-4 bg-gray-50 dark:bg-secondary-900 rounded-lg border border-gray-200 dark:border-secondary-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {title || 'Your title here'}
                    </h3>
                    <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                      {content || 'Your content will appear here...'}
                    </div>
                  </div>
                ) : (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your thoughts, analysis, or questions with the community..."
                    className="input resize-none"
                    rows={12}
                  />
                )}
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Supports plain text. Use line breaks for paragraphs.
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags & Tickers
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add tags or tickers (e.g., AAPL, earnings, DD)"
                    className="input flex-1"
                  />
                  <button
                    onClick={handleAddTag}
                    className="btn-secondary"
                    disabled={!tagInput.trim()}
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                      >
                        #{tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-primary-900 dark:hover:text-primary-100"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Add up to 5 tags. Press Enter or click Add.
                </div>
              </div>

              {/* Image URL (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="input"
                />
                {imageUrl && (
                  <div className="mt-2">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="max-h-48 rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        showToast('Invalid image URL', 'error');
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 dark:border-secondary-700 px-6 py-4">
            <button onClick={handleClose} className="btn-secondary">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="btn-primary"
              disabled={!title.trim() || !content.trim() || tags.length === 0}
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
