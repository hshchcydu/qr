import { useState } from 'react';
import { useBookmarksStore } from '@/stores/bookmarksStore';
import { Bookmark, Folder, Tag, Download, Upload, Trash2, FileText, Calendar, MessageSquare } from 'lucide-react';
import { formatRelativeTime } from '@/utils';
import { Link } from 'react-router-dom';
import { toast } from '@/components/notifications/Toaster';

const typeIcons = {
  article: FileText,
  event: Calendar,
  post: MessageSquare,
};

const Bookmarks = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const {
    bookmarks,
    folders,
    removeBookmark,
    exportBookmarks,
    importBookmarks,
    clearBookmarks,
  } = useBookmarksStore();

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    if (selectedFolder && bookmark.folder !== selectedFolder) return false;
    if (selectedTag && !bookmark.tags.includes(selectedTag)) return false;
    return true;
  });

  // Get all unique tags
  const allTags = Array.from(new Set(bookmarks.flatMap((b) => b.tags)));

  const handleExport = () => {
    const data = exportBookmarks();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bookmarks-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Bookmarks exported successfully');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result as string;
      importBookmarks(data);
      toast.success('Bookmarks imported successfully');
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all bookmarks? This cannot be undone.')) {
      clearBookmarks();
      toast.success('All bookmarks cleared');
    }
  };

  const handleDelete = (id: string) => {
    removeBookmark(id);
    toast.success('Bookmark removed');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bookmarks
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {bookmarks.length} saved {bookmarks.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={handleExport}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
              <label className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
                <Upload className="h-4 w-4" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleClearAll}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </button>
            </div>
          </div>

          {/* Folders */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Folders
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedFolder(null)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedFolder === null
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                All Items ({bookmarks.length})
              </button>
              {folders.map((folder) => {
                const count = bookmarks.filter((b) => b.folder === folder).length;
                return (
                  <button
                    key={folder}
                    onClick={() => setSelectedFolder(folder)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedFolder === folder
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {folder} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                      selectedTag === tag
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {filteredBookmarks.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-12 border border-gray-200 dark:border-gray-700 text-center">
              <Bookmark className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {selectedFolder || selectedTag
                  ? 'No bookmarks match the selected filters'
                  : 'Start bookmarking articles, events, and posts'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookmarks.map((bookmark) => {
                const Icon = typeIcons[bookmark.type];
                return (
                  <div
                    key={bookmark.id}
                    className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <Link
                            to={bookmark.url || '#'}
                            className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {bookmark.title}
                          </Link>
                          <button
                            onClick={() => handleDelete(bookmark.id)}
                            className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                            title="Remove bookmark"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {bookmark.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {bookmark.description}
                          </p>
                        )}

                        <div className="flex items-center flex-wrap gap-2">
                          {bookmark.folder && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                              <Folder className="h-3 w-3" />
                              {bookmark.folder}
                            </span>
                          )}
                          {bookmark.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">
                            Saved {formatRelativeTime(bookmark.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
