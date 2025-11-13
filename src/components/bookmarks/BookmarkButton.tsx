import { useState } from 'react';
import { Bookmark, BookmarkCheck, Folder, Tag, X } from 'lucide-react';
import { useBookmarksStore, type Bookmark as BookmarkType } from '@/stores/bookmarksStore';
import { toast } from '@/components/notifications/Toaster';

interface BookmarkButtonProps {
  itemId: string;
  type: BookmarkType['type'];
  title: string;
  description?: string;
  url?: string;
  metadata?: Record<string, any>;
  className?: string;
  showLabel?: boolean;
}

export const BookmarkButton = ({
  itemId,
  type,
  title,
  description,
  url,
  metadata,
  className = '',
  showLabel = false,
}: BookmarkButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('Default');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const { isBookmarked, toggleBookmark, folders } = useBookmarksStore();
  const bookmarked = isBookmarked(itemId);

  const handleQuickToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (bookmarked) {
      toggleBookmark({ itemId, type, title, description, url, tags: [], metadata });
      toast.success('Removed from bookmarks');
    } else {
      setShowModal(true);
    }
  };

  const handleSaveBookmark = () => {
    toggleBookmark({
      itemId,
      type,
      title,
      description,
      url,
      tags,
      folder: selectedFolder,
      metadata,
    });

    toast.success('Added to bookmarks');
    setShowModal(false);
    setTags([]);
    setTagInput('');
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <>
      <button
        onClick={handleQuickToggle}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
          bookmarked
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        } ${className}`}
        aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        {bookmarked ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
        {showLabel && (
          <span className="text-sm font-medium">
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </span>
        )}
      </button>

      {/* Bookmark Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Save Bookmark
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Title Preview */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Item
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
              </div>

              {/* Folder Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Folder className="h-4 w-4" />
                  Folder
                </label>
                <select
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  {folders.map((folder) => (
                    <option key={folder} value={folder}>
                      {folder}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-lg"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-blue-900 dark:hover:text-blue-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add tag..."
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBookmark}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Save Bookmark
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
