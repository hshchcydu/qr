import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { NewsArticle } from '@/types';

const BreakingNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock breaking news
  const breakingNews: NewsArticle[] = [
    {
      id: '1',
      title: 'Fed Signals Potential Rate Cuts as Inflation Cools to 2.4%',
      summary: 'Federal Reserve Chairman hints at monetary policy shift in latest FOMC meeting, marking a potential turning point for markets.',
      content: '',
      author: 'Financial Times',
      source: 'FT Markets',
      category: 'economy',
      tags: ['Fed', 'Interest Rates', 'Inflation', 'FOMC'],
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      url: '#',
      sentiment: 'positive',
    },
    {
      id: '2',
      title: 'NVIDIA Announces Next-Gen AI Chip, Stock Surges 8% in Pre-Market',
      summary: 'Tech giant unveils breakthrough GPU architecture promising 3x performance improvement, sending ripples through semiconductor sector.',
      content: '',
      author: 'Bloomberg Technology',
      source: 'Bloomberg',
      category: 'stocks',
      tags: ['NVDA', 'AI', 'Semiconductors', 'Technology'],
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      url: '#',
      sentiment: 'positive',
    },
    {
      id: '3',
      title: 'Oil Prices Jump 5% on Unexpected OPEC+ Production Cuts',
      summary: 'Major oil-producing nations announce surprise output reduction of 1M barrels per day, rattling energy markets worldwide.',
      content: '',
      author: 'Reuters Energy',
      source: 'Reuters',
      category: 'commodities',
      tags: ['Oil', 'OPEC', 'Energy', 'Commodities'],
      imageUrl: 'https://images.unsplash.com/photo-1502951682449-e5b93545d46e?w=800&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 90), // 90 minutes ago
      url: '#',
      sentiment: 'negative',
    },
    {
      id: '4',
      title: 'Apple Announces $110B Stock Buyback Program, Dividend Increase',
      summary: 'iPhone maker reveals largest buyback in corporate history alongside Q4 earnings beat, rewarding shareholders.',
      content: '',
      author: 'CNBC Markets',
      source: 'CNBC',
      category: 'earnings',
      tags: ['AAPL', 'Earnings', 'Buyback', 'Dividend'],
      imageUrl: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=800&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      url: '#',
      sentiment: 'positive',
    },
    {
      id: '5',
      title: 'Bitcoin Breaks $70K as Institutional Adoption Accelerates',
      summary: 'Cryptocurrency rallies to new 2024 high following major asset managers announcing expanded crypto offerings.',
      content: '',
      author: 'CoinDesk',
      source: 'CoinDesk',
      category: 'crypto',
      tags: ['Bitcoin', 'Crypto', 'BTC', 'Digital Assets'],
      imageUrl: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      url: '#',
      sentiment: 'positive',
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, breakingNews.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + breakingNews.length) % breakingNews.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    setIsAutoPlaying(false);
  };

  const currentNews = breakingNews[currentIndex];

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'negative':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  const getTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };

  return (
    <div className="card overflow-hidden group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📰</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Breaking News</h2>
          <span className="animate-pulse bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            LIVE
          </span>
        </div>
        <Link
          to="/news"
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
        >
          View All →
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative h-80 rounded-xl overflow-hidden bg-gray-900">
          <img
            src={currentNews.imageUrl}
            alt={currentNews.title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className={`badge ${getSentimentColor(currentNews.sentiment)} text-xs`}>
                {currentNews.category}
              </span>
              <span className="text-xs text-white/80">{currentNews.source}</span>
              <span className="text-xs text-white/60">• {getTimeAgo(currentNews.publishedAt)}</span>
            </div>

            <h3 className="text-2xl font-bold mb-2 line-clamp-2">{currentNews.title}</h3>
            <p className="text-white/90 text-sm line-clamp-2 mb-4">{currentNews.summary}</p>

            <div className="flex flex-wrap gap-2">
              {currentNews.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {breakingNews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-primary-600 dark:bg-primary-400'
                  : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
