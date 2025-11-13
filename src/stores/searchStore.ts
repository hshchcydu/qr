import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Fuse from 'fuse.js';

export interface SearchResult {
  id: string;
  type: 'news' | 'event' | 'post' | 'ticker';
  title: string;
  description?: string;
  date?: Date;
  url?: string;
  meta?: Record<string, any>;
}

interface SearchState {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  recentSearches: string[];
  filters: {
    types: ('news' | 'event' | 'post' | 'ticker')[];
    dateRange?: { start: Date; end: Date };
  };

  // Actions
  setQuery: (query: string) => void;
  search: (query: string, data: any[]) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  removeRecentSearch: (query: string) => void;
  setFilters: (filters: Partial<SearchState['filters']>) => void;
  clearResults: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      results: [],
      isSearching: false,
      recentSearches: [],
      filters: {
        types: ['news', 'event', 'post', 'ticker'],
      },

      setQuery: (query) => set({ query }),

      search: (query, data) => {
        if (!query.trim()) {
          set({ results: [], isSearching: false });
          return;
        }

        set({ isSearching: true, query });

        // Configure Fuse.js for fuzzy search
        const fuse = new Fuse(data, {
          keys: ['title', 'description', 'content', 'tags', 'symbol', 'name'],
          threshold: 0.4,
          includeScore: true,
          minMatchCharLength: 2,
        });

        const fuseResults = fuse.search(query);
        const results: SearchResult[] = fuseResults.map((result) => ({
          id: result.item.id,
          type: result.item.type || 'news',
          title: result.item.title || result.item.name || '',
          description: result.item.description || result.item.content?.slice(0, 150),
          date: result.item.createdAt || result.item.start || result.item.publishedAt,
          meta: {
            score: result.score,
            ...result.item,
          },
        }));

        // Apply filters
        const { filters } = get();
        const filteredResults = results.filter((result) =>
          filters.types.includes(result.type)
        );

        set({ results: filteredResults, isSearching: false });

        // Add to recent searches
        get().addRecentSearch(query);
      },

      addRecentSearch: (query) => {
        if (!query.trim()) return;

        set((state) => {
          const filtered = state.recentSearches.filter((s) => s !== query);
          return {
            recentSearches: [query, ...filtered].slice(0, 10), // Keep last 10
          };
        });
      },

      clearRecentSearches: () => set({ recentSearches: [] }),

      removeRecentSearch: (query) => {
        set((state) => ({
          recentSearches: state.recentSearches.filter((s) => s !== query),
        }));
      },

      setFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }));
      },

      clearResults: () => set({ results: [], query: '' }),
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({
        recentSearches: state.recentSearches,
        filters: state.filters,
      }),
    }
  )
);
