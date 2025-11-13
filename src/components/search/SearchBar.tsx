import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '@/stores/searchStore';
import { Search, X, Clock } from 'lucide-react';

interface SearchBarProps {
  autoFocus?: boolean;
  onClose?: () => void;
  className?: string;
}

export const SearchBar = ({ autoFocus = false, onClose, className = '' }: SearchBarProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [localQuery, setLocalQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { recentSearches, removeRecentSearch } = useSearchStore();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Navigate to search results page
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setShowSuggestions(false);
    onClose?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(localQuery);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      onClose?.();
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setLocalQuery(search);
    handleSearch(search);
  };

  const handleRemoveRecent = (search: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeRecentSearch(search);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search news, events, posts, tickers..."
          className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          aria-label="Search"
        />
        {localQuery && (
          <button
            onClick={() => setLocalQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && recentSearches.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Searches
            </h3>
          </div>
          <div className="py-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearchClick(search)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between group"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                <button
                  onClick={(e) => handleRemoveRecent(search, e)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                  aria-label="Remove from recent searches"
                >
                  <X className="h-4 w-4" />
                </button>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};
