import type { NewsArticle, NewsCategory, NewsFilter, PaginatedResponse } from '@/types';

/**
 * News API Service
 * Handles all news-related API calls
 * In production, this would call actual REST APIs
 */

// Base API configuration
const API_BASE_URL = process.env.VITE_API_URL || '/api';
const USE_MOCK_DATA = true; // Toggle for development

/**
 * Generate mock news articles
 */
function generateMockArticle(index: number): NewsArticle {
  const categories: NewsCategory[] = ['stocks', 'crypto', 'forex', 'commodities', 'economy', 'earnings', 'market-analysis', 'ipo'];
  const sentiments: Array<'positive' | 'negative' | 'neutral'> = ['positive', 'negative', 'neutral'];

  const titles = [
    'Tech Stocks Rally as Earnings Season Begins',
    'Federal Reserve Signals Potential Rate Adjustments',
    'Bitcoin Surges Past Key Resistance Level',
    'Oil Prices Fluctuate on Global Supply Concerns',
    'Major Bank Reports Strong Quarterly Results',
    'Semiconductor Shortage Shows Signs of Easing',
    'Renewable Energy Sector Attracts Record Investment',
    'Housing Market Data Points to Cooling Demand',
    'Gold Reaches New High Amid Economic Uncertainty',
    'IPO Market Shows Signs of Recovery',
  ];

  const sources = ['Bloomberg', 'Reuters', 'CNBC', 'Financial Times', 'Wall Street Journal', 'MarketWatch'];
  const authors = ['Financial Analysis Team', 'Market Reporter', 'Economics Desk', 'Investment Research'];

  return {
    id: `news-${index}-${Date.now()}`,
    title: titles[Math.floor(Math.random() * titles.length)],
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: 'Full article content would go here. This would typically be a longer form analysis of the news story with multiple paragraphs, quotes, and data points.',
    author: authors[Math.floor(Math.random() * authors.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    tags: ['markets', 'investing', 'analysis'].slice(0, Math.floor(Math.random() * 3) + 1),
    imageUrl: `https://images.unsplash.com/photo-${1600000000000 + Math.floor(Math.random() * 100000000)}?w=800&q=80`,
    publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Within last 7 days
    url: `https://example.com/article/${index}`,
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
  };
}

export const newsService = {
  /**
   * Get latest news articles
   */
  async getLatest(page: number = 1, pageSize: number = 20): Promise<PaginatedResponse<NewsArticle>> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const articles = Array.from({ length: pageSize }, (_, i) => generateMockArticle(i + (page - 1) * pageSize));

      return {
        data: articles,
        page,
        pageSize,
        total: 1000, // Mock total
        hasMore: page < 50,
      };
    }

    // Real API call (to be implemented)
    const response = await fetch(`${API_BASE_URL}/news?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json();
  },

  /**
   * Get news by category
   */
  async getByCategory(
    category: NewsCategory,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<NewsArticle>> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const articles = Array.from({ length: pageSize }, (_, i) => ({
        ...generateMockArticle(i + (page - 1) * pageSize),
        category,
      }));

      return {
        data: articles,
        page,
        pageSize,
        total: 500,
        hasMore: page < 25,
      };
    }

    const response = await fetch(`${API_BASE_URL}/news/category/${category}?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error('Failed to fetch news by category');
    return response.json();
  },

  /**
   * Search news articles
   */
  async search(
    query: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<NewsArticle>> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const articles = Array.from({ length: Math.min(pageSize, 10) }, (_, i) =>
        generateMockArticle(i + (page - 1) * pageSize)
      );

      return {
        data: articles,
        page,
        pageSize,
        total: 50,
        hasMore: page < 5,
      };
    }

    const response = await fetch(
      `${API_BASE_URL}/news/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) throw new Error('Failed to search news');
    return response.json();
  },

  /**
   * Get news by filter
   */
  async getFiltered(
    filter: NewsFilter,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<NewsArticle>> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      let articles = Array.from({ length: pageSize }, (_, i) => generateMockArticle(i + (page - 1) * pageSize));

      // Apply filters
      if (filter.category) {
        articles = articles.map((a) => ({ ...a, category: filter.category! }));
      }
      if (filter.sentiment) {
        articles = articles.map((a) => ({ ...a, sentiment: filter.sentiment }));
      }

      return {
        data: articles,
        page,
        pageSize,
        total: 300,
        hasMore: page < 15,
      };
    }

    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(filter.category && { category: filter.category }),
      ...(filter.sentiment && { sentiment: filter.sentiment }),
      ...(filter.searchQuery && { q: filter.searchQuery }),
    });

    const response = await fetch(`${API_BASE_URL}/news/filter?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch filtered news');
    return response.json();
  },

  /**
   * Get single article by ID
   */
  async getById(id: string): Promise<NewsArticle> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return generateMockArticle(parseInt(id) || 1);
    }

    const response = await fetch(`${API_BASE_URL}/news/${id}`);
    if (!response.ok) throw new Error('Failed to fetch article');
    return response.json();
  },

  /**
   * Get trending news
   */
  async getTrending(limit: number = 10): Promise<NewsArticle[]> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return Array.from({ length: limit }, (_, i) => generateMockArticle(i));
    }

    const response = await fetch(`${API_BASE_URL}/news/trending?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch trending news');
    return response.json();
  },
};
