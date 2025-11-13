import { useState } from 'react';
import type { NewsCategory, NewsFilter as NewsFilterType } from '@/types';

interface NewsFilterProps {
  onFilterChange: (filter: NewsFilterType) => void;
}

const categories: NewsCategory[] = [
  'stocks',
  'crypto',
  'forex',
  'commodities',
  'economy',
  'earnings',
  'market-analysis',
  'ipo',
];

const sentiments = ['positive', 'negative', 'neutral'] as const;

const NewsFilter = ({ onFilterChange }: NewsFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | undefined>();
  const [selectedSentiment, setSelectedSentiment] = useState<typeof sentiments[number] | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (category: NewsCategory) => {
    const newCategory = selectedCategory === category ? undefined : category;
    setSelectedCategory(newCategory);
    onFilterChange({
      category: newCategory,
      sentiment: selectedSentiment,
      searchQuery: searchQuery || undefined,
    });
  };

  const handleSentimentChange = (sentiment: typeof sentiments[number]) => {
    const newSentiment = selectedSentiment === sentiment ? undefined : sentiment;
    setSelectedSentiment(newSentiment);
    onFilterChange({
      category: selectedCategory,
      sentiment: newSentiment,
      searchQuery: searchQuery || undefined,
    });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onFilterChange({
      category: selectedCategory,
      sentiment: selectedSentiment,
      searchQuery: query || undefined,
    });
  };

  const clearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedSentiment(undefined);
    setSearchQuery('');
    onFilterChange({});
  };

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search news..."
          className="input"
        />
      </div>

      {/* Categories */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Sentiment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sentiment
        </label>
        <div className="flex gap-2">
          {sentiments.map((sentiment) => (
            <button
              key={sentiment}
              onClick={() => handleSentimentChange(sentiment)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedSentiment === sentiment
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sentiment}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFilter;
