import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Bookmark {
  id: string;
  type: 'article' | 'event' | 'post';
  itemId: string;
  title: string;
  description?: string;
  url?: string;
  tags: string[];
  folder?: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

interface BookmarksState {
  bookmarks: Bookmark[];
  folders: string[];

  // Actions
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (itemId: string) => boolean;
  toggleBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  updateBookmark: (id: string, updates: Partial<Bookmark>) => void;
  addFolder: (name: string) => void;
  removeFolder: (name: string) => void;
  getBookmarksByType: (type: Bookmark['type']) => Bookmark[];
  getBookmarksByFolder: (folder: string) => Bookmark[];
  getBookmarksByTag: (tag: string) => Bookmark[];
  exportBookmarks: () => string;
  importBookmarks: (data: string) => void;
  clearBookmarks: () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      folders: ['Default', 'Important', 'Read Later'],

      addBookmark: (bookmark) => {
        const newBookmark: Bookmark = {
          ...bookmark,
          id: `bookmark-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
        };

        set((state) => ({
          bookmarks: [newBookmark, ...state.bookmarks],
        }));
      },

      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        }));
      },

      isBookmarked: (itemId) => {
        return get().bookmarks.some((b) => b.itemId === itemId);
      },

      toggleBookmark: (bookmark) => {
        const existingBookmark = get().bookmarks.find(
          (b) => b.itemId === bookmark.itemId
        );

        if (existingBookmark) {
          get().removeBookmark(existingBookmark.id);
        } else {
          get().addBookmark(bookmark);
        }
      },

      updateBookmark: (id, updates) => {
        set((state) => ({
          bookmarks: state.bookmarks.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        }));
      },

      addFolder: (name) => {
        set((state) => {
          if (state.folders.includes(name)) return state;
          return { folders: [...state.folders, name] };
        });
      },

      removeFolder: (name) => {
        // Move bookmarks from deleted folder to Default
        set((state) => ({
          folders: state.folders.filter((f) => f !== name),
          bookmarks: state.bookmarks.map((b) =>
            b.folder === name ? { ...b, folder: 'Default' } : b
          ),
        }));
      },

      getBookmarksByType: (type) => {
        return get().bookmarks.filter((b) => b.type === type);
      },

      getBookmarksByFolder: (folder) => {
        return get().bookmarks.filter((b) => b.folder === folder);
      },

      getBookmarksByTag: (tag) => {
        return get().bookmarks.filter((b) => b.tags.includes(tag));
      },

      exportBookmarks: () => {
        const { bookmarks, folders } = get();
        return JSON.stringify({ bookmarks, folders, version: '1.0' }, null, 2);
      },

      importBookmarks: (data) => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.bookmarks && Array.isArray(parsed.bookmarks)) {
            set({
              bookmarks: parsed.bookmarks,
              folders: parsed.folders || ['Default', 'Important', 'Read Later'],
            });
          }
        } catch (error) {
          console.error('Failed to import bookmarks:', error);
        }
      },

      clearBookmarks: () => {
        set({ bookmarks: [] });
      },
    }),
    {
      name: 'bookmarks-storage',
    }
  )
);
